/* ============================================================
   LUXETHREAD — Main JavaScript
   Handles: Cart state, product data, UI interactions, routing
   ============================================================ */

'use strict';

// ── Product Data (sample catalogue) ──────────────────────────
const PRODUCTS = [
  {
    id: 1,
    name: 'Milano Linen Blazer',
    origin: 'Italy',
    category: 'women',
    price: 289,
    oldPrice: 380,
    badge: 'New',
    rating: 4.8,
    reviews: 124,
    colors: ['#2C3E50', '#8B7355', '#E8E0D0'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4b4288?w=600&q=80',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80',
    ],
    description: 'Crafted from 100% Italian linen, this blazer embodies understated elegance. The relaxed silhouette drapes beautifully while maintaining a structured shoulder line. Perfect for transitioning from boardroom to evening.',
    features: ['100% Italian Linen', 'Unlined for breathability', 'Two front pockets', 'Dry clean recommended'],
  },
  {
    id: 2,
    name: 'Kyoto Silk Dress',
    origin: 'Japan',
    category: 'women',
    price: 345,
    oldPrice: null,
    badge: 'New',
    rating: 4.9,
    reviews: 89,
    colors: ['#C4714A', '#2C3E50', '#7A8C6E'],
    sizes: ['XS', 'S', 'M', 'L'],
    images: [
      'https://images.unsplash.com/photo-1566479179817-d61dc27c5c6a?w=600&q=80',
      'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=600&q=80',
    ],
    description: 'Woven from Habutai silk sourced from traditional Japanese mills, this dress moves with an ethereal fluidity. The wrap silhouette flatters every body type, making it an enduring wardrobe investment.',
    features: ['100% Japanese Habutai Silk', 'Adjustable wrap tie', 'Midi length', 'Dry clean only'],
  },
  {
    id: 3,
    name: 'Copenhagen Wool Coat',
    origin: 'Denmark',
    category: 'men',
    price: 520,
    oldPrice: 680,
    badge: 'Sale',
    rating: 4.7,
    reviews: 211,
    colors: ['#2C3E50', '#8B8B8B', '#6B4F3A'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?w=600&q=80',
      'https://images.unsplash.com/photo-1520975954732-35dd22299614?w=600&q=80',
    ],
    description: 'A masterclass in Scandinavian minimalism. This double-faced merino wool coat features clean lines, hidden button closure, and a generous silhouette. Ethically sourced from Danish sheep farms.',
    features: ['Double-faced Merino Wool', 'Hidden button closure', 'Interior chest pocket', 'Dry clean only'],
  },
  {
    id: 4,
    name: 'Marrakech Linen Shirt',
    origin: 'Morocco',
    category: 'men',
    price: 145,
    oldPrice: null,
    badge: null,
    rating: 4.6,
    reviews: 178,
    colors: ['#E8D5B7', '#C4714A', '#2C3E50'],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80',
      'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=600&q=80',
    ],
    description: 'Hand-woven by Moroccan artisans using traditional techniques passed down through generations. The breathable linen weave is perfect for warm climates, with subtle texture that improves with wear.',
    features: ['Artisan-woven Linen', 'Hand-stitched details', 'Relaxed fit', 'Machine washable'],
  },
  {
    id: 5,
    name: 'Barcelona Kids Parka',
    origin: 'Spain',
    category: 'kids',
    price: 189,
    oldPrice: 220,
    badge: 'Sale',
    rating: 4.8,
    reviews: 67,
    colors: ['#7A8C6E', '#C4714A', '#2C3E50'],
    sizes: ['4Y', '6Y', '8Y', '10Y', '12Y'],
    images: [
      'https://images.unsplash.com/photo-1503919544645-bd372a4e45e3?w=600&q=80',
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&q=80',
    ],
    description: 'Designed for active children who refuse to slow down. This water-resistant parka features a cozy recycled fill, adjustable hood, and reflective details for safety. Machine washable for easy care.',
    features: ['Recycled polyester fill', 'Water-resistant outer', 'Reflective safety details', 'Machine washable'],
  },
  {
    id: 6,
    name: 'Florence Leather Bag',
    origin: 'Italy',
    category: 'accessories',
    price: 420,
    oldPrice: null,
    badge: 'New',
    rating: 4.9,
    reviews: 43,
    colors: ['#6B4F3A', '#2C3E50', '#C4714A'],
    sizes: ['One Size'],
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&q=80',
    ],
    description: 'Handcrafted by third-generation Florentine leather artisans using vegetable-tanned cowhide. Each bag develops a unique patina over time, becoming more beautiful with age. A true heirloom piece.',
    features: ['Full-grain vegetable-tanned leather', 'Brass hardware', 'Interior suede lining', 'Handcrafted in Florence'],
  },
  {
    id: 7,
    name: 'Seoul Knit Cardigan',
    origin: 'South Korea',
    category: 'women',
    price: 198,
    oldPrice: 260,
    badge: 'Sale',
    rating: 4.7,
    reviews: 156,
    colors: ['#E8E0D0', '#7A8C6E', '#C4714A'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&q=80',
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=600&q=80',
    ],
    description: 'Knitted using a Korean heritage stitch pattern with sustainably sourced Merino wool. The oversized silhouette and chunky ribbing create a cozy, effortlessly chic look. Available in season-inspired colorways.',
    features: ['100% Merino Wool', 'Chunky heritage knit', 'Dropped shoulders', 'Hand wash cold'],
  },
  {
    id: 8,
    name: 'Tokyo Denim Jacket',
    origin: 'Japan',
    category: 'men',
    price: 265,
    oldPrice: null,
    badge: null,
    rating: 4.8,
    reviews: 203,
    colors: ['#2C3E50', '#4A6A8A', '#8B8B8B'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80',
      'https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?w=600&q=80',
    ],
    description: 'Selvedge denim woven on vintage shuttle looms in Okayama, Japan. Pre-washed for immediate comfort with natural fade patterns that develop uniquely based on how you wear it. A denim jacket for life.',
    features: ['Selvedge denim, 12oz', 'Bronze YKK zippers', 'YD selvage ID stitch', 'Cold wash, hang dry'],
  },
];

