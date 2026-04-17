/* ==============================================
   KICKSFUSION — Product Detail Page JavaScript
   ============================================== */

// -------- Read product ID --------
function getProductId() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

// -------- DOM --------
const pdpImage = document.getElementById("pdp-image");
const pdpBadge = document.getElementById("pdp-badge");
const pdpBrand = document.getElementById("pdp-brand");
const pdpName = document.getElementById("pdp-name");
const pdpPrice = document.getElementById("pdp-price");
const pdpOldPrice = document.getElementById("pdp-old-price");
const pdpDiscount = document.getElementById("pdp-discount");
const pdpSizes = document.getElementById("pdp-sizes");
const pdpMaterial = document.getElementById("pdp-material");
const pdpBreadcrumbName = document.getElementById("pdp-breadcrumb-name");
const pdpCatLink = document.getElementById("pdp-cat-link");
const toast = document.getElementById("toast");
const toastMsg = document.getElementById("toast-msg");
const pdpThumbnails = document.getElementById("pdp-thumbnails");
const pdpDescriptionContainer = document.getElementById("pdp-description-container");
const pdpDescription = document.getElementById("pdp-description");
const pdpPrevBtn = document.getElementById("pdp-img-prev");
const pdpNextBtn = document.getElementById("pdp-img-next");
const pdpLikeBtn = document.getElementById("pdp-like-btn");
const pdpLikeText = document.getElementById("pdp-like-text");

let currentImageIndex = 0;

let selectedSize = null;
let currentProduct = null;

// -------- Init --------
function init() {
  const id = getProductId();
  const product = findProductById(id);

  if (!product) {
    pdpName.textContent = "PRODUCT NOT FOUND";
    pdpBrand.textContent = "Sorry, this product doesn't exist";
    return;
  }

  currentProduct = product;
  document.title = `KicksFusion — ${product.name}`;

  // Image
  pdpImage.src = product.image;
  pdpImage.alt = product.name;

  // Thumbnails and Image Gallery Navigation
  if (product.images && product.images.length > 0) {
    if (pdpPrevBtn) pdpPrevBtn.style.display = "flex";
    if (pdpNextBtn) pdpNextBtn.style.display = "flex";

    if (pdpThumbnails) {
      pdpThumbnails.style.display = "none";
      
      const total = product.images.length;
      const updateMainImage = (index) => {
        currentImageIndex = index;
        pdpImage.src = product.images[currentImageIndex];
      };

      if (pdpPrevBtn) {
        pdpPrevBtn.onclick = () => {
          let newIndex = currentImageIndex - 1;
          if (newIndex < 0) newIndex = total - 1;
          updateMainImage(newIndex);
        };
      }

      if (pdpNextBtn) {
        pdpNextBtn.onclick = () => {
          let newIndex = currentImageIndex + 1;
          if (newIndex >= total) newIndex = 0;
          updateMainImage(newIndex);
        };
      }
    }
  } else {
    if (pdpThumbnails) pdpThumbnails.style.display = "none";
    if (pdpPrevBtn) pdpPrevBtn.style.display = "none";
    if (pdpNextBtn) pdpNextBtn.style.display = "none";
  }

  // Description
  if (product.description) {
    if (pdpDescriptionContainer) pdpDescriptionContainer.style.display = "block";
    if (pdpDescription) pdpDescription.textContent = product.description;
  } else {
    if (pdpDescriptionContainer) pdpDescriptionContainer.style.display = "none";
  }

  // Badge
  if (product.badge) {
    pdpBadge.textContent = product.badge.toUpperCase();
    pdpBadge.className = `pdp-badge show badge-${product.badge}`;
  }

  // Like Button
  if (pdpLikeBtn) {
    const list = getWishlist();
    if (list.includes(product.id)) {
      pdpLikeBtn.classList.add("liked");
      if (pdpLikeText) pdpLikeText.textContent = "Saved";
    } else {
      pdpLikeBtn.classList.remove("liked");
      if (pdpLikeText) pdpLikeText.textContent = "Save";
    }

    pdpLikeBtn.onclick = (e) => {
      e.preventDefault();
      // toggleLike handles localStorage and adds/removes "liked" class on the element passed
      toggleLike(product.id, pdpLikeBtn);
      
      const isLiked = pdpLikeBtn.classList.contains("liked");
      if (pdpLikeText) pdpLikeText.textContent = isLiked ? "Saved" : "Save";
      
      if (isLiked) {
        showToast("Added to wishlist ♥");
      } else {
        showToast("Removed from wishlist");
      }
    };
  }

  // Info
  pdpBrand.textContent = product.brand;
  pdpName.textContent = product.name;
  pdpPrice.textContent = product.price;

  if (product.oldPrice) {
    pdpOldPrice.textContent = product.oldPrice;
    pdpDiscount.textContent = calcDiscount(product.price, product.oldPrice);
  }

  // Breadcrumb — find which category this product belongs to
  const catKey = findCategoryForProduct(product.id);
  if (catKey) {
    pdpCatLink.textContent = PRODUCTS[catKey].title;
    pdpCatLink.href = `category.html?cat=${catKey}`;
  }
  pdpBreadcrumbName.textContent = product.name;

  // Sizes
  renderSizes(product.sizes || []);

  // Material
  pdpMaterial.textContent = product.material || "Premium materials with expert craftsmanship";

  setupInteractions();
  setupShareButton();
  renderReviews();
  renderSuggested(catKey, product.id);
}

