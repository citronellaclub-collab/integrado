// ===============================
// CONFIGURACIÓN BASE
// ===============================
const BASE_PATH = window.location.pathname.endsWith("/")
  ? window.location.pathname
  : window.location.pathname + "/";

// ===============================
// LOGIN SIMPLE (DEMO)
// ===============================
function login(event) {
  event.preventDefault();

  // Login demo (sin validación real)
  localStorage.setItem("logged", "true");
  window.location.href = "index.html";
}

// ===============================
// LOGOUT
// ===============================
function logout() {
  localStorage.removeItem("logged");
  window.location.href = "login.html";
}

// ===============================
// PROTECCIÓN DE ACCESO
// ===============================
function checkAuth() {
  const logged = localStorage.getItem("logged");
  if (!logged) {
    window.location.href = "login.html";
  }
}

// ===============================
// CARGA DE SECCIONES (SPA)
// ===============================
function loadPage(page) {
  const content = document.getElementById("content");
  if (!content) return;

  fetch(BASE_PATH + page)
    .then(response => {
      if (!response.ok) throw new Error("404");
      return response.text();
    })
    .then(html => {
      content.innerHTML = html;
      window.scrollTo(0, 0);
    })
    .catch(() => {
      content.innerHTML = `
        <div style="padding:30px">
          <h2>404 – Sección no encontrada</h2>
          <p>No se pudo cargar <strong>${page}</strong></p>
        </div>
      `;
    });
}

// ===============================
// ATAJO PARA BOTONES
// ===============================
function go(page) {
  loadPage(page);
}

// ===============================
// INICIO AUTOMÁTICO
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  if (document.body.dataset.protected === "true") {
    checkAuth();
    loadPage("dashboard.html");
  }
});
