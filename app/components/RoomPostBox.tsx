'use client'

import { useState } from "react"

export default function RoomPostBox({ slug }: { slug: string }) {
  const [text, setText] = useState("")

  return (
    <div style={{ marginTop: "20px" }}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Share something with the room..."
        style={{
          width: "100%",
          background: "#0a0a0a",
          border: "1px solid #D4AF37",
          color: "#fff",
          padding: "12px",
          borderRadius: "6px",
          marginBottom: "10px"
        }}
      />

      <button
        onClick={() => alert("Button working for room: " + slug)}
        style={{
          background: "#D4AF37",
          color: "#000",
          padding: "10px 18px",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "bold"
        }}
      >
        Post to Room
      </button>
    </div>
  )
}