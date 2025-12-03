// HairBook Mobile - iPad POS Interface

// Custom Modal Functions
function showAlert(message, title = 'Informace', icon = 'ℹ️') {
    return new Promise((resolve) => {
        const modal = document.getElementById('alertModal');
        const iconEl = document.getElementById('alertIcon');
        const titleEl = document.getElementById('alertTitle');
        const messageEl = document.getElementById('alertMessage');
        const okBtn = document.getElementById('alertOk');

        iconEl.textContent = icon;
        titleEl.textContent = title;
        messageEl.textContent = message;
        modal.style.display = 'flex';

        const handleClose = () => {
            modal.style.display = 'none';
            okBtn.removeEventListener('click', handleClose);
            resolve();
        };

        okBtn.addEventListener('click', handleClose);
    });
}

function showConfirm(message, title = 'Potvrzení') {
    return new Promise((resolve) => {
        const modal = document.getElementById('confirmModal');
        const titleEl = document.getElementById('confirmTitle');
        const messageEl = document.getElementById('confirmMessage');
        const yesBtn = document.getElementById('confirmYes');
        const noBtn = document.getElementById('confirmNo');

        titleEl.textContent = title;
        messageEl.textContent = message;
        modal.style.display = 'flex';

        const handleYes = () => {
            modal.style.display = 'none';
            yesBtn.removeEventListener('click', handleYes);
            noBtn.removeEventListener('click', handleNo);
            resolve(true);
        };

        const handleNo = () => {
            modal.style.display = 'none';
            yesBtn.removeEventListener('click', handleYes);
            noBtn.removeEventListener('click', handleNo);
            resolve(false);
        };

        yesBtn.addEventListener('click', handleYes);
        noBtn.addEventListener('click', handleNo);
    });
}

// State
let currentClient = null;
let currentServiceForMaterial = null;
let cart = []; // [{serviceId, serviceName, materials: [{productId, name, quantity, unit}]}]
let clients = [];
let services = [];
let products = [];
let categories = [];
let currentCategoryFilter = '';
let isOffline = false;

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
    // Check if logged in
    const isLoggedIn = await checkAuth();
    if (!isLoggedIn) {
        window.location.href = 'login.html?redirect=mobile.html';
        return;
    }
    
    loadClients();
    loadServices();
    loadProducts();
    loadCategories();
    initEventListeners();
    updateSectionsVisibility();
    initOfflineMode();
    restoreCartFromStorage();
});

// Check authentication
async function checkAuth() {
    try {
        const res = await fetch('api/clients.php?limit=1');
        return res.ok;
    } catch {
        return false;
    }
}

// Load data
async function loadClients() {
    try {
        const response = await fetch('api/clients.php');
        const data = await response.json();
        
        clients = data.map(c => ({
            id: c.id,
            name: `${c.firstName} ${c.lastName}`,
            phone: c.phone,
            visits: c.visits || []
        }));
        
        renderClients();
    } catch (error) {
        await showAlert('Chyba při načítání klientů: ' + error.message, 'Chyba', '❌');
    }
}

async function loadServices() {
    try {
        const response = await fetch('api/services.php');
        const data = await response.json();
        
        services = Array.isArray(data) ? data : (data.services || []);
        
        renderServices();
    } catch (error) {
        await showAlert('Chyba při načítání služeb: ' + error.message, 'Chyba', '❌');
    }
}

async function loadProducts() {
    try {
        const response = await fetch('api/products.php');
        const data = await response.json();
        products = Array.isArray(data) ? data : (data.products || []);
        renderMaterials();
    } catch (error) {
        await showAlert('Chyba při načítání produktů: ' + error.message, 'Chyba', '❌');
    }
}

// Render UI
function renderClients() {
    const grid = document.getElementById('clientGrid');
    grid.innerHTML = clients.map(client => `
        <div class="client-card ${currentClient?.id === client.id ? 'active' : ''}" 
             onclick="selectClient(${client.id})">
            <div class="client-avatar">${client.name.charAt(0)}</div>
            <div class="client-info">
                <div class="client-name">${client.name}</div>
                <div class="client-phone">${client.phone || ''}</div>
            </div>
        </div>
    `).join('');
}

