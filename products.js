/* ==============================================
   KICKSFUSION — Shared Product Data
   ============================================== */

const ALL_SIZES = ["UK 6","UK 7","UK 8","UK 9","UK 10","UK 11","UK 12"];

const PRODUCTS = {
  sports: {
    title: "SPORTS",
    banner: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1400&q=80",
    items: []
  },
  casual: {
    title: "CASUAL",
    banner: "af1_1.jpg",
    items: [
      { 
        id: 101, 
        name: "NIKE SB DUNK Low Travis Scott", 
        brand: "Nike", 
        price: "₹3,000", 
        oldPrice: null, 
        image: "nike_sb_1.jpg", 
        images: ["nike_sb_1.jpg", "nike_sb_2.jpg", "nike_sb_4.jpg", "nike_sb_3.jpg", "nike_sb_5.jpg"], 
        badge: "hot", 
        material: "Suede base, bandana print canvas overlays, rope laces, Nike SB cushioning", 
        sizes: ALL_SIZES, 
        description: "The Travis Scott x Nike SB Dunk Low features a unique, eclectic design with wear-away bandana print overlays and tartan plaid panels. This collaboration represents Travis Scott's first official skate shoe with Nike SB, blending rugged textures with the iconic SB silhouette. Premium materials like nubuck and thick rope laces complete this limited-edition masterpiece." 
      },
      { 
        id: 102, 
        name: "Nike Dunk Low SB TRD QS Black Pigeon", 
        brand: "Nike", 
        price: "₹3,000", 
        oldPrice: null, 
        image: "pigeon_4.jpg", 
        images: ["pigeon_4.jpg", "pigeon_2.jpg", "pigeon_1.jpg", "pigeon_3.jpg"], 
        badge: "hot", 
        material: "Black nubuck and Stetson waterproof leather, Pigeon embroidery on lateral heel, Sienna orange accents", 
        sizes: ALL_SIZES, 
        description: "A landmark collaboration between Nike SB and Jeff Staple, the 'Black Pigeon' features a primarily black upper with the signature Pigeon embroidery on the lateral heel. Constructed from premium nubuck and waterproof leather, it pays homage to the legendary 2005 release that defined sneaker culture." 
      },
      { 
        id: 104, 
        name: "Nike Air Force 1 Low White", 
        brand: "Nike", 
        price: "₹2,500", 
        oldPrice: null, 
        image: "af1_1.jpg", 
        images: ["af1_1.jpg", "af1_2.jpg", "af1_3.jpg", "af1_4.jpg", "af1_5.jpg"], 
        badge: null, 
        material: "Full-grain leather upper, Nike Air cushioning, pivoting rubber outsole", 
        sizes: ALL_SIZES, 
        description: "The radiant, classic, and clean Nike Air Force 1 Low White is a timeless icon. Featuring a full-grain leather upper, perforated toe box for breathability, and the legendary Nike Air unit in the heel for all-day comfort. It’s the ultimate staple for any wardrobe, offering a crisp, premium look that effortlessly complements any style." 
      },
      { 
        id: 105, 
        name: "Nike SB Dunk Low Supreme Rammellzee", 
        brand: "Nike", 
        price: "₹3,500", 
        oldPrice: "₹4,000", 
        image: "rammellzee_1.jpg", 
        images: ["rammellzee_1.jpg", "rammellzee_2.jpg", "rammellzee_3.jpg", "rammellzee_4.jpg"], 
        badge: "hot", 
        material: "Black suede mudguard and toe cap, graffiti-print canvas overlays, padded black nylon collar, gum rubber outsole", 
        sizes: ALL_SIZES, 
        description: "The Nike SB Dunk Low x Supreme x Rammellzee is a bold three-way collaboration paying tribute to the legendary New York graffiti artist Rammellzee. The upper features a striking collage-print canvas with vibrant, abstract artwork layered over a black suede base. Gold-tone lace dubrae and a classic gum rubber outsole complete this collectible silhouette, blending street art heritage with skate culture." 
      },
    ]
  },
  basketball: {
    title: "BASKETBALL",
    banner: "converse_ltd_1.jpg",
    items: [
      { 
        id: 103, 
        name: "CONVERSE CHUCK 70 LTD ADDITION", 
        brand: "Converse", 
        price: "₹2,800", 
        oldPrice: null, 
        image: "converse_ltd_1.jpg", 
        images: ["converse_ltd_1.jpg", "converse_ltd_2.jpg", "converse_ltd_3.jpg", "converse_ltd_4.jpg", "converse_ltd_5.jpg"], 
        badge: "exclusive", 
        material: "Premium heavy-grade wave canvas upper, gradient blue tones, OrthoLite cushioning for comfort, heritage license plate", 
        sizes: ALL_SIZES, 
        description: "This limited edition Converse Chuck 70 elevates the iconic silhouette with premium materials and unique detailing. Featuring a multi-toned wave canvas upper in gradient blue hues, it maintains the classic Chuck 70 DNA with upgraded hardware and specialized styling for a high-fashion look." 
      },
    ]
  },
  sale: {
    title: "SALE",
    banner: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=1400&q=80",
    items: []
  }
};

// Sale — also include products with "sale" badge from any category
(function populateSale() {
  const seen = new Set(PRODUCTS.sale.items.map(p => p.id));
  for (const [key, cat] of Object.entries(PRODUCTS)) {
    if (key === "sale") continue;
    for (const p of cat.items) {
      if (p.badge === "sale" && !seen.has(p.id)) {
        seen.add(p.id);
        PRODUCTS.sale.items.push(p);
      }
    }
  }
})();

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
    if (key === "sale") continue;
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
  { name: "Karan J.", rating: 5, text: "The cushioning is surprisingly good. Wore them all day and no pain. Must buy!", date: "3 days ago" },
  { name: "Meera K.", rating: 5, text: "Fastest delivery I've ever seen. The sneakers look even better in person.", date: "4 days ago" },
  { name: "Siddharth V.", rating: 4, text: "The details on the logo are perfect. Packaging was a bit crushed, but the shoes were safe.", date: "6 days ago" },
  { name: "Ishaan T.", rating: 5, text: "The Pigeon Dunk is insane! So glad I found this store. Highly recommended.", date: "1 week ago" },
  { name: "Riya G.", rating: 5, text: "Perfect fit! I was worried about the sizing but UK 8 fits perfectly. Quality is top-notch.", date: "2 weeks ago" },
  { name: "Aman B.", rating: 4, text: "Worth the price. You won't find this quality at such low prices elsewhere.", date: "3 weeks ago" },
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
  
  if (window.renderWishlist) {
    window.renderWishlist();
  }
};

function updateWishlistCount() {
  const el = document.getElementById("wishlist-count");
  if (el) el.textContent = getWishlist().length;
}

document.addEventListener("DOMContentLoaded", updateWishlistCount);
