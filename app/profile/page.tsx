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
  const [targetId, setTargetId] = useState("");
  const [statusMsg, setStatusMsg] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfilePage();
  }, []);

  async function loadProfilePage() {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    setUserId(user.id);

    const { data: requests } = await supabase
      .from("friend_requests")
      .select("*")
      .eq("receiver_id", user.id)
      .eq("status", "pending");

    if (requests) setFriendRequests(requests);

    const { data: friendsData } = await supabase
      .from("friends")
      .select("*")
      .eq("user_id", user.id);

    if (friendsData) setFriends(friendsData);

    setLoading(false);
  }

  async function sendFriendRequest() {
    if (!targetId.trim()) return;

    if (targetId === userId) {
      setStatusMsg("You can't add yourself.");
      return;
    }

    const { data: existing } = await supabase
      .from("friend_requests")
      .select("*")
      .eq("sender_id", userId)
      .eq("receiver_id", targetId)
      .eq("status", "pending");

    if (existing && existing.length > 0) {
      setStatusMsg("Request already sent.");
      return;
    }

    await supabase.from("friend_requests").insert([
      {
        sender_id: userId,
        receiver_id: targetId,
        status: "pending",
      },
    ]);

    setStatusMsg("Request sent.");
    setTargetId("");
  }

  async function acceptFriendRequest(requestId: string, senderId: string) {
    await supabase
      .from("friend_requests")
      .update({ status: "accepted" })
      .eq("id", requestId);

    await supabase.from("friends").insert([
      { user_id: userId, friend_id: senderId },
      { user_id: senderId, friend_id: userId },
    ]);

    loadProfilePage();
  }

  async function declineFriendRequest(requestId: string) {
    await supabase
      .from("friend_requests")
      .update({ status: "declined" })
      .eq("id", requestId);

    loadProfilePage();
  }

  return (
    <main className="min-h-screen bg-[#0b0b0b] px-4 py-10 pb-24 text-white">
      <div className="mx-auto flex w-full max-w-sm flex-col gap-6">

        {/* PROFILE */}
        <section className="rounded-2xl border border-white/10 p-6 text-center">
          <div className="mb-4 flex justify-center">
            <img
              src="/fracturelight.png"
              alt="W.A.R"
              className="h-16 w-16 object-contain"
            />
          </div>

          <h1 className="mb-2 text-xl font-semibold">{profileName}</h1>

          <p className="mb-4 text-sm text-white/60">{profileBio}</p>

          <p className="mb-4 font-semibold text-[#D4AF37]">
            {friends.length} Friends
          </p>

          <button className="w-full rounded-xl border border-[#D4AF37] py-2 text-[#D4AF37]">
            Edit Profile
          </button>
        </section>

        {/* MEMBER ID */}
        <section className="rounded-2xl border border-white/10 p-6 text-center">
          <h2 className="mb-2 text-[#D4AF37]">Your Member ID</h2>

          <p className="mb-4 text-sm text-white/70 break-all">
            {userId}
          </p>

          <button
            onClick={() => navigator.clipboard.writeText(userId)}
            className="w-full rounded-xl border border-white/20 py-2"
          >
            Copy Member ID
          </button>
        </section>

        {/* ADD FRIEND */}
        <section className="rounded-2xl border border-white/10 p-6 text-center">
          <h2 className="mb-3 text-[#D4AF37]">Add Friend</h2>

          <input
            value={targetId}
            onChange={(e) => setTargetId(e.target.value)}
            placeholder="Enter Member ID"
            className="w-full mb-3 rounded-lg bg-black border border-white/10 px-3 py-2 text-sm"
          />

          <button
            onClick={sendFriendRequest}
            className="w-full rounded-xl bg-[#D4AF37] py-2 text-black"
          >
            Send Request
          </button>

          {statusMsg && (
            <p className="mt-3 text-xs text-white/60">{statusMsg}</p>
          )}
        </section>

        {/* FRIEND REQUESTS */}
        <section className="rounded-2xl border border-white/10 p-6">
          <div className="text-center mb-3">
            <h2 className="text-[#D4AF37]">Friend Requests</h2>
            <p className="text-sm text-white/60">
              {friendRequests.length} pending
            </p>
          </div>

          {friendRequests.length === 0 ? (
            <div className="text-center text-white/50">
              No pending friend requests.
            </div>
          ) : (
            friendRequests.map((req) => (
              <div
                key={req.id}
                className="border border-white/10 rounded-lg p-3 mb-2"
              >
                <p className="text-sm mb-2">{req.sender_id}</p>

                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      acceptFriendRequest(req.id, req.sender_id)
                    }
                    className="bg-[#D4AF37] px-3 py-1 text-black rounded"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() => declineFriendRequest(req.id)}
                    className="border border-white/20 px-3 py-1 rounded"
                  >
                    Decline
                  </button>
                </div>
              </div>
            ))
          )}
        </section>

        {/* FRIEND LIST */}
        <section className="rounded-2xl border border-white/10 p-6">
          <div className="text-center mb-3">
            <h2 className="text-[#D4AF37]">Friends List</h2>
            <p className="text-sm text-white/60">
              {friends.length} total
            </p>
          </div>

          {friends.length === 0 ? (
            <div className="text-center text-white/50">
              No friends added yet.
            </div>
          ) : (
            friends.map((f) => (
              <div
                key={f.id}
                className="border border-white/10 rounded-lg p-3 mb-2"
              >
                {f.friend_id}
              </div>
            ))
          )}
        </section>

      </div>
    </main>
  );
}