"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface HistoryItem {
  id: number;
  url: string;
  summary: string;
  status: string;
}

export default function History() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const response = await fetch("/api/get/all-results");
        if (response.ok) {
          const data = await response.json();
          setHistory(
            data.filter((item: HistoryItem) => item.status !== "failed")
          );
        }
      } catch (error) {
        console.error("Failed to fetch history:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchHistory();
  }, []);

  return (
    <div className="flex min-h-[calc(100dvh-8rem)] w-full items-start justify-center px-4 py-12">
      <div className="w-full max-w-5xl space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold sm:text-3xl">
            Summary history
          </h1>
          <p className="text-sm text-muted-foreground sm:text-base">
            Each card represents a processed link alongside its condensed recap.
          </p>
        </div>

        <div className="rounded-xl border border-border/60">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-sm font-semibold">Summary</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell className="p-4 text-center text-muted-foreground">
                    Loading history...
                  </TableCell>
                </TableRow>
              ) : history.length === 0 ? (
                <TableRow>
                  <TableCell className="p-4 text-center text-muted-foreground">
                    No history found.
                  </TableCell>
                </TableRow>
              ) : (
                history.map((item) => (
                  <TableRow key={item.id} className="bg-background">
                    <TableCell className="p-0 align-top">
                      <Link href={`/history/${item.id}`} className="block">
                        <Card className="rounded-none border-0 border-b border-border/40 gap-0 py-0 transition-colors last:border-b-0 hover:bg-muted/40">
                          <CardHeader className="space-y-1 px-4 py-3 pb-1">
                            <CardTitle className="text-sm font-medium">
                              {item.url}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="px-4 pb-4 pt-1">
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {item.summary ||
                                (item.status === "processing"
                                  ? "Processing..."
                                  : "No summary available")}
                            </p>
                          </CardContent>
                        </Card>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
