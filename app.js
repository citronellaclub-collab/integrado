/* =========================
   APP.JS - CULTIVO VIRTUAL
   Versión estable (NO SPA)
   ========================= */

/*
  Este archivo SOLO:
  - Maneja login simple
  - Guarda sesión en localStorage
  - Redirige correctamente
  NO carga HTML dinámico
  NO intercepta navegación
*/

// ---------- CONFIG ----------
const SESSION_KEY = "cv_logged";

// ---------- UTILIDADES ----------
function isLogged() {
  return localStorage.getItem(SESSION_KEY) === "true";
}

function login() {
  localStorage.setItem(SESSION_KEY, "true");
  window.location.href = "dashboard.html";
}

function logout() {
  localStorage.removeItem(SESSION_KEY);
  window.location.href = "index.html";
}

// ---------- LOGIN ----------
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");

  // Si estamos en index.html y ya está logueado → dashboard
  if (loginForm && isLogged()) {
    window.location.href = "dashboard.html";
    return;
  }

  // Manejo del formulario de login
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      login();
    });
  }

  // Protección de páginas internas
  const protectedPages = [
    "dashboard.html",
    "foro.html",
    "perfil.html",
    "pedidos.html",
    "gtl.html",
    "micultivo.html",
    "novedades.html"
  ];

  const currentPage = window.location.pathname.split("/").pop();

  if (protectedPages.includes(currentPage) && !isLogged()) {
    window.location.href = "index.html";
  }
});
