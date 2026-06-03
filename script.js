/* --- DATABASES & GLOBAL STATE --- */
let totalCustomersToday = 19; 
let cart = []; // Cart State
let sessionOrderActive = null; // Session ordering state

// Activity Logs DB
let activityLogsDB = [
    { id: 'l1', staffName: 'Admin User', action: 'System Initialization', details: 'System booted up securely', timestamp: new Date().getTime() - 86400000, date: new Date(new Date().getTime() - 86400000).toISOString().split('T')[0], timeStr: '08:00 AM' }
];

const menuDB = [
    // Beverages
    { id: 'm1', name: 'Coffee', price: 40, category: 'beverages', icon: 'fa-mug-hot', available: true, stock: 45, threshold: 10, unit: 'cups' },
    { id: 'm2', name: 'Coke', price: 35, category: 'beverages', icon: 'fa-wine-glass', available: true, stock: 24, threshold: 10, unit: 'bottles' },
    { id: 'm3', name: 'Hot Americano', price: 55, category: 'beverages', icon: 'fa-mug-hot', available: true, stock: 30, threshold: 5, unit: 'cups' },
    { id: 'm4', name: 'Hot Chocolate', price: 60, category: 'beverages', icon: 'fa-mug-hot', available: true, stock: 25, threshold: 5, unit: 'cups' },
    { id: 'm5', name: 'Hot Latte', price: 80, category: 'beverages', icon: 'fa-mug-hot', available: true, stock: 20, threshold: 5, unit: 'cups' },
    { id: 'm6', name: 'Hot Mocha', price: 95, category: 'beverages', icon: 'fa-mug-hot', available: true, stock: 15, threshold: 5, unit: 'cups' },
    { id: 'm7', name: 'Iced Americano', price: 65, category: 'beverages', icon: 'fa-glass-water', available: true, stock: 35, threshold: 10, unit: 'cups' },
    { id: 'm8', name: 'Iced Chocolate', price: 110, category: 'beverages', icon: 'fa-glass-water', available: true, stock: 18, threshold: 5, unit: 'cups' },
    { id: 'm9', name: 'Iced Latte', price: 95, category: 'beverages', icon: 'fa-glass-water', available: true, stock: 22, threshold: 5, unit: 'cups' },
    { id: 'm10', name: 'Iced Mocha', price: 110, category: 'beverages', icon: 'fa-glass-water', available: true, stock: 12, threshold: 5, unit: 'cups' },
    { id: 'm11', name: 'Juice', price: 30, category: 'beverages', icon: 'fa-glass-water', available: true, stock: 40, threshold: 10, unit: 'glasses' },
    { id: 'm12', name: 'Mango Shake', price: 90, category: 'beverages', icon: 'fa-glass-water', available: true, stock: 8, threshold: 10, unit: 'cups' }, 
    { id: 'm13', name: 'Mineral Water (1L)', price: 35, category: 'beverages', icon: 'fa-bottle-water', available: true, stock: 50, threshold: 15, unit: 'bottles' },
    { id: 'm14', name: 'Bottled Water', price: 20, category: 'beverages', icon: 'fa-bottle-water', available: true, stock: 60, threshold: 20, unit: 'bottles' },
    { id: 'm42', name: 'Calamansi Juice', price: 29, category: 'beverages', icon: 'fa-glass-water', available: true, stock: 30, threshold: 10, unit: 'glasses' },
    { id: 'm16', name: 'Iced Cappuccino', price: 100, category: 'beverages', icon: 'fa-glass-water', available: true, stock: 15, threshold: 5, unit: 'cups' },
    { id: 'm17', name: 'Orange Juice', price: 65, category: 'beverages', icon: 'fa-glass-water', available: true, stock: 25, threshold: 10, unit: 'glasses' },
    { id: 'm18', name: 'Pineapple Juice', price: 60, category: 'beverages', icon: 'fa-glass-water', available: true, stock: 20, threshold: 10, unit: 'glasses' },
    { id: 'm19', name: 'Royal', price: 35, category: 'beverages', icon: 'fa-bottle-water', available: true, stock: 18, threshold: 10, unit: 'bottles' },
    { id: 'm20', name: 'Sprite', price: 35, category: 'beverages', icon: 'fa-bottle-water', available: true, stock: 0, threshold: 10, unit: 'bottles' },
    
    // Meals
    { id: 'm23', name: 'Bangsilog', price: 120, category: 'meals', icon: 'fa-bowl-food', available: true, stock: 12, threshold: 5, unit: 'plates' },
    { id: 'm24', name: 'Beef Caldereta', price: 125, category: 'meals', icon: 'fa-bowl-food', available: true, stock: 5, threshold: 5, unit: 'plates' },
    { id: 'm25', name: 'Chicken Alfredo Bowl', price: 130, category: 'meals', icon: 'fa-bowl-food', available: true, stock: 14, threshold: 5, unit: 'bowls' },
    { id: 'm26', name: 'Chicksilog', price: 105, category: 'meals', icon: 'fa-bowl-food', available: true, stock: 20, threshold: 5, unit: 'plates' },
    { id: 'm28', name: 'Fried Chicken', price: 110, category: 'meals', icon: 'fa-bowl-food', available: true, stock: 25, threshold: 10, unit: 'pcs' },
    { id: 'm31', name: 'Pancit Bihon', price: 75, category: 'meals', icon: 'fa-bowl-food', available: true, stock: 20, threshold: 5, unit: 'plates' },
    { id: 'm33', name: 'Tapsilog', price: 95, category: 'meals', icon: 'fa-bowl-food', available: true, stock: 30, threshold: 10, unit: 'plates' },
    // New Meals Added
    { id: 'm43', name: 'Tocilog', price: 95, category: 'meals', icon: 'fa-bowl-food', available: true, stock: 20, threshold: 5, unit: 'plates' },
    { id: 'm44', name: 'Kare Kare', price: 150, category: 'meals', icon: 'fa-bowl-food', available: true, stock: 15, threshold: 5, unit: 'bowls' },
    { id: 'm45', name: 'Sisilog', price: 105, category: 'meals', icon: 'fa-bowl-food', available: true, stock: 20, threshold: 5, unit: 'plates' },
    { id: 'm49', name: 'Longsilog', price: 95, category: 'meals', icon: 'fa-bowl-food', available: true, stock: 20, threshold: 5, unit: 'plates' },

    // Snacks
    { id: 'm34', name: 'Burger', price: 50, category: 'snacks', icon: 'fa-burger', available: true, stock: 25, threshold: 10, unit: 'pcs' },
    { id: 'm35', name: 'Lumpia Shanghai', price: 80, category: 'snacks', icon: 'fa-utensils', available: true, stock: 40, threshold: 15, unit: 'pcs' },
    { id: 'm36', name: 'Onion Rings', price: 60, category: 'snacks', icon: 'fa-utensils', available: true, stock: 20, threshold: 10, unit: 'baskets' },
    // New Snacks Added
    { id: 'm46', name: 'Chicaron Bulaklak', price: 120, category: 'snacks', icon: 'fa-utensils', available: true, stock: 15, threshold: 5, unit: 'baskets' },
    { id: 'm47', name: 'Chicken Nuggets', price: 80, category: 'snacks', icon: 'fa-utensils', available: true, stock: 30, threshold: 10, unit: 'pcs' },
    { id: 'm48', name: 'Garlic Fries', price: 70, category: 'snacks', icon: 'fa-utensils', available: true, stock: 25, threshold: 10, unit: 'baskets' },

    // Desserts
    { id: 'm39', name: 'Halo-Halo', price: 90, category: 'desserts', icon: 'fa-ice-cream', available: true, stock: 15, threshold: 5, unit: 'cups' },
];

let receivablesDB = [
    { id: '1', name: 'Rybelle', phone: '09089089098', amount: 1099.96, dueDate: '2026-06-06' },
    { id: '6', name: 'mark d.', phone: '09991234567', amount: 450.50, dueDate: '2026-06-07' }
];