function renderServices() {
    const grid = document.getElementById('serviceGrid');
    if (services.length === 0) {
        grid.innerHTML = '<p style="text-align: center; color: #888;">Žádné služby</p>';
        return;
    }
    grid.innerHTML = services.map(service => `
        <button class="service-btn" onclick="selectService(${service.id})">
            <div class="service-icon">${service.name.includes('Střih') ? '✂️' : service.name.includes('Barv') ? '🎨' : '💇'}</div>
            <div class="service-name">${service.name}</div>
        </button>
    `).join('');
}

function renderMaterials() {
    const grid = document.getElementById('materialGrid');
    if (products.length === 0) {
        grid.innerHTML = '<p style="text-align: center; color: #888;">Žádné produkty</p>';
        return;
    }
    
    // Filter by category if selected
    let filteredProducts = products;
    if (currentCategoryFilter) {
        filteredProducts = products.filter(p => p.categoryId == currentCategoryFilter);
    }
    
    // Filter by search
    const searchInput = document.getElementById('materialSearch');
    if (searchInput && searchInput.value) {
        const search = searchInput.value.toLowerCase();
        filteredProducts = filteredProducts.filter(p => p.name.toLowerCase().includes(search));
    }
    
    if (filteredProducts.length === 0) {
        grid.innerHTML = '<p style="text-align: center; color: #888;">Žádné produkty v této kategorii</p>';
        return;
    }
    
    grid.innerHTML = filteredProducts.map(product => {
        const stock = Math.floor(product.stock || 0);
        const unit = product.unit || '';
        const packageSize = product.packageSize || 1;
        const minStock = product.minStock || 0;
        const isLowStock = stock < minStock && minStock > 0;
        
        let stockHTML = `${stock} ${unit}`;
        
        // Pokud je jednotka ml nebo g, přidej přepočet na kusy pod to
        if ((unit === 'ml' || unit === 'g') && packageSize > 0) {
            const pieces = Math.floor(stock / packageSize);
            stockHTML = `${stock} ${unit}<br><small>(${pieces} ks)</small>`;
        }
        
        // Add low stock warning
        if (isLowStock) {
            stockHTML += '<br><span class="low-stock-warning">⚠️ Nízký sklad</span>';
        }
        
        return `
            <button class="material-btn ${isLowStock ? 'low-stock' : ''}" onclick="selectMaterial(${product.id})">
                <div class="material-name">${product.name}</div>
                <div class="material-stock">${stockHTML}</div>
            </button>
        `;
    }).join('');
}

function renderCart() {
    const container = document.getElementById('cartItems');
    const badge = document.getElementById('cartBadge');
    
    // Update badge - only show if there are services
    if (cart.length > 0) {
        badge.textContent = cart.length;
        badge.style.display = 'inline-flex';
    } else {
        badge.style.display = 'none';
    }
    
    if (cart.length === 0) {
        container.innerHTML = '<div class="empty-cart">🛒<br>Prázdný košík<br><small>Přidejte službu</small></div>';
        return;
    }

    container.innerHTML = cart.map((service, serviceIndex) => `
        <div class="cart-service">
            <div class="cart-service-header">
                <span>${service.serviceName}</span>
                <button class="btn-remove" onclick="removeService(${serviceIndex})">×</button>
            </div>
            ${service.materials.length > 0 ? `
                <div class="cart-materials">
                    ${service.materials.map((material, materialIndex) => `
                        <div class="cart-material" onclick="editMaterial(${serviceIndex}, ${materialIndex})" style="cursor: pointer;">
                            <span>${material.name} (${material.quantity} ${material.unit})</span>
                            <button class="btn-remove-material" onclick="event.stopPropagation(); removeMaterial(${serviceIndex}, ${materialIndex})">×</button>
                        </div>
                    `).join('')}
                </div>
            ` : ''}
        </div>
    `).join('');
}

