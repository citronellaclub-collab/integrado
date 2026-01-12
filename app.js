/* =========================================================
   app.js
   Núcleo de la aplicación Cultivo Virtual
   - Maneja login simple
   - Carga dinámica de secciones
   - Controla navegación por sidebar
========================================================= */

/* ---------- CONFIGURACIÓN ---------- */

const APP = {
  defaultPage: "dashboard.html",
  pages: {
    dashboard: "dashboard.html",
    foro: "foro.html",
    gtl: "gtl.html",
    micultivo: "micultivo.html",
    pedidos: "pedidos.html",
    novedades: "novedades.html",
    perfil: "perfil.html",
    ayuda: "ayuda.html"
  }
};

/* ---------- ESTADO ---------- */

const state = {
  logged: localStorage.getItem("cv_logged") === "true"
};

/* ---------- INICIO ---------- */

document.addEventListener("DOMContentLoaded", () => {
  if (isLoginPage()) return;

  if (!state.logged) {
    redirectToLogin();
    return;
  }

  initSidebar();
  loadPage(APP.defaultPage);
});

/* ---------- LOGIN ---------- */

function login() {
  // Login libre (demo)
  localStorage.setItem("cv_logged", "true");
  window.location.href = "index.html";
}

function logout() {
  localStorage.removeItem("cv_logged");
  window.location.href = "login.html";
}

function redirectToLogin() {
  window.location.href = "login.html";
}

function isLoginPage() {
  return window.location.pathname.includes("login.html");
}

/* ---------- SIDEBAR ---------- */

function initSidebar() {
  document.querySelectorAll("[data-page]").forEach(btn => {
    btn.addEventListener("click", () => {
      const page = btn.getAttribute("data-page");
      loadPage(page);
      setActive(btn);
    });
  });
}

function setActive(activeBtn) {
  document.querySelectorAll("[data-page]").forEach(btn => {
    btn.classList.remove("active");
  });
  activeBtn.classList.add("active");
}

/* ---------- CARGA DE SECCIONES ---------- */

function loadPage(page) {
  const container = document.getElementById("app-content");

  if (!container) {
    console.error("❌ Falta el contenedor #app-content en index.html");
    return;
  }

  fetch(page)
    .then(res => {
      if (!res.ok) throw new Error("No se pudo cargar " + page);
      return res.text();
    })
    .then(html => {
      container.innerHTML = html;
      loadPageScript(page);
    })
    .catch(err => {
      container.innerHTML = `
        <div style="padding:20px;color:red">
          Error cargando la sección.<br>${err.message}
        </div>`;
    });
}

/* ---------- JS ASOCIADOS A CADA HTML ---------- */

function loadPageScript(page) {
  const scripts = {
    "dashboard.html": "dashboard.js",
    "foro.html": "foro.js",
    "gtl.html": "catalogo.js",
    "micultivo.html": "micultivo.js",
    "pedidos.html": "pedidos.js",
    "novedades.html": "novedades.js",
    "perfil.html": "perfil.js"
  };

  const src = scripts[page];
  if (!src) return;

  const old = document.getElementById("page-script");
  if (old) old.remove();

  const s = document.createElement("script");
  s.src = src;
  s.id = "page-script";
  s.defer = true;
  document.body.appendChild(s);
}

/* ---------- EXPONER FUNCIONES GLOBALES ---------- */

window.cvLogin = login;
window.cvLogout = logout;
window.cvLoad = loadPage;
