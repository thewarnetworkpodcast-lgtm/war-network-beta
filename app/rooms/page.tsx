export default function RoomsPage() {
  const experienceRooms = [
    "Combat Veterans",
    "Childhood Trauma",
    "Addiction Recovery",
    "Grief & Loss",
    "Autism Parents",
    "Incarceration & Reentry",
  ];

  const rebuildRooms = [
    "Discipline",
    "Sobriety",
    "Purpose",
    "Mindset",
    "Fitness",
    "Faith",
  ];

  return (
    <main
      style={{
        background: "#0a0a0a",
        minHeight: "100vh",
        color: "#D4AF37",
        fontFamily: "sans-serif",
        paddingBottom: "80px",
      }}
    >
      <div style={{ textAlign: "center", padding: "20px 20px 10px 20px" }}>
        <h1 style={{ marginBottom: "6px" }}>W.A.R. Network</h1>
        <p style={{ marginTop: 0, fontWeight: "bold" }}>WE’RE ALL RECOVERING</p>
      </div>

      <div style={{ padding: "20px", paddingTop: "10px" }}>
        <h2 style={{ marginBottom: "10px" }}>Experience Rooms</h2>

        {experienceRooms.map((room) => {
          const slug = room.toLowerCase().replace(/&/g, "and").replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");

          return (
            <a
              key={room}
              href={`/rooms/${slug}`}
              style={{
                display: "block",
                background: "#111",
                color: "#D4AF37",
                textDecoration: "none",
                padding: "16px",
                borderRadius: "10px",
                marginBottom: "12px",
                border: "1px solid #2a2a2a",
                fontWeight: "bold",
              }}
            >
              {room}
            </a>
          );
        })}

        <h2 style={{ marginTop: "28px", marginBottom: "10px" }}>Rebuild Rooms</h2>

        {rebuildRooms.map((room) => {
          const slug = room.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");

          return (
            <a
              key={room}
              href={`/rooms/${slug}`}
              style={{
                display: "block",
                background: "#111",
                color: "#D4AF37",
                textDecoration: "none",
                padding: "16px",
                borderRadius: "10px",
                marginBottom: "12px",
                border: "1px solid #2a2a2a",
                fontWeight: "bold",
              }}
            >
              {room}
            </a>
          );
        })}

        <div
          style={{
            background: "#111",
            border: "1px solid #D4AF37",
            borderRadius: "12px",
            padding: "18px",
            marginTop: "24px",
          }}
        >
          <h3 style={{ marginTop: 0 }}>Create Your Own Private Room</h3>
          <p style={{ color: "#fff", lineHeight: "1.5" }}>
            Build a private recovery space for your circle, your family, your people, or your mission.
          </p>
          <button
            style={{
              background: "#D4AF37",
              color: "#000",
              border: "none",
              borderRadius: "8px",
              padding: "12px 18px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Create Private Room
          </button>
        </div>
      </div>

      <div
        style={{
          position: "fixed",
          bottom: "0",
          left: "0",
          right: "0",
          height: "65px",
          background: "#000",
          borderTop: "2px solid #D4AF37",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          color: "#D4AF37",
          fontWeight: "bold",
        }}
      >
        <a href="/" style={{ color: "#D4AF37", textDecoration: "none" }}>
          Home
        </a>

        <a href="/rooms" style={{ color: "#D4AF37", textDecoration: "none" }}>
          Rooms
        </a>

        <a href="/recovery-log" style={{ color: "#D4AF37", textDecoration: "none" }}>
          Log
        </a>

        <a href="/messages" style={{ color: "#D4AF37", textDecoration: "none" }}>
          Messages
        </a>

        <a href="/profile" style={{ color: "#D4AF37", textDecoration: "none" }}>
          Profile
        </a>
      </div>
    </main>
  );
}