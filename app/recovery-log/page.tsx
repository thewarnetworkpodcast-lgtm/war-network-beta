"use client";

import { useEffect, useMemo, useState } from "react";

type JournalEntry = {
  id: string;
  title: string;
  body: string;
  mood: string;
  createdAt: string;
};

const STORAGE_KEY = "war-recovery-log-entries";

export default function RecoveryLogPage() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [mood, setMood] = useState("Focused");
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as JournalEntry[];
        setEntries(parsed);
      }
    } catch (error) {
      console.error("Failed to load Recovery Log entries:", error);
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    } catch (error) {
      console.error("Failed to save Recovery Log entries:", error);
    }
  }, [entries, loaded]);

  const sortedEntries = useMemo(() => {
    return [...entries].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [entries]);

  function handleSaveEntry() {
    const cleanTitle = title.trim();
    const cleanBody = body.trim();

    if (!cleanBody) return;

    const newEntry: JournalEntry = {
      id: crypto.randomUUID(),
      title: cleanTitle || "Untitled Entry",
      body: cleanBody,
      mood,
      createdAt: new Date().toISOString(),
    };

    setEntries((prev) => [newEntry, ...prev]);
    setTitle("");
    setBody("");
    setMood("Focused");
  }

  function handleDeleteEntry(id: string) {
    setEntries((prev) => prev.filter((entry) => entry.id !== id));
  }

  function formatDate(value: string) {
    return new Date(value).toLocaleString([], {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  }

  return (
    <main className="min-h-screen bg-black px-4 pb-24 pt-6 text-white">
      <div className="mx-auto flex w-full max-w-md flex-col gap-6">
        <div className="rounded-3xl border border-[#D4AF37]/20 bg-[#111111] p-5 shadow-[0_0_30px_rgba(212,175,55,0.08)]">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#D4AF37]">
            Recovery Log
          </p>
          <h1 className="mt-3 text-3xl font-semibold leading-tight text-white">
            Welcome Home
          </h1>
          <p className="mt-3 text-sm leading-6 text-white/70">
            This space is yours. Write it out, clear your head, and keep moving.
          </p>
        </div>

        <div className="rounded-3xl border border-[#D4AF37]/20 bg-[#111111] p-5">
          <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
            Entry Title
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What is this entry about?"
            className="w-full rounded-2xl border border-[#D4AF37]/20 bg-black px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
          />

          <label className="mb-2 mt-4 block text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
            Mood
          </label>
          <select
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className="w-full rounded-2xl border border-[#D4AF37]/20 bg-black px-4 py-3 text-sm text-white outline-none"
          >
            <option>Focused</option>
            <option>Heavy</option>
            <option>Hopeful</option>
            <option>Angry</option>
            <option>Grateful</option>
            <option>Tired</option>
            <option>Numb</option>
          </select>

          <label className="mb-2 mt-4 block text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
            Write
          </label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="What are you carrying today?"
            rows={7}
            className="w-full resize-none rounded-2xl border border-[#D4AF37]/20 bg-black px-4 py-3 text-sm leading-6 text-white outline-none placeholder:text-white/35"
          />

          <button
            onClick={handleSaveEntry}
            className="mt-4 w-full rounded-2xl bg-[#D4AF37] px-4 py-3 text-sm font-semibold text-black transition hover:opacity-90"
          >
            Save Entry
          </button>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
            Past Entries
          </h2>
          <p className="text-xs text-white/50">
            {sortedEntries.length} saved
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {sortedEntries.length === 0 ? (
            <div className="rounded-3xl border border-[#D4AF37]/20 bg-[#111111] p-5 text-sm leading-6 text-white/65">
              No entries yet. Your first one starts the log.
            </div>
          ) : (
            sortedEntries.map((entry) => (
              <div
                key={entry.id}
                className="rounded-3xl border border-[#D4AF37]/20 bg-[#111111] p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-base font-semibold text-white">
                      {entry.title}
                    </h3>
                    <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[#D4AF37]">
                      {entry.mood}
                    </p>
                  </div>

                  <button
                    onClick={() => handleDeleteEntry(entry.id)}
                    className="rounded-xl border border-white/10 px-3 py-1 text-xs text-white/70"
                  >
                    Delete
                  </button>
                </div>

                <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-white/80">
                  {entry.body}
                </p>

                <p className="mt-4 text-xs text-white/40">
                  {formatDate(entry.createdAt)}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}