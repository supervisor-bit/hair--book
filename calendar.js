// Globální proměnné
let clients = [];
let services = [];
let appointments = [];
let currentWeekStart = null;
let currentAppointment = null;

// Konstanty
const OPENING_HOUR = 8;
const CLOSING_HOUR = 18;
const SLOT_DURATION = 15; // minuty

// Inicializace
document.addEventListener('DOMContentLoaded', async function() {
    console.log('🚀 Calendar initializing...');
    
    // Kontrola přihlášení
    const isLoggedIn = sessionStorage.getItem('hairbook_logged_in') || localStorage.getItem('hairbook_remember');
    console.log('🔐 Logged in?', isLoggedIn);
    
    if (!isLoggedIn) {
        console.warn('⚠️ Not logged in, redirecting...');
        // Pro testování zatím přeskočíme redirect
        // window.location.href = 'login.html';
        // return;
    }

    // Načíst data
    console.log('📡 Loading data...');
    await loadData();
    
    // Nastavit aktuální týden
    console.log('📅 Setting up current week...');
    goToToday();
});

async function loadData() {
    try {
        console.log('Fetching clients, services, appointments...');
        const [clientsRes, servicesRes, appointmentsRes] = await Promise.all([
            fetch('api/clients.php'),
            fetch('api/services.php'),
            fetch('api/appointments.php')
        ]);

        console.log('Response status:', clientsRes.status, servicesRes.status, appointmentsRes.status);

        clients = await clientsRes.json();
        services = await servicesRes.json();
        appointments = await appointmentsRes.json() || [];

        console.log('✅ Loaded:', clients.length, 'clients,', services.length, 'services,', appointments.length, 'appointments');

        // Naplnit selecty
        populateClientSelect();
        populateServiceSelect();
    } catch (error) {
        console.error('❌ Chyba při načítání dat:', error);
        showNotification('Chyba při načítání dat', 'error');
    }
}

function populateClientSelect() {
    const select = document.getElementById('appointmentClientId');
    select.innerHTML = '<option value="">-- Vyberte klienta --</option>';
    
    clients.forEach(client => {
        const option = document.createElement('option');
        option.value = client.id;
        option.textContent = `${client.firstName} ${client.lastName}`;
        select.appendChild(option);
    });
}

function populateServiceSelect() {
    const select = document.getElementById('appointmentServiceId');
    select.innerHTML = '<option value="">-- Vyberte službu --</option>';
    
    services.forEach(service => {
        const option = document.createElement('option');
        option.value = service.id;
        option.dataset.duration = service.duration || 60;
        option.textContent = `${service.name} (${service.price} Kč)`;
        select.appendChild(option);
    });
}

function updateServiceDuration() {
    const select = document.getElementById('appointmentServiceId');
    const selectedOption = select.options[select.selectedIndex];
    
    if (selectedOption && selectedOption.dataset.duration) {
        document.getElementById('appointmentDuration').value = selectedOption.dataset.duration;
    }
}

// Navigace týdnů
function goToToday() {
    console.log('📆 goToToday() called');
    const today = new Date();
    const dayOfWeek = today.getDay();
    const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // Začít pondělím
    
    currentWeekStart = new Date(today);
    currentWeekStart.setDate(today.getDate() + diff);
    currentWeekStart.setHours(0, 0, 0, 0);
    
    console.log('Current week starts:', currentWeekStart.toLocaleDateString('cs-CZ'));
    
    renderCalendar();
}

function changeWeek(direction) {
    currentWeekStart.setDate(currentWeekStart.getDate() + (direction * 7));
    renderCalendar();
}

// Vykreslení kalendáře
function renderCalendar() {
    console.log('🎨 renderCalendar() called');
    const grid = document.getElementById('calendarGrid');
    
    if (!grid) {
        console.error('❌ calendarGrid element not found!');
        return;
    }
    
    grid.innerHTML = '';
    
    // Aktualizovat nadpis
    updateWeekTitle();
    
    // Kontrola, zda není příliš daleko v budoucnosti (max 6 týdnů)
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + (6 * 7));
    
    // Hlavička - prázdný prostor pro časy
    const emptyCorner = document.createElement('div');
    emptyCorner.className = 'day-header';
    emptyCorner.style.background = '#f9fafb';
    grid.appendChild(emptyCorner);
    
    // Hlavička - dny v týdnu
    const dayNames = ['Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek', 'Sobota', 'Neděle'];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (let i = 0; i < 7; i++) {
        const date = new Date(currentWeekStart);
        date.setDate(currentWeekStart.getDate() + i);
        
        const dayHeader = document.createElement('div');
        dayHeader.className = 'day-header';
        if (date.getTime() === today.getTime()) {
            dayHeader.classList.add('today');
        }
        
        dayHeader.innerHTML = `
            <div class="day-name">${dayNames[i]}</div>
            <div class="day-date">${date.getDate()}.${date.getMonth() + 1}.</div>
        `;
        
        grid.appendChild(dayHeader);
    }
    
    // Časové sloty
    const now = new Date();
    
    for (let hour = OPENING_HOUR; hour < CLOSING_HOUR; hour++) {
        for (let minute = 0; minute < 60; minute += SLOT_DURATION) {
            // Časový label
            const timeLabel = document.createElement('div');
            timeLabel.className = 'time-label';
            timeLabel.textContent = minute === 0 ? `${hour}:00` : '';
            grid.appendChild(timeLabel);
            
            // Sloty pro každý den
            for (let day = 0; day < 7; day++) {
                const slotDate = new Date(currentWeekStart);
                slotDate.setDate(currentWeekStart.getDate() + day);
                slotDate.setHours(hour, minute, 0, 0);
                
                const slot = document.createElement('div');
                slot.className = 'time-slot';
                slot.dataset.date = slotDate.toISOString();
                
                // Označit minulé sloty
                if (slotDate < now || slotDate > maxDate) {
                    slot.classList.add('past');
                } else {
                    slot.onclick = () => openNewAppointment(slotDate);
                }
                
                grid.appendChild(slot);
            }
        }
    }
    
    // Vykreslit rezervace
    renderAppointments();
}

