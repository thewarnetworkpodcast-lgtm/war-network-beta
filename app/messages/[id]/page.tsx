"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { getCurrentUser } from "../../lib/userStore";
import { getThread, sendMessage } from "../../lib/messageStore";

type ChatMessage = {
  id: string;
  text: string;
  sender: string;
  createdAt: string;
};

function formatTime(value: string) {
  return new Date(value).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
}

function toDisplayName(value: string) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default function MessageThreadPage() {
  const params = useParams();
  const id = String(params.id);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [text, setText] = useState("");
  const [currentUser, setCurrentUser] = useState("guest");

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
    setMessages(getThread(id));
  }, [id]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleSend() {
    if (!text.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: currentUser,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setText("");
    sendMessage(id, newMessage.text, currentUser);
  }

  const title = useMemo(() => {
    if (id === "founding-members") return "Founding Members";
    if (id === "stryker") return "Stryker";
    return toDisplayName(id);
  }, [id]);

  return (
    <main className="min-h-screen bg-black px-4 pb-24 pt-6 text-white">
      <div className="mx-auto flex w-full max-w-md flex-col gap-4">
        <div className="rounded-3xl border border-[#D4AF37]/20 bg-[#111111] p-5">
          <Link href="/messages" className="text-xs text-[#D4AF37]">
            ← Back
          </Link>
          <h1 className="mt-3 text-xl font-semibold text-white">{title}</h1>
          <p className="mt-1 text-sm text-white/55">Direct conversation</p>
        </div>

        <div className="flex max-h-[52vh] flex-col gap-3 overflow-y-auto pr-1">
          {messages.map((message) => {
            const isYou = message.sender === currentUser;
            const isSystem = message.sender === "system";

            return (
              <div
                key={message.id}
                className={`max-w-[82%] rounded-2xl border p-3 ${
                  isSystem
                    ? "border-[#D4AF37]/20 bg-[#111111] text-white"
                    : isYou
                    ? "ml-auto border-[#D4AF37]/20 bg-[#D4AF37] text-black"
                    : "border-[#D4AF37]/20 bg-[#111111] text-white"
                }`}
              >
                <p className="whitespace-pre-wrap text-sm">{message.text}</p>
                <p
                  className={`mt-2 text-[11px] ${
                    isSystem
                      ? "text-white/40"
                      : isYou
                      ? "text-black/65"
                      : "text-white/40"
                  }`}
                >
                  {isSystem ? "System" : isYou ? "You" : title} •{" "}
                  {formatTime(message.createdAt)}
                </p>
              </div>
            );
          })}

          <div ref={bottomRef} />
        </div>

        <div className="mt-2 flex items-center gap-3">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write a message..."
            className="h-12 flex-1 rounded-2xl border border-[#D4AF37]/20 bg-black px-4 text-sm text-white outline-none placeholder:text-white/35"
          />

          <button
            type="button"
            onClick={handleSend}
            className="inline-flex h-12 w-24 shrink-0 items-center justify-center rounded-2xl bg-[#D4AF37] text-sm font-semibold leading-none text-black"
          >
            <span className="block leading-none">Send</span>
          </button>
        </div>
      </div>
    </main>
  );
}