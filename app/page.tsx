"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black px-4 pb-24 pt-10 text-white">
      <div className="mx-auto flex w-full max-w-md flex-col gap-6">
        <div className="rounded-3xl border border-[#D4AF37]/20 bg-[#111111] p-8">
          <div className="flex flex-col items-center text-center">
            <img
              src="/fracturelight.png"
              alt="Fracturelight"
              className="h-24 w-24 object-contain mix-blend-screen"
            />

            <p className="mt-5 text-[11px] uppercase tracking-[0.25em] text-[#D4AF37]">
              W.A.R. NETWORK
            </p>

            <h1 className="mt-4 text-3xl font-semibold text-white">
              Welcome Home
            </h1>

            <p className="mt-3 max-w-sm text-sm leading-7 text-white/75">
              A place to rebuild, connect, speak honestly, and keep moving
              forward together.
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-[#D4AF37]/20 bg-[#111111] p-5">
          <p className="text-sm font-semibold text-[#D4AF37]">
            Start Here
          </p>

          <div className="mt-4 flex flex-col gap-3">
            <Link
              href="/feed"
              className="flex h-12 items-center justify-center rounded-2xl bg-[#D4AF37] px-4 text-sm font-semibold text-black transition hover:opacity-90"
            >
              Enter Community Feed
            </Link>

            <Link
              href="/spaces"
              className="flex h-12 items-center justify-center rounded-2xl border border-white/10 bg-black/30 px-4 text-sm font-semibold text-white transition hover:border-[#D4AF37]/30"
            >
              Explore Spaces
            </Link>

            <Link
              href="/recovery-log"
              className="flex h-12 items-center justify-center rounded-2xl border border-white/10 bg-black/30 px-4 text-sm font-semibold text-white transition hover:border-[#D4AF37]/30"
            >
              Open Recovery Log
            </Link>

            <Link
              href="/messages"
              className="flex h-12 items-center justify-center rounded-2xl border border-white/10 bg-black/30 px-4 text-sm font-semibold text-white transition hover:border-[#D4AF37]/30"
            >
              Go to Messages
            </Link>

            <Link
              href="/profile"
              className="flex h-12 items-center justify-center rounded-2xl border border-white/10 bg-black/30 px-4 text-sm font-semibold text-white transition hover:border-[#D4AF37]/30"
            >
              Build Your Profile
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border border-[#D4AF37]/20 bg-[#111111] p-5">
          <p className="text-sm font-semibold text-[#D4AF37]">
            What This Is
          </p>

          <p className="mt-3 text-sm leading-7 text-white/75">
            W.A.R. Network is a home for people rebuilding through trauma,
            recovery, discipline, and honest community.
          </p>
        </div>
      </div>
    </main>
  );
}