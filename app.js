/* AgriMart - Complete Application Logic & State Store */

// STATE MANAGEMENT
const state = {
  currentTab: 'dashboard',
  currentLang: 'en',
  villagePoolActive: true,
  villageHub: 'Anandpur Pickup Point',
  cart: [],
  orders: [
    {
      id: 'AM-98401',
      date: '14 Sep 2026',
      items: [
        { name: 'Paddy High-Yield Seeds (PR-126)', qty: 2, price: 650 },
        { name: 'Neem-Coated Subsidized Urea', qty: 3, price: 268 }
      ],
      total: 2104,
      status: 'Ready at Anandpur Hub 📍',
      qrCode: 'GOVT-IN-2026-99482',
      paymentMode: 'Pay at Hub (COD)'
    }
  ],
  userSoilInputs: {
    crop: 'Rice',
    soil: 'Alluvial',
    landArea: 2,
    unit: 'Acres'
  }
};

// MULTI-LANGUAGE DICTIONARY
const i18n = {
  en: {
    brandTag: 'Certified Smart Farming Hub',
    navDashboard: 'Home',
    navBrowse: 'Browse Store',
    navCalc: 'Crop & Soil Calculator',
    navDoctor: 'AI Disease Doctor',
    navSchemes: 'Govt Subsidies',
    navProduce: 'Sell Harvest',
    navOrders: 'Orders & Track',
    heroTitle: 'Smart Inputs & Soil-Based Dosage For Maximum Yield',
    heroSubtitle: 'Combat fake pesticides, cut fertilizer overuse, and join Anandpur Village Pool for 18% bulk savings!',
  },
  hi: {
    brandTag: 'प्रमाणित स्मार्ट कृषि हब',
    navDashboard: 'होम',
    navBrowse: 'स्टोर ब्राउज़ करें',
    navCalc: 'फसल एवं मिट्टी कैलकुलेटर',
    navDoctor: 'एआई बीमारी डॉक्टर',
    navSchemes: 'सरकारी सब्सिडी',
    navProduce: 'उपज बेचें',
    navOrders: 'ऑर्डर और ट्रैक',
    heroTitle: 'अधिकतम उपज के लिए सही मिट्टी-आधारित उर्वरक और बीज',
    heroSubtitle: 'नकली कीटनाशकों से बचें, खाद की अधिकता रोकें और 18% की बचत पाएं!',
  },
  te: {
    brandTag: 'ధృవీకరించబడిన స్మార్ట్ వ్యవసాయ వేదిక',
    navDashboard: 'హోమ్',
    navBrowse: 'స్టోర్ చూడండి',
    navCalc: 'పంట & నేల క్యాలిక్యులేటర్',
    navDoctor: 'AI వ్యాధి డాక్టర్',
    navSchemes: 'ప్రభుత్వ సబ్సిడీలు',
    navProduce: 'పంట అమ్మకం',
    navOrders: 'ఆర్డర్లు',
    heroTitle: 'అధిక దిగుబడి కోసం సరైన ఎరువులు మరియు విత్తనాలు',
    heroSubtitle: 'నకిలీ పురుగుమందులను నివారించండి, ఊరి గ్రాండ్ పూల్‌లో 18% ఆదా చేయండి!',
  },
  ta: {
    brandTag: 'சான்றளிக்கப்பட்ட விவசாய மையம்',
    navDashboard: 'முகப்பு',
    navBrowse: 'கடைகளை உலாவவும்',
    navCalc: 'பயிர் மண் கணக்கீடு',
    navDoctor: 'AI நோய் மருத்துவர்',
    navSchemes: 'அரசு மானியம்',
    navProduce: 'விளைச்சல் விற்பனை',
    navOrders: 'ஆர்டர்கள்',
    heroTitle: 'அதிக மகசூலுக்கு சரியான மண் சார்ந்த உரம் & விதைகள்',
    heroSubtitle: 'போலி பூச்சிக்கொல்லிகளைத் தவிர்க்கவும், 18% தள்ளுபடி பெறவும்!',
  }
};