function calcDiscount(price, oldPrice) {
  const curr = parseInt(price.replace(/[^\d]/g, ""));
  const old = parseInt(oldPrice.replace(/[^\d]/g, ""));
  const pct = Math.round(((old - curr) / old) * 100);
  return `(${pct}% OFF)`;
}

// -------- Sizes --------
function renderSizes(sizes) {
  pdpSizes.innerHTML = sizes.map(size => `
    <button class="pdp-size-btn" data-size="${size}">${size}</button>
  `).join("");
}

// -------- Interactions --------
function setupInteractions() {
  const whatsappBtn = document.getElementById("pdp-whatsapp-btn");

  function updateWhatsAppLink() {
    const sizeText = selectedSize ? ` | Size: ${selectedSize}` : "";
    const msg = encodeURIComponent(
      `Hi! I'm interested in buying *${currentProduct.name}* (${currentProduct.brand}) at ${currentProduct.price}${sizeText}. Is it available?`
    );
    whatsappBtn.href = `https://wa.me/918830056741?text=${msg}`;
  }

  // Size buttons
  pdpSizes.querySelectorAll(".pdp-size-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      pdpSizes.querySelectorAll(".pdp-size-btn").forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
      selectedSize = btn.dataset.size;
      updateWhatsAppLink();
    });
  });

  whatsappBtn.addEventListener("click", (e) => {
    if (!selectedSize) {
      e.preventDefault();
      showToast("Please select a size first");
      pdpSizes.classList.add("shake");
      setTimeout(() => pdpSizes.classList.remove("shake"), 500);
      return;
    }
  });

  updateWhatsAppLink();
}

// -------- Share Button --------
function setupShareButton() {
  const shareBtn = document.getElementById("pdp-share-btn");
  shareBtn.addEventListener("click", async () => {
    const shareData = {
      title: currentProduct.name,
      text: `Check out ${currentProduct.name} at ${currentProduct.price} on KicksFusion!`,
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        showToast("Link copied to clipboard! 📋");
      }
    } catch (err) {
      // User cancelled share
    }
  });
}

// -------- Reviews --------
function renderReviews() {
  const grid = document.getElementById("pdp-reviews-grid");
  // Show 3 random reviews
  const shuffled = [...REVIEWS].sort(() => Math.random() - 0.5).slice(0, 3);
  grid.innerHTML = shuffled.map(review => {
    const stars = "★".repeat(review.rating) + "☆".repeat(5 - review.rating);
    return `
      <div class="pdp-review-card">
        <div class="pdp-review-header">
          <span class="pdp-review-name">${review.name}</span>
          <span class="pdp-review-date">${review.date}</span>
        </div>
        <div class="pdp-review-stars">${stars}</div>
        <p class="pdp-review-text">"${review.text}"</p>
      </div>
    `;
  }).join("");
}

// -------- Suggested Pairs --------
function renderSuggested(catKey, currentId) {
  const grid = document.getElementById("pdp-suggested-grid");
  if (!catKey || !PRODUCTS[catKey]) return;

  // Get other products from same category, exclude current
  const others = PRODUCTS[catKey].items.filter(p => p.id !== currentId);
  const picks = others.sort(() => Math.random() - 0.5).slice(0, 4);

  grid.innerHTML = picks.map(p => `
    <a href="product.html?id=${p.id}" class="pdp-suggested-card">
      <div class="pdp-suggested-img">
        <img src="${p.image}" alt="${p.name}" loading="lazy" />
      </div>
      <div class="pdp-suggested-info">
        <div class="pdp-suggested-name">${p.name}</div>
        <div class="pdp-suggested-price">${p.price}</div>
      </div>
    </a>
  `).join("");
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

// -------- Init --------
document.addEventListener("DOMContentLoaded", init);
