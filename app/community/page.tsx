"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type FeedComment = {
  id: string;
  author: string;
  handle: string;
  content: string;
  createdAt: string;
};

type FeedPost = {
  id: string;
  author: string;
  handle: string;
  content: string;
  likes: number;
  createdAt: string;
  comments: FeedComment[];
};

const STORAGE_KEY = "war-community-feed-posts";

const starterPosts: FeedPost[] = [
  {
    id: "1",
    author: "Stryker",
    handle: "@warnetwork",
    content:
      "Welcome to the W.A.R. Community Feed. This is where recovery speaks out loud.",
    likes: 12,
    createdAt: new Date().toISOString(),
    comments: [
      {
        id: "c1",
        author: "Founding Member",
        handle: "@recoveringdaily",
        content: "This already feels powerful.",
        createdAt: new Date().toISOString(),
      },
    ],
  },
  {
    id: "2",
    author: "Founding Member",
    handle: "@recoveringdaily",
    content:
      "Healing is ugly before it becomes beautiful. Keep showing up anyway.",
    likes: 8,
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    comments: [],
  },
];

export default function CommunityPage() {
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [postText, setPostText] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [notice, setNotice] = useState("");
  const [openCommentsFor, setOpenCommentsFor] = useState<string | null>(null);
  const [commentDrafts, setCommentDrafts] = useState<Record<string, string>>({});

  const feedTopRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (raw) {
      try {
        const parsed = JSON.parse(raw) as FeedPost[];
        const normalized = parsed.map((post) => ({
          ...post,
          comments: Array.isArray(post.comments) ? post.comments : [],
        }));
        setPosts(normalized);
      } catch (error) {
        console.error("Failed to parse community feed posts:", error);
        setPosts(starterPosts);
      }
    } else {
      setPosts(starterPosts);
    }

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  }, [posts, isLoaded]);

  useEffect(() => {
    if (!notice) return;

    const timer = setTimeout(() => {
      setNotice("");
    }, 2000);

    return () => clearTimeout(timer);
  }, [notice]);

  const orderedPosts = useMemo(() => {
    return [...posts].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [posts]);

  function handleCreatePost() {
    if (!postText.trim()) return;

    const newPost: FeedPost = {
      id: crypto.randomUUID(),
      author: "Stryker",
      handle: "@warnetwork",
      content: postText.trim(),
      likes: 0,
      createdAt: new Date().toISOString(),
      comments: [],
    };

    setPosts((prev) => [newPost, ...prev]);
    setPostText("");
    setNotice("Post published");

    setTimeout(() => {
      feedTopRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  }

  function handleLikePost(id: string) {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id ? { ...post, likes: post.likes + 1 } : post
      )
    );
  }

  function toggleComments(postId: string) {
    setOpenCommentsFor((prev) => (prev === postId ? null : postId));
  }

  function handleCommentDraftChange(postId: string, value: string) {
    setCommentDrafts((prev) => ({
      ...prev,
      [postId]: value,
    }));
  }

  function handleAddComment(postId: string) {
    const text = (commentDrafts[postId] || "").trim();
    if (!text) return;

    const newComment: FeedComment = {
      id: crypto.randomUUID(),
      author: "Stryker",
      handle: "@warnetwork",
      content: text,
      createdAt: new Date().toISOString(),
    };

    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? { ...post, comments: [...post.comments, newComment] }
          : post
      )
    );

    setCommentDrafts((prev) => ({
      ...prev,
      [postId]: "",
    }));

    setNotice("Comment added");
    setOpenCommentsFor(postId);
  }

  function formatTime(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleString([], {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  }

  return (
    <main className="min-h-screen bg-black px-3 py-4 text-white sm:px-4 sm:py-6">
      <div className="mx-auto w-full max-w-3xl">
        <div ref={feedTopRef} />

        <section className="mb-4 rounded-3xl border border-yellow-700/30 bg-zinc-950/95 p-4 shadow-[0_0_30px_rgba(255,215,0,0.05)] sm:p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-yellow-500/40 bg-yellow-500/10 text-yellow-400">
              ✦
            </div>

            <div>
              <h1 className="text-xl font-bold tracking-wide text-yellow-400 sm:text-2xl">
                COMMUNITY FEED
              </h1>
              <p className="text-xs text-zinc-400 sm:text-sm">
                Real voices. Real recovery. Real community.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-4 rounded-3xl border border-yellow-700/20 bg-zinc-950/95 p-4 sm:p-5">
          <h2 className="mb-3 text-lg font-bold text-white">Create Post</h2>

          <textarea
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            placeholder="What’s on your mind today?"
            rows={5}
            className="w-full rounded-2xl border border-zinc-800 bg-black px-4 py-4 text-white outline-none placeholder:text-zinc-500 focus:border-yellow-500"
          />

          <div className="mt-4 flex items-center justify-between gap-3">
            <div className="text-sm text-yellow-300">{notice}</div>

            <button
              onClick={handleCreatePost}
              className="rounded-2xl bg-yellow-500 px-5 py-3 font-semibold text-black transition hover:opacity-90"
            >
              Post to Feed
            </button>
          </div>
        </section>

        <section className="space-y-4">
          {orderedPosts.map((post) => {
            const isCommentsOpen = openCommentsFor === post.id;
            const commentDraft = commentDrafts[post.id] || "";

            return (
              <article
                key={post.id}
                className="rounded-3xl border border-yellow-700/20 bg-zinc-950/95 p-4 sm:p-5"
              >
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-yellow-500/30 bg-yellow-500/10 text-sm font-bold text-yellow-300">
                      {post.author.charAt(0)}
                    </div>

                    <div>
                      <p className="font-semibold text-white">{post.author}</p>
                      <p className="text-sm text-zinc-500">
                        {post.handle} • {formatTime(post.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>

                <p className="mb-4 whitespace-pre-wrap text-sm leading-7 text-zinc-200 sm:text-base">
                  {post.content}
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => handleLikePost(post.id)}
                    className="rounded-2xl border border-zinc-700 bg-black px-4 py-2 text-sm font-medium text-zinc-300 transition hover:border-yellow-500/40 hover:text-yellow-300"
                  >
                    Like
                  </button>

                  <span className="text-sm text-zinc-400">
                    {post.likes} {post.likes === 1 ? "like" : "likes"}
                  </span>

                  <button
                    onClick={() => toggleComments(post.id)}
                    className="rounded-2xl border border-zinc-700 bg-black px-4 py-2 text-sm font-medium text-zinc-300 transition hover:border-yellow-500/40 hover:text-yellow-300"
                  >
                    {isCommentsOpen ? "Hide Comments" : "Comments"}
                  </button>

                  <span className="text-sm text-zinc-400">
                    {post.comments.length}{" "}
                    {post.comments.length === 1 ? "comment" : "comments"}
                  </span>
                </div>

                {isCommentsOpen && (
                  <div className="mt-5 rounded-2xl border border-zinc-800 bg-black p-4">
                    <div className="mb-4">
                      <textarea
                        value={commentDraft}
                        onChange={(e) =>
                          handleCommentDraftChange(post.id, e.target.value)
                        }
                        placeholder="Write a comment..."
                        rows={3}
                        className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-white outline-none placeholder:text-zinc-500 focus:border-yellow-500"
                      />

                      <div className="mt-3 flex justify-end">
                        <button
                          onClick={() => handleAddComment(post.id)}
                          className="rounded-2xl bg-yellow-500 px-4 py-2 text-sm font-semibold text-black transition hover:opacity-90"
                        >
                          Add Comment
                        </button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {post.comments.length === 0 ? (
                        <p className="text-sm text-zinc-500">
                          No comments yet. Start the conversation.
                        </p>
                      ) : (
                        post.comments.map((comment) => (
                          <div
                            key={comment.id}
                            className="rounded-2xl border border-zinc-800 bg-zinc-950 p-3"
                          >
                            <div className="mb-2 flex items-center gap-2">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-yellow-500/30 bg-yellow-500/10 text-xs font-bold text-yellow-300">
                                {comment.author.charAt(0)}
                              </div>

                              <div>
                                <p className="text-sm font-semibold text-white">
                                  {comment.author}
                                </p>
                                <p className="text-xs text-zinc-500">
                                  {comment.handle} • {formatTime(comment.createdAt)}
                                </p>
                              </div>
                            </div>

                            <p className="whitespace-pre-wrap text-sm leading-6 text-zinc-300">
                              {comment.content}
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </section>
      </div>
    </main>
  );
}