// COMPREHENSIVE PRODUCTS CATALOG (14+ SEEDS + FERTILIZERS + PESTICIDES)
const PRODUCTS = [
  // SEEDS (14 VARIETIES)
  {
    id: 'seed-rice-1',
    name: 'Paddy High-Yield Seeds (PR-126)',
    category: 'seeds',
    crop: 'Rice',
    price: 650,
    mrp: 850,
    unit: '10 kg bag',
    icon: '🌾',
    govtCertified: true,
    subsidy: '30% Govt Subsidized',
    rating: 4.9,
    batchCode: 'CERT-RICE-2026-01',
    description: 'Short duration (123 days), disease resistant, certified by PAU.'
  },
  {
    id: 'seed-rice-2',
    name: 'Basmati Super Rice Seeds (Pusa 1121)',
    category: 'seeds',
    crop: 'Rice',
    price: 920,
    mrp: 1200,
    unit: '10 kg bag',
    icon: '🌾',
    govtCertified: true,
    subsidy: '25% Govt Subsidized',
    rating: 4.8,
    batchCode: 'CERT-RICE-2026-02',
    description: 'Extra long grain aromatic rice with premium market price.'
  },
  {
    id: 'seed-wheat-1',
    name: 'HD-3086 Wheat Seeds (Pusa Gautami)',
    category: 'seeds',
    crop: 'Wheat',
    price: 580,
    mrp: 750,
    unit: '20 kg bag',
    icon: '🌾',
    govtCertified: true,
    subsidy: '30% Govt Subsidized',
    rating: 4.9,
    batchCode: 'CERT-WHEAT-2026-01',
    description: 'Yellow rust resistant, high tiller density wheat variety.'
  },
  {
    id: 'seed-wheat-2',
    name: 'Sharbati Durum Wheat Seeds (DBW-187)',
    category: 'seeds',
    crop: 'Wheat',
    price: 640,
    mrp: 800,
    unit: '20 kg bag',
    icon: '🌾',
    govtCertified: true,
    subsidy: '20% Govt Subsidized',
    rating: 4.7,
    batchCode: 'CERT-WHEAT-2026-02',
    description: 'High protein golden grain wheat seed.'
  },
  {
    id: 'seed-cotton-1',
    name: 'Bollgard II Bt Cotton Seeds (RCH-659)',
    category: 'seeds',
    crop: 'Cotton',
    price: 860,
    mrp: 1050,
    unit: 'Packet (475g)',
    icon: '☁️',
    govtCertified: true,
    subsidy: 'Govt Approved Hybrid',
    rating: 4.8,
    batchCode: 'CERT-COTTON-2026-01',
    description: 'Bollworm resistant hybrid cotton seed.'
  },
  {
    id: 'seed-maize-1',
    name: 'Hybrid Yellow Maize Seeds (DKC-9108)',
    category: 'seeds',
    crop: 'Maize',
    price: 740,
    mrp: 950,
    unit: '4 kg packet',
    icon: '🌽',
    govtCertified: true,
    subsidy: '20% Subsidy',
    rating: 4.7,
    batchCode: 'CERT-MAIZE-2026-01',
    description: 'High drought tolerance maize for grain & fodder.'
  },
  {
    id: 'seed-groundnut-1',
    name: 'Groundnut High Oil Seeds (TAG-24)',
    category: 'seeds',
    crop: 'Groundnut',
    price: 1100,
    mrp: 1400,
    unit: '15 kg bag',
    icon: '🥜',
    govtCertified: true,
    subsidy: '30% Oilseed Mission',
    rating: 4.6,
    batchCode: 'CERT-GN-2026-01',
    description: 'Early maturing, high kernel shelling percentage.'
  },
  {
    id: 'seed-soybean-1',
    name: 'Soybean Seeds (JS-335 Certified)',
    category: 'seeds',
    crop: 'Soybean',
    price: 890,
    mrp: 1150,
    unit: '15 kg bag',
    icon: '🌱',
    govtCertified: true,
    subsidy: '25% Oilseed Mission',
    rating: 4.8,
    batchCode: 'CERT-SOY-2026-01',
    description: 'Broad leaf high yield soybean seed.'
  },
  {
    id: 'seed-chilli-1',
    name: 'Guntur Red Hot Chilli Seeds (Hybrid)',
    category: 'seeds',
    crop: 'Chilli',
    price: 450,
    mrp: 600,
    unit: '100g packet',
    icon: '🌶️',
    govtCertified: true,
    subsidy: 'Horticulture Subsidized',
    rating: 4.9,
    batchCode: 'CERT-CHILLI-2026-01',
    description: 'High pungency & deep red color chilli variety.'
  },
  {
    id: 'seed-onion-1',
    name: 'Nasik Red Onion Seeds (N-53)',
    category: 'seeds',
    crop: 'Onion',
    price: 520,
    mrp: 700,
    unit: '500g pack',
    icon: '🧅',
    govtCertified: true,
    subsidy: 'Govt Certified',
    rating: 4.7,
    batchCode: 'CERT-ONION-2026-01',
    description: 'Kharif season high storage life onion seeds.'
  },
  {
    id: 'seed-brinjal-1',
    name: 'Purple Round Brinjal Seeds (Hybrid)',
    category: 'seeds',
    crop: 'Brinjal',
    price: 320,
    mrp: 450,
    unit: '100g pack',
    icon: '🍆',
    govtCertified: true,
    subsidy: 'Certified',
    rating: 4.6,
    batchCode: 'CERT-BRINJAL-2026-01',
    description: 'Glossy purple, pest tolerant hybrid eggplants.'
  },
  {
    id: 'seed-okra-1',
    name: 'Okra / Bhindi Seeds (Radhika Hybrid)',
    category: 'seeds',
    crop: 'Okra',
    price: 380,
    mrp: 500,
    unit: '250g pack',
    icon: '🫛',
    govtCertified: true,
    subsidy: 'Yellow Vein Resistant',
    rating: 4.8,
    batchCode: 'CERT-OKRA-2026-01',
    description: 'Dark green tender pods, virus resistant.'
  },
  {
    id: 'seed-tomato-1',
    name: 'Tomato Hybrid Seeds (Abhinav)',
    category: 'seeds',
    crop: 'Tomato',
    price: 490,
    mrp: 650,
    unit: '50g pack',
    icon: '🍅',
    govtCertified: true,
    subsidy: 'High Yield Hybrid',
    rating: 4.9,
    batchCode: 'CERT-TOM-2026-01',
    description: 'Firm fruits ideal for long distance transport.'
  },
  {
    id: 'seed-sugarcane-1',
    name: 'Sugarcane Tissue Culture Sets (Co 0238)',
    category: 'seeds',
    crop: 'Sugarcane',
    price: 1450,
    mrp: 1800,
    unit: '100 sets bundle',
    icon: '🎋',
    govtCertified: true,
    subsidy: 'Cane Dev Subsidy',
    rating: 4.7,
    batchCode: 'CERT-CANE-2026-01',
    description: 'High sugar recovery rate & heavy tillering cane.'
  },

  // FERTILIZERS
  {
    id: 'fert-urea-1',
    name: 'Neem-Coated Subsidized Urea',
    category: 'fertilizers',
    crop: 'All',
    price: 268,
    mrp: 350,
    unit: '45 kg bag',
    icon: '🧪',
    govtCertified: true,
    subsidy: 'DBT Govt Rate Fixed',
    rating: 4.9,
    batchCode: 'GOVT-UREA-2026-99',
    description: 'Slow release 46% Nitrogen coated with pure neem oil.'
  },
  {
    id: 'fert-dap-1',
    name: 'IFFCO Certified DAP Fertilizer (18:46:0)',
    category: 'fertilizers',
    crop: 'All',
    price: 1350,
    mrp: 1590,
    unit: '50 kg bag',
    icon: '🧪',
    govtCertified: true,
    subsidy: '₹240 Subsidy Applied',
    rating: 4.9,
    batchCode: 'IFFCO-DAP-2026-12',
    description: 'Di-Ammonium Phosphate for strong root growth.'
  },
  {
    id: 'fert-npk-1',
    name: 'Complex NPK 19-19-19 Water Soluble',
    category: 'fertilizers',
    crop: 'All',
    price: 480,
    mrp: 650,
    unit: '5 kg pack',
    icon: '🧪',
    govtCertified: true,
    subsidy: 'Micronutrient Boost',
    rating: 4.8,
    batchCode: 'NPK-SOL-2026-04',
    description: '100% water-soluble foliar spray fertilizer.'
  },

  // PESTICIDES & BIO CURES
  {
    id: 'pest-neem-1',
    name: 'Bio-Neem Organic Insecticide (10,000 PPM)',
    category: 'pesticides',
    crop: 'All',
    price: 340,
    mrp: 450,
    unit: '1 Litre bottle',
    icon: '🛡️',
    govtCertified: true,
    subsidy: 'Organic Bio Grant',
    rating: 4.9,
    batchCode: 'BIO-NEEM-2026-88',
    description: 'Eco-friendly pesticide safe for bees & natural predators.'
  },
  {
    id: 'pest-fungi-1',
    name: 'Tricyclazole 75% WP (Rice Blast Cure)',
    category: 'pesticides',
    crop: 'Rice',
    price: 420,
    mrp: 580,
    unit: '250g pack',
    icon: '🛡️',
    govtCertified: true,
    subsidy: 'Systemic Fungicide',
    rating: 4.9,
    batchCode: 'FUNGI-TRIC-2026-09',
    description: 'Specialized fungicide to cure leaf blast and neck blast.'
  }
];

// INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
  renderFeaturedSeeds();
  renderProducts();
  calculateDosage();
  simulateDiseaseAnalysis('rice_blast');
  renderProduceMarket();
  renderOrdersList();
  updateCartUI();
});

// TAB SWITCHING
function switchTab(tabId) {
  state.currentTab = tabId;
  document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
  document.querySelectorAll('.nav-tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.mobile-nav-btn').forEach(btn => btn.classList.remove('active'));

  const activeView = document.getElementById(`view-${tabId}`);
  const activeTab = document.getElementById(`tab-${tabId}`);
  const activeMobTab = document.getElementById(`mob-${tabId}`);

  if (activeView) activeView.classList.add('active');
  if (activeTab) activeTab.classList.add('active');
  if (activeMobTab) activeMobTab.classList.add('active');

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// MULTI-LANGUAGE TOGGLE
function changeLanguage(langCode) {
  state.currentLang = langCode;
  const dict = i18n[langCode] || i18n.en;
  
  if (dict.brandTag) document.getElementById('t-brand-tag').textContent = dict.brandTag;
  if (dict.navDashboard) document.getElementById('t-nav-dashboard').textContent = dict.navDashboard;
  if (dict.navBrowse) document.getElementById('t-nav-browse').textContent = dict.navBrowse;
  if (dict.navCalc) document.getElementById('t-nav-calc').textContent = dict.navCalc;
  if (dict.navDoctor) document.getElementById('t-nav-doctor').textContent = dict.navDoctor;
  if (dict.navSchemes) document.getElementById('t-nav-schemes').textContent = dict.navSchemes;
  if (dict.navProduce) document.getElementById('t-nav-produce').textContent = dict.navProduce;
  if (dict.navOrders) document.getElementById('t-nav-orders').textContent = dict.navOrders;
  if (dict.heroTitle) document.getElementById('t-hero-title').textContent = dict.heroTitle;
  if (dict.heroSubtitle) document.getElementById('t-hero-subtitle').textContent = dict.heroSubtitle;
}

// PRODUCT RENDERING
function renderFeaturedSeeds() {
  const container = document.getElementById('featuredSeedsGrid');
  if (!container) return;
  
  const seeds = PRODUCTS.filter(p => p.category === 'seeds').slice(0, 4);
  container.innerHTML = seeds.map(p => createProductCardHTML(p)).join('');
}

function renderProducts() {
  const container = document.getElementById('mainProductsGrid');
  if (!container) return;
  
  const selectedCat = document.querySelector('input[name="catFilter"]:checked')?.value || 'all';
  const selectedCrop = document.getElementById('cropFilterSelect')?.value || 'all';
  const govtOnly = document.getElementById('govtCertifiedOnly')?.checked || false;
  const searchQuery = document.getElementById('searchInput')?.value.toLowerCase().trim() || '';

  let filtered = PRODUCTS.filter(p => {
    if (selectedCat !== 'all' && p.category !== selectedCat) return false;
    if (selectedCrop !== 'all' && p.crop !== selectedCrop && p.crop !== 'All') return false;
    if (govtOnly && !p.govtCertified) return false;
    if (searchQuery && !p.name.toLowerCase().includes(searchQuery) && !p.crop.toLowerCase().includes(searchQuery)) return false;
    return true;
  });

  container.innerHTML = filtered.length > 0 
    ? filtered.map(p => createProductCardHTML(p)).join('')
    : `<div style="grid-column: 1/-1; text-align:center; padding:40px; color:var(--text-muted);">
         <p style="font-size:2rem;">🌾</p>
         <h3>No matching products found</h3>
         <p>Try adjusting your category or crop filter.</p>
       </div>`;
}

function filterProducts() {
  renderProducts();
}

function handleSearch(val) {
  renderProducts();
}

function createProductCardHTML(product) {
  const cartItem = state.cart.find(item => item.id === product.id);
  const qty = cartItem ? cartItem.qty : 0;
  
  const isVillagePool = document.getElementById('villagePoolToggle')?.checked || state.villagePoolActive;
  const effectivePrice = isVillagePool ? Math.round(product.price * 0.82) : product.price;

  return `
    <div class="product-card">
      <div class="product-badge-group">
        ${product.govtCertified ? '<span class="badge-certified">✅ Govt Certified</span>' : ''}
        ${product.subsidy ? `<span class="badge-subsidy">${product.subsidy}</span>` : ''}
      </div>

      <div class="product-image-container">
        <span>${product.icon}</span>
        <button class="qr-verify-trigger" onclick="openQrModal('${product.id}')">
          📱 Verify QR
        </button>
      </div>

      <div class="product-body">
        <span class="product-category">${product.category.toUpperCase()} • ${product.crop}</span>
        <h3 class="product-name">${product.name}</h3>
        <p class="product-meta">${product.unit} | Rating ⭐ ${product.rating}</p>
        
        ${isVillagePool ? `
          <div class="bulk-pool-banner">
            👥 <strong>Anandpur Village Pool:</strong> Save ₹${product.price - effectivePrice}
          </div>
        ` : ''}

        <div class="product-price-row">
          <span class="price-current">₹${effectivePrice}</span>
          <span class="price-mrp">₹${product.mrp}</span>
        </div>

        ${qty > 0 ? `
          <div class="stepper-btn-group">
            <button class="stepper-btn" onclick="updateQty('${product.id}', -1)">-</button>
            <span class="stepper-count">${qty}</span>
            <button class="stepper-btn" onclick="updateQty('${product.id}', 1)">+</button>
          </div>
        ` : `
          <button class="btn-primary" style="width:100%; justify-center;" onclick="addToCart('${product.id}')">
            + Add To Cart
          </button>
        `}
      </div>
    </div>
  `;
}

// CART ACTIONS
function addToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existing = state.cart.find(item => item.id === productId);
  if (existing) {
    existing.qty++;
  } else {
    state.cart.push({ ...product, qty: 1 });
  }

  updateCartUI();
  renderProducts();
  renderFeaturedSeeds();
}

