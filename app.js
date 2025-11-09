// ==========================================
// CONFIGURATION
// ==========================================

// IMPORTANT: Replace this with your actual deployment URL
const API_URL = 'https://script.google.com/macros/s/AKfycbyIfXvZ4lcPpnYUHisemSTbApS208XomJAkKIETmJ5Fo1YF8jZbValppG8a7tNZ6OSX/exec';

// Application State - Using var to avoid redeclaration errors
var appState = {
    currentUser: null,
    incentivesData: [],
    customRates: [],
    settings: {
        defaultIncentiveRate: 0.06
    },
    users: [],
    editingRecordIndex: null,
    isLoading: false
};

// ==========================================
// SESSION MANAGEMENT
// ==========================================

function saveSession(user) {
    try {
        localStorage.setItem('huemot_user', JSON.stringify(user));
    } catch (error) {
        console.error('Error saving session:', error);
    }
}

function loadSession() {
    try {
        const userJson = localStorage.getItem('huemot_user');
        if (userJson) {
            return JSON.parse(userJson);
        }
    } catch (error) {
        console.error('Error loading session:', error);
    }
    return null;
}

function clearSession() {
    try {
        localStorage.removeItem('huemot_user');
    } catch (error) {
        console.error('Error clearing session:', error);
    }
}

function checkExistingSession() {
    const savedUser = loadSession();
    if (savedUser) {
        appState.currentUser = savedUser;
        showApp();
        return true;
    }
    return false;
}

// ==========================================
// API HELPER FUNCTION
// ==========================================

async function makeApiRequest(url, options = {}) {
    try {
        console.log('Making request to:', url);
        
        const response = await fetch(url, {
            ...options,
            redirect: 'follow',
            mode: 'cors',
        });
        
        console.log('Response status:', response.status);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const text = await response.text();
        console.log('Response received');
        
        try {
            return JSON.parse(text);
        } catch (e) {
            console.error('Failed to parse JSON:', e);
            throw new Error('Invalid JSON response from server');
        }
    } catch (error) {
        console.error('API Request failed:', error);
        throw error;
    }
}

// ==========================================
// API FUNCTIONS - USER AUTHENTICATION
// ==========================================

async function authenticateUser(username, password, role) {
    showLoading();
    try {
        const result = await makeApiRequest(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain;charset=utf-8',
            },
            body: JSON.stringify({
                action: 'login',
                username: username,
                password: password,
                role: role
            })
        });
        
        hideLoading();
        
        if (result.success) {
            return { success: true, user: result.user };
        } else {
            return { success: false, error: result.error || 'Login failed' };
        }
    } catch (error) {
        hideLoading();
        console.error('Error authenticating user:', error);
        return { 
            success: false, 
            error: 'Network error. Please check your connection.' 
        };
    }
}

async function loadUsersFromSheets() {
    try {
        const users = await makeApiRequest(`${API_URL}?action=getUsers`);
        appState.users = users || [];
        return users;
    } catch (error) {
        console.error('Error loading users:', error);
        return [];
    }
}

// ==========================================
// DATA LOADING FUNCTIONS
// ==========================================

async function loadDataFromSheets() {
    if (appState.isLoading) return;
    
    appState.isLoading = true;
    showLoading();
    
    try {
        const data = await makeApiRequest(`${API_URL}?action=getAllData`);
        
        if (data.error) {
            throw new Error(data.error);
        }
        
        appState.incentivesData = data.records || [];
        appState.customRates = data.customRates || [];
        appState.settings = data.settings || { defaultIncentiveRate: 0.06 };
        
        console.log('📊 Data loaded from Google Sheets:');
        console.log('  - Records:', appState.incentivesData.length);
        console.log('  - Custom Rates:', appState.customRates.length);
        console.log('  - Default Rate:', appState.settings.defaultIncentiveRate);
        
        updateDashboard();
        loadRecords();
        loadMonthlySummary();
        loadSettings();
        populateFilters();
        
        hideLoading();
    } catch (error) {
        console.error('Error loading data:', error);
        hideLoading();
        alert(`Failed to load data: ${error.message}`);
    } finally {
        appState.isLoading = false;
    }
}

