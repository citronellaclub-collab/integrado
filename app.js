// ===============================
// LOGIN DEMO
// ===============================
function login(event) {
  event.preventDefault();
  localStorage.setItem("logged", "true");
  window.location.href = "dashboard.html";
}

// ===============================
// LOGOUT
// ===============================
function logout() {
  localStorage.removeItem("logged");
  window.location.href = "login.html";
}

// ===============================
// PROTECCIÓN DE PÁGINAS
// ===============================
function checkAuth() {
  const logged = localStorage.getItem("logged");
  if (!logged) {
    window.location.href = "login.html";
  }
}

// ===============================
// EJECUCIÓN AUTOMÁTICA
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  if (document.body.dataset.protected === "true") {
    checkAuth();
  }
});
