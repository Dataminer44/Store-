/**
 * LuxeThread — Express.js Backend
 * 
 * API endpoints for products, orders, users, and admin.
 * Run: npm install && node server.js
 * Serves static frontend + REST API on port 3000.
 */

const express = require('express');
const path    = require('path');
const crypto  = require('crypto');

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ────────────────────────────────────────────────
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// CORS for development
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  next();
});

// ── In-Memory Data Store (replace with DB in production) ─────
let products = [
  { id: 1, name: 'Milano Linen Blazer', origin: 'Italy', category: 'women', price: 289, oldPrice: 380, badge: 'New', rating: 4.8, reviews: 124, stock: 45, image: 'https://images.unsplash.com/photo-1594938298603-c8148c4b4288?w=600&q=80' },
  { id: 2, name: 'Kyoto Silk Dress', origin: 'Japan', category: 'women', price: 345, oldPrice: null, badge: 'New', rating: 4.9, reviews: 89, stock: 30, image: 'https://images.unsplash.com/photo-1566479179817-d61dc27c5c6a?w=600&q=80' },
  { id: 3, name: 'Copenhagen Wool Coat', origin: 'Denmark', category: 'men', price: 520, oldPrice: 680, badge: 'Sale', rating: 4.7, reviews: 211, stock: 18, image: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=600&q=80' },
  { id: 4, name: 'Marrakech Linen Shirt', origin: 'Morocco', category: 'men', price: 145, oldPrice: null, badge: null, rating: 4.6, reviews: 178, stock: 62, image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80' },
  { id: 5, name: 'Barcelona Kids Parka', origin: 'Spain', category: 'kids', price: 189, oldPrice: 220, badge: 'Sale', rating: 4.8, reviews: 67, stock: 25, image: 'https://images.unsplash.com/photo-1503919544645-bd372a4e45e3?w=600&q=80' },
  { id: 6, name: 'Florence Leather Bag', origin: 'Italy', category: 'accessories', price: 420, oldPrice: null, badge: 'New', rating: 4.9, reviews: 43, stock: 15, image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80' },
  { id: 7, name: 'Seoul Knit Cardigan', origin: 'South Korea', category: 'women', price: 198, oldPrice: 260, badge: 'Sale', rating: 4.7, reviews: 156, stock: 38, image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&q=80' },
  { id: 8, name: 'Tokyo Denim Jacket', origin: 'Japan', category: 'men', price: 265, oldPrice: null, badge: null, rating: 4.8, reviews: 203, stock: 41, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80' },
];

let orders = [
  { id: 'LT-A4KX89', customerId: 1, customer: 'Sophie Laurent', email: 'sophie@example.com', items: [{productId: 1, qty: 1, price: 289}], total: 289, status: 'delivered', date: '2026-03-10' },
  { id: 'LT-B7YZ12', customerId: 2, customer: 'James Chen', email: 'james@example.com', items: [{productId: 3, qty: 1, price: 520}], total: 520, status: 'shipped', date: '2026-03-09' },
  { id: 'LT-C3WQ45', customerId: 3, customer: 'Maria Santos', email: 'maria@example.com', items: [{productId: 2, qty: 1, price: 345},{productId: 6, qty: 1, price: 420}], total: 765, status: 'processing', date: '2026-03-08' },
];

let users = [
  { id: 1, name: 'Sophie Laurent', email: 'sophie@example.com', role: 'customer', createdAt: '2026-01-15' },
  { id: 2, name: 'James Chen', email: 'james@example.com', role: 'customer', createdAt: '2026-02-08' },
  { id: 3, name: 'Admin User', email: 'admin@luxethread.com', role: 'admin', createdAt: '2025-12-01' },
];

// ── Helper ─────────────────────────────────────────────────────
const generateId = () => 'LT-' + crypto.randomBytes(4).toString('hex').toUpperCase();
const notFound = (res, msg = 'Not found') => res.status(404).json({ error: msg });
const badRequest = (res, msg = 'Bad request') => res.status(400).json({ error: msg });

// ── Products API ───────────────────────────────────────────────

// GET /api/products — list with optional filtering
app.get('/api/products', (req, res) => {
  let result = [...products];
  const { category, sort, minPrice, maxPrice, q } = req.query;

  if (category) result = result.filter(p => p.category === category);
  if (q) result = result.filter(p => p.name.toLowerCase().includes(q.toLowerCase()) || p.origin.toLowerCase().includes(q.toLowerCase()));
  if (minPrice) result = result.filter(p => p.price >= Number(minPrice));
  if (maxPrice) result = result.filter(p => p.price <= Number(maxPrice));

  if (sort === 'price-asc')  result.sort((a,b) => a.price - b.price);
  if (sort === 'price-desc') result.sort((a,b) => b.price - a.price);
  if (sort === 'rating')     result.sort((a,b) => b.rating - a.rating);
  if (sort === 'newest')     result.reverse();

  res.json({ success: true, count: result.length, data: result });
});

// GET /api/products/:id — single product
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === Number(req.params.id));
  if (!product) return notFound(res, 'Product not found');
  res.json({ success: true, data: product });
});

// POST /api/products — create product (admin)
app.post('/api/products', (req, res) => {
  const { name, origin, category, price, stock, image, badge, description } = req.body;
  if (!name || !price || !category) return badRequest(res, 'name, price, category required');

  const newProduct = {
    id: products.length + 1,
    name, origin: origin || 'Unknown', category,
    price: Number(price),
    oldPrice: null, badge: badge || null,
    rating: 0, reviews: 0,
    stock: Number(stock) || 0,
    image: image || '',
    description: description || '',
    createdAt: new Date().toISOString(),
  };
  products.push(newProduct);
  res.status(201).json({ success: true, data: newProduct });
});

// PUT /api/products/:id — update product (admin)
app.put('/api/products/:id', (req, res) => {
  const idx = products.findIndex(p => p.id === Number(req.params.id));
  if (idx === -1) return notFound(res, 'Product not found');
  products[idx] = { ...products[idx], ...req.body, id: products[idx].id };
  res.json({ success: true, data: products[idx] });
});

// DELETE /api/products/:id — delete product (admin)
app.delete('/api/products/:id', (req, res) => {
  const idx = products.findIndex(p => p.id === Number(req.params.id));
  if (idx === -1) return notFound(res, 'Product not found');
  const deleted = products.splice(idx, 1)[0];
  res.json({ success: true, data: deleted });
});

// ── Orders API ─────────────────────────────────────────────────

// GET /api/orders — list all orders (admin)
app.get('/api/orders', (req, res) => {
  const { status, customerId } = req.query;
  let result = [...orders];
  if (status) result = result.filter(o => o.status === status);
  if (customerId) result = result.filter(o => o.customerId === Number(customerId));
  res.json({ success: true, count: result.length, data: result });
});

// GET /api/orders/:id — single order
app.get('/api/orders/:id', (req, res) => {
  const order = orders.find(o => o.id === req.params.id);
  if (!order) return notFound(res, 'Order not found');
  res.json({ success: true, data: order });
});

// POST /api/orders — create order (checkout)
app.post('/api/orders', (req, res) => {
  const { customer, email, items, shippingAddress, paymentMethod } = req.body;
  if (!customer || !email || !items || !items.length) {
    return badRequest(res, 'customer, email, and items are required');
  }

  // Calculate total from product prices
  const total = items.reduce((sum, item) => {
    const product = products.find(p => p.id === item.productId);
    return sum + (product ? product.price * item.qty : 0);
  }, 0);

  const newOrder = {
    id: generateId(),
    customer, email, items,
    shippingAddress: shippingAddress || {},
    paymentMethod: paymentMethod || 'card',
    total,
    status: 'processing',
    date: new Date().toISOString().split('T')[0],
    createdAt: new Date().toISOString(),
  };

  orders.push(newOrder);
  res.status(201).json({ success: true, data: newOrder, message: 'Order placed successfully' });
});

// PATCH /api/orders/:id/status — update order status (admin)
app.patch('/api/orders/:id/status', (req, res) => {
  const order = orders.find(o => o.id === req.params.id);
  if (!order) return notFound(res, 'Order not found');
  const validStatuses = ['processing', 'confirmed', 'shipped', 'delivered', 'cancelled'];
  if (!validStatuses.includes(req.body.status)) return badRequest(res, 'Invalid status');
  order.status = req.body.status;
  order.updatedAt = new Date().toISOString();
  res.json({ success: true, data: order });
});

// ── Users / Auth API ───────────────────────────────────────────

// POST /api/auth/register
app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return badRequest(res, 'name, email, password required');
  if (users.find(u => u.email === email)) return res.status(409).json({ error: 'Email already registered' });

  const newUser = {
    id: users.length + 1,
    name, email,
    role: 'customer',
    createdAt: new Date().toISOString(),
  };
  users.push(newUser);

  // In production: generate JWT token here
  const token = crypto.randomBytes(32).toString('hex');
  res.status(201).json({ success: true, data: { user: newUser, token }, message: 'Registration successful' });
});

