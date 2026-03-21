"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  getFriends,
  addFriendRequest,
  getFriendRequests,
  acceptFriendRequest,
  removeFriendRequest,
  getFriendCount,
  Friend,
  FriendRequest,
} from "../lib/friendStore";

export default function MessagesPage() {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [requests, setRequests] = useState<FriendRequest[]>([]);
  const [name, setName] = useState("");
  const [count, setCount] = useState(0);

  useEffect(() => {
    const currentFriends = getFriends();
    const currentRequests = getFriendRequests();

    setFriends(currentFriends);
    setRequests(currentRequests);
    setCount(getFriendCount());
  }, []);

  function handleAddRequest() {
    if (!name.trim()) return;

    const updatedRequests = addFriendRequest(name.trim());
    setRequests(updatedRequests);
    setName("");
  }

  function handleAccept(id: string) {
    const result = acceptFriendRequest(id);
    setRequests(result.requests);
    setFriends(result.friends);
    setCount(result.friends.length);
  }

  function handleRemove(id: string) {
    const updatedRequests = removeFriendRequest(id);
    setRequests(updatedRequests);
  }

  return (
    <main className="min-h-screen bg-black px-4 pb-24 pt-6 text-white">
      <div className="mx-auto flex max-w-md flex-col gap-4">
        <div className="rounded-3xl border border-[#D4AF37]/20 bg-[#111111] p-5">
          <p className="text-xs uppercase text-[#D4AF37]">Messages</p>

          <div className="mt-2 flex items-center justify-between">
            <h1 className="text-xl font-semibold">Stay Connected</h1>

            <div className="flex items-center justify-center rounded-xl bg-[#D4AF37] px-3 py-1 text-xs font-bold text-black shadow-[0_0_10px_rgba(212,175,55,0.4)]">
              {count}
            </div>
          </div>

          <p className="mt-2 text-xs text-white/40">
            {count === 1 ? "1 connection" : `${count} connections`}
          </p>
        </div>

        <div className="mt-1 flex items-center gap-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Add user..."
            className="h-12 flex-1 rounded-2xl border border-[#D4AF37]/20 bg-black px-4 text-sm text-white outline-none placeholder:text-white/35"
          />

          <button
            type="button"
            onClick={handleAddRequest}
            className="inline-flex h-12 w-28 shrink-0 items-center justify-center rounded-2xl bg-[#D4AF37] text-sm font-semibold leading-none text-black shadow-[0_0_12px_rgba(212,175,55,0.35)]"
          >
            <span className="block leading-none">ADD</span>
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {requests.length > 0 && (
            <div className="rounded-2xl border border-[#D4AF37]/20 bg-[#111111] p-4">
              <p className="mb-3 text-sm font-semibold text-[#D4AF37]">
                Pending Requests
              </p>

              <div className="flex flex-col gap-3">
                {requests.map((request) => (
                  <div
                    key={request.id}
                    className="rounded-2xl border border-white/10 bg-black/40 p-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-medium text-white">{request.name}</p>
                        <p className="text-xs text-white/50">
                          {request.status === "accepted"
                            ? "Accepted"
                            : "Pending approval"}
                        </p>
                      </div>

                      {request.status === "pending" && (
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => handleAccept(request.id)}
                            className="inline-flex h-12 w-28 shrink-0 items-center justify-center rounded-2xl bg-[#D4AF37] text-sm font-semibold leading-none text-black shadow-[0_0_12px_rgba(212,175,55,0.35)]"
                          >
                            <span className="block leading-none">ACCEPT</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleRemove(request.id)}
                            className="inline-flex h-12 w-24 shrink-0 items-center justify-center rounded-2xl border border-white/10 text-sm font-semibold leading-none text-white/75"
                          >
                            <span className="block leading-none">REMOVE</span>
                          </button>
                        </div>
                      )}

                      {request.status === "accepted" && (
                        <button
                          type="button"
                          onClick={() => handleRemove(request.id)}
                          className="inline-flex h-12 w-24 shrink-0 items-center justify-center rounded-2xl border border-white/10 text-sm font-semibold leading-none text-white/75"
                        >
                          <span className="block leading-none">CLEAR</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {friends.map((friend) => (
            <Link
              key={friend.id}
              href={`/messages/${friend.id}`}
              className="rounded-2xl border border-[#D4AF37]/20 bg-[#111111] p-4"
            >
              <p className="font-medium text-white">{friend.name}</p>
              <p className="text-xs text-white/50">Direct conversation</p>
            </Link>
          ))}

          {friends.length === 0 && requests.length === 0 && (
            <p className="text-sm text-white/40">No conversations yet.</p>
          )}
        </div>
      </div>
    </main>
  );
}