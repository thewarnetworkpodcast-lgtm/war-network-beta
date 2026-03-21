import Link from "next/link";

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">

      {/* Main Content */}
      <div className="flex-1">{children}</div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-white/10 bg-black/95 backdrop-blur px-2 py-3">
        <div className="max-w-md mx-auto grid grid-cols-5 text-xs text-center">

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

    </div>
  );
}