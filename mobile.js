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
    initEventListeners();
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
            phone: c.phone
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
    grid.innerHTML = products.map(product => `
        <button class="material-btn" onclick="selectMaterial(${product.id})">
            <div class="material-name">${product.name}</div>
            <div class="material-stock">${product.quantity} ${product.unit}</div>
        </button>
    `).join('');
}

function renderCart() {
    const container = document.getElementById('cartItems');
    
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
                        <div class="cart-material">
                            <span>${material.name} (${material.quantity} ${material.unit})</span>
                            <button class="btn-remove-material" onclick="removeMaterial(${serviceIndex}, ${materialIndex})">×</button>
                        </div>
                    `).join('')}
                </div>
            ` : ''}
        </div>
    `).join('');
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
    
    // Open quantity modal
    document.getElementById('productNameModal').textContent = product.name;
    document.getElementById('quantityInput').value = 1;
    document.getElementById('quantityModal').style.display = 'flex';
    
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
    }
}

async function removeMaterial(serviceIndex, materialIndex) {
    const confirmed = await showConfirm('Opravdu chcete odstranit tento materiál?');
    if (confirmed) {
        cart[serviceIndex].materials.splice(materialIndex, 1);
        renderCart();
    }
}

// Clear cart
function clearCart() {
    cart = [];
    currentClient = null;
    currentServiceForMaterial = null;
    document.getElementById('clientName').textContent = 'Vyberte klienta';
    renderCart();
    renderClients();
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
        } else {
            const responseText = await response.text();
            await showAlert('Chyba při ukládání návštěvy: ' + responseText, 'Chyba', '❌');
        }
    } catch (error) {
        await showAlert('Chyba: ' + error.message, 'Chyba', '❌');
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
        
        if (product && cart[serviceIndex]) {
            cart[serviceIndex].materials.push({
                productId: product.id,
                name: product.name,
                quantity: quantity,
                unit: selectedUnit
            });
            renderCart();
        }
        
        modal.style.display = 'none';
    });
    
    // Unit selector
    document.querySelectorAll('.unit-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.unit-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
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
    materialSearch.addEventListener('input', (e) => {
        const search = e.target.value.toLowerCase();
        const filtered = products.filter(p => 
            p.name.toLowerCase().includes(search)
        );
        
        const grid = document.getElementById('materialGrid');
        grid.innerHTML = filtered.map(product => `
            <button class="material-btn" onclick="selectMaterial(${product.id})">
                <div class="material-name">${product.name}</div>
                <div class="material-stock">${product.quantity} ${product.unit}</div>
            </button>
        `).join('');
    });
}