let activeOrdersDB = [
    {
        id: 'o1', customer: 'Student', space: 'Regular Lounge', addedBy: 'Saver', date: 'June 02, 2026 03:22 PM',
        items: [
            { id: 'm42', name: 'Calamansi Juice', price: 29.00, qty: 1, status: 'Preparing' },
            { id: 'm14', name: 'Bottled Water', price: 20.00, qty: 1, status: 'Preparing' }
        ]
    }
];

let staffDB = [
    { name: 'Admin User', username: 'admin', role: 'admin' },
    { name: 'Staff Member', username: 'staff1', role: 'staff' }
];

let expensesDB = [
    { id: 'e1', name: 'Restock Coffee Beans', amount: 1250.00, date: '2026-06-01' },
    { id: 'e2', name: 'Cleaning Supplies', amount: 350.00, date: '2026-06-02' }
];

/* --- INITIALIZATION --- */
document.addEventListener("DOMContentLoaded", () => {
    const dateOptions = { month: 'long', year: 'numeric' };
    document.getElementById('records-month-display').innerText = new Date().toLocaleDateString('en-US', dateOptions);

    const now = new Date().getTime();
    document.getElementById('customer-kurt').setAttribute('data-time-in', now - (4 * 60 * 60 * 1000) - (12 * 60 * 1000)); 
    document.getElementById('customer-maria').setAttribute('data-time-in', now - (2 * 60 * 60 * 1000) - (27 * 60 * 1000)); 
    
    document.getElementById('total-customers-display').innerText = totalCustomersToday;
    updateDashboardHeaderStats();

    renderMenuDB(); 
    renderStockDB();
    applyRecordsFilters(); 
    renderReceivables();
    renderActiveOrdersList();
    renderDailyBalance();
    
    const isoToday = new Date().toISOString().split('T')[0];
    document.getElementById('exp-date-input').value = isoToday;
    document.getElementById('exp-start').value = isoToday;
    document.getElementById('exp-end').value = isoToday;
    document.getElementById('log-date-filter').value = isoToday;
    
    renderActivityLogs();

    // Dashboard Live Clock Ticker
    setInterval(() => {
        document.querySelectorAll('.session-card').forEach(card => {
            let timeIn = parseInt(card.getAttribute('data-time-in'));
            if(timeIn) {
                let diff = new Date().getTime() - timeIn;
                let h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                let m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                let s = Math.floor((diff % (1000 * 60)) / 1000);
                let durDisplay = card.querySelector('.duration-display');
                if(durDisplay) {
                    durDisplay.innerText = 
                        (h < 10 ? "0" + h : h) + ":" + 
                        (m < 10 ? "0" + m : m) + ":" + 
                        (s < 10 ? "0" + s : s);
                }
            }
        });
    }, 1000);
});