// ── Cart State ─────────────────────────────────────────────────
const cart = {
  items: JSON.parse(localStorage.getItem('lt_cart') || '[]'),

  save() {
    localStorage.setItem('lt_cart', JSON.stringify(this.items));
    this.updateBadge();
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  },

  add(productId, size, color, qty = 1) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;
    const key = `${productId}-${size}-${color}`;
    const existing = this.items.find(i => i.key === key);
    if (existing) {
      existing.qty += qty;
    } else {
      this.items.push({
        key, productId, size, color, qty,
        name: product.name,
        price: product.price,
        image: product.images[0],
        origin: product.origin,
      });
    }
    this.save();
    showToast(`✓ ${product.name} added to cart`, 'success');
  },

  remove(key) {
    this.items = this.items.filter(i => i.key !== key);
    this.save();
  },

  updateQty(key, qty) {
    const item = this.items.find(i => i.key === key);
    if (item) {
      item.qty = Math.max(1, qty);
      this.save();
    }
  },

  total() {
    return this.items.reduce((sum, i) => sum + i.price * i.qty, 0);
  },

  count() {
    return this.items.reduce((sum, i) => sum + i.qty, 0);
  },

  clear() {
    this.items = [];
    this.save();
  },

  updateBadge() {
    const badges = document.querySelectorAll('.cart-badge');
    const count = this.count();
    badges.forEach(b => {
      b.textContent = count;
      b.style.display = count > 0 ? 'flex' : 'none';
    });
  }
};

// ── User State ─────────────────────────────────────────────────
const user = {
  current: JSON.parse(localStorage.getItem('lt_user') || 'null'),

  login(email, name) {
    this.current = { email, name, orders: [] };
    localStorage.setItem('lt_user', JSON.stringify(this.current));
  },

  logout() {
    this.current = null;
    localStorage.removeItem('lt_user');
  },

  isLoggedIn() { return !!this.current; }
};

// ── Toast Notification ─────────────────────────────────────────
function showToast(message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = message;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'toastIn 0.3s reverse both';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ── Navbar ─────────────────────────────────────────────────────
function initNavbar() {
  // Sticky shadow
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    });
  }

  // Mobile menu
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileClose = document.querySelector('.mobile-nav-close');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => mobileNav.classList.add('open'));
    mobileClose?.addEventListener('click', () => mobileNav.classList.remove('open'));
  }

  // Cart badge
  cart.updateBadge();

  // Active link
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });
}

