import "./globals.css";
import { Film } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Movie Insight Builder",
  description: "Discover AI-powered movie insights and audience sentiment analysis.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground min-h-screen">

        {/* Header */}
        <header className="border-b border-border bg-card/70 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-6xl mx-auto flex items-center gap-3 px-6 py-4">
            
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/20">
              <Film className="h-5 w-5 text-primary" />
            </div>

            <h1 className="text-xl font-bold tracking-tight">
              AI Movie Insight Builder
            </h1>

          </div>
        </header>

        {/* Page Content */}
        <main className="min-h-[calc(100vh-64px)]">
          {children}
        </main>

      </body>
    </html>
  );
}