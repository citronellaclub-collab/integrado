import { useState } from "react";

export default function Sidebar() {
  const [open, setOpen] = useState(true);

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: open ? "220px" : "60px",
          transition: "width 0.3s",
          background: "#1f2937",
          color: "white",
          minHeight: "100vh",
          padding: "1rem"
        }}
      >
        <button
          onClick={() => setOpen(!open)}
          style={{
            marginBottom: "1rem",
            background: "#374151",
            color: "white",
            border: "none",
            padding: "0.5rem",
            cursor: "pointer"
          }}
        >
          {open ? "⟨⟨" : "⟩⟩"}
        </button>

        <nav>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li style={{ margin: "1rem 0" }}>🏠 {open && "Inicio"}</li>
            <li style={{ margin: "1rem 0" }}>👤 {open && "Usuarios"}</li>
            <li style={{ margin: "1rem 0" }}>⚙️ {open && "Configuración"}</li>
          </ul>
        </nav>
      </aside>

      {/* Main content placeholder */}
      <main style={{ flex: 1, padding: "2rem" }}>
        <h1>Contenido principal</h1>
        <p>Aquí va el contenido de tu aplicación.</p>
      </main>
    </div>
  );
}

