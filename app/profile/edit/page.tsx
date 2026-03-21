"use client";

import { useEffect, useState } from "react";

export default function EditProfilePage() {
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const savedName = localStorage.getItem("war-profile-name");
    const savedBio = localStorage.getItem("war-profile-bio");

    setFullName(savedName && savedName.trim() ? savedName : "Your Name");
    setBio(
      savedBio && savedBio.trim()
        ? savedBio
        : "This is your space. Build your identity. Share your story."
    );

    setLoaded(true);
  }, []);

  function saveProfile() {
    setSaving(true);

    const cleanName = fullName.trim() || "Your Name";
    const cleanBio =
      bio.trim() || "This is your space. Build your identity. Share your story.";

    localStorage.setItem("war-profile-name", cleanName);
    localStorage.setItem("war-profile-bio", cleanBio);

    window.location.href = "/profile";
  }

  return (
    <main className="min-h-screen bg-[#0b0b0b] px-4 py-6 pb-24 text-white">
      <div className="mx-auto flex w-full max-w-md flex-col gap-4">
        <section className="rounded-2xl border border-white/10 bg-black/40 p-6">
          <h1 className="mb-4 text-center text-xl font-semibold text-[#D4AF37]">
            Edit Profile
          </h1>

          {!loaded ? (
            <div className="rounded-xl border border-white/10 py-4 text-center text-sm text-white/60">
              Loading...
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-white/80">
                  Name
                </label>
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-white/80">
                  Bio
                </label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell people who you are"
                  rows={5}
                  className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none"
                />
              </div>

              <button
                onClick={saveProfile}
                disabled={saving}
                className="rounded-xl bg-[#D4AF37] px-4 py-3 text-sm font-semibold text-black disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save Profile"}
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}