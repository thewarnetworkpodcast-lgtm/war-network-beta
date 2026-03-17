import Link from "next/link";

export default function RecoveryLogPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col border-x border-white/10 bg-[#0d0d0d]">
        <header className="border-b border-white/10 bg-black px-4 py-4">
          <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37]">
            Recovery Log
          </p>
          <h1 className="mt-1 text-2xl font-black">Private Journal</h1>
          <p className="mt-2 max-w-sm text-sm leading-6 text-white/60">
            A place to track what you survived, what you felt, and how you are
            rebuilding.
          </p>
        </header>

        <section className="flex-1 px-4 pb-24 pt-5">
          <div className="rounded-3xl border border-[#D4AF37]/20 bg-[#111111] p-4">
            <p className="text-sm font-semibold text-[#D4AF37]">
              Today’s Entry
            </p>

            <textarea
              placeholder="What are you carrying today?"
              className="mt-3 min-h-[180px] w-full rounded-2xl border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none placeholder:text-white/30"
            />

            <button className="mt-3 w-full rounded-2xl bg-[#D4AF37] px-4 py-3 text-sm font-bold text-black">
              Save Entry
            </button>
          </div>

          <div className="mt-4 grid gap-4">
            <div className="rounded-3xl border border-white/10 bg-[#111111] p-4">
              <p className="text-sm font-semibold text-[#D4AF37]">
                Emotional Check-In
              </p>
              <p className="mt-2 text-sm leading-7 text-white/70">
                Honest reflection beats silent pressure. This space is for the
                truth.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-[#111111] p-4">
              <p className="text-sm font-semibold text-[#D4AF37]">
                Private by Default
              </p>
              <p className="mt-2 text-sm leading-7 text-white/70">
                Your words stay private unless you decide to share them with the
                community.
              </p>
            </div>
          </div>
        </section>

        <nav className="sticky bottom-0 grid grid-cols-5 border-t border-white/10 bg-black/95 px-2 py-3 text-center text-[11px] text-white/60 backdrop-blur">
          <Link href="/feed">Feed</Link>
          <Link href="/rooms">Rooms</Link>
          <Link href="/recovery-log" className="font-bold text-[#D4AF37]">
            Log
          </Link>
          <Link href="/messages">Chat</Link>
          <Link href="/profile">Profile</Link>
        </nav>
      </div>
    </main>
  );
}