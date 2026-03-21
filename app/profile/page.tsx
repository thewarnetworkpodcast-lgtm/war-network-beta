"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function ProfilePage() {
  const [profileName, setProfileName] = useState("Your Name");
  const [profileBio, setProfileBio] = useState(
    "This is your space. Build your identity. Share your story."
  );
  const [photos, setPhotos] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("full_name, bio")
        .eq("id", user.id)
        .single();

      if (error && error.code !== "PGRST116") {
        console.error("Profile read error:", error);
      }

      if (data) {
        setProfileName(data.full_name || "Your Name");
        setProfileBio(
          data.bio || "This is your space. Build your identity. Share your story."
        );
      }

      const savedPhotos = localStorage.getItem(`war-profile-photos-${user.id}`);
      if (savedPhotos) {
        try {
          const parsed = JSON.parse(savedPhotos);
          if (Array.isArray(parsed)) {
            setPhotos(parsed);
          }
        } catch (err) {
          console.error("Photo parse error:", err);
        }
      }
    } catch (err) {
      console.error("Load profile failed:", err);
    } finally {
      setLoading(false);
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
              className="h-14 w-14 object-contain"
            />
          </div>

          <h1 className="text-lg font-semibold">
            {loading ? "Loading..." : profileName}
          </h1>

          <p className="mt-3 text-sm leading-7 text-white/70">
            {loading ? "" : profileBio}
          </p>

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

        <section className="grid grid-cols-3 gap-1">
          {photos.length === 0 ? (
            <div className="col-span-3 py-6 text-center text-sm text-white/50">
              No posts yet.
            </div>
          ) : (
            photos.map((photo, index) => (
              <img
                key={`${photo}-${index}`}
                src={photo}
                alt={`Post ${index + 1}`}
                className="aspect-square w-full rounded-sm object-cover"
              />
            ))
          )}
        </section>
      </div>
    </main>
  );
}