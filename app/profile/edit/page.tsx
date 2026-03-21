"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EditProfilePage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    const savedName = localStorage.getItem("war-user-name");
    const savedBio = localStorage.getItem("war-user-bio");

    if (savedName) setName(savedName);
    if (savedBio) setBio(savedBio);
  }, []);

  const handleSave = () => {
    localStorage.setItem("war-user-name", name);
    localStorage.setItem("war-user-bio", bio);

    router.push("/profile");
  };

  return (
    <main className="min-h-screen bg-black px-4 pb-24 pt-8 text-white">
      <div className="mx-auto w-full max-w-md">

        <h1 className="mb-6 text-center text-2xl font-semibold">
          Create Your Profile
        </h1>

        {/* NAME */}
        <div className="mb-4">
          <label className="text-sm text-white/70">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-xl border border-white/10 bg-[#111111] px-4 py-3 text-white outline-none"
            placeholder="Enter your name"
          />
        </div>

        {/* BIO */}
        <div className="mb-6">
          <label className="text-sm text-white/70">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="mt-1 w-full rounded-xl border border-white/10 bg-[#111111] px-4 py-3 text-white outline-none"
            placeholder="Tell your story..."
          />
        </div>

        {/* SAVE BUTTON */}
        <button
          onClick={handleSave}
          className="w-full rounded-xl bg-[#D4AF37] py-3 font-semibold text-black"
        >
          Save Profile
        </button>

      </div>
    </main>
  );
}