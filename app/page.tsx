"use client";

import { useEffect, useState } from "react";

type FeedPost = {
  id: string;
  content: string;
  createdAt: string;
};

const STORAGE_KEY = "war-feed-posts";

export default function HomePage() {
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState<FeedPost[]>([]);

  useEffect(() => {
    const saved =
      typeof window !== "undefined"
        ? localStorage.getItem(STORAGE_KEY)
        : null;

    if (saved) {
      setPosts(JSON.parse(saved));
    }
  }, []);

  function handlePost() {
    if (!content.trim()) return;

    const newPost: FeedPost = {
      id: crypto.randomUUID(),
      content: content.trim(),
      createdAt: new Date().toLocaleString(),
    };

    const updated = [newPost, ...posts];
    setPosts(updated);
    setContent("");

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  return (
    <main className="min-h-screen bg-black px-4 pb-24 pt-8 text-white">
      <div className="mx-auto flex w-full max-w-md flex-col gap-5">
        <div className="rounded-3xl border border-[#D4AF37]/20 bg-[#111111] p-6">
          <div className="flex items-center justify-center gap-4">
            <img
              src="/fracturelight.png"
              alt="Fracturelight symbol"
              className="h-14 w-14 object-contain"
            />

            <div className="text-left">
              <p className="text-[11px] uppercase tracking-[0.28em] text-[#D4AF37]">
                W.A.R. Network
              </p>
              <h1 className="mt-2 text-3xl font-semibold text-white">
                Welcome Home
              </h1>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-[#D4AF37]/20 bg-[#111111] p-5">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Say something real..."
            className="min-h-[120px] w-full rounded-2xl border border-[#D4AF37]/20 bg-black px-4 py-4 text-sm text-white outline-none placeholder:text-white/35"
          />

          <button
            type="button"
            onClick={handlePost}
            className="mt-4 inline-flex h-12 w-full items-center justify-center rounded-2xl bg-[#D4AF37] text-sm font-semibold leading-none text-black"
          >
            <span className="block leading-none">Post</span>
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {posts.length === 0 ? (
            <p className="text-sm text-white/40">No posts yet.</p>
          ) : (
            posts.map((post) => (
              <div
                key={post.id}
                className="rounded-2xl border border-[#D4AF37]/20 bg-[#111111] p-4"
              >
                <p className="whitespace-pre-wrap text-sm text-white">
                  {post.content}
                </p>
                <p className="mt-3 text-xs text-white/45">{post.createdAt}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}