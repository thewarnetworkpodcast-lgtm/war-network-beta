"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

type RoomPost = {
  id: string;
  content: string;
  author: string;
  createdAt: string;
};

type RoomConfig = {
  title: string;
  tag: string;
  description: string;
};

const ROOM_CONFIG: Record<string, RoomConfig> = {
  "combat-veterans": {
    title: "Combat Veterans",
    tag: "Service",
    description:
      "Talk with others who understand military trauma, transition, identity, and recovery.",
  },
};

function formatDateTime(dateString: string) {
  const date = new Date(dateString);

  return {
    time: date.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    }),
    date: date.toLocaleDateString(),
  };
}

export default function SpaceRoomPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const room = useMemo(() => {
    return ROOM_CONFIG[slug] || {
      title: "Room",
      tag: "Room",
      description: "Welcome to the room.",
    };
  }, [slug]);

  const storageKey = `war-room-${slug}`;

  const [posts, setPosts] = useState<RoomPost[]>([]);
  const [message, setMessage] = useState("");
  const [profileName, setProfileName] = useState("You");

  useEffect(() => {
    const saved =
      localStorage.getItem("war-profile-name") ||
      localStorage.getItem("profileName");

    if (saved) setProfileName(saved);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);

    if (saved) {
      setPosts(JSON.parse(saved));
    } else {
      const starter: RoomPost = {
        id: "1",
        content: `Welcome to ${room.title}. Speak freely.`,
        author: "W.A.R. Network",
        createdAt: new Date().toISOString(),
      };

      setPosts([starter]);
      localStorage.setItem(storageKey, JSON.stringify([starter]));
    }
  }, [room.title, storageKey]);

  function handlePost() {
    if (!message.trim()) return;

    const newPost: RoomPost = {
      id: Date.now().toString(),
      content: message,
      author: profileName || "Anonymous",
      createdAt: new Date().toISOString(),
    };

    const updated = [newPost, ...posts];
    setPosts(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
    setMessage("");
  }

  return (
    <main className="min-h-screen bg-black px-4 pb-24 pt-6 text-white">
      <div className="mx-auto w-full max-w-md space-y-4">
        
        {/* HEADER */}
        <div className="rounded-3xl border border-[#D4AF37]/20 bg-[#111] p-5 text-center">
          <Link href="/spaces" className="text-[#D4AF37] text-sm">
            ← Back
          </Link>

          <h1 className="mt-3 text-xl font-bold">{room.title}</h1>
          <p className="text-sm text-white/60 mt-1">{room.description}</p>
        </div>

        {/* POST BOX */}
        <div className="rounded-3xl border border-[#D4AF37]/20 bg-[#111] p-5">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Say something real..."
            className="w-full rounded-xl bg-black/40 p-3 text-sm outline-none border border-white/10"
          />

          <button
            onClick={handlePost}
            className="mt-3 w-full h-12 rounded-xl bg-[#D4AF37] text-black font-semibold"
          >
            Post to Room
          </button>
        </div>

        {/* FEED */}
        <div className="rounded-3xl border border-[#D4AF37]/20 bg-[#111] p-5">
          <div className="flex justify-between mb-3">
            <p className="text-[#D4AF37] text-sm font-semibold">
              Room Feed
            </p>
            <p className="text-xs text-white/40">
              {posts.length} posts
            </p>
          </div>

          <div className="space-y-3">
            {posts.map((post) => {
              const time = formatDateTime(post.createdAt);

              return (
                <div
                  key={post.id}
                  className="rounded-xl border border-white/10 bg-black/40 p-4"
                >
                  {/* TOP ROW */}
                  <div className="flex justify-between items-start">
                    
                    {/* NAME */}
                    <p className="text-sm font-semibold">
                      {post.author}
                    </p>

                    {/* TIME */}
                    <div className="text-right text-xs text-white/40 leading-tight">
                      <div>{time.time}</div>
                      <div>{time.date}</div>
                    </div>

                  </div>

                  {/* MESSAGE */}
                  <p className="mt-2 text-sm text-white/80 leading-relaxed">
                    {post.content}
                  </p>

                </div>
              );
            })}
          </div>
        </div>

      </div>
    </main>
  );
}