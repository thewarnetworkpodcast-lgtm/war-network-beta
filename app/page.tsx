export default function Home() {
  return (
    <main style={{
      backgroundColor: "#000",
      color: "#D4AF37",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      padding: "20px"
    }}>
      
      <h1 style={{ fontSize: "40px", marginBottom: "10px" }}>
        W.A.R. Network
      </h1>

      <h2 style={{ fontSize: "22px", marginBottom: "20px" }}>
        WE’RE ALL RECOVERING
      </h2>

      <h3 style={{ fontSize: "18px", marginBottom: "20px" }}>
        THE NEW SOCIAL PLATFORM
      </h3>

      <p style={{
        fontSize: "14px",
        maxWidth: "300px",
        marginBottom: "30px",
        color: "#ccc"
      }}>
        A private space for real people dealing with real life.
        Built for recovery, growth, and connection.
      </p>

      <div style={{
        border: "1px solid #D4AF37",
        padding: "10px 20px",
        borderRadius: "20px",
        fontSize: "12px"
      }}>
        FOUNDING MEMBER ALPHA • COMING THIS WEEK
      </div>

    </main>
  )
}