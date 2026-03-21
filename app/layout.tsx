import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "W.A.R. Network",
  description: "We’re All Recovering",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-white">
        <div className="min-h-screen pb-20">
          {children}
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-black/95 backdrop-blur px-2 py-3">
          <div className="mx-auto grid max-w-md grid-cols-5 text-xs text-center">

            <Link href="/" className="text-white/70">
              Feed
            </Link>

            <Link href="/spaces" className="text-white/70">
              Spaces
            </Link>

            <Link href="/recovery-log" className="text-white/70">
              Log
            </Link>

            <Link href="/messages" className="text-white/70">
              Messages
            </Link>

            <Link href="/profile" className="text-white/70">
              Profile
            </Link>

          </div>
        </div>
      </body>
    </html>
  );
}