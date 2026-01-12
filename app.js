/* ===============================
   CULTIVO VIRTUAL – APP CORE
   =============================== */

/* ====== LOGOUT ====== */
function cvLogout() {
  localStorage.removeItem("cv_logged");
  localStorage.removeItem("cv_user");
  window.location.href = "login.html";
}

/* ====== INICIO APP ====== */
document.addEventListener("DOMContentLoaded", () => {
  // 🔐 PROTECCIÓN SOLO EN INDEX
  if (!localStorage.getItem("cv_logged")) {
    window.location.href = "login.html";
    return;
  }

  const buttons = document.querySelectorAll(".sidebar button[data-page]");
  const content = document.getElementById("app-content");

  if (!content) {
    console.error("No se encontró #app-content");
    return;
  }

  // Cargar dashboard por defecto
  loadPage("pages/dashboard.html");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      loadPage("pages/" + btn.dataset.page);
    });
  });
});

/* ====== CARGA DE PÁGINAS ====== */
function loadPage(page) {
  const content = document.getElementById("app-content");

  fetch(page)
    .then(res => {
      if (!res.ok) throw new Error("No se pudo cargar " + page);
      return res.text();
    })
    .then(html => {
      content.innerHTML = html;
      initPage(page);
    })
    .catch(err => {
      content.innerHTML = `
        <h2>Error cargando sección</h2>
        <p>${page}</p>
        <pre>${err.message}</pre>
      `;
    });
}

/* ====== INICIALIZADORES ====== */
function initPage(page) {
  switch (page) {
    case "pages/dashboard.html":
      if (window.initDashboard) initDashboard();
      break;
    case "pages/foro.html":
      if (window.initForo) initForo();
      break;
    case "pages/gtl.html":
      if (window.initGTL) initGTL();
      break;
    case "pages/micultivo.html":
      if (window.initMiCultivo) initMiCultivo();
      break;
    case "pages/pedidos.html":
      if (window.initPedidos) initPedidos();
      break;
    case "pages/novedades.html":
      if (window.initNovedades) initNovedades();
      break;
    case "pages/perfil.html":
      if (window.initPerfil) initPerfil();
      break;
  }
}