// Update UI sections visibility
function updateSectionsVisibility() {
    const clientSection = document.getElementById('clientSection');
    const serviceSection = document.getElementById('serviceSection');
    const materialSection = document.getElementById('materialSection');
    
    if (!currentClient) {
        // Show only clients
        clientSection.style.display = 'block';
        serviceSection.style.display = 'none';
        materialSection.style.display = 'none';
    } else if (cart.length === 0) {
        // Client selected, show services
        clientSection.style.display = 'none';
        serviceSection.style.display = 'block';
        materialSection.style.display = 'none';
    } else {
        // Service added, show ONLY materials (hide services)
        clientSection.style.display = 'none';
        serviceSection.style.display = 'none';
        materialSection.style.display = 'block';
    }
}

// Client selection
async function selectClient(clientId) {
    if (cart.length > 0) {
        await showAlert('Pro změnu klienta nejprve uložte nebo zrušte aktuální návštěvu', 'Upozornění', '⚠️');
        return;
    }
    
    currentClient = clients.find(c => c.id === clientId);
    document.getElementById('clientName').textContent = currentClient?.name || 'Vyberte klienta';
    renderClients();
    updateSectionsVisibility();
    renderVisitHistory();
    saveCartToStorage();
}

// Service selection
async function selectService(serviceId) {
    if (!currentClient) {
        await showAlert('Nejprve vyberte klienta', 'Upozornění', '⚠️');
        return;
    }
    
    const service = services.find(s => s.id === serviceId);
    if (!service) return;
    
    currentServiceForMaterial = cart.length;
    
    cart.push({
        serviceId: service.id,
        serviceName: service.name,
        materials: []
    });
    
    renderCart();
    updateSectionsVisibility();
    
    // Scroll to newly added service in cart
    setTimeout(() => {
        const cartItems = document.getElementById('cartItems');
        const lastService = cartItems.lastElementChild;
        if (lastService) {
            lastService.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }, 100);
    
    saveCartToStorage();
}

// Edit material quantity
function editMaterial(serviceIndex, materialIndex) {
    const material = cart[serviceIndex].materials[materialIndex];
    const product = products.find(p => p.id === material.productId);
    if (!product) return;
    
    // Calculate stock display
    const stock = Math.floor(product.stock || 0);
    const unit = product.unit || '';
    const packageSize = product.packageSize || 1;
    let stockDisplay = `${stock} ${unit}`;
    
    if ((unit === 'ml' || unit === 'g') && packageSize > 0) {
        const pieces = Math.floor(stock / packageSize);
        stockDisplay = `${stock} ${unit} (${pieces} ks)`;
    }
    
    // Open quantity modal with current values
    document.getElementById('productNameModal').textContent = material.name;
    document.getElementById('stockInfo').textContent = `Skladem: ${stockDisplay}`;
    document.getElementById('quantityInput').value = material.quantity;
    document.getElementById('quantityModal').style.display = 'flex';
    
    // Set active unit
    document.querySelectorAll('.unit-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.unit === material.unit);
    });
    
    // Store edit mode
    window.editMode = { serviceIndex, materialIndex };
    window.currentProduct = product;
    window.currentServiceIndex = serviceIndex;
}

