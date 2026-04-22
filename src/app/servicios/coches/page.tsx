import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import ServiceForm from "@/components/service-form";

export default function CochesPage() {
  return (
    <>
      <Navbar />

      {/* Hero — full screen like properties */}
      <div
        style={{
          position: "relative",
          height: "100vh",
          minHeight: 600,
          overflow: "hidden",
        }}
      >
        <img
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/a6bda00f-9d85-4858-8c8d-a58f8ab1c935/shutterstock_1725068512-resized-1772721651186.jpg"
          alt="Coches de lujo en Ibiza"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.65) 100%)",
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 2,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            paddingBottom: 60,
            paddingLeft: "6%",
            paddingRight: "6%",
            paddingTop: 140,
            maxWidth: 1400,
            margin: "0 auto",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <p
            style={{
              fontSize: "0.6rem",
              fontWeight: 700,
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "#1847E8",
              margin: "0 0 20px",
            }}
          >
            Supercars · SUV · Con conductor
          </p>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(3rem, 6vw, 6rem)",
              fontWeight: 300,
              color: "#fff",
              margin: 0,
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
            }}
          >
            Coches de<br /><em>Lujo</em>
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: 32, marginTop: 32 }}>
            <div style={{ width: 40, height: 1, background: "#1847E8" }} />
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.78rem", fontWeight: 300, letterSpacing: "0.08em", margin: 0 }}>
              La flota más exclusiva de Ibiza
            </p>
          </div>
        </div>
      </div>

      {/* Content + Form */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        {/* Info */}
        <div style={{ background: "#fff", padding: "80px 6% 80px 6%" }}>
          <p style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.35em", textTransform: "uppercase", color: "#1847E8", margin: "0 0 20px" }}>
            Conduce en exclusiva
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 2.5vw, 2.8rem)", fontWeight: 300, color: "#0A0A0A", margin: "0 0 24px", letterSpacing: "-0.03em", lineHeight: 1.2 }}>
            El mejor complemento<br />para tu estancia
          </h2>
          <div style={{ fontSize: "0.85rem", color: "#555", lineHeight: 1.9, display: "flex", flexDirection: "column", gap: 16 }}>
            <p style={{ margin: 0 }}>Pon el mejor complemento a tu estancia en Ibiza con nuestra flota de vehículos de lujo. Desde supercars hasta SUVs de alta gama, tenemos el coche perfecto para cada ocasión.</p>
            <p style={{ margin: 0 }}>Ferrari, Lamborghini, McLaren, Porsche, Bentley, Range Rover... Todos en perfecto estado y disponibles con o sin conductor.</p>
            <p style={{ margin: 0 }}>Entrega y recogida en el aeropuerto, puerto o en tu alojamiento. Disponible por días o semanas con tarifas personalizadas.</p>
          </div>
          <div style={{ marginTop: 40, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {["Ferrari · Lamborghini", "Porsche · McLaren", "Bentley · Rolls-Royce", "Entrega a domicilio"].map((item) => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: "0.68rem", color: "#333", textTransform: "uppercase", letterSpacing: "0.15em" }}>
                <span style={{ width: 16, height: 1, background: "#1847E8", flexShrink: 0 }} />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <ServiceForm service="coches" showDate />
      </div>

      <Footer />
    </>
  );
}