function updateQty(productId, delta) {
  const existing = state.cart.find(item => item.id === productId);
  if (!existing) return;

  existing.qty += delta;
  if (existing.qty <= 0) {
    state.cart = state.cart.filter(item => item.id !== productId);
  }

  updateCartUI();
  renderProducts();
  renderFeaturedSeeds();
}

function updateCartUI() {
  const isVillagePool = document.getElementById('villagePoolToggle')?.checked || state.villagePoolActive;
  
  let totalItems = 0;
  let subtotal = 0;
  let totalSubsidy = 0;

  state.cart.forEach(item => {
    totalItems += item.qty;
    subtotal += item.mrp * item.qty;
    totalSubsidy += (item.mrp - item.price) * item.qty;
  });

  const villageDiscount = isVillagePool ? Math.round((subtotal - totalSubsidy) * 0.18) : 0;
  const finalPayable = Math.max(0, subtotal - totalSubsidy - villageDiscount);

  // Update badges
  document.getElementById('cartCountBadge').textContent = totalItems;
  document.getElementById('cartDrawerCount').textContent = totalItems;

  // Render items in cart drawer
  const cartBody = document.getElementById('cartBody');
  if (state.cart.length === 0) {
    cartBody.innerHTML = `
      <div style="text-align:center; padding:40px; color:var(--text-muted);">
        <p style="font-size:3rem;">🛒</p>
        <p>Your cart is empty.</p>
        <button class="btn-secondary" style="margin-top:14px;" onclick="switchTab('browse'); toggleCartDrawer();">
          Browse Store
        </button>
      </div>
    `;
  } else {
    cartBody.innerHTML = state.cart.map(item => `
      <div class="cart-item">
        <div class="cart-item-img">${item.icon}</div>
        <div style="flex:1;">
          <h4 style="font-size:0.95rem;">${item.name}</h4>
          <p style="font-size:0.8rem; color:var(--text-muted);">₹${item.price} x ${item.qty}</p>
        </div>
        <div class="stepper-btn-group" style="padding:2px;">
          <button class="stepper-btn" style="width:26px; height:26px; font-size:0.9rem;" onclick="updateQty('${item.id}', -1)">-</button>
          <span style="font-weight:700; padding:0 6px; font-size:0.85rem;">${item.qty}</span>
          <button class="stepper-btn" style="width:26px; height:26px; font-size:0.9rem;" onclick="updateQty('${item.id}', 1)">+</button>
        </div>
      </div>
    `).join('');
  }

  document.getElementById('cartSubtotal').textContent = `₹${subtotal}`;
  document.getElementById('cartSubsidy').textContent = `-₹${totalSubsidy}`;
  document.getElementById('cartVillageDiscount').textContent = `-₹${villageDiscount}`;
  document.getElementById('cartTotalPayable').textContent = `₹${finalPayable}`;
}

