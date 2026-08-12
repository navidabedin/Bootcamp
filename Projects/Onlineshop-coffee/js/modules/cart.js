const CART_KEY = 'coffee_cart';

export function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function addToCart(item) {
  const cart = getCart();
  cart.push({ ...item, id: Date.now() });
  saveCart(cart);
}

export function removeFromCart(id) {
  saveCart(getCart().filter(i => i.id !== id));
}

export function getCartTotal() {
  return getCart().reduce((sum, i) => sum + i.price, 0);
}
