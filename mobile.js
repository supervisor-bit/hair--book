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
        const stock = product.stock || 0;
        const unit = product.unit || '';
        const packageSize = product.packageSize || 1;
        const minStock = product.minStock || 0;
        const minStockInPieces = (minStock / packageSize).toFixed(1);
        const stockInPieces = (stock / packageSize).toFixed(1);
        const isLowStock = parseFloat(stockInPieces) < parseFloat(minStockInPieces) && minStock > 0;
        
        let stockHTML = `${Math.round(stock)} ${unit}`;
        
        // Pokud je jednotka ml nebo g, přidej přepočet na kusy pod to
        if ((unit === 'ml' || unit === 'g') && packageSize > 0) {
            stockHTML = `${stockInPieces} ks<br><small>(${Math.round(stock)} ${unit})</small>`;
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
    const historyColumn = document.getElementById('historyColumn');
    
    if (!currentClient) {
        // Show only clients
        clientSection.style.display = 'block';
        serviceSection.style.display = 'none';
        materialSection.style.display = 'none';
        if (historyColumn) historyColumn.style.display = 'none';
    } else if (cart.length === 0) {
        // Client selected, show services + history in 2 columns
        clientSection.style.display = 'none';
        serviceSection.style.display = 'block';
        materialSection.style.display = 'none';
        if (historyColumn) historyColumn.style.display = 'block';
    } else {
        // Service added, show materials (hide services and history)
        clientSection.style.display = 'none';
        serviceSection.style.display = 'none';
        materialSection.style.display = 'block';
        if (historyColumn) historyColumn.style.display = 'none';
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
    const stock = product.stock || 0;
    const unit = product.unit || '';
    const packageSize = product.packageSize || 1;
    const pieces = (stock / packageSize).toFixed(1);
    let stockDisplay = `${Math.round(stock)} ${unit}`;
    
    if ((unit === 'ml' || unit === 'g') && packageSize > 0) {
        stockDisplay = `${pieces} ks | ${Math.round(stock)} ${unit}`;
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
    const stock = product.stock || 0;
    const unit = product.unit || '';
    const packageSize = product.packageSize || 1;
    const minStock = product.minStock || 0;
    const minStockInPieces = (minStock / packageSize).toFixed(1);
    const stockInPieces = (stock / packageSize).toFixed(1);
    const isLowStock = parseFloat(stockInPieces) < parseFloat(minStockInPieces) && minStock > 0;
    
    let stockDisplay = `${Math.round(stock)} ${unit}`;
    
    if ((unit === 'ml' || unit === 'g') && packageSize > 0) {
        stockDisplay = `${stockInPieces} ks | ${Math.round(stock)} ${unit}`;
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
    currentServiceForMaterial = null;
    
    // Manually show services and history
    const clientSection = document.getElementById('clientSection');
    const serviceSection = document.getElementById('serviceSection');
    const materialSection = document.getElementById('materialSection');
    const historyColumn = document.getElementById('historyColumn');
    
    clientSection.style.display = 'none';
    serviceSection.style.display = 'block';
    materialSection.style.display = 'none';
    if (historyColumn) historyColumn.style.display = 'block';
    
    renderVisitHistory();
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
    const historyContainer = document.getElementById('historyColumn');
    const historyItems = document.getElementById('historyItems');
    
    if (!currentClient || !currentClient.visits || currentClient.visits.length === 0) {
        if (historyContainer) historyContainer.style.display = 'none';
        if (historyItems) historyItems.innerHTML = '';
        return;
    }
    
    // Show all visits
    const recentVisits = currentClient.visits;
    
    historyItems.innerHTML = recentVisits.map((visit, index) => {
        const date = new Date(visit.date).toLocaleDateString('cs-CZ');
        
        // Generate hierarchical services with materials
        let servicesHTML = '';
        visit.services.forEach(service => {
            const serviceName = service.name || service.serviceName || service.service_name;
            
            let materialsHTML = '';
            if (service.materials && service.materials.length > 0) {
                const materialsList = service.materials.map(m => {
                    const name = m.name || m.productName || m.product_name || 'Neznámý produkt';
                    const qty = m.quantity || 0;
                    const unit = m.unit || '';
                    return `<div class="history-material-item">• ${name} (${qty}${unit})</div>`;
                }).join('');
                materialsHTML = `<div class="history-materials">${materialsList}</div>`;
            }
            
            servicesHTML += `
                <div class="history-service-group">
                    <div class="history-service-name">✂️ ${serviceName}</div>
                    ${materialsHTML}
                </div>
            `;
        });
        
        return `
            <div class="history-item">
                <div class="history-date">${date}</div>
                ${servicesHTML}
                <button class="btn-repeat-visit" onclick="repeatVisit(${index})">🔄 Opakovat</button>
            </div>
        `;
    }).join('');
    
    if (historyContainer) {
        historyContainer.style.display = 'flex';
    }
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

// ==================== MATERIAL MANAGEMENT ====================
let currentEditProduct = null;
let currentRestockProduct = null;

function showMaterialManagement() {
    document.getElementById('clientSection').style.display = 'none';
    document.getElementById('serviceSection').style.display = 'none';
    document.getElementById('historyColumn').style.display = 'none';
    document.getElementById('materialSection').style.display = 'none';
    document.getElementById('materialManagement').style.display = 'block';
    
    // Populate category filters
    const mgmtCategoryFilter = document.getElementById('mgmtCategoryFilter');
    mgmtCategoryFilter.innerHTML = '<option value="">Všechny kategorie</option>' +
        categories.map(cat => `<option value="${cat.id}">${cat.name}</option>`).join('');
    
    renderManagementGrid();
}

function closeMaterialManagement() {
    document.getElementById('materialManagement').style.display = 'none';
    updateSectionsVisibility();
}

function renderManagementGrid() {
    const grid = document.getElementById('managementGrid');
    const searchTerm = document.getElementById('mgmtSearch').value.toLowerCase();
    const categoryFilter = document.getElementById('mgmtCategoryFilter').value;
    const stockFilter = document.getElementById('mgmtStockFilter').value;
    
    let filtered = products.filter(p => {
        const matchesSearch = !searchTerm || p.name.toLowerCase().includes(searchTerm);
        const matchesCategory = !categoryFilter || p.categoryId == categoryFilter;
        
        let matchesStock = true;
        if (stockFilter === 'low') {
            matchesStock = p.stock < p.minStock;
        } else if (stockFilter === 'ok') {
            matchesStock = p.stock >= p.minStock;
        }
        
        return matchesSearch && matchesCategory && matchesStock;
    });
    
    // Sort by stock status (low first) and name
    filtered.sort((a, b) => {
        const aLow = a.stock < a.minStock ? 1 : 0;
        const bLow = b.stock < b.minStock ? 1 : 0;
        if (aLow !== bLow) return bLow - aLow;
        return a.name.localeCompare(b.name);
    });
    
    if (filtered.length === 0) {
        grid.innerHTML = '<div class="empty-state">📦<br>Žádné produkty</div>';
        return;
    }
    
    grid.innerHTML = filtered.map(product => {
        const category = categories.find(c => c.id == product.categoryId);
        const packageSize = product.packageSize || product.size || 100;
        const stockInPieces = (product.stock / packageSize).toFixed(1); // přesný počet kusů
        const minStockInPieces = ((product.minStock || 0) / packageSize).toFixed(1);
        const isLowStock = parseFloat(stockInPieces) < parseFloat(minStockInPieces);
        const price = product.priceRetail || product.price || 0;
        
        return `
            <div class="management-card ${isLowStock ? 'low-stock' : ''}">
                <div class="management-card-header">
                    <div class="management-card-title">
                        <h4>${product.name}</h4>
                        <span class="category">${category ? category.name : 'Bez kategorie'}</span>
                    </div>
                    ${isLowStock ? '<span style="font-size: 24px;">⚠️</span>' : ''}
                </div>
                
                <div class="management-stock ${isLowStock ? 'low' : ''}">
                    <div style="flex: 1;">
                        <div class="stock-label">Skladem</div>
                        <div class="stock-value ${isLowStock ? 'low' : ''}" style="font-size: 18px;">
                            ${stockInPieces} ks <span style="color: var(--text-secondary); font-size: 16px;">|</span> ${Math.round(product.stock || 0)} ${product.unit || 'ml'}
                        </div>
                        <div class="stock-pieces" style="font-size: 12px; color: var(--text-secondary);">
                            Velikost balení: ${packageSize} ${product.unit || 'ml'}
                        </div>
                    </div>
                    <div style="text-align: right;">
                        <div class="stock-label">Min. stav</div>
                        <div style="font-size: 14px; font-weight: 600; color: var(--text-secondary);">
                            ${minStockInPieces} ks | ${Math.round(product.minStock || 0)} ${product.unit || 'ml'}
                        </div>
                    </div>
                </div>
                
                <div class="management-details">
                    <div class="detail-item">
                        <span class="detail-label">Cena</span>
                        <span class="detail-value">${price} Kč</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Velikost</span>
                        <span class="detail-value">${packageSize} ${product.unit || 'ml'}</span>
                    </div>
                </div>
                
                <div class="management-actions">
                    <button class="btn-mgmt restock" onclick="showRestockModal(${product.id})">📦 Doplnit</button>
                    <button class="btn-mgmt edit" onclick="showEditProductModal(${product.id})">✏️ Upravit</button>
                    <button class="btn-mgmt delete" onclick="deleteProduct(${product.id})">🗑️ Smazat</button>
                </div>
            </div>
        `;
    }).join('');
}

function filterManagementProducts() {
    renderManagementGrid();
}

// Add Product Modal
function showAddProductModal() {
    currentEditProduct = null;
    document.getElementById('productModalTitle').textContent = '✚ Nový produkt';
    document.getElementById('productName').value = '';
    document.getElementById('productCategory').innerHTML = '<option value="">Vyberte kategorii *</option>' +
        categories.map(cat => `<option value="${cat.id}">${cat.name}</option>`).join('');
    document.getElementById('productCategory').value = '';
    document.getElementById('productPrice').value = '';
    document.getElementById('productSize').value = '';
    document.getElementById('productStock').value = '';
    document.getElementById('productMinStock').value = '';
    document.getElementById('productDescription').value = '';
    document.getElementById('productModal').classList.add('show');
}

function showEditProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    currentEditProduct = product;
    document.getElementById('productModalTitle').textContent = '✏️ Upravit produkt';
    document.getElementById('productName').value = product.name;
    document.getElementById('productCategory').innerHTML = '<option value="">Vyberte kategorii *</option>' +
        categories.map(cat => `<option value="${cat.id}">${cat.name}</option>`).join('');
    document.getElementById('productCategory').value = product.categoryId;
    document.getElementById('productPrice').value = product.priceRetail || product.price || 0;
    document.getElementById('productSize').value = product.packageSize || product.size || 100;
    document.getElementById('productStock').value = product.stock || 0;
    document.getElementById('productMinStock').value = product.minStock || 0;
    document.getElementById('productDescription').value = product.description || '';
    document.getElementById('productModal').classList.add('show');
}

function closeProductModal() {
    document.getElementById('productModal').classList.remove('show');
    currentEditProduct = null;
}

async function saveProduct() {
    const name = document.getElementById('productName').value.trim();
    const categoryId = document.getElementById('productCategory').value;
    const price = parseFloat(document.getElementById('productPrice').value);
    const size = parseFloat(document.getElementById('productSize').value);
    const stock = parseFloat(document.getElementById('productStock').value);
    const minStock = parseFloat(document.getElementById('productMinStock').value);
    const description = document.getElementById('productDescription').value.trim();
    
    if (!name || !categoryId || !price || !size || isNaN(stock) || isNaN(minStock)) {
        await showAlert('Vyplňte všechna povinná pole', 'Chyba', '❌');
        return;
    }
    
    const productData = {
        name,
        categoryId: parseInt(categoryId),
        priceRetail: price,
        pricePurchase: 0,
        priceWork: 0,
        packageSize: size,
        stock,
        minStock,
        description,
        unit: 'ml',
        forSale: true,
        forWork: true,
        vatRate: 21
    };
    
    if (currentEditProduct) {
        productData.id = currentEditProduct.id;
    }
    
    try {
        let response;
        if (currentEditProduct) {
            // Update
            response = await fetch(`api/products.php?id=${currentEditProduct.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productData)
            });
        } else {
            // Create
            response = await fetch('api/products.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productData)
            });
        }
        
        const result = await response.json();
        
        if (result.success) {
            await showAlert(
                currentEditProduct ? 'Produkt byl upraven' : 'Produkt byl vytvořen',
                'Úspěch',
                '✅'
            );
            closeProductModal();
            await loadProducts();
            renderManagementGrid();
        } else {
            await showAlert(result.error || 'Chyba při ukládání', 'Chyba', '❌');
        }
    } catch (error) {
        console.error('Save product error:', error);
        await showAlert('Nepodařilo se uložit produkt', 'Chyba', '❌');
    }
}

async function deleteProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const confirmed = await showConfirm(
        `Opravdu chcete smazat produkt "${product.name}"?`,
        'Smazat produkt'
    );
    
    if (!confirmed) return;
    
    try {
        const response = await fetch(`api/products.php?id=${productId}`, {
            method: 'DELETE'
        });
        
        const result = await response.json();
        
        if (result.success) {
            await showAlert('Produkt byl smazán', 'Úspěch', '✅');
            await loadProducts();
            renderManagementGrid();
        } else {
            await showAlert(result.error || 'Chyba při mazání', 'Chyba', '❌');
        }
    } catch (error) {
        console.error('Delete product error:', error);
        await showAlert('Nepodařilo se smazat produkt', 'Chyba', '❌');
    }
}

// Restock Modal
function showRestockModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    currentRestockProduct = product;
    const packageSize = product.packageSize || product.size || 100;
    const stockInPieces = (product.stock / packageSize).toFixed(1);
    
    document.getElementById('restockProductName').textContent = product.name;
    document.getElementById('restockCurrentStock').innerHTML = 
        `<strong>${stockInPieces} ks</strong> <span style="color: var(--text-secondary);">|</span> <strong>${Math.round(product.stock)} ${product.unit || 'ml'}</strong>`;
    document.getElementById('restockPackageSize').innerHTML = 
        `<strong>${packageSize} ${product.unit || 'ml'}</strong>`;
    document.getElementById('restockQuantity').value = 0;
    updateRestockPreview();
    document.getElementById('restockModal').classList.add('show');
}

function closeRestockModal() {
    document.getElementById('restockModal').classList.remove('show');
    currentRestockProduct = null;
}

function adjustRestockQty(amount) {
    const input = document.getElementById('restockQuantity');
    const currentValue = parseFloat(input.value) || 0;
    input.value = Math.max(0, currentValue + amount);
    updateRestockPreview();
}

function setRestockQty(amount) {
    document.getElementById('restockQuantity').value = amount;
    updateRestockPreview();
}

function updateRestockPreview() {
    const qty = parseFloat(document.getElementById('restockQuantity').value) || 0;
    const packageSize = currentRestockProduct.packageSize || currentRestockProduct.size || 100;
    const addedVolume = qty * packageSize;
    const newTotalVolume = currentRestockProduct.stock + addedVolume;
    const newStockInPieces = (newTotalVolume / packageSize).toFixed(1);
    
    const confirmBtn = document.getElementById('restockConfirmBtn');
    if (qty <= 0) {
        document.getElementById('restockNewStock').innerHTML = 
            `<span style="color: var(--text-secondary);">💡 Zvolte kolik kusů chcete přidat</span>`;
        confirmBtn.disabled = true;
        confirmBtn.style.opacity = '0.5';
    } else {
        document.getElementById('restockNewStock').style.cssText = 
            'color: var(--primary-color); font-weight: 600; font-size: 16px; text-align: center; padding: 12px; background: rgba(6, 182, 212, 0.1); border-radius: 8px; border: 2px solid var(--primary-color);';
        document.getElementById('restockNewStock').innerHTML = 
            `<div style="font-size: 13px; margin-bottom: 5px;">Po doplnění ${qty} ${qty === 1 ? 'kusu' : 'kusů'}:</div>` +
            `<strong style="font-size: 18px;">${newStockInPieces} ks</strong> ` +
            `<span style="color: var(--text-secondary);">|</span> ` +
            `<strong style="font-size: 18px;">${Math.round(newTotalVolume)} ${currentRestockProduct.unit || 'ml'}</strong>`;
        confirmBtn.disabled = false;
        confirmBtn.style.opacity = '1';
    }
}

async function confirmRestock() {
    const qty = parseFloat(document.getElementById('restockQuantity').value) || 0;
    
    if (qty <= 0) {
        await showAlert('Zadejte množství k doplnění', 'Chyba', '❌');
        return;
    }
    
    // Přepočítat kusy na ml/g pro databázi
    const packageSize = currentRestockProduct.packageSize || currentRestockProduct.size || 100;
    const addedVolume = qty * packageSize; // kusy * velikost = ml/g
    const newStock = currentRestockProduct.stock + addedVolume;
    
    try {
        const productData = {
            id: currentRestockProduct.id,
            name: currentRestockProduct.name,
            categoryId: currentRestockProduct.categoryId,
            priceRetail: currentRestockProduct.priceRetail || currentRestockProduct.price || 0,
            pricePurchase: currentRestockProduct.pricePurchase || 0,
            priceWork: currentRestockProduct.priceWork || 0,
            packageSize: currentRestockProduct.packageSize || currentRestockProduct.size || 100,
            stock: newStock,
            minStock: currentRestockProduct.minStock || 0,
            description: currentRestockProduct.description || '',
            unit: currentRestockProduct.unit || 'ml',
            forSale: true,
            forWork: true,
            vatRate: currentRestockProduct.vatRate || 21
        };
        
        const response = await fetch(`api/products.php?id=${currentRestockProduct.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productData)
        });
        
        const result = await response.json();
        
        if (result.success) {
            await showAlert(`Sklad byl doplněn o ${qty} ks`, 'Úspěch', '✅');
            closeRestockModal();
            await loadProducts();
            renderManagementGrid();
        } else {
            await showAlert(result.error || 'Chyba při doplnění', 'Chyba', '❌');
        }
    } catch (error) {
        console.error('Restock error:', error);
        await showAlert('Nepodařilo se doplnit sklad', 'Chyba', '❌');
    }
}

// Update restock quantity input
document.getElementById('restockQuantity')?.addEventListener('input', updateRestockPreview);
