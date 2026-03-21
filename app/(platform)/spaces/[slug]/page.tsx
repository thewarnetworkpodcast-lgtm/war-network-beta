"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Space = {
  id: string;
  name: string;
  password: string;
};

type Post = {
  id: string;
  content: string;
  createdAt: string;
};

const STORAGE_KEY = "war-private-spaces";
const POSTS_KEY = "war-space-posts-";
const ACCESS_KEY = "war-space-access-";

function toSlug(value: string) {
  return value.toLowerCase().trim().replace(/\s+/g, "-");
}

export default function SpacePage() {
  const params = useParams();
  const slug = String(params.slug);

  const [space, setSpace] = useState<Space | null>(null);
  const [entered, setEntered] = useState(false);
  const [inputPassword, setInputPassword] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const savedSpaces = localStorage.getItem(STORAGE_KEY);
    if (savedSpaces) {
      const parsedSpaces: Space[] = JSON.parse(savedSpaces);
      const found = parsedSpaces.find((s) => toSlug(s.name) === slug) || null;
      setSpace(found);
    }

    const savedPosts = localStorage.getItem(`${POSTS_KEY}${slug}`);
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    }

    const savedAccess = localStorage.getItem(`${ACCESS_KEY}${slug}`);
    if (savedAccess === "granted") {
      setEntered(true);
    }
  }, [slug]);

  useEffect(() => {
    localStorage.setItem(`${POSTS_KEY}${slug}`, JSON.stringify(posts));
  }, [posts, slug]);

  function handleEnter() {
    if (!space) return;
    if (inputPassword !== space.password) return;

    setEntered(true);
    localStorage.setItem(`${ACCESS_KEY}${slug}`, "granted");
  }

  function handlePost() {
    if (!text.trim()) return;

    const newPost: Post = {
      id: crypto.randomUUID(),
      content: text.trim(),
      createdAt: new Date().toISOString(),
    };

    setPosts((prev) => [newPost, ...prev]);
    setText("");
  }

  function formatDate(date: string) {
    return new Date(date).toLocaleString();
  }

  if (!space) {
    return (
      <main className="min-h-screen bg-black px-4 pt-6 pb-24 text-white">
        <div className="mx-auto flex min-h-[70vh] w-full max-w-md items-center justify-center">
          <div className="rounded-3xl border border-[#D4AF37]/20 bg-[#111111] p-5 text-center">
            Space not found
          </div>
        </div>
      </main>
    );
  }

  if (!entered) {
    return (
      <main className="min-h-screen bg-black px-4 pt-6 pb-24 text-white">
        <div className="mx-auto flex min-h-[70vh] w-full max-w-md items-center justify-center">
          <div className="w-full rounded-3xl border border-[#D4AF37]/20 bg-[#111111] p-5">
            <h1 className="text-xl font-semibold text-white">{space.name}</h1>

            <input
              type="password"
              placeholder="Enter password"
              value={inputPassword}
              onChange={(e) => setInputPassword(e.target.value)}
              className="mt-4 w-full rounded-2xl border border-[#D4AF37]/20 bg-black p-3 text-sm text-white outline-none placeholder:text-white/35"
            />

            <button
              onClick={handleEnter}
              className="mt-3 w-full rounded-2xl bg-[#D4AF37] py-3 text-sm font-semibold text-black"
            >
              Enter Space
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black px-4 pt-6 pb-24 text-white">
      <div className="mx-auto flex w-full max-w-md flex-col gap-6">
        <div className="rounded-3xl border border-[#D4AF37]/20 bg-[#111111] p-5">
          <h1 className="text-xl font-semibold text-white">{space.name}</h1>
        </div>

        <div className="rounded-3xl border border-[#D4AF37]/20 bg-[#111111] p-5">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Speak freely..."
            rows={4}
            className="w-full rounded-2xl border border-[#D4AF37]/20 bg-black p-3 text-sm text-white outline-none placeholder:text-white/35"
          />

          <button
            onClick={handlePost}
            className="mt-3 w-full rounded-2xl bg-[#D4AF37] py-3 text-sm font-semibold text-black"
          >
            Post
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {posts.length === 0 ? (
            <div className="rounded-2xl border border-[#D4AF37]/20 bg-[#111111] p-4 text-sm text-white/50">
              No posts yet.
            </div>
          ) : (
            posts.map((post) => (
              <div
                key={post.id}
                className="rounded-2xl border border-[#D4AF37]/20 bg-[#111111] p-4"
              >
                <p className="text-sm whitespace-pre-wrap text-white">
                  {post.content}
                </p>
                <p className="mt-2 text-xs text-white/40">
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