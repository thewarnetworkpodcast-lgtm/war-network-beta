import RoomPostBox from "../../components/RoomPostBox";

export default async function RoomPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const roomName = slug.replace(/-/g, " ").toUpperCase();

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ color: "#D4AF37", marginBottom: "24px" }}>
        {roomName}
      </h2>

      <div
        style={{
          border: "1px solid #D4AF37",
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        <div style={{ marginBottom: "10px", color: "#aaa" }}>
          Room Feed
        </div>

        <div style={{ marginBottom: "20px", color: "#777" }}>
          No posts yet.
        </div>

        <RoomPostBox slug={slug} />
      </div>
    </div>
  );
}