"use client";

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-black px-4 pb-24 pt-8 text-white">
      <div className="mx-auto flex w-full max-w-md flex-col gap-5">
        
        {/* TOP CARD */}
        <div className="rounded-3xl border border-[#D4AF37]/20 bg-[#111111] p-6">
          <div className="flex flex-col items-center text-center">
            
            {/* LOGO */}
            <div className="mb-5 flex items-center justify-center">
              <img
                src="/fracturelight.png"
                alt="W.A.R. Logo"
                className="h-28 w-28 object-contain"
              />
            </div>

            {/* HEADER */}
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#D4AF37]">
              W.A.R. Network Alpha
            </p>

            <h1 className="mt-3 text-3xl font-semibold">
              Stryker
            </h1>

            {/* STATUS */}
            <div className="mt-5 w-full rounded-2xl border border-[#D4AF37]/20 bg-black/40 px-4 py-3 text-center">
              <span className="text-sm font-semibold text-[#D4AF37]">
                Launch Mode Active
              </span>
            </div>
          </div>
        </div>

        {/* INFO CARD (FIXED TEXT) */}
        <div className="rounded-3xl border border-[#D4AF37]/20 bg-[#111111] p-5">
          <p className="text-center text-sm leading-relaxed text-white/90">
            Founding Member access is live. Full profile customization is being finalized for the public rollout.
          </p>
        </div>

        {/* LIVE STATUS */}
        <div className="rounded-3xl border border-[#D4AF37]/20 bg-[#111111] p-5">
          <p className="text-sm font-semibold text-[#D4AF37]">
            What’s Live Right Now
          </p>

          <div className="mt-4 flex flex-col gap-3 text-sm text-white/85">
            <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
              Community Feed is live.
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
              Experience Rooms are live.
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
              Recovery Log is live.
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
              Messages are in rollout mode.
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}