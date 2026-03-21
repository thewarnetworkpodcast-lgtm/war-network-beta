"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function ProfilePage() {
  const [profileName, setProfileName] = useState("Your Name");
  const [profileBio, setProfileBio] = useState(
    "This is your space. Build your identity. Share your story."
  );
  const [friendsCount, setFriendsCount] = useState(0);
  const [targetUserId, setTargetUserId] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    setUserId(user.id);

    const savedName = localStorage.getItem("war-profile-name");
    const savedBio = localStorage.getItem("war-profile-bio");

    if (savedName) setProfileName(savedName);
    if (savedBio) setProfileBio(savedBio);

    const { data } = await supabase
      .from("friends")
      .select("id")
      .eq("user_id", user.id);

    if (data) setFriendsCount(data.length);
  }

  async function sendFriendRequest() {
    if (!targetUserId || targetUserId === userId) return;

    await supabase.from("friend_requests").insert([
      {
        sender_id: userId,
        receiver_id: targetUserId,
        status: "pending",
      },
    ]);

    setTargetUserId("");
    alert("Friend request sent");
  }

  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white px-4 py-6 pb-24">
      <div className="max-w-md mx-auto flex flex-col gap-4">

        {/* PROFILE */}
        <section className="rounded-2xl border border-white/10 p-6 text-center">
          <div className="flex justify-center mb-4">
            <img
              src="/fracturelight.png"
              alt="Fracturelight"
              className="h-12 w-12 object-contain"
            />
          </div>

          <h1 className="text-lg font-semibold">{profileName}</h1>

          <p className="text-white/60 text-sm mt-2">
            {profileBio}
          </p>

          <p className="text-[#D4AF37] mt-4 text-sm font-semibold">
            {friendsCount} Friends
          </p>

          <button className="mt-4 w-full border border-[#D4AF37] rounded-lg py-2 text-[#D4AF37]">
            Edit Profile
          </button>
        </section>

        {/* ADD FRIEND */}
        <section className="rounded-2xl border border-white/10 p-4 text-center">
          <h2 className="text-[#D4AF37] font-semibold mb-3">
            Add Friend
          </h2>

          <input
            value={targetUserId}
            onChange={(e) => setTargetUserId(e.target.value)}
            placeholder="Enter User ID"
            className="w-full rounded-lg bg-black border border-white/10 px-3 py-2 text-sm mb-3 outline-none"
          />

          <button
            onClick={sendFriendRequest}
            className="w-full bg-[#D4AF37] text-black rounded-lg py-2 text-sm font-semibold"
          >
            Send Request
          </button>
        </section>

      </div>
    </main>
  );
}