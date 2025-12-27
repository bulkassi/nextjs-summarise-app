"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";

interface SummarizationContextType {
  isSummarizing: boolean;
  currentJobId: number | null;
  startSummarization: (url: string) => Promise<void>;
  latestSummary: { id: number; url: string; summary: string } | null;
}

const SummarizationContext = createContext<
  SummarizationContextType | undefined
>(undefined);

export function SummarizationProvider({ children }: { children: ReactNode }) {
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [currentJobId, setCurrentJobId] = useState<number | null>(null);
  const [latestSummary, setLatestSummary] = useState<{
    id: number;
    url: string;
    summary: string;
  } | null>(null);
  const router = useRouter();

  const startSummarization = async (url: string) => {
    setIsSummarizing(true);
    setLatestSummary(null);
    try {
      const response = await fetch("/api/post/post-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error("Failed to start summarization");
      }

      const data = await response.json();
      setCurrentJobId(data.id);
    } catch (error) {
      console.error(error);
      setIsSummarizing(false);
    }
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isSummarizing && currentJobId) {
      intervalId = setInterval(async () => {
        try {
          const response = await fetch(
            `/api/get/request-result?id=${currentJobId}`
          );
          if (response.ok) {
            const data = await response.json();
            if (data.status === "completed") {
              setLatestSummary(data);
              setIsSummarizing(false);
              setCurrentJobId(null);
              router.push("/summarize");
            } else if (data.status === "failed") {
              setIsSummarizing(false);
              setCurrentJobId(null);
              console.error("Summarization failed:", data.summary);
            }
          }
        } catch (error) {
          console.error("Error polling status:", error);
        }
      }, 5000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isSummarizing, currentJobId, router]);

  return (
    <SummarizationContext.Provider
      value={{ isSummarizing, currentJobId, startSummarization, latestSummary }}
    >
      {children}
    </SummarizationContext.Provider>
  );
}

export function useSummarization() {
  const context = useContext(SummarizationContext);
  if (context === undefined) {
    throw new Error(
      "useSummarization must be used within a SummarizationProvider"
    );
  }
  return context;
}
