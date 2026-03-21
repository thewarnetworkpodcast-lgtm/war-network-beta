"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black px-4 pb-24 pt-8 text-white">
      <div className="mx-auto flex w-full max-w-md flex-col gap-5">
        <div className="w-full rounded-3xl border border-[#D4AF37]/20 bg-[#111111] px-6 py-8">
          <div className="flex flex-col items-center text-center">
            <img
              src="/fracturelight.png"
              alt="Fracturelight"
              className="h-20 w-20 object-contain mix-blend-screen"
            />

            <p className="mt-4 text-[11px] uppercase tracking-[0.22em] text-[#D4AF37]">
              W.A.R. NETWORK
            </p>

            <h1 className="mt-3 text-2xl font-semibold text-white">
              Welcome Home
            </h1>

            <p className="mt-4 max-w-[280px] text-center text-sm leading-7 text-white/75">
              You’re not alone here.
            </p>
          </div>
        </div>

        <div className="w-full rounded-3xl border border-[#D4AF37]/20 bg-[#111111] px-5 py-5">
          <p className="text-center text-sm font-semibold text-[#D4AF37]">
            Start Here
          </p>

          <div className="mt-4 flex flex-col gap-3">
            <Link
              href="/feed"
              className="flex h-12 items-center justify-center rounded-2xl bg-[#D4AF37] text-sm font-semibold text-black"
            >
              Enter Community Feed
            </Link>

            <Link
              href="/spaces"
              className="flex h-12 items-center justify-center rounded-2xl border border-white/10 text-sm font-semibold text-white"
            >
              Explore Spaces
            </Link>

            <Link
              href="/recovery-log"
              className="flex h-12 items-center justify-center rounded-2xl border border-white/10 text-sm font-semibold text-white"
            >
              Recovery Log
            </Link>

            <Link
              href="/messages"
              className="flex h-12 items-center justify-center rounded-2xl border border-white/10 text-sm font-semibold text-white"
            >
              Messages
            </Link>

            <Link
              href="/profile"
              className="flex h-12 items-center justify-center rounded-2xl border border-white/10 text-sm font-semibold text-white"
            >
              Create Profile
            </Link>
          </div>
        </div>

        <div className="w-full rounded-3xl border border-[#D4AF37]/20 bg-[#111111] px-6 py-6">
          <p className="text-sm font-semibold text-[#D4AF37]">
            What This Is
          </p>

          <p className="mt-4 max-w-[280px] text-sm leading-7 text-white/75">
            W.A.R. Network is a home for people rebuilding through trauma.
          </p>
        </div>
      </div>
    </main>
  );
}