function toggleCartDrawer() {
  document.getElementById('cartDrawer').classList.toggle('open');
  document.getElementById('cartOverlay').classList.toggle('open');
}

// PLACE ORDER
function placeOrder() {
  if (state.cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }

  const isVillagePool = document.getElementById('villagePoolToggle')?.checked || state.villagePoolActive;
  let subtotal = 0;
  let totalSubsidy = 0;

  state.cart.forEach(item => {
    subtotal += item.mrp * item.qty;
    totalSubsidy += (item.mrp - item.price) * item.qty;
  });

  const villageDiscount = isVillagePool ? Math.round((subtotal - totalSubsidy) * 0.18) : 0;
  const finalPayable = Math.max(0, subtotal - totalSubsidy - villageDiscount);
  const paymentMode = document.getElementById('paymentMethodSelect').value;
  const newOrderId = `AM-${Math.floor(10000 + Math.random() * 90000)}`;

  const orderObj = {
    id: newOrderId,
    date: '15 Sep 2026',
    items: state.cart.map(i => ({ name: i.name, qty: i.qty, price: i.price })),
    total: finalPayable,
    status: 'Confirmed - Scheduled for Anandpur Hub Pickup 📍',
    qrCode: `GOVT-IN-2026-${Math.floor(10000 + Math.random() * 90000)}`,
    paymentMode: paymentMode === 'kisan_emi' ? 'Kisan Credit (0% Interest EMI)' : paymentMode.toUpperCase()
  };

  state.orders.unshift(orderObj);
  state.cart = [];
  
  updateCartUI();
  toggleCartDrawer();
  renderOrdersList();
  renderProducts();

  alert(`🎉 Order Placed Successfully!\n\nOrder ID: ${newOrderId}\nTotal: ₹${finalPayable}\nDelivery: Free Anandpur Village Hub Pickup\n\nVerify your Lab Receipt in the Orders tab.`);
  switchTab('orders');
}

