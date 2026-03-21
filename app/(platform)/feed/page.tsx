"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabaseClient";

type FeedPost = {
  id: string;
  content: string;
  created_at: string;
};

const DEMO_USER_ID = "553c8b42-0ef3-4986-97c2-a77c60b52f04";

export default function FeedPage() {
  const [postText, setPostText] = useState("");
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [loading, setLoading] = useState(false);

  const loadPosts = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("id, content, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("LOAD POSTS ERROR:", error);
      return;
    }

    setPosts(data || []);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handlePost = async () => {
    const trimmed = postText.trim();
    if (!trimmed || loading) return;

    setLoading(true);

    const { error } = await supabase.from("posts").insert([
      {
        content: trimmed,
        user_id: DEMO_USER_ID,
      },
    ]);

    if (error) {
      console.error("POST ERROR:", error);
      setLoading(false);
      return;
    }

    setPostText("");
    await loadPosts();
    setLoading(false);
  };

  return (
    <main className="flex-1 bg-black px-4 py-6 text-white">
      <div className="w-full max-w-md mx-auto">
        <div className="mb-6 text-center">
          <p className="text-[11px] uppercase tracking-[0.22em] text-[#D4AF37]">
            W.A.R. Network
          </p>
          <h1 className="mt-2 text-3xl font-semibold leading-tight text-white">
            Community Feed
          </h1>
        </div>

        <div className="rounded-2xl border border-[#D4AF37]/20 bg-[#111111] p-4 mb-6">
          <textarea
            placeholder="What are you carrying today?"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            className="w-full min-h-[110px] rounded-xl border border-[#D4AF37]/15 bg-black px-4 py-3 text-sm text-white outline-none"
          />

          <button
            onClick={handlePost}
            disabled={loading}
            className="mt-3 w-full rounded-xl bg-[#D4AF37] px-4 py-3 text-sm font-semibold text-black disabled:opacity-60"
          >
            {loading ? "Posting..." : "Post to Feed"}
          </button>
        </div>

        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="rounded-2xl border border-[#D4AF37]/20 bg-[#111111] p-4"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-white">Stryker</p>
                <p className="shrink-0 text-xs text-white/40">
                  {new Date(post.created_at).toLocaleString()}
                </p>
              </div>

              <p className="mt-3 text-sm leading-6 text-white/80">
                {post.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}