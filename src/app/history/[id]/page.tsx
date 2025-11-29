import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

type HistoryItemPageProps = {
  params: Promise<{ id: string }>;
};

async function getSummary(id: string) {
  try {
    const res = await fetch(`http://127.0.0.1:8000/items/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Failed to fetch summary:", error);
    return null;
  }
}

export default async function HistoryItem({ params }: HistoryItemPageProps) {
  const { id } = await params;
  const detail = await getSummary(id);

  if (!detail) {
    return (
      <div className="flex min-h-[calc(100dvh-8rem)] w-full items-center justify-center px-4 py-12">
        <div className="w-full max-w-3xl space-y-6">
          <Button variant="ghost" size="sm" asChild className="gap-2 w-fit">
            <Link href="/history">
              <ArrowLeft className="size-4" aria-hidden />
              Back to log
            </Link>
          </Button>
          <p className="text-muted-foreground">Summary not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100dvh-8rem)] w-full items-center justify-center px-4 py-12">
      <div className="w-full max-w-3xl space-y-6">
        <Button variant="ghost" size="sm" asChild className="gap-2 w-fit">
          <Link href="/history">
            <ArrowLeft className="size-4" aria-hidden />
            Back to log
          </Link>
        </Button>

        <p className="rounded-lg border border-dashed border-border/60 bg-muted/30 p-4 text-sm text-muted-foreground sm:text-base">
          <span className="font-semibold text-foreground">Processed URL:</span>
          <br />
          {detail.url}
        </p>
        <p className="rounded-lg border border-border/60 bg-background p-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
          {detail.summary ||
            (detail.status === "processing"
              ? "Processing..."
              : "No summary available")}
        </p>
      </div>
    </div>
  );
}
