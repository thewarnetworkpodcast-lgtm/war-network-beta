"use client";

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-black px-4 pb-24 pt-8 text-white">
      <div className="mx-auto flex w-full max-w-md flex-col gap-5">
        <div className="rounded-3xl border border-[#D4AF37]/20 bg-[#111111] p-6">
          <div className="flex flex-col items-center text-center">
            <div className="mb-5 flex items-center justify-center">
              <img
                src="/fracturelight.png"
                alt="Fracturelight"
                className="h-32 w-32 object-contain mix-blend-screen"
              />
            </div>

            <p className="text-[11px] uppercase tracking-[0.25em] text-[#D4AF37]">
              W.A.R. NETWORK ALPHA
            </p>

            <div className="mt-5 flex w-full items-center justify-center rounded-2xl border border-[#D4AF37]/20 bg-black/40 px-4 py-6">
              <p className="text-center text-xl font-semibold text-[#D4AF37]">
                Launch Mode Active
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-[#D4AF37]/20 bg-[#111111] p-6">
          <p className="text-center text-lg leading-8 text-white/90">
            Founding Member access is live. Full profile customization is being
            finalized for the public rollout.
          </p>
        </div>

        <div className="rounded-3xl border border-[#D4AF37]/20 bg-[#111111] p-5">
          <p className="text-base font-semibold text-[#D4AF37]">
            What&apos;s Live Right Now
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