// CROP & SOIL CALCULATOR LOGIC
function calculateDosage() {
  const crop = document.getElementById('calcCrop')?.value || 'Rice';
  const soil = document.getElementById('calcSoil')?.value || 'Alluvial';
  const landArea = parseFloat(document.getElementById('calcLandArea')?.value) || 2;
  const unit = document.getElementById('calcLandUnit')?.value || 'Acres';

  let acreMultiplier = landArea;
  if (unit === 'Bigha') acreMultiplier = landArea * 0.4;
  if (unit === 'Hectares') acreMultiplier = landArea * 2.47;

  // Base Dosage Matrix
  const dosageMap = {
    Rice: { ureaBags: 2.5, dapBags: 1, potashKg: 20, seedKg: 10, pesticide: 'Tricyclazole Fungicide (250g)' },
    Wheat: { ureaBags: 2.0, dapBags: 1, potashKg: 15, seedKg: 20, pesticide: 'Neem Oil Bio-Insecticide (1L)' },
    Cotton: { ureaBags: 3.0, dapBags: 1.5, potashKg: 25, seedKg: 1, pesticide: 'Bt Insecticide Spray (500ml)' },
    Maize: { ureaBags: 2.2, dapBags: 1.2, potashKg: 18, seedKg: 4, pesticide: 'Bio Insecticide (1L)' },
    Tomato: { ureaBags: 1.8, dapBags: 1, potashKg: 22, seedKg: 0.1, pesticide: 'Mancozeb Spray (250g)' }
  };

  const base = dosageMap[crop] || dosageMap.Rice;
  const ureaTotal = Math.ceil(base.ureaBags * acreMultiplier);
  const dapTotal = Math.ceil(base.dapBags * acreMultiplier);
  const seedTotal = Math.round(base.seedKg * acreMultiplier * 10) / 10;

  const resultBox = document.getElementById('calcResultBox');
  if (!resultBox) return;

  resultBox.innerHTML = `
    <h3 style="color:#065f46; font-size:1.2rem; margin-bottom:6px;">
      🌿 Precision Dosage Plan for ${landArea} ${unit} of ${crop} (${soil} Soil)
    </h3>
    <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:16px;">
      Calculates ideal nutrient ratio to maximize yield & avoid chemical overuse.
    </p>

    <div class="recommendation-list">
      <div class="rec-item-card">
        <div>
          <span style="font-size:1.5rem;">🧪</span>
          <h4 style="margin:4px 0;">Subsidized Urea</h4>
          <p style="font-size:0.85rem; color:var(--text-muted);">${ureaTotal} bags (45 kg each)</p>
          <strong style="color:var(--primary); font-size:1.1rem;">₹${ureaTotal * 268}</strong>
        </div>
        <button class="btn-primary" onclick="addToCart('fert-urea-1')">+ Add ${ureaTotal} Bags</button>
      </div>

      <div class="rec-item-card">
        <div>
          <span style="font-size:1.5rem;">🧪</span>
          <h4 style="margin:4px 0;">IFFCO DAP</h4>
          <p style="font-size:0.85rem; color:var(--text-muted);">${dapTotal} bags (50 kg each)</p>
          <strong style="color:var(--primary); font-size:1.1rem;">₹${dapTotal * 1350}</strong>
        </div>
        <button class="btn-primary" onclick="addToCart('fert-dap-1')">+ Add ${dapTotal} Bags</button>
      </div>

      <div class="rec-item-card">
        <div>
          <span style="font-size:1.5rem;">🌾</span>
          <h4 style="margin:4px 0;">Certified Seeds</h4>
          <p style="font-size:0.85rem; color:var(--text-muted);">${seedTotal} kg high-yield variety</p>
          <strong style="color:var(--primary); font-size:1.1rem;">Govt Certified</strong>
        </div>
        <button class="btn-gold" onclick="switchTab('browse')">Browse ${crop} Seeds</button>
      </div>
    </div>
  `;
}

