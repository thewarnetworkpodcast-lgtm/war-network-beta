export default function Home() {
  return (
    <main style={{
      minHeight: "100vh",
      background: "#000",
      color: "#D4AF37",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: "20px"
    }}>

      <img
        src="/fracturelight.png"
        alt="W.A.R. Network"
        style={{
          width: "120px",
          marginBottom: "30px"
        }}
      />

      <h1 style={{
        fontSize: "28px",
        letterSpacing: "2px",
        marginBottom: "10px"
      }}>
        W.A.R. NETWORK
      </h1>

      <p style={{
        fontSize: "14px",
        marginBottom: "30px",
        color: "#aaa"
      }}>
        WE’RE ALL RECOVERING
      </p>

      <h2 style={{
        fontSize: "20px",
        marginBottom: "20px"
      }}>
        THE NEW SOCIAL PLATFORM
      </h2>

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