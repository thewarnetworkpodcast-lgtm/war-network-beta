"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [name, setName] = useState("Your Name");
  const [bio, setBio] = useState(
    "This is your space. Build your identity. Share your story."
  );

  useEffect(() => {
    const savedName = localStorage.getItem("war-user-name");
    const savedBio = localStorage.getItem("war-user-bio");

    if (savedName) setName(savedName);
    if (savedBio) setBio(savedBio);
  }, []);

  return (
    <main className="min-h-screen bg-black px-4 pb-24 pt-8 text-white">
      <div className="mx-auto flex w-full max-w-md flex-col gap-6">

        {/* PROFILE CARD */}
        <div className="rounded-3xl border border-[#D4AF37]/20 bg-[#111111] p-6">
          <div className="flex flex-col items-center text-center">

            {/* PROFILE IMAGE */}
            <img
              src="/fracturelight.png"
              alt="Profile"
              className="h-28 w-28 rounded-full object-cover border border-[#D4AF37]/30"
            />

            {/* NAME */}
            <h1 className="mt-4 text-2xl font-semibold">
              {name}
            </h1>

            {/* BIO */}
            <p className="mt-2 text-sm text-white/70">
              {bio}
            </p>

            {/* FRIEND COUNT (placeholder for now) */}
            <p className="mt-3 text-sm text-[#D4AF37]">
              0 Friends
            </p>

            {/* EDIT BUTTON */}
            <Link
              href="/profile/edit"
              className="mt-5 rounded-xl border border-[#D4AF37]/30 px-5 py-2 text-sm text-[#D4AF37]"
            >
              Edit Profile
            </Link>

          </div>
        </div>

        {/* FUTURE AREA */}
        <div className="rounded-3xl border border-[#D4AF37]/20 bg-[#111111] p-5">
          <p className="text-center text-sm text-white/70">
            Your activity and posts will appear here.
          </p>
        </div>

      </div>
    </main>
  );
}