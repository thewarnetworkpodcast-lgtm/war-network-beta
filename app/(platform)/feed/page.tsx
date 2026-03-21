"use client";

import { useState } from "react";

type FeedPost = {
  id: number;
  content: string;
  created_at: string;
};

export default function FeedPage() {
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [loading, setLoading] = useState(false);

  const handlePost = async () => {
    if (!content.trim()) return;

    setLoading(true);

    const newPost: FeedPost = {
      id: Date.now(),
      content: content.trim(),
      created_at: new Date().toISOString(),
    };

    setPosts((prev) => [newPost, ...prev]);
    setContent("");
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-black px-4 pb-24 pt-8 text-white">
      <div className="mx-auto flex w-full max-w-md flex-col gap-5">
        <div className="rounded-3xl border border-[#D4AF37]/20 bg-[#111111] p-6">
          <div className="flex flex-col items-center text-center">
            <img
              src="/fracturelight.png"
              alt="Fracturelight"
              className="h-16 w-16 object-contain mix-blend-screen"
            />

            <p className="mt-4 text-[11px] uppercase tracking-[0.25em] text-[#D4AF37]">
              W.A.R. NETWORK
            </p>

            <h1 className="mt-3 text-3xl font-semibold text-white">
              Welcome Home
            </h1>

            <p className="mt-3 max-w-sm text-center text-sm leading-6 text-white/75">
              Say something real. This is your space to speak, connect, and rebuild.
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-[#D4AF37]/20 bg-[#111111] p-5">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Say something real..."
            rows={4}
            className="w-full resize-none rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
          />

          <button
            onClick={handlePost}
            disabled={loading}
            className="mt-4 flex h-12 w-full items-center justify-center rounded-2xl bg-[#D4AF37] px-4 text-sm font-semibold text-black transition hover:opacity-90 disabled:opacity-60"
          >
            {loading ? "Posting..." : "Post"}
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {posts.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-[#111111] p-4 text-center text-sm text-white/45">
              No posts yet. Be the first to speak.
            </div>
          ) : (
            posts.map((post) => (
              <div
                key={post.id}
                className="rounded-2xl border border-white/10 bg-[#111111] p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-white">Stryker</p>
                  <p className="shrink-0 text-xs text-white/40">
                    {new Date(post.created_at).toLocaleString()}
                  </p>
                </div>

                <p className="mt-3 text-sm leading-6 text-white/85">
                  {post.content}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}