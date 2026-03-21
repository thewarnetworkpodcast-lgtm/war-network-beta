"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

type FriendRequest = {
  id: string;
  sender_id: string;
  receiver_id: string;
  status: "pending" | "accepted" | "declined";
  created_at: string;
};

type Friend = {
  id: string;
  user_id: string;
  friend_id: string;
  created_at: string;
};

export default function ProfilePage() {
  const [userId, setUserId] = useState<string>("");
  const [profileName, setProfileName] = useState("Your Name");
  const [profileBio, setProfileBio] = useState(
    "This is your space. Build your identity. Share your story."
  );
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfilePage();
  }, []);

  async function loadProfilePage() {
    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      setUserId(user.id);

      const savedName = localStorage.getItem("war-profile-name");
      const savedBio = localStorage.getItem("war-profile-bio");

      if (savedName && savedName.trim()) {
        setProfileName(savedName.trim());
      }

      if (savedBio && savedBio.trim()) {
        setProfileBio(savedBio.trim());
      }

      await Promise.all([loadFriendRequests(user.id), loadFriends(user.id)]);
    } catch (error) {
      console.error("Profile page load failed:", error);
    } finally {
      setLoading(false);
    }
  }

  async function loadFriendRequests(currentUserId: string) {
    const { data, error } = await supabase
      .from("friend_requests")
      .select("id, sender_id, receiver_id, status, created_at")
      .eq("receiver_id", currentUserId)
      .eq("status", "pending")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Loading friend requests failed:", error);
      setFriendRequests([]);
      return;
    }

    setFriendRequests((data as FriendRequest[]) || []);
  }

  async function loadFriends(currentUserId: string) {
    const { data, error } = await supabase
      .from("friends")
      .select("id, user_id, friend_id, created_at")
      .eq("user_id", currentUserId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Loading friends failed:", error);
      setFriends([]);
      return;
    }

    setFriends((data as Friend[]) || []);
  }

  async function acceptRequest(request: FriendRequest) {
    if (!userId) return;

    const { error: updateError } = await supabase
      .from("friend_requests")
      .update({ status: "accepted" })
      .eq("id", request.id);

    if (updateError) {
      console.error("Accept request failed:", updateError);
      return;
    }

    const { error: insertError } = await supabase.from("friends").insert([
      {
        user_id: request.sender_id,
        friend_id: request.receiver_id,
      },
      {
        user_id: request.receiver_id,
        friend_id: request.sender_id,
      },
    ]);

    if (insertError) {
      console.error("Creating friendship failed:", insertError);
      return;
    }

    await Promise.all([loadFriendRequests(userId), loadFriends(userId)]);
  }

  async function declineRequest(requestId: string) {
    if (!userId) return;

    const { error } = await supabase
      .from("friend_requests")
      .update({ status: "declined" })
      .eq("id", requestId);

    if (error) {
      console.error("Decline request failed:", error);
      return;
    }

    await loadFriendRequests(userId);
  }

  return (
    <main className="min-h-screen bg-black px-4 pb-24 pt-6 text-white">
      <div className="mx-auto flex w-full max-w-md flex-col gap-4">
        <section className="rounded-3xl border border-[#D4AF37]/20 bg-[#111111] px-6 py-8">
          <div className="flex flex-col items-center text-center">
            <img
              src="/fracturelight.png"
              alt="Fracturelight"
              className="h-20 w-20 object-contain mix-blend-screen"
            />

            <h1 className="mt-5 text-3xl font-semibold text-white">
              {profileName}
            </h1>

            <p className="mt-3 max-w-[280px] text-sm leading-7 text-white/65">
              {profileBio}
            </p>

            <p className="mt-6 text-xl font-medium text-[#D4AF37]">
              {friends.length} Friends
            </p>

            <Link
              href="/profile/edit"
              className="mt-6 flex h-12 w-full items-center justify-center rounded-2xl border border-[#D4AF37]/35 text-base font-semibold text-[#D4AF37]"
            >
              Edit Profile
            </Link>
          </div>
        </section>

        <section className="rounded-3xl border border-[#D4AF37]/20 bg-[#111111] px-6 py-5">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-[#D4AF37]">
              Friend Requests
            </h2>
            <p className="mt-1 text-sm text-white/45">
              {friendRequests.length} pending
            </p>
          </div>

          <div className="mt-4 flex flex-col gap-3">
            {loading ? (
              <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-4 text-center text-sm leading-6 text-white/65">
                Loading requests...
              </div>
            ) : friendRequests.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-4 text-center text-sm leading-6 text-white/65">
                No pending friend requests.
              </div>
            ) : (
              friendRequests.map((request) => (
                <div
                  key={request.id}
                  className="rounded-2xl border border-white/10 bg-black/30 px-4 py-4"
                >
                  <p className="text-center text-base font-semibold text-white">
                    Sender: {request.sender_id.slice(0, 8)}
                  </p>

                  <p className="mt-2 text-center text-sm leading-6 text-white/60">
                    Wants to connect with you.
                  </p>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <button
                      onClick={() => acceptRequest(request)}
                      className="flex h-11 w-full items-center justify-center rounded-2xl bg-[#D4AF37] text-sm font-semibold text-black"
                    >
                      Accept
                    </button>

                    <button
                      onClick={() => declineRequest(request.id)}
                      className="flex h-11 w-full items-center justify-center rounded-2xl border border-white/10 bg-black/30 text-sm font-semibold text-white"
                    >
                      Decline
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        <section className="rounded-3xl border border-[#D4AF37]/20 bg-[#111111] px-6 py-5">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-[#D4AF37]">
              Friends List
            </h2>
            <p className="mt-1 text-sm text-white/45">
              {friends.length} total
            </p>
          </div>

          <div className="mt-4 flex flex-col gap-3">
            {loading ? (
              <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-4 text-center text-sm leading-6 text-white/65">
                Loading friends...
              </div>
            ) : friends.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-4 text-center text-sm leading-6 text-white/65">
                No friends added yet.
              </div>
            ) : (
              friends.map((friend) => (
                <div
                  key={friend.id}
                  className="rounded-2xl border border-white/10 bg-black/30 px-4 py-4"
                >
                  <p className="text-center text-base font-semibold text-white">
                    Friend: {friend.friend_id.slice(0, 8)}
                  </p>
                </div>
              ))
            )}
          </div>
        </section>

        <section className="rounded-3xl border border-[#D4AF37]/20 bg-[#111111] px-6 py-5">
          <p className="text-center text-sm leading-6 text-white/60">
            Your activity and posts will appear here.
          </p>
        </section>
      </div>
    </main>
  );
}