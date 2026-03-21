"use client";

function FracturelightSymbol() {
  return (
    <svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Fracturelight symbol"
      className="h-28 w-28"
    >
      <circle cx="60" cy="60" r="34" stroke="#D4AF37" strokeWidth="4" />
      <line
        x1="60"
        y1="22"
        x2="60"
        y2="98"
        stroke="#D4AF37"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-black px-4 pb-24 pt-8 text-white">
      <div className="mx-auto flex w-full max-w-md flex-col gap-5">
        <div className="rounded-3xl border border-[#D4AF37]/20 bg-[#111111] p-6">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex items-center justify-center">
              <FracturelightSymbol />
            </div>

            <p className="text-[11px] uppercase tracking-[0.24em] text-[#D4AF37]">
              W.A.R. NETWORK ALPHA
            </p>

            <div className="mt-5 w-full rounded-2xl border border-[#D4AF37]/20 bg-black/40 px-4 py-4">
              <p className="text-center text-xl font-semibold text-[#D4AF37]">
                Launch Mode Active
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-[#D4AF37]/20 bg-[#111111] p-6">
          <p className="text-center text-lg leading-8 text-white/90">
            Founding Member access is live. Full profile customization is being finalized for the public rollout.
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