// Material selection
async function selectMaterial(productId) {
    if (!currentClient) {
        await showAlert('Nejprve vyberte klienta', 'Upozornění', '⚠️');
        return;
    }
    
    if (cart.length === 0) {
        await showAlert('Nejprve přidejte službu', 'Upozornění', '⚠️');
        return;
    }
    
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Calculate stock display
    const stock = Math.floor(product.stock || 0);
    const unit = product.unit || '';
    const packageSize = product.packageSize || 1;
    const minStock = product.minStock || 0;
    const isLowStock = stock < minStock && minStock > 0;
    
    let stockDisplay = `${stock} ${unit}`;
    
    if ((unit === 'ml' || unit === 'g') && packageSize > 0) {
        const pieces = Math.floor(stock / packageSize);
        stockDisplay = `${stock} ${unit} (${pieces} ks)`;
    }
    
    if (isLowStock) {
        stockDisplay += ' ⚠️ NÍZKÝ SKLAD';
    }
    
    // Open quantity modal
    document.getElementById('productNameModal').textContent = product.name;
    document.getElementById('stockInfo').textContent = `Skladem: ${stockDisplay}`;
    document.getElementById('stockInfo').style.color = isLowStock ? '#fbbf24' : '#888';
    document.getElementById('quantityInput').value = 1;
    document.getElementById('quantityModal').style.display = 'flex';
    
    // Clear edit mode
    window.editMode = null;
    
    // Store current product
    window.currentProduct = product;
    window.currentServiceIndex = currentServiceForMaterial !== null ? currentServiceForMaterial : cart.length - 1;
}

// Remove items
async function removeService(serviceIndex) {
    const confirmed = await showConfirm('Opravdu chcete odstranit tuto službu?');
    if (confirmed) {
        cart.splice(serviceIndex, 1);
        renderCart();
        updateSectionsVisibility();
        saveCartToStorage();
    }
}

async function removeMaterial(serviceIndex, materialIndex) {
    const confirmed = await showConfirm('Opravdu chcete odstranit tento materiál?');
    if (confirmed) {
        cart[serviceIndex].materials.splice(materialIndex, 1);
        renderCart();
        saveCartToStorage();
    }
}

// Back to services (keep client and cart, just show services again)
function backToServices() {
    const serviceSection = document.getElementById('serviceSection');
    const materialSection = document.getElementById('materialSection');
    serviceSection.style.display = 'block';
    materialSection.style.display = 'none';
}

// Clear cart
function clearCart() {
    cart = [];
    currentClient = null;
    currentServiceForMaterial = null;
    document.getElementById('clientName').textContent = 'Vyberte klienta';
    renderCart();
    renderClients();
    updateSectionsVisibility();
    clearCartStorage();
}

// Save visit
async function saveVisit() {
    if (!currentClient) {
        await showAlert('Nejprve vyberte klienta', 'Upozornění', '⚠️');
        return;
    }

    if (cart.length === 0) {
        await showAlert('Přidejte alespoň jednu službu', 'Upozornění', '⚠️');
        return;
    }
    
    // Show confirmation with summary
    const summary = cart.map((s, i) => 
        `${i + 1}. ${s.serviceName}${s.materials.length > 0 ? `\n   Materiály: ${s.materials.map(m => `${m.name} (${m.quantity}${m.unit})`).join(', ')}` : ''}`
    ).join('\n\n');
    
    const confirmed = await showConfirm(
        `Uložit návštěvu pro ${currentClient.name}?\n\n${summary}`,
        'Potvrzení uložení'
    );
    
    if (!confirmed) return;

    try {
        const visitData = {
            clientId: currentClient.id,
            date: new Date().toISOString().split('T')[0],
            closed: 1,
            price: 0,
            note: 'Návštěva z iPad POS',
            services: cart.map(service => ({
                name: service.serviceName,
                materials: service.materials.map(m => ({
                    productId: m.productId,
                    name: m.name,
                    quantity: parseFloat(m.quantity),
                    unit: m.unit
                }))
            }))
        };

        // Try to save online first
        if (!isOffline) {
            const response = await fetch('api/visits.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(visitData)
            });

            if (response.ok) {
                await showAlert('Návštěva byla úspěšně uložena', 'Úspěch', '✅');
                clearCart();
                clearCartStorage();
                return;
            } else {
                const responseText = await response.text();
                await showAlert('Chyba při ukládání návštěvy: ' + responseText, 'Chyba', '❌');
                return;
            }
        } else {
            // Save offline for later sync
            const pendingVisits = JSON.parse(localStorage.getItem('hairbook_pending_visits') || '[]');
            pendingVisits.push(visitData);
            localStorage.setItem('hairbook_pending_visits', JSON.stringify(pendingVisits));
            
            await showAlert('Návštěva uložena offline. Bude synchronizována po obnovení připojení.', 'Offline režim', '📵');
            clearCart();
            clearCartStorage();
        }
    } catch (error) {
        // If network error, try to save offline
        if (!navigator.onLine) {
            const pendingVisits = JSON.parse(localStorage.getItem('hairbook_pending_visits') || '[]');
            pendingVisits.push(visitData);
            localStorage.setItem('hairbook_pending_visits', JSON.stringify(pendingVisits));
            
            await showAlert('Návštěva uložena offline. Bude synchronizována po obnovení připojení.', 'Offline režim', '📵');
            clearCart();
            clearCartStorage();
        } else {
            await showAlert('Chyba: ' + error.message, 'Chyba', '❌');
        }
    }
}

