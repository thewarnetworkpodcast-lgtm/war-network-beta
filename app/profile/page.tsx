"use client";

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
    void loadProfilePage();
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

      const { data: requests, error: requestsError } = await supabase
        .from("friend_requests")
        .select("id, sender_id, receiver_id, status, created_at")
        .eq("receiver_id", user.id)
        .eq("status", "pending")
        .order("created_at", { ascending: false });

      if (requestsError) {
        console.error("Loading friend requests failed:", requestsError);
        setFriendRequests([]);
      } else {
        setFriendRequests((requests as FriendRequest[]) || []);
      }

      const { data: friendsData, error: friendsError } = await supabase
        .from("friends")
        .select("id, user_id, friend_id, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (friendsError) {
        console.error("Loading friends failed:", friendsError);
        setFriends([]);
      } else {
        setFriends((friendsData as Friend[]) || []);
      }
    } catch (error) {
      console.error("Profile page load failed:", error);
    } finally {
      setLoading(false);
    }
  }

  async function acceptFriendRequest(requestId: string, senderId: string) {
    try {
      await supabase
        .from("friend_requests")
        .update({ status: "accepted" })
        .eq("id", requestId);

      await supabase.from("friends").insert([
        { user_id: userId, friend_id: senderId },
        { user_id: senderId, friend_id: userId },
      ]);

      await loadProfilePage();
    } catch (error) {
      console.error("Accept failed:", error);
    }
  }

  async function declineFriendRequest(requestId: string) {
    try {
      await supabase
        .from("friend_requests")
        .update({ status: "declined" })
        .eq("id", requestId);

      await loadProfilePage();
    } catch (error) {
      console.error("Decline failed:", error);
    }
  }

  return (
    <main className="min-h-screen bg-[#0b0b0b] px-4 py-10 pb-24 text-white">
      <div className="mx-auto flex w-full max-w-sm flex-col gap-6">
        <section className="rounded-2xl border border-white/10 p-6 text-center">
          <div className="mb-4 flex justify-center">
            <img
              src="/fracturelight.png"
              alt="W.A.R. Network Fracturelight"
              className="h-16 w-16 object-contain"
            />
          </div>

          <h1 className="mb-2 text-xl font-semibold">{profileName}</h1>

          <p className="mb-4 text-sm leading-7 text-white/60">{profileBio}</p>

          <p className="mb-4 font-semibold text-[#D4AF37]">
            {friends.length} Friends
          </p>

          <button className="w-full rounded-xl border border-[#D4AF37] px-4 py-2 text-[#D4AF37]">
            Edit Profile
          </button>
        </section>

        <section className="rounded-2xl border border-white/10 p-6 text-center">
          <h2 className="mb-2 font-semibold text-[#D4AF37]">Your Member ID</h2>

          <p className="mb-4 break-all text-sm text-white/70">
            {loading ? "Loading..." : userId}
          </p>

          <button className="w-full rounded-xl border border-white/20 px-4 py-2 text-white/70">
            Copy Member ID
          </button>
        </section>

        <section className="rounded-2xl border border-white/10 p-6">
          <div className="mb-4 text-center">
            <h2 className="font-semibold text-[#D4AF37]">Friend Requests</h2>
            <p className="mt-1 text-sm text-white/60">
              {friendRequests.length} pending
            </p>
          </div>

          {friendRequests.length === 0 ? (
            <div className="rounded-xl border border-white/10 py-3 text-center text-sm text-white/50">
              No pending friend requests.
            </div>
          ) : (
            friendRequests.map((req) => (
              <div
                key={req.id}
                className="mb-3 rounded-xl border border-white/10 p-3"
              >
                <p className="mb-2 break-all text-sm text-white">
                  {req.sender_id}
                </p>

                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      acceptFriendRequest(req.id, req.sender_id)
                    }
                    className="rounded-lg bg-[#D4AF37] px-3 py-1 text-sm text-black"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => declineFriendRequest(req.id)}
                    className="rounded-lg border border-white/20 px-3 py-1 text-sm text-white/70"
                  >
                    Decline
                  </button>
                </div>
              </div>
            ))
          )}
        </section>

        <section className="rounded-2xl border border-white/10 p-6">
          <div className="mb-4 text-center">
            <h2 className="font-semibold text-[#D4AF37]">Friends List</h2>
            <p className="mt-1 text-sm text-white/60">{friends.length} total</p>
          </div>

          {friends.length === 0 ? (
            <div className="rounded-xl border border-white/10 py-3 text-center text-sm text-white/50">
              No friends added yet.
            </div>
          ) : (
            friends.map((friend) => (
              <div
                key={friend.id}
                className="mb-2 rounded-xl border border-white/10 p-3"
              >
                <p className="break-all text-sm text-white">
                  {friend.friend_id === userId ? friend.user_id : friend.friend_id}
                </p>
              </div>
            ))
          )}
        </section>

        <section className="rounded-2xl border border-white/10 p-6 text-center text-sm text-white/50">
          Your activity and posts will appear here.
        </section>
      </div>
    </main>
  );
}