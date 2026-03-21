"use client";

import { useEffect, useState } from "react";

type Space = {
  id: string;
  name: string;
  password: string;
};

const STORAGE_KEY = "war-private-spaces";

export default function SpacesPage() {
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setSpaces(JSON.parse(saved));
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(spaces));
  }, [spaces, loaded]);

  function handleCreateSpace() {
    if (!name.trim() || !password.trim()) return;

    const newSpace: Space = {
      id: crypto.randomUUID(),
      name: name.trim(),
      password: password.trim(),
    };

    setSpaces((prev) => [newSpace, ...prev]);
    setName("");
    setPassword("");
  }

  return (
    <main className="min-h-screen bg-black px-4 pt-6 pb-24 text-white">
      <div className="mx-auto flex w-full max-w-md flex-col gap-6">
        <div className="rounded-3xl border border-[#D4AF37]/20 bg-[#111111] p-5">
          <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37]">
            Private Spaces
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-white">
            Build Your Space
          </h1>
          <p className="mt-2 text-sm leading-6 text-white/65">
            Create a protected space for your circle, mission, or recovery lane.
          </p>
        </div>

        <div className="rounded-3xl border border-[#D4AF37]/20 bg-[#111111] p-5">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Space name"
            className="mb-3 w-full rounded-2xl border border-[#D4AF37]/20 bg-black p-3 text-sm text-white outline-none placeholder:text-white/35"
          />

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            className="mb-3 w-full rounded-2xl border border-[#D4AF37]/20 bg-black p-3 text-sm text-white outline-none placeholder:text-white/35"
          />

          <button
            onClick={handleCreateSpace}
            className="w-full rounded-2xl bg-[#D4AF37] py-3 text-sm font-semibold text-black"
          >
            Create Space
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {spaces.length === 0 ? (
            <p className="text-sm text-white/50">No private spaces yet.</p>
          ) : (
            spaces.map((space) => (
              <div
                key={space.id}
                className="rounded-2xl border border-[#D4AF37]/20 bg-[#111111] p-4"
              >
                <p className="font-semibold text-white">{space.name}</p>
                <p className="mt-1 text-xs text-white/40">Protected Space</p>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}