// Event listeners
function initEventListeners() {
    // Save button
    document.getElementById('saveButton').addEventListener('click', saveVisit);
    
    // Quantity modal
    const modal = document.getElementById('quantityModal');
    const quantityInput = document.getElementById('quantityInput');
    const qtyMinus = document.getElementById('qtyMinus');
    const qtyPlus = document.getElementById('qtyPlus');
    const cancelQty = document.getElementById('cancelQty');
    const confirmQty = document.getElementById('confirmQty');
    
    qtyMinus.addEventListener('click', () => {
        const val = parseFloat(quantityInput.value) || 0;
        if (val > 0.1) {
            quantityInput.value = (val - 0.1).toFixed(1);
        }
    });
    
    qtyPlus.addEventListener('click', () => {
        const val = parseFloat(quantityInput.value) || 0;
        quantityInput.value = (val + 0.1).toFixed(1);
    });
    
    cancelQty.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    confirmQty.addEventListener('click', () => {
        const quantity = parseFloat(quantityInput.value) || 0;
        if (quantity <= 0) return;
        
        const product = window.currentProduct;
        const serviceIndex = window.currentServiceIndex;
        const selectedUnit = document.querySelector('.unit-btn.active').dataset.unit;
        
        if (window.editMode) {
            // Edit existing material
            const { serviceIndex: sIdx, materialIndex: mIdx } = window.editMode;
            cart[sIdx].materials[mIdx].quantity = quantity;
            cart[sIdx].materials[mIdx].unit = selectedUnit;
            window.editMode = null;
        } else if (product && cart[serviceIndex]) {
            // Add new material
            cart[serviceIndex].materials.push({
                productId: product.id,
                name: product.name,
                quantity: quantity,
                unit: selectedUnit
            });
            
            // Scroll to the service with new material
            setTimeout(() => {
                const cartItems = document.getElementById('cartItems');
                const serviceCards = cartItems.querySelectorAll('.cart-service');
                if (serviceCards[serviceIndex]) {
                    serviceCards[serviceIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }, 100);
        }
        
        renderCart();
        saveCartToStorage();
        modal.style.display = 'none';
    });
    
    // Unit selector
    document.querySelectorAll('.unit-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.unit-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
    
    // Quick quantity buttons
    document.querySelectorAll('.btn-quick-qty').forEach(btn => {
        btn.addEventListener('click', () => {
            quantityInput.value = btn.dataset.qty;
        });
    });
    
    // Search filters
    const clientSearch = document.getElementById('clientSearch');
    clientSearch.addEventListener('input', (e) => {
        const search = e.target.value.toLowerCase();
        const filtered = clients.filter(c => 
            c.name.toLowerCase().includes(search) || 
            (c.phone && c.phone.includes(search))
        );
        
        const grid = document.getElementById('clientGrid');
        grid.innerHTML = filtered.map(client => `
            <div class="client-card ${currentClient?.id === client.id ? 'active' : ''}" 
                 onclick="selectClient(${client.id})">
                <div class="client-avatar">${client.name.charAt(0)}</div>
                <div class="client-info">
                    <div class="client-name">${client.name}</div>
                    <div class="client-phone">${client.phone || ''}</div>
                </div>
            </div>
        `).join('');
    });
    
    const materialSearch = document.getElementById('materialSearch');
    materialSearch.addEventListener('input', () => {
        renderMaterials();
    });
}

// ============ NEW FEATURES ============

// Load Categories
async function loadCategories() {
    try {
        const response = await fetch('api/categories.php');
        const data = await response.json();
        if (data.success) {
            categories = data.categories || [];
            renderCategoryFilter();
        }
    } catch (error) {
        console.error('Error loading categories:', error);
    }
}

// Render Category Filter
function renderCategoryFilter() {
    const filterEl = document.getElementById('categoryFilter');
    if (!filterEl) return;
    
    filterEl.innerHTML = '<option value="">Všechny kategorie</option>' + 
        categories.map(cat => `<option value="${cat.id}">${cat.icon || '📦'} ${cat.name}</option>`).join('');
}

// Filter Materials by Category
function filterMaterialsByCategory() {
    const filterEl = document.getElementById('categoryFilter');
    currentCategoryFilter = filterEl.value;
    renderMaterials();
}

// Show New Client Modal
function showNewClientModal() {
    const modal = document.getElementById('newClientModal');
    document.getElementById('newClientFirstName').value = '';
    document.getElementById('newClientLastName').value = '';
    document.getElementById('newClientPhone').value = '';
    modal.style.display = 'flex';
    document.getElementById('newClientFirstName').focus();
}

// Close New Client Modal
function closeNewClientModal() {
    document.getElementById('newClientModal').style.display = 'none';
}

// Create New Client
async function createNewClient() {
    const firstName = document.getElementById('newClientFirstName').value.trim();
    const lastName = document.getElementById('newClientLastName').value.trim();
    const phone = document.getElementById('newClientPhone').value.trim();
    
    if (!firstName || !lastName) {
        await showAlert('Vyplňte prosím jméno a příjmení', 'Chyba', '⚠️');
        return;
    }
    
    try {
        const response = await fetch('api/clients.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                firstName,
                lastName,
                phone: phone || null
            })
        });
        
        const data = await response.json();
        if (data.success) {
            closeNewClientModal();
            await showAlert('Klient byl úspěšně vytvořen', 'Úspěch', '✅');
            await loadClients();
            // Auto-select new client
            if (data.clientId) {
                selectClient(data.clientId);
            }
        } else {
            await showAlert(data.error || 'Nepodařilo se vytvořit klienta', 'Chyba', '❌');
        }
    } catch (error) {
        console.error('Error creating client:', error);
        await showAlert('Chyba při vytváření klienta', 'Chyba', '❌');
    }
}