async function addRecordToSheets(record) {
    showLoading();
    try {
        const result = await makeApiRequest(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain;charset=utf-8',
            },
            body: JSON.stringify({
                action: 'addRecord',
                record: record
            })
        });
        
        if (!result.success) {
            throw new Error(result.error || 'Failed to add record');
        }
        
        await loadDataFromSheets();
        hideLoading();
        return result;
    } catch (error) {
        hideLoading();
        alert('Failed to add record: ' + error.message);
        throw error;
    }
}

async function updateRecordInSheets(id, record) {
    showLoading();
    try {
        const result = await makeApiRequest(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain;charset=utf-8',
            },
            body: JSON.stringify({
                action: 'updateRecord',
                id: id,
                record: record
            })
        });
        
        if (!result.success) {
            throw new Error(result.error || 'Failed to update record');
        }
        
        await loadDataFromSheets();
        hideLoading();
        return result;
    } catch (error) {
        hideLoading();
        alert('Failed to update record: ' + error.message);
        throw error;
    }
}

async function deleteRecordFromSheets(id) {
    showLoading();
    try {
        const result = await makeApiRequest(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain;charset=utf-8',
            },
            body: JSON.stringify({
                action: 'deleteRecord',
                id: id
            })
        });
        
        if (!result.success) {
            throw new Error(result.error || 'Failed to delete record');
        }
        
        await loadDataFromSheets();
        hideLoading();
        return result;
    } catch (error) {
        hideLoading();
        alert('Failed to delete record: ' + error.message);
        throw error;
    }
}

async function addCustomRateToSheets(rate) {
    showLoading();
    try {
        const result = await makeApiRequest(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain;charset=utf-8',
            },
            body: JSON.stringify({
                action: 'addCustomRate',
                rate: rate
            })
        });
        
        if (!result.success) {
            throw new Error(result.error || 'Failed to add custom rate');
        }
        
        await loadDataFromSheets();
        hideLoading();
        return result;
    } catch (error) {
        hideLoading();
        alert('Failed to add custom rate: ' + error.message);
        throw error;
    }
}

async function deleteCustomRateFromSheets(id) {
    showLoading();
    try {
        const result = await makeApiRequest(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain;charset=utf-8',
            },
            body: JSON.stringify({
                action: 'deleteCustomRate',
                id: id
            })
        });
        
        if (!result.success) {
            throw new Error(result.error || 'Failed to delete custom rate');
        }
        
        await loadDataFromSheets();
        hideLoading();
        return result;
    } catch (error) {
        hideLoading();
        alert('Failed to delete custom rate: ' + error.message);
        throw error;
    }
}

async function updateSettingsInSheets(settings) {
    showLoading();
    try {
        const result = await makeApiRequest(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain;charset=utf-8',
            },
            body: JSON.stringify({
                action: 'updateSettings',
                settings: settings
            })
        });
        
        if (!result.success) {
            throw new Error(result.error || 'Failed to update settings');
        }
        
        await loadDataFromSheets();
        hideLoading();
        return result;
    } catch (error) {
        hideLoading();
        alert('Failed to update settings: ' + error.message);
        throw error;
    }
}

// ==========================================
// LOADING INDICATORS
// ==========================================

function showLoading() {
    document.body.style.cursor = 'wait';
}

function hideLoading() {
    document.body.style.cursor = 'default';
}

// ==========================================
// INITIALIZATION
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    
    if (checkExistingSession()) {
        console.log('Session restored for:', appState.currentUser.name);
    } else {
        console.log('No existing session, showing login screen');
    }
    
    const today = new Date();
    const currentMonth = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;
    document.getElementById('dashboardMonth').value = currentMonth;
});

