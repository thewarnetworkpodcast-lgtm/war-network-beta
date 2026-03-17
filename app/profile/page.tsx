import Link from "next/link";

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col border-x border-white/10 bg-[#0d0d0d]">
        <header className="border-b border-white/10 bg-black px-4 py-4">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#D4AF37]">
            PROFILE
          </p>
          <h1 className="mt-2 text-2xl font-black text-white">
            Founding Member Profile
          </h1>
        </header>

        <section className="flex-1 px-4 pb-24 pt-4">
          <div className="rounded-3xl border border-[#D4AF37]/20 bg-[#111111] p-5">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
              W.A.R. Network Alpha
            </p>
            <h2 className="mt-3 text-3xl font-black text-white">Stryker</h2>
            <p className="mt-4 text-sm leading-7 text-white/75">
              Founding Member access is live. Full profile customization is being
              finalized for the public rollout.
            </p>

            <div className="mt-5 inline-flex rounded-full border border-[#D4AF37]/30 bg-black px-4 py-2 text-sm font-semibold text-[#D4AF37]">
              Launch Mode Active
            </div>
          </div>

          <div className="mt-4 rounded-3xl border border-white/10 bg-[#111111] p-5">
            <p className="text-sm font-bold text-[#D4AF37]">What’s Live Right Now</p>
            <div className="mt-4 space-y-3 text-sm leading-7 text-white/75">
              <p>Community Feed is live.</p>
              <p>Experience Rooms are live.</p>
              <p>Recovery Log is live.</p>
              <p>Messages are in rollout mode.</p>
            </div>
          </div>

          <div className="mt-4 rounded-3xl border border-white/10 bg-[#111111] p-5">
            <p className="text-sm font-bold text-[#D4AF37]">What’s Coming Next</p>
            <p className="mt-3 text-sm leading-7 text-white/75">
              Expanded member profiles, deeper customization, stronger social
              identity, and a more complete public release experience.
            </p>
          </div>
        </section>

        <nav className="sticky bottom-0 grid grid-cols-5 border-t border-white/10 bg-black/95 px-2 py-3 text-center text-[11px] text-white/60 backdrop-blur">
          <Link href="/feed">Feed</Link>
          <Link href="/rooms">Rooms</Link>
          <Link href="/recovery-log">Log</Link>
          <Link href="/messages">Chat</Link>
          <Link href="/profile" className="font-bold text-[#D4AF37]">
            Profile
          </Link>
        </nav>
      </div>
    </main>
  );
}