// ── Render Product Card ────────────────────────────────────────
function renderProductCard(product) {
  const stars = '★'.repeat(Math.round(product.rating)) + '☆'.repeat(5 - Math.round(product.rating));
  const badgeHtml = product.badge
    ? `<span class="product-badge ${product.badge === 'Sale' ? 'sale' : ''}">${product.badge}</span>`
    : '';
  const oldPriceHtml = product.oldPrice
    ? `<span class="product-price-old">$${product.oldPrice}</span>` : '';

  return `
    <div class="product-card" onclick="location.href='pages/product.html?id=${product.id}'">
      <div class="product-card-img">
        ${badgeHtml}
        <img src="${product.images[0]}" alt="${product.name}" loading="lazy">
        <div class="product-actions-overlay">
          <button class="product-action-btn" onclick="event.stopPropagation(); quickAddToCart(${product.id})">
            Quick Add
          </button>
          <button class="product-action-btn" onclick="event.stopPropagation(); location.href='pages/product.html?id=${product.id}'">
            View
          </button>
        </div>
      </div>
      <div class="product-card-body">
        <p class="product-origin">${product.origin}</p>
        <h3 class="product-name">${product.name}</h3>
        <div class="product-price-row">
          <span class="product-price">$${product.price}</span>
          ${oldPriceHtml}
        </div>
        <div class="product-rating">
          <span class="stars">${stars}</span>
          <span class="rating-count">(${product.reviews})</span>
        </div>
      </div>
    </div>`;
}

// ── Quick Add to Cart ─────────────────────────────────────────
function quickAddToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  cart.add(productId, product.sizes[1] || product.sizes[0], product.colors[0]);
}

// ── Home Page ──────────────────────────────────────────────────
function initHomePage() {
  // Featured products
  const grid = document.getElementById('featured-grid');
  if (grid) {
    const featured = PRODUCTS.slice(0, 8);
    grid.innerHTML = featured.map(renderProductCard).join('');
  }

  // Intersection Observer for animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.product-card, .cat-card, .testimonial-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// ── Shop Page ──────────────────────────────────────────────────
function initShopPage() {
  const params = new URLSearchParams(window.location.search);
  const category = params.get('category') || 'all';
  const grid = document.getElementById('shop-grid');
  const countEl = document.getElementById('product-count');
  let currentProducts = [...PRODUCTS];

  // Filter by category
  if (category !== 'all') {
    currentProducts = currentProducts.filter(p => p.category === category);
  }

  const renderGrid = (products) => {
    if (grid) {
      grid.innerHTML = products.map(renderProductCard).join('');
      if (countEl) countEl.textContent = `${products.length} Products`;
      initAnimations();
    }
  };

  // Category filter buttons
  document.querySelectorAll('.filter-item[data-category]').forEach(btn => {
    if (btn.dataset.category === category) btn.classList.add('active');
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-item[data-category]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.category;
      const filtered = cat === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.category === cat);
      renderGrid(filtered);
    });
  });

  // Sort
  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      const val = sortSelect.value;
      const sorted = [...currentProducts].sort((a, b) => {
        if (val === 'price-asc') return a.price - b.price;
        if (val === 'price-desc') return b.price - a.price;
        if (val === 'rating') return b.rating - a.rating;
        return 0;
      });
      renderGrid(sorted);
    });
  }

  // Price range
  const priceRange = document.getElementById('price-range');
  const priceDisplay = document.getElementById('price-display');
  if (priceRange) {
    priceRange.addEventListener('input', () => {
      const max = parseInt(priceRange.value);
      if (priceDisplay) priceDisplay.textContent = `$0 — $${max}`;
      const filtered = currentProducts.filter(p => p.price <= max);
      renderGrid(filtered);
    });
  }

  renderGrid(currentProducts);
}