function setupEventListeners() {
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('logoutBtn').addEventListener('click', handleLogout);

    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });

    document.getElementById('dashboardMonth').addEventListener('change', updateDashboard);
    document.getElementById('addRecordBtn').addEventListener('click', openAddRecordModal);
    document.getElementById('recordForm').addEventListener('submit', handleRecordSubmit);
    document.getElementById('cancelBtn').addEventListener('click', closeModals);
    document.getElementById('addRateBtn').addEventListener('click', openAddRateModal);
    document.getElementById('rateForm').addEventListener('submit', handleRateSubmit);
    document.getElementById('cancelRateBtn').addEventListener('click', closeModals);
    document.getElementById('saveRateBtn').addEventListener('click', saveDefaultRate);
    document.getElementById('searchInput').addEventListener('input', loadRecords);
    document.getElementById('monthFilter').addEventListener('change', loadRecords);
    document.getElementById('recruiterFilter').addEventListener('change', loadRecords);
    document.getElementById('amFilter').addEventListener('change', loadRecords);
    
    document.querySelectorAll('.close').forEach(btn => {
        btn.addEventListener('click', closeModals);
    });
}

// ==========================================
// AUTHENTICATION
// ==========================================

async function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('username').value.toLowerCase();
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;
    
    const result = await authenticateUser(username, password, role);
    
    if (result.success) {
        appState.currentUser = result.user;
        saveSession(result.user);
        showApp();
    } else {
        alert(result.error || 'Invalid credentials');
    }
}

function handleLogout() {
    clearSession();
    appState.currentUser = null;
    document.getElementById('loginScreen').style.display = 'flex';
    document.getElementById('appScreen').style.display = 'none';
    document.getElementById('loginForm').reset();
}

function showApp() {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('appScreen').style.display = 'flex';
    
    const isAdmin = appState.currentUser.role === 'admin';
    const roleDisplay = isAdmin ? 'ADMIN' : 'USER';
    document.getElementById('userInfo').textContent = 
        `${appState.currentUser.name} (${roleDisplay})`;
    
    document.getElementById('settingsTab').style.display = isAdmin ? 'block' : 'none';
    document.getElementById('addRecordBtn').style.display = isAdmin ? 'inline-flex' : 'none';
    document.querySelectorAll('.admin-only').forEach(el => {
        el.style.display = isAdmin ? '' : 'none';
    });
    
    loadDataFromSheets();
}

function switchTab(tabName) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    document.getElementById(tabName).classList.add('active');
}

// ==========================================
// CALCULATION FUNCTIONS - FIXED!
// ==========================================

function calculatePayoutDate(invoiceDate, paymentTermDays) {
    const parts = invoiceDate.split('-');
    const date = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
    
    // Set to day 1 to avoid date overflow issues (e.g., Aug 31 + 1 month = Oct 1)
    date.setDate(1);
    
    const term = parseInt(paymentTermDays);
    
    // Add appropriate months based on payment term
    if (term === 45) {
        date.setMonth(date.getMonth() + 2);  // 45 days = 2 months ahead
    } else {
        date.setMonth(date.getMonth() + 1);  // 15/30 days = 1 month ahead
    }
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    
    return `${year}-${month}`;
}

function getIncentiveRate(role, person, payoutMonth) {
    console.log(`🔍 Looking for custom rate: role="${role}", person="${person}", month="${payoutMonth}"`);
    
    const customRate = appState.customRates.find(r => {
        const roleMatch = r.role === role;
        const personMatch = r.person === person;
        const monthMatch = r.payoutMonth === payoutMonth;
        
        console.log(`   Checking rate:`, r);
        console.log(`   - Role match: ${roleMatch} (${r.role} === ${role})`);
        console.log(`   - Person match: ${personMatch} (${r.person} === ${person})`);
        console.log(`   - Month match: ${monthMatch} (${r.payoutMonth} === ${payoutMonth})`);
        
        return roleMatch && personMatch && monthMatch;
    });
    
    if (customRate) {
        console.log(`✅ Found custom rate: ${(parseFloat(customRate.rate) * 100).toFixed(2)}%`);
        return parseFloat(customRate.rate);
    }
    
    console.log(`❌ No custom rate found, using default: ${(appState.settings.defaultIncentiveRate * 100).toFixed(2)}%`);
    return parseFloat(appState.settings.defaultIncentiveRate);
}

