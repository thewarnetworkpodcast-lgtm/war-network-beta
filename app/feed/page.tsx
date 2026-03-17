import Link from "next/link";

export default function FeedPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col border-x border-white/10 bg-[#0d0d0d]">
        <header className="sticky top-0 z-20 border-b border-white/10 bg-black/85 px-4 py-4 backdrop-blur">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37]">
                W.A.R. Network
              </p>
              <h1 className="mt-1 text-2xl font-black">Welcome Home</h1>
            </div>

            <Link
              href="/"
              className="rounded-full border border-[#D4AF37]/40 px-3 py-1 text-xs font-semibold text-[#D4AF37]"
            >
              Landing
            </Link>
          </div>
        </header>

        <section className="flex-1 px-4 pb-24 pt-4">
          <div className="mb-4 rounded-3xl border border-[#D4AF37]/20 bg-[#121212] p-4">
            <p className="text-sm font-semibold text-[#D4AF37]">Community Feed</p>
            <p className="mt-2 text-sm text-white/65">
              The main screen is now focused on the feed so people immediately
              see the heart of the platform.
            </p>
          </div>

          <div className="mb-4 rounded-3xl border border-white/10 bg-[#111111] p-4">
            <p className="text-sm font-semibold text-white">
              Share something with the community
            </p>
            <textarea
              placeholder="Speak freely. This is where rebuilding begins."
              className="mt-3 min-h-[120px] w-full rounded-2xl border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none placeholder:text-white/30"
            />
            <button className="mt-3 w-full rounded-2xl bg-[#D4AF37] px-4 py-3 text-sm font-bold text-black">
              Post
            </button>
          </div>

          <div className="space-y-4">
            <div className="rounded-3xl border border-white/10 bg-[#111111] p-4">
              <p className="text-sm font-semibold text-[#D4AF37]">
                Founding Member Alpha
              </p>
              <p className="mt-2 text-base font-semibold text-white">
                This is where the real feed will live.
              </p>
              <p className="mt-2 text-sm leading-7 text-white/65">
                Stories, encouragement, truth, rebuilding, and real-life support.
                No fake perfection. No pretending. Just people healing in public
                and private the right way.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-[#111111] p-4">
              <p className="text-sm font-semibold text-[#D4AF37]">
                Quick Access
              </p>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <Link
                  href="/rooms"
                  className="rounded-2xl border border-white/10 bg-black px-4 py-4 text-sm font-semibold text-white"
                >
                  Experience Rooms
                </Link>

                <Link
                  href="/recovery-log"
                  className="rounded-2xl border border-white/10 bg-black px-4 py-4 text-sm font-semibold text-white"
                >
                  Recovery Log
                </Link>

                <Link
                  href="/messages"
                  className="rounded-2xl border border-white/10 bg-black px-4 py-4 text-sm font-semibold text-white"
                >
                  Messages
                </Link>

                <Link
                  href="/profile"
                  className="rounded-2xl border border-white/10 bg-black px-4 py-4 text-sm font-semibold text-white"
                >
                  Profile
                </Link>
              </div>
            </div>
          </div>
        </section>

        <nav className="sticky bottom-0 grid grid-cols-5 border-t border-white/10 bg-black/95 px-2 py-3 text-center text-[11px] text-white/60 backdrop-blur">
          <Link href="/feed" className="font-bold text-[#D4AF37]">
            Feed
          </Link>
          <Link href="/rooms">Rooms</Link>
          <Link href="/recovery-log">Log</Link>
          <Link href="/messages">Chat</Link>
          <Link href="/profile">Profile</Link>
        </nav>
      </div>
    </main>
  );
}