// ── Product Page ───────────────────────────────────────────────
function initProductPage() {
  const params = new URLSearchParams(window.location.search);
  const productId = parseInt(params.get('id')) || 1;
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  // Populate meta
  document.title = `${product.name} — LuxeThread`;
  const nameEl = document.getElementById('product-name');
  if (nameEl) nameEl.textContent = product.name;
  const priceEl = document.getElementById('product-price');
  if (priceEl) priceEl.textContent = `$${product.price}`;
  const originEl = document.getElementById('product-origin');
  if (originEl) originEl.textContent = `🌍 From ${product.origin}`;
  const descEl = document.getElementById('product-description');
  if (descEl) descEl.textContent = product.description;

  // Old price
  if (product.oldPrice) {
    const oldEl = document.getElementById('product-old-price');
    if (oldEl) { oldEl.textContent = `$${product.oldPrice}`; oldEl.style.display = 'inline'; }
  }

  // Images
  const mainImg = document.getElementById('gallery-main-img');
  if (mainImg) mainImg.src = product.images[0];
  const thumbsEl = document.getElementById('gallery-thumbs');
  if (thumbsEl) {
    thumbsEl.innerHTML = product.images.map((img, i) => `
      <div class="gallery-thumb ${i === 0 ? 'active' : ''}" onclick="switchImage('${img}', this)">
        <img src="${img}" alt="${product.name} ${i + 1}">
      </div>`).join('');
  }

  // Colors
  const colorsEl = document.getElementById('color-options');
  let selectedColor = product.colors[0];
  if (colorsEl) {
    colorsEl.innerHTML = product.colors.map((c, i) => `
      <div class="color-swatch ${i === 0 ? 'active' : ''}"
           style="background:${c}"
           onclick="selectColor('${c}', this)"
           title="${c}"></div>`).join('');
  }

  // Sizes
  const sizesEl = document.getElementById('size-options');
  let selectedSize = product.sizes[1] || product.sizes[0];
  if (sizesEl) {
    sizesEl.innerHTML = product.sizes.map((s, i) => `
      <button class="size-btn ${i === 1 || i === 0 ? 'active' : ''}"
              onclick="selectSize('${s}', this)">${s}</button>`).join('');
  }

  // Features
  const featuresEl = document.getElementById('product-features');
  if (featuresEl && product.features) {
    featuresEl.innerHTML = product.features.map(f => `
      <div class="product-feature">
        <span class="product-feature-icon">✓</span>
        <span>${f}</span>
      </div>`).join('');
  }

  // Rating
  const ratingEl = document.getElementById('product-rating');
  if (ratingEl) {
    const stars = '★'.repeat(Math.round(product.rating)) + '☆'.repeat(5 - Math.round(product.rating));
    ratingEl.innerHTML = `<span class="stars">${stars}</span>
      <span style="font-size:13px;margin-left:6px;color:var(--charcoal-mid)">${product.rating} (${product.reviews} reviews)</span>`;
  }

  // Add to cart
  const addBtn = document.getElementById('add-to-cart');
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      const qtyInput = document.getElementById('qty-input');
      const qty = parseInt(qtyInput?.value || 1);
      cart.add(productId, selectedSize, selectedColor, qty);
    });
  }

  // Wishlist
  const wishBtn = document.getElementById('wishlist-btn');
  if (wishBtn) {
    wishBtn.addEventListener('click', () => {
      showToast('♡ Added to wishlist');
    });
  }

  // Related products
  const relatedGrid = document.getElementById('related-grid');
  if (relatedGrid) {
    const related = PRODUCTS.filter(p => p.id !== productId && p.category === product.category).slice(0, 4);
    relatedGrid.innerHTML = related.map(renderProductCard).join('');
  }

  // Breadcrumb
  const breadcrumbProduct = document.getElementById('breadcrumb-product');
  if (breadcrumbProduct) breadcrumbProduct.textContent = product.name;

  // Qty controls
  const qtyInput = document.getElementById('qty-input');
  document.getElementById('qty-minus')?.addEventListener('click', () => {
    if (qtyInput && parseInt(qtyInput.value) > 1) qtyInput.value = parseInt(qtyInput.value) - 1;
  });
  document.getElementById('qty-plus')?.addEventListener('click', () => {
    if (qtyInput) qtyInput.value = parseInt(qtyInput.value) + 1;
  });

  // Tabs
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(btn.dataset.tab)?.classList.add('active');
    });
  });
}

