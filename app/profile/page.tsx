"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function ProfilePage() {
  const [profileName, setProfileName] = useState("Your Name");
  const [profileBio, setProfileBio] = useState(
    "This is your space. Build your identity. Share your story."
  );
  const [friendsCount, setFriendsCount] = useState(0);
  const [searchName, setSearchName] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    void loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      setUserId(user.id);

      const savedName = localStorage.getItem("war-profile-name");
      const savedBio = localStorage.getItem("war-profile-bio");

      if (savedName && savedName.trim()) setProfileName(savedName);
      if (savedBio && savedBio.trim()) setProfileBio(savedBio);

      const { data } = await supabase
        .from("friends")
        .select("id")
        .eq("user_id", user.id);

      if (data) setFriendsCount(data.length);
    } catch (error) {
      console.error("Profile load failed:", error);
    }
  }

  return (
    <main className="min-h-screen bg-[#0b0b0b] px-4 py-6 pb-24 text-white">
      <div className="mx-auto flex w-full max-w-md flex-col gap-4">
        <section className="rounded-2xl border border-white/10 bg-black/40 p-6 text-center">
          <div className="mb-4 flex justify-center">
            <img
              src="/fracturelight.png"
              alt="Fracturelight"
              className="h-12 w-12 object-contain"
            />
          </div>

          <h1 className="text-lg font-semibold">{profileName}</h1>

          <p className="mt-3 text-sm leading-7 text-white/70">{profileBio}</p>

          <p className="mt-4 text-sm font-semibold text-[#D4AF37]">
            {friendsCount} Friends
          </p>

          <Link
            href="/profile/edit"
            className="mt-4 block w-full rounded-lg border border-[#D4AF37] py-2 text-center text-[#D4AF37]"
          >
            Edit Profile
          </Link>
        </section>

        <section className="rounded-2xl border border-white/10 bg-black/40 p-4 text-center">
          <h2 className="mb-3 font-semibold text-[#D4AF37]">
            Add Friend by Name
          </h2>

          <input
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder="Search profile name"
            className="mb-3 w-full rounded-lg border border-white/10 bg-black px-3 py-2 text-sm outline-none"
          />

          <button
            className="w-full rounded-lg bg-[#D4AF37] py-2 text-sm font-semibold text-black"
          >
            Search
          </button>

          <div className="mt-4 rounded-lg border border-white/10 py-3 text-center text-sm text-white/50">
            No users found.
          </div>
        </section>
      </div>
    </main>
  );
}