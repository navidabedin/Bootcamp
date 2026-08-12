import { arabicaVariants, robustaVariants } from '../data/coffee-data.js';
import { addToCart, getCart, getCartTotal, removeFromCart } from '../modules/cart.js';

const allProducts = [
  ...arabicaVariants.map(v => ({ ...v, type: 'arabica', typeLabel: 'عربیکا' })),
  ...robustaVariants.map(v => ({ ...v, type: 'robusta', typeLabel: 'روبوستا' })),
];

let currentFilter = 'all';

function formatPrice(n) {
  return n.toLocaleString('fa-IR');
}

function renderGrid() {
  const grid = document.getElementById('catalogGrid');
  const items = currentFilter === 'all' ? allProducts : allProducts.filter(p => p.type === currentFilter);
  grid.innerHTML = items.map(p => `
    <article class="product-card" data-id="${p.id}">
      <div class="product-card__img">☕</div>
      <div class="product-card__body">
        <span class="product-card__type">${p.typeLabel}</span>
        <h3 class="product-card__name">${p.name}</h3>
        <p class="product-card__origin">📍 ${p.origin}</p>
        <p class="product-card__desc">${p.desc}</p>
        <p class="product-card__price">${formatPrice(p.pricePerKg)} تومان / کیلو</p>
      </div>
      <div class="product-card__footer">
        <a href="configurator.html" class="btn btn--outline">ترکیب اختصاصی</a>
        <button class="btn btn--primary" data-add="${p.id}">افزودن به سبد</button>
      </div>
    </article>
  `).join('');
}

function updateCartUI() {
  const cart = getCart();
  document.getElementById('cartCount').textContent = cart.length;
  document.getElementById('cartTotal').textContent = formatPrice(getCartTotal());
  const itemsEl = document.getElementById('cartItems');
  if (!cart.length) {
    itemsEl.innerHTML = '<p class="cart-empty">سبد خرید خالی است</p>';
    return;
  }
  itemsEl.innerHTML = cart.map(i => `
    <div class="cart-item">
      <div class="cart-item__info">
        <p class="cart-item__name">${i.name}</p>
        <p class="cart-item__detail">${i.detail || ''}</p>
        <button class="cart-item__remove" data-remove="${i.id}">حذف</button>
      </div>
      <span class="cart-item__price">${formatPrice(i.price)}</span>
    </div>
  `).join('');
}

function openCart() {
  document.getElementById('cartSidebar').classList.add('cart-sidebar--open');
  document.getElementById('overlay').classList.add('overlay--visible');
  document.getElementById('cartSidebar').setAttribute('aria-hidden', 'false');
}

function closeCart() {
  document.getElementById('cartSidebar').classList.remove('cart-sidebar--open');
  document.getElementById('overlay').classList.remove('overlay--visible');
  document.getElementById('cartSidebar').setAttribute('aria-hidden', 'true');
}

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('filter-btn--active'));
    btn.classList.add('filter-btn--active');
    currentFilter = btn.dataset.filter;
    renderGrid();
  });
});

document.getElementById('catalogGrid').addEventListener('click', e => {
  const addId = e.target.dataset.add;
  if (!addId) return;
  const product = allProducts.find(p => p.id === addId);
  if (!product) return;
  addToCart({ name: product.name, detail: product.typeLabel, price: product.pricePerKg });
  updateCartUI();
  openCart();
});

document.getElementById('cartBtn').addEventListener('click', openCart);
document.getElementById('cartClose').addEventListener('click', closeCart);
document.getElementById('overlay').addEventListener('click', closeCart);

document.getElementById('cartItems').addEventListener('click', e => {
  const removeId = e.target.dataset.remove;
  if (!removeId) return;
  removeFromCart(Number(removeId));
  updateCartUI();
});

document.getElementById('checkoutBtn').addEventListener('click', () => {
  alert('سفارش ثبت شد! ✅');
  localStorage.removeItem('coffee_cart');
  updateCartUI();
  closeCart();
});

renderGrid();
updateCartUI();