function calculateIncentives(record, payoutMonth) {
    const invoiceValue = parseFloat(record.untaxedInvoicedValue) || 0;
    const salary = parseFloat(record.consultantMonthlySalary) || 0;
    const netProfit = invoiceValue - salary;
    
    console.log(`\n💰 Calculating incentives for: ${record.client}`);
    console.log(`   Invoice: ${record.invoiceDate}, Term: ${record.paymentTerm} days`);
    console.log(`   Payout Month: ${payoutMonth}`);
    console.log(`   Net Profit: ₹${netProfit.toLocaleString()}`);
    
    const recruiterRate = getIncentiveRate('Recruiter', record.recruiter, payoutMonth);
    const amRate = getIncentiveRate('AM', record.accountManager, payoutMonth);
    
    const recruiterIncentive = netProfit * recruiterRate;
    const amIncentive = netProfit * amRate;
    
    console.log(`   Final rates: Recruiter=${(recruiterRate * 100).toFixed(2)}%, AM=${(amRate * 100).toFixed(2)}%`);
    console.log(`   Incentives: Recruiter=₹${recruiterIncentive.toFixed(2)}, AM=₹${amIncentive.toFixed(2)}\n`);
    
    return {
        netProfit,
        recruiterIncentive,
        amIncentive,
        recruiterRate,
        amRate
    };
}

// ==========================================
// DASHBOARD
// ==========================================

function updateDashboard() {
    const selectedMonth = document.getElementById('dashboardMonth').value;
    const isAdmin = appState.currentUser.role === 'admin';
    const userName = appState.currentUser.name;
    
    let totalIncentives = 0;
    let recruiterIncentives = 0;
    let amIncentives = 0;
    let totalProfit = 0;
    const performersMap = new Map();
    
    appState.incentivesData.forEach(record => {
        if (!isAdmin && record.recruiter !== userName && record.accountManager !== userName) {
            return;
        }
        
        const payoutMonth = calculatePayoutDate(record.invoiceDate, record.paymentTerm);
        
        if (selectedMonth && payoutMonth !== selectedMonth) {
            return;
        }
        
        const calc = calculateIncentives(record, payoutMonth);
        
        totalProfit += calc.netProfit;
        recruiterIncentives += calc.recruiterIncentive;
        amIncentives += calc.amIncentive;
        
        if (!performersMap.has(record.recruiter)) {
            performersMap.set(record.recruiter, 0);
        }
        performersMap.set(record.recruiter, performersMap.get(record.recruiter) + calc.recruiterIncentive);
        
        if (!performersMap.has(record.accountManager)) {
            performersMap.set(record.accountManager, 0);
        }
        performersMap.set(record.accountManager, performersMap.get(record.accountManager) + calc.amIncentive);
    });
    
    totalIncentives = recruiterIncentives + amIncentives;
    
    document.getElementById('totalIncentives').textContent = formatCurrency(totalIncentives);
    document.getElementById('recruiterIncentives').textContent = formatCurrency(recruiterIncentives);
    document.getElementById('amIncentives').textContent = formatCurrency(amIncentives);
    document.getElementById('totalProfit').textContent = formatCurrency(totalProfit);
    
    const sorted = Array.from(performersMap.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);
    
    const performersHTML = sorted.map(([name, amount]) => `
        <div class="performer-item">
            <span class="performer-name">${name}</span>
            <span class="performer-amount">${formatCurrency(amount)}</span>
        </div>
    `).join('');
    
    document.getElementById('topPerformers').innerHTML = performersHTML || '<p>No data available</p>';
}

// ==========================================
// RECORDS
// ==========================================

