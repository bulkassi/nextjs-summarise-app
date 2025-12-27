"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useSummarization } from "@/context/SummarizationContext";

export default function Home() {
  const [url, setUrl] = useState("");
  const { isSummarizing, startSummarization } = useSummarization();

  return (
    <div className="flex min-h-[calc(100dvh-8rem)] w-full items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        <div className="relative">
          <Card
            aria-busy={isSummarizing}
            className={`transition-opacity ${
              isSummarizing ? "pointer-events-none opacity-60" : ""
            }`}
          >
            <CardHeader>
              <CardTitle>Create a summary</CardTitle>
              <CardDescription>
                Paste a URL link to a video (e.g. YouTube).
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                className="flex flex-col gap-4 sm:flex-row"
                onSubmit={async (event) => {
                  event.preventDefault();
                  if (!url.trim() || isSummarizing) {
                    return;
                  }
                  await startSummarization(url);
                }}
              >
                <Input
                  value={url}
                  onChange={(event) => setUrl(event.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="h-11 flex-1"
                  aria-label="Video URL"
                  disabled={isSummarizing}
                  required
                />
                <Button
                  type="submit"
                  className="h-11 sm:w-auto"
                  disabled={!url.trim() || isSummarizing}
                >
                  {isSummarizing ? "Processing" : "Summarise"}
                </Button>
              </form>
            </CardContent>
          </Card>
          {isSummarizing ? (
            <div className="absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-background/70 backdrop-blur">
              <Loader2
                className="size-10 animate-spin text-primary"
                aria-hidden
              />
              <span className="sr-only">Loading…</span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
