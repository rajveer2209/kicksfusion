/* ==============================================
   KICKSFUSION — Admin Dashboard Logic
   ============================================== */

const ADMIN_USER = "rajveer22";
const ADMIN_PASS = "rajveer2209@KF";
const STORAGE_KEY = "kf_admin_products";
const SESSION_KEY = "kf_admin_session";

const ALL_SIZE_OPTIONS = ["UK 6","UK 7","UK 8","UK 9","UK 10","UK 11","UK 12"];

// -------- DOM --------
const loginScreen = document.getElementById("login-screen");
const dashboard = document.getElementById("dashboard");
const loginBtn = document.getElementById("login-btn");
const loginUser = document.getElementById("login-user");
const loginPass = document.getElementById("login-pass");
const loginError = document.getElementById("login-error");
const logoutBtn = document.getElementById("dash-logout");
const addProductBtn = document.getElementById("add-product-btn");
const modalOverlay = document.getElementById("modal-overlay");
const modalClose = document.getElementById("modal-close");
const modalCancel = document.getElementById("modal-cancel");
const modalSave = document.getElementById("modal-save");
const modalTitle = document.getElementById("modal-title");
const productTbody = document.getElementById("product-tbody");
const imageUploadArea = document.getElementById("image-upload-area");
const imageInput = document.getElementById("image-input");
const imagePreviews = document.getElementById("image-previews");
const sizesGrid = document.getElementById("sizes-grid");
const toastEl = document.getElementById("admin-toast");

let uploadedImages = [];
let editingProductId = null;

// -------- AUTH --------
function checkSession() {
  const s = sessionStorage.getItem(SESSION_KEY);
  if (s === ADMIN_USER) { showDashboard(); }
  else { showLogin(); }
}

function showLogin() {
  loginScreen.style.display = "flex";
  dashboard.style.display = "none";
}

function showDashboard() {
  loginScreen.style.display = "none";
  dashboard.style.display = "block";
  document.getElementById("dash-username").textContent = ADMIN_USER;
  document.getElementById("dash-avatar").textContent = ADMIN_USER.charAt(0).toUpperCase();
  renderStats();
  renderProductTable();
}

loginBtn.addEventListener("click", doLogin);
loginPass.addEventListener("keydown", e => { if (e.key === "Enter") doLogin(); });
loginUser.addEventListener("keydown", e => { if (e.key === "Enter") loginPass.focus(); });

function doLogin() {
  const u = loginUser.value.trim();
  const p = loginPass.value;
  if (u === ADMIN_USER && p === ADMIN_PASS) {
    sessionStorage.setItem(SESSION_KEY, ADMIN_USER);
    loginError.textContent = "";
    showDashboard();
  } else {
    loginError.textContent = "Invalid username or password";
    loginPass.value = "";
  }
}

logoutBtn.addEventListener("click", () => {
  sessionStorage.removeItem(SESSION_KEY);
  showLogin();
  loginUser.value = "";
  loginPass.value = "";
});

// -------- DYNAMIC PRODUCTS (localStorage) --------
function getAdminProducts() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
  catch { return []; }
}