// POST /api/auth/login
app.post('/api/auth/login', (req, res) => {
  const { email } = req.body;
  if (!email) return badRequest(res, 'email required');
  const user = users.find(u => u.email === email);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  // In production: verify password hash and generate JWT
  const token = crypto.randomBytes(32).toString('hex');
  res.json({ success: true, data: { user, token }, message: 'Login successful' });
});

// GET /api/users — admin only
app.get('/api/users', (req, res) => {
  res.json({ success: true, count: users.length, data: users.map(u => ({ ...u, password: undefined })) });
});

// ── Admin Stats API ────────────────────────────────────────────

// GET /api/admin/stats — dashboard overview
app.get('/api/admin/stats', (req, res) => {
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const byStatus = orders.reduce((acc, o) => {
    acc[o.status] = (acc[o.status] || 0) + 1;
    return acc;
  }, {});

  res.json({
    success: true,
    data: {
      totalRevenue,
      totalOrders: orders.length,
      totalCustomers: users.filter(u => u.role === 'customer').length,
      totalProducts: products.length,
      ordersByStatus: byStatus,
      lowStockProducts: products.filter(p => p.stock < 20).map(p => ({ id: p.id, name: p.name, stock: p.stock })),
    }
  });
});

// ── Coupon Validation ──────────────────────────────────────────
const COUPONS = {
  'LUXE20': { discount: 0.20, type: 'percent', description: '20% off your order' },
  'WELCOME': { discount: 15, type: 'fixed', description: '$15 off your first order' },
  'FREE': { discount: 0, type: 'free_shipping', description: 'Free shipping' },
};