// AI CROP DISEASE DOCTOR DIAGNOSIS
function simulateDiseaseAnalysis(type) {
  const container = document.getElementById('diagnosisResultCard');
  if (!container) return;

  const diseaseData = {
    rice_blast: {
      crop: 'Rice / Paddy',
      disease: 'Rice Leaf Blast (Magnaporthe oryzae)',
      severity: 'Moderate - High Spreading Risk',
      symptoms: 'Spindle-shaped lesions with grayish center on leaves.',
      solution: 'Tricyclazole 75% WP Spray',
      productId: 'pest-fungi-1',
      price: 420
    },
    cotton_bollworm: {
      crop: 'Cotton',
      disease: 'Pink Bollworm Infestation',
      severity: 'High Severity',
      symptoms: 'Bores into cotton bolls causing premature drop.',
      solution: 'Bio-Neem Organic 10,000 PPM Spray',
      productId: 'pest-neem-1',
      price: 340
    },
    wheat_rust: {
      crop: 'Wheat',
      disease: 'Puccinia Yellow Rust',
      severity: 'Low - Early Stage',
      symptoms: 'Yellow stripe pustules on leaf surface.',
      solution: 'Propiconazole 25% EC Fungicide',
      productId: 'pest-fungi-1',
      price: 420
    },
    tomato_blight: {
      crop: 'Tomato',
      disease: 'Early Blight (Alternaria solani)',
      severity: 'Moderate',
      symptoms: 'Concentric rings / target spots on lower leaves.',
      solution: 'Mancozeb 75% WP Bio Shield',
      productId: 'pest-neem-1',
      price: 340
    }
  };

  const info = diseaseData[type] || diseaseData.rice_blast;

  container.innerHTML = `
    <div style="display:flex; align-items:center; gap:8px; margin-bottom:12px;">
      <span class="badge-certified" style="background:var(--danger);">⚠️ AI Diagnostic Alert</span>
      <span style="font-size:0.8rem; color:var(--text-muted);">98.4% Confidence</span>
    </div>

    <h3 style="font-size:1.3rem; margin-bottom:6px;">${info.disease}</h3>
    <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:14px;">Target Crop: <strong>${info.crop}</strong> | Status: <strong style="color:var(--danger);">${info.severity}</strong></p>

    <div style="background:#fff1f2; border:1px solid #fecdd3; border-radius:var(--radius-sm); padding:12px; font-size:0.88rem; color:#9f1239; margin-bottom:16px;">
      🔍 <strong>Symptoms Detected:</strong> ${info.symptoms}
    </div>

    <h4 style="font-size:0.95rem; margin-bottom:8px;">Recommended Government-Certified Cure:</h4>
    <div style="background:#f0fdf4; border:1px solid #bbf7d0; border-radius:var(--radius-md); padding:16px; display:flex; justify-content:space-between; align-items:center; gap:10px;">
      <div>
        <h4 style="color:#166534;">${info.solution}</h4>
        <p style="font-size:0.8rem; color:#15803d;">Certified 100% genuine formulation</p>
        <strong style="font-size:1.1rem; color:var(--primary);">₹${info.price}</strong>
      </div>
      <button class="btn-primary" onclick="addToCart('${info.productId}')">
        + Add Cure To Cart
      </button>
    </div>
  `;
}

// PRODUCE MARKETPLACE
function renderProduceMarket() {
  const grid = document.getElementById('produceMarketGrid');
  if (!grid) return;

  const items = [
    { crop: 'Basmati Rice (1121)', msp: '₹4,600 / Quintal', buyer: 'Govt FCI Agency', demand: 'High' },
    { crop: 'Sharbati Wheat (HD-3086)', msp: '₹2,275 / Quintal', buyer: 'AgriMart Direct Processing', demand: 'Very High' },
    { crop: 'Bt Cotton (Long Staple)', msp: '₹7,020 / Quintal', buyer: 'Textile Co-Op Hub', demand: 'Medium' },
    { crop: 'Yellow Soybean', msp: '₹4,892 / Quintal', buyer: 'Oilseed Federation', demand: 'High' }
  ];

  grid.innerHTML = items.map(item => `
    <div class="produce-card">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <h4 style="font-size:1.05rem;">${item.crop}</h4>
        <span class="badge-certified">${item.demand} Demand</span>
      </div>
      <p style="font-size:1.2rem; font-weight:800; color:var(--primary);">${item.msp}</p>
      <p style="font-size:0.8rem; color:var(--text-muted);">Contract Partner: ${item.buyer}</p>
      <button class="btn-secondary" style="margin-top:auto;" onclick="alert('Harvest buyback contract locked! Pickup scheduled at Anandpur Hub upon harvest.')">
        Lock In Rate & Sell
      </button>
    </div>
  `).join('');
}

