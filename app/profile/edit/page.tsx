"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";

export default function EditProfilePage() {
  const router = useRouter();

  const [userId, setUserId] = useState("");
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    void loadProfile();
  }, []);

  async function loadProfile() {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error("Could not load user", userError);
      return;
    }

    setUserId(user.id);

    const { data, error } = await supabase
      .from("profiles")
      .select("id, full_name, bio")
      .eq("id", user.id)
      .single();

    if (error) {
      console.error("Could not load profile", error);
    } else if (data) {
      setFullName(data.full_name || "");
      setBio(data.bio || "");
    }

    setLoaded(true);
  }

  async function saveProfile() {
    if (!userId) return;

    setSaving(true);

    const cleanName = fullName.trim();
    const cleanBio = bio.trim();

    const { error } = await supabase.from("profiles").upsert(
      {
        id: userId,
        full_name: cleanName || "Your Name",
        bio: cleanBio || "This is your space. Build your identity. Share your story.",
        updated_at: new Date().toISOString(),
      },
      { onConflict: "id" }
    );

    if (error) {
      console.error("Could not save profile", error);
      alert("Could not save profile");
      setSaving(false);
      return;
    }

    localStorage.setItem("war-profile-name", cleanName || "Your Name");
    localStorage.setItem(
      "war-profile-bio",
      cleanBio || "This is your space. Build your identity. Share your story."
    );

    setSaving(false);
    alert("Profile saved");
    router.push("/profile");
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