// Initialize Offline Mode
function initOfflineMode() {
    const indicator = document.getElementById('offlineIndicator');
    
    window.addEventListener('online', () => {
        isOffline = false;
        indicator.classList.remove('show');
        syncOfflineData();
    });
    
    window.addEventListener('offline', () => {
        isOffline = true;
        indicator.classList.add('show');
    });
    
    // Check initial status
    if (!navigator.onLine) {
        isOffline = true;
        indicator.classList.add('show');
    }
}

// Restore Cart from LocalStorage
function restoreCartFromStorage() {
    try {
        const savedCart = localStorage.getItem('hairbook_mobile_cart');
        const savedClient = localStorage.getItem('hairbook_mobile_client');
        
        if (savedCart) {
            cart = JSON.parse(savedCart);
            renderCart();
        }
        
        if (savedClient) {
            const client = JSON.parse(savedClient);
            currentClient = client;
            document.getElementById('clientName').textContent = client.name;
            updateSectionsVisibility();
        }
    } catch (error) {
        console.error('Error restoring cart:', error);
    }
}

// Save Cart to LocalStorage
function saveCartToStorage() {
    try {
        localStorage.setItem('hairbook_mobile_cart', JSON.stringify(cart));
        if (currentClient) {
            localStorage.setItem('hairbook_mobile_client', JSON.stringify(currentClient));
        }
    } catch (error) {
        console.error('Error saving cart:', error);
    }
}

