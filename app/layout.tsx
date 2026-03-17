import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "W.A.R. Network | We’re All Recovering",
  description:
    "Welcome Home. W.A.R. Network is the new trauma-informed social platform built for healing, rebuilding, and real connection.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}