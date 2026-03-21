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
  "ptsd-trauma": {
    title: "PTSD & Trauma",
    tag: "Healing",
    description:
      "For flashbacks, anxiety, triggers, nightmares, and the work of healing.",
  },
  "addiction-recovery": {
    title: "Addiction Recovery",
    tag: "Recovery",
    description:
      "A room for honesty, accountability, relapse prevention, and rebuilding one day at a time.",
  },
  "grief-loss": {
    title: "Grief & Loss",
    tag: "Support",
    description:
      "For anyone carrying loss, mourning change, or trying to breathe through heartbreak.",
  },
  "autism-parents": {
    title: "Autism Parents",
    tag: "Family",
    description:
      "Support, share, and connect with parents carrying the beautiful weight of that journey.",
  },
  "childhood-trauma": {
    title: "Childhood Trauma",
    tag: "Inner Work",
    description:
      "For those healing from early pain, survival patterns, and the long shadow of what happened young.",
  },
  "incarceration-reentry": {
    title: "Incarceration & Reentry",
    tag: "Rebuild",
    description:
      "A place for rebuilding after prison, reclaiming identity, and creating a new path.",
  },
  "founding-members": {
    title: "Founding Members",
    tag: "Alpha",
    description:
      "For the early builders helping shape the culture, direction, and heartbeat of W.A.R. Network.",
  },
};

function formatTitleFromSlug(slug: string) {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

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
  const slug =
    typeof params?.slug === "string"
      ? params.slug
      : Array.isArray(params?.slug)
      ? params.slug[0]
      : "";

  const room = useMemo<RoomConfig>(() => {
    if (!slug) {
      return {
        title: "Room",
        tag: "Room",
        description: "Loading room...",
      };
    }

    return (
      ROOM_CONFIG[slug] ?? {
        title: formatTitleFromSlug(slug),
        tag: "Room",
        description:
          "A place to connect, post, and talk with people who understand.",
      }
    );
  }, [slug]);

  const storageKey = `war-room-posts-${slug}`;
  const [posts, setPosts] = useState<RoomPost[]>([]);
  const [message, setMessage] = useState("");
  const [isReady, setIsReady] = useState(false);
  const [profileName, setProfileName] = useState("You");

  useEffect(() => {
    try {
      const savedProfile =
        localStorage.getItem("war-profile-name") ||
        localStorage.getItem("profileName") ||
        localStorage.getItem("war_display_name");

      if (savedProfile && savedProfile.trim()) {
        setProfileName(savedProfile.trim());
      }
    } catch {
      setProfileName("You");
    }
  }, []);

  useEffect(() => {
    if (!slug) return;

    try {
      const saved = localStorage.getItem(storageKey);

      if (saved) {
        setPosts(JSON.parse(saved));
      } else {
        const starterPost: RoomPost = {
          id: `welcome-${slug}`,
          content: `Welcome to ${room.title}. This room is open. Speak honestly, connect, and build forward.`,
          author: "W.A.R. Network",
          createdAt: new Date().toISOString(),
        };

        setPosts([starterPost]);
        localStorage.setItem(storageKey, JSON.stringify([starterPost]));
      }
    } catch {
      setPosts([]);
    } finally {
      setIsReady(true);
    }
  }, [room.title, slug, storageKey]);

  function savePosts(nextPosts: RoomPost[]) {
    setPosts(nextPosts);
    localStorage.setItem(storageKey, JSON.stringify(nextPosts));
  }

  function handlePost() {
    const clean = message.trim();

    if (!clean) return;

    const newPost: RoomPost = {
      id: `${Date.now()}`,
      content: clean,
      author: profileName,
      createdAt: new Date().toISOString(),
    };

    const nextPosts = [newPost, ...posts];
    savePosts(nextPosts);
    setMessage("");
  }

  return (
    <main className="min-h-screen bg-black px-4 pb-24 pt-6 text-white">
      <div className="mx-auto flex w-full max-w-md flex-col gap-4">
        <section className="rounded-3xl border border-[#D4AF37]/20 bg-[#111111] px-5 py-5">
          <Link
            href="/spaces"
            className="text-sm font-semibold text-[#D4AF37]"
          >
            ← Back to Spaces
          </Link>

          <div className="mt-4 flex flex-col items-center text-center">
            <img
              src="/fracturelight.png"
              alt="Fracturelight"
              className="h-10 w-10 object-contain mix-blend-screen"
            />

            <span className="mt-3 rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/10 px-3 py-1 text-[10px] uppercase tracking-[0.12em] text-[#D4AF37]">
              {room.tag}
            </span>

            <h1 className="mt-3 text-xl font-semibold text-white">
              {room.title}
            </h1>

            <p className="mt-2 max-w-[280px] text-sm leading-6 text-white/75">
              {room.description}
            </p>
          </div>
        </section>

        <section className="rounded-3xl border border-[#D4AF37]/20 bg-[#111111] px-5 py-5">
          <p className="text-center text-sm font-semibold text-[#D4AF37]">
            Room Post
          </p>

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Say something real..."
            className="mt-4 min-h-[120px] w-full resize-none rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
          />

          <button
            onClick={handlePost}
            className="mt-3 flex h-12 w-full items-center justify-center rounded-2xl bg-[#D4AF37] text-sm font-semibold text-black transition hover:opacity-90"
          >
            Post to Room
          </button>
        </section>

        <section className="rounded-3xl border border-[#D4AF37]/20 bg-[#111111] px-5 py-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-[#D4AF37]">Room Feed</p>
            <p className="text-[11px] text-white/40">
              {posts.length} post{posts.length === 1 ? "" : "s"}
            </p>
          </div>

          <div className="mt-4 flex flex-col gap-3">
            {!isReady ? (
              <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-4 text-sm text-white/70">
                Loading room...
              </div>
            ) : posts.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-4 text-sm text-white/70">
                No posts yet.
              </div>
            ) : (
              posts.map((post) => {
                const formatted = formatDateTime(post.createdAt);

                return (
                  <div
                    key={post.id}
                    className="rounded-2xl border border-white/10 bg-black/30 px-4 py-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-white">
                          {post.author}
                        </p>
                      </div>

                      <div className="shrink-0 text-right">
                        <p className="text-[11px] leading-4 text-white/40">
                          {formatted.time}
                        </p>
                        <p className="mt-1 text-[11px] leading-4 text-white/40">
                          {formatted.date}
                        </p>
                      </div>
                    </div>

                    <p className="mt-3 text-sm leading-6 text-white/80">
                      {post.content}
                    </p>
                  </div>
                );
              })
            )}
          </div>
        </section>
      </div>
    </main>
  );
}