function saveAdminProducts(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

function getAllProductsFlat() {
  const dynamic = getAdminProducts();
  const dynamicIds = new Set(dynamic.map(p => p.id));

  const built = [];
  for (const [key, cat] of Object.entries(PRODUCTS)) {
    for (const p of cat.items) {
      // Skip built-in if overridden by admin edit
      if (dynamicIds.has(p.id)) continue;
      built.push({ ...p, _category: key, _source: "built-in" });
    }
  }
  const dynMapped = dynamic.map(p => ({ ...p, _source: "dynamic" }));
  return [...built, ...dynMapped];
}

// -------- STATS --------
function renderStats() {
  const all = getAllProductsFlat();
  const dynamic = all.filter(p => p._source === "dynamic");
  const cats = {};
  all.forEach(p => { const c = p._category || "unknown"; cats[c] = (cats[c] || 0) + 1; });

  const statsHTML = `
    <div class="stat-card">
      <div class="stat-label">Total Products</div>
      <div class="stat-value accent">${all.length}</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">Admin Added</div>
      <div class="stat-value">${dynamic.length}</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">Categories</div>
      <div class="stat-value">${Object.keys(cats).length}</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">On Sale</div>
      <div class="stat-value">${all.filter(p => p.oldPrice).length}</div>
    </div>
  `;
  document.getElementById("dash-stats").innerHTML = statsHTML;
}

// -------- PRODUCT TABLE --------
function renderProductTable() {
  const all = getAllProductsFlat();
  if (all.length === 0) {
    productTbody.innerHTML = `<tr><td colspan="6" style="text-align:center;padding:40px;color:var(--admin-muted);">No products yet. Click "Add Product" to start.</td></tr>`;
    return;
  }

  // Store all products globally so edit can access them
  window._allDashProducts = all;

  productTbody.innerHTML = all.map((p, idx) => {
    const img = (p.images && p.images[0]) || p.image || "";
    const imgSrc = img.startsWith("data:") ? img : img;
    const cat = p._category || "—";
    const badgeClass = `badge-${cat}`;
    const oldP = p.oldPrice ? `<span class="table-old-price">${p.oldPrice}</span>` : "";
    const sizeCount = p.sizes ? p.sizes.length : 0;
    const editBtn = `<button class="tbl-btn" onclick="editProduct(${idx})">Edit</button>`;
    const deleteBtn = `<button class="tbl-btn delete" onclick="deleteProduct(${p.id})">Delete</button>`;

    return `
      <tr>
        <td><img class="table-img" src="${imgSrc}" alt="${p.name}" onerror="this.src='af1_1.jpg'" /></td>
        <td style="font-weight:700;max-width:220px;">${p.name}</td>
        <td><span class="table-badge ${badgeClass}">${cat}</span></td>
        <td><span class="table-price">${p.price}</span> ${oldP}</td>
        <td>${sizeCount} sizes</td>
        <td class="table-actions">${editBtn} ${deleteBtn}</td>
      </tr>
    `;
  }).join("");
}

// -------- EDIT --------
window.editProduct = function(idx) {
  const p = window._allDashProducts[idx];
  if (!p) return;
  openModal(p);
};

// -------- DELETE --------
window.deleteProduct = function(id) {
  if (!confirm("Delete this product?")) return;
  let list = getAdminProducts();
  list = list.filter(p => p.id !== id);
  saveAdminProducts(list);
  renderStats();
  renderProductTable();
  showToast("Product deleted");
};

// -------- MODAL --------
function openModal(editProduct) {
  editingProductId = editProduct ? editProduct.id : null;
  modalTitle.textContent = editProduct ? "Edit Product" : "Add New Product";
  document.getElementById("prod-name").value = editProduct ? editProduct.name : "";
  document.getElementById("prod-brand").value = editProduct ? editProduct.brand : "";
  document.getElementById("prod-price").value = editProduct ? parseInt(editProduct.price.replace(/[^\d]/g,"")) : "";
  document.getElementById("prod-old-price").value = editProduct && editProduct.oldPrice ? parseInt(editProduct.oldPrice.replace(/[^\d]/g,"")) : "";
  document.getElementById("prod-category").value = editProduct ? (editProduct._category || "casual") : "casual";
  document.getElementById("prod-badge").value = editProduct ? (editProduct.badge || "") : "";
  document.getElementById("prod-material").value = editProduct ? (editProduct.material || "") : "";
  document.getElementById("prod-desc").value = editProduct ? (editProduct.description || "") : "";

  uploadedImages = editProduct && editProduct.images ? [...editProduct.images] : [];
  renderImagePreviews();
  renderSizeCheckboxes(editProduct ? editProduct.sizes : ALL_SIZE_OPTIONS);

  modalOverlay.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modalOverlay.classList.remove("open");
  document.body.style.overflow = "";
  uploadedImages = [];
  editingProductId = null;
}

addProductBtn.addEventListener("click", () => openModal(null));
modalClose.addEventListener("click", closeModal);
modalCancel.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", e => { if (e.target === modalOverlay) closeModal(); });

// -------- SIZES CHECKBOXES --------
function renderSizeCheckboxes(selectedSizes) {
  const sel = selectedSizes || [];
  sizesGrid.innerHTML = ALL_SIZE_OPTIONS.map(s => {
    const checked = sel.includes(s) ? "checked" : "";
    const id = `sz-${s.replace(/\s/g,"")}`;
    return `<input type="checkbox" class="size-check" id="${id}" value="${s}" ${checked}><label class="size-label" for="${id}">${s}</label>`;
  }).join("");
}

// -------- IMAGE UPLOAD --------
imageUploadArea.addEventListener("click", () => imageInput.click());
imageUploadArea.addEventListener("dragover", e => { e.preventDefault(); imageUploadArea.classList.add("dragover"); });
imageUploadArea.addEventListener("dragleave", () => imageUploadArea.classList.remove("dragover"));
imageUploadArea.addEventListener("drop", e => {
  e.preventDefault();
  imageUploadArea.classList.remove("dragover");
  handleFiles(e.dataTransfer.files);
});
imageInput.addEventListener("change", e => handleFiles(e.target.files));

function handleFiles(files) {
  for (const file of files) {
    if (!file.type.startsWith("image/")) continue;
    if (file.size > 5 * 1024 * 1024) { showToast("Image too large (max 5MB)", true); continue; }
    const reader = new FileReader();
    reader.onload = (ev) => {
      // Resize for storage
      resizeImage(ev.target.result, 1200, (resized) => {
        uploadedImages.push(resized);
        renderImagePreviews();
      });
    };
    reader.readAsDataURL(file);
  }
}

function resizeImage(dataUrl, maxDim, callback) {
  const img = new Image();
  img.onload = () => {
    let w = img.width, h = img.height;
    if (w > maxDim || h > maxDim) {
      if (w > h) { h = Math.round(h * maxDim / w); w = maxDim; }
      else { w = Math.round(w * maxDim / h); h = maxDim; }
    }
    const canvas = document.createElement("canvas");
    canvas.width = w; canvas.height = h;
    canvas.getContext("2d").drawImage(img, 0, 0, w, h);
    callback(canvas.toDataURL("image/jpeg", 0.95));
  };
  img.src = dataUrl;
}

function renderImagePreviews() {
  imagePreviews.innerHTML = uploadedImages.map((src, i) =>
    `<div class="img-preview">
      <img src="${src}" alt="Preview ${i+1}" onerror="this.parentElement.remove()" />
      <div class="img-remove" onclick="removeImage(${i})">✕</div>
    </div>`
  ).join("");
}

window.removeImage = function(i) {
  uploadedImages.splice(i, 1);
  renderImagePreviews();
};

// -------- SAVE PRODUCT --------
modalSave.addEventListener("click", () => {
  const name = document.getElementById("prod-name").value.trim();
  const brand = document.getElementById("prod-brand").value.trim();
  const priceVal = document.getElementById("prod-price").value.trim();
  const oldPriceVal = document.getElementById("prod-old-price").value.trim();
  const category = document.getElementById("prod-category").value;
  const badge = document.getElementById("prod-badge").value;
  const material = document.getElementById("prod-material").value.trim();
  const desc = document.getElementById("prod-desc").value.trim();

  // Get selected sizes
  const sizes = [];
  sizesGrid.querySelectorAll(".size-check:checked").forEach(cb => sizes.push(cb.value));

  // Validate
  if (!name) { showToast("Product title is required", true); return; }
  if (!brand) { showToast("Brand is required", true); return; }
  if (!priceVal) { showToast("Price is required", true); return; }
  if (uploadedImages.length === 0) { showToast("Add at least one image", true); return; }
  if (sizes.length === 0) { showToast("Select at least one size", true); return; }

  const price = `₹${Number(priceVal).toLocaleString("en-IN")}`;
  const oldPrice = oldPriceVal ? `₹${Number(oldPriceVal).toLocaleString("en-IN")}` : null;

  let list = getAdminProducts();
  const id = editingProductId || (Date.now() + Math.floor(Math.random() * 1000));

  // When editing, also remove any existing entry with same ID to avoid duplicates
  list = list.filter(p => p.id !== id);

  const product = {
    id, name, brand, price, oldPrice,
    image: uploadedImages[0],
    images: uploadedImages,
    badge: badge || null,
    material: material || "Premium materials",
    sizes, description: desc,
    _category: category
  };

  // Always push (we already filtered out the old entry above)
  list.push(product);

  saveAdminProducts(list);
  closeModal();
  renderStats();
  renderProductTable();
  showToast(editingProductId ? "Product updated!" : "Product added successfully!");
});

// -------- TOAST --------
function showToast(msg, isError) {
  toastEl.textContent = msg;
  toastEl.className = "admin-toast show" + (isError ? " error" : "");
  clearTimeout(window._adminToastTimer);
  window._adminToastTimer = setTimeout(() => { toastEl.className = "admin-toast"; }, 3000);
}

// -------- INIT --------
checkSession();
