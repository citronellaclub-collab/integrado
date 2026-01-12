/* ===============================
   state.js
   Estado global de la aplicación
   =============================== */

/*
  Este objeto representa el estado actual del sistema.
  Toda la app lee y modifica estos datos.
*/
const state = {
  user: null,        // Usuario logueado
  tokens: 0,         // Tokens disponibles
  cart: [],          // Carrito de pedidos
  plants: []         // Plantas activas (cultivo)
};

/* ===============================
   USUARIO
   =============================== */

/**
 * Establece el usuario actual
 * @param {object} userData
 */
function setUser(userData) {
  state.user = userData;
  saveState();
}

/**
 * Cierra sesión
 */
function logoutUser() {
  state.user = null;
  saveState();
}

/* ===============================
   TOKENS
   =============================== */

/**
 * Agrega tokens al usuario
 * @param {number} amount
 */
function addTokens(amount) {
  if (amount <= 0) return;
  state.tokens += amount;
  updateTokenUI();
  saveState();
}

/**
 * Resta tokens si hay saldo suficiente
 * @param {number} amount
 * @returns {boolean}
 */
function spendTokens(amount) {
  if (state.tokens < amount) {
    alert("Tokens insuficientes");
    return false;
  }
  state.tokens -= amount;
  updateTokenUI();
  saveState();
  return true;
}

/**
 * Actualiza el contador visual de tokens
 */
function updateTokenUI() {
  const el = document.getElementById("tokenCounter");
  if (el) {
    el.innerText = `${state.tokens} 🟢`;
  }
}

/* ===============================
   CARRITO
   =============================== */

/**
 * Agrega un item al carrito
 * @param {object} item
 * item = { id, name, price, quantity }
 */
function addToCart(item) {
  const existing = state.cart.find(i => i.id === item.id);

  if (existing) {
    existing.quantity += item.quantity;
  } else {
    state.cart.push(item);
  }

  updateCartUI();
  saveState();
}

/**
 * Elimina un item del carrito
 * @param {string} id
 */
function removeFromCart(id) {
  state.cart = state.cart.filter(i => i.id !== id);
  updateCartUI();
  saveState();
}

/**
 * Vacía el carrito
 */
function clearCart() {
  state.cart = [];
  updateCartUI();
  saveState();
}

/**
 * Retorna el total de items
 */
function getCartCount() {
  return state.cart.reduce((sum, item) => sum + item.quantity, 0);
}

/**
 * Retorna el costo total en tokens
 */
function getCartTotal() {
  return state.cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
}

/**
 * Actualiza el contador visual del carrito
 */
function updateCartUI() {
  const el = document.getElementById("cartCounter");
  if (el) {
    el.innerText = getCartCount();
  }
}

/* ===============================
   CULTIVO
   =============================== */

/**
 * Agrega una planta
 * @param {object} plant
 */
function addPlant(plant) {
  state.plants.push(plant);
  saveState();
}

/**
 * Elimina una planta
 * @param {string} id
 */
function removePlant(id) {
  state.plants = state.plants.filter(p => p.id !== id);
  saveState();
}

/* ===============================
   PERSISTENCIA (FRONTEND)
   =============================== */

/**
 * Guarda el estado en localStorage
 * (temporal hasta tener backend)
 */
function saveState() {
  localStorage.setItem("cultivo_state", JSON.stringify(state));
}

/**
 * Carga el estado guardado
 */
function loadState() {
  const saved = localStorage.getItem("cultivo_state");
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      Object.assign(state, parsed);
    } catch (e) {
      console.error("Error cargando estado", e);
    }
  }
  updateTokenUI();
  updateCartUI();
}

/* ===============================
   INICIALIZACIÓN
   =============================== */

document.addEventListener("DOMContentLoaded", () => {
  loadState();
});
