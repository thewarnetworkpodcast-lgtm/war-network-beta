"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";

export default function EditProfilePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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
        console.error("Profile load error:", error);
      }

      if (data) {
        setFullName(data.full_name || "");
        setBio(data.bio || "");
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

  function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;

    const readers = Array.from(files).map(
      (file) =>
        new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        })
    );

    Promise.all(readers)
      .then((images) => {
        const updated = [...photos, ...images];
        setPhotos(updated);
      })
      .catch((err) => {
        console.error("Image load failed:", err);
        alert("Could not load one or more photos");
      });
  }

  function removePhoto(indexToRemove: number) {
    const updated = photos.filter((_, index) => index !== indexToRemove);
    setPhotos(updated);
  }

  async function saveProfile() {
    setSaving(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        alert("You are not signed in");
        setSaving(false);
        return;
      }

      const cleanName = fullName.trim() || "Your Name";
      const cleanBio =
        bio.trim() || "This is your space. Build your identity. Share your story.";

      const { error } = await supabase.from("profiles").upsert(
        {
          id: user.id,
          full_name: cleanName,
          bio: cleanBio,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "id" }
      );

      if (error) {
        console.error("Save profile error:", error);
        alert("Error saving profile");
        setSaving(false);
        return;
      }

      localStorage.setItem(`war-profile-photos-${user.id}`, JSON.stringify(photos));

      router.push("/profile");
      router.refresh();
    } catch (err) {
      console.error("Save failed:", err);
      alert("Something went wrong saving your profile");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#0b0b0b] px-4 py-6 pb-24 text-white">
      <div className="mx-auto flex w-full max-w-md flex-col gap-4">
        <section className="rounded-2xl border border-white/10 bg-black/40 p-6">
          <h1 className="mb-4 text-center text-xl font-semibold text-[#D4AF37]">
            Edit Profile
          </h1>

          {loading ? (
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
                  placeholder="Your Name"
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
                  placeholder="Your bio"
                  rows={4}
                  className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-white/80">
                  Photos
                </label>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleFiles(e.target.files)}
                  className="hidden"
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full rounded-xl border border-[#D4AF37] px-4 py-3 text-sm font-semibold text-[#D4AF37]"
                >
                  Upload Photos
                </button>
              </div>

              {photos.length > 0 && (
                <div className="grid grid-cols-3 gap-2">
                  {photos.map((photo, index) => (
                    <div
                      key={`${photo}-${index}`}
                      className="relative overflow-hidden rounded-lg border border-white/10"
                    >
                      <img
                        src={photo}
                        alt={`Upload ${index + 1}`}
                        className="aspect-square w-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(index)}
                        className="absolute right-1 top-1 rounded bg-black/70 px-2 py-1 text-xs text-white"
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <button
                onClick={saveProfile}
                disabled={saving}
                className="rounded-xl bg-[#D4AF37] px-4 py-3 font-semibold text-black disabled:opacity-60"
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