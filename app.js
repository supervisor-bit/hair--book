// Nastavení salonu
let salonSettings = {
    name: 'HairBook',
    address: '',
    phone: '+420 123 456 789',
    email: '',
    web: 'www.hairbook.cz',
    ico: '',
    dic: '',
    receiptFooter: 'Děkujeme za Vaši návštěvu!'
};

// Režim pořizování produktů
let isEntryMode = false;

// Ukázková data (zakomentováno - odkomentuj pro testování)
/*
let clients = [
    {
        id: 1,
        firstName: 'Jana',
        lastName: 'Nováková',
        phone: '+420 123 456 789',
        email: 'jana.novakova@email.cz',
        avatar: null,
        groupId: 2,
        purchases: [
            {
                id: 1,
                date: '2025-11-18',
                customerName: 'Jana Nováková',
                total: 430,
                items: [
                    { productId: 1, name: 'Šampon Loreal', quantity: 1, price: 250 },
                    { productId: 2, name: 'Balzám', quantity: 1, price: 180 }
                ]
            }
        ],
        visits: [
            {
                id: 1,
                date: '2025-11-20',
                closed: true,
                price: 850,
                note: 'Klientka spokojená',
                services: [
                    { 
                        name: 'Střih dámský', 
                        materials: [
                            { productId: 1, name: 'Šampon Loreal', quantity: 30, unit: 'ml', baseUnit: 'ml' },
                            { productId: 2, name: 'Balzám', quantity: 20, unit: 'ml', baseUnit: 'ml' }
                        ]
                    }
                ],
                products: []
            },
            {
                id: 2,
                date: '2025-10-15',
                closed: true,
                price: 1200,
                note: '',
                services: [
                    { 
                        name: 'Barvení', 
                        materials: [
                            { productId: 3, name: 'Barva hnědá', quantity: 60, unit: 'g', baseUnit: 'g' },
                            { productId: 4, name: 'Peroxid 6%', quantity: 100, unit: 'ml', baseUnit: 'ml' }
                        ]
                    }
                ],
                products: []
            }
        ]
    },
    {
        id: 2,
        firstName: 'Petr',
        lastName: 'Svoboda',
        phone: '+420 987 654 321',
        email: 'petr.svoboda@email.cz',
        avatar: null,
        visits: [
            {
                id: 3,
                date: '2025-11-18',
                closed: true,
                services: [
                    { name: 'Střih pánský', materials: ['Šampon'] }
                ]
            }
        ]
    },
    {
        id: 3,
        firstName: 'Marie',
        lastName: 'Dvořáková',
        phone: '+420 555 111 222',
        email: 'marie.dvorakova@email.cz',
        avatar: null,
        purchases: [],
        visits: []
    }
];

let productCategories = [
    { id: 1, name: 'Šampony', icon: 'fa-pump-soap', color: '#3b82f6' },
    { id: 2, name: 'Balzámy', icon: 'fa-spray-can-sparkles', color: '#8b5cf6' },
    { id: 3, name: 'Barvy', icon: 'fa-palette', color: '#ef4444' },
    { id: 4, name: 'Oxidanty', icon: 'fa-flask', color: '#f59e0b' },
    { id: 5, name: 'Folie a pomůcky', icon: 'fa-tools', color: '#10b981' },
    { id: 6, name: 'Stylingové', icon: 'fa-wind', color: '#06b6d4' }
];

let products = [
    { 
        id: 1, 
        name: 'Šampon Loreal', 
        description: 'Profesionální šampon pro všechny typy vlasů',
        categoryId: 1,
        stock: 3500, 
        unit: 'ml',
        packageSize: 250,
        minimalStock: 1000,
        pricePurchase: 120,
        priceRetail: 250,
        forSale: true,
        forWork: true,
        movements: [
            { date: '2025-11-20', type: 'usage', quantity: -50, unit: 'ml', note: 'Použito při návštěvě - Jana Nováková' },
            { date: '2025-11-15', type: 'purchase', quantity: 2000, unit: 'ml', note: 'Nákup - 2 láhve po 1000ml' },
            { date: '2025-11-10', type: 'usage', quantity: -150, unit: 'ml', note: 'Použito při návštěvách' }
        ]
    },
    { 
        id: 2, 
        name: 'Balzám', 
        description: 'Hydratační balzám',
        categoryId: 2,
        stock: 2800, 
        unit: 'ml',
        packageSize: 200,
        minimalStock: 800,
        pricePurchase: 80,
        priceRetail: 180,
        forSale: true,
        forWork: true,
        movements: [
            { date: '2025-11-20', type: 'usage', quantity: -30, unit: 'ml', note: 'Použito při návštěvě - Jana Nováková' },
            { date: '2025-11-18', type: 'purchase', quantity: 1500, unit: 'ml', note: 'Nákup' }
        ]
    },
    { 
        id: 3, 
        name: 'Barva hnědá', 
        description: 'Profesionální barva č. 5',
        categoryId: 3,
        stock: 400, 
        unit: 'g',
        packageSize: 60,
        minimalStock: 180,
        pricePurchase: 45,
        priceRetail: 0,
        forSale: false,
        forWork: true,
        movements: [
            { date: '2025-11-15', type: 'usage', quantity: -60, unit: 'g', note: 'Barvení - Jana Nováková' },
            { date: '2025-11-01', type: 'purchase', quantity: 300, unit: 'g', note: 'Nákup - 5 tub' }
        ]
    },
    { 
        id: 4, 
        name: 'Peroxid 6%', 
        description: 'Oxidant 6%',
        categoryId: 4,
        stock: 5000, 
        unit: 'ml',
        packageSize: 1000,
        minimalStock: 2000,
        pricePurchase: 80,
        priceRetail: 0,
        forSale: false,
        forWork: true,
        movements: [
            { date: '2025-11-15', type: 'usage', quantity: -100, unit: 'ml', note: 'Použito při barvení' },
            { date: '2025-11-05', type: 'purchase', quantity: 3000, unit: 'ml', note: 'Nákup' }
        ]
    },
    { 
        id: 5, 
        name: 'Folie na melír', 
        description: 'Hliníková folie',
        categoryId: 5,
        stock: 50, 
        unit: 'ks',
        packageSize: 1,
        minimalStock: 20,
        movements: [
            { date: '2025-11-10', type: 'purchase', quantity: 50, unit: 'ks', note: 'Nákup' }
        ]
    },
    { 
        id: 6, 
        name: 'Lak na vlasy', 
        description: 'Silná fixace',
        categoryId: 6,
        stock: 2500, 
        unit: 'ml',
        packageSize: 400,
        minimalStock: 1200,
        movements: [
            { date: '2025-11-12', type: 'usage', quantity: -50, unit: 'ml', note: 'Použito při foukání' },
            { date: '2025-11-01', type: 'purchase', quantity: 1500, unit: 'ml', note: 'Nákup - 3 lahve' }
        ]
    }
];

let clientGroups = [
    { id: 1, name: 'VIP', icon: 'fa-crown', color: '#f59e0b' },
    { id: 2, name: 'Pravidelní', icon: 'fa-star', color: '#8b5cf6' },
    { id: 3, name: 'Noví', icon: 'fa-user-plus', color: '#3b82f6' },
    { id: 4, name: 'Neaktivní', icon: 'fa-user-clock', color: '#6b7280' }
];

let services = [
    { id: 1, name: 'Střih dámský', description: 'Klasický dámský střih', duration: 45 },
    { id: 2, name: 'Střih pánský', description: 'Pánský střih', duration: 30 },
    { id: 3, name: 'Barvení', description: 'Barvení celé hlavy', duration: 90 },
    { id: 4, name: 'Melír', description: 'Melírování', duration: 120 },
    { id: 5, name: 'Foukaná', description: 'Styling a foukaná', duration: 30 },
    { id: 6, name: 'Trvalá', description: 'Trvalá ondulace', duration: 120 }
];
*/

// Prázdná data - pro produkční použití
let clients = [];
let productCategories = [];
let products = [];
let clientGroups = [
    { id: 1, name: 'VIP', icon: 'fa-crown', color: '#f59e0b' },
    { id: 2, name: 'Pravidelní', icon: 'fa-star', color: '#8b5cf6' },
    { id: 3, name: 'Noví', icon: 'fa-user-plus', color: '#3b82f6' },
    { id: 4, name: 'Neaktivní', icon: 'fa-user-clock', color: '#6b7280' }
];
let services = [];

let currentClient = null;
let currentProduct = null;
let currentVisit = {
    id: null,
    clientId: null,
    services: [],
    products: [],
    closed: false
};
let selectedMaterialCategory = null;
let selectedProductCategory = null;
let selectedClientGroup = null;
let selectedServiceIndex = -1;
let showOnlyLowStock = false;

// Funkce pro výpočet kusů ze základní jednotky
function calculatePieces(stock, unit, packageSize) {
    if (unit === 'ks') {
        return stock;
    }
    return Math.floor(stock / packageSize);
}

// Funkce pro formátování zobrazení skladu
function formatStockDisplay(stockOrProduct, unit, packageSize) {
    // Pokud je první parametr objekt (produkt), použít jeho vlastnosti
    let stock, unitStr, pkgSize;
    if (typeof stockOrProduct === 'object' && stockOrProduct !== null) {
        stock = stockOrProduct.stock;
        unitStr = stockOrProduct.unit;
        pkgSize = stockOrProduct.packageSize;
    } else {
        // Jinak použít parametry
        stock = stockOrProduct;
        unitStr = unit;
        pkgSize = packageSize;
    }
    
    const pieces = calculatePieces(stock, unitStr, pkgSize);
    if (unitStr === 'ks') {
        return `${pieces} ks`;
    }
    return `${pieces} ks (${stock} ${unitStr})`;
}

// Odhlášení
function logout() {
    document.getElementById('confirmModalTitle').textContent = 'Odhlásit se';
    document.getElementById('confirmModalMessage').innerHTML = '<p>Opravdu se chcete odhlásit z aplikace?</p>';
    document.getElementById('confirmModalBtn').textContent = 'Ano, odhlásit';
    document.getElementById('confirmModalBtn').className = 'btn btn-primary';
    document.getElementById('confirmModalBtn').onclick = confirmLogout;
    document.getElementById('confirmModal').classList.add('show');
}

function confirmLogout() {
    closeConfirmModal();
    sessionStorage.removeItem('hairbook_logged_in');
    localStorage.removeItem('hairbook_remember');
    window.location.href = 'login.html';
}

// Rozbalovací menu
function toggleNavGroup(header) {
    const group = header.parentElement;
    const allGroups = document.querySelectorAll('.nav-group');
    
    // Zavřít ostatní skupiny
    allGroups.forEach(g => {
        if (g !== group) {
            g.classList.remove('expanded');
        }
    });
    
    // Přepnout aktuální skupinu
    group.classList.toggle('expanded');
}

// Inicializace aplikace
document.addEventListener('DOMContentLoaded', async function() {
    // Zobrazit loading
    showNotification('Načítám data...', 'info');
    
    // Načíst data z API
    const loaded = await loadAllData();
    
    if (loaded) {
        initNavigation();
        renderDashboard();
        renderClientGroups();
        renderClients();
        renderProductCategories();
        renderProducts();
        renderServices();
        initBarcodeScanner();
        
        showNotification('Data načtena', 'success');
        
        // Automaticky spustit režim pořizování pokud nejsou žádné produkty
        if (products.length === 0) {
            setTimeout(() => {
                startEntryMode();
            }, 500);
        }
    } else {
        showNotification('Chyba při načítání dat. Zkontroluj že MAMP běží a databáze existuje.', 'error');
    }
});

// Navigace mezi stránkami
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const pageName = this.getAttribute('data-page');
            
            // Aktualizovat aktivní menu
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            // Rozbalit skupinu, kde je aktivní položka
            const parentGroup = this.closest('.nav-group');
            if (parentGroup) {
                parentGroup.classList.add('expanded');
            }
            
            // Zobrazit správnou stránku
            document.querySelectorAll('.page').forEach(page => {
                page.classList.remove('active');
            });
            document.getElementById('page-' + pageName).classList.add('active');
            
            // Inicializovat stránku dashboard
            if (pageName === 'dashboard') {
                renderDashboard();
            }
            
            // Inicializovat stránku produkty
            if (pageName === 'products') {
                updateLowStockFilterButton();
            }
            
            // Inicializovat stránku prodej
            if (pageName === 'sales') {
                filterSalesProducts();
                updateSalesCart();
            }
            
            // Načíst nastavení při otevření stránky nastavení
            if (pageName === 'settings') {
                loadSettings();
            }
            
            // Inicializovat stránku účetnictví
            if (pageName === 'accounting') {
                initializeAccountingPage();
            }
            
            // Načíst historii příjmů
            if (pageName === 'receipt-history') {
                loadReceiptHistory();
            }
            
            // Načíst historii objednávek
            if (pageName === 'order-history') {
                loadOrderHistory();
            }
            
            // Načíst historii prodejů
            if (pageName === 'sales-history') {
                loadSalesHistory();
            }
            
            // Inicializovat stránku výdeje materiálu
            if (pageName === 'material-issue') {
                filterIssueProducts();
                updateIssueCart();
            }
            
            // Načíst historii výdejů
            if (pageName === 'issue-history') {
                loadIssueHistory();
            }
        });
    });
}

// === KLIENTI ===

function renderClientGroups() {
    const container = document.getElementById('clientGroupList');
    if (!container) return;
    
    container.innerHTML = '';
    
    // Přidat položku "Vše" (bez neaktivních)
    const activeClientsCount = clients.filter(c => c.groupId !== 4).length;
    const allItem = document.createElement('div');
    allItem.className = 'category-item' + (selectedClientGroup === null ? ' active' : '');
    allItem.innerHTML = `
        <div class="category-item-content">
            <i class="fas fa-users" style="color: #6366f1;"></i>
            <span>Všichni</span>
            <span class="category-count">${activeClientsCount}</span>
        </div>
    `;
    allItem.addEventListener('click', () => {
        selectedClientGroup = null;
        renderClientGroups();
        renderClients();
    });
    container.appendChild(allItem);
    
    // Přidat jednotlivé skupiny
    clientGroups.forEach(group => {
        const count = clients.filter(c => c.groupId === group.id).length;
        
        const item = document.createElement('div');
        item.className = 'category-item' + (selectedClientGroup === group.id ? ' active' : '');
        item.innerHTML = `
            <div class="category-item-content">
                <i class="fas ${group.icon}" style="color: ${group.color};"></i>
                <span>${group.name}</span>
                <span class="category-count">${count}</span>
            </div>
        `;
        item.addEventListener('click', () => {
            selectedClientGroup = group.id;
            renderClientGroups();
            renderClients();
        });
        
        // Drag and drop pro skupiny
        item.addEventListener('dragover', (e) => {
            e.preventDefault();
            item.classList.add('drag-over');
        });
        
        item.addEventListener('dragleave', () => {
            item.classList.remove('drag-over');
        });
        
        item.addEventListener('drop', (e) => {
            e.preventDefault();
            item.classList.remove('drag-over');
            
            const clientId = parseInt(e.dataTransfer.getData('clientId'));
            const client = clients.find(c => c.id === clientId);
            
            if (client && client.groupId !== group.id) {
                client.groupId = group.id;
                renderClientGroups();
                renderClients();
                saveToLocalStorage();
            }
        });
        
        container.appendChild(item);
    });
}

function renderClients() {
    const clientList = document.getElementById('clientList');
    clientList.innerHTML = '';
    
    // Pokud nejsou žádní klienti vůbec
    if (clients.length === 0) {
        clientList.innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 3rem; text-align: center; color: #9ca3af;">
                <i class="fas fa-users" style="font-size: 4rem; margin-bottom: 1.5rem; opacity: 0.3;"></i>
                <h3 style="color: #6b7280; margin-bottom: 0.5rem;">Zatím žádní klienti</h3>
                <p style="margin-bottom: 1.5rem;">Nemáte ještě žádného klienta v systému.</p>
                <button class="btn btn-primary" onclick="addNewClient()">
                    <i class="fas fa-plus"></i> Přidat nového klienta
                </button>
            </div>
        `;
        return;
    }
    
    // Filtrovat podle vybrané skupiny (neaktivní se zobrazují jen když je vybraná jejich skupina)
    let filteredClients;
    if (selectedClientGroup === null) {
        // "Všichni" - zobrazit všechny kromě neaktivních (groupId 4)
        filteredClients = clients.filter(c => c.groupId !== 4);
    } else {
        // Konkrétní skupina - zobrazit jen klienty z této skupiny
        filteredClients = clients.filter(c => c.groupId === selectedClientGroup);
    }
    
    // Pokud filtrované výsledky jsou prázdné
    if (filteredClients.length === 0) {
        const groupName = selectedClientGroup ? clientGroups.find(g => g.id === selectedClientGroup)?.name : 'Všichni';
        clientList.innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 3rem; text-align: center; color: #9ca3af;">
                <i class="fas fa-filter" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.3;"></i>
                <p>Žádní klienti ve skupině "${groupName}"</p>
            </div>
        `;
        return;
    }
    
    filteredClients.forEach(client => {
        const initials = client.firstName[0] + client.lastName[0];
        const group = clientGroups.find(g => g.id === client.groupId);
        
        const item = document.createElement('div');
        item.className = 'client-item';
        item.draggable = true;
        item.innerHTML = `
            <div class="client-avatar">
                ${client.avatar ? `<img src="${client.avatar}" alt="${client.firstName}">` : initials}
            </div>
            <div class="client-info">
                <div class="client-name">
                    ${client.firstName} ${client.lastName}
                    ${group ? `<i class="fas ${group.icon}" style="color: ${group.color}; font-size: 0.75rem; margin-left: 0.25rem;"></i>` : ''}
                </div>
                <div class="client-phone">${client.phone}</div>
            </div>
        `;
        
        // Drag and drop pro klienty
        item.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('clientId', client.id);
            item.classList.add('dragging');
        });
        
        item.addEventListener('dragend', () => {
            item.classList.remove('dragging');
        });
        
        item.addEventListener('click', (e) => showClientDetail(client, e));
        clientList.appendChild(item);
    });
}

function showClientDetail(client, event = null) {
    currentClient = client;
    
    // Aktualizovat aktivní klient v seznamu
    document.querySelectorAll('.client-item').forEach(item => {
        item.classList.remove('active');
    });
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    } else {
        // Najít a označit správnou položku v seznamu
        const items = document.querySelectorAll('.client-item');
        items.forEach(item => {
            if (item.dataset.clientId == client.id) {
                item.classList.add('active');
            }
        });
    }
    
    const detailPanel = document.getElementById('clientDetail');
    const initials = client.firstName[0] + client.lastName[0];
    
    // Vypočítat statistiky
    const totalVisits = client.visits.length;
    const closedVisits = client.visits.filter(v => v.closed).length;
    const totalSpent = client.visits
        .filter(v => v.closed && v.price)
        .reduce((sum, v) => sum + (v.price || 0), 0);
    
    let visitsHtml = '';
    if (client.visits.length > 0) {
        visitsHtml = client.visits.map(visit => {
            const statusBadge = visit.closed 
                ? '<span class="visit-status-badge closed"><i class="fas fa-check-circle"></i> Uzavřeno</span>'
                : '<span class="visit-status-badge open"><i class="fas fa-clock"></i> Otevřeno</span>';
            
            // Zobrazit služby s jejich materiály
            const servicesHtml = visit.services.map(service => {
                let materialsText = '';
                if (service.materials && service.materials.length > 0) {
                    // Materiály můžou být buď string (stará struktura) nebo objekt (nová struktura)
                    const materialNames = service.materials.map(m => 
                        typeof m === 'string' ? m : `${m.name} (${m.quantity} ${m.unit})`
                    );
                    materialsText = ` (${materialNames.join(', ')})`;
                }
                return `<div style="margin-bottom: 0.25rem;">• ${service.name}${materialsText}</div>`;
            }).join('');
            
            // Zobrazit prodané produkty
            let productsHtml = '';
            if (visit.products && visit.products.length > 0) {
                const productsList = visit.products.map(p => 
                    `<div style="margin-bottom: 0.25rem;">• ${p.name} - ${p.quantity} ks (${p.packageSize} ${p.unit}/ks)</div>`
                ).join('');
                productsHtml = `<div class="visit-services" style="margin-top: 0.5rem;"><strong>Prodané produkty:</strong></div>${productsList}`;
            }
            
            const priceInfo = visit.price ? `<div class="visit-price"><i class="fas fa-coins"></i> ${visit.price} Kč</div>` : '';
            const noteInfo = visit.note ? `<div class="visit-note"><i class="fas fa-comment"></i> ${visit.note}</div>` : '';
            
            let buttons = '';
            if (!visit.closed) {
                buttons = `
                    <div style="display: flex; gap: 0.5rem; margin-top: 0.5rem;">
                        <button class="btn btn-secondary" style="font-size: 0.8125rem; padding: 0.375rem 0.75rem;" onclick="editVisit(${client.id}, ${visit.id})">
                            <i class="fas fa-edit"></i> Upravit
                        </button>
                        <button class="btn btn-success" style="font-size: 0.8125rem; padding: 0.375rem 0.75rem;" onclick="writeOffMaterials(${client.id}, ${visit.id})">
                            <i class="fas fa-check-circle"></i> Uzavřít návštěvu a odepsat materiál
                        </button>
                    </div>
                `;
            } else {
                buttons = `
                    <div style="display: flex; gap: 0.5rem; margin-top: 0.5rem;">
                        <button class="btn btn-primary" style="font-size: 0.8125rem; padding: 0.375rem 0.75rem;" onclick="printReceipt(${client.id}, '${visit.date}')">
                            <i class="fas fa-print"></i> Vytisknout účtenku
                        </button>
                    </div>
                `;
            }
            
            return `
                <div class="visit-item">
                    <div class="visit-date">${formatDate(visit.date)} ${statusBadge}${priceInfo}</div>
                    <div class="visit-services"><strong>Služby a materiály:</strong></div>
                    ${servicesHtml}
                    ${productsHtml}
                    ${noteInfo}
                    ${buttons}
                </div>
            `;
        }).join('');
    } else {
        visitsHtml = '<p style="color: var(--text-light); text-align: center; padding: 2rem;">Zatím žádné návštěvy</p>';
    }
    
    detailPanel.innerHTML = `
        <div class="client-detail-header">
            <div class="client-detail-avatar">
                ${client.avatar ? `<img src="${client.avatar}" alt="${client.firstName}">` : initials}
            </div>
            <div class="client-detail-info">
                <h3>${client.firstName} ${client.lastName}</h3>
                <div class="client-detail-meta">
                    <span><i class="fas fa-phone"></i>${client.phone}</span>
                    <span><i class="fas fa-envelope"></i>${client.email}</span>
                </div>
                

                
                <div class="client-detail-actions">
                    <button class="btn btn-primary" onclick="startNewVisit(${client.id})">
                        <i class="fas fa-plus"></i> Nová návštěva
                    </button>
                    <button class="btn btn-secondary" onclick="editClient(${client.id})">
                        <i class="fas fa-edit"></i> Upravit
                    </button>
                    <button class="btn" style="background: #ef4444; color: white;" onclick="deleteClient(${client.id})">
                        <i class="fas fa-trash"></i> Smazat
                    </button>
                </div>
            </div>
        </div>
        
        <!-- Statistiky -->
        <div class="client-stats" style="display: flex; gap: 1rem; padding: 1rem; background: white; margin: 0 2rem; flex-shrink: 0;">
            <div style="flex: 1; display: flex; align-items: center; gap: 0.75rem; padding: 1rem; background: #f3f4f6; border-radius: 0.75rem; border-left: 4px solid #8b5cf6;">
                <div style="width: 40px; height: 40px; background: #8b5cf6; border-radius: 0.5rem; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.25rem;">
                    <i class="fas fa-calendar-check"></i>
                </div>
                <div>
                    <div style="font-size: 0.75rem; color: #6b7280; font-weight: 500; margin-bottom: 0.25rem;">Počet návštěv</div>
                    <div style="font-size: 1.5rem; font-weight: 700; color: #111827;">${totalVisits}</div>
                </div>
            </div>
            <div style="flex: 1; display: flex; align-items: center; gap: 0.75rem; padding: 1rem; background: #f3f4f6; border-radius: 0.75rem; border-left: 4px solid #ec4899;">
                <div style="width: 40px; height: 40px; background: #ec4899; border-radius: 0.5rem; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.25rem;">
                    <i class="fas fa-coins"></i>
                </div>
                <div>
                    <div style="font-size: 0.75rem; color: #6b7280; font-weight: 500; margin-bottom: 0.25rem;">Celkem utraceno</div>
                    <div style="font-size: 1.5rem; font-weight: 700; color: #111827;">${totalSpent.toLocaleString('cs-CZ')} Kč</div>
                </div>
            </div>
            <div style="flex: 1; display: flex; align-items: center; gap: 0.75rem; padding: 1rem; background: #f3f4f6; border-radius: 0.75rem; border-left: 4px solid #06b6d4;">
                <div style="width: 40px; height: 40px; background: #06b6d4; border-radius: 0.5rem; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.25rem;">
                    <i class="fas fa-chart-line"></i>
                </div>
                <div>
                    <div style="font-size: 0.75rem; color: #6b7280; font-weight: 500; margin-bottom: 0.25rem;">Průměr / návštěva</div>
                    <div style="font-size: 1.5rem; font-weight: 700; color: #111827;">${closedVisits > 0 ? Math.round(totalSpent / closedVisits).toLocaleString('cs-CZ') : '0'} Kč</div>
                </div>
            </div>
        </div>
        
        <!-- Záložky -->
        <div style="display: flex; background: white; margin: 0 2rem; flex-shrink: 0;">
            <button class="tab-btn active" onclick="switchClientTab(${client.id}, 'visits')" data-tab="visits" style="flex: 1; padding: 1rem; border: none; background: none; cursor: pointer; font-weight: 600; color: #6b7280; border-bottom: 3px solid transparent; transition: all 0.2s;">
                <i class="fas fa-scissors"></i> Historie návštěv
            </button>
            <button class="tab-btn" onclick="switchClientTab(${client.id}, 'purchases')" data-tab="purchases" style="flex: 1; padding: 1rem; border: none; background: none; cursor: pointer; font-weight: 600; color: #6b7280; border-bottom: 3px solid transparent; transition: all 0.2s;">
                <i class="fas fa-shopping-bag"></i> Zakoupené produkty
            </button>
            <button class="tab-btn" onclick="switchClientTab(${client.id}, 'notes')" data-tab="notes" style="flex: 1; padding: 1rem; border: none; background: none; cursor: pointer; font-weight: 600; color: #6b7280; border-bottom: 3px solid transparent; transition: all 0.2s;">
                <i class="fas fa-sticky-note"></i> Poznámky
            </button>
        </div>
        
        <div id="clientTabVisits" class="client-tab-content">
            <h4 style="flex-shrink: 0; padding: 1.5rem 1.5rem 1rem 1.5rem; margin: 0;">Historie návštěv</h4>
            <div class="visits-list">
                ${visitsHtml}
            </div>
        </div>
        
        <div id="clientTabPurchases" class="client-tab-content" style="display: none;">
            <h4 style="flex-shrink: 0; padding: 1.5rem 1.5rem 1rem 1.5rem; margin: 0;">Zakoupené produkty</h4>
            <div class="visits-list">
                ${renderClientPurchases(client)}
            </div>
        </div>
        
        <div id="clientTabNotes" class="client-tab-content" style="display: none;">
            <div style="flex-shrink: 0; padding: 1.5rem 1.5rem 1rem 1.5rem; margin: 0; display: flex; justify-content: space-between; align-items: center;">
                <h4 style="margin: 0;">Poznámky</h4>
                <button class="btn btn-primary" onclick="openNoteModal(${client.id})">
                    <i class="fas fa-plus"></i> Nová poznámka
                </button>
            </div>
            <div class="visits-list" id="clientNotesList">
                ${renderClientNotes(client)}
            </div>
        </div>
    `;
}

function switchClientTab(clientId, tabName) {
    // Aktualizovat tlačítka
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
        btn.style.color = '#6b7280';
        btn.style.borderBottomColor = 'transparent';
    });
    
    const activeBtn = document.querySelector(`[data-tab="${tabName}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
        activeBtn.style.color = 'var(--primary-color)';
        activeBtn.style.borderBottomColor = 'var(--primary-color)';
    }
    
    // Přepnout obsah
    document.getElementById('clientTabVisits').style.display = tabName === 'visits' ? 'flex' : 'none';
    document.getElementById('clientTabPurchases').style.display = tabName === 'purchases' ? 'flex' : 'none';
    document.getElementById('clientTabNotes').style.display = tabName === 'notes' ? 'flex' : 'none';
}

function renderClientPurchases(client) {
    if (!client.purchases || client.purchases.length === 0) {
        return '<p style="color: var(--text-light); text-align: center; padding: 2rem;">Zatím žádné nákupy</p>';
    }
    
    return client.purchases.map(purchase => {
        const productsHtml = purchase.items.map(item => 
            `<div style="margin-bottom: 0.25rem;">• ${item.name} - ${item.quantity} ks × ${item.price} Kč = ${item.quantity * item.price} Kč</div>`
        ).join('');
        
        return `
            <div class="visit-item">
                <div class="visit-date">
                    ${formatDate(purchase.date)}
                    <div class="visit-price"><i class="fas fa-coins"></i> ${purchase.total} Kč</div>
                </div>
                <div class="visit-services"><strong>Produkty:</strong></div>
                ${productsHtml}
                ${purchase.customerName && purchase.customerName !== client.firstName + ' ' + client.lastName ? `<div style="font-size: 0.875rem; color: #6b7280; margin-top: 0.5rem;">Jméno při nákupu: ${purchase.customerName}</div>` : ''}
            </div>
        `;
    }).join('');
}

function renderClientNotes(client) {
    if (!client.notes || client.notes.length === 0) {
        return '<p style="color: var(--text-light); text-align: center; padding: 2rem;">Zatím žádné poznámky</p>';
    }
    
    return client.notes.map(note => {
        return `
            <div class="visit-item" style="position: relative;">
                <div class="visit-date">
                    ${formatDate(note.date)}
                    <div style="display: flex; gap: 0.5rem;">
                        <button onclick="editNote(${client.id}, ${note.id})" style="padding: 0.25rem 0.5rem; background: #3b82f6; color: white; border: none; border-radius: 0.375rem; cursor: pointer; font-size: 0.75rem;">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="deleteNote(${client.id}, ${note.id})" style="padding: 0.25rem 0.5rem; background: #ef4444; color: white; border: none; border-radius: 0.375rem; cursor: pointer; font-size: 0.75rem;">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <div style="white-space: pre-wrap; line-height: 1.6;">${note.text}</div>
            </div>
        `;
    }).join('');
}

function openNoteModal(clientId, noteId = null) {
    const client = clients.find(c => c.id === clientId);
    if (!client) return;
    
    document.getElementById('noteClientId').value = clientId;
    document.getElementById('noteId').value = noteId || '';
    
    if (noteId) {
        const note = client.notes.find(n => n.id === noteId);
        document.getElementById('noteModalTitle').textContent = 'Upravit poznámku';
        document.getElementById('noteText').value = note.text;
    } else {
        document.getElementById('noteModalTitle').textContent = 'Nová poznámka';
        document.getElementById('noteText').value = '';
    }
    
    document.getElementById('noteModal').classList.add('show');
    setTimeout(() => document.getElementById('noteText').focus(), 100);
}

function closeNoteModal() {
    document.getElementById('noteModal').classList.remove('show');
}

async function saveNoteForm(event) {
    event.preventDefault();
    
    const clientId = parseInt(document.getElementById('noteClientId').value);
    const noteId = document.getElementById('noteId').value;
    const text = document.getElementById('noteText').value.trim();
    
    if (!text) return;
    
    const client = clients.find(c => c.id === clientId);
    if (!client) return;
    
    if (!client.notes) {
        client.notes = [];
    }
    
    const noteData = {
        clientId,
        text,
        date: new Date().toISOString().split('T')[0]
    };
    
    try {
        if (noteId) {
            // Upravit existující poznámku
            noteData.id = parseInt(noteId);
            await apiCall('visits.php?action=note', 'PUT', noteData);
            
            const note = client.notes.find(n => n.id === parseInt(noteId));
            if (note) {
                note.text = text;
                note.date = noteData.date;
            }
        } else {
            // Přidat novou poznámku
            const result = await apiCall('visits.php?action=note', 'POST', noteData);
            const newNote = {
                id: result.id,
                text,
                date: noteData.date
            };
            client.notes.push(newNote);
        }
        
        closeNoteModal();
        showClientDetail(client);
        switchClientTab(clientId, 'notes');
        showNotification('Poznámka uložena', 'success');
    } catch (error) {
        showNotification('Chyba při ukládání poznámky', 'error');
    }
}

function editNote(clientId, noteId) {
    openNoteModal(clientId, noteId);
}

async function deleteNote(clientId, noteId) {
    if (!confirm('Opravdu smazat tuto poznámku?')) return;
    
    const client = clients.find(c => c.id === clientId);
    if (!client || !client.notes) return;
    
    try {
        await apiCall(`visits.php?action=note&id=${noteId}`, 'DELETE');
        
        client.notes = client.notes.filter(n => n.id !== noteId);
        showClientDetail(client);
        switchClientTab(clientId, 'notes');
        showNotification('Poznámka smazána', 'success');
    } catch (error) {
        showNotification('Chyba při mazání poznámky', 'error');
    }
}

function addNewClient() {
    document.getElementById('clientModalTitle').textContent = 'Nový klient';
    document.getElementById('clientId').value = '';
    document.getElementById('clientFirstName').value = '';
    document.getElementById('clientLastName').value = '';
    document.getElementById('clientPhone').value = '';
    document.getElementById('clientEmail').value = '';
    
    // Naplnit dropdown skupin
    const groupSelect = document.getElementById('clientGroupId');
    groupSelect.innerHTML = '<option value="">-- Bez skupiny --</option>';
    clientGroups.forEach(group => {
        const option = document.createElement('option');
        option.value = group.id;
        option.innerHTML = `<i class="fas ${group.icon}"></i> ${group.name}`;
        option.textContent = group.name;
        groupSelect.appendChild(option);
    });
    groupSelect.value = '';
    
    document.getElementById('clientModal').classList.add('show');
}

function editClient(clientId) {
    const client = clients.find(c => c.id === clientId);
    if (!client) return;
    
    document.getElementById('clientModalTitle').textContent = 'Upravit klienta';
    document.getElementById('clientId').value = client.id;
    document.getElementById('clientFirstName').value = client.firstName;
    document.getElementById('clientLastName').value = client.lastName;
    document.getElementById('clientPhone').value = client.phone;
    document.getElementById('clientEmail').value = client.email || '';
    
    // Naplnit dropdown skupin
    const groupSelect = document.getElementById('clientGroupId');
    groupSelect.innerHTML = '<option value="">-- Bez skupiny --</option>';
    clientGroups.forEach(group => {
        const option = document.createElement('option');
        option.value = group.id;
        option.textContent = group.name;
        groupSelect.appendChild(option);
    });
    groupSelect.value = client.groupId || '';
    
    document.getElementById('clientModal').classList.add('show');
}

function closeClientModal() {
    document.getElementById('clientModal').classList.remove('show');
}

async function saveClientForm(event) {
    event.preventDefault();
    
    const clientId = document.getElementById('clientId').value;
    const firstName = document.getElementById('clientFirstName').value.trim();
    const lastName = document.getElementById('clientLastName').value.trim();
    const phone = document.getElementById('clientPhone').value.trim();
    const email = document.getElementById('clientEmail').value.trim();
    const groupId = document.getElementById('clientGroupId').value ? parseInt(document.getElementById('clientGroupId').value) : null;
    
    const clientData = {
        firstName,
        lastName,
        phone,
        email,
        groupId,
        avatar: null
    };
    
    try {
        if (clientId) {
            // Úprava existujícího klienta
            clientData.id = parseInt(clientId);
            await apiCall('clients.php', 'PUT', clientData);
            
            const client = clients.find(c => c.id === parseInt(clientId));
            if (client) {
                Object.assign(client, clientData);
                renderClientGroups();
                renderClients();
                showClientDetail(client);
            }
        } else {
            // Nový klient
            const result = await apiCall('clients.php', 'POST', clientData);
            const newClient = {
                id: result.id,
                ...clientData,
                visits: [],
                purchases: [],
                notes: []
            };
            
            clients.push(newClient);
            renderClientGroups();
            renderClients();
        }
        
        closeClientModal();
        showNotification('Klient uložen', 'success');
    } catch (error) {
        showNotification('Chyba při ukládání klienta', 'error');
    }
}

function deleteClient(clientId) {
    const client = clients.find(c => c.id === clientId);
    if (!client) return;
    
    // Nastavit data pro confirm modal
    window.pendingDeleteClient = client;
    
    // Zobrazit potvrzovací modal
    document.getElementById('confirmModalTitle').textContent = 'Smazat klienta';
    document.getElementById('confirmModalMessage').innerHTML = `
        Opravdu chcete smazat klienta <strong>${client.firstName} ${client.lastName}</strong>?
        <br><br>
        <span style="color: #ef4444;">Tato akce je nevratná a smažou se i všechny návštěvy a nákupy!</span>
    `;
    document.getElementById('confirmModalBtn').textContent = 'Smazat';
    document.getElementById('confirmModalBtn').style.background = '#ef4444';
    document.getElementById('confirmModalBtn').onclick = confirmDeleteClient;
    
    document.getElementById('confirmModal').classList.add('show');
}

async function confirmDeleteClient() {
    const client = window.pendingDeleteClient;
    if (!client) return;
    
    try {
        await apiCall(`clients.php?id=${client.id}`, 'DELETE');
        
        const index = clients.findIndex(c => c.id === client.id);
        if (index !== -1) {
            clients.splice(index, 1);
            renderClients();
            
            // Vyčistit detail panel
            document.getElementById('clientDetail').innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-user-circle"></i>
                    <p>Vyberte klienta ze seznamu</p>
                </div>
            `;
        }
        
        showNotification('Klient smazán', 'success');
    } catch (error) {
        showNotification('Chyba při mazání klienta', 'error');
    }
    
    closeConfirmModal();
    window.pendingDeleteClient = null;
}

function closeConfirmModal() {
    document.getElementById('confirmModal').classList.remove('show');
}

// === NOVÁ NÁVŠTĚVA ===

function startNewVisit(clientId) {
    const client = clients.find(c => c.id === clientId);
    if (!client) return;
    
    currentVisit = {
        id: null,
        clientId: clientId,
        services: [],
        products: [],
        closed: false
    };
    
    document.getElementById('visitTitle').textContent = 'Nová návštěva';
    document.getElementById('visitClientName').textContent = `${client.firstName} ${client.lastName}`;
    
    // Přepnout na stránku nové návštěvy
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById('page-new-visit').classList.add('active');
    
    // Vykreslit služby, materiály a produkty
    selectedMaterialCategory = null;
    renderServiceRows();
    renderMaterialCategories();
    renderMaterialCards();
    updateSelectedServices();
    updateSelectedProducts();
    filterProductsForSale();
    updateVisitButtons();
}

function editVisit(clientId, visitId) {
    const client = clients.find(c => c.id === clientId);
    if (!client) return;
    
    const visit = client.visits.find(v => v.id === visitId);
    if (!visit || visit.closed) {
        alert('Tuto návštěvu nelze upravovat!');
        return;
    }
    
    currentVisit = {
        id: visitId,
        clientId: clientId,
        services: JSON.parse(JSON.stringify(visit.services)),
        products: JSON.parse(JSON.stringify(visit.products || [])),
        closed: false
    };
    
    document.getElementById('visitTitle').textContent = 'Úprava návštěvy';
    document.getElementById('visitClientName').textContent = `${client.firstName} ${client.lastName}`;
    
    // Přepnout na stránku návštěvy
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById('page-new-visit').classList.add('active');
    
    // Vykreslit služby, materiály a produkty
    selectedMaterialCategory = null;
    renderServiceRows();
    renderMaterialCategories();
    renderMaterialCards();
    updateSelectedServices();
    updateSelectedProducts();
    filterProductsForSale();
    updateVisitButtons();
}

function renderServiceRows() {
    const container = document.getElementById('serviceRows');
    container.innerHTML = '';
    
    services.forEach(service => {
        const row = document.createElement('div');
        row.className = 'service-row';
        row.draggable = !currentVisit.closed;
        if (currentVisit.closed) {
            row.style.opacity = '0.5';
            row.style.cursor = 'not-allowed';
        }
        
        const editBtn = `
            <button class="service-edit-btn" onclick="event.stopPropagation(); editServiceInPos(${service.id})" title="Upravit službu">
                <i class="fas fa-edit"></i>
            </button>
        `;
        
        row.innerHTML = `
            <div class="service-row-info">
                <h5>${service.name}</h5>
                <p>${service.description} • ${service.duration} min</p>
            </div>
            <div class="service-row-actions">
                ${editBtn}
                <i class="fas fa-plus" style="color: var(--primary-color); font-size: 1.25rem;"></i>
            </div>
        `;
        
        if (!currentVisit.closed) {
            let isDragging = false;
            
            // Drag and drop
            row.addEventListener('dragstart', (e) => {
                isDragging = true;
                e.dataTransfer.setData('serviceId', service.id);
                e.dataTransfer.setData('type', 'service');
                row.classList.add('dragging');
            });
            
            row.addEventListener('dragend', () => {
                row.classList.remove('dragging');
                // Reset isDragging po malé prodlevě, aby click nebyl vyvolán
                setTimeout(() => { isDragging = false; }, 100);
            });
            
            row.addEventListener('click', () => {
                if (!isDragging) {
                    addServiceToVisit(service);
                }
            });
        }
        container.appendChild(row);
    });
}

function renderMaterialCategories() {
    const container = document.getElementById('materialCategories');
    container.innerHTML = '';
    
    // Přidat tlačítko "Vše"
    const allBtn = document.createElement('button');
    allBtn.className = 'category-btn' + (selectedMaterialCategory === null ? ' active' : '');
    allBtn.innerHTML = `<i class="fas fa-th"></i> Vše`;
    allBtn.onclick = () => {
        selectedMaterialCategory = null;
        renderMaterialCategories();
        renderMaterialCards();
    };
    container.appendChild(allBtn);
    
    // Přidat tlačítka kategorií
    productCategories.forEach(category => {
        const btn = document.createElement('button');
        btn.className = 'category-btn' + (selectedMaterialCategory === category.id ? ' active' : '');
        btn.style.setProperty('--category-color', category.color);
        btn.innerHTML = `<i class="fas ${category.icon}"></i> ${category.name}`;
        btn.onclick = () => {
            selectedMaterialCategory = category.id;
            renderMaterialCategories();
            renderMaterialCards();
        };
        container.appendChild(btn);
    });
}

function renderMaterialCategories() {
    const container = document.getElementById('materialCategories');
    container.innerHTML = '';
    
    // Přidat tlačítko "Vše"
    const allBtn = document.createElement('button');
    allBtn.className = 'category-btn' + (selectedMaterialCategory === null ? ' active' : '');
    allBtn.innerHTML = `<i class="fas fa-th"></i> Vše`;
    allBtn.onclick = () => {
        selectedMaterialCategory = null;
        renderMaterialCategories();
        renderMaterialCards();
    };
    container.appendChild(allBtn);
    
    // Přidat tlačítka kategorií
    productCategories.forEach(category => {
        const btn = document.createElement('button');
        btn.className = 'category-btn' + (selectedMaterialCategory === category.id ? ' active' : '');
        btn.style.setProperty('--category-color', category.color);
        btn.innerHTML = `<i class="fas ${category.icon}"></i> ${category.name}`;
        btn.onclick = () => {
            selectedMaterialCategory = category.id;
            renderMaterialCategories();
            renderMaterialCards();
        };
        container.appendChild(btn);
    });
}

function renderMaterialCards() {
    const container = document.getElementById('materialCards');
    container.innerHTML = '';
    
    // Filtrovat produkty podle vybrané kategorie
    const filteredProducts = selectedMaterialCategory 
        ? products.filter(p => p.categoryId === selectedMaterialCategory)
        : products;
    
    filteredProducts.forEach(product => {
        const category = productCategories.find(c => c.id === product.categoryId);
        const categoryIcon = category ? category.icon : 'fa-box';
        const categoryColor = category ? category.color : '#10b981';
        
        const card = document.createElement('div');
        card.className = 'material-card';
        card.draggable = !currentVisit.closed;
        card.style.setProperty('--card-color', categoryColor);
        if (currentVisit.closed) {
            card.style.opacity = '0.5';
            card.style.cursor = 'not-allowed';
        }
        card.innerHTML = `
            <i class="fas ${categoryIcon}" style="color: ${categoryColor}"></i>
            <h6>${product.name}</h6>
            <p>Sklad: ${formatStockDisplay(product)}</p>
        `;
        
        if (!currentVisit.closed) {
            // Drag and drop
            card.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('productId', product.id);
                e.dataTransfer.setData('type', 'material');
                card.classList.add('dragging');
            });
            
            card.addEventListener('dragend', () => {
                card.classList.remove('dragging');
            });
            
            card.addEventListener('click', () => addMaterialToLastService(product));
        }
        container.appendChild(card);
    });
}

function addServiceToVisit(service) {
    if (currentVisit.closed) {
        alert('Návštěva je uzavřená, nelze přidávat služby!');
        return;
    }
    
    const newService = {
        serviceId: service.id,
        name: service.name,
        materials: []
    };
    
    currentVisit.services.push(newService);
    selectedServiceIndex = currentVisit.services.length - 1; // Vybrat nově přidanou službu
    updateSelectedServices();
}

function selectServiceInVisit(index) {
    if (currentVisit.closed) return;
    selectedServiceIndex = index;
    updateSelectedServices();
}

function addMaterialToLastService(product) {
    if (currentVisit.closed) {
        document.getElementById('confirmModalTitle').textContent = 'Návštěva uzavřena';
        document.getElementById('confirmModalMessage').textContent = 'Návštěva je uzavřená, nelze přidávat materiály!';
        document.getElementById('confirmModalBtn').textContent = 'OK';
        document.getElementById('confirmModalBtn').className = 'btn btn-primary';
        document.getElementById('confirmModalBtn').onclick = closeConfirmModal;
        document.getElementById('confirmModal').classList.add('show');
        return;
    }
    
    if (currentVisit.services.length === 0) {
        document.getElementById('confirmModalTitle').textContent = 'Není vybraná služba';
        document.getElementById('confirmModalMessage').textContent = 'Nejprve vyberte službu, ke které chcete přidat materiál!';
        document.getElementById('confirmModalBtn').textContent = 'OK';
        document.getElementById('confirmModalBtn').className = 'btn btn-primary';
        document.getElementById('confirmModalBtn').onclick = closeConfirmModal;
        document.getElementById('confirmModal').classList.add('show');
        return;
    }
    
    // Pokud není vybrána žádná služba, vybrat poslední
    if (selectedServiceIndex < 0 || selectedServiceIndex >= currentVisit.services.length) {
        selectedServiceIndex = currentVisit.services.length - 1;
    }
    
    // Uložit produkt do globální proměnné pro modal
    window.currentMaterialProduct = product;
    
    // Nastavit informace o produktu v modalu
    const category = productCategories.find(c => c.id === product.categoryId);
    const categoryIcon = category ? category.icon : 'fa-box';
    const categoryColor = category ? category.color : '#10b981';
    
    const materialModalTitle = document.getElementById('materialModalTitle');
    if (!materialModalTitle) {
        // Modal ještě není načtený, zkusit znovu
        setTimeout(() => addMaterialToLastService(product), 50);
        return;
    }
    
    materialModalTitle.textContent = 'Přidat materiál';
    document.getElementById('materialProductId').value = product.id;
    document.getElementById('materialServiceIndex').value = '';
    document.getElementById('materialIndex').value = '';
    document.getElementById('materialProductIcon').className = `fas ${categoryIcon}`;
    document.getElementById('materialProductName').textContent = product.name;
    document.getElementById('materialProductStock').textContent = `Sklad: ${formatStockDisplay(product)}`;
    
    // Nastavit jednotky podle typu produktu
    const materialUnitSelect = document.getElementById('materialUnit');
    materialUnitSelect.innerHTML = '';
    const unitOptions = getUnitOptions(product.unit);
    unitOptions.forEach(u => {
        const option = document.createElement('option');
        option.value = u;
        option.textContent = u;
        if (u === product.unit) option.selected = true;
        materialUnitSelect.appendChild(option);
    });
    
    // Reset hodnot
    document.getElementById('materialQuantity').value = '1';
    
    // Změnit barvu boxu s produktem podle kategorie
    const productInfoBox = document.getElementById('materialProductInfo');
    if (productInfoBox) {
        productInfoBox.style.background = `linear-gradient(135deg, ${categoryColor}, ${categoryColor}dd)`;
    }
    
    // Zobrazit náhled
    updateMaterialPreview();
    
    document.getElementById('materialModal').classList.add('show');
}

function closeMaterialModal() {
    document.getElementById('materialModal').classList.remove('show');
    window.currentMaterialProduct = null;
}

function updateMaterialPreview() {
    const product = window.currentMaterialProduct;
    if (!product) return;
    
    const quantity = parseFloat(document.getElementById('materialQuantity').value);
    const unit = document.getElementById('materialUnit').value;
    
    if (!quantity || quantity <= 0) {
        document.getElementById('materialPreview').style.display = 'none';
        return;
    }
    
    // Zobrazit preview
    document.getElementById('materialPreview').style.display = 'block';
    
    // Zadané množství
    document.getElementById('previewInput').textContent = `${quantity} ${unit}`;
    
    // Převést na základní jednotku
    const baseQuantity = convertToBaseUnit(quantity, unit, product.unit, product);
    document.getElementById('previewBaseUnit').textContent = `${baseQuantity.toFixed(2)} ${product.unit}`;
    
    // Aktuální stav
    document.getElementById('previewCurrentStock').textContent = formatStockDisplay(product);
    
    // Stav po odečtu
    const afterStock = product.stock - baseQuantity;
    const afterStockInPieces = afterStock / product.packageSize;
    const afterColor = afterStock < 0 ? '#ef4444' : (afterStock < product.minStock ? '#f59e0b' : '#10b981');
    document.getElementById('previewAfterStock').textContent = `${afterStockInPieces.toFixed(2)} ks`;
    document.getElementById('previewAfterStock').style.color = afterColor;
    
    if (afterStock < 0) {
        document.getElementById('previewAfterStock').innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${afterStockInPieces.toFixed(2)} ks (nedostatek!)`;
    }
}

function saveMaterialForm(event) {
    event.preventDefault();
    
    const product = window.currentMaterialProduct;
    if (!product) return;
    
    const quantity = parseFloat(document.getElementById('materialQuantity').value);
    const unit = document.getElementById('materialUnit').value;
    const serviceIndex = document.getElementById('materialServiceIndex').value;
    const materialIndex = document.getElementById('materialIndex').value;
    
    if (serviceIndex !== '' && materialIndex !== '') {
        // Editace existujícího materiálu
        const service = currentVisit.services[parseInt(serviceIndex)];
        const material = service.materials[parseInt(materialIndex)];
        material.quantity = quantity;
        material.unit = unit;
    } else {
        // Přidání nového materiálu
        const targetService = currentVisit.services[selectedServiceIndex];
        targetService.materials.push({
            productId: product.id,
            name: product.name,
            quantity: quantity,
            unit: unit,
            baseUnit: product.unit
        });
    }
    
    updateSelectedServices();
    closeMaterialModal();
}

// Funkce pro získání možných jednotek podle základní jednotky
function getUnitOptions(baseUnit) {
    if (baseUnit === 'g') {
        return ['g', 'ks'];
    } else if (baseUnit === 'ml') {
        return ['ml', 'ks'];
    } else if (baseUnit === 'ks') {
        return ['ks'];
    }
    return [baseUnit];
}

// Funkce pro převod jednotek na základní jednotku
function convertToBaseUnit(quantity, fromUnit, baseUnit, product) {
    // Pokud je jednotka stejná, vrátit množství
    if (fromUnit === baseUnit) {
        return quantity;
    }
    
    // Převod z ks na g/ml - použít packageSize
    if (fromUnit === 'ks' && (baseUnit === 'g' || baseUnit === 'ml')) {
        return quantity * product.packageSize;
    }
    
    // Převod z g/ml na ks - dělit packageSize
    if ((fromUnit === 'g' || fromUnit === 'ml') && baseUnit === 'ks') {
        return quantity / product.packageSize;
    }
    
    return quantity;
}

function updateSelectedServices() {
    const container = document.getElementById('selectedServices');
    
    if (currentVisit.services.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-hand-pointer"></i>
                <p>Vyberte službu ze seznamu</p>
            </div>
        `;
        // Nepřidávat listenery na prázdný stav - použijeme listener na kontejneru níže
        delete container.dataset.dropInitialized; // Reset pro případ, že se kontejner znovu naplní
        
        // Pokračovat dál, aby se přidal listener na kontejner
    } else {
        container.innerHTML = '';
    }
    
    if (currentVisit.services.length > 0) {
        currentVisit.services.forEach((service, index) => {
        const item = document.createElement('div');
        item.className = 'selected-item' + (index === selectedServiceIndex ? ' active' : '');
        
        if (!currentVisit.closed) {
            item.onclick = (e) => {
                // Zpracovat akce na materiálech
                const target = e.target.closest('[data-action]');
                if (target) {
                    e.stopPropagation();
                    const action = target.dataset.action;
                    const serviceIdx = parseInt(target.dataset.serviceIndex);
                    const materialIdx = parseInt(target.dataset.materialIndex);
                    
                    if (action === 'edit-material') {
                        editMaterialQuantity(serviceIdx, materialIdx);
                    } else if (action === 'remove-material') {
                        removeMaterialFromService(serviceIdx, materialIdx);
                    }
                    return;
                }
                
                // Neklikat pokud se kliklo na remove button
                if (e.target.closest('.remove-btn')) return;
                selectServiceInVisit(index);
            };
        }
        
        let materialsHtml = '';
        if (service.materials.length > 0) {
            const materialTags = service.materials.map((m, mIndex) => {
                const removeBtn = !currentVisit.closed 
                    ? `<i class="fas fa-times-circle" 
                          style="color: #ef4444; cursor: pointer; margin-left: 0.5rem; font-size: 0.875rem;" 
                          title="Odstranit materiál"
                          data-action="remove-material"
                          data-service-index="${index}"
                          data-material-index="${mIndex}"></i>`
                    : '';
                
                return `
                    <span class="material-tag">
                        <i class="fas fa-box"></i>
                        <span style="cursor: ${!currentVisit.closed ? 'pointer' : 'default'};" 
                              title="${!currentVisit.closed ? 'Klikněte pro úpravu množství' : ''}"
                              data-action="edit-material"
                              data-service-index="${index}"
                              data-material-index="${mIndex}">
                            ${m.name} (${m.quantity} ${m.unit})
                        </span>
                        ${removeBtn}
                    </span>
                `;
            }).join('');
            
            materialsHtml = `<div class="selected-item-materials">${materialTags}</div>`;
        }
        
        const removeBtn = !currentVisit.closed 
            ? `<button class="remove-btn" onclick="event.stopPropagation(); removeServiceFromVisit(${index})">
                    <i class="fas fa-times"></i>
               </button>`
            : '';
        
        const activeIndicator = index === selectedServiceIndex && !currentVisit.closed
            ? `<div style="font-size: 0.75rem; color: #059669; margin-top: 0.5rem; font-weight: 600;">
                 <i class="fas fa-arrow-right"></i> Přidávat materiály sem
               </div>`
            : '';
        
        item.innerHTML = `
            <div class="selected-item-header">
                <h5>${service.name}</h5>
                ${removeBtn}
            </div>
            ${materialsHtml}
            ${activeIndicator}
        `;
        
        // Drop zone pro materiály do této služby
        if (!currentVisit.closed) {
            item.addEventListener('dragover', (e) => {
                e.preventDefault();
                const type = e.dataTransfer.getData('type');
                if (type === 'material') {
                    item.classList.add('drag-over');
                }
            });
            
            item.addEventListener('dragleave', () => {
                item.classList.remove('drag-over');
            });
            
            item.addEventListener('drop', (e) => {
                e.preventDefault();
                e.stopPropagation(); // Zabránit propagaci na kontejner
                item.classList.remove('drag-over');
                
                const type = e.dataTransfer.getData('type');
                if (type === 'material') {
                    const productId = parseInt(e.dataTransfer.getData('productId'));
                    const product = products.find(p => p.id === productId);
                    if (product) {
                        // Přidat materiál do této konkrétní služby
                        selectedServiceIndex = index;
                        addMaterialToLastService(product);
                    }
                }
            });
        }
        
        container.appendChild(item);
        });
    }
    
    // Drop zone pro celý kontejner služeb - nastavit jen jednou
    if (!currentVisit.closed && !container.dataset.dropInitialized) {
        container.dataset.dropInitialized = 'true';
        
        container.addEventListener('dragover', (e) => {
            e.preventDefault();
            const type = e.dataTransfer.getData('type');
            if (type === 'service') {
                container.style.background = '#f5f3ff';
            }
        });
        
        container.addEventListener('dragleave', (e) => {
            // Pouze když opouštíme celý kontejner, ne jen přechod mezi dětmi
            if (e.target === container) {
                container.style.background = '';
            }
        });
        
        container.addEventListener('drop', (e) => {
            e.preventDefault();
            container.style.background = '';
            
            const type = e.dataTransfer.getData('type');
            if (type === 'service') {
                const serviceId = parseInt(e.dataTransfer.getData('serviceId'));
                const service = services.find(s => s.id === serviceId);
                if (service) addServiceToVisit(service);
            }
        });
    }
    
    // Automaticky scrollovat dolů, aby byla poslední přidaná služba viditelná
    setTimeout(() => {
        container.scrollTop = container.scrollHeight;
    }, 100);
}

// Funkce pro prodej produktů
function filterProductsForSale() {
    const search = document.getElementById('productSaleSearch').value.toLowerCase();
    const container = document.getElementById('productsForSale');
    
    const filteredProducts = products.filter(p => 
        p.name.toLowerCase().includes(search) && 
        calculatePieces(p.stock, p.unit, p.packageSize) > 0
    );
    
    if (filteredProducts.length === 0) {
        container.innerHTML = '<div style="grid-column: 1 / -1; text-align: center; color: #9ca3af; padding: 2rem;">Žádné dostupné produkty</div>';
        return;
    }
    
    container.innerHTML = filteredProducts.map(p => {
        const pieces = calculatePieces(p.stock, p.unit, p.packageSize);
        const category = productCategories.find(c => c.id === p.categoryId);
        
        return `
            <div class="product-sale-card" onclick="addProductToSale(${p.id})" style="cursor: pointer; padding: 0.75rem; background: white; border: 2px solid #e5e7eb; border-radius: 0.5rem; transition: all 0.2s;">
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                    <i class="fas ${category?.icon || 'fa-box'}" style="color: ${category?.color || '#6b7280'};"></i>
                    <strong style="font-size: 0.875rem;">${p.name}</strong>
                </div>
                <div style="font-size: 0.75rem; color: #6b7280;">
                    Sklad: <strong>${pieces} ks</strong>
                </div>
            </div>
        `;
    }).join('');
}

function addProductToSale(productId) {
    if (currentVisit.closed) {
        alert('Návštěva je uzavřená, nelze přidávat produkty!');
        return;
    }
    
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const pieces = calculatePieces(product.stock, product.unit, product.packageSize);
    if (pieces <= 0) {
        alert('Produkt není skladem!');
        return;
    }
    
    // Zkontrolovat, jestli už není v seznamu
    const existing = currentVisit.products.find(p => p.productId === productId);
    if (existing) {
        if (existing.quantity < pieces) {
            existing.quantity++;
        } else {
            alert('Nelze přidat více kusů, než je skladem!');
            return;
        }
    } else {
        currentVisit.products.push({
            productId: productId,
            name: product.name,
            quantity: 1,
            packageSize: product.packageSize,
            unit: product.unit
        });
    }
    
    updateSelectedProducts();
}

function updateSelectedProducts() {
    const container = document.getElementById('selectedProducts');
    if (!container) return; // Element neexistuje při editaci návštěvy
    
    if (currentVisit.products.length === 0) {
        container.innerHTML = '';
        return;
    }
    
    container.innerHTML = `
        <div style="background: #f9fafb; border-radius: 0.5rem; padding: 1rem;">
            <h4 style="margin: 0 0 0.75rem 0; font-size: 0.875rem; color: #6b7280;">Produkty k prodeji:</h4>
            ${currentVisit.products.map((p, index) => `
                <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.5rem; background: white; border-radius: 0.375rem; margin-bottom: 0.5rem;">
                    <div style="flex: 1;">
                        <strong>${p.name}</strong>
                        <div style="font-size: 0.75rem; color: #6b7280;">${p.packageSize} ${p.unit}/ks</div>
                    </div>
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        ${!currentVisit.closed ? `
                            <button onclick="changeProductQuantity(${index}, -1)" class="btn-icon" style="width: 28px; height: 28px;">
                                <i class="fas fa-minus"></i>
                            </button>
                        ` : ''}
                        <span style="min-width: 50px; text-align: center; font-weight: 600;">${p.quantity} ks</span>
                        ${!currentVisit.closed ? `
                            <button onclick="changeProductQuantity(${index}, 1)" class="btn-icon" style="width: 28px; height: 28px;">
                                <i class="fas fa-plus"></i>
                            </button>
                            <button onclick="removeProductFromSale(${index})" class="btn-icon" style="width: 28px; height: 28px; color: #ef4444;">
                                <i class="fas fa-trash"></i>
                            </button>
                        ` : ''}
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function changeProductQuantity(index, delta) {
    if (currentVisit.closed) return;
    
    const saleProduct = currentVisit.products[index];
    const product = products.find(p => p.id === saleProduct.productId);
    const maxPieces = calculatePieces(product.stock, product.unit, product.packageSize);
    
    const newQuantity = saleProduct.quantity + delta;
    
    if (newQuantity <= 0) {
        removeProductFromSale(index);
        return;
    }
    
    if (newQuantity > maxPieces) {
        alert('Nelze přidat více kusů, než je skladem!');
        return;
    }
    
    saleProduct.quantity = newQuantity;
    updateSelectedProducts();
}

function removeProductFromSale(index) {
    if (currentVisit.closed) return;
    
    currentVisit.products.splice(index, 1);
    updateSelectedProducts();
}

function updateVisitButtons() {
    const btnSaveOpen = document.getElementById('btnSaveOpen');
    const btnSaveClose = document.getElementById('btnSaveClose');
    
    if (currentVisit.closed) {
        btnSaveOpen.style.display = 'none';
        btnSaveClose.style.display = 'none';
    } else {
        btnSaveOpen.style.display = 'inline-flex';
        btnSaveClose.style.display = 'inline-flex';
    }
}

function removeServiceFromVisit(index) {
    if (currentVisit.closed) {
        alert('Návštěva je uzavřená, nelze odebírat služby!');
        return;
    }
    
    const service = currentVisit.services[index];
    const materialCount = service.materials.length;
    
    // Nastavit data pro confirm modal
    window.pendingRemoveService = index;
    
    // Zobrazit potvrzovací modal
    document.getElementById('confirmModalTitle').textContent = 'Odstranit službu';
    if (materialCount > 0) {
        document.getElementById('confirmModalMessage').innerHTML = `
            Opravdu chcete odstranit službu <strong>${service.name}</strong>?<br><br>
            <span style="color: #f59e0b;">Služba obsahuje ${materialCount} materiálů, které budou také odstraněny.</span>
        `;
    } else {
        document.getElementById('confirmModalMessage').innerHTML = `
            Opravdu chcete odstranit službu <strong>${service.name}</strong>?
        `;
    }
    document.getElementById('confirmModalBtn').textContent = 'Odstranit';
    document.getElementById('confirmModalBtn').style.background = '#ef4444';
    document.getElementById('confirmModalBtn').onclick = confirmRemoveService;
    
    document.getElementById('confirmModal').classList.add('show');
}

function confirmRemoveService() {
    const index = window.pendingRemoveService;
    if (index === undefined) return;
    
    currentVisit.services.splice(index, 1);
    
    // Upravit vybraný index
    if (selectedServiceIndex >= currentVisit.services.length) {
        selectedServiceIndex = currentVisit.services.length - 1;
    }
    
    updateSelectedServices();
    closeConfirmModal();
    window.pendingRemoveService = null;
}

function removeMaterialFromService(serviceIndex, materialIndex) {
    if (currentVisit.closed) {
        alert('Návštěva je uzavřená, nelze odebírat materiály!');
        return;
    }
    
    const service = currentVisit.services[serviceIndex];
    const material = service.materials[materialIndex];
    
    // Nastavit data pro confirm modal
    window.pendingRemoveMaterial = { serviceIndex, materialIndex };
    
    // Zobrazit potvrzovací modal
    document.getElementById('confirmModalTitle').textContent = 'Odstranit materiál';
    document.getElementById('confirmModalMessage').innerHTML = `
        Opravdu chcete odstranit materiál <strong>${material.name}</strong>?<br>
        Množství: <strong>${material.quantity} ${material.unit}</strong>
    `;
    document.getElementById('confirmModalBtn').textContent = 'Odstranit';
    document.getElementById('confirmModalBtn').style.background = '#ef4444';
    document.getElementById('confirmModalBtn').onclick = confirmRemoveMaterial;
    
    document.getElementById('confirmModal').classList.add('show');
}

function confirmRemoveMaterial() {
    const data = window.pendingRemoveMaterial;
    if (!data) return;
    
    const service = currentVisit.services[data.serviceIndex];
    service.materials.splice(data.materialIndex, 1);
    
    updateSelectedServices();
    closeConfirmModal();
    window.pendingRemoveMaterial = null;
}

function editMaterialQuantity(serviceIndex, materialIndex) {
    if (currentVisit.closed) {
        alert('Návštěva je uzavřená, nelze upravovat materiály!');
        return;
    }
    
    const service = currentVisit.services[serviceIndex];
    const material = service.materials[materialIndex];
    const product = products.find(p => p.id === material.productId);
    
    if (!product) {
        alert('Produkt nebyl nalezen!');
        return;
    }
    
    // Uložit produkt do globální proměnné pro modal
    window.currentMaterialProduct = product;
    
    // Nastavit informace o produktu v modalu
    const category = productCategories.find(c => c.id === product.categoryId);
    const categoryIcon = category ? category.icon : 'fa-box';
    const categoryColor = category ? category.color : '#10b981';
    
    document.getElementById('materialModalTitle').textContent = 'Upravit množství materiálu';
    document.getElementById('materialProductId').value = product.id;
    document.getElementById('materialServiceIndex').value = serviceIndex;
    document.getElementById('materialIndex').value = materialIndex;
    document.getElementById('materialProductIcon').className = `fas ${categoryIcon}`;
    document.getElementById('materialProductName').textContent = product.name;
    document.getElementById('materialProductStock').textContent = `Sklad: ${formatStockDisplay(product)}`;
    
    // Nastavit jednotky podle typu produktu
    const materialUnitSelect = document.getElementById('materialUnit');
    materialUnitSelect.innerHTML = '';
    const unitOptions = getUnitOptions(product.unit);
    unitOptions.forEach(u => {
        const option = document.createElement('option');
        option.value = u;
        option.textContent = u;
        if (u === material.unit) option.selected = true;
        materialUnitSelect.appendChild(option);
    });
    
    // Nastavit hodnoty
    document.getElementById('materialQuantity').value = material.quantity;
    document.getElementById('materialUnit').value = material.unit;
    
    // Změnit barvu headeru podle kategorie
    const modalHeader = document.querySelector('#materialModal .modal-body > form > div:nth-child(2)');
    if (modalHeader) {
        modalHeader.style.background = `linear-gradient(135deg, ${categoryColor}, ${categoryColor}dd)`;
    }
    
    updateMaterialPreview();
    document.getElementById('materialModal').classList.add('show');
}

function saveVisit(closeVisit) {
    // Zkontrolovat, zda existuje alespoň jedna služba nebo materiál
    const hasMaterials = currentVisit.services.some(s => s.materials && s.materials.length > 0);
    const hasServices = currentVisit.services.length > 0;
    const hasProducts = currentVisit.products.length > 0;
    
    if (!hasServices && !hasMaterials && !hasProducts) {
        document.getElementById('confirmModalTitle').textContent = 'Prázdná návštěva';
        document.getElementById('confirmModalMessage').textContent = 'Přidejte alespoň jednu službu nebo materiál!';
        document.getElementById('confirmModalBtn').textContent = 'OK';
        document.getElementById('confirmModalBtn').className = 'btn btn-primary';
        document.getElementById('confirmModalBtn').onclick = closeConfirmModal;
        document.getElementById('confirmModal').classList.add('show');
        return;
    }
    
    const client = clients.find(c => c.id === currentVisit.clientId);
    if (!client) return;
    
    // Vždy otevřít modal - buď pro uzavření nebo jen uložení
    if (closeVisit) {
        document.getElementById('visitPrice').value = '';
        document.getElementById('visitNote').value = '';
        document.getElementById('closeVisitClientName').textContent = `${client.firstName} ${client.lastName}`;
        
        // Vygenerovat seznam materiálů k odepsání
        generateWriteOffMaterialList();
        
        document.getElementById('closeVisitModal').classList.add('show');
    } else {
        document.getElementById('saveVisitNote').value = '';
        document.getElementById('saveVisitClientName').textContent = `${client.firstName} ${client.lastName}`;
        document.getElementById('saveVisitModal').classList.add('show');
    }
}

function generateWriteOffMaterialList() {
    const container = document.getElementById('writeOffMaterialList');
    if (!container) {
        // Modal ještě není načtený, zkusit znovu za chvíli
        setTimeout(generateWriteOffMaterialList, 50);
        return;
    }
    
    let html = '';
    
    // Materiály ze služeb
    let hasMaterials = false;
    for (const service of currentVisit.services) {
        if (service.materials && service.materials.length > 0) {
            if (!hasMaterials) {
                html += '<div style="font-weight: 600; margin-bottom: 0.5rem; color: var(--text-dark);"><i class="fas fa-boxes"></i> Materiál ze služeb:</div>';
                hasMaterials = true;
            }
            html += `<div style="margin-bottom: 0.75rem; padding-left: 1rem;">`;
            html += `<div style="font-weight: 500; color: var(--primary-color); margin-bottom: 0.25rem;">${service.name}</div>`;
            for (const material of service.materials) {
                const product = products.find(p => p.id === material.productId);
                let quantityText = `${material.quantity} ${material.unit}`;
                
                // Převést na základní jednotku pokud je třeba
                if (product && material.unit !== product.unit) {
                    const baseQuantity = convertToBaseUnit(material.quantity, material.unit, product.unit, product);
                    if (baseQuantity !== null) {
                        quantityText += ` (${baseQuantity.toFixed(2)} ${product.unit})`;
                    }
                }
                
                html += `<div style="padding: 0.25rem 0; font-size: 0.875rem;">• ${material.name}: <strong>${quantityText}</strong></div>`;
            }
            html += '</div>';
        }
    }
    
    // Prodané produkty
    if (currentVisit.products && currentVisit.products.length > 0) {
        html += '<div style="font-weight: 600; margin: 1rem 0 0.5rem 0; color: var(--text-dark);"><i class="fas fa-shopping-bag"></i> Prodané produkty:</div>';
        for (const visitProduct of currentVisit.products) {
            // Najít produkt v seznamu produktů
            const product = products.find(p => p.id === visitProduct.productId);
            if (!product) continue; // Přeskočit pokud produkt neexistuje
            
            const totalAmount = (visitProduct.quantity || 0) * (product.packageSize || 1);
            html += `<div style="padding: 0.25rem 0 0.25rem 1rem; font-size: 0.875rem;">• ${product.name}: <strong>${visitProduct.quantity} ks</strong> (${totalAmount} ${product.unit || ''})</div>`;
        }
    }
    
    if (!hasMaterials && (!currentVisit.products || currentVisit.products.length === 0)) {
        html = '<div style="text-align: center; color: var(--text-light); padding: 1rem;">Žádný materiál k odepsání</div>';
    }
    
    container.innerHTML = html;
}

function closeSaveVisitModal() {
    document.getElementById('saveVisitModal').classList.remove('show');
}

async function saveSaveVisitForm(event) {
    event.preventDefault();
    
    const note = document.getElementById('saveVisitNote').value.trim();
    
    const client = clients.find(c => c.id === currentVisit.clientId);
    if (!client) return;
    
    const visitData = {
        clientId: currentVisit.clientId,
        date: new Date().toISOString().split('T')[0],
        closed: false,
        price: null,
        note: note,
        services: currentVisit.services.map(s => ({
            serviceId: s.serviceId,
            name: s.name,
            materials: (s.materials || []).map(m => ({
                productId: m.productId,
                name: m.name,
                quantity: m.quantity,
                unit: m.unit,
                baseUnit: m.baseUnit
            }))
        })),
        products: (currentVisit.products || []).map(p => ({
            productId: p.productId,
            name: p.name,
            quantity: p.quantity,
            packageSize: p.packageSize,
            unit: p.unit,
            price: p.price || 0
        }))
    };
    
    try {
        if (currentVisit.id) {
            // Úprava existující návštěvy
            visitData.id = currentVisit.id;
            await apiCall('visits.php', 'PUT', visitData);
            
            // Aktualizovat lokální data
            const visit = client.visits.find(v => v.id === currentVisit.id);
            if (visit) {
                visit.services = visitData.services;
                visit.products = visitData.products;
                visit.note = note;
            }
            
            showNotification('Návštěva aktualizována', 'success');
        } else {
            // Nová návštěva - uložit přes API
            const result = await apiCall('visits.php', 'POST', visitData);
            
            // Aktualizovat lokální data
            visitData.id = result.id;
            visitData.totalPrice = 0;
            visitData.createdAt = new Date().toISOString();
            client.visits.unshift(visitData);
            
            showNotification('Návštěva uložena', 'success');
        }
        
        closeSaveVisitModal();
        
        // Reload dat klienta z API pro aktuální zobrazení
        const updatedClients = await apiCall('clients.php');
        const updatedClient = updatedClients.find(c => c.id === client.id);
        if (updatedClient) {
            Object.assign(client, updatedClient);
        }
        
        cancelNewVisit();
        showClientDetail(client);
        renderDashboard();
    } catch (error) {
        console.error('Chyba při ukládání návštěvy:', error);
        showNotification('Chyba při ukládání návštěvy', 'error');
    }
}

function closeCloseVisitModal() {
    document.getElementById('closeVisitModal').classList.remove('show');
}

async function saveCloseVisitForm(event) {
    event.preventDefault();
    
    const price = parseFloat(document.getElementById('visitPrice').value) || null;
    const note = document.getElementById('visitNote').value.trim();
    
    // Pokud se jedná o odepsání z historie (pendingWriteOffClientId je nastaveno)
    if (window.pendingWriteOffClientId && window.pendingWriteOffVisitId) {
        processHistoricalWriteOff(window.pendingWriteOffClientId, window.pendingWriteOffVisitId, price, note);
        window.pendingWriteOffClientId = null;
        window.pendingWriteOffVisitId = null;
        return;
    }
    
    const client = clients.find(c => c.id === currentVisit.clientId);
    if (!client) return;
    
    let conversionFailed = false;
    
    // Odepsat materiály použité při službách
    for (const service of currentVisit.services) {
        if (!service.materials || service.materials.length === 0) continue;
        
        for (const material of service.materials) {
            const product = products.find(p => p.id === material.productId);
            if (product) {
                // Převést na základní jednotku
                let quantityInBaseUnit = material.quantity;
                if (material.unit !== product.unit) {
                    quantityInBaseUnit = convertToBaseUnit(material.quantity, material.unit, product.unit, product);
                    if (quantityInBaseUnit === null) {
                        conversionFailed = true;
                        break;
                    }
                }
                
                // Odepsat ze skladu
                product.stock -= quantityInBaseUnit;
                
                // Přidat pohyb
                if (!product.movements) {
                    product.movements = [];
                }
                product.movements.unshift({
                    date: new Date().toISOString().split('T')[0],
                    type: 'usage',
                    quantity: -quantityInBaseUnit,
                    unit: product.unit,
                    note: `Použito při návštěvě - ${client.firstName} ${client.lastName} (${material.quantity} ${material.unit})`
                });
            }
        }
        if (conversionFailed) break;
    }
    
    if (conversionFailed) {
        alert('Převod jednotek se nezdařil, návštěva nebyla uzavřena.');
        closeCloseVisitModal();
        return;
    }
    
    // Odepsat prodané produkty
    if (currentVisit.products && currentVisit.products.length > 0) {
        for (const saleProduct of currentVisit.products) {
            const product = products.find(p => p.id === saleProduct.productId);
            if (product) {
                const totalAmount = saleProduct.quantity * saleProduct.packageSize;
                product.stock -= totalAmount;
                
                if (!product.movements) {
                    product.movements = [];
                }
                product.movements.unshift({
                    date: new Date().toISOString().split('T')[0],
                    type: 'sale',
                    quantity: -totalAmount,
                    unit: product.unit,
                    note: `Prodej klientovi - ${client.firstName} ${client.lastName} (${saleProduct.quantity} ks)`
                });
            }
        }
    }
    
    const visitData = {
        clientId: currentVisit.clientId,
        date: new Date().toISOString().split('T')[0],
        closed: true,
        price: price,
        note: note,
        services: currentVisit.services.map(s => ({
            serviceId: s.serviceId,
            name: s.name,
            materials: (s.materials || []).map(m => ({
                productId: m.productId,
                name: m.name,
                quantity: m.quantity,
                unit: m.unit,
                baseUnit: m.baseUnit
            }))
        })),
        products: (currentVisit.products || []).map(p => ({
            productId: p.productId,
            name: p.name,
            quantity: p.quantity,
            packageSize: p.packageSize,
            unit: p.unit,
            price: p.price || 0
        }))
    };
    
    // Uložit změny produktů do API
    try {
        // Aktualizovat všechny produkty které se změnily
        for (const product of products) {
            if (product.movements && product.movements.length > 0 && 
                product.movements[0].date === new Date().toISOString().split('T')[0]) {
                await apiCall('products.php', 'PUT', product);
            }
        }
        
        if (currentVisit.id) {
            // Úprava existující návštěvy - uzavřít ji
            visitData.id = currentVisit.id;
            await apiCall('visits.php?action=close', 'PUT', visitData);
            
            const existingVisit = client.visits.find(v => v.id === currentVisit.id);
            if (existingVisit) {
                existingVisit.services = visitData.services;
                existingVisit.products = visitData.products;
                existingVisit.closed = true;
                existingVisit.price = price;
                existingVisit.note = note;
            }
            showNotification('Návštěva uzavřena', 'success');
        } else {
            // Nová návštěva - uložit přes API
            const result = await apiCall('visits.php', 'POST', visitData);
            visitData.id = result.id;
            visitData.totalPrice = price || 0;
            visitData.createdAt = new Date().toISOString();
            client.visits.unshift(visitData);
            showNotification('Návštěva uzavřena', 'success');
        }
        
        closeCloseVisitModal();
        
        // Reload dat klienta z API pro aktuální zobrazení
        const updatedClients = await apiCall('clients.php');
        const updatedClient = updatedClients.find(c => c.id === client.id);
        if (updatedClient) {
            Object.assign(client, updatedClient);
        }
        
        cancelNewVisit();
        showClientDetail(client);
        renderProductCategories();
        renderProducts();
        renderDashboard();
    } catch (error) {
        console.error('Chyba při uzavírání návštěvy:', error);
        showNotification('Chyba při uzavírání návštěvy', 'error');
    }
}

function writeOffMaterials(clientId, visitId) {
    const client = clients.find(c => c.id === clientId);
    if (!client) return;
    
    const visit = client.visits.find(v => v.id === visitId);
    if (!visit) return;
    
    if (visit.closed) {
        document.getElementById('confirmModalTitle').textContent = 'Návštěva již uzavřena';
        document.getElementById('confirmModalMessage').textContent = 'Návštěva je už uzavřená a materiály byly odepsány!';
        document.getElementById('confirmModalBtn').textContent = 'OK';
        document.getElementById('confirmModalBtn').className = 'btn btn-primary';
        document.getElementById('confirmModalBtn').onclick = closeConfirmModal;
        document.getElementById('confirmModal').classList.add('show');
        return;
    }
    
    // Uložit clientId a visitId pro pozdější použití
    window.pendingWriteOffClientId = clientId;
    window.pendingWriteOffVisitId = visitId;
    
    // Nastavit modal pro odepsání materiálů z historie
    document.getElementById('visitPrice').value = '';
    document.getElementById('visitNote').value = '';
    document.getElementById('closeVisitClientName').textContent = `${client.firstName} ${client.lastName}`;
    
    // Vygenerovat seznam materiálů k odepsání z historické návštěvy
    generateHistoricalWriteOffMaterialList(visit);
    
    document.getElementById('closeVisitModal').classList.add('show');
}

function generateHistoricalWriteOffMaterialList(visit) {
    const container = document.getElementById('writeOffMaterialList');
    if (!container) {
        // Modal ještě není načtený, zkusit znovu za chvíli
        setTimeout(() => generateHistoricalWriteOffMaterialList(visit), 50);
        return;
    }
    
    let html = '';
    
    // Materiály ze služeb
    let hasMaterials = false;
    for (const service of visit.services) {
        if (service.materials && service.materials.length > 0) {
            if (!hasMaterials) {
                html += '<div style="font-weight: 600; margin-bottom: 0.5rem; color: var(--text-dark);"><i class="fas fa-boxes"></i> Materiál ze služeb:</div>';
                hasMaterials = true;
            }
            html += `<div style="margin-bottom: 0.75rem; padding-left: 1rem;">`;
            html += `<div style="font-weight: 500; color: var(--primary-color); margin-bottom: 0.25rem;">${service.name}</div>`;
            for (const material of service.materials) {
                const product = products.find(p => p.id === material.productId);
                let quantityText = `${material.quantity} ${material.unit}`;
                
                // Převést na základní jednotku pokud je třeba
                if (product && material.unit !== product.unit) {
                    const baseQuantity = convertToBaseUnit(material.quantity, material.unit, product.unit, product);
                    if (baseQuantity !== null) {
                        quantityText += ` (${baseQuantity.toFixed(2)} ${product.unit})`;
                    }
                }
                
                html += `<div style="padding: 0.25rem 0; font-size: 0.875rem;">• ${material.name}: <strong>${quantityText}</strong></div>`;
            }
            html += '</div>';
        }
    }
    
    // Prodané produkty
    if (visit.products && visit.products.length > 0) {
        html += '<div style="font-weight: 600; margin: 1rem 0 0.5rem 0; color: var(--text-dark);"><i class="fas fa-shopping-bag"></i> Prodané produkty:</div>';
        for (const product of visit.products) {
            const totalAmount = product.quantity * product.packageSize;
            html += `<div style="padding: 0.25rem 0 0.25rem 1rem; font-size: 0.875rem;">• ${product.name}: <strong>${product.quantity} ks</strong> (${totalAmount} ${product.unit})</div>`;
        }
    }
    
    if (!hasMaterials && (!visit.products || visit.products.length === 0)) {
        html = '<div style="text-align: center; color: var(--text-light); padding: 1rem;">Žádný materiál k odepsání</div>';
    }
    
    container.innerHTML = html;
}

async function processHistoricalWriteOff(clientId, visitId, price, note) {
    const client = clients.find(c => c.id === clientId);
    if (!client) return;
    
    const visit = client.visits.find(v => v.id === visitId);
    if (!visit) return;
    
    let conversionFailed = false;
    
    // Odepsat materiály použité při službách
    for (const service of visit.services) {
        if (!service.materials || service.materials.length === 0) continue;
        
        for (const material of service.materials) {
            const product = products.find(p => p.id === material.productId);
            if (product) {
                // Převést na základní jednotku
                let quantityInBaseUnit = material.quantity;
                if (material.unit !== product.unit) {
                    quantityInBaseUnit = convertToBaseUnit(material.quantity, material.unit, product.unit, product);
                    if (quantityInBaseUnit === null) {
                        conversionFailed = true;
                        break;
                    }
                }
                
                // Odepsat ze skladu
                product.stock -= quantityInBaseUnit;
                
                // Přidat pohyb
                if (!product.movements) {
                    product.movements = [];
                }
                product.movements.unshift({
                    date: new Date().toISOString().split('T')[0],
                    type: 'usage',
                    quantity: -quantityInBaseUnit,
                    unit: product.unit,
                    note: `Dodatečně odepsáno - návštěva ${formatDate(visit.date)} - ${client.firstName} ${client.lastName}`
                });
            }
        }
        if (conversionFailed) break;
    }
    
    if (conversionFailed) {
        alert('Převod jednotek se nezdařil, návštěva nebyla uzavřena.');
        closeCloseVisitModal();
        return;
    }
    
    // Odepsat prodané produkty
    if (visit.products && visit.products.length > 0) {
        for (const saleProduct of visit.products) {
            const product = products.find(p => p.id === saleProduct.productId);
            if (product) {
                const totalAmount = saleProduct.quantity * saleProduct.packageSize;
                product.stock -= totalAmount;
                
                if (!product.movements) {
                    product.movements = [];
                }
                product.movements.unshift({
                    date: new Date().toISOString().split('T')[0],
                    type: 'sale',
                    quantity: -totalAmount,
                    unit: product.unit,
                    note: `Dodatečně odepsáno - prodej při návštěvě ${formatDate(visit.date)} - ${client.firstName} ${client.lastName}`
                });
            }
        }
    }
    
    // Uzavřít návštěvu
    visit.closed = true;
    visit.price = price;
    visit.note = note;
    
    try {
        // Uložit uzavření návštěvy do API
        const visitData = {
            id: visitId,
            clientId: clientId,
            date: visit.date,
            closed: true,
            price: price,
            note: note,
            services: visit.services.map(s => ({
                serviceId: s.serviceId,
                name: s.name,
                materials: (s.materials || []).map(m => ({
                    productId: m.productId,
                    name: m.name,
                    quantity: m.quantity,
                    unit: m.unit,
                    baseUnit: m.baseUnit
                }))
            })),
            products: (visit.products || []).map(p => ({
                productId: p.productId,
                name: p.name,
                quantity: p.quantity,
                packageSize: p.packageSize,
                unit: p.unit,
                price: p.price || 0
            }))
        };
        await apiCall('visits.php?action=close', 'PUT', visitData);
        
        // Aktualizovat produkty v API
        for (const product of products) {
            if (product.movements && product.movements.length > 0 && 
                product.movements[0].date === new Date().toISOString().split('T')[0]) {
                await apiCall('products.php', 'PUT', product);
            }
        }
        
        // Reload dat klienta z API
        const updatedClients = await apiCall('clients.php');
        const updatedClient = updatedClients.find(c => c.id === client.id);
        if (updatedClient) {
            Object.assign(client, updatedClient);
        }
        
        closeCloseVisitModal();
        renderProductCategories();
        renderProducts();
        showClientDetail(client);
        showNotification('Návštěva uzavřena a materiál odepsán', 'success');
    } catch (error) {
        console.error('Chyba při uzavírání návštěvy:', error);
        showNotification('Chyba při ukládání změn', 'error');
    }
}

function cancelNewVisit() {
    // Vrátit se na stránku klientů
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById('page-clients').classList.add('active');
    
    currentVisit = { id: null, clientId: null, services: [], closed: false };
}

// === PRODUKTY ===

function renderProductCategories() {
    const container = document.getElementById('categoryList');
    container.innerHTML = '';
    
    // Přidat položku "Vše"
    const allItem = document.createElement('div');
    allItem.className = 'category-item' + (selectedProductCategory === null ? ' active' : '');
    allItem.innerHTML = `
        <div class="category-item-content">
            <i class="fas fa-th" style="color: #6366f1;"></i>
            <span>Vše</span>
            <span class="category-count">${products.length}</span>
        </div>
    `;
    allItem.addEventListener('click', () => {
        selectedProductCategory = null;
        showOnlyLowStock = false; // Zrušit filtr při výběru "Vše"
        renderProductCategories();
        renderProducts();
    });
    container.appendChild(allItem);
    
    // Přidat kategorie
    productCategories.forEach(category => {
        const count = products.filter(p => p.categoryId === category.id).length;
        const item = document.createElement('div');
        item.className = 'category-item' + (selectedProductCategory === category.id ? ' active' : '');
        item.innerHTML = `
            <div class="category-item-content" style="--cat-color: ${category.color}">
                <i class="fas ${category.icon}" style="color: ${category.color};"></i>
                <span>${category.name}</span>
                <span class="category-count">${count}</span>
            </div>
            <div class="category-actions">
                <button class="btn-icon-small" onclick="event.stopPropagation(); editCategory(${category.id})" title="Upravit">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-icon-small" onclick="event.stopPropagation(); deleteCategory(${category.id})" title="Smazat">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        item.addEventListener('click', () => {
            selectedProductCategory = category.id;
            showOnlyLowStock = false; // Zrušit filtr při výběru kategorie
            renderProductCategories();
            renderProducts();
        });
        container.appendChild(item);
    });
}

function renderProducts() {
    const container = document.getElementById('productsList');
    container.innerHTML = '';
    
    // Pokud nejsou žádné produkty vůbec
    if (products.length === 0) {
        container.innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 3rem; text-align: center; color: #9ca3af;">
                <i class="fas fa-box" style="font-size: 4rem; margin-bottom: 1.5rem; opacity: 0.3;"></i>
                <h3 style="color: #6b7280; margin-bottom: 0.5rem;">Zatím žádné produkty</h3>
                <p style="margin-bottom: 1.5rem;">Nemáte ještě žádné produkty nebo materiály v systému.</p>
                <div style="display: flex; gap: 0.5rem; justify-content: center;">
                    <button class="btn btn-secondary" onclick="startEntryMode()">
                        <i class="fas fa-rocket"></i> Rychlé pořizování
                    </button>
                    <button class="btn btn-primary" onclick="addNewProduct()">
                        <i class="fas fa-plus"></i> Přidat produkt
                    </button>
                </div>
            </div>
        `;
        return;
    }
    
    // Aktualizovat tlačítko režimu pořizování v hlavičce
    updateNavigationState();
    
    // Aktualizovat badge s počtem produktů pod minimem
    updateLowStockBadge();
    
    // Filtrovat produkty podle vybrané kategorie a stavu skladu
    let filteredProducts = selectedProductCategory
        ? products.filter(p => p.categoryId === selectedProductCategory)
        : products;
    
    // Pokud je aktivní filtr pro produkty pod minimem
    if (showOnlyLowStock) {
        filteredProducts = filteredProducts.filter(p => p.stock < p.minStock);
    }
    
    if (filteredProducts.length === 0) {
        const categoryName = productCategories.find(c => c.id === selectedProductCategory)?.name || 'kategorie';
        container.innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 3rem; text-align: center; color: #9ca3af;">
                <i class="fas fa-filter" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.3;"></i>
                <p>Žádné produkty v kategorii "${categoryName}"</p>
            </div>
        `;
        return;
    }
    
    filteredProducts.forEach(product => {
        const category = productCategories.find(c => c.id === product.categoryId);
        const categoryColor = category ? category.color : '#10b981';
        const firstLetter = product.name[0].toUpperCase();
        const isLowStock = product.stock < product.minStock;
        const item = document.createElement('div');
        item.className = 'client-item';
        item.innerHTML = `
            <div class="client-avatar" style="background: linear-gradient(135deg, ${categoryColor}, ${categoryColor}dd);">
                ${firstLetter}
            </div>
            <div class="client-info">
                <div class="client-name">
                    ${product.name}
                    ${isLowStock ? '<i class="fas fa-exclamation-triangle" style="color: #ef4444; margin-left: 0.5rem;" title="Nízká zásoba!"></i>' : ''}
                </div>
                <div class="client-phone" style="${isLowStock ? 'color: #ef4444; font-weight: 600;' : ''}">
                    Sklad: ${formatStockDisplay(product)}
                </div>
            </div>
        `;
        
        item.addEventListener('click', () => showProductDetail(product));
        container.appendChild(item);
    });
}

function showProductDetail(product) {
    currentProduct = product;
    
    // Aktualizovat aktivní produkt v seznamu
    document.querySelectorAll('#productsList .client-item').forEach(item => {
        item.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
    
    const detailPanel = document.getElementById('productDetail');
    const category = productCategories.find(c => c.id === product.categoryId);
    const categoryName = category ? category.name : 'Bez kategorie';
    const categoryColor = category ? category.color : '#10b981';
    const firstLetter = product.name[0].toUpperCase();
    
    let movementsHtml = '';
    if (product.movements && product.movements.length > 0) {
        movementsHtml = `
            <table class="movements-table">
                <thead>
                    <tr>
                        <th>Datum</th>
                        <th>Typ</th>
                        <th>Množství</th>
                        <th>Poznámka</th>
                    </tr>
                </thead>
                <tbody>
                    ${product.movements.map(movement => {
                        const typeLabel = movement.type === 'purchase' ? 'Příjem' : 'Výdej';
                        const typeClass = movement.type === 'purchase' ? 'movement-in' : 'movement-out';
                        const quantitySign = movement.quantity > 0 ? '+' : '';
                        const displayUnit = movement.unit || product.unit;
                        return `
                            <tr>
                                <td>${formatDate(movement.date)}</td>
                                <td><span class="movement-badge ${typeClass}">${typeLabel}</span></td>
                                <td class="${typeClass}">${quantitySign}${movement.quantity} ${displayUnit}</td>
                                <td>${movement.note}</td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        `;
    } else {
        movementsHtml = '<p style="color: var(--text-light); text-align: center; padding: 2rem;">Zatím žádné pohyby</p>';
    }
    
    detailPanel.innerHTML = `
        <div class="client-detail-header">
            <div class="client-detail-avatar" style="background: linear-gradient(135deg, ${categoryColor}, ${categoryColor}dd);">
                ${firstLetter}
            </div>
            <div class="client-detail-info">
                <h3>${product.name}</h3>
                <div class="client-detail-meta">
                    <span><i class="fas fa-tag"></i>${categoryName}</span>
                    <span><i class="fas fa-box"></i>${product.description}</span>
                    <span style="${product.stock < product.minStock ? 'color: #ef4444; font-weight: 600;' : ''}">
                        <i class="fas fa-warehouse"></i>Sklad: <strong>${formatStockDisplay(product)}</strong>
                        ${product.stock < product.minStock ? '<i class="fas fa-exclamation-triangle" style="margin-left: 0.5rem;"></i>' : ''}
                    </span>
                    <span><i class="fas fa-layer-group"></i>Min. zásoba: <strong>${formatStockDisplay(product.minStock, product.unit, product.packageSize)}</strong></span>
                </div>
                <div class="client-detail-actions">
                    <button class="btn btn-secondary" onclick="editProduct(${product.id})">
                        <i class="fas fa-edit"></i> Upravit
                    </button>
                    <button class="btn" style="background: #ef4444; color: white;" onclick="deleteProduct(${product.id})">
                        <i class="fas fa-trash"></i> Smazat
                    </button>
                </div>
            </div>
        </div>
        
        <div class="visits-section">
            <h4>
                Historie pohybů
                <span style="font-size: 0.875rem; font-weight: 400; color: var(--text-medium);">
                    (${product.movements ? product.movements.length : 0})
                </span>
            </h4>
            ${movementsHtml}
        </div>
    `;
}

function addNewCategory() {
    document.getElementById('categoryModalTitle').textContent = 'Nová kategorie';
    document.getElementById('categoryId').value = '';
    document.getElementById('categoryName').value = '';
    document.getElementById('categoryIcon').value = 'fa-box';
    document.getElementById('categoryColor').value = '#6366f1';
    document.getElementById('categoryModal').classList.add('show');
}

function editCategory(categoryId) {
    const category = productCategories.find(c => c.id === categoryId);
    if (!category) return;
    
    document.getElementById('categoryModalTitle').textContent = 'Upravit kategorii';
    document.getElementById('categoryId').value = category.id;
    document.getElementById('categoryName').value = category.name;
    document.getElementById('categoryIcon').value = category.icon;
    document.getElementById('categoryColor').value = category.color;
    document.getElementById('categoryModal').classList.add('show');
}

function closeCategoryModal() {
    document.getElementById('categoryModal').classList.remove('show');
}

async function saveCategoryForm(event) {
    event.preventDefault();
    
    const categoryId = document.getElementById('categoryId').value;
    const name = document.getElementById('categoryName').value.trim();
    const icon = document.getElementById('categoryIcon').value;
    const color = document.getElementById('categoryColor').value;
    
    try {
        if (categoryId) {
            // Upravit existující kategorii
            const category = productCategories.find(c => c.id === parseInt(categoryId));
            if (category) {
                category.name = name;
                category.icon = icon;
                category.color = color;
                await apiCall('categories.php', 'PUT', category);
                showNotification('Kategorie upravena', 'success');
            }
        } else {
            // Přidat novou kategorii
            const newCategory = {
                name,
                icon,
                color
            };
            const result = await apiCall('categories.php', 'POST', newCategory);
            newCategory.id = result.id;
            productCategories.push(newCategory);
            showNotification('Kategorie vytvořena', 'success');
        }
        
        renderProductCategories();
        renderProducts();
        renderMaterialCategories();
        closeCategoryModal();
    } catch (error) {
        console.error('Chyba při ukládání kategorie:', error);
    }
}

function deleteCategory(categoryId) {
    const category = productCategories.find(c => c.id === categoryId);
    if (!category) return;
    
    // Nastavit data pro confirm modal
    window.pendingDeleteCategory = category;
    
    const productsInCategory = products.filter(p => p.categoryId === categoryId).length;
    
    // Zobrazit potvrzovací modal
    document.getElementById('confirmModalTitle').textContent = 'Smazat kategorii';
    if (productsInCategory > 0) {
        document.getElementById('confirmModalMessage').innerHTML = `
            V kategorii <strong>${category.name}</strong> je ${productsInCategory} produktů.
            <br><br>
            <span style="color: #f59e0b;">Opravdu smazat? Produkty budou bez kategorie.</span>
        `;
    } else {
        document.getElementById('confirmModalMessage').innerHTML = `
            Opravdu chcete smazat kategorii <strong>${category.name}</strong>?
        `;
    }
    document.getElementById('confirmModalBtn').textContent = 'Smazat';
    document.getElementById('confirmModalBtn').style.background = '#ef4444';
    document.getElementById('confirmModalBtn').onclick = confirmDeleteCategory;
    
    document.getElementById('confirmModal').classList.add('show');
}

async function confirmDeleteCategory() {
    const category = window.pendingDeleteCategory;
    if (!category) return;
    
    try {
        // Přesunout produkty do "bez kategorie"
        for (const p of products) {
            if (p.categoryId === category.id) {
                p.categoryId = null;
                await apiCall('products.php', 'PUT', p);
            }
        }
        
        // Smazat kategorii z API
        await apiCall('categories.php?id=' + category.id, 'DELETE');
        
        const index = productCategories.findIndex(c => c.id === category.id);
        if (index > -1) {
            productCategories.splice(index, 1);
        }
        
        if (selectedProductCategory === category.id) {
            selectedProductCategory = null;
        }
        if (selectedMaterialCategory === category.id) {
            selectedMaterialCategory = null;
        }
        
        renderProductCategories();
        renderProducts();
        renderMaterialCategories();
        
        showNotification('Kategorie smazána', 'success');
        closeConfirmModal();
        window.pendingDeleteCategory = null;
    } catch (error) {
        console.error('Chyba při mazání kategorie:', error);
    }
}

async function addNewProduct() {
    try {
        // Počkat na načtení modalů
        if (window.modalsReady) {
            await window.modalsReady;
        }
        
        // Zkontrolovat, jestli modal existuje
        const modal = document.getElementById('productModal');
        if (!modal) {
            console.error('productModal not found - modals.html may not be loaded yet');
            showNotification('Modal se načítá, zkuste to znovu za chvíli', 'warning');
            return;
        }
        
        const titleEl = document.getElementById('productModalTitle');
        const idEl = document.getElementById('productId');
        const nameEl = document.getElementById('productName');
        const barcodeEl = document.getElementById('productBarcode');
        const descEl = document.getElementById('productDescription');
        const catEl = document.getElementById('productCategoryId');
        const unitEl = document.getElementById('productUnit');
        const pkgEl = document.getElementById('productPackageSize');
        const stockEl = document.getElementById('productStock');
        const minStockEl = document.getElementById('productMinimalStock');
        const purchEl = document.getElementById('productPurchasePrice');
        const saleEl = document.getElementById('productSalePrice');
        const vatEl = document.getElementById('productVatRate');
        const forSaleEl = document.getElementById('productForSale');
        const forWorkEl = document.getElementById('productForWork');
        
        if (!titleEl || !vatEl) {
            console.error('Missing elements:', { titleEl, vatEl });
            showNotification('Formulář se ještě nenačetl, zkuste to znovu', 'warning');
            return;
        }
        
        titleEl.textContent = 'Nový produkt';
        idEl.value = '';
        nameEl.value = '';
        barcodeEl.value = '';
        descEl.value = '';
        catEl.value = '';
        unitEl.value = 'ml';
        pkgEl.value = '100';
        stockEl.value = '0';
        stockEl.disabled = false;
        minStockEl.value = '0';
        purchEl.value = '';
        saleEl.value = '';
        vatEl.value = '21';
        forSaleEl.checked = false;
        forWorkEl.checked = true;
        
        // Naplnit dropdown kategorií
        const categorySelect = document.getElementById('productCategoryId');
        categorySelect.innerHTML = '<option value="">-- Vyberte kategorii --</option>';
        productCategories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat.id;
            option.textContent = cat.name;
            categorySelect.appendChild(option);
        });
        
        document.getElementById('productModal').classList.add('show');
    } catch (error) {
        console.error('Error opening product modal:', error);
        showNotification('Chyba při otevírání modalu: ' + error.message, 'error');
    }
}

async function editProduct(productId) {
    try {
        const product = products.find(p => p.id === productId);
        if (!product) return;
        
        // Počkat na načtení modalů
        if (window.modalsReady) {
            await window.modalsReady;
        }
        
        // Načíst všechny elementy dopředu
        const modal = document.getElementById('productModal');
        const titleEl = document.getElementById('productModalTitle');
        const idEl = document.getElementById('productId');
        const nameEl = document.getElementById('productName');
        const barcodeEl = document.getElementById('productBarcode');
        const descEl = document.getElementById('productDescription');
        const unitEl = document.getElementById('productUnit');
        const pkgSizeEl = document.getElementById('productPackageSize');
        const stockEl = document.getElementById('productStock');
        const minStockEl = document.getElementById('productMinimalStock');
        const purchasePriceEl = document.getElementById('productPurchasePrice');
        const salePriceEl = document.getElementById('productSalePrice');
        const vatEl = document.getElementById('productVatRate');
        const forSaleEl = document.getElementById('productForSale');
        const forWorkEl = document.getElementById('productForWork');
        const categoryEl = document.getElementById('productCategoryId');
        
        // Zkontrolovat kritické elementy
        if (!modal) {
            console.error('productModal not found - modals.html may not be loaded yet');
            showNotification('Modal se načítá, zkuste to znovu za chvíli', 'warning');
            return;
        }
        
        if (!titleEl || !nameEl || !vatEl) {
            console.error('Missing elements in editProduct:', {
                titleEl: !!titleEl,
                nameEl: !!nameEl,
                vatEl: !!vatEl
            });
            showNotification('Některé prvky formuláře nejsou dostupné', 'error');
            return;
        }
        
        // Nastavit hodnoty
        titleEl.textContent = 'Upravit produkt';
        if (idEl) idEl.value = product.id;
        nameEl.value = product.name;
        if (barcodeEl) barcodeEl.value = product.barcode || '';
        if (descEl) descEl.value = product.description || '';
        if (unitEl) unitEl.value = product.unit || 'ml';
        if (pkgSizeEl) pkgSizeEl.value = product.packageSize || 1;
        if (stockEl) {
            stockEl.value = (product.stock / (product.packageSize || 1)).toFixed(2);
            stockEl.disabled = true; // Zakázat úpravu skladu
        }
        if (minStockEl) minStockEl.value = (product.minStock / product.packageSize) || 0;
        if (purchasePriceEl) purchasePriceEl.value = product.pricePurchase || '';
        if (salePriceEl) salePriceEl.value = product.priceRetail || '';
        vatEl.value = product.vatRate || 21;
        if (forSaleEl) forSaleEl.checked = product.forSale || false;
        if (forWorkEl) forWorkEl.checked = product.forWork !== false;
        
        // Naplnit dropdown kategorií
        if (categoryEl) {
            categoryEl.innerHTML = '<option value="">-- Vyberte kategorii --</option>';
            productCategories.forEach(cat => {
                const option = document.createElement('option');
                option.value = cat.id;
                option.textContent = cat.name;
                if (cat.id === product.categoryId) {
                    option.selected = true;
                }
                categoryEl.appendChild(option);
            });
        }
        
        modal.classList.add('show');
    } catch (error) {
        console.error('Error editing product:', error);
        showNotification('Chyba při editaci produktu: ' + error.message, 'error');
    }
}

function closeProductModal() {
    document.getElementById('productModal').classList.remove('show');
}

async function saveProductForm(event) {
    event.preventDefault();
    
    const productId = document.getElementById('productId').value;
    const name = document.getElementById('productName').value.trim();
    const barcode = document.getElementById('productBarcode').value.trim();
    const description = document.getElementById('productDescription').value.trim();
    const categoryId = parseInt(document.getElementById('productCategoryId').value);
    const unit = document.getElementById('productUnit').value;
    const packageSize = parseFloat(document.getElementById('productPackageSize').value);
    const stockInPieces = parseFloat(document.getElementById('productStock').value);
    const minStock = parseFloat(document.getElementById('productMinimalStock').value);
    const purchasePrice = parseFloat(document.getElementById('productPurchasePrice').value) || 0;
    const salePrice = parseFloat(document.getElementById('productSalePrice').value) || 0;
    const vatRate = parseFloat(document.getElementById('productVatRate').value) || 21;
    const forSale = document.getElementById('productForSale').checked;
    const forWork = document.getElementById('productForWork').checked;
    
    // Přepočítat sklad z kusů na základní jednotky
    const stockInBaseUnits = stockInPieces * packageSize;
    
    const productData = {
        name,
        barcode,
        description,
        categoryId,
        unit,
        packageSize,
        minStock: minStock * packageSize, // Převést na základní jednotky
        pricePurchase: purchasePrice,
        priceRetail: salePrice,
        vatRate: vatRate,
        forSale,
        forWork
    };
    
    try {
        if (productId) {
            // Upravit existující produkt
            const product = products.find(p => p.id === parseInt(productId));
            if (product) {
                productData.id = parseInt(productId);
                productData.stock = product.stock; // Zachovat stávající sklad
                
                await apiCall('products.php', 'PUT', productData);
                
                // Aktualizovat lokální data
                Object.assign(product, productData);
            }
        } else {
            // Přidat nový produkt
            productData.stock = stockInBaseUnits;
            const result = await apiCall('products.php', 'POST', productData);
            
            const newProduct = {
                id: result.id,
                ...productData,
                movements: []
            };
            
            if (stockInBaseUnits > 0) {
                newProduct.movements.push({
                    date: new Date().toISOString().split('T')[0],
                    type: 'purchase',
                    quantity: stockInBaseUnits,
                    unit: unit,
                    note: 'Počáteční stav'
                });
            }
            
            products.push(newProduct);
        }
        
        renderProductCategories();
        renderProducts();
        closeProductModal();
        showNotification('Produkt uložen', 'success');
    } catch (error) {
        showNotification('Chyba při ukládání produktu', 'error');
    }
    
    // Pokud editujeme, obnovit detail
    if (productId) {
        const product = products.find(p => p.id === parseInt(productId));
        if (product) showProductDetail(product);
    }
}

function deleteProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Nastavit data pro confirm modal
    window.pendingDeleteProduct = product;
    
    // Zobrazit potvrzovací modal
    document.getElementById('confirmModalTitle').textContent = 'Smazat produkt';
    document.getElementById('confirmModalMessage').innerHTML = `
        Opravdu chcete smazat produkt <strong>${product.name}</strong>?
        <br><br>
        <span style="color: #ef4444;">Tato akce je nevratná a smažou se i všechny pohyby skladu!</span>
    `;
    document.getElementById('confirmModalBtn').textContent = 'Smazat';
    document.getElementById('confirmModalBtn').style.background = '#ef4444';
    document.getElementById('confirmModalBtn').onclick = confirmDeleteProduct;
    
    document.getElementById('confirmModal').classList.add('show');
}

async function confirmDeleteProduct() {
    const product = window.pendingDeleteProduct;
    if (!product) return;
    
    try {
        await apiCall('products.php?id=' + product.id, 'DELETE');
        
        const index = products.findIndex(p => p.id === product.id);
        if (index !== -1) {
            products.splice(index, 1);
            renderProductCategories();
            renderProducts();
            
            // Vyčistit detail panel
            document.getElementById('productDetail').innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-box"></i>
                    <p>Vyberte produkt ze seznamu</p>
                </div>
            `;
        }
        
        showNotification('Produkt smazán', 'success');
        closeConfirmModal();
        window.pendingDeleteProduct = null;
    } catch (error) {
        console.error('Chyba při mazání produktu:', error);
    }
}

// === SLUŽBY ===

function renderServices() {
    const container = document.getElementById('servicesList');
    container.innerHTML = '';
    
    // Pokud nejsou žádné služby
    if (services.length === 0) {
        container.innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 3rem; text-align: center; color: #9ca3af;">
                <i class="fas fa-cut" style="font-size: 4rem; margin-bottom: 1.5rem; opacity: 0.3;"></i>
                <h3 style="color: #6b7280; margin-bottom: 0.5rem;">Zatím žádné služby</h3>
                <p style="margin-bottom: 1.5rem;">Nemáte ještě žádné služby definované v systému.</p>
                <button class="btn btn-primary" onclick="addNewService()">
                    <i class="fas fa-plus"></i> Přidat novou službu
                </button>
            </div>
        `;
        return;
    }
    
    services.forEach(service => {
        const item = document.createElement('div');
        item.className = 'service-item';
        item.innerHTML = `
            <div class="service-info">
                <h4>${service.name}</h4>
                <p>${service.description} • Doba trvání: ${service.duration} minut</p>
            </div>
            <div style="display: flex; gap: 0.5rem;">
                <button class="btn btn-secondary" onclick="editService(${service.id})">
                    <i class="fas fa-edit"></i> Upravit
                </button>
                <button class="btn" style="background: #ef4444; color: white;" onclick="deleteService(${service.id})">
                    <i class="fas fa-trash"></i> Smazat
                </button>
            </div>
        `;
        
        container.appendChild(item);
    });
}

function addNewServiceInPos() {
    // Použít hlavní addNewService funkci, která už používá modal
    addNewService();
}

function editServiceInPos(serviceId) {
    // Použít hlavní editService funkci, která už používá modal
    editService(serviceId);
}

function addNewService() {
    document.getElementById('serviceModalTitle').textContent = 'Nová služba';
    document.getElementById('serviceId').value = '';
    document.getElementById('serviceName').value = '';
    document.getElementById('serviceDescription').value = '';
    document.getElementById('serviceDuration').value = '30';
    document.getElementById('serviceModal').classList.add('show');
}

function editService(serviceId) {
    const service = services.find(s => s.id === serviceId);
    if (!service) return;
    
    document.getElementById('serviceModalTitle').textContent = 'Upravit službu';
    document.getElementById('serviceId').value = service.id;
    document.getElementById('serviceName').value = service.name;
    document.getElementById('serviceDescription').value = service.description || '';
    document.getElementById('serviceDuration').value = service.duration;
    document.getElementById('serviceModal').classList.add('show');
}

function closeServiceModal() {
    document.getElementById('serviceModal').classList.remove('show');
}

async function saveServiceForm(event) {
    event.preventDefault();
    
    const serviceId = document.getElementById('serviceId').value;
    const name = document.getElementById('serviceName').value.trim();
    const description = document.getElementById('serviceDescription').value.trim();
    const duration = parseInt(document.getElementById('serviceDuration').value);
    
    try {
        if (serviceId) {
            // Upravit existující službu
            const service = services.find(s => s.id === parseInt(serviceId));
            if (service) {
                service.name = name;
                service.description = description;
                service.duration = duration;
                await apiCall('services.php', 'PUT', service);
                showNotification('Služba upravena', 'success');
            }
        } else {
            // Přidat novou službu
            const newService = {
                name,
                description,
                duration
            };
            const result = await apiCall('services.php', 'POST', newService);
            newService.id = result.id;
            services.push(newService);
            showNotification('Služba vytvořena', 'success');
        }
        
        renderServices();
        renderServiceRows(); // Aktualizovat i POS view
        closeServiceModal();
    } catch (error) {
        console.error('Chyba při ukládání služby:', error);
    }
}

function deleteService(serviceId) {
    const service = services.find(s => s.id === serviceId);
    if (!service) return;
    
    // Nastavit data pro confirm modal
    window.pendingDeleteService = service;
    
    // Zobrazit potvrzovací modal
    document.getElementById('confirmModalTitle').textContent = 'Smazat službu';
    document.getElementById('confirmModalMessage').innerHTML = `
        Opravdu chcete smazat službu <strong>${service.name}</strong>?
    `;
    document.getElementById('confirmModalBtn').textContent = 'Smazat';
    document.getElementById('confirmModalBtn').style.background = '#ef4444';
    document.getElementById('confirmModalBtn').onclick = confirmDeleteService;
    
    document.getElementById('confirmModal').classList.add('show');
}

async function confirmDeleteService() {
    const service = window.pendingDeleteService;
    if (!service) return;
    
    try {
        await apiCall('services.php?id=' + service.id, 'DELETE');
        
        const index = services.findIndex(s => s.id === service.id);
        if (index !== -1) {
            services.splice(index, 1);
            renderServices();
            renderServiceRows(); // Aktualizovat i POS view
        }
        
        showNotification('Služba smazána', 'success');
        closeConfirmModal();
        window.pendingDeleteService = null;
    } catch (error) {
        console.error('Chyba při mazání služby:', error);
    }
}

// === POMOCNÉ FUNKCE ===

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('cs-CZ', options);
}

// Vyhledávání
document.addEventListener('DOMContentLoaded', function() {
    const clientSearch = document.getElementById('clientSearch');
    if (clientSearch) {
        clientSearch.addEventListener('input', function(e) {
            const query = e.target.value.toLowerCase();
            const items = document.querySelectorAll('#clientList .client-item');
            
            items.forEach(item => {
                const text = item.textContent.toLowerCase();
                item.style.display = text.includes(query) ? 'flex' : 'none';
            });
        });
    }
    
    const productSearch = document.getElementById('productSearch');
    if (productSearch) {
        productSearch.addEventListener('input', function(e) {
            const query = e.target.value.toLowerCase();
            const items = document.querySelectorAll('#productsList .client-item');
            
            items.forEach(item => {
                const text = item.textContent.toLowerCase();
                item.style.display = text.includes(query) ? 'flex' : 'none';
            });
        });
    }
    
    const serviceSearch = document.getElementById('serviceSearch');
    if (serviceSearch) {
        serviceSearch.addEventListener('input', function(e) {
            const query = e.target.value.toLowerCase();
            const items = document.querySelectorAll('.service-row');
            
            items.forEach(item => {
                const text = item.textContent.toLowerCase();
                item.style.display = text.includes(query) ? 'flex' : 'none';
            });
        });
    }
    
    const materialSearch = document.getElementById('materialSearch');
    if (materialSearch) {
        materialSearch.addEventListener('input', function(e) {
            const query = e.target.value.toLowerCase();
            const items = document.querySelectorAll('.material-card');
            
            items.forEach(item => {
                const text = item.textContent.toLowerCase();
                item.style.display = text.includes(query) ? 'flex' : 'none';
            });
        });
    }
    
    // Inicializovat příjem zboží při načtení stránky
    initStockReceiptPage();
    
    // Inicializovat objednávku při načtení stránky
    initOrderPage();
});

// === PŘÍJEM ZBOŽÍ ===

let receiptItems = [];
let selectedSuggestionIndex = -1;
let filteredSuggestions = [];

function initStockReceiptPage() {
    // Již nepotřebujeme naplňovat select, používáme autocomplete
    const productSearchInput = document.getElementById('receiptProductSearch');
    if (productSearchInput) {
        // Zavřít suggestions při kliknutí mimo
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.autocomplete-wrapper')) {
                hideProductSuggestions();
            }
        });
    }
}

function filterProductSuggestions() {
    const input = document.getElementById('receiptProductSearch');
    const query = input.value.toLowerCase().trim();
    const suggestionsDiv = document.getElementById('productSuggestions');
    
    if (query.length === 0) {
        filteredSuggestions = [...products].sort((a, b) => a.name.localeCompare(b.name));
    } else {
        filteredSuggestions = products.filter(p => 
            p.name.toLowerCase().includes(query)
        ).sort((a, b) => {
            // Produkty začínající hledaným textem mají přednost
            const aStarts = a.name.toLowerCase().startsWith(query);
            const bStarts = b.name.toLowerCase().startsWith(query);
            if (aStarts && !bStarts) return -1;
            if (!aStarts && bStarts) return 1;
            return a.name.localeCompare(b.name);
        });
    }
    
    selectedSuggestionIndex = -1;
    renderProductSuggestions();
    showProductSuggestions();
}

function renderProductSuggestions() {
    const suggestionsDiv = document.getElementById('productSuggestions');
    
    if (filteredSuggestions.length === 0) {
        suggestionsDiv.innerHTML = '<div class="no-suggestions">Žádné produkty nenalezeny</div>';
        return;
    }
    
    // Omezit na prvních 50 výsledků pro rychlost
    const displaySuggestions = filteredSuggestions.slice(0, 50);
    
    suggestionsDiv.innerHTML = displaySuggestions.map((product, index) => {
        const category = productCategories.find(c => c.id === product.categoryId);
        const categoryName = category ? category.name : 'Bez kategorie';
        const isLowStock = product.stock < product.minStock;
        const stockClass = isLowStock ? 'low' : '';
        const stockDisplay = formatStockDisplay(product);
        
        return `
            <div class="suggestion-item ${index === selectedSuggestionIndex ? 'selected' : ''}" 
                 onclick="selectProduct(${product.id})" 
                 data-index="${index}">
                <div class="suggestion-name">${product.name}</div>
                <div class="suggestion-meta">
                    <span class="suggestion-category">
                        <i class="fas fa-tag"></i> ${categoryName}
                    </span>
                    <span class="suggestion-stock ${stockClass}">
                        <i class="fas fa-box"></i> ${stockDisplay}
                        ${isLowStock ? '<i class="fas fa-exclamation-triangle"></i>' : ''}
                    </span>
                </div>
            </div>
        `;
    }).join('');
    
    if (filteredSuggestions.length > 50) {
        suggestionsDiv.innerHTML += '<div class="no-suggestions">... a další ' + (filteredSuggestions.length - 50) + ' produktů. Upřesněte hledání.</div>';
    }
}

function showProductSuggestions() {
    const suggestionsDiv = document.getElementById('productSuggestions');
    if (filteredSuggestions.length > 0 || document.getElementById('receiptProductSearch').value.length > 0) {
        suggestionsDiv.classList.add('active');
    }
}

function hideProductSuggestions() {
    const suggestionsDiv = document.getElementById('productSuggestions');
    suggestionsDiv.classList.remove('active');
    selectedSuggestionIndex = -1;
}

function handleProductKeyDown(event) {
    const suggestionsDiv = document.getElementById('productSuggestions');
    
    if (!suggestionsDiv.classList.contains('active')) {
        if (event.key === 'ArrowDown' || event.key === 'Enter') {
            filterProductSuggestions();
            showProductSuggestions();
        }
        return;
    }
    
    if (event.key === 'ArrowDown') {
        event.preventDefault();
        selectedSuggestionIndex = Math.min(selectedSuggestionIndex + 1, filteredSuggestions.length - 1);
        renderProductSuggestions();
        scrollToSelectedSuggestion();
    } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        selectedSuggestionIndex = Math.max(selectedSuggestionIndex - 1, 0);
        renderProductSuggestions();
        scrollToSelectedSuggestion();
    } else if (event.key === 'Enter') {
        event.preventDefault();
        if (selectedSuggestionIndex >= 0 && selectedSuggestionIndex < filteredSuggestions.length) {
            selectProduct(filteredSuggestions[selectedSuggestionIndex].id);
        }
    } else if (event.key === 'Escape') {
        hideProductSuggestions();
    }
}

function scrollToSelectedSuggestion() {
    const suggestionsDiv = document.getElementById('productSuggestions');
    const selectedItem = suggestionsDiv.querySelector('.suggestion-item.selected');
    if (selectedItem) {
        selectedItem.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
}

function selectProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    document.getElementById('receiptProduct').value = productId;
    document.getElementById('receiptProductSearch').value = product.name;
    hideProductSuggestions();
    
    updateReceiptProductInfo();
    
    // Přesunout focus na množství
    document.getElementById('receiptQuantity').focus();
    document.getElementById('receiptQuantity').select();
}

function quickAddProductInReceipt() {
    document.getElementById('quickProductName').value = '';
    document.getElementById('quickProductDescription').value = '';
    document.getElementById('quickProductCategoryId').value = '';
    document.getElementById('quickProductUnit').value = 'ml';
    document.getElementById('quickProductPackageSize').value = '100';
    document.getElementById('quickProductMinimalStock').value = '3';
    document.getElementById('quickProductPurchasePrice').value = '';
    document.getElementById('quickProductSalePrice').value = '';
    document.getElementById('quickProductForSale').checked = false;
    document.getElementById('quickProductForWork').checked = true;
    
    // Naplnit dropdown kategorií
    const categorySelect = document.getElementById('quickProductCategoryId');
    categorySelect.innerHTML = '<option value="">-- Vyberte kategorii --</option>';
    productCategories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat.id;
        option.textContent = cat.name;
        categorySelect.appendChild(option);
    });
    
    document.getElementById('quickProductModal').classList.add('show');
}

function closeQuickProductModal() {
    document.getElementById('quickProductModal').classList.remove('show');
}

function saveQuickProductForm(event) {
    event.preventDefault();
    
    const name = document.getElementById('quickProductName').value.trim();
    const description = document.getElementById('quickProductDescription').value.trim();
    const categoryId = parseInt(document.getElementById('quickProductCategoryId').value);
    const unit = document.getElementById('quickProductUnit').value;
    const packageSize = parseFloat(document.getElementById('quickProductPackageSize').value);
    const minimalStock = parseFloat(document.getElementById('quickProductMinimalStock').value);
    const purchasePrice = parseFloat(document.getElementById('quickProductPurchasePrice').value) || 0;
    const salePrice = parseFloat(document.getElementById('quickProductSalePrice').value) || 0;
    const vatRate = parseFloat(document.getElementById('quickProductVatRate').value) || 21;
    const forSale = document.getElementById('quickProductForSale').checked;
    const forWork = document.getElementById('quickProductForWork').checked;
    
    // Vytvořit nový produkt
    const newProduct = {
        id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
        name,
        description,
        categoryId,
        stock: 0, // Sklad je 0, množství se zadá v příjmu
        unit,
        packageSize,
        minimalStock,
        purchasePrice,
        salePrice,
        vatRate: vatRate,
        forSale,
        forWork,
        movements: []
    };
    
    products.push(newProduct);
    
    // Automaticky vybrat nový produkt
    selectProduct(newProduct.id);
    
    // Aktualizovat seznamy
    renderProductCategories();
    renderProducts();
    
    closeQuickProductModal();
}

function updateReceiptProductInfo() {
    const productId = parseInt(document.getElementById('receiptProduct').value);
    const quantityInput = document.getElementById('receiptQuantity');
    const unitSelect = document.getElementById('receiptUnit');
    const infoBox = document.getElementById('receiptProductInfo');
    
    if (!productId) {
        infoBox.style.display = 'none';
        unitSelect.innerHTML = '<option value="">Vyberte jednotku...</option>';
        return;
    }
    
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Aktualizovat možnosti jednotek
    unitSelect.innerHTML = '';
    const unitOptions = getUnitOptions(product.unit);
    unitOptions.forEach(unit => {
        const option = document.createElement('option');
        option.value = unit;
        option.textContent = unit;
        if (unit === product.unit) option.selected = true;
        unitSelect.appendChild(option);
    });
    
    // Zobrazit info box
    updateProductInfoDisplay(product);
    infoBox.style.display = 'block';
    
    // Aktualizovat info při změně množství
    quantityInput.oninput = () => updateProductInfoDisplay(product);
    unitSelect.onchange = () => updateProductInfoDisplay(product);
}

function updateProductInfoDisplay(product) {
    const quantity = parseFloat(document.getElementById('receiptQuantity').value) || 0;
    const unit = document.getElementById('receiptUnit').value;
    
    const currentStockDisplay = formatStockDisplay(product.stock, product.unit, product.packageSize);
    const minStockDisplay = formatStockDisplay(product.minStock, product.unit, product.packageSize);
    
    document.getElementById('infoCurrentStock').textContent = currentStockDisplay;
    document.getElementById('infoMinStock').textContent = minStockDisplay;
    
    if (quantity > 0 && unit) {
        // Převést na základní jednotku
        let quantityInBaseUnit = quantity;
        if (unit !== product.unit) {
            quantityInBaseUnit = convertToBaseUnit(quantity, unit, product.unit, product);
        }
        
        const newStock = product.stock + quantityInBaseUnit;
        const newStockDisplay = formatStockDisplay(newStock, product.unit, product.packageSize);
        
        // Barevné indikování
        const infoNewStock = document.getElementById('infoNewStock');
        infoNewStock.textContent = newStockDisplay;
        
        if (newStock < product.minStock) {
            infoNewStock.style.color = '#ef4444';
        } else {
            infoNewStock.style.color = '#10b981';
        }
    } else {
        document.getElementById('infoNewStock').textContent = currentStockDisplay;
    }
}

function addToReceipt() {
    const productId = parseInt(document.getElementById('receiptProduct').value);
    const quantity = parseFloat(document.getElementById('receiptQuantity').value);
    const unit = document.getElementById('receiptUnit').value;
    const note = document.getElementById('receiptNote').value.trim();
    
    if (!productId) {
        document.getElementById('confirmModalTitle').textContent = 'Produkt nevybrán';
        document.getElementById('confirmModalMessage').textContent = 'Vyberte prosím produkt pro přidání do příjemky!';
        document.getElementById('confirmModalBtn').textContent = 'OK';
        document.getElementById('confirmModalBtn').className = 'btn btn-primary';
        document.getElementById('confirmModalBtn').onclick = closeConfirmModal;
        document.getElementById('confirmModal').classList.add('show');
        return;
    }
    
    if (!quantity || quantity <= 0) {
        document.getElementById('confirmModalTitle').textContent = 'Neplatné množství';
        document.getElementById('confirmModalMessage').textContent = 'Zadejte prosím platné množství větší než 0!';
        document.getElementById('confirmModalBtn').textContent = 'OK';
        document.getElementById('confirmModalBtn').className = 'btn btn-primary';
        document.getElementById('confirmModalBtn').onclick = closeConfirmModal;
        document.getElementById('confirmModal').classList.add('show');
        return;
    }
    
    if (!unit) {
        document.getElementById('confirmModalTitle').textContent = 'Jednotka nevybrána';
        document.getElementById('confirmModalMessage').textContent = 'Vyberte prosím jednotku!';
        document.getElementById('confirmModalBtn').textContent = 'OK';
        document.getElementById('confirmModalBtn').className = 'btn btn-primary';
        document.getElementById('confirmModalBtn').onclick = closeConfirmModal;
        document.getElementById('confirmModal').classList.add('show');
        return;
    }
    
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    receiptItems.push({
        productId: productId,
        productName: product.name,
        quantity: quantity,
        unit: unit,
        baseUnit: product.unit,
        note: note
    });
    
    renderReceiptTable();
    
    // Vyčistit formulář
    document.getElementById('receiptProduct').value = '';
    document.getElementById('receiptProductSearch').value = '';
    document.getElementById('receiptQuantity').value = '';
    document.getElementById('receiptNote').value = '';
    document.getElementById('receiptProductInfo').style.display = 'none';
    
    // Focus na vyhledávání pro další produkt
    document.getElementById('receiptProductSearch').focus();
}

function renderReceiptTable() {
    const tbody = document.getElementById('receiptTableBody');
    
    if (receiptItems.length === 0) {
        tbody.innerHTML = `
            <tr class="empty-row">
                <td colspan="5" style="text-align: center; color: var(--text-light); padding: 2rem;">
                    <i class="fas fa-inbox" style="font-size: 2rem; margin-bottom: 0.5rem; display: block;"></i>
                    Zatím žádné položky
                </td>
            </tr>
        `;
        return;
    }
    
    tbody.innerHTML = receiptItems.map((item, index) => `
        <tr>
            <td><strong>${item.productName}</strong></td>
            <td>
                <input type="number" 
                       value="${item.quantity}" 
                       step="0.01" 
                       style="width: 100px; padding: 0.375rem; border: 1px solid var(--border-color); border-radius: 0.375rem; font-weight: 600;"
                       onchange="updateReceiptQuantity(${index}, this.value)">
            </td>
            <td>${item.unit}</td>
            <td>
                <input type="text" 
                       value="${item.note || ''}" 
                       placeholder="Poznámka..."
                       style="width: 100%; padding: 0.375rem; border: 1px solid var(--border-color); border-radius: 0.375rem;"
                       onchange="updateReceiptNote(${index}, this.value)">
            </td>
            <td>
                <div class="receipt-actions">
                    <button class="btn btn-danger" onclick="removeFromReceipt(${index})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function updateReceiptQuantity(index, newQuantity) {
    const quantity = parseFloat(newQuantity);
    if (isNaN(quantity) || quantity <= 0) {
        document.getElementById('confirmModalTitle').textContent = 'Neplatné množství';
        document.getElementById('confirmModalMessage').textContent = 'Zadejte prosím platné množství větší než 0!';
        document.getElementById('confirmModalBtn').textContent = 'OK';
        document.getElementById('confirmModalBtn').className = 'btn btn-primary';
        document.getElementById('confirmModalBtn').onclick = closeConfirmModal;
        document.getElementById('confirmModal').classList.add('show');
        renderReceiptTable();
        return;
    }
    receiptItems[index].quantity = quantity;
}

function updateReceiptNote(index, newNote) {
    receiptItems[index].note = newNote.trim();
}

function removeFromReceipt(index) {
    const item = receiptItems[index];
    window.pendingReceiptRemoveIndex = index;
    
    document.getElementById('confirmModalTitle').textContent = 'Odstranit položku';
    document.getElementById('confirmModalMessage').innerHTML = `<p>Opravdu chcete odstranit <strong>${item.productName}</strong> z příjemky?</p>`;
    document.getElementById('confirmModalBtn').textContent = 'Odstranit';
    document.getElementById('confirmModalBtn').className = 'btn btn-danger';
    document.getElementById('confirmModalBtn').onclick = confirmRemoveFromReceipt;
    document.getElementById('confirmModal').classList.add('show');
}

function confirmRemoveFromReceipt() {
    closeConfirmModal();
    receiptItems.splice(window.pendingReceiptRemoveIndex, 1);
    window.pendingReceiptRemoveIndex = null;
    renderReceiptTable();
}

function saveStockReceipt() {
    if (receiptItems.length === 0) {
        document.getElementById('confirmModalTitle').textContent = 'Prázdná příjemka';
        document.getElementById('confirmModalMessage').textContent = 'Přidejte alespoň jednu položku do příjemky!';
        document.getElementById('confirmModalBtn').textContent = 'OK';
        document.getElementById('confirmModalBtn').className = 'btn btn-primary';
        document.getElementById('confirmModalBtn').onclick = closeConfirmModal;
        document.getElementById('confirmModal').classList.add('show');
        return;
    }
    
    // Zobrazit potvrzovací modal
    document.getElementById('confirmModalTitle').textContent = 'Potvrdit příjem';
    document.getElementById('confirmModalMessage').innerHTML = `<p>Opravdu chcete přijmout <strong>${receiptItems.length} položek</strong> do skladu?</p><p style="margin-top: 1rem;">Tato akce zvýší stav skladu.</p>`;
    document.getElementById('confirmModalBtn').textContent = 'Přijmout';
    document.getElementById('confirmModalBtn').className = 'btn btn-success';
    document.getElementById('confirmModalBtn').onclick = confirmSaveStockReceipt;
    document.getElementById('confirmModal').classList.add('show');
}

async function confirmSaveStockReceipt() {
    closeConfirmModal();
    
    const today = new Date().toISOString().split('T')[0];
    
    try {
        // Vytvořit příjemku přes API
        const receiptData = {
            date: today,
            note: '',
            items: receiptItems.map(item => ({
                productId: item.productId,
                productName: item.productName,
                quantity: item.quantity,
                unit: item.unit,
                note: item.note || ''
            }))
        };
        
        await apiCall('receipts.php', 'POST', receiptData);
        
        // Aktualizovat lokální stav produktů
        for (const item of receiptItems) {
            const product = products.find(p => p.id === item.productId);
            if (product) {
                // Převést na základní jednotku
                let quantityInBaseUnit = item.quantity;
                if (item.unit !== product.unit) {
                    quantityInBaseUnit = convertToBaseUnit(item.quantity, item.unit, product.unit, product);
                }
                
                // Přidat do skladu lokálně
                product.stock += quantityInBaseUnit;
                
                // Přidat pohyb lokálně
                if (!product.movements) {
                    product.movements = [];
                }
                product.movements.unshift({
                    date: today,
                    type: 'purchase',
                    quantity: quantityInBaseUnit,
                    unit: product.unit,
                    note: item.note || `Příjem zboží (${item.quantity} ${item.unit})`
                });
                
                // Uložit změny produktu do API
                await apiCall('products.php', 'PUT', product);
            }
        }
        
        showNotification('Příjem zboží dokončen', 'success');
        
        // Vyčistit
        receiptItems = [];
        renderReceiptTable();
        
        // Resetovat formulář
        document.getElementById('receiptProduct').value = '';
        document.getElementById('receiptProductSearch').value = '';
        document.getElementById('receiptQuantity').value = '';
        document.getElementById('receiptNote').value = '';
        document.getElementById('receiptProductInfo').style.display = 'none';
        
        // Aktualizovat produkty
        renderProductCategories();
        renderProducts();
        
        // Focus na vyhledávání pro další příjem
        document.getElementById('receiptProductSearch').focus();
    } catch (error) {
        console.error('Chyba při ukládání příjmu:', error);
    }
}

// === HISTORIE OBJEDNÁVEK ===

let stockOrders = [];

async function loadOrderHistory() {
    try {
        stockOrders = await apiCall('orders.php');
        filteredOrders = [...stockOrders];
        populateOrderMonthSelect();
        renderOrderHistory();
        updateOrderStats();
    } catch (error) {
        console.error('Chyba při načítání objednávek:', error);
        stockOrders = [];
        filteredOrders = [];
        renderOrderHistory();
        updateOrderStats();
    }
}

function populateOrderMonthSelect() {
    const select = document.getElementById('orderMonthSelect');
    if (!select) return;
    
    const months = ['Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen', 
                    'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec'];
    
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    
    select.innerHTML = '<option value="">Vybrat měsíc...</option>';
    
    for (let i = 0; i < 12; i++) {
        const monthIndex = (currentMonth - i + 12) % 12;
        const year = currentYear - Math.floor((currentMonth - i) / 12) - (currentMonth - i < 0 ? 1 : 0);
        const value = `${year}-${String(monthIndex + 1).padStart(2, '0')}`;
        select.innerHTML += `<option value="${value}">${months[monthIndex]} ${year}</option>`;
    }
}

function filterOrderBySpecificMonth() {
    const select = document.getElementById('orderMonthSelect');
    if (!select || !select.value) return;
    
    const [year, month] = select.value.split('-').map(Number);
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    
    filteredOrders = stockOrders.filter(order => {
        const date = new Date(order.date);
        return date >= startDate && date <= endDate;
    });
    
    renderOrderHistory();
    updateOrderStats();
}

function updateOrderStats() {
    const countEl = document.getElementById('orderStatsCount');
    const itemsEl = document.getElementById('orderStatsItems');
    
    if (countEl) countEl.textContent = filteredOrders.length;
    
    if (itemsEl) {
        const totalItems = filteredOrders.reduce((sum, order) => 
            sum + (order.items ? order.items.length : 0), 0);
        itemsEl.textContent = totalItems;
    }
}

function filterOrderByMonth(period) {
    const now = new Date();
    let startDate;
    
    switch(period) {
        case 'current':
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
            break;
        case 'last':
            startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
            const endDate = new Date(now.getFullYear(), now.getMonth(), 0);
            filteredOrders = stockOrders.filter(order => {
                const date = new Date(order.date);
                return date >= startDate && date <= endDate;
            });
            renderOrderHistory();
            updateOrderStats();
            return;
        case 'last3':
            startDate = new Date(now.getFullYear(), now.getMonth() - 3, 1);
            break;
        case 'last6':
            startDate = new Date(now.getFullYear(), now.getMonth() - 6, 1);
            break;
        case 'year':
            startDate = new Date(now.getFullYear(), 0, 1);
            break;
        case 'all':
            filteredOrders = [...stockOrders];
            renderOrderHistory();
            updateOrderStats();
            return;
    }
    
    filteredOrders = stockOrders.filter(order => {
        const date = new Date(order.date);
        return date >= startDate;
    });
    
    renderOrderHistory();
    updateOrderStats();
}

function exportOrderHistoryToCSV() {
    if (filteredOrders.length === 0) {
        alert('Žádné objednávky k exportu');
        return;
    }
    
    let csv = 'Datum;Počet položek;Status;Poznámka;Produkt;Množství\n';
    
    filteredOrders.forEach(order => {
        const date = new Date(order.date).toLocaleDateString('cs-CZ');
        const itemCount = order.items ? order.items.length : 0;
        const status = order.status || 'pending';
        const note = (order.note || '').replace(/;/g, ',');
        
        if (order.items && order.items.length > 0) {
            order.items.forEach(item => {
                csv += `${date};${itemCount};${status};${note};${item.productName};${item.quantity} ${item.unit}\n`;
            });
        } else {
            csv += `${date};${itemCount};${status};${note};;\n`;
        }
    });
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `objednavky_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function renderOrderHistory() {
    const container = document.getElementById('orderHistoryList');
    if (!container) return;
    
    if (filteredOrders.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 3rem; color: var(--text-light);">
                <i class="fas fa-inbox" style="font-size: 3rem; margin-bottom: 1rem; display: block; opacity: 0.5;"></i>
                <p>Žádné objednávky pro zvolený filtr</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = filteredOrders.sort((a, b) => new Date(b.date) - new Date(a.date)).map(order => {
        const totalItems = order.items.length;
        const totalQuantity = order.items.reduce((sum, item) => sum + item.quantity, 0);
        
        const statusColors = {
            'pending': '#f59e0b',
            'ordered': '#3b82f6',
            'received': '#10b981',
            'cancelled': '#ef4444'
        };
        
        const statusLabels = {
            'pending': 'Čeká',
            'ordered': 'Objednáno',
            'received': 'Přijato',
            'cancelled': 'Zrušeno'
        };
        
        return `
            <div class="order-item" style="border-bottom: 1px solid var(--border-color); padding: 1rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; cursor: pointer;" onclick="toggleOrderDetail(${order.id})">
                    <div style="display: flex; align-items: center; gap: 1rem;">
                        <div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); width: 48px; height: 48px; border-radius: 0.5rem; display: flex; align-items: center; justify-content: center; color: white;">
                            <i class="fas fa-shopping-cart"></i>
                        </div>
                        <div>
                            <div style="font-weight: 600; margin-bottom: 0.25rem;">
                                Objednávka #${order.id}
                                <span style="display: inline-block; padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 600; margin-left: 0.5rem; background: ${statusColors[order.status]}; color: white;">
                                    ${statusLabels[order.status]}
                                </span>
                            </div>
                            <div style="font-size: 0.875rem; color: var(--text-light);">
                                ${new Date(order.date).toLocaleDateString('cs-CZ')} • ${totalItems} ${totalItems === 1 ? 'položka' : totalItems < 5 ? 'položky' : 'položek'}
                            </div>
                        </div>
                    </div>
                    <div style="display: flex; align-items: center; gap: 1rem;">
                        <div style="text-align: right;">
                            <div style="font-weight: 600; color: var(--primary);">
                                ${totalQuantity.toFixed(0)} ks
                            </div>
                            <div style="font-size: 0.75rem; color: var(--text-light);">
                                ${order.createdAt ? new Date(order.createdAt).toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit' }) : ''}
                            </div>
                        </div>
                        ${order.status === 'pending' ? `
                            <button class="btn btn-success" onclick="event.stopPropagation(); markOrderAsOrdered(${order.id})" style="font-size: 0.875rem; padding: 0.5rem 1rem;">
                                <i class="fas fa-check"></i> Objednáno
                            </button>
                        ` : ''}
                        ${order.status === 'ordered' ? `
                            <button class="btn btn-primary" onclick="event.stopPropagation(); markOrderAsReceived(${order.id})" style="font-size: 0.875rem; padding: 0.5rem 1rem;">
                                <i class="fas fa-truck"></i> Přijato
                            </button>
                        ` : ''}
                    </div>
                </div>
                
                <div id="order-detail-${order.id}" style="display: none; margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--border-color);">
                    <table style="width: 100%; font-size: 0.875rem;">
                        <thead>
                            <tr style="border-bottom: 1px solid var(--border-color);">
                                <th style="text-align: left; padding: 0.5rem; color: var(--text-light);">Produkt</th>
                                <th style="text-align: right; padding: 0.5rem; color: var(--text-light);">Množství</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${order.items.map(item => `
                                <tr>
                                    <td style="padding: 0.5rem;">${item.productName}</td>
                                    <td style="text-align: right; padding: 0.5rem; font-weight: 500;">${item.quantity} ${item.unit}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                    ${order.note ? `<div style="margin-top: 0.75rem; padding: 0.75rem; background: var(--bg-secondary); border-radius: 0.5rem; font-size: 0.875rem;"><strong>Poznámka:</strong> ${order.note}</div>` : ''}
                </div>
            </div>
        `;
    }).join('');
}

function toggleOrderDetail(orderId) {
    const detail = document.getElementById(`order-detail-${orderId}`);
    if (detail) {
        detail.style.display = detail.style.display === 'none' ? 'block' : 'none';
    }
}

async function markOrderAsOrdered(orderId) {
    // Uložit orderId pro pozdější použití
    window.pendingOrderId = orderId;
    
    // Zobrazit modal s volbou
    document.getElementById('confirmModalTitle').textContent = 'Objednávka byla objednána';
    document.getElementById('confirmModalMessage').innerHTML = `
        <p>Chcete tuto objednávku rovnou převést na příjem zboží?</p>
        <div style="margin-top: 1rem; padding: 1rem; background: var(--bg-light); border-radius: 0.5rem;">
            <p style="margin: 0; font-size: 0.875rem; color: var(--text-medium);">
                <i class="fas fa-info-circle"></i> Pokud zvolíte <strong>"Ano"</strong>, objednávka se převede na příjem a přičte se do skladu.<br>
                Pokud zvolíte <strong>"Ne"</strong>, objednávka se pouze označí jako objednaná.
            </p>
        </div>
    `;
    document.getElementById('confirmModalBtn').textContent = 'Ano, převést na příjem';
    document.getElementById('confirmModalBtn').className = 'btn btn-success';
    document.getElementById('confirmModalBtn').onclick = confirmConvertOrderToReceipt;
    
    // Přidat tlačítko "Ne, jen označit"
    const modalFooter = document.querySelector('#confirmModal .modal-footer');
    const existingBtn = modalFooter.querySelector('.btn-secondary');
    if (existingBtn) existingBtn.remove();
    
    const justMarkBtn = document.createElement('button');
    justMarkBtn.className = 'btn btn-secondary';
    justMarkBtn.textContent = 'Ne, jen označit jako objednané';
    justMarkBtn.onclick = () => {
        closeConfirmModal();
        confirmJustMarkAsOrdered(orderId);
    };
    modalFooter.insertBefore(justMarkBtn, modalFooter.firstChild);
    
    document.getElementById('confirmModal').classList.add('show');
}

async function confirmJustMarkAsOrdered(orderId) {
    try {
        await apiCall('orders.php', 'PUT', { id: orderId, status: 'ordered', note: '' });
        const order = stockOrders.find(o => o.id === orderId);
        if (order) order.status = 'ordered';
        renderOrderHistory();
        showNotification('Objednávka označena jako objednaná', 'success');
    } catch (error) {
        console.error('Chyba při aktualizaci objednávky:', error);
    }
}

async function confirmConvertOrderToReceipt() {
    closeConfirmModal();
    const orderId = window.pendingOrderId;
    window.pendingOrderId = null;
    
    try {
        const order = stockOrders.find(o => o.id === orderId);
        if (!order) return;
        
        // Označit objednávku jako přijatou
        await apiCall('orders.php', 'PUT', { id: orderId, status: 'received', note: '' });
        order.status = 'received';
        
        // Vytvořit příjemku z objednávky
        const today = new Date().toISOString().split('T')[0];
        const receiptData = {
            date: today,
            note: `Příjem z objednávky #${orderId}`,
            items: order.items.map(item => ({
                productId: item.productId,
                productName: item.productName,
                quantity: item.quantity,
                unit: item.unit,
                note: `Z objednávky #${orderId}`
            }))
        };
        
        await apiCall('receipts.php', 'POST', receiptData);
        
        // Aktualizovat lokální stav produktů
        for (const item of order.items) {
            const product = products.find(p => p.id === item.productId);
            if (product) {
                // Převést na základní jednotku
                let quantityInBaseUnit = item.quantity;
                if (item.unit !== product.unit) {
                    quantityInBaseUnit = convertToBaseUnit(item.quantity, item.unit, product.unit, product);
                }
                
                // Přidat do skladu
                product.stock += quantityInBaseUnit;
                
                // Přidat pohyb
                if (!product.movements) {
                    product.movements = [];
                }
                product.movements.unshift({
                    date: today,
                    type: 'purchase',
                    quantity: quantityInBaseUnit,
                    unit: product.unit,
                    note: `Příjem z objednávky #${orderId} (${item.quantity} ${item.unit})`
                });
                
                // Uložit změny produktu do API
                await apiCall('products.php', 'PUT', product);
            }
        }
        
        renderOrderHistory();
        renderProductCategories();
        renderProducts();
        showNotification('Objednávka přijata a přidána do skladu', 'success');
    } catch (error) {
        console.error('Chyba při převodu objednávky na příjem:', error);
        showNotification('Chyba při převodu objednávky', 'error');
    }
}

async function markOrderAsReceived(orderId) {
    try {
        await apiCall('orders.php', 'PUT', { id: orderId, status: 'received', note: '' });
        const order = stockOrders.find(o => o.id === orderId);
        if (order) order.status = 'received';
        renderOrderHistory();
        showNotification('Objednávka označena jako přijatá', 'success');
    } catch (error) {
        console.error('Chyba při aktualizaci objednávky:', error);
    }
}

// === HISTORIE PŘÍJMŮ ===

let stockReceipts = [];

async function loadReceiptHistory() {
    try {
        stockReceipts = await apiCall('receipts.php');
        filteredReceipts = [...stockReceipts];
        populateReceiptMonthSelect();
        renderReceiptHistory();
        updateReceiptStats();
    } catch (error) {
        console.error('Chyba při načítání příjemek:', error);
        stockReceipts = [];
        filteredReceipts = [];
        renderReceiptHistory();
        updateReceiptStats();
    }
}

function populateReceiptMonthSelect() {
    const select = document.getElementById('receiptMonthSelect');
    if (!select) return;
    
    const months = ['Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen', 
                    'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec'];
    
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    
    select.innerHTML = '<option value="">Vybrat měsíc...</option>';
    
    // Přidat posledních 12 měsíců
    for (let i = 0; i < 12; i++) {
        const monthIndex = (currentMonth - i + 12) % 12;
        const year = currentYear - Math.floor((currentMonth - i) / 12) - (currentMonth - i < 0 ? 1 : 0);
        const value = `${year}-${String(monthIndex + 1).padStart(2, '0')}`;
        select.innerHTML += `<option value="${value}">${months[monthIndex]} ${year}</option>`;
    }
}

function filterReceiptBySpecificMonth() {
    const select = document.getElementById('receiptMonthSelect');
    if (!select || !select.value) return;
    
    const [year, month] = select.value.split('-').map(Number);
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    
    filteredReceipts = stockReceipts.filter(receipt => {
        const date = new Date(receipt.date);
        return date >= startDate && date <= endDate;
    });
    
    renderReceiptHistory();
    updateReceiptStats();
}

function updateReceiptStats() {
    const countEl = document.getElementById('receiptStatsCount');
    const itemsEl = document.getElementById('receiptStatsItems');
    
    if (countEl) countEl.textContent = filteredReceipts.length;
    
    if (itemsEl) {
        const totalItems = filteredReceipts.reduce((sum, receipt) => 
            sum + (receipt.items ? receipt.items.length : 0), 0);
        itemsEl.textContent = totalItems;
    }
}

function filterReceiptByMonth(period) {
    const now = new Date();
    let startDate;
    
    switch(period) {
        case 'current':
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
            break;
        case 'last':
            startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
            const endDate = new Date(now.getFullYear(), now.getMonth(), 0);
            filteredReceipts = stockReceipts.filter(receipt => {
                const date = new Date(receipt.date);
                return date >= startDate && date <= endDate;
            });
            renderReceiptHistory();
            updateReceiptStats();
            return;
        case 'last3':
            startDate = new Date(now.getFullYear(), now.getMonth() - 3, 1);
            break;
        case 'last6':
            startDate = new Date(now.getFullYear(), now.getMonth() - 6, 1);
            break;
        case 'year':
            startDate = new Date(now.getFullYear(), 0, 1);
            break;
        case 'all':
            filteredReceipts = [...stockReceipts];
            renderReceiptHistory();
            updateReceiptStats();
            return;
    }
    
    filteredReceipts = stockReceipts.filter(receipt => {
        const date = new Date(receipt.date);
        return date >= startDate;
    });
    
    renderReceiptHistory();
    updateReceiptStats();
}

function exportReceiptHistoryToCSV() {
    if (filteredReceipts.length === 0) {
        alert('Žádné příjemky k exportu');
        return;
    }
    
    let csv = 'Datum;Čas;Počet položek;Poznámka;Produkt;Množství\n';
    
    filteredReceipts.forEach(receipt => {
        const date = new Date(receipt.date).toLocaleDateString('cs-CZ');
        const time = receipt.createdAt ? new Date(receipt.createdAt).toLocaleTimeString('cs-CZ') : '';
        const itemCount = receipt.items ? receipt.items.length : 0;
        const note = (receipt.note || '').replace(/;/g, ',');
        
        if (receipt.items && receipt.items.length > 0) {
            receipt.items.forEach(item => {
                csv += `${date};${time};${itemCount};${note};${item.productName};${item.quantity} ${item.unit}\n`;
            });
        } else {
            csv += `${date};${time};${itemCount};${note};;\n`;
        }
    });
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `prijmy_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function renderReceiptHistory() {
    const container = document.getElementById('receiptHistoryList');
    if (!container) return;
    
    if (filteredReceipts.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 3rem; color: var(--text-light);">
                <i class="fas fa-inbox" style="font-size: 3rem; margin-bottom: 1rem; display: block; opacity: 0.5;"></i>
                <p>Žádné příjemky pro zvolený filtr</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = filteredReceipts.sort((a, b) => new Date(b.date) - new Date(a.date)).map(receipt => {
        const totalItems = receipt.items.length;
        const totalQuantity = receipt.items.reduce((sum, item) => sum + item.quantity, 0);
        
        return `
            <div class="receipt-item" style="border-bottom: 1px solid var(--border-color); padding: 1rem; cursor: pointer; transition: background 0.2s;" onclick="toggleReceiptDetail(${receipt.id})">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div style="display: flex; align-items: center; gap: 1rem;">
                        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); width: 48px; height: 48px; border-radius: 0.5rem; display: flex; align-items: center; justify-content: center; color: white;">
                            <i class="fas fa-truck-loading"></i>
                        </div>
                        <div>
                            <div style="font-weight: 600; margin-bottom: 0.25rem;">
                                Příjemka #${receipt.id}
                            </div>
                            <div style="font-size: 0.875rem; color: var(--text-light);">
                                ${new Date(receipt.date).toLocaleDateString('cs-CZ')} • ${totalItems} ${totalItems === 1 ? 'položka' : totalItems < 5 ? 'položky' : 'položek'}
                            </div>
                        </div>
                    </div>
                    <div style="text-align: right;">
                        <div style="font-weight: 600; color: var(--primary);">
                            ${totalQuantity.toFixed(0)} ks
                        </div>
                        <div style="font-size: 0.75rem; color: var(--text-light);">
                            ${receipt.createdAt ? new Date(receipt.createdAt).toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit' }) : ''}
                        </div>
                    </div>
                </div>
                
                <div id="receipt-detail-${receipt.id}" style="display: none; margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--border-color);">
                    <table style="width: 100%; font-size: 0.875rem;">
                        <thead>
                            <tr style="border-bottom: 1px solid var(--border-color);">
                                <th style="text-align: left; padding: 0.5rem; color: var(--text-light);">Produkt</th>
                                <th style="text-align: right; padding: 0.5rem; color: var(--text-light);">Množství</th>
                                <th style="text-align: left; padding: 0.5rem; color: var(--text-light);">Poznámka</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${receipt.items.map(item => `
                                <tr>
                                    <td style="padding: 0.5rem;">${item.productName}</td>
                                    <td style="text-align: right; padding: 0.5rem; font-weight: 500;">${item.quantity} ${item.unit}</td>
                                    <td style="padding: 0.5rem; color: var(--text-light);">${item.note || '-'}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                    ${receipt.note ? `<div style="margin-top: 0.75rem; padding: 0.75rem; background: var(--bg-secondary); border-radius: 0.5rem; font-size: 0.875rem;"><strong>Poznámka:</strong> ${receipt.note}</div>` : ''}
                </div>
            </div>
        `;
    }).join('');
}

function toggleReceiptDetail(receiptId) {
    const detail = document.getElementById(`receipt-detail-${receiptId}`);
    if (detail) {
        detail.style.display = detail.style.display === 'none' ? 'block' : 'none';
    }
}

// === HISTORIE PRODEJŮ ===

let salesHistory = [];
let filteredReceipts = [];
let filteredIssues = [];
let filteredSales = [];
let filteredOrders = [];

async function loadSalesHistory() {
    try {
        salesHistory = await apiCall('purchases.php');
        filteredSales = [...salesHistory];
        populateSalesMonthSelect();
        renderSalesHistory();
        updateSalesStats();
    } catch (error) {
        console.error('Chyba při načítání historie prodejů:', error);
        salesHistory = [];
        filteredSales = [];
        renderSalesHistory();
        updateSalesStats();
    }
}

function populateSalesMonthSelect() {
    const select = document.getElementById('salesMonthSelect');
    if (!select) return;
    
    const months = ['Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen', 
                    'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec'];
    
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    
    select.innerHTML = '<option value="">Vybrat měsíc...</option>';
    
    for (let i = 0; i < 12; i++) {
        const monthIndex = (currentMonth - i + 12) % 12;
        const year = currentYear - Math.floor((currentMonth - i) / 12) - (currentMonth - i < 0 ? 1 : 0);
        const value = `${year}-${String(monthIndex + 1).padStart(2, '0')}`;
        select.innerHTML += `<option value="${value}">${months[monthIndex]} ${year}</option>`;
    }
}

function filterSalesBySpecificMonth() {
    const select = document.getElementById('salesMonthSelect');
    if (!select || !select.value) return;
    
    const [year, month] = select.value.split('-').map(Number);
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    
    filteredSales = salesHistory.filter(sale => {
        const date = new Date(sale.date);
        return date >= startDate && date <= endDate;
    });
    
    renderSalesHistory();
    updateSalesStats();
}

function updateSalesStats() {
    const countEl = document.getElementById('salesStatsCount');
    const itemsEl = document.getElementById('salesStatsItems');
    const totalEl = document.getElementById('salesStatsTotal');
    
    if (countEl) countEl.textContent = filteredSales.length;
    
    if (itemsEl) {
        const totalItems = filteredSales.reduce((sum, sale) => 
            sum + (sale.items ? sale.items.length : 0), 0);
        itemsEl.textContent = totalItems;
    }
    
    if (totalEl) {
        const totalAmount = filteredSales.reduce((sum, sale) => sum + parseFloat(sale.totalAmount || 0), 0);
        totalEl.textContent = totalAmount.toFixed(2);
    }
}

function filterSalesByMonth(period) {
    const now = new Date();
    let startDate;
    
    switch(period) {
        case 'current':
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
            break;
        case 'last':
            startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
            const endDate = new Date(now.getFullYear(), now.getMonth(), 0);
            filteredSales = salesHistory.filter(sale => {
                const date = new Date(sale.date);
                return date >= startDate && date <= endDate;
            });
            renderSalesHistory();
            updateSalesStats();
            return;
        case 'last3':
            startDate = new Date(now.getFullYear(), now.getMonth() - 3, 1);
            break;
        case 'last6':
            startDate = new Date(now.getFullYear(), now.getMonth() - 6, 1);
            break;
        case 'year':
            startDate = new Date(now.getFullYear(), 0, 1);
            break;
        case 'all':
            filteredSales = [...salesHistory];
            renderSalesHistory();
            updateSalesStats();
            return;
    }
    
    filteredSales = salesHistory.filter(sale => {
        const date = new Date(sale.date);
        return date >= startDate;
    });
    
    renderSalesHistory();
    updateSalesStats();
}

function exportSalesHistoryToCSV() {
    if (filteredSales.length === 0) {
        alert('Žádné prodeje k exportu');
        return;
    }
    
    let csv = 'Datum;Čas;Počet položek;Celkem Kč;Poznámka;Produkt;Množství;Cena\n';
    
    filteredSales.forEach(sale => {
        const date = new Date(sale.date).toLocaleDateString('cs-CZ');
        const time = sale.createdAt ? new Date(sale.createdAt).toLocaleTimeString('cs-CZ') : '';
        const itemCount = sale.items ? sale.items.length : 0;
        const total = sale.totalAmount || 0;
        const note = (sale.note || '').replace(/;/g, ',');
        
        if (sale.items && sale.items.length > 0) {
            sale.items.forEach(item => {
                csv += `${date};${time};${itemCount};${total};${note};${item.productName};${item.quantity} ${item.unit};${item.price}\n`;
            });
        } else {
            csv += `${date};${time};${itemCount};${total};${note};;;\n`;
        }
    });
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `prodeje_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function renderSalesHistory() {
    const container = document.getElementById('salesHistoryList');
    if (!container) return;
    
    if (filteredSales.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 3rem; color: var(--text-light);">
                <i class="fas fa-inbox" style="font-size: 3rem; margin-bottom: 1rem; display: block; opacity: 0.5;"></i>
                <p>Žádné prodeje pro zvolený filtr</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = filteredSales.sort((a, b) => new Date(b.date) - new Date(a.date)).map(sale => {
        const totalItems = sale.items.length;
        const saleItems = sale.items.filter(item => item.price > 0);
        const workItems = sale.items.filter(item => item.price === 0);
        
        return `
            <div class="sale-item" style="border-bottom: 1px solid var(--border-color); padding: 1rem; cursor: pointer; transition: background 0.2s;" onclick="toggleSaleDetail(${sale.id})">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div style="display: flex; align-items: center; gap: 1rem;">
                        <div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); width: 48px; height: 48px; border-radius: 0.5rem; display: flex; align-items: center; justify-content: center; color: white;">
                            <i class="fas fa-cash-register"></i>
                        </div>
                        <div>
                            <div style="font-weight: 600; font-size: 1rem; margin-bottom: 0.25rem;">
                                ${formatDate(sale.date)}
                                ${sale.customerName ? `- ${sale.customerName}` : ''}
                            </div>
                            <div style="font-size: 0.875rem; color: var(--text-light);">
                                ${totalItems} ${totalItems === 1 ? 'položka' : totalItems < 5 ? 'položky' : 'položek'}
                                ${saleItems.length > 0 ? `<span style="color: #3b82f6; margin-left: 0.5rem;"><i class="fas fa-shopping-bag"></i> ${saleItems.length} prodej</span>` : ''}
                                ${workItems.length > 0 ? `<span style="color: #8b5cf6; margin-left: 0.5rem;"><i class="fas fa-tools"></i> ${workItems.length} práce</span>` : ''}
                            </div>
                        </div>
                    </div>
                    <div style="text-align: right;">
                        <div style="font-size: 1.25rem; font-weight: 700; color: var(--primary-color);">
                            ${sale.total.toLocaleString('cs-CZ')} Kč
                        </div>
                        <div style="font-size: 0.75rem; color: var(--text-light);">
                            ${new Date(sale.createdAt).toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                    </div>
                </div>
                
                <div id="sale-detail-${sale.id}" style="display: none; margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--border-color);">
                    <table style="width: 100%; font-size: 0.875rem;">
                        <thead>
                            <tr style="border-bottom: 1px solid var(--border-color);">
                                <th style="text-align: left; padding: 0.5rem; color: var(--text-light);">Produkt</th>
                                <th style="text-align: center; padding: 0.5rem; color: var(--text-light);">Účel</th>
                                <th style="text-align: right; padding: 0.5rem; color: var(--text-light);">Množství</th>
                                <th style="text-align: right; padding: 0.5rem; color: var(--text-light);">Cena</th>
                                <th style="text-align: right; padding: 0.5rem; color: var(--text-light);">Celkem</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${sale.items.map(item => {
                                const isWork = item.price === 0;
                                const purposeBadge = isWork 
                                    ? '<span style="background: #f3e8ff; color: #7c3aed; padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.625rem; font-weight: 600;"><i class="fas fa-tools"></i> Práce</span>'
                                    : '<span style="background: #dbeafe; color: #1d4ed8; padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.625rem; font-weight: 600;"><i class="fas fa-shopping-bag"></i> Prodej</span>';
                                
                                return `
                                    <tr>
                                        <td style="padding: 0.5rem;">${item.name}</td>
                                        <td style="text-align: center; padding: 0.5rem;">${purposeBadge}</td>
                                        <td style="text-align: right; padding: 0.5rem; font-weight: 500;">${item.quantity} ks</td>
                                        <td style="text-align: right; padding: 0.5rem;">${isWork ? '—' : `${item.price} Kč`}</td>
                                        <td style="text-align: right; padding: 0.5rem; font-weight: 600;">${isWork ? '—' : `${(item.quantity * item.price).toLocaleString('cs-CZ')} Kč`}</td>
                                    </tr>
                                `;
                            }).join('')}
                        </tbody>
                        ${sale.total > 0 ? `
                            <tfoot>
                                <tr style="border-top: 2px solid var(--border-color);">
                                    <td colspan="4" style="padding: 0.75rem; text-align: right; font-weight: 600;">Celkem:</td>
                                    <td style="padding: 0.75rem; text-align: right; font-weight: 700; font-size: 1.125rem; color: var(--primary-color);">${sale.total.toLocaleString('cs-CZ')} Kč</td>
                                </tr>
                            </tfoot>
                        ` : ''}
                    </table>
                </div>
            </div>
        `;
    }).join('');
}

function toggleSaleDetail(saleId) {
    const detail = document.getElementById(`sale-detail-${saleId}`);
    if (detail) {
        detail.style.display = detail.style.display === 'none' ? 'block' : 'none';
    }
}

// === OBJEDNÁVKA ZBOŽÍ ===

let orderItems = [];
let selectedOrderSuggestionIndex = -1;
let filteredOrderSuggestions = [];

function initOrderPage() {
    const orderSearchInput = document.getElementById('orderProductSearch');
    if (orderSearchInput) {
        // Zavřít suggestions při kliknutí mimo
        document.addEventListener('click', function(e) {
            if (!e.target.closest('#orderProductSearch') && !e.target.closest('#orderProductSuggestions')) {
                hideOrderProductSuggestions();
            }
        });
    }
}

function generateOrderFromLowStock() {
    // Najít všechny produkty pod minimální zásobou
    const lowStockProducts = products.filter(p => p.stock < p.minStock);
    
    if (lowStockProducts.length === 0) {
        document.getElementById('confirmModalTitle').textContent = 'Dostatečná zásoba';
        document.getElementById('confirmModalMessage').innerHTML = '<p>🎉 Všechny produkty mají dostatečnou zásobu!</p>';
        document.getElementById('confirmModalBtn').textContent = 'OK';
        document.getElementById('confirmModalBtn').className = 'btn btn-success';
        document.getElementById('confirmModalBtn').onclick = closeConfirmModal;
        document.getElementById('confirmModal').classList.add('show');
        return;
    }
    
    // Pokud už jsou nějaké položky, zobrazit potvrzení
    if (orderItems.length > 0) {
        window.pendingLowStockProducts = lowStockProducts;
        document.getElementById('confirmModalTitle').textContent = 'Přepsat objednávku?';
        document.getElementById('confirmModalMessage').innerHTML = `<p>Aktuální objednávka obsahuje <strong>${orderItems.length} položek</strong>.</p><p style="margin-top: 1rem;">Chcete je přepsat <strong>${lowStockProducts.length} produkty</strong> pod minimální zásobou?</p>`;
        document.getElementById('confirmModalBtn').textContent = 'Přepsat';
        document.getElementById('confirmModalBtn').className = 'btn btn-warning';
        document.getElementById('confirmModalBtn').onclick = confirmGenerateOrderFromLowStock;
        document.getElementById('confirmModal').classList.add('show');
        return;
    }
    
    // Přidat produkty do objednávky
    addLowStockProductsToOrder(lowStockProducts);
}

function confirmGenerateOrderFromLowStock() {
    closeConfirmModal();
    const lowStockProducts = window.pendingLowStockProducts;
    window.pendingLowStockProducts = null;
    orderItems = [];
    addLowStockProductsToOrder(lowStockProducts);
}

function addLowStockProductsToOrder(lowStockProducts) {
    lowStockProducts.forEach(product => {
        const missing = product.minStock - product.stock;
        // Zaokrouhlit nahoru na celé balení
        const packages = Math.ceil(missing / product.packageSize);
        const orderQty = packages * product.packageSize;
        
        orderItems.push({
            productId: product.id,
            productName: product.name,
            categoryId: product.categoryId,
            currentStock: product.stock,
            minStock: product.minStock,
            quantity: orderQty,
            unit: product.unit
        });
    });
    
    renderOrderTable();
}

function filterOrderProductSuggestions() {
    const input = document.getElementById('orderProductSearch');
    const query = input.value.toLowerCase().trim();
    
    if (query.length === 0) {
        filteredOrderSuggestions = [...products].sort((a, b) => a.name.localeCompare(b.name));
    } else {
        filteredOrderSuggestions = products.filter(p => 
            p.name.toLowerCase().includes(query)
        ).sort((a, b) => {
            const aStarts = a.name.toLowerCase().startsWith(query);
            const bStarts = b.name.toLowerCase().startsWith(query);
            if (aStarts && !bStarts) return -1;
            if (!aStarts && bStarts) return 1;
            return a.name.localeCompare(b.name);
        });
    }
    
    selectedOrderSuggestionIndex = -1;
    renderOrderProductSuggestions();
    showOrderProductSuggestions();
}

function renderOrderProductSuggestions() {
    const suggestionsDiv = document.getElementById('orderProductSuggestions');
    
    if (filteredOrderSuggestions.length === 0) {
        suggestionsDiv.innerHTML = '<div class="no-suggestions">Žádné produkty nenalezeny</div>';
        return;
    }
    
    const displaySuggestions = filteredOrderSuggestions.slice(0, 50);
    
    suggestionsDiv.innerHTML = displaySuggestions.map((product, index) => {
        const category = productCategories.find(c => c.id === product.categoryId);
        const categoryName = category ? category.name : 'Bez kategorie';
        const isLowStock = product.stock < product.minStock;
        const stockClass = isLowStock ? 'low' : '';
        const stockDisplay = formatStockDisplay(product);
        
        return `
            <div class="suggestion-item ${index === selectedOrderSuggestionIndex ? 'selected' : ''}" 
                 onclick="selectOrderProduct(${product.id})" 
                 data-index="${index}">
                <div class="suggestion-name">${product.name}</div>
                <div class="suggestion-meta">
                    <span class="suggestion-category">
                        <i class="fas fa-tag"></i> ${categoryName}
                    </span>
                    <span class="suggestion-stock ${stockClass}">
                        <i class="fas fa-box"></i> ${stockDisplay}
                        ${isLowStock ? '<i class="fas fa-exclamation-triangle"></i>' : ''}
                    </span>
                </div>
            </div>
        `;
    }).join('');
    
    if (filteredOrderSuggestions.length > 50) {
        suggestionsDiv.innerHTML += '<div class="no-suggestions">... a další ' + (filteredOrderSuggestions.length - 50) + ' produktů. Upřesněte hledání.</div>';
    }
}

function showOrderProductSuggestions() {
    const suggestionsDiv = document.getElementById('orderProductSuggestions');
    if (filteredOrderSuggestions.length > 0 || document.getElementById('orderProductSearch').value.length > 0) {
        suggestionsDiv.classList.add('active');
    }
}

function hideOrderProductSuggestions() {
    const suggestionsDiv = document.getElementById('orderProductSuggestions');
    suggestionsDiv.classList.remove('active');
    selectedOrderSuggestionIndex = -1;
}

function handleOrderProductKeyDown(event) {
    const suggestionsDiv = document.getElementById('orderProductSuggestions');
    
    if (!suggestionsDiv.classList.contains('active')) {
        if (event.key === 'ArrowDown' || event.key === 'Enter') {
            filterOrderProductSuggestions();
            showOrderProductSuggestions();
        }
        return;
    }
    
    if (event.key === 'ArrowDown') {
        event.preventDefault();
        selectedOrderSuggestionIndex = Math.min(selectedOrderSuggestionIndex + 1, filteredOrderSuggestions.length - 1);
        renderOrderProductSuggestions();
        scrollToSelectedOrderSuggestion();
    } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        selectedOrderSuggestionIndex = Math.max(selectedOrderSuggestionIndex - 1, 0);
        renderOrderProductSuggestions();
        scrollToSelectedOrderSuggestion();
    } else if (event.key === 'Enter') {
        event.preventDefault();
        if (selectedOrderSuggestionIndex >= 0 && selectedOrderSuggestionIndex < filteredOrderSuggestions.length) {
            selectOrderProduct(filteredOrderSuggestions[selectedOrderSuggestionIndex].id);
        }
    } else if (event.key === 'Escape') {
        hideOrderProductSuggestions();
    }
}

function scrollToSelectedOrderSuggestion() {
    const suggestionsDiv = document.getElementById('orderProductSuggestions');
    const selectedItem = suggestionsDiv.querySelector('.suggestion-item.selected');
    if (selectedItem) {
        selectedItem.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
}

function selectOrderProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    document.getElementById('orderProduct').value = productId;
    document.getElementById('orderProductSearch').value = product.name;
    hideOrderProductSuggestions();
    
    updateOrderProductInfo();
    
    // Přesunout focus na množství a předvyplnit chybějící množství
    const quantityInput = document.getElementById('orderQuantity');
    const missing = Math.max(0, product.minStock - product.stock);
    if (missing > 0) {
        const packages = Math.ceil(missing / product.packageSize);
        quantityInput.value = packages * product.packageSize;
    }
    quantityInput.focus();
    quantityInput.select();
}

function updateOrderProductInfo() {
    const productId = parseInt(document.getElementById('orderProduct').value);
    const unitSelect = document.getElementById('orderUnit');
    const infoBox = document.getElementById('orderProductInfo');
    
    if (!productId) {
        infoBox.style.display = 'none';
        unitSelect.innerHTML = '<option value="">Vyberte jednotku...</option>';
        return;
    }
    
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Aktualizovat možnosti jednotek
    unitSelect.innerHTML = '';
    const unitOptions = getUnitOptions(product.unit);
    unitOptions.forEach(unit => {
        const option = document.createElement('option');
        option.value = unit;
        option.textContent = unit;
        if (unit === product.unit) option.selected = true;
        unitSelect.appendChild(option);
    });
    
    // Zobrazit info
    const currentStockDisplay = formatStockDisplay(product);
    const minStockDisplay = formatStockDisplay(product.minStock, product.unit, product.packageSize);
    const missing = Math.max(0, product.minStock - product.stock);
    const missingDisplay = formatStockDisplay(missing, product.unit, product.packageSize);
    
    document.getElementById('orderInfoCurrentStock').textContent = currentStockDisplay;
    document.getElementById('orderInfoMinStock').textContent = minStockDisplay;
    document.getElementById('orderInfoMissing').textContent = missing > 0 ? missingDisplay : '0 ks';
    document.getElementById('orderInfoMissing').style.color = missing > 0 ? '#ef4444' : '#10b981';
    
    infoBox.style.display = 'block';
}

function addToOrder() {
    const productId = parseInt(document.getElementById('orderProduct').value);
    const quantity = parseFloat(document.getElementById('orderQuantity').value);
    const unit = document.getElementById('orderUnit').value;
    
    if (!productId) {
        document.getElementById('confirmModalTitle').textContent = 'Produkt nevybrán';
        document.getElementById('confirmModalMessage').textContent = 'Vyberte prosím produkt pro přidání do objednávky!';
        document.getElementById('confirmModalBtn').textContent = 'OK';
        document.getElementById('confirmModalBtn').className = 'btn btn-primary';
        document.getElementById('confirmModalBtn').onclick = closeConfirmModal;
        document.getElementById('confirmModal').classList.add('show');
        return;
    }
    
    if (!quantity || quantity <= 0) {
        document.getElementById('confirmModalTitle').textContent = 'Neplatné množství';
        document.getElementById('confirmModalMessage').textContent = 'Zadejte prosím platné množství větší než 0!';
        document.getElementById('confirmModalBtn').textContent = 'OK';
        document.getElementById('confirmModalBtn').className = 'btn btn-primary';
        document.getElementById('confirmModalBtn').onclick = closeConfirmModal;
        document.getElementById('confirmModal').classList.add('show');
        return;
    }
    
    if (!unit) {
        document.getElementById('confirmModalTitle').textContent = 'Jednotka nevybrána';
        document.getElementById('confirmModalMessage').textContent = 'Vyberte prosím jednotku!';
        document.getElementById('confirmModalBtn').textContent = 'OK';
        document.getElementById('confirmModalBtn').className = 'btn btn-primary';
        document.getElementById('confirmModalBtn').onclick = closeConfirmModal;
        document.getElementById('confirmModal').classList.add('show');
        return;
    }
    
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Zkontrolovat, zda produkt už není v objednávce
    const existingIndex = orderItems.findIndex(item => item.productId === productId);
    if (existingIndex >= 0) {
        // Aktualizovat množství
        window.pendingOrderUpdate = { existingIndex, quantity, unit };
        document.getElementById('confirmModalTitle').textContent = 'Produkt již v objednávce';
        document.getElementById('confirmModalMessage').innerHTML = `<p>Produkt <strong>${product.name}</strong> je již v objednávce.</p><p style="margin-top: 1rem;">Chcete nahradit množství?</p>`;
        document.getElementById('confirmModalBtn').textContent = 'Nahradit';
        document.getElementById('confirmModalBtn').className = 'btn btn-primary';
        document.getElementById('confirmModalBtn').onclick = confirmUpdateOrderItem;
        document.getElementById('confirmModal').classList.add('show');
        return;
    }
    
    // Přidat nový
    orderItems.push({
        productId: productId,
        productName: product.name,
        categoryId: product.categoryId,
        currentStock: product.stock,
        minStock: product.minStock,
        quantity: quantity,
        unit: unit
    });
    
    renderOrderTable();
    
    // Vyčistit formulář
    document.getElementById('orderProduct').value = '';
    document.getElementById('orderProductSearch').value = '';
    document.getElementById('orderQuantity').value = '';
    document.getElementById('orderProductInfo').style.display = 'none';
    document.getElementById('orderProductSearch').focus();
}

function confirmUpdateOrderItem() {
    closeConfirmModal();
    const { existingIndex, quantity, unit } = window.pendingOrderUpdate;
    orderItems[existingIndex].quantity = quantity;
    orderItems[existingIndex].unit = unit;
    window.pendingOrderUpdate = null;
    renderOrderTable();
    
    // Vyčistit formulář
    document.getElementById('orderProduct').value = '';
    document.getElementById('orderProductSearch').value = '';
    document.getElementById('orderQuantity').value = '';
    document.getElementById('orderProductInfo').style.display = 'none';
    document.getElementById('orderProductSearch').focus();
}

function renderOrderTable() {
    const tbody = document.getElementById('orderTableBody');
    
    if (orderItems.length === 0) {
        tbody.innerHTML = `
            <tr class="empty-row">
                <td colspan="6" style="text-align: center; color: var(--text-light); padding: 2rem;">
                    <i class="fas fa-shopping-cart" style="font-size: 2rem; margin-bottom: 0.5rem; display: block;"></i>
                    Žádné produkty v objednávce<br>
                    <small>Klikněte na "Doplnit produkty pod minimem" nebo přidejte ručně</small>
                </td>
            </tr>
        `;
        return;
    }
    
    tbody.innerHTML = orderItems.map((item, index) => {
        const category = productCategories.find(c => c.id === item.categoryId);
        const categoryName = category ? category.name : 'Bez kategorie';
        const product = products.find(p => p.id === item.productId);
        const currentStockDisplay = product ? formatStockDisplay(product) : '-';
        
        return `
            <tr>
                <td><strong>${item.productName}</strong></td>
                <td>${categoryName}</td>
                <td>${currentStockDisplay}</td>
                <td>
                    <input type="number" 
                           value="${item.quantity}" 
                           step="0.01" 
                           style="width: 80px; padding: 0.375rem; border: 1px solid var(--border-color); border-radius: 0.375rem;"
                           onchange="updateOrderQuantity(${index}, this.value)">
                </td>
                <td>${item.unit}</td>
                <td>
                    <div class="receipt-actions">
                        <button class="btn btn-danger" onclick="removeFromOrder(${index})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

function updateOrderQuantity(index, newQuantity) {
    const quantity = parseFloat(newQuantity);
    if (isNaN(quantity) || quantity <= 0) {
        document.getElementById('confirmModalTitle').textContent = 'Neplatné množství';
        document.getElementById('confirmModalMessage').textContent = 'Zadejte prosím platné množství větší než 0!';
        document.getElementById('confirmModalBtn').textContent = 'OK';
        document.getElementById('confirmModalBtn').className = 'btn btn-primary';
        document.getElementById('confirmModalBtn').onclick = closeConfirmModal;
        document.getElementById('confirmModal').classList.add('show');
        renderOrderTable();
        return;
    }
    orderItems[index].quantity = quantity;
}

function removeFromOrder(index) {
    const item = orderItems[index];
    window.pendingOrderRemoveIndex = index;
    
    document.getElementById('confirmModalTitle').textContent = 'Odstranit položku';
    document.getElementById('confirmModalMessage').innerHTML = `<p>Opravdu chcete odstranit <strong>${item.productName}</strong> z objednávky?</p>`;
    document.getElementById('confirmModalBtn').textContent = 'Odstranit';
    document.getElementById('confirmModalBtn').className = 'btn btn-danger';
    document.getElementById('confirmModalBtn').onclick = confirmRemoveFromOrder;
    document.getElementById('confirmModal').classList.add('show');
}

function confirmRemoveFromOrder() {
    closeConfirmModal();
    orderItems.splice(window.pendingOrderRemoveIndex, 1);
    window.pendingOrderRemoveIndex = null;
    renderOrderTable();
}

async function exportOrder() {
    if (orderItems.length === 0) {
        document.getElementById('confirmModalTitle').textContent = 'Prázdná objednávka';
        document.getElementById('confirmModalMessage').textContent = 'Objednávka je prázdná! Přidejte prosím produkty do objednávky.';
        document.getElementById('confirmModalBtn').textContent = 'OK';
        document.getElementById('confirmModalBtn').className = 'btn btn-primary';
        document.getElementById('confirmModalBtn').onclick = closeConfirmModal;
        document.getElementById('confirmModal').classList.add('show');
        return;
    }
    
    try {
        // Uložit objednávku do databáze
        const orderData = {
            date: new Date().toISOString().split('T')[0],
            status: 'pending',
            note: '',
            items: orderItems.map(item => ({
                productId: item.productId,
                productName: item.productName,
                quantity: item.quantity,
                unit: item.unit
            }))
        };
        
        await apiCall('orders.php', 'POST', orderData);
        
        // Vytvořit textový export
        let exportText = '=== OBJEDNÁVKA ZBOŽÍ ===\n';
        exportText += `Datum: ${new Date().toLocaleDateString('cs-CZ')}\n\n`;
        
        // Seskupit podle kategorií
        const byCategory = {};
        orderItems.forEach(item => {
            const category = productCategories.find(c => c.id === item.categoryId);
            const categoryName = category ? category.name : 'Ostatní';
            if (!byCategory[categoryName]) {
                byCategory[categoryName] = [];
            }
            byCategory[categoryName].push(item);
        });
        
        Object.keys(byCategory).sort().forEach(categoryName => {
            exportText += `\n${categoryName.toUpperCase()}\n`;
            exportText += '─'.repeat(50) + '\n';
            byCategory[categoryName].forEach(item => {
                exportText += `${item.productName.padEnd(30)} ${item.quantity} ${item.unit}\n`;
            });
        });
        
        exportText += '\n' + '='.repeat(50) + '\n';
        exportText += `CELKEM: ${orderItems.length} položek\n`;
        
        // Zkopírovat do schránky
        await navigator.clipboard.writeText(exportText);
        
        // Vyčistit objednávku
        orderItems = [];
        renderOrderTable();
        
        showNotification('Objednávka uložena a zkopírována do schránky! 📋', 'success');
    } catch (error) {
        console.error('Chyba při ukládání objednávky:', error);
        showNotification('Chyba při ukládání objednávky', 'error');
    }
}

// ============================================
// PRODEJ PRODUKTŮ
// ============================================

let salesCart = [];
let salesFilter = 'all';
let salesClientSuggestions = [];
let selectedSalesClientIndex = -1;

function filterSalesClientSuggestions() {
    const input = document.getElementById('salesClientSearch');
    const search = input.value.toLowerCase().trim();
    const suggestionsDiv = document.getElementById('salesClientSuggestions');
    
    if (search.length < 1) {
        suggestionsDiv.style.display = 'none';
        return;
    }
    
    salesClientSuggestions = clients.filter(client => {
        const fullName = `${client.firstName} ${client.lastName}`.toLowerCase();
        const phone = client.phone.toLowerCase();
        return fullName.includes(search) || phone.includes(search);
    });
    
    if (salesClientSuggestions.length === 0) {
        suggestionsDiv.innerHTML = '<div class="autocomplete-no-results">Žádný klient nenalezen</div>';
        suggestionsDiv.style.display = 'block';
        return;
    }
    
    selectedSalesClientIndex = -1;
    suggestionsDiv.innerHTML = salesClientSuggestions.map((client, index) => `
        <div class="autocomplete-item" data-index="${index}" onclick="selectSalesClient(${client.id})">
            <strong>${client.firstName} ${client.lastName}</strong>
            <span style="color: #6b7280; font-size: 0.875rem;">${client.phone}</span>
        </div>
    `).join('');
    suggestionsDiv.style.display = 'block';
}

function showSalesClientSuggestions() {
    const input = document.getElementById('salesClientSearch');
    if (input.value.length > 0) {
        filterSalesClientSuggestions();
    }
}

function handleSalesClientKeyDown(event) {
    const suggestionsDiv = document.getElementById('salesClientSuggestions');
    const items = suggestionsDiv.querySelectorAll('.autocomplete-item');
    
    if (event.key === 'ArrowDown') {
        event.preventDefault();
        selectedSalesClientIndex = Math.min(selectedSalesClientIndex + 1, items.length - 1);
        updateSalesClientSelection(items);
    } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        selectedSalesClientIndex = Math.max(selectedSalesClientIndex - 1, -1);
        updateSalesClientSelection(items);
    } else if (event.key === 'Enter') {
        event.preventDefault();
        if (selectedSalesClientIndex >= 0 && salesClientSuggestions[selectedSalesClientIndex]) {
            selectSalesClient(salesClientSuggestions[selectedSalesClientIndex].id);
        }
    } else if (event.key === 'Escape') {
        suggestionsDiv.style.display = 'none';
    }
}

function updateSalesClientSelection(items) {
    items.forEach((item, index) => {
        if (index === selectedSalesClientIndex) {
            item.classList.add('active');
            item.scrollIntoView({ block: 'nearest' });
        } else {
            item.classList.remove('active');
        }
    });
}

function selectSalesClient(clientId) {
    const client = clients.find(c => c.id === clientId);
    if (!client) return;
    
    document.getElementById('salesClientSearch').value = `${client.firstName} ${client.lastName}`;
    document.getElementById('salesClientId').value = clientId;
    document.getElementById('salesClientSuggestions').style.display = 'none';
    
    // Automaticky vyplnit jméno
    const nameInput = document.getElementById('salesCustomerName');
    nameInput.value = `${client.firstName} ${client.lastName}`;
    nameInput.readOnly = true;
    nameInput.style.background = '#f3f4f6';
}

// Skrýt návrhy při kliknutí mimo
document.addEventListener('click', function(e) {
    if (!e.target.closest('.autocomplete-wrapper')) {
        const suggestionsDiv = document.getElementById('salesClientSuggestions');
        if (suggestionsDiv) {
            suggestionsDiv.style.display = 'none';
        }
    }
    
    // Zavřít modal při kliknutí mimo obsah
        if (e.target.classList.contains('modal')) {
            if (e.target.id === 'clientModal') {
                closeClientModal();
            } else if (e.target.id === 'confirmModal') {
                closeConfirmModal();
            } else if (e.target.id === 'serviceModal') {
                closeServiceModal();
            } else if (e.target.id === 'categoryModal') {
                closeCategoryModal();
            } else if (e.target.id === 'productModal') {
                closeProductModal();
            } else if (e.target.id === 'quickProductModal') {
                closeQuickProductModal();
            } else if (e.target.id === 'materialModal') {
                closeMaterialModal();
            } else if (e.target.id === 'saveVisitModal') {
                closeSaveVisitModal();
            } else if (e.target.id === 'closeVisitModal') {
                closeCloseVisitModal();
            }
        }
    });

function filterSalesProducts() {
    const search = document.getElementById('salesProductSearch').value.toLowerCase();
    const container = document.getElementById('salesProductGrid');
    
    // Stránka prodeje zobrazuje pouze produkty forSale
    let filteredProducts = products.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(search) || 
                             (p.description && p.description.toLowerCase().includes(search)) ||
                             (p.barcode && p.barcode.toLowerCase().includes(search));
        
        const isForSale = p.forSale === true || p.forSale === 1;
        const hasStock = p.stock > 0;
        
        return matchesSearch && isForSale && hasStock;
    });
    
    if (filteredProducts.length === 0) {
        container.innerHTML = '<div style="grid-column: 1 / -1; text-align: center; color: #9ca3af; padding: 3rem;">Žádné produkty</div>';
        return;
    }
    
    container.innerHTML = '';
    
    filteredProducts.forEach(p => {
        const pieces = calculatePieces(p.stock, p.unit, p.packageSize);
        const category = productCategories.find(c => c.id === p.categoryId);
        const isOutOfStock = pieces <= 0;
        const isLowStock = pieces > 0 && pieces <= 3;
        
        let stockBadge = '';
        if (isOutOfStock) {
            stockBadge = '<span style="background: #fee2e2; color: #dc2626; padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.75rem; font-weight: 600;">Vyprodáno</span>';
        } else if (isLowStock) {
            stockBadge = '<span style="background: #fef3c7; color: #d97706; padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.75rem; font-weight: 600;">Málo skladem</span>';
        }
        
        let badges = '';
        if (p.forSale && p.forWork) {
            badges = '<span style="background: #dbeafe; color: #1d4ed8; padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.625rem; margin-right: 0.25rem;">Prodej</span><span style="background: #f3e8ff; color: #7c3aed; padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.625rem;">Práce</span>';
        } else if (p.forSale) {
            badges = '<span style="background: #dbeafe; color: #1d4ed8; padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.625rem;">Prodej</span>';
        } else if (p.forWork) {
            badges = '<span style="background: #f3e8ff; color: #7c3aed; padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.625rem;">Práce</span>';
        }
        
        // Určit, zda je produkt dostupný pro akci podle aktivního filtru
        const isAvailable = (salesFilter === 'forSale' && p.forSale && !isOutOfStock) || 
                           (salesFilter === 'forWork' && p.forWork) ||
                           (salesFilter === 'all' && !isOutOfStock);
        
        const card = document.createElement('div');
        card.className = 'product-sale-card';
        card.draggable = !isOutOfStock && p.forSale;
        card.style.cssText = `padding: 1rem; background: white; border: 2px solid #e5e7eb; border-radius: 0.75rem; cursor: ${!isOutOfStock && p.forSale ? 'pointer' : 'default'}; opacity: ${isAvailable ? '1' : '0.5'}; transition: all 0.2s;`;
        
        card.innerHTML = `
            <div style="display: flex; align-items: start; gap: 0.75rem; margin-bottom: 0.75rem;">
                <div style="width: 48px; height: 48px; background: ${category?.color || '#6b7280'}; border-radius: 0.5rem; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.25rem; flex-shrink: 0;">
                    <i class="fas ${category?.icon || 'fa-box'}"></i>
                </div>
                <div style="flex: 1; min-width: 0;">
                    <h4 style="margin: 0 0 0.25rem 0; font-size: 0.9375rem; font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${p.name}</h4>
                    <div style="margin-bottom: 0.5rem;">${badges}</div>
                </div>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                <span style="font-size: 0.875rem; color: #6b7280;">Skladem:</span>
                <strong style="font-size: 0.9375rem;">${pieces} ks</strong>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 0.75rem; border-top: 1px solid #e5e7eb;">
                <span style="font-size: 1.125rem; font-weight: 700; color: var(--primary-color);">${p.priceRetail || 0} Kč</span>
                ${stockBadge}
            </div>
        `;
        
        if (!isOutOfStock) {
            card.addEventListener('click', () => addToSalesCart(p.id, 'sale'));
            
            // Drag and drop
            card.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('productId', p.id);
                e.dataTransfer.setData('type', 'saleProduct');
                card.classList.add('dragging');
            });
            
            card.addEventListener('dragend', () => {
                card.classList.remove('dragging');
            });
        }
        
        container.appendChild(card);
    });
}

function addToSalesCart(productId, purpose = 'sale') {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Pro prodej musí být forSale a mít sklad
    if (purpose === 'sale' && (!product.forSale || calculatePieces(product.stock, product.unit, product.packageSize) <= 0)) {
        alert('Produkt není skladem nebo není určen k prodeji!');
        return;
    }
    
    // Pro práci musí být forWork
    if (purpose === 'work' && !product.forWork) {
        alert('Produkt není určen pro práci!');
        return;
    }
    
    const pieces = calculatePieces(product.stock, product.unit, product.packageSize);
    if (purpose === 'sale' && pieces <= 0) {
        alert('Produkt není skladem!');
        return;
    }
    
    const existing = salesCart.find(item => item.productId === productId && item.purpose === purpose);
    if (existing) {
        if (purpose === 'work' || existing.quantity < pieces) {
            existing.quantity++;
        } else {
            alert('Nelze přidat více kusů, než je skladem!');
            return;
        }
    } else {
        salesCart.push({
            productId: productId,
            name: product.name,
            quantity: 1,
            price: purpose === 'sale' ? (product.priceRetail || 0) : 0,
            packageSize: product.packageSize,
            unit: product.unit,
            purpose: purpose
        });
    }
    
    updateSalesCart();
}

function updateSalesCart() {
    const container = document.getElementById('salesCart');
    const totalElement = document.getElementById('salesTotal');
    
    if (salesCart.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-shopping-cart"></i>
                <p>Košík je prázdný</p>
            </div>
        `;
        totalElement.textContent = '0 Kč';
        
        // Reset drop initialized
        delete container.dataset.dropInitialized;
        
        // Pokračovat dál, aby se přidal listener na kontejner
    } else {
        container.innerHTML = '';
    }
    
    if (salesCart.length > 0) {
    
    let total = 0;
    container.innerHTML = salesCart.map((item, index) => {
        const subtotal = item.quantity * item.price;
        total += subtotal;
        
        const product = products.find(p => p.id === item.productId);
        const maxPieces = calculatePieces(product.stock, product.unit, product.packageSize);
        
        const purposeBadge = item.purpose === 'work' 
            ? '<span style="background: #f3e8ff; color: #7c3aed; padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.625rem; font-weight: 600; margin-left: 0.5rem;"><i class="fas fa-tools"></i> Práce</span>'
            : '<span style="background: #dbeafe; color: #1d4ed8; padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.625rem; font-weight: 600; margin-left: 0.5rem;"><i class="fas fa-shopping-bag"></i> Prodej</span>';
        
        return `
            <div style="padding: 0.75rem; background: var(--bg-light); border-radius: 0.5rem; margin-bottom: 0.75rem;">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.5rem;">
                    <div style="flex: 1;">
                        <strong>${item.name}</strong>
                        ${purposeBadge}
                    </div>
                    <button onclick="removeFromSalesCart(${index})" class="btn-icon" style="width: 24px; height: 24px; color: #ef4444;">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div style="display: flex; align-items: center; justify-content: space-between;">
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <button onclick="changeSalesQuantity(${index}, -1)" class="btn-icon" style="width: 32px; height: 32px;">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span style="min-width: 40px; text-align: center; font-weight: 600; font-size: 1.125rem;">${item.quantity}</span>
                        <button onclick="changeSalesQuantity(${index}, 1)" class="btn-icon" style="width: 32px; height: 32px;" ${item.purpose === 'sale' && item.quantity >= maxPieces ? 'disabled' : ''}>
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                    <div style="text-align: right;">
                        ${item.purpose === 'sale' ? `
                            <div style="font-size: 0.75rem; color: #6b7280;">${item.quantity} × ${item.price} Kč</div>
                            <div style="font-weight: 700; color: var(--primary-color);">${subtotal} Kč</div>
                        ` : `
                            <div style="font-size: 0.75rem; color: #8b5cf6; font-weight: 600;">Pro práci</div>
                        `}
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    totalElement.textContent = `${total.toLocaleString('cs-CZ')} Kč`;
    }
    
    // Drop zone pro celý kontejner košíku
    if (!container.dataset.dropInitialized) {
        container.dataset.dropInitialized = 'true';
        
        container.addEventListener('dragover', (e) => {
            e.preventDefault();
            const type = e.dataTransfer.getData('type');
            if (type === 'saleProduct') {
                container.style.background = '#f0fdf4';
            }
        });
        
        container.addEventListener('dragleave', (e) => {
            if (e.target === container) {
                container.style.background = '';
            }
        });
        
        container.addEventListener('drop', (e) => {
            e.preventDefault();
            container.style.background = '';
            
            const type = e.dataTransfer.getData('type');
            if (type === 'saleProduct') {
                const productId = parseInt(e.dataTransfer.getData('productId'));
                addToSalesCart(productId);
            }
        });
    }
}

function changeSalesQuantity(index, delta) {
    const item = salesCart[index];
    const product = products.find(p => p.id === item.productId);
    const maxPieces = calculatePieces(product.stock, product.unit, product.packageSize);
    
    const newQuantity = item.quantity + delta;
    
    if (newQuantity <= 0) {
        removeFromSalesCart(index);
        return;
    }
    
    if (newQuantity > maxPieces) {
        alert('Nelze přidat více kusů, než je skladem!');
        return;
    }
    
    item.quantity = newQuantity;
    updateSalesCart();
}

function removeFromSalesCart(index) {
    salesCart.splice(index, 1);
    updateSalesCart();
}

function completeSale() {
    if (salesCart.length === 0) {
        document.getElementById('confirmModalTitle').textContent = 'Prázdný košík';
        document.getElementById('confirmModalMessage').textContent = 'Košík je prázdný! Přidejte prosím produkty do košíku.';
        document.getElementById('confirmModalBtn').textContent = 'OK';
        document.getElementById('confirmModalBtn').className = 'btn btn-primary';
        document.getElementById('confirmModalBtn').onclick = closeConfirmModal;
        document.getElementById('confirmModal').classList.add('show');
        return;
    }
    
    const clientIdInput = document.getElementById('salesClientId');
    const selectedClientId = clientIdInput.value ? parseInt(clientIdInput.value) : null;
    const customerName = document.getElementById('salesCustomerName').value.trim() || 'Anonym';
    const total = salesCart.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    
    // Uložit data pro pozdější použití
    window.pendingSaleData = { selectedClientId, customerName, total };
    
    // Zobrazit potvrzovací modal
    document.getElementById('confirmModalTitle').textContent = 'Dokončit prodej';
    document.getElementById('confirmModalMessage').innerHTML = `<p><strong>Zákazník:</strong> ${customerName}</p><p><strong>Celková cena:</strong> ${total} Kč</p><p><strong>Počet položek:</strong> ${salesCart.length}</p><p style="margin-top: 1rem;">Produkty budou odepsány ze skladu.</p>`;
    document.getElementById('confirmModalBtn').textContent = 'Dokončit prodej';
    document.getElementById('confirmModalBtn').className = 'btn btn-success';
    document.getElementById('confirmModalBtn').onclick = confirmCompleteSale;
    document.getElementById('confirmModal').classList.add('show');
}

async function confirmCompleteSale() {
    closeConfirmModal();
    
    const { selectedClientId, customerName, total } = window.pendingSaleData;
    const today = new Date().toISOString().split('T')[0];
    
    try {
        // Uložit nákup přes API
        const purchaseData = {
            clientId: selectedClientId,
            date: today,
            customerName: customerName,
            total: total,
            items: salesCart.map(item => ({
                productId: item.productId,
                name: item.name,
                quantity: item.quantity,
                price: item.price,
                purpose: item.purpose || 'sale'
            }))
        };
        
        await apiCall('purchases.php', 'POST', purchaseData);
        
        // Odepsat produkty ze skladu a aktualizovat je v API
        for (const item of salesCart) {
            const product = products.find(p => p.id === item.productId);
            if (product) {
                const totalAmount = item.quantity * item.packageSize;
                product.stock -= totalAmount;
                
                if (!product.movements) {
                    product.movements = [];
                }
                
                // Rozlišit typ pohybu podle účelu
                const movementType = item.purpose === 'work' ? 'usage' : 'sale';
                const movementNote = item.purpose === 'work' 
                    ? `Odebrání pro práci - ${customerName} (${item.quantity} ks)`
                    : `Prodej - ${customerName} (${item.quantity} ks za ${item.quantity * item.price} Kč)`;
                
                product.movements.unshift({
                    date: today,
                    type: movementType,
                    quantity: -totalAmount,
                    unit: product.unit,
                    note: movementNote
                });
                
                // Aktualizovat produkt v API
                await apiCall('products.php', 'PUT', product);
            }
        }
        
        // Aktualizovat lokální data klienta
        if (selectedClientId) {
            const client = clients.find(c => c.id === selectedClientId);
            if (client) {
                if (!client.purchases) {
                    client.purchases = [];
                }
                
                const purchase = {
                    id: client.purchases.length + 1,
                    date: today,
                    customerName: customerName,
                    total: total,
                    createdAt: new Date().toISOString(),
                    items: salesCart.map(item => ({
                        productId: item.productId,
                        name: item.name,
                        quantity: item.quantity,
                        price: item.price
                    }))
                };
                
                client.purchases.unshift(purchase);
            }
        }
        
        showNotification('Prodej dokončen', 'success');
    } catch (error) {
        console.error('Chyba při dokončení prodeje:', error);
        showNotification('Chyba při ukládání prodeje', 'error');
        return;
    }
    
    // Zobrazit modal s možností tisku účtenky
    const shouldPrint = selectedClientId !== null;
    
    // Vyčistit košík
    salesCart = [];
    document.getElementById('salesClientSearch').value = '';
    document.getElementById('salesClientId').value = '';
    document.getElementById('salesCustomerName').value = '';
    document.getElementById('salesCustomerName').readOnly = false;
    document.getElementById('salesCustomerName').style.background = 'white';
    updateSalesCart();
    filterSalesProducts();
    
    // Aktualizovat produkty a klienty
    renderProductCategories();
    renderProducts();
    renderClients();
    
    saveToLocalStorage();
    
    // Nabídnout tisk účtenky, pokud byl vybrán klient
    if (shouldPrint) {
        document.getElementById('confirmModalTitle').textContent = 'Prodej dokončen';
        document.getElementById('confirmModalMessage').innerHTML = `<p style="color: #059669; font-weight: 600; margin-bottom: 1rem;"><i class="fas fa-check-circle"></i> Prodej byl úspěšně dokončen!</p><p>Přejete si vytisknout účtenku?</p>`;
        document.getElementById('confirmModalBtn').textContent = 'Vytisknout účtenku';
        document.getElementById('confirmModalBtn').className = 'btn btn-primary';
        document.getElementById('confirmModalBtn').onclick = () => {
            closeConfirmModal();
            printReceipt(selectedClientId, today);
        };
        
        // Přidat tlačítko "Ne, děkuji"
        const modalFooter = document.querySelector('#confirmModal .modal-footer');
        const existingNoBtn = modalFooter.querySelector('.btn-secondary');
        if (!existingNoBtn) {
            const noBtn = document.createElement('button');
            noBtn.className = 'btn btn-secondary';
            noBtn.textContent = 'Ne, děkuji';
            noBtn.onclick = closeConfirmModal;
            modalFooter.insertBefore(noBtn, modalFooter.firstChild);
        }
        
        document.getElementById('confirmModal').classList.add('show');
    }
}

// ===== SYSTÉM VÝDEJE MATERIÁLU =====

let issueCart = [];

// Filtrování produktů pro výdej (forWork)
function filterIssueProducts() {
    const searchTerm = document.getElementById('issueSearchInput')?.value.toLowerCase() || '';
    const grid = document.getElementById('issueProductsGrid');
    
    if (!grid) return;
    
    const filtered = products.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchTerm) ||
                            (p.code && p.code.toLowerCase().includes(searchTerm));
        return matchesSearch;
    });
    
    grid.innerHTML = '';
    
    if (filtered.length === 0) {
        grid.innerHTML = '<div class="col-12"><p class="text-muted text-center">Žádné produkty</p></div>';
        return;
    }
    
    filtered.forEach(p => {
        const category = productCategories.find(c => c.id === p.categoryId);
        const isOutOfStock = p.stock <= 0;
        const isLowStock = p.stock > 0 && p.stock < p.minStock;
        
        let stockBadge = '';
        if (isOutOfStock) {
            stockBadge = '<span style="background: #fee2e2; color: #dc2626; padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.75rem; font-weight: 600;">Vyprodáno</span>';
        } else if (isLowStock) {
            stockBadge = '<span style="background: #fef3c7; color: #d97706; padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.75rem; font-weight: 600;">Málo skladem</span>';
        }
        
        let badges = '';
        if (p.forSale && p.forWork) {
            badges = '<span style="background: #dbeafe; color: #1d4ed8; padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.625rem; margin-right: 0.25rem;">Prodej</span><span style="background: #f3e8ff; color: #7c3aed; padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.625rem;">Práce</span>';
        } else if (p.forSale) {
            badges = '<span style="background: #dbeafe; color: #1d4ed8; padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.625rem;">Prodej</span>';
        } else if (p.forWork) {
            badges = '<span style="background: #f3e8ff; color: #7c3aed; padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.625rem;">Práce</span>';
        }
        
        const card = document.createElement('div');
        card.className = 'product-issue-card';
        card.style.cssText = `padding: 1rem; background: white; border: 2px solid #e5e7eb; border-radius: 0.75rem; cursor: ${!isOutOfStock ? 'pointer' : 'default'}; opacity: ${isOutOfStock ? '0.5' : '1'}; transition: all 0.2s;`;
        
        card.innerHTML = `
            <div style="display: flex; align-items: start; gap: 0.75rem; margin-bottom: 0.75rem;">
                <div style="width: 48px; height: 48px; background: ${category?.color || '#6b7280'}; border-radius: 0.5rem; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.25rem; flex-shrink: 0;">
                    <i class="fas ${category?.icon || 'fa-box'}"></i>
                </div>
                <div style="flex: 1; min-width: 0;">
                    <h4 style="margin: 0 0 0.25rem 0; font-size: 0.9375rem; font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${p.name}</h4>
                    <div style="margin-bottom: 0.5rem;">${badges}</div>
                </div>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 0.75rem; border-top: 1px solid #e5e7eb;">
                <span style="font-size: 0.875rem; color: #6b7280;">Skladem: <strong>${p.stock} ${p.unit || 'ks'}</strong></span>
                ${stockBadge}
            </div>
        `;
        
        card.draggable = !isOutOfStock;
        
        if (!isOutOfStock) {
            card.addEventListener('click', () => {
                addToIssueCart(p.id);
            });
            
            // Drag and drop
            card.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('productId', p.id);
                e.dataTransfer.setData('type', 'issueProduct');
                card.classList.add('dragging');
            });
            
            card.addEventListener('dragend', () => {
                card.classList.remove('dragging');
            });
            
            card.addEventListener('mouseenter', () => {
                card.style.borderColor = 'var(--primary-color)';
                card.style.transform = 'translateY(-2px)';
                card.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
            });
            card.addEventListener('mouseleave', () => {
                card.style.borderColor = '#e5e7eb';
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = 'none';
            });
        }
        
        grid.appendChild(card);
    });
}

// Přidat produkt do košíku výdeje
function addToIssueCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product || product.stock <= 0) return;
    
    const existingItem = issueCart.find(item => item.productId === productId);
    
    if (existingItem) {
        if (existingItem.quantity < product.stock) {
            existingItem.quantity++;
        } else {
            showNotification('Nedostatek na skladě', 'warning');
            return;
        }
    } else {
        issueCart.push({
            productId: productId,
            productName: product.name,
            unit: product.unit || 'ks',
            quantity: 1,
            maxStock: product.stock
        });
    }
    
    updateIssueCart();
    showNotification(`${product.name} přidán do výdeje`, 'success');
}

// Odebrat produkt z košíku výdeje
function removeFromIssueCart(index) {
    issueCart.splice(index, 1);
    updateIssueCart();
}

// Aktualizace zobrazení košíku výdeje
function updateIssueCart() {
    const cartDiv = document.getElementById('issueCartItems');
    const emptyDiv = document.getElementById('issueCartEmpty');
    const completeBtn = document.getElementById('completeIssueBtn');
    
    if (!cartDiv) return;
    
    if (issueCart.length === 0) {
        cartDiv.style.display = 'none';
        if (emptyDiv) emptyDiv.style.display = 'block';
        
        // Reset drop initialized
        delete emptyDiv.dataset.dropInitialized;
        
        // Pokračovat dál, aby se přidal listener na prázdný kontejner
    } else {
        cartDiv.style.display = 'block';
        if (emptyDiv) emptyDiv.style.display = 'none';
    }
    
    if (issueCart.length > 0) {
    
    cartDiv.innerHTML = issueCart.map((item, index) => {
        const product = products.find(p => p.id === item.productId);
        const currentUnit = item.customUnit || item.unit;
        
        return `
            <div style="padding: 0.75rem; background: var(--bg-light); border-radius: 0.5rem; margin-bottom: 0.75rem;">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.5rem;">
                    <div style="flex: 1;">
                        <strong>${item.productName}</strong>
                        <span style="background: #f3e8ff; color: #7c3aed; padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.625rem; font-weight: 600; margin-left: 0.5rem;">
                            <i class="fas fa-hand-sparkles"></i> Výdej
                        </span>
                        <div style="font-size: 0.7rem; color: #6b7280; margin-top: 0.25rem;">
                            Sklad: ${item.maxStock} ${item.unit}
                        </div>
                    </div>
                    <button onclick="removeFromIssueCart(${index})" class="btn-icon" style="width: 24px; height: 24px; color: #ef4444;">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div style="display: flex; align-items: center; justify-content: space-between; gap: 0.5rem;">
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <button onclick="changeIssueQuantity(${index}, -1)" class="btn-icon" style="width: 32px; height: 32px;">
                            <i class="fas fa-minus"></i>
                        </button>
                        <input type="number" value="${item.quantity}" 
                               onchange="setIssueQuantity(${index}, this.value)"
                               onclick="this.select()"
                               min="0.01" 
                               step="any"
                               style="width: 60px; text-align: center; font-weight: 600; font-size: 1rem; padding: 0.25rem; border: 1px solid #d1d5db; border-radius: 0.25rem;">
                        <select onchange="changeIssueUnit(${index}, this.value)" 
                                style="padding: 0.25rem 0.5rem; border: 1px solid #d1d5db; border-radius: 0.25rem; font-size: 0.875rem; background: white; cursor: pointer;">
                            <option value="ks" ${currentUnit === 'ks' ? 'selected' : ''}>ks</option>
                            <option value="g" ${currentUnit === 'g' ? 'selected' : ''}>g</option>
                            <option value="ml" ${currentUnit === 'ml' ? 'selected' : ''}>ml</option>
                        </select>
                        <button onclick="changeIssueQuantity(${index}, 1)" class="btn-icon" style="width: 32px; height: 32px;">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    }
    
    // Drop zone pro košík výdeje (prázdný i plný)
    const dropZone = issueCart.length === 0 ? emptyDiv : cartDiv.parentElement;
    
    if (dropZone && !dropZone.dataset.dropInitialized) {
        dropZone.dataset.dropInitialized = 'true';
        
        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.style.background = '#faf5ff';
        });
        
        dropZone.addEventListener('dragleave', (e) => {
            if (e.target === dropZone) {
                dropZone.style.background = '';
            }
        });
        
        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.style.background = '';
            
            const productId = parseInt(e.dataTransfer.getData('productId'));
            if (productId) {
                addToIssueCart(productId);
            }
        });
    }
}

// Změna množství v košíku výdeje
function changeIssueQuantity(index, delta) {
    const item = issueCart[index];
    const currentUnit = item.customUnit || item.unit;
    
    // Pro ks používáme celá čísla, pro g a ml desetinná
    let increment = delta;
    if (currentUnit === 'g' || currentUnit === 'ml') {
        increment = delta * 10; // Zvýšit/snížit o 10g nebo 10ml
    }
    
    let newQty = parseFloat((item.quantity + increment).toFixed(2));
    
    if (newQty <= 0) {
        removeFromIssueCart(index);
        return;
    }
    
    item.quantity = newQty;
    updateIssueCart();
}

// Nastavení konkrétního množství
function setIssueQuantity(index, value) {
    const item = issueCart[index];
    let qty = parseFloat(value);
    
    if (isNaN(qty) || qty <= 0) {
        showNotification('Neplatné množství', 'warning');
        updateIssueCart();
        return;
    }
    
    if (qty > item.maxStock) {
        showNotification('Nedostatek na skladě', 'warning');
        item.quantity = item.maxStock;
    } else {
        item.quantity = qty;
    }
    
    updateIssueCart();
}

// Změna jednotky v košíku výdeje
function changeIssueUnit(index, newUnit) {
    const item = issueCart[index];
    item.customUnit = newUnit;
    updateIssueCart();
}

// Dokončení výdeje materiálu
function completeMaterialIssue() {
    if (issueCart.length === 0) {
        const modal = document.getElementById('confirmModal');
        if (!modal) {
            showNotification('Výdejka je prázdná! Přidejte prosím materiál do výdejky.', 'warning');
            return;
        }
        document.getElementById('confirmModalTitle').textContent = 'Prázdná výdejka';
        document.getElementById('confirmModalMessage').textContent = 'Výdejka je prázdná! Přidejte prosím materiál do výdejky.';
        document.getElementById('confirmModalBtn').textContent = 'OK';
        document.getElementById('confirmModalBtn').className = 'btn btn-primary';
        document.getElementById('confirmModalBtn').onclick = closeConfirmModal;
        modal.classList.add('show');
        return;
    }
    
    const note = document.getElementById('issueNote')?.value || '';
    const totalItems = issueCart.length;
    
    // Zobrazit potvrzovací modal
    const modal = document.getElementById('confirmModal');
    if (!modal) {
        console.error('Modal confirmModal nenalezen!');
        showNotification('Chyba: Modal nenalezen', 'error');
        return;
    }
    
    const itemsList = issueCart.map(item => 
        `<li>${item.productName}: ${item.quantity} ${item.customUnit || item.unit}</li>`
    ).join('');
    
    document.getElementById('confirmModalTitle').textContent = 'Dokončit výdej';
    document.getElementById('confirmModalMessage').innerHTML = `
        <p><strong>Počet položek:</strong> ${totalItems}</p>
        <ul style="margin: 1rem 0; padding-left: 1.5rem;">${itemsList}</ul>
        ${note ? `<p><strong>Poznámka:</strong> ${note}</p>` : ''}
        <p style="margin-top: 1rem;">Materiál bude odepsán ze skladu.</p>
    `;
    document.getElementById('confirmModalBtn').textContent = 'Dokončit výdej';
    document.getElementById('confirmModalBtn').className = 'btn btn-success';
    document.getElementById('confirmModalBtn').onclick = confirmCompleteMaterialIssue;
    modal.classList.add('show');
}

async function confirmCompleteMaterialIssue() {
    closeConfirmModal();
    
    console.log('🚀 Zahajuji dokončení výdeje, položek v košíku:', issueCart.length);
    
    const note = document.getElementById('issueNote')?.value || '';
    const currentDate = new Date().toISOString().split('T')[0];
    
    try {
        // Zpracování jednotlivých položek
        for (const item of issueCart) {
            const product = products.find(p => p.id === item.productId);
            if (!product) continue;
            
            // Zvolená jednotka pro výdej
            const usedUnit = item.customUnit || item.unit;
            let stockDecrease = item.quantity;
            
            // Přepočet jednotek:
            // Sklad je vždy v základní jednotce (g, ml, ks)
            // Pokud uživatel odepisuje v jiné jednotce, musíme přepočítat
            
            if (usedUnit === 'ks' && product.unit !== 'ks') {
                // Uživatel odepsal v ks, ale produkt je v g/ml
                // Například: odepsal 2 ks, produkt má packageSize 250ml
                // Odečíst: 2 * 250 = 500 ml
                stockDecrease = item.quantity * (product.packageSize || 1);
            } else if (usedUnit !== 'ks' && product.unit !== 'ks') {
                // Oba jsou v g/ml - odečíst přímo
                stockDecrease = item.quantity;
            } else if (usedUnit !== 'ks' && product.unit === 'ks') {
                // Uživatel odepsal v g/ml, ale produkt je skladován v ks
                // Toto by nemělo nastat (produkty jsou v g/ml, ne v ks pro evidenci)
                // Ale pokud ano: odepsal 150ml, packageSize je 250ml
                // Odečíst: 150 / 250 = 0.6 ks
                stockDecrease = item.quantity / (product.packageSize || 1);
            }
            
            // Snížení stavu skladu (v základní jednotce produktu)
            console.log(`📦 Výdej: ${product.name}, Původní sklad: ${product.stock}, Odečíst: ${stockDecrease}, Jednotka: ${usedUnit}`);
            product.stock -= stockDecrease;
            console.log(`📦 Nový sklad: ${product.stock}`);
            
            // Vytvoření záznamu pohybu - použít zvolenou jednotku
            const movement = {
                product_id: product.id,
                date: currentDate,
                type: 'usage',
                quantity: -item.quantity,
                unit: usedUnit,
                note: note || 'Výdej materiálu'
            };
            
            // Uložení pohybu
            if (!product.movements) product.movements = [];
            product.movements.push(movement);
            
            // Aktualizace produktu přes API (včetně movements pole)
            const response = await fetch(`api/products.php`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: product.id,
                    name: product.name,
                    barcode: product.barcode || product.code || null,
                    description: product.description || '',
                    categoryId: product.categoryId || null,
                    stock: product.stock,
                    unit: product.unit,
                    packageSize: product.packageSize || 1,
                    minStock: product.minStock || 0,
                    pricePurchase: product.pricePurchase || 0,
                    priceRetail: product.priceRetail || 0,
                    forSale: product.forSale ? 1 : 0,
                    forWork: product.forWork ? 1 : 0,
                    movements: product.movements // Přidat movements pro uložení pohybu
                })
            });
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error(`❌ Chyba při aktualizaci produktu ${product.name}:`, errorText);
                throw new Error(`Chyba při aktualizaci produktu ${product.name}`);
            }
            
            console.log(`✅ Produkt ${product.name} aktualizován, nový sklad: ${product.stock}, pohyb zaznamenán`);
        }
        
        // Uložení historie výdeje do localStorage
        const issueHistory = JSON.parse(localStorage.getItem('issueHistory') || '[]');
        issueHistory.unshift({
            date: currentDate,
            items: issueCart.map(item => ({
                productName: item.productName,
                quantity: item.quantity,
                unit: item.customUnit || item.unit
            })),
            note: note
        });
        
        // Omezit historii na posledních 100 výdejů
        if (issueHistory.length > 100) {
            issueHistory.length = 100;
        }
        
        localStorage.setItem('issueHistory', JSON.stringify(issueHistory));
        
        // Vyčištění košíku a UI
        issueCart = [];
        updateIssueCart();
        filterIssueProducts();
        
        if (document.getElementById('issueNote')) {
            document.getElementById('issueNote').value = '';
        }
        
        // Načíst aktualizované produkty z API
        try {
            products = await apiCall('products.php');
        } catch (error) {
            console.error('Chyba při načítání produktů:', error);
        }
        
        // Aktualizace dashboardu pokud je zobrazen
        const dashboardPage = document.getElementById('page-dashboard');
        if (dashboardPage && dashboardPage.classList.contains('active')) {
            renderDashboard();
        }
        
        // Aktualizovat zobrazení produktů
        renderProductCategories();
        renderProducts();
        updateLowStockBadge();
        
        // Zobrazit úspěšný modal
        const modal = document.getElementById('confirmModal');
        if (!modal) {
            showNotification('Výdej materiálu byl úspěšně dokončen', 'success');
            return;
        }
        
        document.getElementById('confirmModalTitle').textContent = 'Výdej dokončen';
        document.getElementById('confirmModalMessage').innerHTML = `
            <p style="color: #059669; font-weight: 600; margin-bottom: 1rem;">
                <i class="fas fa-check-circle"></i> Výdej materiálu byl úspěšně dokončen!
            </p>
            <p>Materiál byl odepsán ze skladu.</p>
        `;
        document.getElementById('confirmModalBtn').textContent = 'OK';
        document.getElementById('confirmModalBtn').className = 'btn btn-success';
        document.getElementById('confirmModalBtn').onclick = closeConfirmModal;
        
        // Odstranit tlačítko "Ne, děkuji" pokud existuje
        const modalFooter = modal.querySelector('.modal-footer');
        const existingNoBtn = modalFooter?.querySelector('.btn-secondary');
        if (existingNoBtn) {
            existingNoBtn.remove();
        }
        
        modal.classList.add('show');
        
    } catch (error) {
        console.error('Chyba při dokončení výdeje:', error);
        showNotification('Chyba při dokončení výdeje: ' + error.message, 'error');
    }
}

// Načtení a zobrazení historie výdejů
function loadIssueHistory() {
    const issueHistory = JSON.parse(localStorage.getItem('issueHistory') || '[]');
    filteredIssues = [...issueHistory];
    populateIssueMonthSelect();
    renderIssueHistory();
    updateIssueStats();
}

function populateIssueMonthSelect() {
    const select = document.getElementById('issueMonthSelect');
    if (!select) return;
    
    const months = ['Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen', 
                    'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec'];
    
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    
    select.innerHTML = '<option value="">Vybrat měsíc...</option>';
    
    for (let i = 0; i < 12; i++) {
        const monthIndex = (currentMonth - i + 12) % 12;
        const year = currentYear - Math.floor((currentMonth - i) / 12) - (currentMonth - i < 0 ? 1 : 0);
        const value = `${year}-${String(monthIndex + 1).padStart(2, '0')}`;
        select.innerHTML += `<option value="${value}">${months[monthIndex]} ${year}</option>`;
    }
}

function filterIssueBySpecificMonth() {
    const select = document.getElementById('issueMonthSelect');
    if (!select || !select.value) return;
    
    const [year, month] = select.value.split('-').map(Number);
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    
    const issueHistory = JSON.parse(localStorage.getItem('issueHistory') || '[]');
    filteredIssues = issueHistory.filter(issue => {
        const date = new Date(issue.date);
        return date >= startDate && date <= endDate;
    });
    
    renderIssueHistory();
    updateIssueStats();
}

function updateIssueStats() {
    const countEl = document.getElementById('issueStatsCount');
    const itemsEl = document.getElementById('issueStatsItems');
    
    if (countEl) countEl.textContent = filteredIssues.length;
    
    if (itemsEl) {
        const totalItems = filteredIssues.reduce((sum, issue) => 
            sum + (issue.items ? issue.items.length : 0), 0);
        itemsEl.textContent = totalItems;
    }
}

function filterIssueByMonth(period) {
    const issueHistory = JSON.parse(localStorage.getItem('issueHistory') || '[]');
    const now = new Date();
    let startDate;
    
    switch(period) {
        case 'current':
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
            break;
        case 'last':
            startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
            const endDate = new Date(now.getFullYear(), now.getMonth(), 0);
            filteredIssues = issueHistory.filter(issue => {
                const date = new Date(issue.date);
                return date >= startDate && date <= endDate;
            });
            renderIssueHistory();
            updateIssueStats();
            return;
        case 'last3':
            startDate = new Date(now.getFullYear(), now.getMonth() - 3, 1);
            break;
        case 'last6':
            startDate = new Date(now.getFullYear(), now.getMonth() - 6, 1);
            break;
        case 'year':
            startDate = new Date(now.getFullYear(), 0, 1);
            break;
        case 'all':
            filteredIssues = [...issueHistory];
            renderIssueHistory();
            updateIssueStats();
            return;
    }
    
    filteredIssues = issueHistory.filter(issue => {
        const date = new Date(issue.date);
        return date >= startDate;
    });
    
    renderIssueHistory();
    updateIssueStats();
}

function exportIssueHistoryToCSV() {
    if (filteredIssues.length === 0) {
        alert('Žádné výdeje k exportu');
        return;
    }
    
    let csv = 'Datum;Počet položek;Poznámka;Produkt;Množství\n';
    
    filteredIssues.forEach(issue => {
        const date = new Date(issue.date).toLocaleDateString('cs-CZ');
        const itemCount = issue.items ? issue.items.length : 0;
        const note = (issue.note || '').replace(/;/g, ',');
        
        if (issue.items && issue.items.length > 0) {
            issue.items.forEach(item => {
                csv += `${date};${itemCount};${note};${item.productName};${item.quantity} ${item.unit}\n`;
            });
        } else {
            csv += `${date};${itemCount};${note};;\n`;
        }
    });
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `vydeje_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function renderIssueHistory() {
    const container = document.getElementById('issueHistoryList');
    if (!container) return;
    
    if (filteredIssues.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 3rem; color: var(--text-light);">
                <i class="fas fa-inbox" style="font-size: 3rem; margin-bottom: 1rem; display: block; opacity: 0.5;"></i>
                <p>Žádné výdeje pro zvolený filtr</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = filteredIssues.map((issue, index) => {
        const issueId = `issue-${Date.parse(issue.date)}-${index}`;
        const totalItems = issue.items.length;
        const totalQuantity = issue.items.reduce((sum, item) => sum + parseFloat(item.quantity), 0);
        
        return `
            <div class="receipt-item" style="border-bottom: 1px solid var(--border-color); padding: 1rem; cursor: pointer; transition: background 0.2s;" onclick="toggleIssueDetail('${issueId}')">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div style="display: flex; align-items: center; gap: 1rem;">
                        <div style="background: linear-gradient(135deg, #a855f7 0%, #7c3aed 100%); width: 48px; height: 48px; border-radius: 0.5rem; display: flex; align-items: center; justify-content: center; color: white;">
                            <i class="fas fa-hand-sparkles"></i>
                        </div>
                        <div>
                            <div style="font-weight: 600; margin-bottom: 0.25rem;">
                                Výdej materiálu
                            </div>
                            <div style="font-size: 0.875rem; color: var(--text-light);">
                                ${new Date(issue.date).toLocaleDateString('cs-CZ')} • ${totalItems} ${totalItems === 1 ? 'položka' : totalItems < 5 ? 'položky' : 'položek'}
                            </div>
                        </div>
                    </div>
                    <div style="text-align: right;">
                        <div style="font-weight: 600; color: #a855f7;">
                            ${Math.round(totalQuantity)} celkem
                        </div>
                    </div>
                </div>
                
                <div id="${issueId}" style="display: none; margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--border-color);">
                    <table style="width: 100%; font-size: 0.875rem;">
                        <thead>
                            <tr style="border-bottom: 1px solid var(--border-color);">
                                <th style="text-align: left; padding: 0.5rem; color: var(--text-light);">Produkt</th>
                                <th style="text-align: right; padding: 0.5rem; color: var(--text-light);">Množství</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${issue.items.map(item => `
                                <tr>
                                    <td style="padding: 0.5rem;">${item.productName}</td>
                                    <td style="text-align: right; padding: 0.5rem; font-weight: 500;">${item.quantity} ${item.unit}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                    ${issue.note ? `<div style="margin-top: 0.75rem; padding: 0.75rem; background: var(--bg-secondary); border-radius: 0.5rem; font-size: 0.875rem;"><strong>Poznámka:</strong> ${issue.note}</div>` : ''}
                </div>
            </div>
        `;
    }).join('');
}

function toggleIssueDetail(issueId) {
    const detail = document.getElementById(issueId);
    if (detail) {
        detail.style.display = detail.style.display === 'none' ? 'block' : 'none';
    }
}

// ===== KONEC SYSTÉMU VÝDEJE MATERIÁLU =====

// Globální proměnné pro tisk
let currentReceiptClientId = null;
let currentReceiptDate = null;

// Funkce pro tisk účtenky
function printReceipt(clientId, date) {
    const client = clients.find(c => c.id === clientId);
    if (!client) {
        alert('Klient nenalezen!');
        return;
    }
    
    const targetDate = date || new Date().toISOString().split('T')[0];
    
    // Najít návštěvy z daného dne
    const visits = client.visits.filter(v => v.date === targetDate && v.closed);
    
    // Najít nákupy z daného dne
    const purchases = client.purchases ? client.purchases.filter(p => p.date === targetDate) : [];
    
    if (visits.length === 0 && purchases.length === 0) {
        alert('Pro tento den nejsou žádné uzavřené návštěvy ani nákupy!');
        return;
    }
    
    // Uložit pro tisk
    currentReceiptClientId = clientId;
    currentReceiptDate = targetDate;
    
    // Vytvořit obsah účtenky pro náhled v modalu
    let receiptHTML = `
        <div style="text-align: center; margin-bottom: 20px; border-bottom: 2px dashed #000; padding-bottom: 10px;">
            <h1 style="font-size: 24px; margin-bottom: 5px;">${salonSettings.name}</h1>
            ${salonSettings.address ? `<p style="font-size: 11px;">${salonSettings.address}</p>` : ''}
            ${salonSettings.phone ? `<p style="font-size: 11px;">Tel: ${salonSettings.phone}</p>` : ''}
            ${salonSettings.email ? `<p style="font-size: 11px;">Email: ${salonSettings.email}</p>` : ''}
            ${salonSettings.ico ? `<p style="font-size: 11px;">IČO: ${salonSettings.ico}${salonSettings.dic ? ' | DIČ: ' + salonSettings.dic : ''}</p>` : ''}
            <p style="font-size: 12px; margin-top: 8px; font-weight: bold;">${new Date(targetDate).toLocaleDateString('cs-CZ')}</p>
        </div>
        
        <div style="margin: 15px 0; font-size: 13px;">
            <strong>Zákazník:</strong> ${client.firstName} ${client.lastName}<br>
            <strong>Telefon:</strong> ${client.phone}
        </div>
    `;
    
    let grandTotal = 0;
    
    // Přidat návštěvy (služby)
    if (visits.length > 0) {
        receiptHTML += '<div style="margin: 15px 0;"><div style="font-weight: bold; font-size: 14px; margin-bottom: 8px; border-bottom: 1px solid #000; padding-bottom: 3px;">SLUŽBY</div>';
        
        visits.forEach(visit => {
            visit.services.forEach(service => {
                receiptHTML += `<div style="margin: 5px 0; font-size: 12px;">${service.name}</div>`;
                
                if (service.materials && service.materials.length > 0) {
                    receiptHTML += '<div style="margin-left: 15px; font-size: 11px; color: #666;">';
                    service.materials.forEach(mat => {
                        receiptHTML += `• ${mat.name} (${mat.quantity} ${mat.unit})<br>`;
                    });
                    receiptHTML += '</div>';
                }
            });
            
            if (visit.price) {
                receiptHTML += `<div style="display: flex; justify-content: space-between; margin: 5px 0; font-size: 12px;"><span>Celkem za služby</span><span style="font-weight: bold;">${visit.price} Kč</span></div>`;
                grandTotal += visit.price;
            }
            
            if (visit.note) {
                receiptHTML += `<div style="margin-top: 8px; font-size: 11px; font-style: italic;">Poznámka: ${visit.note}</div>`;
            }
        });
        
        receiptHTML += '</div>';
    }
    
    // Přidat nákupy (prodané produkty)
    if (purchases.length > 0) {
        receiptHTML += '<div style="margin: 15px 0;"><div style="font-weight: bold; font-size: 14px; margin-bottom: 8px; border-bottom: 1px solid #000; padding-bottom: 3px;">PRODANÉ PRODUKTY</div>';
        
        purchases.forEach(purchase => {
            purchase.items.forEach(item => {
                const itemTotal = item.quantity * item.price;
                receiptHTML += `
                    <div style="display: flex; justify-content: space-between; margin: 5px 0; font-size: 12px;">
                        <span>${item.name} (${item.quantity}× ${item.price} Kč)</span>
                        <span style="font-weight: bold; white-space: nowrap; margin-left: 10px;">${itemTotal} Kč</span>
                    </div>
                `;
            });
            
            grandTotal += purchase.total;
        });
        
        receiptHTML += '</div>';
    }
    
    // Celková částka
    receiptHTML += `
        <div style="margin-top: 15px; padding-top: 10px; border-top: 2px solid #000; font-size: 16px; font-weight: bold; display: flex; justify-content: space-between;">
            <span>CELKEM K ÚHRADĚ:</span>
            <span>${grandTotal} Kč</span>
        </div>
        
        <div style="text-align: center; margin-top: 20px; padding-top: 10px; border-top: 2px dashed #000; font-size: 11px;">
            <p>${salonSettings.receiptFooter || 'Děkujeme za Vaši návštěvu!'}</p>
            ${salonSettings.web ? `<p>${salonSettings.web}</p>` : ''}
        </div>
    `;
    
    // Zobrazit v modalu
    const modal = document.getElementById('receiptModal');
    if (!modal) {
        console.error('Receipt modal not found. Modals may not be loaded yet.');
        // Počkat chvilku a zkusit znovu
        setTimeout(() => {
            const retryModal = document.getElementById('receiptModal');
            if (retryModal) {
                document.getElementById('receiptContent').innerHTML = receiptHTML;
                retryModal.classList.add('show');
            } else {
                alert('Nelze zobrazit náhled účtenky. Zkuste to prosím znovu.');
            }
        }, 100);
        return;
    }
    
    document.getElementById('receiptContent').innerHTML = receiptHTML;
    modal.classList.add('show');
}

function closeReceiptModal() {
    const modal = document.getElementById('receiptModal');
    if (modal) {
        modal.classList.remove('show');
    }
}

function printReceiptFromModal() {
    const client = clients.find(c => c.id === currentReceiptClientId);
    if (!client) return;
    
    const targetDate = currentReceiptDate;
    const visits = client.visits.filter(v => v.date === targetDate && v.closed);
    const purchases = client.purchases ? client.purchases.filter(p => p.date === targetDate) : [];
    
    let grandTotal = 0;
    
    // Vytvoř tiskovou verzi
    let printHTML = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Účtenka - ${client.firstName} ${client.lastName}</title>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body { 
                    font-family: 'Courier New', monospace; 
                    padding: 20mm; 
                    max-width: 80mm;
                    margin: 0 auto;
                }
                .header { text-align: center; margin-bottom: 20px; border-bottom: 2px dashed #000; padding-bottom: 10px; }
                .header h1 { font-size: 24px; margin-bottom: 5px; }
                .header p { font-size: 12px; }
                .section { margin: 15px 0; }
                .section-title { font-weight: bold; font-size: 14px; margin-bottom: 8px; border-bottom: 1px solid #000; padding-bottom: 3px; }
                .item { display: flex; justify-content: space-between; margin: 5px 0; font-size: 12px; }
                .item-name { flex: 1; }
                .item-price { font-weight: bold; white-space: nowrap; margin-left: 10px; }
                .materials { margin-left: 15px; font-size: 11px; color: #666; }
                .total { margin-top: 15px; padding-top: 10px; border-top: 2px solid #000; font-size: 16px; font-weight: bold; display: flex; justify-content: space-between; }
                .footer { text-align: center; margin-top: 20px; padding-top: 10px; border-top: 2px dashed #000; font-size: 11px; }
                @media print {
                    body { padding: 5mm; }
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>${salonSettings.name}</h1>
                ${salonSettings.address ? `<p>${salonSettings.address}</p>` : ''}
                ${salonSettings.phone ? `<p>Tel: ${salonSettings.phone}</p>` : ''}
                ${salonSettings.email ? `<p>Email: ${salonSettings.email}</p>` : ''}
                ${salonSettings.ico ? `<p>IČO: ${salonSettings.ico}${salonSettings.dic ? ' | DIČ: ' + salonSettings.dic : ''}</p>` : ''}
                <p style="margin-top: 8px; font-weight: bold;">${new Date(targetDate).toLocaleDateString('cs-CZ')}</p>
            </div>
            
            <div class="section">
                <strong>Zákazník:</strong> ${client.firstName} ${client.lastName}<br>
                <strong>Telefon:</strong> ${client.phone}
            </div>
    `;
    
    // Přidat návštěvy
    if (visits.length > 0) {
        printHTML += '<div class="section"><div class="section-title">SLUŽBY</div>';
        visits.forEach(visit => {
            visit.services.forEach(service => {
                printHTML += `<div class="item"><span class="item-name">${service.name}</span></div>`;
                if (service.materials && service.materials.length > 0) {
                    printHTML += '<div class="materials">';
                    service.materials.forEach(mat => {
                        printHTML += `• ${mat.name} (${mat.quantity} ${mat.unit})<br>`;
                    });
                    printHTML += '</div>';
                }
            });
            if (visit.price) {
                printHTML += `<div class="item"><span class="item-name">Celkem za služby</span><span class="item-price">${visit.price} Kč</span></div>`;
                grandTotal += visit.price;
            }
            if (visit.note) {
                printHTML += `<div style="margin-top: 8px; font-size: 11px; font-style: italic;">Poznámka: ${visit.note}</div>`;
            }
        });
        printHTML += '</div>';
    }
    
    // Přidat nákupy
    if (purchases.length > 0) {
        printHTML += '<div class="section"><div class="section-title">PRODANÉ PRODUKTY</div>';
        purchases.forEach(purchase => {
            purchase.items.forEach(item => {
                const itemTotal = item.quantity * item.price;
                printHTML += `<div class="item"><span class="item-name">${item.name} (${item.quantity}× ${item.price} Kč)</span><span class="item-price">${itemTotal} Kč</span></div>`;
            });
            grandTotal += purchase.total;
        });
        printHTML += '</div>';
    }
    
    printHTML += `
        <div class="total">
            <span>CELKEM K ÚHRADĚ:</span>
            <span>${grandTotal} Kč</span>
        </div>
        <div class="footer">
            <p>${salonSettings.receiptFooter || 'Děkujeme za Vaši návštěvu!'}</p>
            ${salonSettings.web ? `<p>${salonSettings.web}</p>` : ''}
        </div>
        </body>
        </html>
    `;
    
    // Otevřít tiskové okno
    const printWindow = window.open('', '_blank', 'width=800,height=600');
    printWindow.document.write(printHTML);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
        printWindow.print();
    }, 250);
}

// Funkce pro nastavení
async function saveSettings(event) {
    event.preventDefault();
    
    salonSettings = {
        name: document.getElementById('salonName').value,
        address: document.getElementById('salonAddress').value,
        phone: document.getElementById('salonPhone').value,
        email: document.getElementById('salonEmail').value,
        web: document.getElementById('salonWeb').value,
        ico: document.getElementById('salonICO').value,
        dic: document.getElementById('salonDIC').value,
        receiptFooter: document.getElementById('receiptFooter').value
    };
    
    try {
        await apiCall('settings.php', 'POST', salonSettings);
        showNotification('Nastavení uloženo', 'success');
    } catch (error) {
        console.error('Chyba při ukládání nastavení:', error);
    }
}

function loadSettings() {
    document.getElementById('salonName').value = salonSettings.name || 'HairBook';
    document.getElementById('salonAddress').value = salonSettings.address || '';
    document.getElementById('salonPhone').value = salonSettings.phone || '';
    document.getElementById('salonEmail').value = salonSettings.email || '';
    document.getElementById('salonWeb').value = salonSettings.web || '';
    document.getElementById('salonICO').value = salonSettings.ico || '';
    document.getElementById('salonDIC').value = salonSettings.dic || '';
    document.getElementById('receiptFooter').value = salonSettings.receiptFooter || 'Děkujeme za Vaši návštěvu!';
}

async function changePassword(event) {
    event.preventDefault();
    
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    
    // Kontrola současného hesla
    if (currentPassword !== salonSettings.password) {
        showNotification('Nesprávné současné heslo', 'error');
        return;
    }
    
    if (newPassword.length < 4) {
        showNotification('Nové heslo musí mít alespoň 4 znaky', 'error');
        return;
    }
    
    try {
        salonSettings.password = newPassword;
        await apiCall('settings.php', 'PUT', salonSettings);
        
        // Vyčistit formulář
        document.getElementById('currentPassword').value = '';
        document.getElementById('newPassword').value = '';
        
        showNotification('Heslo bylo úspěšně změněno', 'success');
    } catch (error) {
        console.error('Chyba při změně hesla:', error);
        showNotification('Chyba při změně hesla', 'error');
    }
}

function exportBackup() {
    const backup = {
        version: '1.0',
        exportDate: new Date().toISOString(),
        data: {
            clients: clients,
            products: products,
            productCategories: productCategories,
            services: services,
            salonSettings: salonSettings
        }
    };
    
    const dataStr = JSON.stringify(backup, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    
    const dateStr = new Date().toISOString().split('T')[0];
    a.download = `hairbook-backup-${dateStr}.json`;
    
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification('Záloha byla úspěšně vytvořena', 'success');
}

async function importBackup(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    if (!confirm('VAROVÁNÍ: Import zálohy přepíše všechna aktuální data. Opravdu chcete pokračovat?')) {
        event.target.value = '';
        return;
    }
    
    const reader = new FileReader();
    reader.onload = async (e) => {
        try {
            const backup = JSON.parse(e.target.result);
            
            if (!backup.version || !backup.data) {
                throw new Error('Neplatný formát záložního souboru');
            }
            
            // Importovat data
            if (backup.data.clients) {
                clients.length = 0;
                clients.push(...backup.data.clients);
            }
            
            if (backup.data.products) {
                products.length = 0;
                products.push(...backup.data.products);
            }
            
            if (backup.data.productCategories) {
                productCategories.length = 0;
                productCategories.push(...backup.data.productCategories);
            }
            
            if (backup.data.services) {
                services.length = 0;
                services.push(...backup.data.services);
            }
            
            if (backup.data.salonSettings) {
                Object.assign(salonSettings, backup.data.salonSettings);
            }
            
            // Uložit do databáze
            await Promise.all([
                ...clients.map(c => apiCall('clients.php', 'PUT', c)),
                ...products.map(p => apiCall('products.php', 'PUT', p)),
                ...productCategories.map(c => apiCall('categories.php', 'PUT', c)),
                ...services.map(s => apiCall('services.php', 'PUT', s)),
                apiCall('settings.php', 'PUT', salonSettings)
            ]);
            
            showNotification('Data byla úspěšně obnovena ze zálohy', 'success');
            
            // Reload aplikace
            setTimeout(() => {
                location.reload();
            }, 1500);
            
        } catch (error) {
            console.error('Chyba při importu zálohy:', error);
            showNotification('Chyba při importu zálohy: ' + error.message, 'error');
        }
        
        event.target.value = '';
    };
    
    reader.readAsText(file);
}

// API URL
const API_URL = 'api/';

// API Helper funkce
async function apiCall(endpoint, method = 'GET', data = null) {
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        }
    };
    
    if (data && (method === 'POST' || method === 'PUT')) {
        options.body = JSON.stringify(data);
    }
    
    try {
        const url = API_URL + endpoint;
        console.log('API Request:', method, url);
        
        const response = await fetch(url, options);
        
        console.log('API Response:', response.status, response.statusText);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('API Error Response:', errorText);
            throw new Error(`HTTP ${response.status}: ${errorText.substring(0, 100)}`);
        }
        
        const result = await response.json();
        console.log('API Data:', endpoint, result);
        return result;
    } catch (error) {
        console.error('API Error:', error);
        showNotification('Chyba při komunikaci se serverem: ' + error.message, 'error');
        throw error;
    }
}

// Načítání dat z API
async function loadAllData() {
    try {
        // Načíst všechna data paralelně
        const [
            clientsData,
            productsData,
            categoriesData,
            servicesData,
            settingsData,
            purchasesData
        ] = await Promise.all([
            apiCall('clients.php'),
            apiCall('products.php'),
            apiCall('categories.php'),
            apiCall('services.php'),
            apiCall('settings.php'),
            apiCall('purchases.php')
        ]);
        
        clients = clientsData;
        products = productsData;
        productCategories = categoriesData;
        services = servicesData;
        salonSettings = settingsData;
        
        // Přiřadit nákupy ke klientům
        clients.forEach(client => {
            client.purchases = purchasesData.filter(p => p.clientId === client.id);
        });
        
        console.log('✅ Data načtena z SQLite (včetně nákupů)');
        return true;
    } catch (error) {
        console.error('❌ Chyba při načítání dat:', error);
        return false;
    }
}

// Wrapper pro ukládání - zachovává zpětnou kompatibilitu
async function saveToLocalStorage() {
    // Data se ukládají automaticky přes API při každé změně
    // Tato funkce ponechána kvůli zpětné kompatibilitě se starým kódem
    // Skutečné ukládání probíhá v jednotlivých funkcích přes apiCall()
    console.log('saveToLocalStorage() called - using API instead');
}

function loadFromLocalStorage() {
    // Tato funkce už není potřeba - data se načítají z API
    // Ponecháno kvůli zpětné kompatibilitě
}

// ============================================
// DASHBOARD FUNKCE
// ============================================

function calculateDashboardStats() {
    const today = new Date().toISOString().split('T')[0];
    const now = new Date();
    
    // Dnešní tržby z návštěv
    let todayRevenueFromVisits = 0;
    let todayVisitsCount = 0;
    clients.forEach(client => {
        if (client.visits) {
            client.visits.forEach(visit => {
                if (visit.date === today) {
                    todayVisitsCount++;
                    // Návštěva má celkovou cenu v visit.price (pokud je closed)
                    if (visit.closed && visit.price) {
                        todayRevenueFromVisits += visit.price;
                    }
                }
            });
        }
    });
    
    // Dnešní tržby z prodejů
    let todayRevenueFromSales = 0;
    clients.forEach(client => {
        if (client.purchases) {
            client.purchases.forEach(purchase => {
                if (purchase.date === today) {
                    purchase.items.forEach(item => {
                        todayRevenueFromSales += item.price * item.quantity;
                    });
                }
            });
        }
    });
    
    const todayRevenue = todayRevenueFromVisits + todayRevenueFromSales;
    
    // Včerejší tržby pro porovnání
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    
    let yesterdayRevenue = 0;
    clients.forEach(client => {
        if (client.visits) {
            client.visits.forEach(visit => {
                if (visit.date === yesterdayStr) {
                    if (visit.closed && visit.price) {
                        yesterdayRevenue += visit.price;
                    }
                }
            });
        }
        if (client.purchases) {
            client.purchases.forEach(purchase => {
                if (purchase.date === yesterdayStr) {
                    purchase.items.forEach(item => {
                        yesterdayRevenue += item.price * item.quantity;
                    });
                }
            });
        }
    });
    
    // Celkový počet klientů a aktivních
    const totalClients = clients.length;
    const activeClients = clients.filter(c => c.groupId !== 4).length;
    
    // Produkty pod minimem
    const lowStockProducts = products.filter(p => p.stock < p.minStock).length;
    
    // Týdenní data pro graf
    const weeklyData = [];
    for (let i = 6; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        
        let dayRevenue = 0;
        clients.forEach(client => {
            if (client.visits) {
                client.visits.forEach(visit => {
                    if (visit.date === dateStr) {
                        if (visit.closed && visit.price) {
                            dayRevenue += visit.price;
                        }
                    }
                });
            }
            if (client.purchases) {
                client.purchases.forEach(purchase => {
                    if (purchase.date === dateStr) {
                        purchase.items.forEach(item => {
                            dayRevenue += item.price * item.quantity;
                        });
                    }
                });
            }
        });
        
        weeklyData.push({
            date: dateStr,
            dayName: ['Ne', 'Po', 'Út', 'St', 'Čt', 'Pá', 'So'][date.getDay()],
            revenue: dayRevenue
        });
    }
    
    // Top služby
    const serviceCounts = {};
    clients.forEach(client => {
        if (client.visits) {
            client.visits.forEach(visit => {
                if (visit.closed && visit.services) {
                    visit.services.forEach(s => {
                        if (!serviceCounts[s.name]) {
                            serviceCounts[s.name] = { count: 0, revenue: 0 };
                        }
                        serviceCounts[s.name].count++;
                        // Získat cenu ze služby v databázi
                        const serviceData = services.find(srv => srv.id === s.serviceId);
                        if (serviceData) {
                            serviceCounts[s.name].revenue += serviceData.price || 0;
                        }
                    });
                }
            });
        }
    });
    
    const topServices = Object.entries(serviceCounts)
        .map(([name, data]) => ({ name, ...data }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);
    
    // Poslední návštěvy
    const allVisits = [];
    clients.forEach(client => {
        if (client.visits) {
            client.visits.forEach(visit => {
                allVisits.push({
                    ...visit,
                    clientName: `${client.firstName || ''} ${client.lastName || ''}`.trim() || 'Neznámý klient',
                    clientId: client.id
                });
            });
        }
    });
    allVisits.sort((a, b) => {
        const dateCompare = b.date.localeCompare(a.date);
        if (dateCompare !== 0) return dateCompare;
        return (b.time || '').localeCompare(a.time || '');
    });
    const recentVisits = allVisits.slice(0, 5);
    
    return {
        todayRevenue,
        yesterdayRevenue,
        todayVisitsCount,
        totalClients,
        activeClients,
        lowStockProducts,
        weeklyData,
        topServices,
        recentVisits
    };
}

function renderDashboard() {
    const stats = calculateDashboardStats();
    
    // Aktuální datum
    const today = new Date();
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('dashboardDate').textContent = today.toLocaleDateString('cs-CZ', dateOptions);
    
    // Dnešní tržby
    document.getElementById('todayRevenue').textContent = stats.todayRevenue.toLocaleString('cs-CZ') + ' Kč';
    const revenueChange = stats.yesterdayRevenue > 0 
        ? ((stats.todayRevenue - stats.yesterdayRevenue) / stats.yesterdayRevenue * 100).toFixed(1)
        : 0;
    const revenueIcon = revenueChange >= 0 ? '▲' : '▼';
    const revenueColor = revenueChange >= 0 ? '#4ade80' : '#fca5a5';
    document.getElementById('todayRevenueChange').innerHTML = `<span style="color: ${revenueColor}">${revenueIcon} ${Math.abs(revenueChange)}% oproti včerejšku</span>`;
    
    // Dnešní návštěvy
    document.getElementById('todayVisits').textContent = stats.todayVisitsCount;
    document.getElementById('todayVisitsInfo').textContent = `${stats.todayVisitsCount} dokončených návštěv`;
    
    // Celkem klientů
    document.getElementById('totalClients').textContent = stats.totalClients;
    document.getElementById('activeClientsInfo').textContent = `${stats.activeClients} aktivních klientů`;
    
    // Produkty pod minimem
    document.getElementById('lowStockProducts').textContent = stats.lowStockProducts;
    
    // Týdenní graf
    renderWeeklyChart(stats.weeklyData);
    
    // Top služby
    renderTopServices(stats.topServices);
    
    // Poslední návštěvy
    renderRecentVisits(stats.recentVisits);
    
    // Upozornění
    renderAlerts(stats);
}

function renderWeeklyChart(data) {
    const container = document.getElementById('weeklyChart');
    const maxRevenue = Math.max(...data.map(d => d.revenue), 1);
    
    let html = '<div style="display: flex; align-items: flex-end; justify-content: space-between; height: 180px; gap: 0.5rem;">';
    
    data.forEach(day => {
        const height = (day.revenue / maxRevenue * 100);
        const barColor = day.dayName === ['Ne', 'Po', 'Út', 'St', 'Čt', 'Pá', 'So'][new Date().getDay()] 
            ? '#6366f1' 
            : '#d1d5db';
        
        html += `
            <div style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
                <div style="font-size: 0.75rem; font-weight: 600; color: #374151;">
                    ${day.revenue.toLocaleString('cs-CZ', { maximumFractionDigits: 0 })} Kč
                </div>
                <div style="width: 100%; background: ${barColor}; height: ${height}%; min-height: 20px; border-radius: 0.5rem 0.5rem 0 0; transition: all 0.3s; position: relative;" 
                     title="${day.revenue.toLocaleString('cs-CZ')} Kč">
                </div>
                <div style="font-size: 0.875rem; font-weight: 600; color: #6b7280;">${day.dayName}</div>
            </div>
        `;
    });
    
    html += '</div>';
    container.innerHTML = html;
}

function renderTopServices(services) {
    const container = document.getElementById('topServices');
    
    if (services.length === 0) {
        container.innerHTML = '<div style="color: #9ca3af; text-align: center; padding: 2rem;">Zatím žádné služby</div>';
        return;
    }
    
    const maxCount = services[0].count;
    
    let html = '<div style="display: flex; flex-direction: column; gap: 1rem;">';
    
    services.forEach((service, index) => {
        const percentage = (service.count / maxCount * 100);
        const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];
        
        html += `
            <div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-size: 0.875rem;">
                    <span style="font-weight: 600; color: #374151;">${service.name}</span>
                    <span style="color: #6b7280;">${service.count}×</span>
                </div>
                <div style="background: #f3f4f6; height: 8px; border-radius: 4px; overflow: hidden;">
                    <div style="background: ${colors[index]}; height: 100%; width: ${percentage}%; transition: width 0.3s;"></div>
                </div>
                <div style="font-size: 0.75rem; color: #9ca3af; margin-top: 0.25rem;">
                    ${service.revenue.toLocaleString('cs-CZ')} Kč
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    container.innerHTML = html;
}

function renderRecentVisits(visits) {
    const container = document.getElementById('recentVisits');
    
    if (visits.length === 0) {
        container.innerHTML = '<div style="color: #9ca3af; text-align: center; padding: 2rem;">Zatím žádné návštěvy</div>';
        return;
    }
    
    let html = '';
    
    visits.forEach(visit => {
        // Použít celkovou cenu z návštěvy (pokud je uzavřená) nebo vypočítat ze služeb
        let totalPrice = 0;
        if (visit.closed && visit.price) {
            totalPrice = visit.price;
        } else if (visit.services) {
            // Pro neuzavřené návštěvy spočítat ze služeb
            visit.services.forEach(s => {
                const serviceData = services.find(srv => srv.id === s.serviceId);
                if (serviceData) {
                    totalPrice += serviceData.price || 0;
                }
            });
        }
        
        const statusBadge = visit.closed 
            ? '<span style="background: #10b981; color: white; padding: 2px 6px; border-radius: 4px; font-size: 0.75rem; margin-left: 0.5rem;">Uzavřeno</span>'
            : '<span style="background: #f59e0b; color: white; padding: 2px 6px; border-radius: 4px; font-size: 0.75rem; margin-left: 0.5rem;">Otevřeno</span>';
        
        html += `
            <div style="border-left: 3px solid ${visit.closed ? '#6366f1' : '#f59e0b'}; padding-left: 1rem; padding-top: 0.5rem; padding-bottom: 0.5rem; margin-bottom: 0.75rem;">
                <div style="font-weight: 600; color: #374151; margin-bottom: 0.25rem;">
                    ${visit.clientName}${statusBadge}
                </div>
                <div style="font-size: 0.875rem; color: #6b7280; margin-bottom: 0.25rem;">
                    ${new Date(visit.date).toLocaleDateString('cs-CZ')} ${visit.time || ''}
                </div>
                <div style="font-size: 0.875rem; color: #9ca3af;">
                    ${visit.services ? visit.services.length : 0} služeb · ${totalPrice.toLocaleString('cs-CZ')} Kč
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function renderAlerts(stats) {
    const container = document.getElementById('alerts');
    const alerts = [];
    
    // Produkty pod minimem
    if (stats.lowStockProducts > 0) {
        const lowProducts = products.filter(p => p.stock < p.minStock);
        alerts.push({
            icon: 'fa-exclamation-triangle',
            color: '#ef4444',
            title: 'Nízký stav skladu',
            description: `${stats.lowStockProducts} produktů pod minimem: ${lowProducts.slice(0, 3).map(p => p.name).join(', ')}${lowProducts.length > 3 ? '...' : ''}`
        });
    }
    
    // Neaktivní klienti
    const inactiveClients = clients.filter(c => c.groupId === 4);
    if (inactiveClients.length > 0) {
        alerts.push({
            icon: 'fa-user-clock',
            color: '#f59e0b',
            title: 'Neaktivní klienti',
            description: `${inactiveClients.length} klientů označeno jako neaktivní`
        });
    }
    
    // Dnešní výkon
    if (stats.todayVisitsCount === 0) {
        alerts.push({
            icon: 'fa-info-circle',
            color: '#3b82f6',
            title: 'Žádné dnešní návštěvy',
            description: 'Dnes zatím nebyla zaevidována žádná návštěva'
        });
    }
    
    if (alerts.length === 0) {
        container.innerHTML = '<div style="color: #10b981; text-align: center; padding: 2rem;"><i class="fas fa-check-circle" style="font-size: 2rem; margin-bottom: 0.5rem;"></i><div>Vše je v pořádku!</div></div>';
        return;
    }
    
    let html = '';
    
    alerts.forEach(alert => {
        html += `
            <div style="display: flex; gap: 1rem; padding: 1rem; background: ${alert.color}15; border-left: 3px solid ${alert.color}; border-radius: 0.5rem; margin-bottom: 1rem;">
                <div style="color: ${alert.color}; font-size: 1.5rem;">
                    <i class="fas ${alert.icon}"></i>
                </div>
                <div style="flex: 1;">
                    <div style="font-weight: 600; color: #374151; margin-bottom: 0.25rem;">${alert.title}</div>
                    <div style="font-size: 0.875rem; color: #6b7280;">${alert.description}</div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// ============================================
// ÚČETNICTVÍ A REPORTY
// ============================================

function initializeAccountingPage() {
    const yearSelect = document.getElementById('accountingYear');
    const currentYear = new Date().getFullYear();
    yearSelect.innerHTML = '';
    
    for (let year = 2020; year <= currentYear + 1; year++) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        if (year === currentYear) option.selected = true;
        yearSelect.appendChild(option);
    }
    
    const currentMonth = new Date().getMonth() + 1;
    document.getElementById('accountingMonth').value = currentMonth;
    
    yearSelect.addEventListener('change', generateAccountingReport);
    document.getElementById('accountingMonth').addEventListener('change', generateAccountingReport);
    
    // Inicializovat selektor období pro porovnání
    const comparisonSelector = document.getElementById('comparisonPeriod');
    if (comparisonSelector) {
        comparisonSelector.addEventListener('change', generateComparison);
    }
    
    // Vygenerovat přehled
    generateAccountingReport();
    
    // Vygenerovat další sekce pokud jsou zobrazené
    generateTopItems();
    generateCostsReport();
    generateClientStats();
    generateComparison();
}

function showAccountingSection(sectionId) {
    console.log('=== showAccountingSection ===');
    console.log('Section ID:', sectionId);
    
    // Skrýt všechny sekce
    const allSections = document.querySelectorAll('.accounting-section');
    console.log('Found sections:', allSections.length);
    allSections.forEach(section => {
        section.style.display = 'none';
    });
    
    // Zobrazit vybranou sekci
    const targetSection = document.getElementById(`accounting-section-${sectionId}`);
    console.log('Target section element:', targetSection);
    if (targetSection) {
        targetSection.style.display = 'block';
        console.log('Section displayed:', sectionId);
    } else {
        console.error('Section NOT FOUND:', `accounting-section-${sectionId}`);
    }
    
    // Aktualizovat aktivní menu položku
    document.querySelectorAll('.accounting-nav-item').forEach(item => {
        item.classList.remove('active');
        item.style.background = '';
        item.style.color = 'var(--text-dark)';
    });
    
    const activeItem = document.querySelector(`.accounting-nav-item[data-section="${sectionId}"]`);
    if (activeItem) {
        activeItem.classList.add('active');
        activeItem.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        activeItem.style.color = 'white';
    }
    
    // Vygenerovat data pro příslušnou sekci
    if (sectionId === 'overview') {
        generateAccountingReport();
    } else if (sectionId === 'inventory') {
        generateAccountingReport(); // Inventura používá stejnou funkci
    } else if (sectionId === 'comparison') {
        generateComparison();
    } else if (sectionId === 'top-items') {
        generateTopItems();
    } else if (sectionId === 'costs') {
        generateCostsReport();
    } else if (sectionId === 'clients-stats') {
        generateClientStats();
    }
}

function showSettingsSection(sectionId) {
    // Skrýt všechny sekce
    const allSections = document.querySelectorAll('.settings-section');
    allSections.forEach(section => {
        section.style.display = 'none';
    });
    
    // Zobrazit vybranou sekci
    const targetSection = document.getElementById(`settings-section-${sectionId}`);
    if (targetSection) {
        targetSection.style.display = 'block';
    }
    
    // Aktualizovat aktivní menu položku
    document.querySelectorAll('.settings-nav-item').forEach(item => {
        item.classList.remove('active');
        item.style.background = '';
        item.style.color = 'var(--text-dark)';
    });
    
    const activeItem = document.querySelector(`.settings-nav-item[data-section="${sectionId}"]`);
    if (activeItem) {
        activeItem.classList.add('active');
        activeItem.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        activeItem.style.color = 'white';
    }
}

// Graf měsíčních tržeb
let revenueChartInstance = null;

function generateRevenueChart(year) {
    const canvas = document.getElementById('revenueChart');
    if (!canvas) return;
    
    // Zničit předchozí graf
    if (revenueChartInstance) {
        revenueChartInstance.destroy();
    }
    
    // Připravit data pro 12 měsíců
    const monthNames = ['Led', 'Úno', 'Bře', 'Dub', 'Kvě', 'Čvn', 'Čvc', 'Srp', 'Zář', 'Říj', 'Lis', 'Pro'];
    const monthlyData = Array(12).fill(0).map(() => ({ total: 0, services: 0, products: 0 }));
    
    // Spočítat tržby za služby
    clients.forEach(client => {
        if (client.visits) {
            client.visits.forEach(visit => {
                if (!visit.closed || !visit.price) return;
                const visitDate = new Date(visit.date);
                if (visitDate.getFullYear() === year) {
                    const monthIndex = visitDate.getMonth();
                    monthlyData[monthIndex].services += visit.price;
                    monthlyData[monthIndex].total += visit.price;
                }
            });
        }
        
        // Spočítat tržby z prodeje produktů
        if (client.purchases) {
            client.purchases.forEach(purchase => {
                const purchaseDate = new Date(purchase.date);
                if (purchaseDate.getFullYear() === year) {
                    const monthIndex = purchaseDate.getMonth();
                    let purchaseTotal = 0;
                    purchase.items.forEach(item => {
                        purchaseTotal += item.price * item.quantity;
                    });
                    monthlyData[monthIndex].products += purchaseTotal;
                    monthlyData[monthIndex].total += purchaseTotal;
                }
            });
        }
    });
    
    // Vytvořit nový graf
    const ctx = canvas.getContext('2d');
    revenueChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: monthNames,
            datasets: [
                {
                    label: 'Celkové tržby',
                    data: monthlyData.map(d => d.total),
                    borderColor: 'rgb(102, 126, 234)',
                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true,
                    pointRadius: 4,
                    pointHoverRadius: 6
                },
                {
                    label: 'Služby',
                    data: monthlyData.map(d => d.services),
                    borderColor: 'rgb(240, 147, 251)',
                    backgroundColor: 'rgba(240, 147, 251, 0.1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: false,
                    pointRadius: 3,
                    pointHoverRadius: 5
                },
                {
                    label: 'Prodej produktů',
                    data: monthlyData.map(d => d.products),
                    borderColor: 'rgb(79, 172, 254)',
                    backgroundColor: 'rgba(79, 172, 254, 0.1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: false,
                    pointRadius: 3,
                    pointHoverRadius: 5
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    titleFont: { size: 14, weight: 'bold' },
                    bodyFont: { size: 13 },
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            label += context.parsed.y.toLocaleString('cs-CZ') + ' Kč';
                            return label;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value.toLocaleString('cs-CZ') + ' Kč';
                        },
                        font: { size: 11 }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: { size: 11 }
                    }
                }
            }
        }
    });
}

function generateAccountingReport() {
    const year = parseInt(document.getElementById('accountingYear').value);
    const month = document.getElementById('accountingMonth').value;
    
    let totalRevenue = 0;
    let serviceRevenue = 0;
    let productSalesRevenue = 0;
    let totalVisitsCount = 0;
    
    clients.forEach(client => {
        if (client.visits) {
            client.visits.forEach(visit => {
                if (!visit.closed || !visit.price) return;
                
                const visitDate = new Date(visit.date);
                const visitYear = visitDate.getFullYear();
                const visitMonth = visitDate.getMonth() + 1;
                
                if (visitYear === year && (!month || visitMonth === parseInt(month))) {
                    totalVisitsCount++;
                    serviceRevenue += visit.price;
                    totalRevenue += visit.price;
                }
            });
        }
        
        if (client.purchases) {
            client.purchases.forEach(purchase => {
                const purchaseDate = new Date(purchase.date);
                const purchaseYear = purchaseDate.getFullYear();
                const purchaseMonth = purchaseDate.getMonth() + 1;
                
                if (purchaseYear === year && (!month || purchaseMonth === parseInt(month))) {
                    purchase.items.forEach(item => {
                        const itemRevenue = item.price * item.quantity;
                        productSalesRevenue += itemRevenue;
                        totalRevenue += itemRevenue;
                    });
                }
            });
        }
    });
    
    document.getElementById('totalRevenue').textContent = totalRevenue.toLocaleString('cs-CZ') + ' Kč';
    document.getElementById('serviceRevenue').textContent = serviceRevenue.toLocaleString('cs-CZ') + ' Kč';
    document.getElementById('productSalesRevenue').textContent = productSalesRevenue.toLocaleString('cs-CZ') + ' Kč';
    document.getElementById('totalVisitsCount').textContent = totalVisitsCount;
    
    // Generovat graf měsíčních tržeb
    generateRevenueChart(year);
    
    // Vypočítat statistiky skladu
    let totalInventoryValue = 0;
    let lowStockCount = 0;
    
    products.forEach(product => {
        const stockValue = (product.stock || 0) * (product.pricePurchase || 0);
        totalInventoryValue += stockValue;
        
        if ((product.stock || 0) < (product.minStock || 0)) {
            lowStockCount++;
        }
    });
    
    document.getElementById('totalInventoryValue').textContent = totalInventoryValue.toLocaleString('cs-CZ') + ' Kč';
    document.getElementById('totalProductsCount').textContent = products.length;
    document.getElementById('lowStockCount').textContent = lowStockCount;
    
    generateInventoryTable();
    generateTopProductsAndServices(year, month);
}

function generateInventoryTable() {
    const tbody = document.getElementById('inventoryTableBody');
    if (!tbody) {
        console.warn('inventoryTableBody element not found - skipping inventory table generation');
        return;
    }
    tbody.innerHTML = '';
    
    let totalValue = 0;
    
    products.forEach(product => {
        const category = productCategories.find(c => c.id === product.categoryId);
        const categoryName = category ? category.name : 'Bez kategorie';
        const purchasePrice = product.pricePurchase || 0;
        const stockValue = product.stock * purchasePrice;
        totalValue += stockValue;
        
        const isLowStock = product.stock < product.minStock;
        
        const row = document.createElement('tr');
        row.style.borderBottom = '1px solid #e5e7eb';
        if (isLowStock) row.style.background = '#fef2f2';
        
        row.innerHTML = `
            <td style="padding: 0.75rem; color: ${isLowStock ? '#ef4444' : '#374151'}; font-weight: ${isLowStock ? '600' : '400'};">
                ${product.name}
                ${isLowStock ? '<i class="fas fa-exclamation-triangle" style="color: #ef4444; margin-left: 0.5rem;"></i>' : ''}
            </td>
            <td style="padding: 0.75rem; color: #6b7280;">${categoryName}</td>
            <td style="padding: 0.75rem; text-align: right; color: #374151;">${product.stock.toLocaleString('cs-CZ', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
            <td style="padding: 0.75rem; text-align: right; color: #9ca3af;">${product.minStock.toLocaleString('cs-CZ', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
            <td style="padding: 0.75rem; text-align: right; color: #6b7280;">${product.unit}</td>
            <td style="padding: 0.75rem; text-align: right; color: #374151;">${purchasePrice.toLocaleString('cs-CZ')} Kč</td>
            <td style="padding: 0.75rem; text-align: right; color: #374151; font-weight: 600;">${stockValue.toLocaleString('cs-CZ')} Kč</td>
        `;
        
        tbody.appendChild(row);
    });
    
    const totalRow = document.createElement('tr');
    totalRow.style.background = '#f9fafb';
    totalRow.style.fontWeight = '700';
    totalRow.innerHTML = `
        <td colspan="6" style="padding: 0.75rem; text-align: right; color: #374151;">Celková hodnota skladu:</td>
        <td style="padding: 0.75rem; text-align: right; color: #6366f1; font-size: 1.125rem;">${totalValue.toLocaleString('cs-CZ')} Kč</td>
    `;
    tbody.appendChild(totalRow);
}

function generateTopProductsAndServices(year, month) {
    const productSales = {};
    
    clients.forEach(client => {
        if (client.purchases) {
            client.purchases.forEach(purchase => {
                const purchaseDate = new Date(purchase.date);
                if (purchaseDate.getFullYear() === year && (!month || purchaseDate.getMonth() + 1 === parseInt(month))) {
                    purchase.items.forEach(item => {
                        if (!productSales[item.name]) {
                            productSales[item.name] = { quantity: 0, revenue: 0 };
                        }
                        productSales[item.name].quantity += item.quantity;
                        productSales[item.name].revenue += item.price * item.quantity;
                    });
                }
            });
        }
    });
    
    const topProducts = Object.entries(productSales)
        .map(([name, data]) => ({ name, ...data }))
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 5);
    
    const topProductsContainer = document.getElementById('topProductsList');
    if (!topProductsContainer) {
        console.warn('topProductsList element not found');
        return;
    }
    if (topProducts.length === 0) {
        topProductsContainer.innerHTML = '<p style="color: #9ca3af; text-align: center;">Žádné prodeje v tomto období</p>';
    } else {
        const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];
        topProductsContainer.innerHTML = topProducts.map((product, index) => `
            <div style="display: flex; justify-content: space-between; padding: 0.75rem 0; border-bottom: 1px solid #f3f4f6;">
                <div style="display: flex; align-items: center; gap: 0.75rem;">
                    <div style="width: 32px; height: 32px; background: ${colors[index]}; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700;">
                        ${index + 1}
                    </div>
                    <div>
                        <div style="font-weight: 600; color: #374151;">${product.name}</div>
                        <div style="font-size: 0.875rem; color: #9ca3af;">${product.quantity} ks</div>
                    </div>
                </div>
                <div style="font-weight: 600; color: #6366f1;">${product.revenue.toLocaleString('cs-CZ')} Kč</div>
            </div>
        `).join('');
    }
    
    const serviceCounts = {};
    clients.forEach(client => {
        if (client.visits) {
            client.visits.forEach(visit => {
                if (!visit.closed) return;
                const visitDate = new Date(visit.date);
                if (visitDate.getFullYear() === year && (!month || visitDate.getMonth() + 1 === parseInt(month))) {
                    if (visit.services) {
                        visit.services.forEach(s => {
                            if (!serviceCounts[s.name]) {
                                serviceCounts[s.name] = { count: 0, revenue: 0 };
                            }
                            serviceCounts[s.name].count++;
                            const serviceData = services.find(srv => srv.id === s.serviceId);
                            if (serviceData) serviceCounts[s.name].revenue += serviceData.price || 0;
                        });
                    }
                }
            });
        }
    });
    
    const topServices = Object.entries(serviceCounts)
        .map(([name, data]) => ({ name, ...data }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);
    
    const topServicesContainer = document.getElementById('topServicesList');
    if (!topServicesContainer) {
        console.warn('topServicesList element not found');
        return;
    }
    if (topServices.length === 0) {
        topServicesContainer.innerHTML = '<p style="color: #9ca3af; text-align: center;">Žádné návštěvy v tomto období</p>';
    } else {
        const colors = ['#ec4899', '#f59e0b', '#10b981', '#6366f1', '#8b5cf6'];
        topServicesContainer.innerHTML = topServices.map((service, index) => `
            <div style="display: flex; justify-content: space-between; padding: 0.75rem 0; border-bottom: 1px solid #f3f4f6;">
                <div style="display: flex; align-items: center; gap: 0.75rem;">
                    <div style="width: 32px; height: 32px; background: ${colors[index]}; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700;">
                        ${index + 1}
                    </div>
                    <div>
                        <div style="font-weight: 600; color: #374151;">${service.name}</div>
                        <div style="font-size: 0.875rem; color: #9ca3af;">${service.count}× provedeno</div>
                    </div>
                </div>
                <div style="font-weight: 600; color: #ec4899;">${service.revenue.toLocaleString('cs-CZ')} Kč</div>
            </div>
        `).join('');
    }
}

function exportRevenueToCSV() {
    const year = parseInt(document.getElementById('accountingYear').value);
    const month = document.getElementById('accountingMonth').value;
    const periodName = month ? `${year}-${month.padStart(2, '0')}` : year.toString();
    
    let csv = 'Přehled tržeb\n';
    csv += `Období,${month ? getMonthName(parseInt(month)) + ' ' + year : 'Celý rok ' + year}\n\n`;
    
    // Tržby za služby po měsících
    csv += 'TRŽBY ZA SLUŽBY\n';
    csv += 'Měsíc,Počet návštěv,Tržby\n';
    
    const monthlyServiceRevenue = {};
    
    clients.forEach(client => {
        if (client.visits) {
            client.visits.forEach(visit => {
                if (!visit.closed || !visit.price) return;
                
                const visitDate = new Date(visit.date);
                const visitYear = visitDate.getFullYear();
                const visitMonth = visitDate.getMonth() + 1;
                
                if (visitYear === year && (!month || visitMonth === parseInt(month))) {
                    const key = visitMonth;
                    if (!monthlyServiceRevenue[key]) {
                        monthlyServiceRevenue[key] = { count: 0, revenue: 0 };
                    }
                    monthlyServiceRevenue[key].count++;
                    monthlyServiceRevenue[key].revenue += visit.price;
                }
            });
        }
    });
    
    let totalServiceVisits = 0;
    let totalServiceRevenue = 0;
    
    for (let m = 1; m <= 12; m++) {
        if (month && parseInt(month) !== m) continue;
        const data = monthlyServiceRevenue[m] || { count: 0, revenue: 0 };
        csv += `${getMonthName(m)},${data.count},${data.revenue}\n`;
        totalServiceVisits += data.count;
        totalServiceRevenue += data.revenue;
    }
    
    csv += `CELKEM,${totalServiceVisits},${totalServiceRevenue}\n\n`;
    
    // Tržby z prodeje produktů po měsících
    csv += 'TRŽBY Z PRODEJE PRODUKTŮ\n';
    csv += 'Měsíc,Počet prodejů,Tržby\n';
    
    const monthlyProductRevenue = {};
    
    clients.forEach(client => {
        if (client.purchases) {
            client.purchases.forEach(purchase => {
                const purchaseDate = new Date(purchase.date);
                const purchaseYear = purchaseDate.getFullYear();
                const purchaseMonth = purchaseDate.getMonth() + 1;
                
                if (purchaseYear === year && (!month || purchaseMonth === parseInt(month))) {
                    const key = purchaseMonth;
                    if (!monthlyProductRevenue[key]) {
                        monthlyProductRevenue[key] = { count: 0, revenue: 0 };
                    }
                    monthlyProductRevenue[key].count++;
                    purchase.items.forEach(item => {
                        monthlyProductRevenue[key].revenue += item.price * item.quantity;
                    });
                }
            });
        }
    });
    
    let totalProductSales = 0;
    let totalProductRevenue = 0;
    
    for (let m = 1; m <= 12; m++) {
        if (month && parseInt(month) !== m) continue;
        const data = monthlyProductRevenue[m] || { count: 0, revenue: 0 };
        csv += `${getMonthName(m)},${data.count},${data.revenue}\n`;
        totalProductSales += data.count;
        totalProductRevenue += data.revenue;
    }
    
    csv += `CELKEM,${totalProductSales},${totalProductRevenue}\n\n`;
    
    // Celková sumarizace
    csv += 'CELKOVÁ SUMARIZACE\n';
    csv += `Celkové tržby,${totalServiceRevenue + totalProductRevenue}\n`;
    csv += `Tržby ze služeb,${totalServiceRevenue}\n`;
    csv += `Tržby z produktů,${totalProductRevenue}\n`;
    csv += `Počet návštěv,${totalServiceVisits}\n`;
    csv += `Počet prodejů produktů,${totalProductSales}\n`;
    csv += '\n';
    csv += `Datum exportu,${new Date().toLocaleString('cs-CZ')}\n`;
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    const date = new Date().toISOString().split('T')[0];
    
    link.setAttribute('href', url);
    link.setAttribute('download', `trzby_${periodName}_${date}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function getMonthName(monthNum) {
    const months = ['Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen', 
                    'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec'];
    return months[monthNum - 1];
}

function exportInventoryToCSV() {
    let csv = 'Produkt,Kategorie,Sklad,Minimum,Jednotka,Nákupní cena,Celková hodnota\n';
    
    let totalValue = 0;
    let totalProducts = 0;
    let lowStockCount = 0;
    
    products.forEach(product => {
        const category = productCategories.find(c => c.id === product.categoryId);
        const categoryName = category ? category.name : 'Bez kategorie';
        const purchasePrice = product.purchasePrice || 0;
        const stockValue = product.stock * purchasePrice;
        
        totalValue += stockValue;
        totalProducts++;
        
        if ((product.stock || 0) <= (product.minStock || 0)) {
            lowStockCount++;
        }
        
        csv += `"${product.name}","${categoryName}",${product.stock},${product.minStock},"${product.unit}",${purchasePrice},${stockValue}\n`;
    });
    
    // Přidat prázdný řádek a sumarizaci
    csv += '\n';
    csv += 'SUMARIZACE\n';
    csv += `Celkový počet produktů,${totalProducts}\n`;
    csv += `Celková hodnota skladu,${totalValue}\n`;
    csv += `Produkty s nízkým stavem,${lowStockCount}\n`;
    csv += '\n';
    csv += `Datum exportu,${new Date().toLocaleString('cs-CZ')}\n`;
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    const date = new Date().toISOString().split('T')[0];
    
    link.setAttribute('href', url);
    link.setAttribute('download', `inventura_${date}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Modální okna pro přehled tržeb a inventury
function showRevenueModal() {
    const modal = document.getElementById('revenueModal');
    if (!modal) {
        console.error('Modal revenueModal neexistuje');
        return;
    }
    
    const year = parseInt(document.getElementById('accountingYear').value);
    const month = document.getElementById('accountingMonth').value;
    const periodName = month ? `${getMonthName(parseInt(month))} ${year}` : `Celý rok ${year}`;
    
    const monthlyServiceRevenue = {};
    const monthlyProductRevenue = {};
    
    clients.forEach(client => {
        if (client.visits) {
            client.visits.forEach(visit => {
                if (!visit.closed || !visit.price) return;
                
                const visitDate = new Date(visit.date);
                const visitYear = visitDate.getFullYear();
                const visitMonth = visitDate.getMonth() + 1;
                
                if (visitYear === year && (!month || visitMonth === parseInt(month))) {
                    const key = visitMonth;
                    if (!monthlyServiceRevenue[key]) {
                        monthlyServiceRevenue[key] = { count: 0, revenue: 0 };
                    }
                    monthlyServiceRevenue[key].count++;
                    monthlyServiceRevenue[key].revenue += visit.price;
                }
            });
        }
        
        if (client.purchases) {
            client.purchases.forEach(purchase => {
                const purchaseDate = new Date(purchase.date);
                const purchaseYear = purchaseDate.getFullYear();
                const purchaseMonth = purchaseDate.getMonth() + 1;
                
                if (purchaseYear === year && (!month || purchaseMonth === parseInt(month))) {
                    const key = purchaseMonth;
                    if (!monthlyProductRevenue[key]) {
                        monthlyProductRevenue[key] = { count: 0, revenue: 0 };
                    }
                    monthlyProductRevenue[key].count++;
                    purchase.items.forEach(item => {
                        monthlyProductRevenue[key].revenue += item.price * item.quantity;
                    });
                }
            });
        }
    });
    
    let totalServiceVisits = 0;
    let totalServiceRevenue = 0;
    let totalProductSales = 0;
    let totalProductRevenue = 0;
    
    let html = `
        <div style="margin-bottom: 1.5rem;">
            <h4 style="color: #6366f1; margin-bottom: 0.5rem;">Období: ${periodName}</h4>
            <p style="color: #6b7280; font-size: 0.875rem;">Datum exportu: ${new Date().toLocaleString('cs-CZ')}</p>
        </div>
        
        <div style="margin-bottom: 2rem;">
            <h4 style="color: #374151; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 2px solid #ec4899;">
                <i class="fas fa-cut"></i> Tržby za služby
            </h4>
            <table style="width: 100%; border-collapse: collapse;">
                <thead>
                    <tr style="background: #f9fafb; border-bottom: 2px solid #e5e7eb;">
                        <th style="padding: 0.75rem; text-align: left; font-weight: 600;">Měsíc</th>
                        <th style="padding: 0.75rem; text-align: right; font-weight: 600;">Počet návštěv</th>
                        <th style="padding: 0.75rem; text-align: right; font-weight: 600;">Tržby</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    for (let m = 1; m <= 12; m++) {
        if (month && parseInt(month) !== m) continue;
        const data = monthlyServiceRevenue[m] || { count: 0, revenue: 0 };
        totalServiceVisits += data.count;
        totalServiceRevenue += data.revenue;
        
        html += `
            <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 0.75rem;">${getMonthName(m)}</td>
                <td style="padding: 0.75rem; text-align: right;">${data.count}</td>
                <td style="padding: 0.75rem; text-align: right; font-weight: 600;">${data.revenue.toLocaleString('cs-CZ')} Kč</td>
            </tr>
        `;
    }
    
    html += `
                    <tr style="background: #fef3f2; border-top: 2px solid #ec4899; font-weight: 700;">
                        <td style="padding: 0.75rem;">CELKEM</td>
                        <td style="padding: 0.75rem; text-align: right;">${totalServiceVisits}</td>
                        <td style="padding: 0.75rem; text-align: right; color: #ec4899;">${totalServiceRevenue.toLocaleString('cs-CZ')} Kč</td>
                    </tr>
                </tbody>
            </table>
        </div>
        
        <div style="margin-bottom: 2rem;">
            <h4 style="color: #374151; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 2px solid #10b981;">
                <i class="fas fa-shopping-bag"></i> Tržby z prodeje produktů
            </h4>
            <table style="width: 100%; border-collapse: collapse;">
                <thead>
                    <tr style="background: #f9fafb; border-bottom: 2px solid #e5e7eb;">
                        <th style="padding: 0.75rem; text-align: left; font-weight: 600;">Měsíc</th>
                        <th style="padding: 0.75rem; text-align: right; font-weight: 600;">Počet prodejů</th>
                        <th style="padding: 0.75rem; text-align: right; font-weight: 600;">Tržby</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    for (let m = 1; m <= 12; m++) {
        if (month && parseInt(month) !== m) continue;
        const data = monthlyProductRevenue[m] || { count: 0, revenue: 0 };
        totalProductSales += data.count;
        totalProductRevenue += data.revenue;
        
        html += `
            <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 0.75rem;">${getMonthName(m)}</td>
                <td style="padding: 0.75rem; text-align: right;">${data.count}</td>
                <td style="padding: 0.75rem; text-align: right; font-weight: 600;">${data.revenue.toLocaleString('cs-CZ')} Kč</td>
            </tr>
        `;
    }
    
    html += `
                    <tr style="background: #f0fdf4; border-top: 2px solid #10b981; font-weight: 700;">
                        <td style="padding: 0.75rem;">CELKEM</td>
                        <td style="padding: 0.75rem; text-align: right;">${totalProductSales}</td>
                        <td style="padding: 0.75rem; text-align: right; color: #10b981;">${totalProductRevenue.toLocaleString('cs-CZ')} Kč</td>
                    </tr>
                </tbody>
            </table>
        </div>
        
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 0.75rem; padding: 1.5rem; color: white;">
            <h4 style="margin: 0 0 1rem 0; opacity: 0.9;">Celková sumarizace</h4>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; font-size: 0.875rem;">
                <div>
                    <div style="opacity: 0.8;">Celkové tržby:</div>
                    <div style="font-size: 1.5rem; font-weight: 700; margin-top: 0.25rem;">${(totalServiceRevenue + totalProductRevenue).toLocaleString('cs-CZ')} Kč</div>
                </div>
                <div>
                    <div style="opacity: 0.8;">Tržby ze služeb:</div>
                    <div style="font-size: 1.5rem; font-weight: 700; margin-top: 0.25rem;">${totalServiceRevenue.toLocaleString('cs-CZ')} Kč</div>
                </div>
                <div>
                    <div style="opacity: 0.8;">Tržby z produktů:</div>
                    <div style="font-size: 1.5rem; font-weight: 700; margin-top: 0.25rem;">${totalProductRevenue.toLocaleString('cs-CZ')} Kč</div>
                </div>
                <div>
                    <div style="opacity: 0.8;">Počet návštěv:</div>
                    <div style="font-size: 1.5rem; font-weight: 700; margin-top: 0.25rem;">${totalServiceVisits}</div>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('revenueContent').innerHTML = html;
    document.getElementById('revenueModal').classList.add('show');
}

function closeRevenueModal() {
    document.getElementById('revenueModal').classList.remove('show');
}

function exportRevenueToCSVFromModal() {
    closeRevenueModal();
    exportRevenueToCSV();
}

function showInventoryModal() {
    const modal = document.getElementById('inventoryModal');
    if (!modal) {
        console.error('Modal inventoryModal neexistuje');
        return;
    }
    
    let totalValue = 0;
    let totalProducts = 0;
    let lowStockCount = 0;
    
    let html = `
        <div style="margin-bottom: 1.5rem;">
            <h4 style="color: #10b981; margin-bottom: 0.5rem;">Inventura skladu</h4>
            <p style="color: #6b7280; font-size: 0.875rem;">Datum exportu: ${new Date().toLocaleString('cs-CZ')}</p>
        </div>
        
        <div style="overflow-x: auto; margin-bottom: 1.5rem;">
            <table style="width: 100%; border-collapse: collapse;">
                <thead>
                    <tr style="background: #f9fafb; border-bottom: 2px solid #e5e7eb;">
                        <th style="padding: 0.75rem; text-align: left; font-weight: 600;">Produkt</th>
                        <th style="padding: 0.75rem; text-align: left; font-weight: 600;">Kategorie</th>
                        <th style="padding: 0.75rem; text-align: right; font-weight: 600;">Sklad</th>
                        <th style="padding: 0.75rem; text-align: right; font-weight: 600;">Minimum</th>
                        <th style="padding: 0.75rem; text-align: left; font-weight: 600;">Jednotka</th>
                        <th style="padding: 0.75rem; text-align: right; font-weight: 600;">Nákupní cena</th>
                        <th style="padding: 0.75rem; text-align: right; font-weight: 600;">Celková hodnota</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    products.forEach(product => {
        const category = productCategories.find(c => c.id === product.categoryId);
        const categoryName = category ? category.name : 'Bez kategorie';
        const purchasePrice = product.pricePurchase || 0;
        const stockValue = product.stock * purchasePrice;
        const isLowStock = (product.stock || 0) < (product.minStock || 0);
        
        totalValue += stockValue;
        totalProducts++;
        
        if (isLowStock) {
            lowStockCount++;
        }
        
        html += `
            <tr style="border-bottom: 1px solid #f3f4f6; ${isLowStock ? 'background: #fef2f2;' : ''}">
                <td style="padding: 0.75rem; font-weight: 600; color: ${isLowStock ? '#ef4444' : '#374151'};">${product.name}</td>
                <td style="padding: 0.75rem;">${categoryName}</td>
                <td style="padding: 0.75rem; text-align: right; font-weight: 600; color: ${isLowStock ? '#ef4444' : '#374151'};">${product.stock}</td>
                <td style="padding: 0.75rem; text-align: right;">${product.minStock}</td>
                <td style="padding: 0.75rem;">${product.unit}</td>
                <td style="padding: 0.75rem; text-align: right;">${purchasePrice.toLocaleString('cs-CZ')} Kč</td>
                <td style="padding: 0.75rem; text-align: right; font-weight: 600;">${stockValue.toLocaleString('cs-CZ')} Kč</td>
            </tr>
        `;
    });
    
    html += `
                    <tr style="background: #f0fdf4; border-top: 2px solid #10b981; font-weight: 700;">
                        <td colspan="6" style="padding: 0.75rem;">CELKEM</td>
                        <td style="padding: 0.75rem; text-align: right; color: #10b981; font-size: 1.125rem;">${totalValue.toLocaleString('cs-CZ')} Kč</td>
                    </tr>
                </tbody>
            </table>
        </div>
        
        <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-radius: 0.75rem; padding: 1.5rem; color: white;">
            <h4 style="margin: 0 0 1rem 0; opacity: 0.9;">Sumarizace</h4>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; font-size: 0.875rem;">
                <div>
                    <div style="opacity: 0.8;">Celkový počet produktů:</div>
                    <div style="font-size: 1.5rem; font-weight: 700; margin-top: 0.25rem;">${totalProducts}</div>
                </div>
                <div>
                    <div style="opacity: 0.8;">Celková hodnota skladu:</div>
                    <div style="font-size: 1.5rem; font-weight: 700; margin-top: 0.25rem;">${totalValue.toLocaleString('cs-CZ')} Kč</div>
                </div>
                <div>
                    <div style="opacity: 0.8;">Produkty pod minimem:</div>
                    <div style="font-size: 1.5rem; font-weight: 700; margin-top: 0.25rem;">${lowStockCount}</div>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('inventoryContent').innerHTML = html;
    document.getElementById('inventoryModal').classList.add('show');
}

function closeInventoryModal() {
    document.getElementById('inventoryModal').classList.remove('show');
}

function exportInventoryToCSVFromModal() {
    closeInventoryModal();
    exportInventoryToCSV();
}

// ČTEČKA ČÁROVÝCH KÓDŮ
let barcodeBuffer = '';
let barcodeTimeout = null;

function initBarcodeScanner() {
    document.addEventListener('keypress', handleBarcodeInput);
}

function handleBarcodeInput(event) {
    // Ignorovat pokud je focus v textarea nebo contenteditable
    const target = event.target;
    if (target.tagName === 'TEXTAREA' || target.isContentEditable) {
        return;
    }
    
    // Zjistit, zda jsme na stránce příjmu nebo prodeje
    const currentPage = document.querySelector('.page.active')?.id;
    if (currentPage !== 'page-stock' && currentPage !== 'page-sale') {
        return;
    }
    
    // Pokud je focus v input poli pro vyhledávání produktu, použij standardní chování
    const activeElement = document.activeElement;
    if (activeElement && (
        activeElement.id === 'receiptProductSearch' || 
        activeElement.id === 'productSaleSearch'
    )) {
        // Nechať čtečku napsat do inputu normálně
        return;
    }
    
    // Přidat znak do bufferu
    clearTimeout(barcodeTimeout);
    
    if (event.key === 'Enter') {
        // Čárový kód kompletní
        if (barcodeBuffer.length > 0) {
            processBarcodeInput(barcodeBuffer, currentPage);
            barcodeBuffer = '';
        }
    } else {
        barcodeBuffer += event.key;
        
        // Reset bufferu po 100ms (čtečka píše rychle, člověk pomalu)
        barcodeTimeout = setTimeout(() => {
            barcodeBuffer = '';
        }, 100);
    }
}

function processBarcodeInput(barcode, page) {
    // Najít produkt podle čárového kódu
    const product = products.find(p => p.barcode && p.barcode === barcode);
    
    if (!product) {
        showNotification('Produkt s tímto čárovým kódem nebyl nalezen', 'error');
        return;
    }
    
    if (page === 'page-stock') {
        // Příjem zboží
        selectReceiptProduct(product);
        document.getElementById('receiptQuantity').focus();
        showNotification(`Produkt "${product.name}" načten`, 'success');
    } else if (page === 'page-sale') {
        // Prodej - rovnou přidat do košíku s množstvím 1
        addProductToSaleCart(product);
        showNotification(`Produkt "${product.name}" přidán do košíku`, 'success');
    }
}

function selectReceiptProduct(product) {
    // Vyplnit formulář příjmu
    document.getElementById('receiptProductSearch').value = product.name;
    document.getElementById('receiptProduct').value = product.id;
    
    // Aktualizovat info box
    const infoBox = document.getElementById('receiptProductInfo');
    infoBox.style.display = 'block';
    document.getElementById('receiptInfoName').textContent = product.name;
    document.getElementById('receiptInfoCurrentStock').textContent = 
        `${(product.stock / product.packageSize).toFixed(2)} ks (${product.stock.toFixed(2)} ${product.unit})`;
    document.getElementById('receiptInfoMinStock').textContent = 
        `${(product.minStock / product.packageSize).toFixed(2)} ks (${product.minStock.toFixed(2)} ${product.unit})`;
    
    // Nastavit jednotku
    const unitSelect = document.getElementById('receiptUnit');
    unitSelect.innerHTML = `
        <option value="package">ks (balení ${product.packageSize} ${product.unit})</option>
        <option value="base">${product.unit} (jednotlivě)</option>
    `;
}

function addProductToSaleCart(product) {
    // Najít stránku prodeje
    const currentSaleProducts = Array.from(document.querySelectorAll('.sale-product-item'))
        .map(item => parseInt(item.dataset.productId));
    
    // Zkontrolovat zda produkt je pro prodej
    if (!product.forSale) {
        showNotification('Tento produkt není určen k prodeji', 'error');
        return;
    }
    
    // Zkontrolovat sklad
    const availableStock = product.stock / product.packageSize;
    if (availableStock < 1) {
        showNotification('Nedostatečný stav skladu', 'error');
        return;
    }
    
    // Přidat do seznamu
    addProductToSale(product.id);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        border-radius: 0.5rem;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 10000;
        font-weight: 500;
        animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Přidat CSS animace
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Režim rychlého pořizování produktů
let entryCounter = 0;

function toggleEntryMode() {
    if (products.length === 0) {
        startEntryMode();
    }
}

function startEntryMode() {
    isEntryMode = true;
    entryCounter = 0;
    
    // Naplnit dropdown kategorií
    const categorySelect = document.getElementById('quickEntryCategoryId');
    categorySelect.innerHTML = '<option value="">-- Vyberte kategorii --</option>';
    productCategories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat.id;
        option.textContent = cat.name;
        categorySelect.appendChild(option);
    });
    
    // Zobrazit modal a reset formuláře
    document.getElementById('quickEntryName').value = '';
    document.getElementById('quickEntryBarcode').value = '';
    document.getElementById('quickEntryCategoryId').value = '';
    document.getElementById('quickEntryUnit').value = 'ml';
    document.getElementById('quickEntryPackageSize').value = '100';
    document.getElementById('quickEntryStock').value = '0';
    document.getElementById('quickEntryMinimalStock').value = '0';
    document.getElementById('quickEntryPurchasePrice').value = '';
    document.getElementById('quickEntrySalePrice').value = '';
    document.getElementById('quickEntryForSale').checked = false;
    document.getElementById('quickEntryForService').checked = true;
    document.getElementById('entryCounter').textContent = '0';
    
    document.getElementById('quickEntryModal').classList.add('show');
    setTimeout(() => document.getElementById('quickEntryName').focus(), 100);
    
    // Blokovat navigaci
    updateNavigationState();
}

function exitEntryMode() {
    if (entryCounter > 0) {
        document.getElementById('exitEntryMessage').textContent = 
            `Opravdu chcete ukončit pořizování? Bylo pořízeno ${entryCounter} produktů.`;
        document.getElementById('exitEntryConfirmModal').classList.add('show');
    } else {
        confirmExitEntry();
    }
}

function closeExitEntryConfirm() {
    document.getElementById('exitEntryConfirmModal').classList.remove('show');
}

function confirmExitEntry() {
    isEntryMode = false;
    entryCounter = 0;
    document.getElementById('quickEntryModal').classList.remove('show');
    document.getElementById('exitEntryConfirmModal').classList.remove('show');
    
    // Odblokovat navigaci
    updateNavigationState();
    
    // Aktualizovat zobrazení produktů
    renderProducts();
}

function quickAddCategory() {
    document.getElementById('quickCategoryName').value = '';
    document.getElementById('quickCategoryModal').classList.add('show');
    setTimeout(() => document.getElementById('quickCategoryName').focus(), 100);
}

function closeQuickCategoryModal() {
    document.getElementById('quickCategoryModal').classList.remove('show');
}

async function saveQuickCategory(event) {
    event.preventDefault();
    
    const name = document.getElementById('quickCategoryName').value.trim();
    if (!name) return;
    
    const icons = ['🎨', '✨', '💧', '💨', '⚡', '🌟', '💎', '🎯'];
    const colors = ['#3b82f6', '#8b5cf6', '#ef4444', '#f59e0b', '#10b981', '#06b6d4', '#ec4899', '#6366f1'];
    
    const newCategory = {
        name: name,
        icon: icons[Math.floor(Math.random() * icons.length)],
        color: colors[Math.floor(Math.random() * colors.length)]
    };
    
    try {
        const result = await apiCall('categories.php', 'POST', newCategory);
        newCategory.id = result.id;
        productCategories.push(newCategory);
        
        // Aktualizovat dropdown
        const categorySelect = document.getElementById('quickEntryCategoryId');
        const option = document.createElement('option');
        option.value = newCategory.id;
        option.textContent = newCategory.name;
        option.selected = true;
        categorySelect.appendChild(option);
        
        renderProductCategories();
        closeQuickCategoryModal();
        showNotification('Kategorie vytvořena', 'success');
    } catch (error) {
        console.error('Chyba při vytváření kategorie:', error);
    }
}

async function saveQuickEntry(event) {
    event.preventDefault();
    
    const name = document.getElementById('quickEntryName').value.trim();
    const barcode = document.getElementById('quickEntryBarcode').value.trim();
    const categoryId = parseInt(document.getElementById('quickEntryCategoryId').value);
    const unit = document.getElementById('quickEntryUnit').value;
    const packageSize = parseFloat(document.getElementById('quickEntryPackageSize').value);
    const stockInPieces = parseFloat(document.getElementById('quickEntryStock').value);
    const minimalStock = parseFloat(document.getElementById('quickEntryMinimalStock').value);
    const purchasePrice = parseFloat(document.getElementById('quickEntryPurchasePrice').value) || 0;
    const salePrice = parseFloat(document.getElementById('quickEntrySalePrice').value) || 0;
    const vatRate = parseFloat(document.getElementById('quickEntryVatRate').value) || 21;
    const forSale = document.getElementById('quickEntryForSale').checked;
    const forService = document.getElementById('quickEntryForService').checked;
    
    // Přepočítat sklad z kusů na základní jednotky
    const stockInBaseUnits = stockInPieces * packageSize;
    
    const productData = {
        name,
        barcode,
        description: '',
        categoryId,
        stock: stockInBaseUnits,
        unit,
        packageSize,
        minimalStock,
        purchasePrice,
        salePrice,
        vatRate: vatRate,
        forSale,
        forWork: forService
    };
    
    try {
        const result = await apiCall('products.php', 'POST', productData);
        
        const newProduct = {
            id: result.id,
            ...productData,
            movements: []
        };
        
        products.push(newProduct);
        entryCounter++;
        
        // Aktualizovat počítadlo
        document.getElementById('entryCounter').textContent = entryCounter;
        
        // Vyprázdnit formulář pro další produkt
        document.getElementById('quickEntryName').value = '';
        document.getElementById('quickEntryBarcode').value = '';
        document.getElementById('quickEntryCategoryId').value = '';
        document.getElementById('quickEntryUnit').value = 'ml';
        document.getElementById('quickEntryPackageSize').value = '100';
        document.getElementById('quickEntryStock').value = '0';
        document.getElementById('quickEntryMinimalStock').value = '0';
        document.getElementById('quickEntryPurchasePrice').value = '';
        document.getElementById('quickEntrySalePrice').value = '';
        document.getElementById('quickEntryForSale').checked = false;
        document.getElementById('quickEntryForService').checked = true;
        
        // Focus zpět na název
        document.getElementById('quickEntryName').focus();
        
        // Aktualizovat seznam produktů v pozadí
        renderProducts();
    } catch (error) {
        showNotification('Chyba při ukládání produktu', 'error');
    }
}

function updateNavigationState() {
    // Najít všechny menu položky
    const navItems = document.querySelectorAll('.nav-item');
    
    console.log('Updating navigation, isEntryMode:', isEntryMode, 'Found items:', navItems.length);
    
    navItems.forEach(item => {
        const page = item.getAttribute('data-page');
        
        if (isEntryMode) {
            // V režimu pořizování povolit pouze Produkty, vše ostatní zakázat
            if (page !== 'products') {
                item.style.setProperty('opacity', '0.5', 'important');
                item.style.setProperty('pointer-events', 'none', 'important');
                item.style.setProperty('cursor', 'not-allowed', 'important');
                item.classList.add('disabled');
            } else {
                item.style.setProperty('opacity', '1', 'important');
                item.style.setProperty('pointer-events', 'auto', 'important');
                item.style.setProperty('cursor', 'pointer', 'important');
                item.classList.remove('disabled');
            }
        } else {
            // Normální režim - vše povoleno
            item.style.opacity = '1';
            item.style.pointerEvents = 'auto';
            item.style.cursor = 'pointer';
            item.classList.remove('disabled');
        }
    });
    
    // Aktualizovat tlačítko režimu pořizování
    const entryModeBtn = document.getElementById('entryModeBtn');
    if (entryModeBtn) {
        if (products.length === 0 && !isEntryMode) {
            entryModeBtn.style.display = 'block';
        } else {
            entryModeBtn.style.display = 'none';
        }
    }
    
    // Aktualizovat tlačítko filtrování produktů pod minimem
    updateLowStockFilterButton();
}

function updateLowStockBadge() {
    const badge = document.getElementById('lowStockBadge');
    if (!badge) return;
    
    const lowStockCount = products.filter(p => p.stock < p.minStock).length;
    
    if (lowStockCount > 0) {
        badge.textContent = lowStockCount;
        badge.style.display = 'inline-block';
    } else {
        badge.style.display = 'none';
    }
}

function updateLowStockFilterButton() {
    const filterBtn = document.getElementById('filterLowStockBtn');
    if (!filterBtn) return;
    
    const lowStockCount = products.filter(p => p.stock < p.minStock).length;
    
    if (lowStockCount > 0 && products.length > 0) {
        filterBtn.style.display = 'inline-flex';
        
        // Aktualizovat stav tlačítka
        if (showOnlyLowStock) {
            filterBtn.classList.add('active');
            document.getElementById('filterLowStockText').textContent = 'Zobrazit vše';
        } else {
            filterBtn.classList.remove('active');
            document.getElementById('filterLowStockText').textContent = `Zobrazit pod minimem (${lowStockCount})`;
        }
    } else {
        filterBtn.style.display = 'none';
    }
}

function toggleLowStockFilter() {
    showOnlyLowStock = !showOnlyLowStock;
    
    // Pokud zapínáme filtr, zrušit filtr kategorie
    if (showOnlyLowStock) {
        selectedProductCategory = null;
        // Odznačit aktivní kategorii
        document.querySelectorAll('.category-item').forEach(item => {
            item.classList.remove('active');
        });
    }
    
    renderProducts();
    updateLowStockFilterButton();
}

// ========== EXPORT FUNKCE PRO ÚČETNICTVÍ ==========

// Helper funkce pro stažení CSV
function downloadCSV(csv, filename) {
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function exportRevenueToCSV() {
    let csv = 'Datum,Typ,Částka,Klient,Poznámka\n';
    
    // Tržby z návštěv
    clients.forEach(client => {
        const clientName = client.name || client.firstName || 'Nepojmenovaný klient';
        
        if (client.visits) {
            client.visits.forEach(visit => {
                if (!visit.closed || !visit.price) return;
                const date = new Date(visit.date).toLocaleDateString('cs-CZ');
                const servicesStr = Array.isArray(visit.services) 
                    ? visit.services.map(s => typeof s === 'object' ? s.name : s).join(', ')
                    : visit.services || '';
                csv += `${date},Návštěva,${visit.price},${clientName},"${servicesStr}"\n`;
            });
        }
        
        // Tržby z prodeje produktů
        if (client.purchases) {
            client.purchases.forEach(purchase => {
                const date = new Date(purchase.date).toLocaleDateString('cs-CZ');
                const total = purchase.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                const items = purchase.items.map(i => i.name).join('; ');
                csv += `${date},Prodej produktu,${total},${clientName},"${items}"\n`;
            });
        }
    });
    
    downloadCSV(csv, 'trzby.csv');
}

function exportRevenueToExcel() {
    let content = '<table><thead><tr><th>Datum</th><th>Typ</th><th>Částka</th><th>Klient</th><th>Poznámka</th></tr></thead><tbody>';
    
    clients.forEach(client => {
        const clientName = client.name || client.firstName || 'Nepojmenovaný klient';
        
        if (client.visits) {
            client.visits.forEach(visit => {
                if (!visit.closed || !visit.price) return;
                const date = new Date(visit.date).toLocaleDateString('cs-CZ');
                const servicesStr = Array.isArray(visit.services) 
                    ? visit.services.map(s => typeof s === 'object' ? s.name : s).join(', ')
                    : visit.services || '';
                content += `<tr><td>${date}</td><td>Návštěva</td><td>${visit.price}</td><td>${clientName}</td><td>${servicesStr}</td></tr>`;
            });
        }
        
        if (client.purchases) {
            client.purchases.forEach(purchase => {
                const date = new Date(purchase.date).toLocaleDateString('cs-CZ');
                const total = purchase.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                const items = purchase.items.map(i => i.name).join('; ');
                content += `<tr><td>${date}</td><td>Prodej produktu</td><td>${total}</td><td>${clientName}</td><td>${items}</td></tr>`;
            });
        }
    });
    
    content += '</tbody></table>';
    
    const blob = new Blob([content], { type: 'application/vnd.ms-excel' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'trzby.xls';
    a.click();
}

function exportRevenueDetailToCSV() {
    let csv = 'Datum,Čas,Typ,Klient,Služba/Produkt,Cena,Celkem,Poznámka\n';
    
    clients.forEach(client => {
        const clientName = client.name || client.firstName || 'Nepojmenovaný klient';
        
        // Detailní tržby z návštěv
        if (client.visits) {
            client.visits.forEach(visit => {
                if (!visit.closed || !visit.price) return;
                const date = new Date(visit.date).toLocaleDateString('cs-CZ');
                const time = visit.time || '';
                const servicesStr = Array.isArray(visit.services) 
                    ? visit.services.map(s => typeof s === 'object' ? s.name : s).join(', ')
                    : visit.services || '';
                csv += `${date},${time},Návštěva,${clientName},"${servicesStr}",${visit.price},${visit.price},\n`;
            });
        }
        
        // Detailní tržby z prodejů
        if (client.purchases) {
            client.purchases.forEach(purchase => {
                const date = new Date(purchase.date).toLocaleDateString('cs-CZ');
                const total = purchase.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                
                purchase.items.forEach(item => {
                    csv += `${date},,Produkt,${clientName},${item.name},${item.price} (${item.quantity}x),${total},\n`;
                });
            });
        }
    });
    
    downloadCSV(csv, 'trzby_detail.csv');
}

function exportInventoryToCSV() {
    let csv = 'Název,Kategorie,Množství,Jednotka,Min. stav,Cena nákup,Cena prodej,Poznámka\n';
    
    products.forEach(product => {
        const qty = product.stock !== undefined ? product.stock : (product.quantity || 0);
        const minQty = product.minStock !== undefined ? product.minStock : (product.minQuantity || 1);
        const purchasePrice = product.pricePurchase !== undefined ? product.pricePurchase : (product.purchasePrice || '');
        const salePrice = product.priceRetail !== undefined ? product.priceRetail : (product.priceSale || product.salePrice || '');
        
        // Najít název kategorie
        const category = productCategories.find(c => c.id === product.categoryId);
        const categoryName = category ? category.name : '';
        
        // Escapovat hodnoty s čárkami nebo uvozovkami
        const escapeCsv = (val) => {
            if (!val) return '';
            const str = String(val);
            if (str.includes(',') || str.includes('"') || str.includes('\n')) {
                return `"${str.replace(/"/g, '""')}"`;
            }
            return str;
        };
        
        csv += `${escapeCsv(product.name)},${escapeCsv(categoryName)},${qty},${product.unit},${minQty},${purchasePrice},${salePrice},${escapeCsv(product.description || product.note || '')}\n`;
    });
    
    downloadCSV(csv, 'inventura.csv');
}

function exportInventoryToExcel() {
    let content = '<table><thead><tr><th>Název</th><th>Kategorie</th><th>Množství</th><th>Jednotka</th><th>Min. stav</th><th>Cena nákup</th><th>Cena prodej</th><th>Poznámka</th></tr></thead><tbody>';
    
    products.forEach(product => {
        const qty = product.stock !== undefined ? product.stock : (product.quantity || 0);
        const minQty = product.minStock !== undefined ? product.minStock : (product.minQuantity || 1);
        const purchasePrice = product.pricePurchase !== undefined ? product.pricePurchase : (product.purchasePrice || '');
        const salePrice = product.priceRetail !== undefined ? product.priceRetail : (product.priceSale || product.salePrice || '');
        
        // Najít název kategorie
        const category = productCategories.find(c => c.id === product.categoryId);
        const categoryName = category ? category.name : '';
        
        content += `<tr><td>${product.name}</td><td>${categoryName}</td><td>${qty}</td><td>${product.unit}</td><td>${minQty}</td><td>${purchasePrice}</td><td>${salePrice}</td><td>${product.description || product.note || ''}</td></tr>`;
    });
    
    content += '</tbody></table>';
    
    const blob = new Blob([content], { type: 'application/vnd.ms-excel' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'inventura.xls';
    a.click();
}

function exportLowStockToCSV() {
    let csv = 'Název,Kategorie,Aktuální stav,Min. stav,Chybí,Cena nákup\n';
    
    // Escapovat hodnoty s čárkami nebo uvozovkami
    const escapeCsv = (val) => {
        if (!val) return '';
        const str = String(val);
        if (str.includes(',') || str.includes('"') || str.includes('\n')) {
            return `"${str.replace(/"/g, '""')}"`;
        }
        return str;
    };
    
    products.filter(p => {
        const qty = p.stock !== undefined ? p.stock : (p.quantity || 0);
        const minQty = p.minStock !== undefined ? p.minStock : (p.minQuantity || 1);
        return qty < minQty;
    }).forEach(product => {
        const qty = product.stock !== undefined ? product.stock : (product.quantity || 0);
        const minQty = product.minStock !== undefined ? product.minStock : (product.minQuantity || 1);
        const missing = minQty - qty;
        const purchasePrice = product.pricePurchase !== undefined ? product.pricePurchase : (product.purchasePrice || '');
        
        // Najít název kategorie
        const category = productCategories.find(c => c.id === product.categoryId);
        const categoryName = category ? category.name : '';
        
        csv += `${escapeCsv(product.name)},${escapeCsv(categoryName)},${qty},${minQty},${missing},${purchasePrice}\n`;
    });
    
    downloadCSV(csv, 'nizky_stav.csv');
}

function exportClientsToCSV() {
    let csv = 'Jméno,Email,Telefon,Datum registrace,Celkem návštěv,Celková útrata\n';
    
    clients.forEach(client => {
        const clientName = client.name || client.firstName || 'Nepojmenovaný klient';
        let totalSpent = 0;
        let visitCount = 0;
        
        if (client.visits) {
            client.visits.forEach(visit => {
                if (visit.closed && visit.price) {
                    visitCount++;
                    totalSpent += visit.price || 0;
                }
            });
        }
        
        if (client.purchases) {
            client.purchases.forEach(purchase => {
                totalSpent += purchase.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            });
        }
        
        const regDate = client.createdAt ? new Date(client.createdAt).toLocaleDateString('cs-CZ') : '';
        
        csv += `${clientName},${client.email || ''},${client.phone || ''},${regDate},${visitCount},${totalSpent}\n`;
    });
    
    downloadCSV(csv, 'klienti.csv');
}

function exportClientVisitsToCSV() {
    let csv = 'Klient,Datum,Čas,Služby,Cena,Poznámka\n';
    
    clients.forEach(client => {
        const clientName = client.name || client.firstName || 'Nepojmenovaný klient';
        
        if (client.visits) {
            client.visits.forEach(visit => {
                if (!visit.closed || !visit.price) return;
                const date = new Date(visit.date).toLocaleDateString('cs-CZ');
                const time = visit.time || '';
                const servicesStr = Array.isArray(visit.services) 
                    ? visit.services.map(s => typeof s === 'object' ? s.name : s).join(', ')
                    : visit.services || '';
                
                csv += `${clientName},${date},${time},"${servicesStr}",${visit.price},${visit.note || ''}\n`;
            });
        }
    });
    
    downloadCSV(csv, 'historie_navstev.csv');
}

// ========== ANALYTICKÉ FUNKCE ==========

function generateComparison() {
    const selector = document.getElementById('comparisonPeriod');
    if (!selector) return;
    const selectorValue = selector.value;
    const results = document.getElementById('comparisonResults');
    if (!results) return;
    
    let html = '';
    
    if (selectorValue === 'month') {
        // Porovnání měsíc vs měsíc
        const thisMonth = new Date();
        const lastMonth = new Date(thisMonth.getFullYear(), thisMonth.getMonth() - 1, 1);
        
        const thisMonthRevenue = calculateRevenueForPeriod(thisMonth.getFullYear(), thisMonth.getMonth());
        const lastMonthRevenue = calculateRevenueForPeriod(lastMonth.getFullYear(), lastMonth.getMonth());
        
        const growth = lastMonthRevenue > 0 ? ((thisMonthRevenue - lastMonthRevenue) / lastMonthRevenue * 100).toFixed(1) : 0;
        
        html = `
            <div class="comparison-card">
                <h3>Tento měsíc</h3>
                <div class="comparison-value">${thisMonthRevenue.toLocaleString()} Kč</div>
            </div>
            <div class="comparison-card">
                <h3>Minulý měsíc</h3>
                <div class="comparison-value">${lastMonthRevenue.toLocaleString()} Kč</div>
            </div>
            <div class="comparison-card">
                <h3>Rozdíl</h3>
                <div class="comparison-value ${growth >= 0 ? 'positive' : 'negative'}">${growth}%</div>
            </div>
        `;
    } else if (selectorValue === 'year') {
        // Porovnání rok vs rok
        const thisYear = new Date().getFullYear();
        const lastYear = thisYear - 1;
        
        const thisYearRevenue = calculateRevenueForYear(thisYear);
        const lastYearRevenue = calculateRevenueForYear(lastYear);
        
        const growth = lastYearRevenue > 0 ? ((thisYearRevenue - lastYearRevenue) / lastYearRevenue * 100).toFixed(1) : 0;
        
        html = `
            <div class="comparison-card">
                <h3>Letošní rok (${thisYear})</h3>
                <div class="comparison-value">${thisYearRevenue.toLocaleString()} Kč</div>
            </div>
            <div class="comparison-card">
                <h3>Minulý rok (${lastYear})</h3>
                <div class="comparison-value">${lastYearRevenue.toLocaleString()} Kč</div>
            </div>
            <div class="comparison-card">
                <h3>Rozdíl</h3>
                <div class="comparison-value ${growth >= 0 ? 'positive' : 'negative'}">${growth}%</div>
            </div>
        `;
    } else if (selectorValue === 'quarter') {
        // Porovnání čtvrtletí
        const currentQuarter = Math.floor(new Date().getMonth() / 3);
        const thisQuarterRevenue = calculateRevenueForQuarter(new Date().getFullYear(), currentQuarter);
        const lastQuarterRevenue = currentQuarter > 0 
            ? calculateRevenueForQuarter(new Date().getFullYear(), currentQuarter - 1)
            : calculateRevenueForQuarter(new Date().getFullYear() - 1, 3);
        
        const growth = lastQuarterRevenue > 0 ? ((thisQuarterRevenue - lastQuarterRevenue) / lastQuarterRevenue * 100).toFixed(1) : 0;
        
        html = `
            <div class="comparison-card">
                <h3>Toto čtvrtletí (Q${currentQuarter + 1})</h3>
                <div class="comparison-value">${thisQuarterRevenue.toLocaleString()} Kč</div>
            </div>
            <div class="comparison-card">
                <h3>Minulé čtvrtletí</h3>
                <div class="comparison-value">${lastQuarterRevenue.toLocaleString()} Kč</div>
            </div>
            <div class="comparison-card">
                <h3>Rozdíl</h3>
                <div class="comparison-value ${growth >= 0 ? 'positive' : 'negative'}">${growth}%</div>
            </div>
        `;
    }
    
    console.log('Setting comparison HTML, length:', html.length);
    results.innerHTML = html;
    console.log('Comparison results updated, innerHTML length:', results.innerHTML.length);
}

function calculateRevenueForPeriod(year, month) {
    let total = 0;
    
    clients.forEach(client => {
        if (client.visits) {
            client.visits.forEach(visit => {
                if (!visit.closed || !visit.price) return;
                const d = new Date(visit.date);
                if (d.getFullYear() === year && d.getMonth() === month) {
                    total += visit.price || 0;
                }
            });
        }
        
        if (client.purchases) {
            client.purchases.forEach(purchase => {
                const d = new Date(purchase.date);
                if (d.getFullYear() === year && d.getMonth() === month) {
                    total += purchase.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                }
            });
        }
    });
    
    return total;
}

function calculateRevenueForYear(year) {
    let total = 0;
    
    clients.forEach(client => {
        if (client.visits) {
            client.visits.forEach(visit => {
                if (!visit.closed || !visit.price) return;
                if (new Date(visit.date).getFullYear() === year) {
                    total += visit.price || 0;
                }
            });
        }
        
        if (client.purchases) {
            client.purchases.forEach(purchase => {
                if (new Date(purchase.date).getFullYear() === year) {
                    total += purchase.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                }
            });
        }
    });
    
    return total;
}

function calculateRevenueForQuarter(year, quarter) {
    const startMonth = quarter * 3;
    const endMonth = startMonth + 3;
    let total = 0;
    
    clients.forEach(client => {
        if (client.visits) {
            client.visits.forEach(visit => {
                if (!visit.closed || !visit.price) return;
                const d = new Date(visit.date);
                if (d.getFullYear() === year && d.getMonth() >= startMonth && d.getMonth() < endMonth) {
                    total += visit.price || 0;
                }
            });
        }
        
        if (client.purchases) {
            client.purchases.forEach(purchase => {
                const d = new Date(purchase.date);
                if (d.getFullYear() === year && d.getMonth() >= startMonth && d.getMonth() < endMonth) {
                    total += purchase.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                }
            });
        }
    });
    
    return total;
}

function generateTopItems() {
    // TOP služby - sbíráme ze services pole
    const serviceStats = {};
    
    clients.forEach(client => {
        if (client.visits) {
            client.visits.forEach(visit => {
                if (!visit.closed || !visit.price) return;
                
                // Parsování služeb - může být array nebo string
                let serviceNames = [];
                if (Array.isArray(visit.services)) {
                    serviceNames = visit.services.map(s => {
                        if (typeof s === 'object' && s.name) return s.name;
                        if (typeof s === 'string') return s;
                        const service = services.find(srv => srv.id === s);
                        return service ? service.name : 'Neznámá služba';
                    });
                } else if (typeof visit.services === 'string') {
                    serviceNames = [visit.services];
                }
                
                serviceNames.forEach(serviceName => {
                    if (!serviceName) return;
                    serviceStats[serviceName] = serviceStats[serviceName] || { count: 0, revenue: 0 };
                    serviceStats[serviceName].count++;
                    serviceStats[serviceName].revenue += visit.price || 0;
                });
            });
        }
    });
    
    const topServices = Object.entries(serviceStats)
        .sort((a, b) => b[1].revenue - a[1].revenue)
        .slice(0, 10);
    
    let servicesHTML = '';
    topServices.forEach(([name, stats]) => {
        servicesHTML += `
            <tr>
                <td style="padding: 0.75rem;">${name}</td>
                <td style="padding: 0.75rem; text-align: right;">${stats.count}x</td>
                <td style="padding: 0.75rem; text-align: right; font-weight: 600;">${stats.revenue.toLocaleString()} Kč</td>
            </tr>
        `;
    });
    const servicesTableBody = document.querySelector('#topServicesTable tbody');
    if (servicesTableBody) {
        servicesTableBody.innerHTML = servicesHTML || '<tr><td colspan="3" style="padding: 1rem; text-align: center;">Žádná data</td></tr>';
        console.log('Top services updated:', topServices.length, 'items');
    } else {
        console.warn('topServicesTable tbody not found');
    }
    
    // TOP produkty
    const productStats = {};
    
    clients.forEach(client => {
        if (client.purchases) {
            client.purchases.forEach(purchase => {
                purchase.items.forEach(item => {
                    if (!productStats[item.name]) {
                        productStats[item.name] = { count: 0, revenue: 0 };
                    }
                    productStats[item.name].count += item.quantity || 1;
                    productStats[item.name].revenue += (item.price || 0) * (item.quantity || 1);
                });
            });
        }
    });
    
    const topProducts = Object.entries(productStats)
        .sort((a, b) => b[1].revenue - a[1].revenue)
        .slice(0, 10);
    
    let productsHTML = '';
    topProducts.forEach(([name, stats]) => {
        productsHTML += `
            <tr>
                <td style="padding: 0.75rem;">${name}</td>
                <td style="padding: 0.75rem; text-align: right;">${stats.count}x</td>
                <td style="padding: 0.75rem; text-align: right; font-weight: 600;">${stats.revenue.toLocaleString()} Kč</td>
            </tr>
        `;
    });
    const productsTableBody = document.querySelector('#topProductsTable tbody');
    if (productsTableBody) {
        productsTableBody.innerHTML = productsHTML || '<tr><td colspan="3" style="padding: 1rem; text-align: center;">Žádná data</td></tr>';
        console.log('Top products updated:', topProducts.length, 'items');
    } else {
        console.warn('topProductsTable tbody not found');
    }
    
    // TOP klienti
    const clientStats = {};
    
    clients.forEach(client => {
        let totalSpent = 0;
        let visitCount = 0;
        
        if (client.visits) {
            client.visits.forEach(visit => {
                if (visit.closed && visit.price) {
                    visitCount++;
                    totalSpent += visit.price || 0;
                }
            });
        }
        
        if (client.purchases) {
            client.purchases.forEach(purchase => {
                totalSpent += purchase.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            });
        }
        
        if (totalSpent > 0) {
            const clientName = client.name || client.firstName || 'Nepojmenovaný klient';
            clientStats[clientName] = { visits: visitCount, spent: totalSpent };
        }
    });
    
    const topClients = Object.entries(clientStats)
        .sort((a, b) => b[1].spent - a[1].spent)
        .slice(0, 10);
    
    let clientsHTML = '';
    topClients.forEach(([name, stats]) => {
        clientsHTML += `
            <tr>
                <td style="padding: 0.75rem;">${name}</td>
                <td style="padding: 0.75rem; text-align: right;">${stats.visits}x</td>
                <td style="padding: 0.75rem; text-align: right; font-weight: 600;">${stats.spent.toLocaleString()} Kč</td>
            </tr>
        `;
    });
    const clientsTableBody = document.querySelector('#topClientsTable tbody');
    if (clientsTableBody) {
        clientsTableBody.innerHTML = clientsHTML || '<tr><td colspan="3" style="padding: 1rem; text-align: center;">Žádná data</td></tr>';
        console.log('Top clients updated:', topClients.length, 'items');
    } else {
        console.warn('topClientsTable tbody not found');
    }
}

function generateCostsReport() {
    // Celkové tržby
    let totalRevenue = 0;
    clients.forEach(client => {
        if (client.visits) {
            client.visits.forEach(visit => {
                if (visit.closed && visit.price) {
                    totalRevenue += visit.price || 0;
                }
            });
        }
        if (client.purchases) {
            client.purchases.forEach(purchase => {
                totalRevenue += purchase.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            });
        }
    });
    
    // Celkové nákupy - zatím nejsou implementovány příjmy
    const totalPurchases = 0; // TODO: Implementovat načítání příjmů
    
    // Celková hodnota výdejů materiálu - zatím nejsou implementovány výdeje
    const totalIssues = 0; // TODO: Implementovat načítání výdejů materiálu
    
    // Celkový zisk
    const totalProfit = totalRevenue - totalPurchases - totalIssues;
    
    const revenueEl = document.getElementById('costsRevenue');
    const costsEl = document.getElementById('costsPurchases');
    const issuesEl = document.getElementById('costsIssues');
    const profitEl = document.getElementById('costsProfit');
    
    if (revenueEl) revenueEl.textContent = totalRevenue.toLocaleString() + ' Kč';
    if (costsEl) costsEl.textContent = totalPurchases.toLocaleString() + ' Kč';
    if (issuesEl) issuesEl.textContent = totalIssues.toLocaleString() + ' Kč';
    if (profitEl) profitEl.textContent = totalProfit.toLocaleString() + ' Kč';
    
    // Marže produktů
    const productMargins = products.map(p => {
        if (p.pricePurchase && p.priceSale && p.pricePurchase > 0) {
            const margin = ((p.priceSale - p.pricePurchase) / p.pricePurchase * 100).toFixed(1);
            return { name: p.name, purchase: p.pricePurchase, sale: p.priceSale, margin };
        }
        return null;
    }).filter(p => p !== null).sort((a, b) => b.margin - a.margin).slice(0, 10);
    
    let marginsHTML = '';
    productMargins.forEach(p => {
        marginsHTML += `
            <tr>
                <td style="padding: 0.75rem;">${p.name}</td>
                <td style="padding: 0.75rem; text-align: right;">${p.purchase} Kč</td>
                <td style="padding: 0.75rem; text-align: right;">${p.sale} Kč</td>
                <td style="padding: 0.75rem; text-align: right; font-weight: 600; color: var(--success-color);">${p.margin}%</td>
            </tr>
        `;
    });
    const marginsTable = document.querySelector('#productMarginsTable tbody');
    if (marginsTable) {
        marginsTable.innerHTML = marginsHTML || '<tr><td colspan="4" style="padding: 1rem; text-align: center;">Žádná data</td></tr>';
    }
}

function generateClientStats() {
    // Celkem klientů
    const totalClients = clients.length;
    const totalClientsEl = document.getElementById('statsTotalClients');
    if (totalClientsEl) totalClientsEl.textContent = totalClients;
    
    // Aktivní klienti (návštěva za poslední 3 měsíce)
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    
    const activeClients = clients.filter(client => {
        if (!client.visits) return false;
        return client.visits.some(visit => 
            visit.closed && new Date(visit.date) >= threeMonthsAgo
        );
    }).length;
    const activeClientsEl = document.getElementById('statsActiveClients');
    if (activeClientsEl) activeClientsEl.textContent = activeClients;
    
    // Průměrná útrata
    let totalSpent = 0;
    clients.forEach(client => {
        if (client.visits) {
            client.visits.forEach(visit => {
                if (visit.closed && visit.price) {
                    totalSpent += visit.price || 0;
                }
            });
        }
        if (client.purchases) {
            client.purchases.forEach(purchase => {
                totalSpent += purchase.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            });
        }
    });
    const avgSpending = totalClients > 0 ? Math.round(totalSpent / totalClients) : 0;
    const avgSpendingEl = document.getElementById('statsAvgSpending');
    if (avgSpendingEl) avgSpendingEl.textContent = avgSpending.toLocaleString() + ' Kč';
    
    // Noví klienti tento měsíc
    const thisMonth = new Date();
    const newClientsCount = clients.filter(client => {
        if (!client.createdAt) return false;
        const regDate = new Date(client.createdAt);
        return regDate.getMonth() === thisMonth.getMonth() && 
               regDate.getFullYear() === thisMonth.getFullYear();
    }).length;
    const newClientsEl = document.getElementById('statsNewClients');
    if (newClientsEl) newClientsEl.textContent = newClientsCount;
    
    // Neaktivní klienti (3+ měsíce bez návštěvy)
    const inactiveClients = clients.filter(client => {
        if (!client.visits || client.visits.length === 0) return true;
        
        const closedVisits = client.visits.filter(v => v.closed);
        if (closedVisits.length === 0) return true;
        
        const lastVisit = closedVisits.sort((a, b) => new Date(b.date) - new Date(a.date))[0];
        return new Date(lastVisit.date) < threeMonthsAgo;
    }).slice(0, 10);
    
    let inactiveHTML = '';
    inactiveClients.forEach(client => {
        let lastDate = 'Nikdy';
        if (client.visits && client.visits.length > 0) {
            const closedVisits = client.visits.filter(v => v.closed);
            if (closedVisits.length > 0) {
                const lastVisit = closedVisits.sort((a, b) => new Date(b.date) - new Date(a.date))[0];
                lastDate = new Date(lastVisit.date).toLocaleDateString('cs-CZ');
            }
        }
        
        const clientName = client.name || client.firstName || 'Nepojmenovaný klient';
        inactiveHTML += `
            <tr>
                <td style="padding: 0.75rem;">${clientName}</td>
                <td style="padding: 0.75rem;">${lastDate}</td>
                <td style="padding: 0.75rem;">${client.phone || ''}</td>
            </tr>
        `;
    });
    const inactiveTable = document.querySelector('#inactiveClientsTable tbody');
    if (inactiveTable) {
        inactiveTable.innerHTML = inactiveHTML || '<tr><td colspan="3" style="padding: 1rem; text-align: center;">Žádná data</td></tr>';
    }
}