function switchImage(src, el) {
  const mainImg = document.getElementById('gallery-main-img');
  if (mainImg) mainImg.src = src;
  document.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active'));
  el?.classList.add('active');
}

function selectColor(color, el) {
  document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
  el?.classList.add('active');
  window._selectedColor = color;
}

function selectSize(size, el) {
  document.querySelectorAll('.size-btn').forEach(s => s.classList.remove('active'));
  el?.classList.add('active');
  window._selectedSize = size;
}

// ── Cart Page ──────────────────────────────────────────────────
function initCartPage() {
  const renderCart = () => {
    const tbody = document.getElementById('cart-items');
    const emptyEl = document.getElementById('cart-empty');
    const tableEl = document.getElementById('cart-table');

    if (cart.items.length === 0) {
      if (emptyEl) emptyEl.style.display = 'block';
      if (tableEl) tableEl.style.display = 'none';
      return;
    }

    if (emptyEl) emptyEl.style.display = 'none';
    if (tableEl) tableEl.style.display = 'table';

    if (tbody) {
      tbody.innerHTML = cart.items.map(item => `
        <tr>
          <td>
            <div class="cart-item-info">
              <img class="cart-item-img" src="${item.image}" alt="${item.name}">
              <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-meta">Size: ${item.size} &nbsp;|&nbsp; Origin: ${item.origin}</div>
                <div class="cart-item-remove" onclick="removeItem('${item.key}')">Remove</div>
              </div>
            </div>
          </td>
          <td>$${item.price}</td>
          <td>
            <div class="qty-control" style="display:inline-flex">
              <button class="qty-btn" onclick="changeQty('${item.key}', ${item.qty - 1})">−</button>
              <input class="qty-input" type="number" value="${item.qty}" min="1" style="width:44px"
                     onchange="changeQty('${item.key}', parseInt(this.value))">
              <button class="qty-btn" onclick="changeQty('${item.key}', ${item.qty + 1})">+</button>
            </div>
          </td>
          <td>$${(item.price * item.qty).toFixed(2)}</td>
        </tr>`).join('');
    }

    // Summary
    const subtotal = cart.total();
    const shipping = subtotal > 200 ? 0 : 15;
    const total = subtotal + shipping;

    document.getElementById('cart-subtotal')?.textContent && (document.getElementById('cart-subtotal').textContent = `$${subtotal.toFixed(2)}`);
    document.getElementById('cart-shipping')?.textContent && (document.getElementById('cart-shipping').textContent = shipping === 0 ? 'Free' : `$${shipping}`);
    document.getElementById('cart-total')?.textContent && (document.getElementById('cart-total').textContent = `$${total.toFixed(2)}`);
  };

  window.removeItem = (key) => { cart.remove(key); renderCart(); };
  window.changeQty = (key, qty) => { if (qty < 1) { cart.remove(key); } else { cart.updateQty(key, qty); } renderCart(); };

  renderCart();
  window.addEventListener('cartUpdated', renderCart);
}

