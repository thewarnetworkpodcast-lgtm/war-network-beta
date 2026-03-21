"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

type ProfileResult = {
  id: string;
  full_name: string | null;
  email: string | null;
};

export default function ProfilePage() {
  const [profileName, setProfileName] = useState("Your Name");
  const [profileBio, setProfileBio] = useState(
    "This is your space. Build your identity. Share your story."
  );
  const [friendsCount, setFriendsCount] = useState(0);
  const [userId, setUserId] = useState("");

  const [searchName, setSearchName] = useState("");
  const [results, setResults] = useState<ProfileResult[]>([]);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    void loadProfile();
  }, []);

  async function loadProfile() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    setUserId(user.id);

    const savedName = localStorage.getItem("war-profile-name");
    const savedBio = localStorage.getItem("war-profile-bio");

    if (savedName && savedName.trim()) setProfileName(savedName);
    if (savedBio && savedBio.trim()) setProfileBio(savedBio);

    const { data } = await supabase
      .from("friends")
      .select("id")
      .eq("user_id", user.id);

    if (data) setFriendsCount(data.length);
  }

  async function searchByName() {
    const cleanName = searchName.trim();

    if (!cleanName) {
      setResults([]);
      return;
    }

    setSearching(true);

    const { data, error } = await supabase
      .from("profiles")
      .select("id, full_name, email")
      .ilike("full_name", `%${cleanName}%`)
      .limit(10);

    if (error) {
      console.error("Name search failed:", error);
      setResults([]);
      setSearching(false);
      return;
    }

    const filtered = (data || []).filter((profile) => profile.id !== userId);
    setResults(filtered as ProfileResult[]);
    setSearching(false);
  }

  async function sendFriendRequest(receiverId: string) {
    if (!userId || !receiverId || receiverId === userId) return;

    const { data: existingPending } = await supabase
      .from("friend_requests")
      .select("id")
      .eq("sender_id", userId)
      .eq("receiver_id", receiverId)
      .eq("status", "pending");

    if (existingPending && existingPending.length > 0) {
      alert("Request already sent");
      return;
    }

    const { error } = await supabase.from("friend_requests").insert([
      {
        sender_id: userId,
        receiver_id: receiverId,
        status: "pending",
      },
    ]);

    if (error) {
      console.error("send request failed:", error);
      alert("Could not send request");
      return;
    }

    alert("Friend request sent");
  }

  return (
    <main className="min-h-screen bg-[#0b0b0b] px-4 py-6 pb-24 text-white">
      <div className="mx-auto flex w-full max-w-md flex-col gap-4">
        <section className="rounded-2xl border border-white/10 bg-black/40 p-6 text-center">
          <div className="mb-4 flex justify-center">
            <img
              src="/fracturelight.png"
              alt="Fracturelight"
              className="h-12 w-12 object-contain"
            />
          </div>

          <h1 className="text-lg font-semibold">{profileName}</h1>

          <p className="mt-3 text-sm leading-7 text-white/70">{profileBio}</p>

          <p className="mt-4 text-sm font-semibold text-[#D4AF37]">
            {friendsCount} Friends
          </p>

          <button className="mt-4 w-full rounded-lg border border-[#D4AF37] py-2 text-[#D4AF37]">
            Edit Profile
          </button>
        </section>

        <section className="rounded-2xl border border-white/10 bg-black/40 p-4 text-center">
          <h2 className="mb-3 font-semibold text-[#D4AF37]">
            Add Friend by Name
          </h2>

          <input
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder="Search profile name"
            className="mb-3 w-full rounded-lg border border-white/10 bg-black px-3 py-2 text-sm outline-none"
          />

          <button
            onClick={searchByName}
            className="w-full rounded-lg bg-[#D4AF37] py-2 text-sm font-semibold text-black"
          >
            Search
          </button>

          <div className="mt-4 flex flex-col gap-2">
            {searching ? (
              <div className="rounded-lg border border-white/10 py-3 text-center text-sm text-white/50">
                Searching...
              </div>
            ) : results.length === 0 ? (
              <div className="rounded-lg border border-white/10 py-3 text-center text-sm text-white/50">
                No users found.
              </div>
            ) : (
              results.map((profile) => (
                <div
                  key={profile.id}
                  className="rounded-lg border border-white/10 p-3 text-left"
                >
                  <p className="text-sm font-semibold text-white">
                    {profile.full_name || "Unnamed User"}
                  </p>

                  <p className="mt-1 break-all text-xs text-white/50">
                    {profile.email || "No email shown"}
                  </p>

                  <button
                    onClick={() => sendFriendRequest(profile.id)}
                    className="mt-3 w-full rounded-lg bg-[#D4AF37] py-2 text-sm font-semibold text-black"
                  >
                    Add Friend
                  </button>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </main>
  );
}