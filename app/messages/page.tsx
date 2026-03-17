import Link from "next/link";

export default function MessagesPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col border-x border-white/10 bg-[#0d0d0d]">
        <header className="border-b border-white/10 bg-black px-4 py-4">
          <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37]">
            Messages
          </p>
          <h1 className="mt-1 text-2xl font-black">Direct Connection</h1>
        </header>

        <section className="flex-1 px-4 pb-24 pt-5">
          <div className="rounded-3xl border border-white/10 bg-[#111111] p-4">
            <p className="text-sm font-semibold text-[#D4AF37]">
              Inbox Coming Alive
            </p>
            <p className="mt-2 text-sm leading-7 text-white/70">
              This is where one-to-one conversations and safe support will live
              inside the platform.
            </p>
          </div>

          <div className="mt-4 space-y-3">
            <div className="rounded-2xl border border-white/10 bg-[#111111] p-4">
              <p className="font-semibold text-white">Founding Members Room</p>
              <p className="mt-1 text-sm text-white/60">
                First connections begin here.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#111111] p-4">
              <p className="font-semibold text-white">Private Support Threads</p>
              <p className="mt-1 text-sm text-white/60">
                Real conversations without the noise.
              </p>
            </div>
          </div>
        </section>

        <nav className="sticky bottom-0 grid grid-cols-5 border-t border-white/10 bg-black/95 px-2 py-3 text-center text-[11px] text-white/60 backdrop-blur">
          <Link href="/feed">Feed</Link>
          <Link href="/rooms">Rooms</Link>
          <Link href="/recovery-log">Log</Link>
          <Link href="/messages" className="font-bold text-[#D4AF37]">
            Chat
          </Link>
          <Link href="/profile">Profile</Link>
        </nav>
      </div>
    </main>
  );
}