import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SummarizationProvider } from "@/context/SummarizationContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Summarise smarter",
  description: "Turn long-form videos into quick insights in seconds.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <SummarizationProvider>
          <div className="grid min-h-dvh grid-rows-[auto_1fr_auto]">
            <Header />
            <main className="flex-1 overflow-x-hidden">{children}</main>
            <Footer />
          </div>
        </SummarizationProvider>
      </body>
    </html>
  );
}
