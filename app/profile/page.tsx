"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [profileName, setProfileName] = useState("Your Name");
  const [profileBio, setProfileBio] = useState(
    "This is your space. Build your identity. Share your story."
  );
  const [photos, setPhotos] = useState<string[]>([]);

  useEffect(() => {
    const savedName = localStorage.getItem("war-profile-name");
    const savedBio = localStorage.getItem("war-profile-bio");
    const savedPhotos = localStorage.getItem("war-profile-photos");

    if (savedName && savedName.trim()) setProfileName(savedName);
    if (savedBio && savedBio.trim()) setProfileBio(savedBio);
    if (savedPhotos) setPhotos(JSON.parse(savedPhotos));
  }, []);

  return (
    <main className="min-h-screen bg-[#0b0b0b] px-4 py-6 pb-24 text-white">
      <div className="mx-auto flex w-full max-w-md flex-col gap-4">

        {/* PROFILE */}
        <section className="rounded-2xl border border-white/10 bg-black/40 p-6 text-center">
          <div className="mb-4 flex justify-center">
            <img
              src="/fracturelight.png"
              className="h-14 w-14 object-contain"
            />
          </div>

          <h1 className="text-lg font-semibold">{profileName}</h1>

          <p className="mt-3 text-sm text-white/70">{profileBio}</p>

          <p className="mt-4 text-sm font-semibold text-[#D4AF37]">
            {photos.length} Posts
          </p>

          <Link
            href="/profile/edit"
            className="mt-4 block w-full rounded-xl border border-[#D4AF37] px-4 py-3 text-sm font-semibold text-[#D4AF37]"
          >
            Edit Profile
          </Link>
        </section>

        {/* PHOTO GRID */}
        <section className="grid grid-cols-3 gap-1">
          {photos.length === 0 ? (
            <div className="col-span-3 text-center text-sm text-white/50 py-6">
              No posts yet.
            </div>
          ) : (
            photos.map((photo, index) => (
              <img
                key={index}
                src={photo}
                className="aspect-square object-cover"
              />
            ))
          )}
        </section>

      </div>
    </main>
  );
}