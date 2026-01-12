/* ===============================
   CULTIVO VIRTUAL – APP CORE
   =============================== */

/* ====== CONTROL DE SESIÓN ====== */
(function checkLogin() {
  if (!localStorage.getItem("cv_logged")) {
    // Evita loop si ya estamos en login
    if (!location.pathname.endsWith("login.html")) {
      window.location.href = "login.html";
    }
  }
})();

/* ====== LOGOUT ====== */
function cvLogout() {
  localStorage.removeItem("cv_logged");
  localStorage.removeItem("cv_user");
  window.location.href = "login.html";
}

/* ====== CARGA DE PÁGINAS ====== */
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".sidebar button[data-page]");
  const content = document.getElementById("app-content");

  if (!content) {
    console.error("No se encontró #app-content");
    return;
  }

  // Cargar dashboard por defecto
  loadPage("dashboard.html");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      loadPage(btn.dataset.page);
    });
  });
});

/* ====== FUNCIÓN DE CARGA ====== */
function loadPage(page) {
  const content = document.getElementById("app-content");

  fetch(page)
    .then(res => {
      if (!res.ok) throw new Error("No se pudo cargar " + page);
      return res.text();
    })
    .then(html => {
      content.innerHTML = html;

      // Inicializadores por página
      initPage(page);
    })
    .catch(err => {
      content.innerHTML = `
        <h2>Error</h2>
        <p>No se pudo cargar la sección.</p>
        <pre>${err.message}</pre>
      `;
    });
}

/* ====== INICIALIZADORES ====== */
function initPage(page) {
  switch (page) {
    case "dashboard.html":
      if (typeof initDashboard === "function") initDashboard();
      break;

    case "foro.html":
      if (typeof initForo === "function") initForo();
      break;

    case "gtl.html":
      if (typeof initGTL === "function") initGTL();
      break;

    case "micultivo.html":
      if (typeof initMiCultivo === "function") initMiCultivo();
      break;

    case "pedidos.html":
      if (typeof initPedidos === "function") initPedidos();
      break;

    case "novedades.html":
      if (typeof initNovedades === "function") initNovedades();
      break;

    case "perfil.html":
      if (typeof initPerfil === "function") initPerfil();
      break;

    default:
      // páginas simples (ayuda, términos, etc.)
      break;
  }
}
