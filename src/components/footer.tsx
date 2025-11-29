export const Footer = () => {
  return (
    <footer className="border-t border-border/80 bg-background/90">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 text-xs text-muted-foreground sm:text-sm">
        <span>© 2025 Rudenya A.D.</span>
        <span className="hidden sm:inline-flex items-center gap-2">
          Built for quick study sessions
        </span>
      </div>
    </footer>
  );
};