function renderAppointments() {
    const weekEnd = new Date(currentWeekStart);
    weekEnd.setDate(weekEnd.getDate() + 7);
    
    appointments.forEach(apt => {
        const aptDate = new Date(apt.date + 'T' + apt.time);
        
        // Zobrazit pouze rezervace v aktuálním týdnu
        if (aptDate >= currentWeekStart && aptDate < weekEnd) {
            const dayOffset = Math.floor((aptDate - currentWeekStart) / (1000 * 60 * 60 * 24));
            const slot = findSlotElement(aptDate);
            
            if (slot) {
                const service = services.find(s => s.id === apt.serviceId);
                const client = clients.find(c => c.id === apt.clientId);
                
                // Rotace barev služeb (1-5)
                const serviceColor = ((apt.serviceId - 1) % 5) + 1;
                
                const aptElement = document.createElement('div');
                aptElement.className = `appointment service-${serviceColor}`;
                aptElement.style.height = `${(apt.duration / SLOT_DURATION) * 60 - 4}px`;
                aptElement.onclick = (e) => {
                    e.stopPropagation();
                    showAppointmentDetail(apt);
                };
                
                aptElement.innerHTML = `
                    <div class="appointment-time">${apt.time.substring(0, 5)}</div>
                    <div class="appointment-client">${client ? `${client.firstName} ${client.lastName}` : 'Neznámý'}</div>
                    <div class="appointment-service">${service ? service.name : 'Služba'}</div>
                    ${client && client.phone ? `<div class="appointment-phone"><i class="fas fa-phone"></i> ${client.phone}</div>` : ''}
                `;
                
                slot.appendChild(aptElement);
            }
        }
    });
}

function findSlotElement(date) {
    const slots = document.querySelectorAll('.time-slot');
    for (let slot of slots) {
        const slotDate = new Date(slot.dataset.date);
        if (slotDate.getTime() === date.getTime()) {
            return slot;
        }
    }
    return null;
}