app.post('/api/coupons/validate', (req, res) => {
  const { code } = req.body;
  const coupon = COUPONS[code?.toUpperCase()];
  if (!coupon) return res.status(404).json({ error: 'Invalid coupon code' });
  res.json({ success: true, data: { code: code.toUpperCase(), ...coupon } });
});

// ── Newsletter ─────────────────────────────────────────────────
const subscribers = [];
app.post('/api/newsletter', (req, res) => {
  const { email } = req.body;
  if (!email) return badRequest(res, 'email required');
  if (subscribers.includes(email)) return res.json({ success: true, message: 'Already subscribed' });
  subscribers.push(email);
  res.json({ success: true, message: 'Subscribed successfully' });
});

// ── Health Check ───────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', version: '1.0.0', timestamp: new Date().toISOString() });
});

// ── 404 Handler ────────────────────────────────────────────────
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

// ── Catch-all: serve frontend ─────────────────────────────────
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// ── Start Server ───────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`
  ╔══════════════════════════════════════╗
  ║  🧵  LuxeThread Server Running       ║
  ║  🌐  http://localhost:${PORT}            ║
  ║  📦  ${products.length} products loaded            ║
  ║  📋  ${orders.length} sample orders loaded       ║
  ╚══════════════════════════════════════╝
  
  API Endpoints:
  GET  /api/products         — list products
  GET  /api/products/:id     — single product
  POST /api/products         — create product (admin)
  PUT  /api/products/:id     — update product (admin)
  DEL  /api/products/:id     — delete product (admin)
  GET  /api/orders           — list orders
  POST /api/orders           — place order
  PATCH /api/orders/:id/status — update status
  POST /api/auth/register    — register user
  POST /api/auth/login       — login user
  GET  /api/admin/stats      — dashboard stats
  `);
});

module.exports = app;