// ── Checkout Page ──────────────────────────────────────────────
function initCheckoutPage() {
  // Mini cart
  const miniCart = document.getElementById('mini-cart-items');
  if (miniCart) {
    miniCart.innerHTML = cart.items.map(item => `
      <div class="mini-cart-item">
        <img class="mini-cart-img" src="${item.image}" alt="${item.name}">
        <div>
          <div class="mini-cart-name">${item.name}</div>
          <div class="mini-cart-meta">Size: ${item.size} · Qty: ${item.qty}</div>
        </div>
        <div class="mini-cart-price">$${(item.price * item.qty).toFixed(2)}</div>
      </div>`).join('');
  }

  const subtotal = cart.total();
  const shipping = subtotal > 200 ? 0 : 15;
  document.getElementById('checkout-subtotal')?.textContent && (document.getElementById('checkout-subtotal').textContent = `$${subtotal.toFixed(2)}`);
  document.getElementById('checkout-shipping')?.textContent && (document.getElementById('checkout-shipping').textContent = shipping === 0 ? 'Free' : `$${shipping}`);
  document.getElementById('checkout-total')?.textContent && (document.getElementById('checkout-total').textContent = `$${(subtotal + shipping).toFixed(2)}`);

  // Payment methods
  document.querySelectorAll('.payment-method').forEach(m => {
    m.addEventListener('click', () => {
      document.querySelectorAll('.payment-method').forEach(x => x.classList.remove('selected'));
      m.classList.add('selected');
      m.querySelector('input[type=radio]').checked = true;

      // Show/hide card fields
      const cardFields = document.getElementById('card-fields');
      const paypalNote = document.getElementById('paypal-note');
      const method = m.dataset.method;
      if (cardFields) cardFields.style.display = (method === 'card') ? 'grid' : 'none';
      if (paypalNote) paypalNote.style.display = (method === 'paypal') ? 'block' : 'none';
    });
  });

  // Place order
  const placeOrderBtn = document.getElementById('place-order');
  if (placeOrderBtn) {
    placeOrderBtn.addEventListener('click', () => {
      // Validate form
      const required = document.querySelectorAll('.form-input[required]');
      let valid = true;
      required.forEach(input => {
        if (!input.value.trim()) {
          input.style.borderColor = '#E53935';
          valid = false;
        } else {
          input.style.borderColor = '';
        }
      });
      if (!valid) {
        showToast('Please fill in all required fields', 'error');
        return;
      }

      placeOrderBtn.textContent = 'Processing…';
      placeOrderBtn.disabled = true;

      // Simulate API call
      setTimeout(() => {
        const orderId = 'LT-' + Math.random().toString(36).substr(2, 8).toUpperCase();
        localStorage.setItem('lt_last_order', orderId);
        cart.clear();
        window.location.href = 'confirmation.html?order=' + orderId;
      }, 1800);
    });
  }
}

// ── Confirmation Page ──────────────────────────────────────────
function initConfirmationPage() {
  const params = new URLSearchParams(window.location.search);
  const orderId = params.get('order') || localStorage.getItem('lt_last_order') || 'LT-XXXXXXXX';
  const orderIdEl = document.getElementById('order-id');
  if (orderIdEl) orderIdEl.textContent = `Order #${orderId}`;
}

// ── Auth Page ──────────────────────────────────────────────────
function initAuthPage() {
  const loginTab = document.getElementById('login-tab');
  const registerTab = document.getElementById('register-tab');
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');

  loginTab?.addEventListener('click', () => {
    loginTab.classList.add('active'); registerTab?.classList.remove('active');
    loginForm?.classList.add('active'); registerForm?.classList.remove('active');
  });

  registerTab?.addEventListener('click', () => {
    registerTab.classList.add('active'); loginTab?.classList.remove('active');
    registerForm?.classList.add('active'); loginForm?.classList.remove('active');
  });

  // Login
  document.getElementById('do-login')?.addEventListener('click', () => {
    const email = document.getElementById('login-email')?.value;
    const pass = document.getElementById('login-pass')?.value;
    if (!email || !pass) { showToast('Please enter email and password', 'error'); return; }
    user.login(email, email.split('@')[0]);
    showToast('✓ Welcome back!', 'success');
    setTimeout(() => location.href = 'pages/dashboard.html', 1000);
  });

  // Register
  document.getElementById('do-register')?.addEventListener('click', () => {
    const email = document.getElementById('reg-email')?.value;
    const pass = document.getElementById('reg-pass')?.value;
    const name = document.getElementById('reg-name')?.value;
    if (!email || !pass || !name) { showToast('Please fill all fields', 'error'); return; }
    user.login(email, name);
    showToast('✓ Account created! Welcome to LuxeThread', 'success');
    setTimeout(() => location.href = 'pages/dashboard.html', 1000);
  });
}

// ── Dashboard Page ─────────────────────────────────────────────
function initDashboardPage() {
  const nameEl = document.getElementById('user-greeting');
  if (nameEl && user.current) nameEl.textContent = `Hello, ${user.current.name}`;

  // Sample orders
  const ordersTable = document.getElementById('orders-table');
  const sampleOrders = [
    { id: 'LT-A4KX89', date: 'Mar 10, 2026', items: 2, total: '$634', status: 'delivered' },
    { id: 'LT-B7YZ12', date: 'Mar 01, 2026', items: 1, total: '$289', status: 'shipped' },
    { id: 'LT-C3WQ45', date: 'Feb 18, 2026', items: 3, total: '$803', status: 'processing' },
  ];
  if (ordersTable) {
    ordersTable.innerHTML = sampleOrders.map(o => `
      <tr>
        <td>${o.id}</td>
        <td>${o.date}</td>
        <td>${o.items} item${o.items > 1 ? 's' : ''}</td>
        <td>${o.total}</td>
        <td><span class="order-status ${o.status}">${o.status.charAt(0).toUpperCase() + o.status.slice(1)}</span></td>
        <td><a href="#" style="color:var(--terra);font-size:12px">Track</a></td>
      </tr>`).join('');
  }
}