// Clear Cart Storage
function clearCartStorage() {
    localStorage.removeItem('hairbook_mobile_cart');
    localStorage.removeItem('hairbook_mobile_client');
}

// Sync Offline Data
async function syncOfflineData() {
    const pendingVisits = JSON.parse(localStorage.getItem('hairbook_pending_visits') || '[]');
    
    if (pendingVisits.length === 0) return;
    
    for (const visit of pendingVisits) {
        try {
            const response = await fetch('api/visits.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(visit)
            });
            
            const data = await response.json();
            if (data.success) {
                // Remove from pending
                const index = pendingVisits.indexOf(visit);
                if (index > -1) {
                    pendingVisits.splice(index, 1);
                }
            }
        } catch (error) {
            console.error('Error syncing visit:', error);
        }
    }
    
    localStorage.setItem('hairbook_pending_visits', JSON.stringify(pendingVisits));
    
    if (pendingVisits.length === 0) {
        await showAlert('Všechna offline data byla synchronizována', 'Synchronizace', '✅');
    }
}

// Render Visit History
function renderVisitHistory() {
    const historyContainer = document.getElementById('visitHistory');
    const historyItems = document.getElementById('historyItems');
    
    if (!currentClient || !currentClient.visits || currentClient.visits.length === 0) {
        if (historyContainer) historyContainer.style.display = 'none';
        return;
    }
    
    // Show only last 3 visits
    const recentVisits = currentClient.visits.slice(0, 3);
    
    historyItems.innerHTML = recentVisits.map((visit, index) => {
        const date = new Date(visit.date).toLocaleDateString('cs-CZ');
        const servicesText = visit.services.map(s => s.name || s.serviceName || s.service_name).join(', ');
        
        // Get materials from all services
        let materialsHTML = '';
        visit.services.forEach(service => {
            if (service.materials && service.materials.length > 0) {
                const materials = service.materials.map(m => {
                    const name = m.name || m.productName || m.product_name || 'Neznámý produkt';
                    const qty = m.quantity || 0;
                    const unit = m.unit || '';
                    return `${name} (${qty}${unit})`;
                }).join(', ');
                materialsHTML += `<div class="history-materials">🧴 ${materials}</div>`;
            }
        });
        
        return `
            <div class="history-item">
                <div class="history-date">${date}</div>
                <div class="history-services">✂️ ${servicesText}</div>
                ${materialsHTML}
                <button class="btn-repeat-visit" onclick="repeatVisit(${index})">🔄 Opakovat</button>
            </div>
        `;
    }).join('');
    
    historyContainer.style.display = 'block';
}

// Repeat Visit
async function repeatVisit(visitIndex) {
    if (!currentClient || !currentClient.visits) return;
    
    const visit = currentClient.visits[visitIndex];
    if (!visit || !visit.services) return;
    
    // Clear current cart
    cart = [];
    
    // Add services with materials from the visit
    visit.services.forEach(service => {
        const serviceName = service.name || service.serviceName || service.service_name;
        
        // Find service in services list
        const serviceData = services.find(s => s.name === serviceName);
        if (!serviceData) return;
        
        const cartService = {
            serviceId: serviceData.id,
            serviceName: serviceData.name,
            materials: []
        };
        
        // Add materials
        if (service.materials && service.materials.length > 0) {
            service.materials.forEach(material => {
                const productName = material.name || material.productName || material.product_name;
                const product = products.find(p => p.name === productName);
                
                if (product) {
                    cartService.materials.push({
                        productId: product.id,
                        name: product.name,
                        quantity: material.quantity,
                        unit: material.unit
                    });
                }
            });
        }
        
        cart.push(cartService);
    });
    
    renderCart();
    updateSectionsVisibility();
    saveCartToStorage();
    
    await showAlert('Návštěva byla přidána do košíku', 'Opakování návštěvy', '✅');
}
