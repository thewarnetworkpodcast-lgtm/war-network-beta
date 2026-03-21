"use client";

import { useState } from "react";

export default function FeedPage() {
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handlePost = async () => {
    if (!content.trim()) return;

    setLoading(true);

    const newPost = {
      id: Date.now(),
      content,
      created_at: new Date().toISOString(),
    };

    setPosts([newPost, ...posts]);
    setContent("");
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-black px-4 pb-24 pt-6 text-white flex flex-col items-center">

      {/* HEADER */}
      <div className="w-full max-w-md rounded-3xl border border-[#D4AF37]/30 bg-[#111111] p-6 text-center">
        
        <div className="flex items-center justify-center gap-2">
          <img
            src="/fracturelight.png"
            className="h-6 w-6 object-contain"
          />
          <p className="text-[11px] tracking-[0.25em] text-[#D4AF37]">
            W.A.R. NETWORK
          </p>
        </div>

        <h1 className="mt-4 text-2xl font-bold">
          Welcome Home
        </h1>

        <p className="mt-2 text-sm text-white/60">
          Say what you need to say. This is your space.
        </p>
      </div>

      {/* POST BOX */}
      <div className="mt-6 w-full max-w-md rounded-3xl border border-[#D4AF37]/20 bg-[#111111] p-4">
        
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Say something real..."
          className="w-full rounded-xl bg-black p-3 text-sm text-white outline-none placeholder:text-white/40"
        />

        <button
          onClick={handlePost}
          disabled={loading}
          className="mt-3 w-full rounded-xl bg-[#D4AF37] py-3 text-sm font-semibold text-black transition hover:opacity-90"
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </div>

      {/* POSTS */}
      <div className="mt-6 w-full max-w-md space-y-4">
        {posts.length === 0 ? (
          <p className="text-center text-sm text-white/40">
            No posts yet.
          </p>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className="rounded-2xl border border-[#D4AF37]/20 bg-[#111111] p-4"
            >
              <div className="flex justify-between text-xs text-white/40">
                <span>Stryker</span>
                <span>
                  {new Date(post.created_at).toLocaleString()}
                </span>
              </div>

              <p className="mt-2 text-sm text-white/90 leading-relaxed">
                {post.content}
              </p>
            </div>
          ))
        )}
      </div>

    </main>
  );
}