"use client";

import { useEffect, useState } from "react";

type Post = {
  id: string;
  content: string;
  createdAt: string;
};

const STORAGE_KEY = "war-feed-posts";

export default function Home() {
  const [text, setText] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setPosts(JSON.parse(saved));
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  }, [posts, loaded]);

  function handlePost() {
    if (!text.trim()) return;

    const newPost: Post = {
      id: crypto.randomUUID(),
      content: text,
      createdAt: new Date().toISOString(),
    };

    setPosts((prev) => [newPost, ...prev]);
    setText("");
  }

  function formatDate(date: string) {
    return new Date(date).toLocaleString();
  }

  return (
    <main className="min-h-screen bg-black px-4 pb-24 pt-6 text-white">
      <div className="mx-auto w-full max-w-md flex flex-col gap-6">

        {/* Header */}
        <div className="rounded-3xl border border-[#D4AF37]/20 bg-[#111111] p-5">
          <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37]">
            W.A.R. Network
          </p>
          <h1 className="mt-2 text-2xl font-semibold">
            Welcome Home
          </h1>
        </div>

        {/* Post Box */}
        <div className="rounded-3xl border border-[#D4AF37]/20 bg-[#111111] p-5">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Say something real..."
            className="w-full rounded-2xl bg-black border border-[#D4AF37]/20 p-3 text-sm text-white resize-none outline-none"
            rows={4}
          />

          <button
            onClick={handlePost}
            className="mt-3 w-full bg-[#D4AF37] text-black py-3 rounded-2xl text-sm font-semibold"
          >
            Post
          </button>
        </div>

        {/* Feed */}
        <div className="flex flex-col gap-4">
          {posts.length === 0 ? (
            <div className="text-white/60 text-sm">
              No posts yet.
            </div>
          ) : (
            posts.map((post) => (
              <div
                key={post.id}
                className="rounded-3xl border border-[#D4AF37]/20 bg-[#111111] p-5"
              >
                <p className="text-sm whitespace-pre-wrap">
                  {post.content}
                </p>

                <p className="mt-3 text-xs text-white/40">
                  {formatDate(post.createdAt)}
                </p>
              </div>
            ))
          )}
        </div>

      </div>
    </main>
  );
}