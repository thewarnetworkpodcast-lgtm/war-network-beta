"use client";

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-black px-4 pb-24 pt-8 text-white">
      <div className="mx-auto flex w-full max-w-md flex-col gap-5">
        
        {/* HEADER */}
        <div className="rounded-3xl border border-[#D4AF37]/20 bg-[#111111] p-6">
          <div className="flex flex-col items-center text-center">
            
            {/* LOGO */}
            <img
              src="/fracturelight.png"
              alt="Fracturelight"
              className="mb-5 h-32 w-32 object-contain mix-blend-screen"
            />

            {/* TITLE */}
            <p className="text-[11px] uppercase tracking-[0.25em] text-[#D4AF37]">
              W.A.R. NETWORK ALPHA
            </p>

          </div>
        </div>

        {/* STATUS TEXT */}
        <div className="rounded-3xl border border-[#D4AF37]/20 bg-[#111111] p-6">
          <p className="text-center text-lg leading-8 text-white/90">
            Founding Member access is live. Full profile customization is being finalized for the public rollout.
          </p>
        </div>

        {/* LIVE SECTION */}
        <div className="rounded-3xl border border-[#D4AF37]/20 bg-[#111111] p-5">
          <p className="text-base font-semibold text-[#D4AF37] text-left">
            What's Live Right Now
          </p>

          <div className="mt-4 flex flex-col gap-3 text-sm text-white/85">
            <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
              Community Feed is live.
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
              Experience Spaces are live.
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