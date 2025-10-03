import Link from "next/link";

export const Header = () => {
  return (
    <header className="flex justify-center items-center">
      <nav className="flex flex-row gap-4">
        <Link className="text-gray-500" href="/summarize">
          New Summary
        </Link>
        <Link className="text-gray-500" href="/history">
          History
        </Link>
      </nav>
    </header>
  );
};