function listHarvestProduce() {
  const crop = document.getElementById('sellCropName').value;
  const qty = document.getElementById('sellQty').value;
  alert(`✅ Successfully Listed!\n\nYour expected yield of ${qty} Quintals of ${crop} has been registered with AgriMart Anandpur Hub. Contract price guaranteed.`);
}

// ORDERS LIST RENDERING
function renderOrdersList() {
  const container = document.getElementById('ordersListContainer');
  if (!container) return;

  if (state.orders.length === 0) {
    container.innerHTML = `<p style="color:var(--text-muted);">No orders placed yet.</p>`;
    return;
  }

  container.innerHTML = state.orders.map(order => `
    <div style="background:white; border:1px solid var(--light-border); border-radius:var(--radius-lg); padding:24px; margin-bottom:20px; box-shadow:var(--shadow-sm);">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:14px; padding-bottom:12px; border-bottom:1px solid var(--light-border);">
        <div>
          <h3 style="font-size:1.1rem;">Order #${order.id}</h3>
          <span style="font-size:0.8rem; color:var(--text-muted);">Placed on ${order.date} | Payment: ${order.paymentMode}</span>
        </div>
        <span class="badge-certified" style="font-size:0.85rem; padding:6px 12px;">${order.status}</span>
      </div>

      <div style="margin-bottom:14px;">
        ${order.items.map(item => `
          <div style="display:flex; justify-content:space-between; font-size:0.9rem; margin-bottom:4px;">
            <span>${item.name} x ${item.qty}</span>
            <strong>₹${item.price * item.qty}</strong>
          </div>
        `).join('')}
      </div>

      <div style="display:flex; justify-content:space-between; align-items:center; background:#f8fafc; padding:12px 16px; border-radius:var(--radius-md);">
        <div>
          <span style="font-size:0.8rem; color:var(--text-muted);">Digital QR Receipt:</span>
          <p style="font-family:monospace; font-weight:700; color:var(--primary); font-size:0.9rem;">${order.qrCode}</p>
        </div>
        <div>
          <strong style="font-size:1.2rem; margin-right:10px;">Total: ₹${order.total}</strong>
          <button class="btn-secondary" onclick="openQrModalWithData('${order.items[0]?.name || 'Agri Product'}', '${order.qrCode}')">📱 View QR Certificate</button>
        </div>
      </div>
    </div>
  `).join('');
}

// MODAL CONTROLS & VOICE ASSISTANT SIMULATION
function openQrModal(productId) {
  const prod = PRODUCTS.find(p => p.id === productId) || PRODUCTS[0];
  document.getElementById('qrProductName').textContent = prod.name;
  document.getElementById('qrBatchCode').textContent = `QR-BATCH: ${prod.batchCode}`;
  document.getElementById('qrModal').classList.add('open');
}

function openQrModalWithData(name, batchCode) {
  document.getElementById('qrProductName').textContent = name;
  document.getElementById('qrBatchCode').textContent = `QR-BATCH: ${batchCode}`;
  document.getElementById('qrModal').classList.add('open');
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.remove('open');
}

function openVoiceModal() {
  document.getElementById('voiceModal').classList.add('open');
}

function simulateVoiceQuery(text) {
  document.getElementById('voiceStatusText').textContent = `Processing speech: "${text}"...`;
  setTimeout(() => {
    closeModal('voiceModal');
    if (text.includes('rice')) {
      switchTab('browse');
      document.getElementById('searchInput').value = 'rice';
      renderProducts();
    } else if (text.includes('fertilizer') || text.includes('calculate')) {
      switchTab('calculator');
    } else if (text.includes('subsidy')) {
      switchTab('schemes');
    } else {
      switchTab('browse');
    }
  }, 1000);
}

function openSoilUploadModal() {
  document.getElementById('soilModal').classList.add('open');
}

function simulateSoilReportParsing() {
  closeModal('soilModal');
  alert('✅ Soil Report Analyzed!\n\nExtracted NPK Ratio: Nitrogen (Low), Phosphorus (Medium), Potassium (High).\n\nRecommendations updated in Crop & Soil Calculator.');
  switchTab('calculator');
}
