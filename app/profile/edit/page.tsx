"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [profileName, setProfileName] = useState("Your Name");
  const [profileBio, setProfileBio] = useState(
    "This is your space. Build your identity. Share your story."
  );

  useEffect(() => {
    const savedName = localStorage.getItem("war-profile-name");
    const savedBio = localStorage.getItem("war-profile-bio");

    if (savedName && savedName.trim()) {
      setProfileName(savedName);
    }

    if (savedBio && savedBio.trim()) {
      setProfileBio(savedBio);
    }
  }, []);

  return (
    <main className="min-h-screen bg-[#0b0b0b] px-4 py-6 pb-24 text-white">
      <div className="mx-auto flex w-full max-w-md flex-col gap-4">

        {/* PROFILE CARD */}
        <section className="rounded-2xl border border-white/10 bg-black/40 p-6 text-center">
          <div className="mb-4 flex justify-center">
            <div className="h-10 w-10 text-[#D4AF37] text-xl">Φ</div>
          </div>

          <h1 className="text-lg font-semibold">{profileName}</h1>

          <p className="mt-2 text-sm text-white/70">
            {profileBio}
          </p>

          <p className="mt-3 text-sm text-[#D4AF37]">
            0 Friends
          </p>

          <Link href="/profile/edit">
            <button className="mt-4 w-full rounded-xl border border-[#D4AF37] px-4 py-3 text-sm font-semibold text-[#D4AF37]">
              Edit Profile
            </button>
          </Link>
        </section>

        {/* ADD FRIEND */}
        <section className="rounded-2xl border border-white/10 bg-black/40 p-6">
          <h2 className="mb-3 text-center text-sm font-semibold text-[#D4AF37]">
            Add Friend by Name
          </h2>

          <input
            placeholder="Search profile name"
            className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none"
          />

          <button className="mt-3 w-full rounded-xl bg-[#D4AF37] px-4 py-3 text-sm font-semibold text-black">
            Search
          </button>

          <p className="mt-3 text-center text-sm text-white/60">
            No users found.
          </p>
        </section>

      </div>
    </main>
  );
}