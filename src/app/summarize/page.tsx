export default function Summarize() {
  const url = "https://www.youtube.com/watch?v=example";
  const generatedSummary =
    "This placeholder summary illustrates how the processed transcript will be condensed. Once your backend is ready, this section will carry the key takeaways pulled from the original recording.";

  return (
    <div className="flex min-h-[calc(100dvh-8rem)] w-full items-center justify-center px-4 py-12">
      <div className="w-full max-w-3xl space-y-6">
        <p className="rounded-lg border border-dashed border-border/60 bg-muted/30 p-4 text-sm text-muted-foreground sm:text-base">
          <span className="font-semibold text-foreground">Processed URL:</span>
          <br />
          {url}
        </p>
        <p className="rounded-lg border border-border/60 bg-background p-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
          {generatedSummary}
        </p>
      </div>
    </div>
  );
}
