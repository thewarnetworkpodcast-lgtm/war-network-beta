"use client";

import { useEffect, useRef, useState } from "react";

export default function EditProfilePage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const savedName = localStorage.getItem("war-profile-name");
    const savedBio = localStorage.getItem("war-profile-bio");
    const savedPhotos = localStorage.getItem("war-profile-photos");

    setFullName(savedName && savedName.trim() ? savedName : "Your Name");
    setBio(
      savedBio && savedBio.trim()
        ? savedBio
        : "This is your space. Build your identity. Share your story."
    );

    if (savedPhotos) {
      try {
        const parsed = JSON.parse(savedPhotos);
        if (Array.isArray(parsed)) {
          setPhotos(parsed);
        }
      } catch (error) {
        console.error("Could not parse saved photos", error);
      }
    }

    setLoaded(true);
  }, []);

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
        localStorage.setItem("war-profile-photos", JSON.stringify(updated));
      })
      .catch((error) => {
        console.error("Image upload failed", error);
        alert("Could not load one or more photos");
      });
  }

  function removePhoto(indexToRemove: number) {
    const updated = photos.filter((_, index) => index !== indexToRemove);
    setPhotos(updated);
    localStorage.setItem("war-profile-photos", JSON.stringify(updated));
  }

  function saveProfile() {
    setSaving(true);

    const cleanName = fullName.trim() || "Your Name";
    const cleanBio =
      bio.trim() || "This is your space. Build your identity. Share your story.";

    localStorage.setItem("war-profile-name", cleanName);
    localStorage.setItem("war-profile-bio", cleanBio);
    localStorage.setItem("war-profile-photos", JSON.stringify(photos));

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