function loadRecords() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const monthFilter = document.getElementById('monthFilter').value;
    const recruiterFilter = document.getElementById('recruiterFilter').value;
    const amFilter = document.getElementById('amFilter').value;
    const isAdmin = appState.currentUser.role === 'admin';
    const userName = appState.currentUser.name;
    
    const filtered = appState.incentivesData.filter(record => {
        if (!isAdmin && record.recruiter !== userName && record.accountManager !== userName) {
            return false;
        }
        
        if (searchTerm && !(
            record.client.toLowerCase().includes(searchTerm) ||
            record.recruiter.toLowerCase().includes(searchTerm) ||
            record.accountManager.toLowerCase().includes(searchTerm)
        )) {
            return false;
        }
        
        if (monthFilter) {
            const payoutMonth = calculatePayoutDate(record.invoiceDate, record.paymentTerm);
            if (payoutMonth !== monthFilter) {
                return false;
            }
        }
        
        if (recruiterFilter && record.recruiter !== recruiterFilter) {
            return false;
        }
        
        if (amFilter && record.accountManager !== amFilter) {
            return false;
        }
        
        return true;
    });
    
    const tbody = document.getElementById('recordsTableBody');
    tbody.innerHTML = filtered.map((record) => {
        const payoutMonth = calculatePayoutDate(record.invoiceDate, record.paymentTerm);
        const calc = calculateIncentives(record, payoutMonth);
        const actualIndex = appState.incentivesData.indexOf(record);
        
        return `
            <tr>
                <td>${formatDate(record.invoiceDate)}</td>
                <td>${record.client}</td>
                <td>${record.recruiter}</td>
                <td>${record.accountManager}</td>
                <td>${record.paymentTerm} days</td>
                <td>${formatCurrency(record.untaxedInvoicedValue)}</td>
                <td>${formatCurrency(record.consultantMonthlySalary)}</td>
                <td><strong>${formatCurrency(calc.netProfit)}</strong></td>
                <td>${formatCurrency(calc.recruiterIncentive)}<br><small>(${(calc.recruiterRate * 100).toFixed(2)}%)</small></td>
                <td>${formatCurrency(calc.amIncentive)}<br><small>(${(calc.amRate * 100).toFixed(2)}%)</small></td>
                <td>${record.remarks || '-'}</td>
                ${isAdmin ? `
                    <td>
                        <div class="action-buttons">
                            <button class="btn btn-secondary" onclick="editRecord(${actualIndex})">Edit</button>
                            <button class="btn btn-danger" onclick="deleteRecord(${actualIndex})">Delete</button>
                        </div>
                    </td>
                ` : ''}
            </tr>
        `;
    }).join('');
}

function populateFilters() {
    const isAdmin = appState.currentUser.role === 'admin';
    const userName = appState.currentUser.name;
    
    const months = new Set();
    const recruiters = new Set();
    const ams = new Set();
    
    appState.incentivesData.forEach(record => {
        if (!isAdmin && record.recruiter !== userName && record.accountManager !== userName) {
            return;
        }
        
        const payoutMonth = calculatePayoutDate(record.invoiceDate, record.paymentTerm);
        months.add(payoutMonth);
        recruiters.add(record.recruiter);
        ams.add(record.accountManager);
    });
    
    const monthFilter = document.getElementById('monthFilter');
    monthFilter.innerHTML = '<option value="">All Months</option>' +
        Array.from(months).sort().reverse().map(m => 
            `<option value="${m}">${formatMonth(m)}</option>`
        ).join('');
    
    const recruiterFilter = document.getElementById('recruiterFilter');
    recruiterFilter.innerHTML = '<option value="">All Recruiters</option>' +
        Array.from(recruiters).sort().map(r => 
            `<option value="${r}">${r}</option>`
        ).join('');

    const amFilter = document.getElementById('amFilter');
    amFilter.innerHTML = '<option value="">All Account Managers</option>' +
        Array.from(ams).sort().map(a => 
            `<option value="${a}">${a}</option>`
        ).join('');
}