function updateWeekTitle() {
    const weekEnd = new Date(currentWeekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const startStr = currentWeekStart.toLocaleDateString('cs-CZ', options);
    const endStr = weekEnd.toLocaleDateString('cs-CZ', options);
    
    document.getElementById('weekTitle').textContent = `${startStr} - ${endStr}`;
}

// Modaly
function showNewAppointmentModal() {
    document.getElementById('appointmentModalTitle').textContent = 'Nová rezervace';
    document.getElementById('appointmentId').value = '';
    document.getElementById('appointmentClientId').value = '';
    document.getElementById('appointmentServiceId').value = '';
    document.getElementById('appointmentDate').value = '';
    document.getElementById('appointmentTime').value = '09:00';
    document.getElementById('appointmentDuration').value = '60';
    document.getElementById('appointmentNote').value = '';
    document.getElementById('appointmentModal').classList.add('show');
}

function openNewAppointment(date) {
    document.getElementById('appointmentModalTitle').textContent = 'Nová rezervace';
    document.getElementById('appointmentId').value = '';
    document.getElementById('appointmentClientId').value = '';
    document.getElementById('appointmentServiceId').value = '';
    
    const dateStr = date.toISOString().split('T')[0];
    const timeStr = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    
    document.getElementById('appointmentDate').value = dateStr;
    document.getElementById('appointmentTime').value = timeStr;
    document.getElementById('appointmentDuration').value = '60';
    document.getElementById('appointmentNote').value = '';
    document.getElementById('appointmentModal').classList.add('show');
}

function closeAppointmentModal() {
    document.getElementById('appointmentModal').classList.remove('show');
}

async function saveAppointment(event) {
    event.preventDefault();
    
    const id = document.getElementById('appointmentId').value;
    const appointment = {
        clientId: parseInt(document.getElementById('appointmentClientId').value),
        serviceId: parseInt(document.getElementById('appointmentServiceId').value),
        date: document.getElementById('appointmentDate').value,
        time: document.getElementById('appointmentTime').value,
        duration: parseInt(document.getElementById('appointmentDuration').value),
        note: document.getElementById('appointmentNote').value
    };
    
    try {
        const method = id ? 'PUT' : 'POST';
        if (id) appointment.id = parseInt(id);
        
        const response = await fetch('api/appointments.php', {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(appointment)
        });
        
        if (response.ok) {
            showNotification('Rezervace uložena', 'success');
            closeAppointmentModal();
            await loadData();
            renderCalendar();
        } else {
            showNotification('Chyba při ukládání rezervace', 'error');
        }
    } catch (error) {
        console.error('Chyba:', error);
        showNotification('Chyba při ukládání rezervace', 'error');
    }
}

function showAppointmentDetail(apt) {
    currentAppointment = apt;
    const service = services.find(s => s.id === apt.serviceId);
    const client = clients.find(c => c.id === apt.clientId);
    
    const content = document.getElementById('appointmentDetailContent');
    content.innerHTML = `
        <div style="margin-bottom: 1.5rem;">
            <h4 style="margin: 0 0 0.5rem 0; color: #667eea;">
                <i class="fas fa-user"></i> ${client ? `${client.firstName} ${client.lastName}` : 'Neznámý klient'}
            </h4>
            ${client && client.phone ? `<p style="color: #6b7280; margin: 0.25rem 0;"><i class="fas fa-phone"></i> ${client.phone}</p>` : ''}
            ${client && client.email ? `<p style="color: #6b7280; margin: 0.25rem 0;"><i class="fas fa-envelope"></i> ${client.email}</p>` : ''}
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin-bottom: 1.5rem;">
            <div>
                <div style="color: #9ca3af; font-size: 0.875rem; margin-bottom: 0.25rem;">Datum</div>
                <div style="font-weight: 600;"><i class="fas fa-calendar"></i> ${new Date(apt.date).toLocaleDateString('cs-CZ')}</div>
            </div>
            <div>
                <div style="color: #9ca3af; font-size: 0.875rem; margin-bottom: 0.25rem;">Čas</div>
                <div style="font-weight: 600;"><i class="fas fa-clock"></i> ${apt.time.substring(0, 5)}</div>
            </div>
        </div>
        
        <div style="margin-bottom: 1.5rem;">
            <div style="color: #9ca3af; font-size: 0.875rem; margin-bottom: 0.25rem;">Služba</div>
            <div style="font-weight: 600; color: #667eea;">
                <i class="fas fa-cut"></i> ${service ? service.name : 'Neznámá služba'}
            </div>
            <div style="color: #6b7280; font-size: 0.875rem; margin-top: 0.25rem;">
                Trvání: ${apt.duration} min | Cena: ${service ? service.price : 0} Kč
            </div>
        </div>
        
        ${apt.note ? `
            <div>
                <div style="color: #9ca3af; font-size: 0.875rem; margin-bottom: 0.25rem;">Poznámka</div>
                <div style="padding: 0.75rem; background: #f9fafb; border-radius: 0.5rem; color: #374151;">
                    ${apt.note}
                </div>
            </div>
        ` : ''}
    `;
    
    document.getElementById('appointmentDetailModal').classList.add('show');
}

function closeAppointmentDetailModal() {
    document.getElementById('appointmentDetailModal').classList.remove('show');
    currentAppointment = null;
}

function editCurrentAppointment() {
    if (!currentAppointment) return;
    
    document.getElementById('appointmentModalTitle').textContent = 'Upravit rezervaci';
    document.getElementById('appointmentId').value = currentAppointment.id;
    document.getElementById('appointmentClientId').value = currentAppointment.clientId;
    document.getElementById('appointmentServiceId').value = currentAppointment.serviceId;
    document.getElementById('appointmentDate').value = currentAppointment.date;
    document.getElementById('appointmentTime').value = currentAppointment.time;
    document.getElementById('appointmentDuration').value = currentAppointment.duration;
    document.getElementById('appointmentNote').value = currentAppointment.note || '';
    
    closeAppointmentDetailModal();
    document.getElementById('appointmentModal').classList.add('show');
}

async function deleteCurrentAppointment() {
    if (!currentAppointment) return;
    
    if (!confirm('Opravdu chcete smazat tuto rezervaci?')) return;
    
    try {
        const response = await fetch('api/appointments.php', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: currentAppointment.id })
        });
        
        if (response.ok) {
            showNotification('Rezervace smazána', 'success');
            closeAppointmentDetailModal();
            await loadData();
            renderCalendar();
        } else {
            showNotification('Chyba při mazání rezervace', 'error');
        }
    } catch (error) {
        console.error('Chyba:', error);
        showNotification('Chyba při mazání rezervace', 'error');
    }
}

// Notifikace
function showNotification(message, type = 'info') {
    // Použijeme stejný systém notifikací jako v hlavní aplikaci
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        border-radius: 0.5rem;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Odhlášení
function logout() {
    sessionStorage.removeItem('hairbook_logged_in');
    localStorage.removeItem('hairbook_remember');
    window.location.href = 'login.html';
}
