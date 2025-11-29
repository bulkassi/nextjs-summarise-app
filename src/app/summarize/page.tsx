"use client";

import { useSummarization } from "@/context/SummarizationContext";

export default function Summarize() {
  const { latestSummary } = useSummarization();

  if (!latestSummary) {
    return (
      <div className="flex min-h-[calc(100dvh-8rem)] w-full items-center justify-center px-4 py-12">
        <p className="text-muted-foreground">
          No summary available. Please create one first.
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100dvh-8rem)] w-full items-center justify-center px-4 py-12">
      <div className="w-full max-w-3xl space-y-6">
        <p className="rounded-lg border border-dashed border-border/60 bg-muted/30 p-4 text-sm text-muted-foreground sm:text-base">
          <span className="font-semibold text-foreground">Processed URL:</span>
          <br />
          {latestSummary.url}
        </p>
        <p className="rounded-lg border border-border/60 bg-background p-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
          {latestSummary.summary}
        </p>
      </div>
    </div>
  );
}