/* --- STAFF ACTIVITY LOGGING SYSTEM --- */
function logActivity(action, details) {
    let staffName = document.getElementById('profile-name').innerText;
    if (!staffName) staffName = 'System';
    
    let now = new Date();
    activityLogsDB.unshift({
        id: 'log-' + now.getTime(),
        staffName: staffName,
        action: action,
        details: details,
        timestamp: now.getTime(),
        date: now.toISOString().split('T')[0],
        timeStr: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    
    if (currentUserRole === 'admin') {
        renderActivityLogs();
    }
}

function renderActivityLogs() {
    const container = document.getElementById('admin-logs-container');
    if(!container) return;
    
    const dateFilter = document.getElementById('log-date-filter').value;
    const staffFilter = document.getElementById('log-staff-filter').value;
    
    let filtered = activityLogsDB.filter(log => {
        let matchDate = dateFilter ? log.date === dateFilter : true;
        let matchStaff = staffFilter !== 'all' ? log.staffName === staffFilter : true;
        return matchDate && matchStaff;
    });

    let html = '';
    if(filtered.length === 0) {
        html = `<div style="text-align:center; padding: 20px; color:var(--text-sub); font-size:13px; background: white; border-radius: 10px; border: 1px solid var(--border-color);">No activity logs found.</div>`;
    } else {
        filtered.forEach(log => {
            html += `
            <div style="background: white; padding: 12px 15px; border-radius: 10px; border-left: 4px solid var(--primary-gold); border-top: 1px solid var(--border-color); border-right: 1px solid var(--border-color); border-bottom: 1px solid var(--border-color); box-shadow: 0 2px 5px rgba(0,0,0,0.02);">
                <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
                    <strong style="font-size:13px; color:var(--primary-dark);">${log.action}</strong>
                    <span style="font-size:11px; color:var(--text-sub);">${log.date} ${log.timeStr}</span>
                </div>
                <div style="font-size:12px; color:var(--text-main); margin-bottom:6px;">${log.details}</div>
                <div style="font-size:11px; font-weight:600; color:var(--action-blue);"><i class="fa-regular fa-user"></i> ${log.staffName}</div>
            </div>`;
        });
    }
    container.innerHTML = html;
    document.getElementById('log-summary-output').innerText = "Click generate to see a summary of filtered logs.";
}

function generateActivitySummary() {
    const dateFilter = document.getElementById('log-date-filter').value;
    const staffFilter = document.getElementById('log-staff-filter').value;
    
    let filtered = activityLogsDB.filter(log => {
        let matchDate = dateFilter ? log.date === dateFilter : true;
        let matchStaff = staffFilter !== 'all' ? log.staffName === staffFilter : true;
        return matchDate && matchStaff;
    });

    if(filtered.length === 0) {
        document.getElementById('log-summary-output').innerText = "No logs available to summarize for this filter.";
        return;
    }

    let actionCounts = {};
    let staffCounts = {};
    
    filtered.forEach(log => {
        actionCounts[log.action] = (actionCounts[log.action] || 0) + 1;
        staffCounts[log.staffName] = (staffCounts[log.staffName] || 0) + 1;
    });

    let summaryHtml = `<strong style="color:var(--primary-dark);">Total Actions Logged: ${filtered.length}</strong><br><br>`;
    
    summaryHtml += `<em>Actions by Staff:</em><br>`;
    for(let staff in staffCounts) {
        summaryHtml += `- <span style="font-weight:500;">${staff}:</span> ${staffCounts[staff]} actions<br>`;
    }

    summaryHtml += `<br><em>Breakdown by Action Type:</em><br>`;
    for(let action in actionCounts) {
        summaryHtml += `- <span style="font-weight:500;">${action}:</span> ${actionCounts[action]} times<br>`;
    }

    document.getElementById('log-summary-output').innerHTML = summaryHtml;
}

/* --- CART & ORDER LOGIC --- */
function addToCart(id) {
    const item = menuDB.find(m => m.id === id);
    if (!item || item.stock <= 0) {
        showToast("Item is out of stock or unavailable.", "error");
        return;
    }

    const existing = cart.find(c => c.id === id);
    if (existing) {
        if (existing.qty < item.stock) {
            existing.qty++;
        } else {
            showToast("Not enough stock available!", "warning");
            return;
        }
    } else {
        cart.push({ ...item, qty: 1 });
    }
    
    updateCartBadge();
    showToast(`${item.name} added to cart`, "success");
}

function updateCartBadge() {
    const badge = document.getElementById('cart-badge');
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    badge.innerText = count;
    badge.style.opacity = count > 0 ? '1' : '0';
}

function changeCartQty(id, delta) {
    const index = cart.findIndex(c => c.id === id);
    if (index > -1) {
         const item = menuDB.find(m => m.id === id);
         let newQty = cart[index].qty + delta;
         
         if (newQty > item.stock) {
             showToast("Not enough stock!", "warning");
             return;
         }
         if (newQty <= 0) {
             cart.splice(index, 1);
         } else {
             cart[index].qty = newQty;
         }
         
         updateCartBadge();
         renderCart();
    }
}

function openCart() {
    navTo('cart');
    renderCart();
}

function clearSessionOrder() {
    sessionOrderActive = null;
    renderCart();
    showToast('Switched to Walk-in order', 'info');
}

function renderCart() {
    const content = document.getElementById('cart-view-content');
    
    if (cart.length === 0) {
        content.innerHTML = `
            <div class="empty-cart-state" style="margin-top: 50px;">
                <div style="font-size: 40px; margin-bottom: 10px; color: #cbd5e1;"><i class="fa-solid fa-cart-shopping"></i></div>
                <div>Your cart is empty</div>
                <button class="btn-action-blue" style="margin-top:20px;" onclick="goToOrders()">Browse Menu</button>
            </div>
        `;
        return;
    }

    let total = 0;
    let itemsHtml = cart.map(item => {
        total += (item.price * item.qty);
        return `
        <div class="cart-existing-item">
            <div class="cart-existing-item-info">
                <h4>${item.name}</h4>
                <p>₱${item.price.toFixed(2)}</p>
            </div>
            <div class="cart-existing-item-right">
                <div style="display:flex; align-items:center; gap:10px; background:#f1f5f9; padding:4px 8px; border-radius:8px;">
                    <i class="fa-solid fa-minus" style="cursor:pointer; color:var(--text-sub); font-size:12px;" onclick="changeCartQty('${item.id}', -1)"></i>
                    <span style="font-weight:600; font-size:14px; width:15px; text-align:center;">${item.qty}</span>
                    <i class="fa-solid fa-plus" style="cursor:pointer; color:var(--primary-dark); font-size:12px;" onclick="changeCartQty('${item.id}', 1)"></i>
                </div>
                <div class="cart-existing-item-price">₱${(item.price * item.qty).toFixed(2)}</div>
            </div>
        </div>`;
    }).join('');

    let sessionTarget = sessionOrderActive 
        ? `Ordering for: <strong style="color:var(--primary-dark)">${sessionOrderActive.name}</strong> <span style="margin-left:8px; font-size:10px; padding:4px 8px; background:#fee2e2; color:#dc2626; border-radius:6px; cursor:pointer;" onclick="clearSessionOrder()">Cancel</span>` 
        : `Ordering as <strong style="color:var(--primary-dark)">Walk-in</strong>`;

    content.innerHTML = `
        <div class="section-heading">Cart Items</div>
        <div class="new-items-container">${itemsHtml}</div>
        
        <div class="cart-bottom-fixed">
            <div style="font-size:12px; color:var(--text-sub); margin-bottom:10px; text-align:center;">${sessionTarget}</div>
            <div class="cart-bottom-total">
                <span>Total Amount</span>
                <strong>₱${total.toFixed(2)}</strong>
            </div>
            <button class="btn-place-order" onclick="placeOrder()">Confirm & Place Order</button>
        </div>
    `;
}

function placeOrder() {
    if(cart.length === 0) return;
    
    let newOrder = {
        id: 'o' + new Date().getTime(),
        customer: sessionOrderActive ? sessionOrderActive.name : 'Walk-in Customer',
        space: sessionOrderActive ? sessionOrderActive.space : 'Cafe',
        addedBy: document.getElementById('profile-name').innerText,
        date: new Date().toLocaleString('en-US', { month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        items: cart.map(c => ({ id: c.id, name: c.name, price: c.price, qty: c.qty, status: 'Preparing' }))
    };

    // Deduct items from stock
    cart.forEach(cItem => {
        let dbItem = menuDB.find(m => m.id === cItem.id);
        if(dbItem) {
            dbItem.stock -= cItem.qty;
            if(dbItem.stock <= 0) dbItem.available = false;
        }
    });

    activeOrdersDB.unshift(newOrder);
    
    let cartTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    // Add to active session bill if targeted
    if (sessionOrderActive && sessionOrderActive.type === 'dashboard') {
        let card = document.getElementById(sessionOrderActive.id);
        if (card) {
            let currentBill = parseFloat(card.getAttribute('data-bill')) || 0;
            let newBill = currentBill + cartTotal;
            
            card.setAttribute('data-bill', newBill);
            card.querySelector(`#bill-${sessionOrderActive.id}`).innerText = `₱${newBill.toFixed(2)}`;
            
            let currentPaid = parseFloat(card.getAttribute('data-paid')) || 0;
            card.querySelector(`#balance-${sessionOrderActive.id}`).innerText = `₱${(newBill - currentPaid).toFixed(2)}`;
        }
    } 
    // Logic to add to debt tracker balance if targeted
    else if (sessionOrderActive && sessionOrderActive.type === 'receivable') {
        let recRecord = receivablesDB.find(r => r.id === sessionOrderActive.id);
        if (recRecord) {
            recRecord.amount += cartTotal;
            renderReceivables(); 
        }
    }

    logActivity('Place Order', `Processed order for ${newOrder.customer} (₱${cartTotal.toFixed(2)})`);

    cart = []; 
    updateCartBadge();
    renderMenuDB(); 
    renderStockDB();
    
    showToast("Order placed successfully!", "success");
    sessionOrderActive = null;
    
    navTo('orders', 1);
    toggleOrderTabs('active');
    renderActiveOrdersList();
}

/* --- CHECKIN & DASHBOARD UPDATE LOGIC --- */
function processCheckin() {
    const name = document.getElementById('ci-name').value;
    const pax = parseInt(document.getElementById('ci-pax').value) || 1;
    const space = document.getElementById('ci-space').value;

    if(!name) { showToast('Please enter a customer name', 'error'); return; }

    const now = new Date();
    const timestamp = now.getTime();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const id = 'customer-' + timestamp;
    
    let spaceType = space.toLowerCase().includes('premium') ? 'premium' : 
                    (space.toLowerCase().includes('boardroom') ? 'boardroom' : 'regular');

    // Create new active session HTML
    let newCard = `
        <div class="session-card" data-space="${spaceType}" data-pax="${pax}" id="${id}" data-bill="0" data-paid="0" data-time-in="${timestamp}">
            <div class="session-header">
                <div>
                    <div class="session-name">${name}</div>
                    <span class="badge-space">${space}</span>
                </div>
                <span class="badge-unpaid" id="badge-status-${id}">Unpaid</span>
            </div>
            <div class="time-track">
                <div>Time in <br><strong id="timein-${id}">${timeString}</strong></div>
                <div>Duration <br><strong class="duration-display" style="color: var(--primary-gold);">00:00:00</strong></div>
            </div>
            <div class="finance-track">
                <div>Bill <br><strong style="color: var(--primary-dark);" id="bill-${id}">₱0.00</strong></div>
                <div style="text-align: right;">Balance <br><strong style="color: var(--danger);" id="balance-${id}">₱0.00</strong></div>
            </div>
            <div class="btn-group">
                <button class="btn-action-blue" onclick="startSessionOrder('${id}', '${name}', '${space}')">Add Order</button>
                <button class="btn-action-gold" onclick="openPayment('${name}', '${id}')">Pay / Checkout</button>
            </div>
        </div>
    `;

    // Insert at the top of the dashboard list
    document.getElementById('active-sessions-list').insertAdjacentHTML('afterbegin', newCard);
    
    // Update Admin stats Total Customers Today
    totalCustomersToday += pax;
    document.getElementById('total-customers-display').innerText = totalCustomersToday;

    // Update active session counts and lounge capacities
    updateDashboardHeaderStats(spaceType, pax);

    logActivity('Check-in', `Checked in ${name} (${pax} pax) at ${space}`);

    showToast(`${name} checked into space successfully!`, "success");
    closeModal('checkin-modal');
    
    // Clear Modal inputs
    document.getElementById('ci-name').value = '';
    document.getElementById('ci-school').value = '';
    document.getElementById('ci-course').value = '';
    document.getElementById('ci-pax').value = '1';
}

function updateDashboardHeaderStats(spaceType = null, pax = 0) {
    const totalSessions = document.querySelectorAll('#active-sessions-list .session-card').length;
    document.getElementById('active-session-count').innerText = `${totalSessions} customer(s)`;

    if (spaceType === 'regular') {
        let el = document.getElementById('avail-reg');
        let current = parseInt(el.innerText);
        if (!isNaN(current)) el.innerText = Math.max(0, current - pax) + ' left';
    } else if (spaceType === 'premium') {
        let el = document.getElementById('avail-prem');
        let current = parseInt(el.innerText);
        if (!isNaN(current)) el.innerText = Math.max(0, current - pax) + ' left';
    }
}

function updateDashboardOnCheckout(spaceType = null, pax = 0) {
    const totalSessions = document.querySelectorAll('#active-sessions-list .session-card').length;
    document.getElementById('active-session-count').innerText = `${totalSessions} customer(s)`;

    if (spaceType === 'regular') {
        let el = document.getElementById('avail-reg');
        let current = parseInt(el.innerText);
        if (!isNaN(current)) el.innerText = (current + pax) + ' left';
    } else if (spaceType === 'premium') {
        let el = document.getElementById('avail-prem');
        let current = parseInt(el.innerText);
        if (!isNaN(current)) el.innerText = (current + pax) + ' left';
    }
}

/* --- CHECKOUT, PAYMENT & RECORDS LOGIC --- */
let payMethod = 'cash';
let currentCheckoutName = '';
let currentCheckoutId = '';

function addTransactionRecord(name, amount, method) {
    if(amount <= 0) return;
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const html = `
    <div class="detailed-record" data-name="${name.toLowerCase()}" data-date="${dateStr}" data-method="${method}" data-amount="${amount}">
        <div class="detailed-record-header"><h4>${name}</h4><span class="badge-tag" style="background:${method === 'cash' ? '#10b981' : '#3b82f6'}; text-transform: capitalize;">${method}</span></div>
        <div class="detailed-record-space">Processed at ${timeStr}</div>
        <div class="detailed-row" style="margin-bottom:0;"><span>Total Paid:</span> <strong style="font-size:16px; color:var(--primary-dark);">₱${amount.toFixed(2)}</strong></div>
    </div>`;
    
    document.getElementById('transaction-list').insertAdjacentHTML('afterbegin', html);
    applyRecordsFilters(); 
    renderDailyBalance(); 
}

function openPayment(name, id, specificAmount = null) {
    currentCheckoutName = name;
    currentCheckoutId = id;
    document.getElementById('pay-name').innerText = name;
    
    let amount = 0;
    if (specificAmount !== null) {
         amount = specificAmount;
    } else {
         let card = document.getElementById(id);
         if (card) {
             let bill = parseFloat(card.getAttribute('data-bill')) || 0;
             let paid = parseFloat(card.getAttribute('data-paid')) || 0;
             amount = bill - paid;
         }
    }
    
    document.getElementById('pay-total').innerText = `₱${amount.toFixed(2)}`;
    document.getElementById('pay-total').setAttribute('data-amount', amount);
    document.getElementById('pay-input').value = '';
    document.getElementById('pay-status').innerText = 'Awaiting Input';
    document.getElementById('pay-status').style.background = '#e2e8f0';
    document.getElementById('pay-status').style.color = 'var(--text-sub)';
    
    selectMethod('cash');
    openModal('payment-modal');
}

function selectMethod(method) {
    payMethod = method;
    document.getElementById('btn-cash').classList.remove('active');
    document.getElementById('btn-gcash').classList.remove('active');
    document.getElementById('btn-' + method).classList.add('active');
}

function calculatePayment() {
    let total = parseFloat(document.getElementById('pay-total').getAttribute('data-amount'));
    let tendered = parseFloat(document.getElementById('pay-input').value) || 0;
    let status = document.getElementById('pay-status');
    
    if (tendered === 0 || isNaN(tendered)) {
        status.innerText = 'Awaiting Input';
        status.style.background = '#e2e8f0';
        status.style.color = 'var(--text-sub)';
    } else if (tendered < total) {
        status.innerText = `Insufficient (Short ₱${(total - tendered).toFixed(2)})`;
        status.style.background = '#fee2e2';
        status.style.color = '#dc2626';
    } else {
        let change = tendered - total;
        status.innerText = `Sufficient (Change: ₱${change.toFixed(2)})`;
        status.style.background = '#d1fae5';
        status.style.color = '#059669';
    }
}

function processPayment(isPayLater) {
    let total = parseFloat(document.getElementById('pay-total').getAttribute('data-amount'));
    let tendered = parseFloat(document.getElementById('pay-input').value) || 0;
    
    // Track the successful cashflow to records
    let effectivePayment = (tendered > total) ? total : tendered; 
    
    // 1. Check if paying an existing debt (from Receivables Page)
    if (currentCheckoutId.startsWith('rec-')) {
        let recId = currentCheckoutId.replace('rec-', '');
        let recIndex = receivablesDB.findIndex(r => r.id === recId);
        
        if (recIndex > -1) {
            if (effectivePayment > 0) addTransactionRecord(currentCheckoutName, effectivePayment, payMethod);

            receivablesDB[recIndex].amount -= tendered;
            if (receivablesDB[recIndex].amount <= 0) {
                receivablesDB.splice(recIndex, 1);
                showToast("Debt fully cleared via " + payMethod.toUpperCase() + "!", "success");
                logActivity('Payment', `Debt fully cleared for ${currentCheckoutName}`);
            } else {
                showToast(`Partial payment via ${payMethod.toUpperCase()}. Remaining balance: ₱${receivablesDB[recIndex].amount.toFixed(2)}`, "success");
                logActivity('Payment', `Partial debt payment (₱${tendered}) logged for ${currentCheckoutName}`);
            }
            renderReceivables();
        }
        closeModal('payment-modal');
        return;
    }

    // 2. Dashboard Checkout Logic
    if (!isPayLater && tendered < total) {
        showToast("Insufficient amount. Please enter correct amount or choose Partial/Not Paid.", "error");
        return;
    }

    // Handle Add to Debt Tracker / Receivables if requested
    if (isPayLater) {
        let debt = total - tendered;
        if (effectivePayment > 0) addTransactionRecord(currentCheckoutName, effectivePayment, payMethod);

        if (debt > 0) {
            receivablesDB.push({
                id: new Date().getTime().toString(),
                name: currentCheckoutName,
                phone: 'N/A',
                amount: debt,
                dueDate: '' // Default blank
            });
            renderReceivables();
            showToast(`${currentCheckoutName} checked out. ₱${debt.toFixed(2)} sent to Receivables.`, "warning");
            logActivity('Checkout', `Checked out ${currentCheckoutName} with outstanding balance sent to Receivables (₱${debt.toFixed(2)})`);
        } else {
            showToast(`Payment sufficient. Checked out successfully via ${payMethod.toUpperCase()}!`, "success");
            logActivity('Checkout', `Checked out ${currentCheckoutName} fully paid via ${payMethod}`);
        }
    } else {
        if (effectivePayment > 0) addTransactionRecord(currentCheckoutName, effectivePayment, payMethod);
        showToast(`Checkout successful via ${payMethod.toUpperCase()}! Change: ₱${(tendered - total).toFixed(2)}`, "success");
        logActivity('Checkout', `Checked out ${currentCheckoutName} fully paid via ${payMethod}`);
    }

    // Remove session from dashboard
    let card = document.getElementById(currentCheckoutId);
    if (card) {
        let space = card.getAttribute('data-space');
        let pax = parseInt(card.getAttribute('data-pax')) || 1;
        
        card.remove();
        updateDashboardOnCheckout(space, pax);
    }

    closeModal('payment-modal');
}

/* --- ADMIN: ADD STAFF --- */
function processAddStaff() {
    let name = document.getElementById('new-staff-name').value;
    let user = document.getElementById('new-staff-username').value;
    let pass = document.getElementById('new-staff-pass').value;
    let role = document.getElementById('new-staff-role').value;

    if(!name || !user || !pass) { showToast("Please fill in all fields", "error"); return; }

    staffDB.push({ name, username: user, role });
    showToast(`Staff account for ${name} created successfully!`, "success");
    
    logActivity('Admin Action', `Created new staff account for ${name} (${role})`);
    
    closeModal('add-staff-modal');
    document.getElementById('new-staff-name').value = '';
    document.getElementById('new-staff-username').value = '';
    document.getElementById('new-staff-pass').value = '';
}

/* --- EXPENSES & DAILY BALANCE LOGIC --- */
function setExpFilter(preset) {
    document.querySelectorAll('.exp-filter-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById('exp-btn-' + preset).classList.add('active');

    const today = new Date();
    const startEl = document.getElementById('exp-start');
    const endEl = document.getElementById('exp-end');

    let start, end;

    if (preset === 'today') {
        start = today.toISOString().split('T')[0]; end = start;
    } else if (preset === 'week') {
        const first = today.getDate() - today.getDay(); 
        const firstDay = new Date(today.setDate(first));
        start = firstDay.toISOString().split('T')[0];
        end = new Date().toISOString().split('T')[0];
    } else if (preset === 'month') {
        start = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0];
        end = new Date().toISOString().split('T')[0];
    } else if (preset === 'all') {
        start = ''; end = '';
    }

    startEl.value = start; endEl.value = end;
    renderExpenses();
}

function renderExpenses() {
    const start = document.getElementById('exp-start').value;
    const end = document.getElementById('exp-end').value;
    const container = document.getElementById('expenses-list-container');
    let html = ''; let total = 0;

    let filtered = expensesDB.filter(exp => {
        if (start && exp.date < start) return false;
        if (end && exp.date > end) return false;
        return true;
    });

    if (filtered.length === 0) {
        html = `<div class="empty-cart-state"><div style="font-size: 30px; margin-bottom: 10px;">📁</div><div>No expenses found</div></div>`;
    } else {
        filtered.forEach(exp => {
            total += exp.amount;
            html += `
            <div class="detailed-record" style="border-left: 4px solid var(--cyan-expense);">
                <div class="detailed-record-header">
                    <h4>${exp.name}</h4>
                    <span class="badge-tag" style="background:var(--cyan-expense);">Paid</span>
                </div>
                <div class="detailed-record-space">Logged on: ${exp.date}</div>
                <div class="detailed-row" style="margin-bottom:0;"><span>Amount:</span> <strong style="color:var(--primary-dark); font-size:16px;">₱${exp.amount.toFixed(2)}</strong></div>
            </div>`;
        });
    }

    container.innerHTML = html;
    document.getElementById('exp-total-display').innerText = `₱${total.toFixed(2)}`;
}

function processLogExpense() {
    let name = document.getElementById('exp-name').value;
    let amount = parseFloat(document.getElementById('exp-amount').value);
    let date = document.getElementById('exp-date-input').value;

    if(!name || isNaN(amount) || amount <= 0 || !date) { showToast("Please fill all valid details", "error"); return; }

    expensesDB.push({ id: 'e' + new Date().getTime(), name: name, amount: amount, date: date });
    renderExpenses(); 
    renderDailyBalance(); 
    closeModal('expense-modal');
    showToast("Expense logged successfully!", "success");

    logActivity('Expense', `Logged store expense: ${name} (₱${amount})`);

    document.getElementById('exp-name').value = '';
    document.getElementById('exp-amount').value = '';
}

function renderDailyBalance() {
    const today = new Date().toISOString().split('T')[0];
    const dateOptions = { month: 'long', day: 'numeric', year: 'numeric' };
    const prettyDate = new Date().toLocaleDateString('en-US', dateOptions);

    const records = document.querySelectorAll('#transaction-list .detailed-record');
    let cash = 0, gcash = 0;
    records.forEach(r => {
        if(r.getAttribute('data-date') === today) {
            let amt = parseFloat(r.getAttribute('data-amount')) || 0;
            if(r.getAttribute('data-method') === 'cash') cash += amt;
            else gcash += amt;
        }
    });
    
    let expTotal = 0;
    expensesDB.forEach(e => {
        if (e.date === today) expTotal += e.amount;
    });

    const net = (cash + gcash) - expTotal;

    const content = document.getElementById('daily-balance-view').querySelector('.content');
    content.innerHTML = `
        <h2 class="page-title">Daily Balance</h2>
        <p class="page-subtitle">End of day financial summary for ${prettyDate}</p>
        
        <div style="background: white; border-radius: 12px; padding: 20px; border: 1px solid var(--border-color); margin-bottom: 15px;">
            <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
                <span style="color:var(--text-sub); font-size:14px;">Total Cash Received</span>
                <strong style="color:#10b981; font-size:16px;">₱${cash.toFixed(2)}</strong>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom:15px; padding-bottom:15px; border-bottom:1px solid #f1f5f9;">
                <span style="color:var(--text-sub); font-size:14px;">Total GCash Received</span>
                <strong style="color:#3b82f6; font-size:16px;">₱${gcash.toFixed(2)}</strong>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
                <span style="color:var(--text-main); font-weight:600; font-size:15px;">Gross Income</span>
                <strong style="color:var(--primary-dark); font-size:18px;">₱${(cash + gcash).toFixed(2)}</strong>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom:15px; padding-bottom:15px; border-bottom:1px solid #f1f5f9;">
                <span style="color:var(--danger); font-size:14px;">Total Expenses</span>
                <strong style="color:var(--danger); font-size:16px;">- ₱${expTotal.toFixed(2)}</strong>
            </div>
            <div style="display:flex; justify-content:space-between;">
                <span style="color:var(--text-main); font-weight:700; font-size:16px;">Net Balance</span>
                <strong style="color:var(--primary-gold); font-size:22px;">₱${net.toFixed(2)}</strong>
            </div>
        </div>
        
        <div class="banner-info" style="margin-top: 10px;">
            <i class="fa-solid fa-circle-info"></i> Automatically calculates completed checkouts and logged expenses for the current date.
        </div>
    `;
}

/* --- DASHBOARD & RECEIVABLES SESSION ORDER LOGIC --- */
function startSessionOrder(id, name, space) {
    sessionOrderActive = { id, name, space, type: 'dashboard' };
    navTo('orders', 1); toggleOrderTabs('menu');
    showToast(`Adding order to ${name}'s session`, 'info');
}

function startReceivableOrder(id, name) {
    sessionOrderActive = { id, name, space: 'Receivable Account', type: 'receivable' };
    navTo('orders', 1); toggleOrderTabs('menu');
    showToast(`Adding order to ${name}'s debt balance`, 'info');
}

/* --- RENDERING LOGIC --- */
function renderMenuDB() {
    const ordersGrid = document.getElementById('food-container');
    const invList = document.getElementById('inv-menu-list');
    let ordersHTML = ''; let invHTML = '';

    menuDB.forEach(item => {
        let isAvail = item.available && item.stock > 0;

        ordersHTML += `
            <div class="food-card" data-category="${item.category}">
                <div class="food-img"><i class="fa-solid ${item.icon}"></i></div>
                <div class="food-info">
                    <div class="food-name">${item.name}</div>
                    <div class="food-price">₱${item.price.toFixed(2)} <span style="font-size:10px; font-weight:normal; color:var(--text-sub);">(${item.stock} left)</span></div>
                    ${isAvail 
                        ? `<button class="btn-add" onclick="addToCart('${item.id}')">+ Add</button>`
                        : `<button class="btn-add btn-disabled" disabled>Not Available</button>`
                    }
                </div>
            </div>`;

        invHTML += `
            <div class="stock-detail-card inv-menu-card" data-name="${item.name.toLowerCase()}" style="display: flex; justify-content: space-between; align-items: center; padding: 15px; margin-bottom: 10px; border-left: none;">
                <div style="display: flex; align-items: center; gap: 15px;">
                     <div style="width: 40px; height: 40px; background: #f1f5f9; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 20px; color: var(--primary-gold);"><i class="fa-solid ${item.icon}"></i></div>
                     <div>
                         <div style="font-weight: 600; font-size: 14px; color: var(--primary-dark);">${item.name}</div>
                         <div style="font-size: 12px; color: var(--text-sub); text-transform: capitalize;">${item.category} • ₱${item.price.toFixed(2)}</div>
                     </div>
                </div>
                <div>
                     <label style="position: relative; display: inline-block; width: 44px; height: 24px;">
                        <input type="checkbox" style="opacity:0; width:0; height:0;" ${isAvail ? 'checked' : ''} onchange="toggleAvailability('${item.id}', this.checked)">
                        <span style="position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: ${isAvail ? 'var(--success)' : '#cbd5e1'}; transition: .4s; border-radius: 24px;">
                            <span style="position: absolute; height: 18px; width: 18px; left: ${isAvail ? '23px' : '3px'}; bottom: 3px; background-color: white; transition: .4s; border-radius: 50%; box-shadow: 0 2px 4px rgba(0,0,0,0.1);"></span>
                        </span>
                     </label>
                </div>
            </div>`;
    });

    ordersGrid.innerHTML = ordersHTML; invList.innerHTML = invHTML;
    applyMenuFilters(); applyInvMenuFilters();
}

function renderStockDB() {
    const stockList = document.getElementById('inventory-stock-list');
    let html = ''; let lowCount = 0; let warnCount = 0;

    menuDB.forEach(item => {
        let status = 'good'; let badgeClass = ''; let badgeText = ''; let barColor = '';
        
        if (item.stock <= 0) {
            status = 'low'; badgeClass = 'badge-danger'; badgeText = 'Out of Stock';
            barColor = 'linear-gradient(90deg, #e11d48, #f43f5e)'; lowCount++;
        } else if (item.stock <= item.threshold) {
            status = 'warn'; badgeClass = 'badge-warning'; badgeText = 'Warning';
            barColor = 'linear-gradient(90deg, #f43f5e, #f59e0b, #fde047)'; warnCount++;
        } else {
            badgeClass = 'badge-success'; badgeText = 'In Stock';
            barColor = 'linear-gradient(90deg, #10b981, #34d399)';
        }

        let barWidth = Math.min((item.stock / (item.threshold * 3)) * 100, 100);

        html += `
            <div class="stock-detail-card" style="border-left-color: ${status === 'low' ? '#ef4444' : (status === 'warn' ? '#f59e0b' : '#10b981')};">
                <div class="stock-detail-title">${item.name} <span style="font-size: 13px; color: var(--primary-gold);">₱${item.price.toFixed(2)}</span></div>
                <div class="${badgeClass}"><i class="fa-solid fa-circle"></i> ${badgeText}</div>
                <div class="stock-progress-bg"><div class="stock-progress-fill" style="width: ${barWidth}%; background: ${barColor};"></div></div>
                <div class="stock-stats-grid">
                    <div><div class="stat-box-label">CURRENT</div><div class="stat-box-value">${item.stock}</div></div>
                    <div><div class="stat-box-label">UNIT</div><div class="stat-box-unit">${item.unit}</div></div>
                    <div><div class="stat-box-label">THRESHOLD</div><div class="stat-box-value">${item.threshold}</div></div>
                </div>
                <div class="stock-actions">
                    <button class="action-btn-wide edit" onclick="openUpdateModal('${item.id}')"><i class="fa-solid fa-pen-to-square"></i> Edit Item & Stock</button>
                </div>
            </div>`;
    });

    stockList.innerHTML = html;
    document.getElementById('inv-low-count').innerText = lowCount;
    document.getElementById('inv-warn-count').innerText = warnCount;
    document.getElementById('inv-total-count').innerText = menuDB.length;
}

function renderReceivables() {
    const list = document.getElementById('receivables-list');
    let html = ''; let totalUnpaid = 0;
    
    receivablesDB = receivablesDB.filter(r => r.amount > 0);
    let unpaidCount = receivablesDB.length;
    const today = new Date(); 

    receivablesDB.forEach(item => {
        totalUnpaid += item.amount;
        
        let amountClass = 'red'; let dueDateStr = 'N/A';
        if (item.dueDate) {
            const due = new Date(item.dueDate);
            const diffTime = due - today;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            let daysText = diffDays > 0 ? `(${diffDays} days left)` : (diffDays === 0 ? '(Due today)' : `(${Math.abs(diffDays)} days overdue)`);
            dueDateStr = `${item.dueDate} <span style="color:var(--text-sub);">${daysText}</span>`;
        }

        html += `
        <div class="debtor-card">
            <div class="debtor-name">${item.name}</div>
            <div class="debtor-phone">${item.phone || 'N/A'}</div>
            <div class="debtor-badge-unpaid">Unpaid</div>
            <div class="debtor-detail">Outstanding Balance: <span class="debtor-detail-val ${amountClass}">₱${item.amount.toFixed(2)}</span></div>
            <div class="debtor-due">Soonest Due: ${dueDateStr}</div>
            <div class="debtor-actions">
                <button class="btn-rec-outline" onclick="startReceivableOrder('${item.id}', '${item.name}')">Add Order</button>
                <button class="btn-rec-solid" onclick="openPayment('${item.name}', 'rec-${item.id}', ${item.amount})">Record Payment</button>
            </div>
        </div>`;
    });

    if(unpaidCount === 0) html = `<div class="empty-cart-msg">No active receivables found.</div>`;

    list.innerHTML = html;
    document.getElementById('rec-total-val').innerText = `₱${totalUnpaid.toFixed(2)}`;
    document.getElementById('rec-unpaid-count').innerText = unpaidCount;
    document.getElementById('receivables-count').innerText = `${unpaidCount} debtor(s) found`;
}

function processNewReceivable() {
    let name = document.getElementById('nrec-name').value;
    let phone = document.getElementById('nrec-phone').value;
    let amount = parseFloat(document.getElementById('nrec-amount').value);
    let date = document.getElementById('nrec-date').value;

    if(!name || isNaN(amount) || amount <= 0) { showToast("Please enter a valid name and amount", "error"); return; }

    receivablesDB.push({
        id: new Date().getTime().toString(), name: name, phone: phone || 'N/A', amount: amount, dueDate: date || null
    });

    renderReceivables(); closeModal('new-rec-modal');
    showToast("New receivable added!", "success");

    logActivity('Receivables', `Added new debt account for ${name} (₱${amount})`);

    document.getElementById('nrec-name').value = ''; document.getElementById('nrec-phone').value = '';
    document.getElementById('nrec-amount').value = ''; document.getElementById('nrec-date').value = '';
}

/* --- ADD MENU ITEM --- */
function processAddItem() {
    let name = document.getElementById('add-item-name').value;
    let price = parseFloat(document.getElementById('add-item-price').value);
    let category = document.getElementById('add-item-category').value;
    let stock = parseInt(document.getElementById('add-item-stock').value) || 0;
    let threshold = parseInt(document.getElementById('add-item-threshold').value) || 5;

    if(!name || isNaN(price) || price < 0) { showToast("Please enter valid name and price", "error"); return; }

    let icon = 'fa-utensils';
    if(category === 'beverages') icon = 'fa-glass-water';
    if(category === 'meals') icon = 'fa-bowl-food';
    if(category === 'desserts') icon = 'fa-ice-cream';

    menuDB.push({
        id: 'm' + new Date().getTime(), name: name, price: price, category: category, icon: icon,
        available: stock > 0, stock: stock, threshold: threshold, unit: category === 'beverages' ? 'cups' : 'pcs'
    });

    renderMenuDB(); renderStockDB();
    closeModal('modal-add-item');
    showToast(name + " added to menu!", "success");
    
    logActivity('Inventory', `Added new menu item: ${name} to ${category}`);

    document.getElementById('add-item-name').value = ''; document.getElementById('add-item-price').value = '';
    document.getElementById('add-item-stock').value = '';
}

/* --- ACTIVE ORDERS LOGIC --- */
function renderActiveOrdersList() {
    const tbody = document.getElementById('active-orders-tbody');
    let html = '';

    if(activeOrdersDB.length === 0) {
        html = `<tr><td colspan="4" style="text-align:center; color:var(--text-sub); padding: 20px;">No active orders.</td></tr>`;
    } else {
        activeOrdersDB.forEach(order => {
            let totalItems = order.items.reduce((sum, item) => sum + item.qty, 0);
            let allReady = order.items.every(item => item.status === 'Ready');
            let statusText = allReady ? 'ready' : 'preparing';
            
            html += `
            <tr>
                <td style="font-weight: 500;">${order.customer}<br><span style="font-size:11px; color:var(--text-sub); font-weight:normal;">${order.space}</span></td>
                <td>${totalItems}</td>
                <td style="text-transform: capitalize;">${statusText}</td>
                <td><button class="btn-view-orders" onclick="openOrderDetail('${order.id}')">View Orders</button></td>
            </tr>`;
        });
    }
    
    tbody.innerHTML = html;
    document.getElementById('active-orders-count').innerText = `${activeOrdersDB.length} session(s)`;
}

function openOrderDetail(id) {
    let order = activeOrdersDB.find(o => o.id === id);
    if(!order) return;

    let preparingCount = order.items.filter(i => i.status !== 'Ready').length;
    let isAllReady = preparingCount === 0;

    let itemsHtml = order.items.map((item, index) => {
        let badge = item.status === 'Ready' 
            ? `<span class="badge-ready">Ready</span>` 
            : `<span class="badge-preparing">Preparing</span>`;
        
        let actionBtn = item.status === 'Ready'
            ? `<i class="fa-solid fa-check" style="color:#10b981; font-size:20px;"></i>`
            : `<button class="btn-mark-ready" onclick="markItemReady('${order.id}', ${index})"><i class="fa-solid fa-check" style="font-size:10px;"></i> Mark ready</button>`;

        return `
        <tr>
            <td style="font-weight: 500;">${item.name}</td>
            <td>${item.qty}</td>
            <td>${badge}</td>
            <td style="text-align:center;">${actionBtn}</td>
        </tr>`;
    }).join('');

    let html = `
    <div class="order-detail-top">
        <div>
            <div class="order-detail-title">${order.customer} Orders</div>
            <div class="order-detail-meta">${order.addedBy} • ${order.space}</div>
            <div class="order-detail-meta" style="margin-top:2px;">${order.date}</div>
        </div>
        <div style="display:flex; flex-direction:column; gap:8px; align-items:flex-end;">
            <button class="btn-served" style="opacity: ${isAllReady ? '1' : '0.5'}; cursor: ${isAllReady ? 'pointer' : 'not-allowed'}" onclick="serveOrder('${order.id}')">
                <i class="fa-regular fa-circle-check"></i> Served to customer
            </button>
            <button class="btn-back-grey" onclick="closeOrderDetail()">Back</button>
        </div>
    </div>

    <div class="banner-info">
        <i class="fa-solid fa-circle-info" style="margin-right:5px;"></i> 
        <strong>Step 1:</strong> Tap <strong>Mark ready</strong> on each item when the kitchen finishes preparing it. 
        <strong>Step 2:</strong> When <em>all</em> items show <span style="background:#10b981; color:white; padding:2px 6px; border-radius:4px; font-weight:bold;">Ready</span>, tap <strong>Served to customer</strong>.
    </div>

    ${preparingCount > 0 ? `
    <div class="banner-warning">
        <i class="fa-solid fa-triangle-exclamation" style="margin-right:5px;"></i> 
        <strong>${preparingCount} item(s) still preparing.</strong> Mark each as <strong>Mark ready</strong> before tapping Served.
    </div>` : ''}

    <table class="orders-table" style="margin-top: 15px;">
        <tr><th>Item</th><th>Qty</th><th>Status</th><th style="text-align:center;">Action</th></tr>
        ${itemsHtml}
    </table>
    `;

    document.getElementById('orders-list-container').style.display = 'none';
    document.getElementById('order-detail-container').innerHTML = html;
    document.getElementById('order-detail-container').style.display = 'block';
}

function closeOrderDetail() {
    document.getElementById('order-detail-container').style.display = 'none';
    document.getElementById('orders-list-container').style.display = 'block';
    renderActiveOrdersList();
}

function markItemReady(orderId, itemIndex) {
    let order = activeOrdersDB.find(o => o.id === orderId);
    if(order) { order.items[itemIndex].status = 'Ready'; openOrderDetail(orderId); }
}

function serveOrder(orderId) {
    let orderIndex = activeOrdersDB.findIndex(o => o.id === orderId);
    if(orderIndex > -1) {
        let order = activeOrdersDB[orderIndex];
        let preparingCount = order.items.filter(i => i.status !== 'Ready').length;
        
        if(preparingCount > 0) { showToast("Cannot serve! Some items are still preparing.", "error"); return; }
        
        activeOrdersDB.splice(orderIndex, 1);
        showToast("Order marked as served!", "success");
        closeOrderDetail();
    }
}

function toggleAvailability(id, isAvailable) {
    const item = menuDB.find(m => m.id === id);
    if(item) {
        item.available = isAvailable;
        if(isAvailable && item.stock <= 0) { item.stock = 10; showToast(`${item.name} restocked to 10 automatically.`, 'info'); }
        renderMenuDB(); renderStockDB();
        showToast(`${item.name} marked as ${isAvailable ? 'Available' : 'Out of Stock'}.`, isAvailable ? 'success' : 'warning');
    }
}

/* --- INVENTORY EDIT LOGIC --- */
let currentEditItemId = null;
function openUpdateModal(id) { 
    currentEditItemId = id; 
    const item = menuDB.find(m => m.id === id);
    document.getElementById('update-price-input').value = item.price;
    document.getElementById('update-qty-input').value = item.stock; 
    openModal('modal-update-stock'); 
}

function confirmStockUpdate() {
    const newQty = parseInt(document.getElementById('update-qty-input').value);
    const newPrice = parseFloat(document.getElementById('update-price-input').value);

    if(isNaN(newQty) || newQty < 0 || isNaN(newPrice) || newPrice < 0) { 
        showToast('Please enter valid quantity and price', 'error'); return; 
    }
    
    const item = menuDB.find(m => m.id === currentEditItemId);
    if(item) {
        item.stock = newQty;
        item.price = newPrice;
        if(item.stock <= 0) item.available = false; else item.available = true; 
        logActivity('Inventory', `Updated stock/price for ${item.name}`);
    }
    
    closeModal('modal-update-stock');
    renderMenuDB(); renderStockDB();
    showToast('Item updated successfully!', 'success');
}

/* --- TOAST NOTIFICATIONS --- */
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    let icon = type === 'success' ? 'fa-check-circle' : (type === 'error' ? 'fa-circle-exclamation' : (type === 'warning' ? 'fa-triangle-exclamation' : 'fa-info-circle'));
    toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
    container.appendChild(toast); setTimeout(() => { toast.remove(); }, 3000);
}

/* --- MODALS --- */
function openModal(id) { document.getElementById(id).style.display = 'flex'; }
function closeModal(id) { document.getElementById(id).style.display = 'none'; }

/* --- LOGIN LOGIC WITH ROLE BASED ACCESS --- */
let currentUserRole = 'staff';

function togglePassword() {
    const passInput = document.getElementById('passInput');
    const icon = document.getElementById('togglePass');
    if (passInput.type === "password") {
        passInput.type = "text"; icon.classList.remove('fa-eye-slash'); icon.classList.add('fa-eye');
    } else {
        passInput.type = "password"; icon.classList.remove('fa-eye'); icon.classList.add('fa-eye-slash');
    }
}

function login() {
    const usernameInput = document.getElementById('login-username').value.toLowerCase();
    
    if(usernameInput === 'admin') {
        currentUserRole = 'admin';
        document.body.classList.remove('role-staff'); document.body.classList.add('role-admin');
        document.getElementById('profile-name').innerText = 'Admin User';
        document.getElementById('profile-username').innerText = 'admin';
        document.getElementById('profile-role').innerText = 'Administrator';
        showToast('Logged in as Admin (Full Access)', 'success');
    } else {
        currentUserRole = 'staff';
        document.body.classList.remove('role-admin'); document.body.classList.add('role-staff');
        document.getElementById('profile-name').innerText = 'Staff User';
        document.getElementById('profile-username').innerText = usernameInput || 'staff1';
        document.getElementById('profile-role').innerText = 'Staff';
        showToast('Logged in as Staff', 'success');
    }

    document.getElementById('login-view').classList.remove('active');
    document.getElementById('main-app').style.display = 'flex';
    
    logActivity('Login', `Authenticated successfully via ${currentUserRole} account`);
    navTo('dashboard', 0);
}

function logout() {
    logActivity('Logout', `Logged out securely from system`);
    toggleSideMenu(); document.getElementById('main-app').style.display = 'none';
    document.getElementById('login-view').classList.add('active');
    document.getElementById('passInput').value = '';
    showToast('Logged out securely', 'info');
}

/* --- NAVIGATION --- */
function navTo(viewId, index = null) {
    const menu = document.getElementById('side-menu');
    if(menu && menu.style.transform === 'translateX(0px)') toggleSideMenu();

    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById(viewId + '-view').classList.add('active');
    
    document.querySelectorAll('.bottom-nav .nav-item').forEach(n => n.classList.remove('active'));
    if(index !== null && index < 3) { document.querySelectorAll('.bottom-nav .nav-item')[index].classList.add('active'); }

    document.querySelectorAll('.menu-list-item').forEach(m => m.classList.remove('active-menu'));
    if(viewId === 'dashboard') document.getElementById('menu-dash').classList.add('active-menu');
    if(viewId === 'receivables') document.getElementById('menu-rec').classList.add('active-menu');
    if(viewId === 'expenses') document.getElementById('menu-expenses').classList.add('active-menu');
    if(viewId === 'daily-balance') document.getElementById('menu-daily').classList.add('active-menu');
    if(viewId === 'performance') document.getElementById('menu-perf').classList.add('active-menu');
    if(viewId === 'analytics') document.getElementById('menu-analytics').classList.add('active-menu');
}

function goToOrders() {
    sessionOrderActive = null; 
    renderCart(); 
    navTo('orders', 1);
    toggleOrderTabs('menu');
}

function toggleSideMenu() {
    const overlay = document.getElementById('side-overlay'); const menu = document.getElementById('side-menu');
    if (menu.style.transform === 'translateX(0px)') {
        menu.style.transform = 'translateX(100%)'; overlay.style.opacity = '0';
        setTimeout(() => overlay.style.display = 'none', 300);
    } else {
        overlay.style.display = 'block';
        setTimeout(() => { overlay.style.opacity = '1'; menu.style.transform = 'translateX(0px)'; }, 10);
    }
}

function toggleOrderTabs(tab) {
    document.querySelectorAll('#orders-view .toggle-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('orders-active-tab').style.display = 'none';
    document.getElementById('orders-menu-tab').style.display = 'none';
    
    if(tab === 'active') {
        document.getElementById('tab-btn-active').classList.add('active');
        document.getElementById('orders-active-tab').style.display = 'block';
    } else {
        document.getElementById('tab-btn-menu').classList.add('active');
        document.getElementById('orders-menu-tab').style.display = 'block';
    }
}

function toggleInvTabs(tab) {
    document.querySelectorAll('#inventory-view .toggle-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('inv-stock-content').style.display = 'none';
    document.getElementById('inv-menu-content').style.display = 'none';
    
    if(tab === 'stock') {
        document.getElementById('inv-tab-stock').classList.add('active');
        document.getElementById('inv-stock-content').style.display = 'block';
    } else {
        document.getElementById('inv-tab-menu').classList.add('active');
        document.getElementById('inv-menu-content').style.display = 'block';
    }
}

/* --- DYNAMIC SEARCH & FILTERS --- */
function applyDashboardFilters() {
    const searchQuery = document.getElementById('dash-search').value.toLowerCase();
    const spaceFilter = document.getElementById('dash-filter').value;
    const cards = document.querySelectorAll('#dashboard-view .session-card');

    cards.forEach(card => {
        const name = card.querySelector('.session-name').innerText.toLowerCase();
        const space = card.getAttribute('data-space');
        const matchesSearch = name.includes(searchQuery);
        const matchesSpace = (spaceFilter === 'all' || space === spaceFilter);

        if (matchesSearch && matchesSpace) { card.style.display = 'block'; } 
        else { card.style.display = 'none'; }
    });
}

function applyMenuFilters() {
    const searchQuery = document.getElementById('menu-search').value.toLowerCase();
    const categoryFilter = document.getElementById('menu-filter').value;
    const items = document.querySelectorAll('#food-container .food-card');

    items.forEach(item => {
        const name = item.querySelector('.food-name').innerText.toLowerCase();
        const category = item.getAttribute('data-category');
        const matchesSearch = name.includes(searchQuery);
        const matchesCategory = (categoryFilter === 'all' || category === categoryFilter);

        if (matchesSearch && matchesCategory) { item.style.display = 'flex'; } 
        else { item.style.display = 'none'; }
    });
}

function applyInvMenuFilters() {
    const searchQuery = document.getElementById('inv-menu-search').value.toLowerCase();
    const cards = document.querySelectorAll('.inv-menu-card');

    cards.forEach(card => {
        const name = card.getAttribute('data-name');
        if (name.includes(searchQuery)) { card.style.display = 'flex'; } 
        else { card.style.display = 'none'; }
    });
}

function applyRecordsFilters() {
    const searchQuery = document.getElementById('records-search').value.toLowerCase();
    const startDate = document.getElementById('record-start-date').value;
    const endDate = document.getElementById('record-end-date').value;
    const method = document.getElementById('record-method-filter').value.toLowerCase();
    
    const records = document.querySelectorAll('#transaction-list .detailed-record');
    
    let cashTotal = 0; let gcashTotal = 0; let cashCount = 0; let gcashCount = 0; let visibleCount = 0;

    records.forEach(record => {
        const name = record.getAttribute('data-name').toLowerCase();
        const recDate = record.getAttribute('data-date'); 
        const recMethod = record.getAttribute('data-method').toLowerCase();
        const amount = parseFloat(record.getAttribute('data-amount'));

        let matchSearch = name.includes(searchQuery);
        let matchMethod = (method === 'all payments' || recMethod === method);
        let matchDate = true;

        if (startDate && recDate < startDate) matchDate = false;
        if (endDate && recDate > endDate) matchDate = false;

        if (matchSearch && matchMethod && matchDate) {
            record.style.display = 'block'; visibleCount++;
            if (recMethod === 'cash') { cashTotal += amount; cashCount++; }
            else if (recMethod === 'gcash') { gcashTotal += amount; gcashCount++; }
        } else { record.style.display = 'none'; }
    });

    document.getElementById('summary-cash-val').innerHTML = `₱${cashTotal.toFixed(2)} <span style="font-weight: normal; font-size: 14px; color: var(--text-sub);">(${cashCount})</span>`;
    document.getElementById('summary-gcash-val').innerHTML = `₱${gcashTotal.toFixed(2)} <span style="font-weight: normal; font-size: 14px; color: var(--text-sub);">(${gcashCount})</span>`;
    document.getElementById('records-total').innerHTML = `₱${(cashTotal + gcashTotal).toFixed(2)} <span style="font-weight: normal; font-size: 14px; color: var(--text-sub);">(${cashCount + gcashCount})</span>`;
    document.getElementById('records-count').innerText = `${visibleCount} record(s)`;
}

function clearRecordsFilters() {
    document.getElementById('records-search').value = '';
    document.getElementById('record-start-date').value = '';
    document.getElementById('record-end-date').value = '';
    document.getElementById('record-method-filter').value = 'All payments';
    applyRecordsFilters(); showToast('Filters cleared', 'info');
}
