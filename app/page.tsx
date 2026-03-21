"use client";

import Link from "next/link";
import { useState } from "react";
import { supabase } from "./lib/supabaseClient";

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignIn() {
    const cleanEmail = email.trim();

    if (!cleanEmail) {
      alert("Enter your email");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signInWithOtp({
      email: cleanEmail,
    });

    setLoading(false);

    if (error) {
      console.error(error);
      alert("Could not send sign in link");
      return;
    }

    alert("Check your email for your sign in link");
  }

  return (
    <main className="min-h-screen bg-[#0b0b0b] px-6 py-10 text-white">
      <div className="mx-auto flex min-h-[85vh] w-full max-w-md flex-col items-center justify-center gap-6 text-center">
        <img
          src="/fracturelight.png"
          alt="W.A.R. Network"
          className="h-20 w-20 object-contain"
        />

        <div className="space-y-3">
          <h1 className="text-3xl font-semibold text-[#D4AF37]">
            Welcome Home
          </h1>

          <p className="text-sm leading-7 text-white/70">
            W.A.R. Network is a place to connect, rebuild, and recover with people
            who understand the weight you carry.
          </p>
        </div>

        <section className="w-full rounded-2xl border border-white/10 bg-black/40 p-6 text-left">
          <h2 className="mb-3 text-center text-lg font-semibold text-[#D4AF37]">
            Sign Up or Sign In
          </h2>

          <p className="mb-4 text-center text-sm text-white/60">
            Enter your email and we’ll send you a secure login link.
          </p>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none"
          />

          <button
            onClick={handleSignIn}
            disabled={loading}
            className="mt-4 w-full rounded-xl bg-[#D4AF37] px-4 py-3 text-sm font-semibold text-black disabled:opacity-60"
          >
            {loading ? "Sending Link..." : "Continue"}
          </button>
        </section>

        <div className="w-full rounded-2xl border border-white/10 bg-black/40 p-5">
          <p className="text-sm text-white/65">
            Already inside the network?
          </p>

          <Link
            href="/profile"
            className="mt-4 block w-full rounded-xl border border-[#D4AF37] px-4 py-3 text-sm font-semibold text-[#D4AF37]"
          >
            Enter W.A.R. Network
          </Link>
        </div>
      </div>
    </main>
  );
}