function loadMonthlySummary() {
    const monthlyData = new Map();
    const isAdmin = appState.currentUser.role === 'admin';
    const userName = appState.currentUser.name;

    appState.incentivesData.forEach(record => {
        if (!isAdmin && record.recruiter !== userName && record.accountManager !== userName) {
            return;
        }

        const payoutMonth = calculatePayoutDate(record.invoiceDate, record.paymentTerm);
        const calc = calculateIncentives(record, payoutMonth);
        
        if (!monthlyData.has(payoutMonth)) {
            monthlyData.set(payoutMonth, {
                totalProfit: 0,
                recruiterIncentives: 0,
                amIncentives: 0
            });
        }
        
        const data = monthlyData.get(payoutMonth);
        data.totalProfit += calc.netProfit;
        data.recruiterIncentives += calc.recruiterIncentive;
        data.amIncentives += calc.amIncentive;
    });

    const sorted = Array.from(monthlyData.entries()).sort((a, b) => b[0].localeCompare(a[0]));
    
    const tbody = document.getElementById('monthlyTableBody');
    tbody.innerHTML = sorted.map(([month, data]) => `
        <tr>
            <td>${formatMonth(month)}</td>
            <td>${formatCurrency(data.totalProfit)}</td>
            <td>${formatCurrency(data.recruiterIncentives)}</td>
            <td>${formatCurrency(data.amIncentives)}</td>
            <td><strong>${formatCurrency(data.recruiterIncentives + data.amIncentives)}</strong></td>
        </tr>
    `).join('');
}

// ==========================================
// MODALS
// ==========================================

function openAddRecordModal() {
    appState.editingRecordIndex = null;
    document.getElementById('modalTitle').textContent = 'Add New Record';
    document.getElementById('recordForm').reset();
    document.getElementById('recordModal').classList.add('show');
}

function editRecord(index) {
    appState.editingRecordIndex = index;
    const record = appState.incentivesData[index];
    
    document.getElementById('modalTitle').textContent = 'Edit Record';
    const form = document.getElementById('recordForm');
    form.invoiceDate.value = record.invoiceDate;
    form.client.value = record.client;
    form.recruiter.value = record.recruiter;
    form.accountManager.value = record.accountManager;
    form.paymentTerm.value = record.paymentTerm;
    form.untaxedInvoicedValue.value = record.untaxedInvoicedValue;
    form.consultantMonthlySalary.value = record.consultantMonthlySalary;
    form.remarks.value = record.remarks || '';
    
    document.getElementById('recordModal').classList.add('show');
}

async function deleteRecord(index) {
    if (confirm('Are you sure you want to delete this record?')) {
        const record = appState.incentivesData[index];
        
        if (record.id) {
            await deleteRecordFromSheets(record.id);
        } else {
            appState.incentivesData.splice(index, 1);
            loadRecords();
            updateDashboard();
            loadMonthlySummary();
            populateFilters();
        }
    }
}

async function handleRecordSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const record = {
        invoiceDate: formData.get('invoiceDate'),
        client: formData.get('client'),
        recruiter: formData.get('recruiter'),
        accountManager: formData.get('accountManager'),
        paymentTerm: parseInt(formData.get('paymentTerm')),
        untaxedInvoicedValue: parseFloat(formData.get('untaxedInvoicedValue')),
        consultantMonthlySalary: parseFloat(formData.get('consultantMonthlySalary')),
        remarks: formData.get('remarks') || '',
        createdBy: appState.currentUser.name
    };
    
    if (appState.editingRecordIndex !== null) {
        const existingRecord = appState.incentivesData[appState.editingRecordIndex];
        if (existingRecord.id) {
            await updateRecordInSheets(existingRecord.id, record);
        }
    } else {
        await addRecordToSheets(record);
    }
    
    closeModals();
}

function openAddRateModal() {
    document.getElementById('rateForm').reset();
    document.getElementById('rateModal').classList.add('show');
}

async function handleRateSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const rate = {
        role: formData.get('role'),
        person: formData.get('person'),
        payoutMonth: formData.get('payoutMonth'),
        rate: parseFloat(formData.get('rate'))
    };
    
    await addCustomRateToSheets(rate);
    closeModals();
}

function closeModals() {
    document.getElementById('recordModal').classList.remove('show');
    document.getElementById('rateModal').classList.remove('show');
}

// ==========================================
// SETTINGS
// ==========================================

