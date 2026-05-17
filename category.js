/* ==============================================
   KICKSFUSION — Category Page JavaScript
   ============================================== */

// -------- Read URL param --------
function getCat() {
  const params = new URLSearchParams(window.location.search);
  return params.get("cat") || "sports";
}

// -------- DOM --------
const catHero = document.getElementById("cat-header");
const catTitle = document.getElementById("cat-title");
const catCount = document.getElementById("cat-count");
const breadcrumbCat = document.getElementById("breadcrumb-cat");
const resultsCount = document.getElementById("results-count");
const productGrid = document.getElementById("cat-product-grid");
const sortSelect = document.getElementById("sort-select");
const cartBadge = document.getElementById("cart-badge");
const toast = document.getElementById("toast");
const toastMsg = document.getElementById("toast-msg");

let cartCountNum = 0;
let currentItems = [];

// -------- Render --------
function init() {
  const cat = getCat();
  const data = PRODUCTS[cat];

  if (!data) {
    catTitle.textContent = "NOT FOUND";
    catCount.textContent = "Category does not exist";
    return;
  }

  // Set page title
  document.title = `KicksFusion — ${data.title}`;

  // Header info
  catTitle.textContent = data.title;
  breadcrumbCat.textContent = data.title;

  currentItems = [...data.items];
  renderGrid(currentItems);
  highlightNav(cat);
}

function renderGrid(items) {
  catCount.textContent = `${items.length} products`;
  resultsCount.textContent = `Showing ${items.length} products`;

  productGrid.innerHTML = items.map(product => {
    const badgeHTML = product.badge
      ? `<span class="product-card-badge badge-${product.badge}">${product.badge.toUpperCase()}</span>`
      : "";

    const oldPriceHTML = product.oldPrice
      ? `<span class="price-old">MRP ${product.oldPrice}</span>`
      : "";

    const discountHTML = product.oldPrice
      ? `<span class="price-discount">${calcDiscount(product.price, product.oldPrice)}</span>`
      : "";

    const liked = getWishlist().includes(product.id);
    const likeClass = liked ? "product-like-btn liked" : "product-like-btn";

    const catKey = findCategoryForProduct(product.id);
    const catName = catKey && PRODUCTS[catKey] ? PRODUCTS[catKey].title : "SNEAKERS";

    return `
      <a href="product.html?id=${product.id}" class="product-card" id="product-${product.id}">
        <div class="product-card-image">
          ${badgeHTML}
          <img src="${product.image}" alt="${product.name}" loading="lazy" />
          <button class="${likeClass}" data-id="${product.id}" aria-label="Like" onclick="event.preventDefault();event.stopPropagation();toggleLike(${product.id},this);">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.5"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
          </button>
        </div>
        <div class="product-card-info">
          <div class="product-card-name">${product.name}</div>
          <div class="product-card-price">
            <span class="price-label">MRP</span>
            <span class="price-current">${product.price}</span>
            ${oldPriceHTML}
            ${discountHTML}
          </div>
          <div class="product-card-category" style="font-size: 0.72rem; color: var(--mid-grey); margin-top: 8px; font-weight: 700; text-transform: uppercase;">${catName}</div>
        </div>
      </a>
    `;
  }).join("");
}

function calcDiscount(price, oldPrice) {
  const curr = parseInt(price.replace(/[^\d]/g, ""));
  const old = parseInt(oldPrice.replace(/[^\d]/g, ""));
  const pct = Math.round(((old - curr) / old) * 100);
  return `(${pct}% OFF)`;
}

function parsePrice(priceStr) {
  return parseInt(priceStr.replace(/[^\d]/g, ""));
}

// -------- Sorting --------
sortSelect.addEventListener("change", () => {
  const val = sortSelect.value;
  let sorted = [...currentItems];

  if (val === "price-low") {
    sorted.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
  } else if (val === "price-high") {
    sorted.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
  } else if (val === "name-az") {
    sorted.sort((a, b) => a.name.localeCompare(b.name));
  }

  renderGrid(sorted);
});

// -------- Cart --------
function addToCart(name) {
  cartCountNum++;
  cartBadge.textContent = cartCountNum;
  cartBadge.classList.add("show");
  showToast(`Added "${name}" to cart`);
}

// -------- Toast --------
function showToast(msg) {
  toastMsg.textContent = msg;
  toast.classList.add("show");
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// -------- Highlight current nav --------
function highlightNav(cat) {
  document.querySelectorAll(".nav-link[data-cat]").forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("data-cat") === cat) {
      link.classList.add("active");
    }
  });
}

// -------- Mobile Menu --------
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile-menu");
const mobileMenuClose = document.getElementById("mobile-menu-close");
const menuOverlay = document.getElementById("menu-overlay");

hamburger.addEventListener("click", () => {
  mobileMenu.classList.add("open");
  menuOverlay.classList.add("show");
  document.body.style.overflow = "hidden";
});

function closeMenu() {
  mobileMenu.classList.remove("open");
  menuOverlay.classList.remove("show");
  document.body.style.overflow = "";
}

mobileMenuClose.addEventListener("click", closeMenu);
menuOverlay.addEventListener("click", closeMenu);

// -------- Search --------
const searchToggle = document.getElementById("search-toggle");
const searchOverlay = document.getElementById("search-overlay");
const searchClose = document.getElementById("search-close");
const searchInput = document.getElementById("search-input");

searchToggle.addEventListener("click", () => {
  searchOverlay.classList.add("open");
  setTimeout(() => searchInput.focus(), 350);
});

function closeSearchOverlay() {
  searchOverlay.classList.remove("open");
  searchInput.value = "";
  const r = document.getElementById("search-results");
  if (r) r.innerHTML = "";
  const s = document.getElementById("search-suggestions");
  if (s) s.style.display = "flex";
}

searchClose.addEventListener("click", closeSearchOverlay);

function getAllSearchableProducts() {
  const all = []; const seen = new Set();
  for (const [key, cat] of Object.entries(PRODUCTS)) {
    if (key === "sale") continue;
    for (const p of cat.items) { if (!seen.has(p.id)) { seen.add(p.id); all.push(p); } }
  }
  return all;
}

function performSearch(query) {
  const results = document.getElementById("search-results");
  const suggestions = document.getElementById("search-suggestions");
  if (!results) return;
  const q = query.trim().toLowerCase();
  if (!q) { results.innerHTML = ""; if (suggestions) suggestions.style.display = "flex"; return; }
  if (suggestions) suggestions.style.display = "none";
  const matches = getAllSearchableProducts().filter(p =>
    (p.name || "").toLowerCase().includes(q) || (p.brand || "").toLowerCase().includes(q)
  );
  if (!matches.length) { results.innerHTML = `<div class="search-no-results">No products found for "${query}"</div>`; return; }
  results.innerHTML = matches.map(p => `
    <a href="product.html?id=${p.id}" class="search-result-card">
      <div class="search-result-img"><img src="${p.image}" alt="${p.name}" loading="lazy" /></div>
      <div class="search-result-info">
        <div class="search-result-name">${p.name}</div>
        <div class="search-result-price">${p.price}</div>
      </div>
    </a>`).join("");
}

searchInput.addEventListener("input", e => performSearch(e.target.value));
searchInput.addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); performSearch(searchInput.value); } });
document.querySelectorAll(".search-tag").forEach(tag => {
  tag.addEventListener("click", () => { searchInput.value = tag.textContent; performSearch(tag.textContent); });
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeSearchOverlay();
    closeMenu();
  }
});

// -------- Init --------
document.addEventListener("DOMContentLoaded", init);
