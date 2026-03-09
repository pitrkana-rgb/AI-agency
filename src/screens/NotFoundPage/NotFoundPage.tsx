import { useNavigate } from "react-router-dom";

export const NotFoundPage = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        backgroundColor: "#000",
        fontFamily: "'Space Grotesk', 'Inter', sans-serif",
        color: "#fff",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: "clamp(28px,5vw,40px)", marginBottom: "16px" }}>
        Stránka nenalezena
      </h1>
      <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "16px", color: "rgba(255,255,255,0.7)", lineHeight: 1.6, marginBottom: "32px", maxWidth: "400px" }}>
        Omlouváme se, tato stránka neexistuje.
      </p>
      <button
        type="button"
        onClick={() => navigate("/")}
        style={{
          padding: "14px 28px",
          borderRadius: "12px",
          background: "linear-gradient(135deg, #0ABDC6, #00E5FF)",
          color: "#000",
          border: "none",
          fontFamily: "'Space Grotesk',sans-serif",
          fontWeight: 600,
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Zpět na úvodní stránku
      </button>
    </div>
  );
};
