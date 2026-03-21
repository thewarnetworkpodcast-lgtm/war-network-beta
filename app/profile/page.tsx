"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black px-4 pb-24 pt-16 text-white">
      <div className="mx-auto flex w-full max-w-md flex-col items-center text-center">

        {/* LOGO */}
        <img
          src="/fracturelight.png"
          alt="Fracturelight"
          className="h-36 w-36 object-contain mb-6"
        />

        {/* BRAND */}
        <p className="text-[11px] uppercase tracking-[0.25em] text-[#D4AF37]">
          W.A.R. NETWORK
        </p>

        {/* HEADLINE */}
        <h1 className="mt-4 text-3xl font-bold">
          Welcome Home
        </h1>

        {/* SUBTEXT */}
        <p className="mt-3 text-sm text-white/70 leading-relaxed">
          This is your space to rebuild, connect, and move forward.
          You don’t have to do it alone.
        </p>

        {/* BUTTONS */}
        <div className="mt-8 flex w-full flex-col gap-3">

          <Link
            href="/feed"
            className="rounded-xl bg-[#D4AF37] py-3 text-black font-semibold"
          >
            Enter Community
          </Link>

          <Link
            href="/spaces"
            className="rounded-xl border border-[#D4AF37]/30 py-3 text-[#D4AF37]"
          >
            Explore Spaces
          </Link>

        </div>

      </div>
    </main>
  );
}