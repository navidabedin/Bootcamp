import { arabicaVariants, robustaVariants, blendRatios, weightOptions } from '../data/coffee-data.js';
import { state, getPrice, isReady } from '../modules/configurator.js';
import { addToCart, getCart, getCartTotal, removeFromCart } from '../modules/cart.js';

function formatPrice(n) { return n.toLocaleString('fa-IR'); }

// ===== Render Sections =====
function renderVariants(containerId, variants, stateKey) {
  const el = document.getElementById(containerId);
  el.innerHTML = variants.map(v => `
    <div class="variant-card ${state[stateKey]?.id === v.id ? 'variant-card--selected' : ''}"
         data-id="${v.id}" data-key="${stateKey}">
      <div class="variant-card__flag">${v.flag}</div>
      <div class="variant-card__name">${v.name}</div>
      <div class="variant-card__price">${formatPrice(v.pricePerKg)} ت/کیلو</div>
    </div>
  `).join('');
}

function renderBlendRatios() {
  const el = document.getElementById('blendRatios');
  el.innerHTML = blendRatios.map((r, i) => `
    <button class="blend-btn ${state.blend === r ? 'blend-btn--selected' : ''}" data-index="${i}">
      ${r.label}
    </button>
  `).join('');
}

function renderWeights() {
  const el = document.getElementById('weightOptions');
  el.innerHTML = weightOptions.map((w, i) => `
    <button class="weight-btn ${state.weight === w ? 'weight-btn--selected' : ''}" data-index="${i}">
      ${w.label}
    </button>
  `).join('');
}

function updateSummary() {
  document.getElementById('s-arabica').textContent = state.arabica ? `${state.arabica.flag} ${state.arabica.name}` : '—';
  document.getElementById('s-robusta').textContent = state.robusta ? `${state.robusta.flag} ${state.robusta.name}` : '—';
  document.getElementById('s-ratio').textContent = state.blend ? state.blend.label : '—';
  document.getElementById('s-form').textContent = state.form === 'bean' ? 'دانه' : 'پودر';
  document.getElementById('s-weight').textContent = state.weight ? state.weight.label : '—';
  document.getElementById('s-qty').textContent = state.quantity;

  const ready = isReady();
  const addBtn = document.getElementById('addToCartBtn');
  if (ready) {
    const price = getPrice();
    document.getElementById('s-price').textContent = formatPrice(price);
    addBtn.disabled = false;
  } else {
    document.getElementById('s-price').textContent = '—';
    addBtn.disabled = true;
  }
}

function rerender() {
  renderVariants('arabicaGrid', arabicaVariants, 'arabica');
  renderVariants('robustaGrid', robustaVariants, 'robusta');
  renderBlendRatios();
  renderWeights();
  updateSummary();
}

// ===== Event Delegation =====
document.getElementById('arabicaGrid').addEventListener('click', e => {
  const card = e.target.closest('.variant-card');
  if (!card) return;
  state.arabica = arabicaVariants.find(v => v.id === card.dataset.id);
  rerender();
});

document.getElementById('robustaGrid').addEventListener('click', e => {
  const card = e.target.closest('.variant-card');
  if (!card) return;
  state.robusta = robustaVariants.find(v => v.id === card.dataset.id);
  rerender();
});

document.getElementById('blendRatios').addEventListener('click', e => {
  const btn = e.target.closest('.blend-btn');
  if (!btn) return;
  state.blend = blendRatios[btn.dataset.index];
  rerender();
});

document.getElementById('weightOptions').addEventListener('click', e => {
  const btn = e.target.closest('.weight-btn');
  if (!btn) return;
  state.weight = weightOptions[btn.dataset.index];
  rerender();
});

document.querySelectorAll('input[name="form"]').forEach(radio => {
  radio.addEventListener('change', e => {
    state.form = e.target.value;
    updateSummary();
  });
});

document.getElementById('qtyMinus').addEventListener('click', () => {
  if (state.quantity > 1) { state.quantity--; document.getElementById('qtyInput').value = state.quantity; updateSummary(); }
});
document.getElementById('qtyPlus').addEventListener('click', () => {
  if (state.quantity < 99) { state.quantity++; document.getElementById('qtyInput').value = state.quantity; updateSummary(); }
});
document.getElementById('qtyInput').addEventListener('change', e => {
  const v = Math.min(99, Math.max(1, parseInt(e.target.value) || 1));
  state.quantity = v;
  e.target.value = v;
  updateSummary();
});

// ===== Add to Cart =====
document.getElementById('addToCartBtn').addEventListener('click', () => {
  if (!isReady()) return;
  const price = getPrice();
  addToCart({
    name: `${state.arabica.name} / ${state.robusta.name}`,
    detail: `${state.blend.label} | ${state.weight.label} | ${state.form === 'bean' ? 'دانه' : 'پودر'} | ×${state.quantity}`,
    price,
  });
  updateCartUI();
  openCart();
});

// ===== Cart UI =====
function updateCartUI() {
  const cart = getCart();
  document.getElementById('cartCount').textContent = cart.length;
  document.getElementById('cartTotal').textContent = formatPrice(getCartTotal());
  const itemsEl = document.getElementById('cartItems');
  if (!cart.length) { itemsEl.innerHTML = '<p class="cart-empty">سبد خرید خالی است</p>'; return; }
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

// ===== Init =====
rerender();
updateCartUI();