function loadSettings() {
    document.getElementById('defaultRate').value = appState.settings.defaultIncentiveRate;
    
    const ratesHTML = `
        <table>
            <thead>
                <tr>
                    <th>Role</th>
                    <th>Person</th>
                    <th>Month</th>
                    <th>Rate</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${appState.customRates.map((rate, index) => `
                    <tr>
                        <td>${rate.role}</td>
                        <td>${rate.person}</td>
                        <td>${formatMonth(rate.payoutMonth)}</td>
                        <td>${(rate.rate * 100).toFixed(2)}%</td>
                        <td>
                            <button class="btn btn-danger" onclick="deleteRate(${index})">Delete</button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    
    document.getElementById('customRatesTable').innerHTML = ratesHTML;
}

async function saveDefaultRate() {
    const newRate = parseFloat(document.getElementById('defaultRate').value);
    if (newRate >= 0 && newRate <= 1) {
        const settings = {
            defaultIncentiveRate: newRate
        };
        
        await updateSettingsInSheets(settings);
        alert('Default rate updated successfully!');
    } else {
        alert('Please enter a valid rate between 0 and 1');
    }
}

async function deleteRate(index) {
    if (confirm('Are you sure you want to delete this custom rate?')) {
        const rate = appState.customRates[index];
        
        if (rate.id) {
            await deleteCustomRateFromSheets(rate.id);
        } else {
            appState.customRates.splice(index, 1);
            loadSettings();
            updateDashboard();
            loadRecords();
        }
    }
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

function formatCurrency(amount) {
    return '₹' + amount.toLocaleString('en-IN', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
}

function formatDate(dateString) {
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
}

function formatMonth(monthString) {
    const [year, month] = monthString.split('-');
    const date = new Date(year, parseInt(month) - 1);
    return date.toLocaleDateString('en-IN', { year: 'numeric', month: 'long' });
}

// ==========================================
// DEBUG FUNCTIONS (Call from browser console)
// ==========================================

// Debug custom rates matching
window.debugCustomRates = function() {
    console.log('=== DEBUG: Custom Rates ===');
    console.log('Custom Rates:', appState.customRates);
    console.log('Default Rate:', appState.settings.defaultIncentiveRate);
    
    console.log('\n=== Testing First 3 Records ===');
    appState.incentivesData.slice(0, 3).forEach(record => {
        const payoutMonth = calculatePayoutDate(record.invoiceDate, record.paymentTerm);
        console.log(`\n${record.client}:`);
        console.log(`  Invoice: ${record.invoiceDate}, Term: ${record.paymentTerm} days`);
        console.log(`  Payout Month: ${payoutMonth}`);
        console.log(`  Recruiter: ${record.recruiter}`);
        console.log(`  AM: ${record.accountManager}`);
        
        const calc = calculateIncentives(record, payoutMonth);
        console.log(`  Recruiter Rate: ${(calc.recruiterRate * 100).toFixed(2)}%`);
        console.log(`  AM Rate: ${(calc.amRate * 100).toFixed(2)}%`);
    });
};

// Show payout months for all records
window.debugPayoutMonths = function() {
    console.log('=== DEBUG: Payout Months ===');
    const monthCounts = {};
    
    appState.incentivesData.forEach(record => {
        const payoutMonth = calculatePayoutDate(record.invoiceDate, record.paymentTerm);
        if (!monthCounts[payoutMonth]) {
            monthCounts[payoutMonth] = [];
        }
        monthCounts[payoutMonth].push({
            client: record.client,
            invoice: record.invoiceDate,
            term: record.paymentTerm
        });
    });
    
    Object.keys(monthCounts).sort().forEach(month => {
        console.log(`\n${month}: ${monthCounts[month].length} records`);
        monthCounts[month].forEach(r => {
            console.log(`  - ${r.client} (${r.invoice} + ${r.term}d)`);
        });
    });
};

console.log('💡 Debug functions available:');
console.log('  - debugCustomRates() : Check custom rate matching');
console.log('  - debugPayoutMonths() : See payout month distribution');
