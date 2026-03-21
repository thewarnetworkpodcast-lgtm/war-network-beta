"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";

type Message = {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: string;
};

export default function ChatPage() {
  const params = useParams();
  const friendId = params.id as string;

  const [userId, setUserId] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    void loadUserAndMessages();
  }, [friendId]);

  async function loadUserAndMessages() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    setUserId(user.id);
    await loadMessages(user.id, friendId);
  }

  async function loadMessages(currentUserId: string, currentFriendId: string) {
    const { data, error } = await supabase
      .from("messages")
      .select("id, sender_id, receiver_id, content, created_at")
      .or(
        `and(sender_id.eq.${currentUserId},receiver_id.eq.${currentFriendId}),and(sender_id.eq.${currentFriendId},receiver_id.eq.${currentUserId})`
      )
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Loading messages failed:", error);
      setMessages([]);
      return;
    }

    setMessages((data as Message[]) || []);
  }

  async function sendMessage() {
    const cleanMessage = newMessage.trim();

    if (!cleanMessage || !userId || !friendId) return;

    const { error } = await supabase.from("messages").insert([
      {
        sender_id: userId,
        receiver_id: friendId,
        content: cleanMessage,
      },
    ]);

    if (error) {
      console.error("Sending message failed:", error);
      return;
    }

    setNewMessage("");
    await loadMessages(userId, friendId);
  }

  return (
    <main className="min-h-screen bg-[#0b0b0b] px-4 py-6 pb-24 text-white">
      <div className="mx-auto flex h-[80vh] w-full max-w-sm flex-col">
        <h1 className="mb-4 text-center text-xl font-semibold text-[#D4AF37]">
          Chat
        </h1>

        <section className="flex-1 overflow-y-auto rounded-2xl border border-white/10 p-4">
          <div className="flex flex-col gap-2">
            {messages.length === 0 ? (
              <p className="text-center text-sm text-white/50">
                No messages yet.
              </p>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`max-w-[80%] rounded-xl px-3 py-2 text-sm ${
                    message.sender_id === userId
                      ? "ml-auto bg-[#D4AF37] text-black"
                      : "bg-white/10 text-white"
                  }`}
                >
                  {message.content}
                </div>
              ))
            )}
          </div>
        </section>

        <div className="mt-3 flex gap-2">
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type message..."
            className="flex-1 rounded-xl border border-white/10 bg-black px-3 py-2 text-sm text-white outline-none"
          />

          <button
            onClick={sendMessage}
            className="rounded-xl bg-[#D4AF37] px-4 py-2 text-sm font-semibold text-black"
          >
            Send
          </button>
        </div>
      </div>
    </main>
  );
}