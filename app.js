/* ===============================
   app.js
   Motor principal de navegación
   =============================== */

/**
 * Carga una página HTML dentro del contenedor principal
 * @param {string} page - nombre del archivo sin .html
 * Ejemplo: loadPage("dashboard")
 */
function loadPage(page) {
  fetch(`pages/${page}.html`)
    .then(response => {
      if (!response.ok) {
        throw new Error("No se pudo cargar la página: " + page);
      }
      return response.text();
    })
    .then(html => {
      const content = document.getElementById("content");
      if (!content) {
        console.error("No existe el contenedor #content en index.html");
        return;
      }

      // Insertar el HTML de la página
      content.innerHTML = html;

      // Ejecutar función Init si existe (dashboardInit, perfilInit, etc.)
      const initFunctionName = page + "Init";
      if (typeof window[initFunctionName] === "function") {
        window[initFunctionName]();
      }
    })
    .catch(error => {
      console.error(error);
      document.getElementById("content").innerHTML = `
        <section style="padding:20px">
          <h2>Error</h2>
          <p>No se pudo cargar la sección solicitada.</p>
        </section>
      `;
    });
}

/**
 * Carga la página inicial del sistema
 * Se puede cambiar por dashboard, login, etc.
 */
function loadInitialPage() {
  loadPage("dashboard");
}

/* ===============================
   Inicialización general
   =============================== */

document.addEventListener("DOMContentLoaded", () => {
  loadInitialPage();
});
