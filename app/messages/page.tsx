"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../lib/supabaseClient";

type Friend = {
  id: string;
  user_id: string;
  friend_id: string;
};

export default function MessagesPage() {
  const [userId, setUserId] = useState("");
  const [friends, setFriends] = useState<Friend[]>([]);

  useEffect(() => {
    loadFriends();
  }, []);

  async function loadFriends() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    setUserId(user.id);

    const { data } = await supabase
      .from("friends")
      .select("*")
      .eq("user_id", user.id);

    if (data) setFriends(data);
  }

  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white px-4 py-6 pb-24">
      <div className="max-w-md mx-auto flex flex-col gap-4">

        <h1 className="text-center text-xl font-semibold text-[#D4AF37]">
          Messages
        </h1>

        <div className="rounded-2xl border border-white/10 p-4">

          {friends.length === 0 ? (
            <p className="text-white/50 text-sm text-center">
              No conversations yet.
            </p>
          ) : (
            friends.map((f) => (
              <Link
                key={f.id}
                href={`/messages/${f.friend_id}`}
                className="block border border-white/10 rounded-lg px-3 py-3 mb-2"
              >
                <p className="text-sm">{f.friend_id}</p>
              </Link>
            ))
          )}

        </div>
      </div>
    </main>
  );
}