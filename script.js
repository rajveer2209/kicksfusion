/* ==============================================
   KICKSFUSION — Homepage JavaScript
   ============================================== */

// -------- STATE --------
let cartCount = 0;
let currentSlide = 0;
let slideInterval;

// -------- DOM --------
const els = {
  hamburger: document.getElementById("hamburger"),
  mobileMenu: document.getElementById("mobile-menu"),
  mobileMenuClose: document.getElementById("mobile-menu-close"),
  menuOverlay: document.getElementById("menu-overlay"),
  searchToggle: document.getElementById("search-toggle"),
  searchOverlay: document.getElementById("search-overlay"),
  searchClose: document.getElementById("search-close"),
  searchInput: document.getElementById("search-input"),
  cartBadge: document.getElementById("cart-badge"),
  carouselPrev: document.getElementById("carousel-prev"),
  carouselNext: document.getElementById("carousel-next"),
  carouselDots: document.getElementById("carousel-dots"),
  newsletterForm: document.getElementById("newsletter-form"),
  toast: document.getElementById("toast"),
  toastMsg: document.getElementById("toast-msg"),
};

// -------- MOBILE MENU --------
function openMenu() {
  els.mobileMenu.classList.add("open");
  els.menuOverlay.classList.add("show");
  document.body.style.overflow = "hidden";
}
function closeMenu() {
  els.mobileMenu.classList.remove("open");
  els.menuOverlay.classList.remove("show");
  document.body.style.overflow = "";
}

els.hamburger.addEventListener("click", openMenu);
els.mobileMenuClose.addEventListener("click", closeMenu);
els.menuOverlay.addEventListener("click", closeMenu);

document.querySelectorAll(".mobile-menu-links a").forEach(link => {
  link.addEventListener("click", closeMenu);
});

// -------- SEARCH --------
function openSearch() {
  els.searchOverlay.classList.add("open");
  setTimeout(() => els.searchInput.focus(), 350);
}
function closeSearch() {
  els.searchOverlay.classList.remove("open");
}

els.searchToggle.addEventListener("click", openSearch);
els.searchClose.addEventListener("click", closeSearch);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeSearch();
    closeMenu();
  }
});

// -------- CAROUSEL --------
const slides = document.querySelectorAll(".carousel-slide");

function initCarousel() {
  if (!els.carouselDots || slides.length <= 1) return;
  slides.forEach((_, i) => {
    const dot = document.createElement("div");
    dot.className = `carousel-dot ${i === 0 ? "active" : ""}`;
    dot.addEventListener("click", () => goToSlide(i));
    els.carouselDots.appendChild(dot);
  });
  startAutoSlide();
}

function goToSlide(index) {
  if (!els.carouselDots) return;
  slides[currentSlide].classList.remove("active");
  els.carouselDots.children[currentSlide].classList.remove("active");
  currentSlide = (index + slides.length) % slides.length;
  slides[currentSlide].classList.add("active");
  els.carouselDots.children[currentSlide].classList.add("active");
}

function nextSlide() { goToSlide(currentSlide + 1); }
function prevSlide() { goToSlide(currentSlide - 1); }

function startAutoSlide() {
  clearInterval(slideInterval);
  if (slides.length > 1) {
    slideInterval = setInterval(nextSlide, 5000);
  }
}

if (els.carouselNext) els.carouselNext.addEventListener("click", () => { nextSlide(); startAutoSlide(); });
if (els.carouselPrev) els.carouselPrev.addEventListener("click", () => { prevSlide(); startAutoSlide(); });

// -------- SWIPE SUPPORT --------
function setupSwipe() {
  const track = document.getElementById("carousel-track");
  if (!track) return;

  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  track.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      startAutoSlide();
    }
  }, { passive: true });
}

// -------- HERO → SMOOTH SCROLL TO CATEGORIES --------
document.querySelectorAll('.slide-btn[href="#categories"]').forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.getElementById("categories");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// -------- TOAST --------
function showToast(msg) {
  els.toastMsg.textContent = msg;
  els.toast.classList.add("show");
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => {
    els.toast.classList.remove("show");
  }, 3000);
}

// -------- NEWSLETTER --------
els.newsletterForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("newsletter-email").value;
  if (email) {
    showToast("You're in! Welcome to the KicksFusion crew 🎉");
    els.newsletterForm.reset();
  }
});

// -------- SCROLL REVEAL + CATEGORY ANIMATIONS --------
function setupReveal() {
  // Standard reveal elements
  const revealEls = document.querySelectorAll(".promo-banner, .experience-section, .brand-marquee, .newsletter-section, .category-section");
  revealEls.forEach(el => el.classList.add("reveal"));

  // Category card staggered reveal
  const catCards = document.querySelectorAll(".cat-animate");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
  );

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
  catCards.forEach(el => observer.observe(el));
}

// -------- INIT --------
document.addEventListener("DOMContentLoaded", () => {
  initCarousel();
  setupSwipe();
  setupReveal();
});