// ── Admin Page ─────────────────────────────────────────────────
function initAdminPage() {
  const productsTable = document.getElementById('admin-products-table');
  if (productsTable) {
    productsTable.innerHTML = PRODUCTS.map(p => `
      <tr>
        <td>${p.id}</td>
        <td>
          <div style="display:flex;align-items:center;gap:10px">
            <img src="${p.images[0]}" style="width:44px;height:56px;object-fit:cover;border-radius:4px">
            ${p.name}
          </div>
        </td>
        <td>${p.category.charAt(0).toUpperCase() + p.category.slice(1)}</td>
        <td>$${p.price}</td>
        <td><span class="order-status delivered">Active</span></td>
        <td>
          <div style="display:flex;gap:6px">
            <button class="admin-action-btn edit">Edit</button>
            <button class="admin-action-btn delete">Delete</button>
          </div>
        </td>
      </tr>`).join('');
  }

  const ordersTable = document.getElementById('admin-orders-table');
  const adminOrders = [
    { id: 'LT-A4KX89', customer: 'Sophie Laurent', date: 'Mar 10', total: '$634', status: 'delivered' },
    { id: 'LT-B7YZ12', customer: 'James Chen', date: 'Mar 09', total: '$289', status: 'shipped' },
    { id: 'LT-C3WQ45', customer: 'Maria Santos', date: 'Mar 08', total: '$803', status: 'processing' },
    { id: 'LT-D9PL33', customer: 'Amir Hosseini', date: 'Mar 07', total: '$420', status: 'processing' },
    { id: 'LT-E2MN77', customer: 'Chloe Martin', date: 'Mar 06', total: '$345', status: 'delivered' },
  ];
  if (ordersTable) {
    ordersTable.innerHTML = adminOrders.map(o => `
      <tr>
        <td>${o.id}</td>
        <td>${o.customer}</td>
        <td>${o.date}</td>
        <td>${o.total}</td>
        <td>
          <select class="sort-select" style="padding:6px 10px;font-size:11px" onchange="updateOrderStatus('${o.id}', this.value)">
            <option ${o.status === 'processing' ? 'selected' : ''}>processing</option>
            <option ${o.status === 'shipped' ? 'selected' : ''}>shipped</option>
            <option ${o.status === 'delivered' ? 'selected' : ''}>delivered</option>
          </select>
        </td>
      </tr>`).join('');
  }
}

window.updateOrderStatus = (id, status) => {
  showToast(`Order ${id} updated to ${status}`, 'success');
};

// ── Animations ─────────────────────────────────────────────────
function initAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.product-card, .cat-card, .testimonial-card, .dashboard-card').forEach(el => {
    if (el.style.opacity !== '1') {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(el);
    }
  });
}

// ── Newsletter Form ────────────────────────────────────────────
function initNewsletter() {
  const form = document.querySelector('.newsletter-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('.newsletter-input');
      if (input?.value) {
        showToast('✓ You\'re subscribed! Welcome to LuxeThread.');
        input.value = '';
      }
    });
  }
}

// ── Bootstrap on DOM Ready ────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initNewsletter();

  // Route-based init
  const page = window.location.pathname.split('/').pop() || 'index.html';

  if (page === 'index.html' || page === '' || page === '/') initHomePage();
  if (page === 'shop.html') initShopPage();
  if (page === 'product.html') initProductPage();
  if (page === 'cart.html') initCartPage();
  if (page === 'checkout.html') initCheckoutPage();
  if (page === 'confirmation.html') initConfirmationPage();
  if (page === 'auth.html') initAuthPage();
  if (page === 'dashboard.html') initDashboardPage();
  if (page === 'admin.html') initAdminPage();

  // General animations
  setTimeout(initAnimations, 100);
});
