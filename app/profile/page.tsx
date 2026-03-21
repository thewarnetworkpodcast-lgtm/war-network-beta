"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type FriendRequest = {
  id: string;
  name: string;
  message: string;
};

type Friend = {
  id: string;
  name: string;
};

const PROFILE_NAME_KEY = "war-profile-name";
const PROFILE_BIO_KEY = "war-profile-bio";
const FRIEND_REQUESTS_KEY = "war-friend-requests";
const FRIENDS_KEY = "war-friends";

function normalizeName(value: string) {
  return value.trim().toLowerCase();
}

function isOldSeedName(name: string) {
  const normalized = normalizeName(name);
  return normalized === "kevin" || normalized === "bradley";
}

export default function ProfilePage() {
  const [profileName, setProfileName] = useState("Your Name");
  const [profileBio, setProfileBio] = useState(
    "This is your space. Build your identity. Share your story."
  );
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);
  const [friends, setFriends] = useState<Friend[]>([]);

  useEffect(() => {
    try {
      const savedName = localStorage.getItem(PROFILE_NAME_KEY);
      const savedBio = localStorage.getItem(PROFILE_BIO_KEY);
      const savedRequests = localStorage.getItem(FRIEND_REQUESTS_KEY);
      const savedFriends = localStorage.getItem(FRIENDS_KEY);

      if (savedName && savedName.trim()) {
        setProfileName(savedName.trim());
      }

      if (savedBio && savedBio.trim()) {
        setProfileBio(savedBio.trim());
      }

      if (savedRequests) {
        const parsedRequests: FriendRequest[] = JSON.parse(savedRequests);
        const cleanedRequests = parsedRequests.filter(
          (request) => !isOldSeedName(request.name)
        );
        setFriendRequests(cleanedRequests);
        localStorage.setItem(FRIEND_REQUESTS_KEY, JSON.stringify(cleanedRequests));
      } else {
        setFriendRequests([]);
        localStorage.setItem(FRIEND_REQUESTS_KEY, JSON.stringify([]));
      }

      if (savedFriends) {
        const parsedFriends: Friend[] = JSON.parse(savedFriends);
        const cleanedFriends = parsedFriends.filter(
          (friend) => !isOldSeedName(friend.name)
        );
        setFriends(cleanedFriends);
        localStorage.setItem(FRIENDS_KEY, JSON.stringify(cleanedFriends));
      } else {
        setFriends([]);
        localStorage.setItem(FRIENDS_KEY, JSON.stringify([]));
      }
    } catch {
      setFriendRequests([]);
      setFriends([]);
    }
  }, []);

  function persistRequests(nextRequests: FriendRequest[]) {
    setFriendRequests(nextRequests);
    localStorage.setItem(FRIEND_REQUESTS_KEY, JSON.stringify(nextRequests));
  }

  function persistFriends(nextFriends: Friend[]) {
    setFriends(nextFriends);
    localStorage.setItem(FRIENDS_KEY, JSON.stringify(nextFriends));
  }

  function handleAcceptRequest(request: FriendRequest) {
    const nextRequests = friendRequests.filter((item) => item.id !== request.id);
    const alreadyFriend = friends.some((friend) => friend.id === request.id);

    const nextFriends = alreadyFriend
      ? friends
      : [...friends, { id: request.id, name: request.name }];

    persistRequests(nextRequests);
    persistFriends(nextFriends);
  }

  function handleDeclineRequest(requestId: string) {
    const nextRequests = friendRequests.filter((item) => item.id !== requestId);
    persistRequests(nextRequests);
  }

  const friendCountText = useMemo(() => {
    return `${friends.length} Friend${friends.length === 1 ? "" : "s"}`;
  }, [friends.length]);

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
              {friendCountText}
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
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-[#D4AF37]">
              Friend Requests
            </h2>
            <p className="text-sm text-white/45">{friendRequests.length} pending</p>
          </div>

          <div className="mt-4 flex flex-col gap-3">
            {friendRequests.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-4 text-sm leading-6 text-white/65">
                No pending friend requests.
              </div>
            ) : (
              friendRequests.map((request) => (
                <div
                  key={request.id}
                  className="rounded-2xl border border-white/10 bg-black/30 px-4 py-4"
                >
                  <p className="text-base font-semibold text-white">
                    {request.name}
                  </p>

                  <p className="mt-2 text-sm leading-6 text-white/70">
                    {request.message}
                  </p>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <button
                      onClick={() => handleAcceptRequest(request)}
                      className="flex h-11 w-full items-center justify-center rounded-2xl bg-[#D4AF37] text-sm font-semibold text-black"
                    >
                      Accept
                    </button>

                    <button
                      onClick={() => handleDeclineRequest(request.id)}
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
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-[#D4AF37]">
              Friends List
            </h2>
            <p className="text-sm text-white/45">{friends.length} total</p>
          </div>

          <div className="mt-4 flex flex-col gap-3">
            {friends.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-4 text-sm leading-6 text-white/65">
                No friends added yet.
              </div>
            ) : (
              friends.map((friend) => (
                <div
                  key={friend.id}
                  className="rounded-2xl border border-white/10 bg-black/30 px-4 py-4"
                >
                  <p className="text-base font-semibold text-white">
                    {friend.name}
                  </p>
                </div>
              ))
            )}
          </div>
        </section>

        <section className="rounded-3xl border border-[#D4AF37]/20 bg-[#111111] px-6 py-5">
          <p className="text-sm leading-6 text-white/60">
            Your activity and posts will appear here.
          </p>
        </section>
      </div>
    </main>
  );
}