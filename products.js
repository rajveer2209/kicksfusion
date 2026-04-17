/* ==============================================
   KICKSFUSION — Shared Product Data
   ============================================== */

const ALL_SIZES = ["UK 6","UK 7","UK 8","UK 9","UK 10","UK 11","UK 12"];

const PRODUCTS = {
  sports: {
    title: "SPORTS",
    banner: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1400&q=80",
    items: [
      { id: 1, name: "Nike Zoom Fly 6", brand: "Nike", price: "₹14,999", oldPrice: "₹18,999", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80", badge: "hot", material: "Engineered mesh upper, ZoomX foam midsole, rubber outsole", sizes: ALL_SIZES },
      { id: 2, name: "On Running Cloudtilt Black", brand: "On Running", price: "₹18,999", oldPrice: null, image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&q=80", badge: "new", material: "Recycled polyester knit upper, CloudTec Phase cushioning, TPU heel counter", sizes: ALL_SIZES },
      { id: 3, name: "Asics Gel-Kayano 14", brand: "Asics", price: "₹15,999", oldPrice: null, image: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=400&q=80", badge: null, material: "Synthetic leather & mesh upper, GEL technology cushioning, TRUSSTIC system", sizes: ALL_SIZES },
      { id: 4, name: "New Balance 9060 Triple Black", brand: "New Balance", price: "₹16,499", oldPrice: "₹19,999", image: "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=400&q=80", badge: "sale", material: "Suede & mesh panelled upper, ABZORB midsole, SBS outsole", sizes: ALL_SIZES },
      { id: 5, name: "Nike Air Max 97 Silver Bullet", brand: "Nike", price: "₹16,999", oldPrice: null, image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&q=80", badge: null, material: "Synthetic leather & textile upper, full-length Max Air unit, rubber waffle outsole", sizes: ALL_SIZES },
      { id: 6, name: "Adidas Ultraboost Light", brand: "Adidas", price: "₹13,499", oldPrice: "₹17,999", image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&q=80", badge: "sale", material: "Adidas PRIMEKNIT+ upper, Light BOOST midsole, Continental rubber outsole", sizes: ALL_SIZES },
      { id: 7, name: "Puma Deviate Elite 2", brand: "Puma", price: "₹12,999", oldPrice: null, image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=400&q=80", badge: null, material: "MATRYX upper, NITRO Elite foam, carbon plate, PUMAGRIP outsole", sizes: ALL_SIZES },
      { id: 8, name: "Salomon XT-6 Advanced", brand: "Salomon", price: "₹19,499", oldPrice: null, image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&q=80", badge: "exclusive", material: "Anti-debris mesh, Dual-density EVA midsole, Contagrip outsole, Kevlar chassis", sizes: ALL_SIZES },
      { id: 21, name: "Nike Air Force 1 Low White", brand: "Nike", price: "₹2,500", oldPrice: "₹8,999", image: "af1_1.jpg", images: ["af1_1.jpg", "af1_2.jpg", "af1_3.jpg", "af1_4.jpg", "af1_5.jpg"], badge: "sale", material: "Full-grain leather upper, Nike Air cushioning, pivoting rubber outsole", sizes: ALL_SIZES, description: "The radiant, classic, and clean Nike Air Force 1 Low White is a timeless icon. Featuring a full-grain leather upper, perforated toe box for breathability, and the legendary Nike Air unit in the heel for all-day comfort. It’s the ultimate staple for any wardrobe, offering a crisp, premium look that effortlessly complements any style." },
    ]
  },
  casual: {
    title: "CASUAL",
    banner: "af1_1.jpg",
    items: [
      { id: 20, name: "Adidas Samba OG White Green", brand: "Adidas", price: "₹11,999", oldPrice: null, image: "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=400&q=80", badge: "new", material: "Full-grain leather upper, suede T-toe overlay, gum rubber outsole", sizes: ALL_SIZES },
      { id: 21, name: "Nike Air Force 1 Low White", brand: "Nike", price: "₹2,500", oldPrice: "₹8,999", image: "af1_1.jpg", images: ["af1_1.jpg", "af1_2.jpg", "af1_3.jpg", "af1_4.jpg", "af1_5.jpg"], badge: "sale", material: "Full-grain leather upper, Nike Air cushioning, pivoting rubber outsole", sizes: ALL_SIZES, description: "The radiant, classic, and clean Nike Air Force 1 Low White is a timeless icon. Featuring a full-grain leather upper, perforated toe box for breathability, and the legendary Nike Air unit in the heel for all-day comfort. It’s the ultimate staple for any wardrobe, offering a crisp, premium look that effortlessly complements any style." },
      { id: 22, name: "Converse Chuck 70 Hi", brand: "Converse", price: "₹7,499", oldPrice: null, image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&q=80", badge: null, material: "Heavyweight canvas upper, OrthoLite cushioning, vulcanized rubber sole", sizes: ALL_SIZES },
      { id: 23, name: "New Balance 550 White Grey", brand: "New Balance", price: "₹12,999", oldPrice: "₹15,999", image: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=400&q=80", badge: "sale", material: "Leather & synthetic upper, perforated toe, C-CAP midsole, rubber cupsole", sizes: ALL_SIZES },
      { id: 24, name: "Yeezy Slides Bone", brand: "Yeezy", price: "₹9,499", oldPrice: "₹12,499", image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&q=80", badge: "hot", material: "Injected EVA foam, single-piece construction, serrated outsole for traction", sizes: ALL_SIZES },
      { id: 25, name: "Vans Old Skool Pro", brand: "Vans", price: "₹5,999", oldPrice: null, image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&q=80", badge: null, material: "Canvas & suede upper, UltraCush HD socklined footbed, vulcanized rubber waffle outsole", sizes: ALL_SIZES },
      { id: 26, name: "Reebok Club C 85 Vintage", brand: "Reebok", price: "₹7,999", oldPrice: "₹9,999", image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&q=80", badge: "sale", material: "Soft garment leather upper, die-cut EVA midsole, high-abrasion rubber outsole", sizes: ALL_SIZES },
      { id: 27, name: "Puma Suede Classic", brand: "Puma", price: "₹6,499", oldPrice: null, image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=400&q=80", badge: "new", material: "Premium suede upper, rubber cupsole, padded collar, formstrip overlay", sizes: ALL_SIZES },
    ]
  },
  basketball: {
    title: "BASKETBALL",
    banner: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=1400&q=80",
    items: [
      { id: 40, name: "Jordan 4 Retro Lakers", brand: "Jordan", price: "₹22,999", oldPrice: "₹28,999", image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=400&q=80", badge: "hot", material: "Premium leather & nubuck upper, visible Air-Sole heel unit, rubber herringbone outsole", sizes: ALL_SIZES },
      { id: 41, name: "Jordan 1 Retro High OG", brand: "Jordan", price: "₹19,499", oldPrice: "₹24,999", image: "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?w=400&q=80", badge: "sale", material: "Full-grain leather upper, Nike Air cushioning, rubber cupsole with pivot point", sizes: ALL_SIZES },
      { id: 42, name: "Nike LeBron 21", brand: "Nike", price: "₹18,999", oldPrice: null, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80", badge: "new", material: "Engineered knit upper with cable system, Zoom Air Strobel, rubber traction outsole", sizes: ALL_SIZES },
      { id: 43, name: "Jordan 11 Retro Cool Grey", brand: "Jordan", price: "₹24,499", oldPrice: null, image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&q=80", badge: "exclusive", material: "Patent leather mudguard, ballistic mesh upper, carbon fiber spring plate, full-length Air", sizes: ALL_SIZES },
      { id: 44, name: "Nike KD 16 Aunt Pearl", brand: "Nike", price: "₹16,999", oldPrice: "₹19,999", image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&q=80", badge: "sale", material: "Flyknit upper, full-length Air Zoom Strobel, multi-directional rubber traction", sizes: ALL_SIZES },
      { id: 45, name: "Adidas Harden Vol 8", brand: "Adidas", price: "₹15,499", oldPrice: null, image: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=400&q=80", badge: null, material: "Textile & synthetic upper, full-length Lightstrike midsole, Adiwear rubber outsole", sizes: ALL_SIZES },
      { id: 46, name: "Jordan 3 Retro White Cement", brand: "Jordan", price: "₹21,999", oldPrice: null, image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&q=80", badge: "hot", material: "Tumbled leather upper, elephant print overlays, visible Air-Sole heel, rubber outsole", sizes: ALL_SIZES },
      { id: 47, name: "Nike Zoom GT Cut 3", brand: "Nike", price: "₹17,499", oldPrice: null, image: "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=400&q=80", badge: null, material: "Flyweave upper, React foam & Zoom Air stacked midsole, multi-directional traction", sizes: ALL_SIZES },
    ]
  },
  "hot-picks": {
    title: "HOT PICKS 🔥",
    banner: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=1400&q=80",
    items: []
  },
  sale: {
    title: "SALE",
    banner: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=1400&q=80",
    items: []
  }
};

// Hot Picks = curated selection
PRODUCTS["hot-picks"].items = [
  PRODUCTS.basketball.items[0], PRODUCTS.casual.items[0],
  PRODUCTS.sports.items[0], PRODUCTS.basketball.items[1],
  PRODUCTS.sports.items[7], PRODUCTS.casual.items[4],
  PRODUCTS.basketball.items[3], PRODUCTS.sports.items[1],
  PRODUCTS.casual.items[1],
];

// Sale = all items with oldPrice (deduplicated)
PRODUCTS.sale.items = Array.from(
  new Map(
    [...PRODUCTS.sports.items, ...PRODUCTS.casual.items, ...PRODUCTS.basketball.items]
    .filter(p => p.oldPrice)
    .map(p => [p.id, p])
  ).values()
);

// Helper: find product by ID
function findProductById(id) {
  const numId = parseInt(id);
  for (const cat of Object.values(PRODUCTS)) {
    const found = cat.items.find(p => p.id === numId);
    if (found) return found;
  }
  return null;
}

// Helper: find category key for a product
function findCategoryForProduct(id) {
  for (const [key, cat] of Object.entries(PRODUCTS)) {
    if (key === "hot-picks" || key === "sale") continue;
    if (cat.items.some(p => p.id === id)) return key;
  }
  return null;
}

// Sample reviews data
const REVIEWS = [
  { name: "Rahul S.", rating: 5, text: "Superb quality! Can't tell the difference from originals. Fast delivery too.", date: "2 days ago" },
  { name: "Priya M.", rating: 5, text: "Amazing pair, exactly as shown. The packaging was also great 👌", date: "5 days ago" },
  { name: "Arjun K.", rating: 4, text: "Really good quality for the price. Comfortable and looks premium.", date: "1 week ago" },
  { name: "Sneha R.", rating: 5, text: "This is my 3rd order from KicksFusion. Never disappointed! 🔥", date: "1 week ago" },
  { name: "Vikram P.", rating: 4, text: "Great build quality and the stitching is perfect. Worth every rupee.", date: "2 weeks ago" },
  { name: "Ananya D.", rating: 5, text: "My boyfriend loved the gift! He thought they were real ones 😂", date: "2 weeks ago" },
];

// ==============================================
// GLOBAL WISHLIST LOGIC
// ==============================================
function getWishlist() {
  try { return JSON.parse(localStorage.getItem("kf_wishlist")) || []; }
  catch { return []; }
}

function saveWishlist(list) {
  localStorage.setItem("kf_wishlist", JSON.stringify(list));
  updateWishlistCount();
}

window.toggleLike = function(id, btn) {
  let list = getWishlist();
  if (list.includes(id)) {
    list = list.filter(i => i !== id);
    if(btn) btn.classList.remove("liked");
  } else {
    list.push(id);
    if(btn) btn.classList.add("liked");
  }
  saveWishlist(list);
  
  // If we are on wishlist.html, we need to re-render
  if (window.renderWishlist) {
    window.renderWishlist();
  }
};

function updateWishlistCount() {
  const el = document.getElementById("wishlist-count");
  if (el) el.textContent = getWishlist().length;
}

// Auto-init for all pages
document.addEventListener("DOMContentLoaded", updateWishlistCount);
