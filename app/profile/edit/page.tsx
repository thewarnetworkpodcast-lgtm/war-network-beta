"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";

export default function EditProfilePage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    void loadProfile();
  }, []);

  async function loadProfile() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error && error.code !== "PGRST116") {
      console.error(error);
    }

    if (data) {
      setFullName(data.full_name || "");
      setBio(data.bio || "");
    }

    setLoading(false);
  }

  async function saveProfile() {
    setSaving(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setSaving(false);
      return;
    }

    const { error } = await supabase.from("profiles").upsert({
      id: user.id,
      full_name: fullName,
      bio: bio,
      updated_at: new Date().toISOString(),
    });

    if (error) {
      console.error(error);
      alert("Error saving profile");
      setSaving(false);
      return;
    }

    router.push("/profile");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-[#0b0b0b] px-4 py-6 pb-24 text-white">
      <div className="mx-auto flex w-full max-w-md flex-col gap-4">
        <section className="rounded-2xl border border-white/10 bg-black/40 p-6">
          <h1 className="mb-4 text-center text-xl font-semibold text-[#D4AF37]">
            Edit Profile
          </h1>

          {loading ? (
            <div className="text-center text-white/60">Loading...</div>
          ) : (
            <div className="flex flex-col gap-4">
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your Name"
                className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm text-white"
              />

              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Your bio"
                rows={4}
                className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm text-white"
              />

              <button
                onClick={saveProfile}
                disabled={saving}
                className="rounded-xl bg-[#D4AF37] px-4 py-3 font-semibold text-black"
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