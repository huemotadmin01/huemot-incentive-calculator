// ==========================================
// CONFIGURATION - UPDATE THIS WITH YOUR APPS SCRIPT URL
// ==========================================
const API_URL = 'https://script.google.com/macros/s/AKfycbym7p3d8KDor4eNUqt2vCE9Gr86I9DUYg47fnBfiuwFVqIen5VSexYssR5VX6ZfT5Hf/exec'; // Replace after deploying Apps Script

// Application State
let appState = {
    currentUser: null,
    incentivesData: [],
    customRates: [],
    settings: {
        defaultIncentiveRate: 0.06
    },
    editingRecordIndex: null,
    isLoading: false
};

// ==========================================
// API FUNCTIONS - Connect to Google Sheets
// ==========================================

/**
 * Load all data from Google Sheets
 */
async function loadDataFromSheets() {
    if (appState.isLoading) return;
    
    appState.isLoading = true;
    showLoading();
    
    try {
        const response = await fetch(`${API_URL}?action=getAllData`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.error) {
            throw new Error(data.error);
        }
        
        // Update app state with fetched data
        appState.incentivesData = data.records || [];
        appState.customRates = data.customRates || [];
        appState.settings = data.settings || { defaultIncentiveRate: 0.06 };
        
        // Refresh all views
        updateDashboard();
        loadRecords();
        loadMonthlySummary();
        loadSettings();
        populateFilters();
        
        hideLoading();
    } catch (error) {
        console.error('Error loading data:', error);
        hideLoading();
        alert(`Failed to load data from Google Sheets: ${error.message}\n\nMake sure you've:\n1. Deployed the Apps Script as a web app\n2. Updated the API_URL in app.js\n3. Set access to "Anyone"`);
    } finally {
        appState.isLoading = false;
    }
}

/**
 * Add new record to Google Sheets
 */
async function addRecordToSheets(record) {
    showLoading();
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'addRecord',
                record: record
            })
        });
        
        const result = await response.json();
        
        if (!result.success) {
            throw new Error(result.error || 'Failed to add record');
        }
        
        // Add ID to record
        record.id = result.id;
        
        // Reload data to stay in sync
        await loadDataFromSheets();
        
        hideLoading();
        return result;
    } catch (error) {
        hideLoading();
        console.error('Error adding record:', error);
        alert('Failed to add record: ' + error.message);
        throw error;
    }
}

/**
 * Update existing record in Google Sheets
 */
async function updateRecordInSheets(id, record) {
    showLoading();
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'updateRecord',
                id: id,
                record: record
            })
        });
        
        const result = await response.json();
        
        if (!result.success) {
            throw new Error(result.error || 'Failed to update record');
        }
        
        // Reload data to stay in sync
        await loadDataFromSheets();
        
        hideLoading();
        return result;
    } catch (error) {
        hideLoading();
        console.error('Error updating record:', error);
        alert('Failed to update record: ' + error.message);
        throw error;
    }
}

/**
 * Delete record from Google Sheets
 */
async function deleteRecordFromSheets(id) {
    showLoading();
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'deleteRecord',
                id: id
            })
        });
        
        const result = await response.json();
        
        if (!result.success) {
            throw new Error(result.error || 'Failed to delete record');
        }
        
        // Reload data to stay in sync
        await loadDataFromSheets();
        
        hideLoading();
        return result;
    } catch (error) {
        hideLoading();
        console.error('Error deleting record:', error);
        alert('Failed to delete record: ' + error.message);
        throw error;
    }
}

/**
 * Add custom rate to Google Sheets
 */
async function addCustomRateToSheets(rate) {
    showLoading();
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'addCustomRate',
                rate: rate
            })
        });
        
        const result = await response.json();
        
        if (!result.success) {
            throw new Error(result.error || 'Failed to add custom rate');
        }
        
        rate.id = result.id;
        await loadDataFromSheets();
        
        hideLoading();
        return result;
    } catch (error) {
        hideLoading();
        console.error('Error adding custom rate:', error);
        alert('Failed to add custom rate: ' + error.message);
        throw error;
    }
}

/**
 * Delete custom rate from Google Sheets
 */
async function deleteCustomRateFromSheets(id) {
    showLoading();
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'deleteCustomRate',
                id: id
            })
        });
        
        const result = await response.json();
        
        if (!result.success) {
            throw new Error(result.error || 'Failed to delete custom rate');
        }
        
        await loadDataFromSheets();
        
        hideLoading();
        return result;
    } catch (error) {
        hideLoading();
        console.error('Error deleting custom rate:', error);
        alert('Failed to delete custom rate: ' + error.message);
        throw error;
    }
}

/**
 * Update settings in Google Sheets
 */
async function updateSettingsInSheets(settings) {
    showLoading();
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'updateSettings',
                settings: settings
            })
        });
        
        const result = await response.json();
        
        if (!result.success) {
            throw new Error(result.error || 'Failed to update settings');
        }
        
        await loadDataFromSheets();
        
        hideLoading();
        return result;
    } catch (error) {
        hideLoading();
        console.error('Error updating settings:', error);
        alert('Failed to update settings: ' + error.message);
        throw error;
    }
}

// ==========================================
// LOADING INDICATORS
// ==========================================

function showLoading() {
    // You can add a loading overlay here
    document.body.style.cursor = 'wait';
}

function hideLoading() {
    document.body.style.cursor = 'default';
}

// ==========================================
// AUTHENTICATION & INITIALIZATION
// ==========================================

// User credentials (in production, move to secure backend)
const users = {
    admin: { password: 'admin123', role: 'admin', name: 'Admin' },
    chitransh: { password: 'user123', role: 'user', name: 'Chitransh Nawani' },
    dipika: { password: 'user123', role: 'user', name: 'Dipika Chaudhary' },
    niharika: { password: 'user123', role: 'user', name: 'Niharika Sao' },
    priyanshu: { password: 'user123', role: 'user', name: 'Priyanshu Sahu' },
    ritika: { password: 'user123', role: 'user', name: 'Ritika Asudani' },
    sanjana: { password: 'user123', role: 'user', name: 'Sanjana Patel' },
    soniya: { password: 'user123', role: 'user', name: 'Soniya Raghuwanshi' },
    zeenat: { password: 'user123', role: 'user', name: 'Zeenat Bano' }
};

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Login form
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    
    // Logout
    document.getElementById('logoutBtn').addEventListener('click', handleLogout);
    
    // Tab navigation
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });
    
    // Dashboard month selector
    document.getElementById('dashboardMonth').addEventListener('change', updateDashboard);
    
    // Record modal
    document.getElementById('addRecordBtn').addEventListener('click', openAddRecordModal);
    document.getElementById('recordForm').addEventListener('submit', handleRecordSubmit);
    document.getElementById('cancelBtn').addEventListener('click', closeModals);
    
    // Rate modal
    document.getElementById('addRateBtn').addEventListener('click', openAddRateModal);
    document.getElementById('rateForm').addEventListener('submit', handleRateSubmit);
    document.getElementById('cancelRateBtn').addEventListener('click', closeModals);
    
    // Settings
    document.getElementById('saveRateBtn').addEventListener('click', saveDefaultRate);
    
    // Filters
    document.getElementById('searchInput').addEventListener('input', loadRecords);
    document.getElementById('monthFilter').addEventListener('change', loadRecords);
    document.getElementById('recruiterFilter').addEventListener('change', loadRecords);
    document.getElementById('amFilter').addEventListener('change', loadRecords);
    
    // Modal close buttons
    document.querySelectorAll('.close').forEach(btn => {
        btn.addEventListener('click', closeModals);
    });
    
    // Set default dashboard month to current month
    const today = new Date();
    const currentMonth = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;
    document.getElementById('dashboardMonth').value = currentMonth;
});

function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('username').value.toLowerCase();
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;
    
    const user = users[username];
    
    if (user && user.password === password && user.role === role) {
        appState.currentUser = user;
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('appScreen').style.display = 'flex';
        document.getElementById('userInfo').textContent = `Logged in as: ${user.name} (${user.role})`;
        
        // Show/hide admin elements
        if (user.role === 'admin') {
            document.querySelectorAll('.admin-only').forEach(el => el.style.display = '');
            document.getElementById('settingsTab').style.display = '';
        }
        
        // Load data from Google Sheets
        loadDataFromSheets();
    } else {
        alert('Invalid credentials!');
    }
}

function handleLogout() {
    appState.currentUser = null;
    document.getElementById('loginScreen').style.display = 'flex';
    document.getElementById('appScreen').style.display = 'none';
    document.getElementById('loginForm').reset();
}

function switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tabName);
    });
    
    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.toggle('active', content.id === tabName);
    });
}

// ==========================================
// CALCULATION FUNCTIONS
// ==========================================

/**
 * Calculate payout date based on invoice date and payment term
 * FIXED: Properly handles month boundaries and timezone issues
 */
function calculatePayoutDate(invoiceDate, paymentTermDays) {
    // Parse the invoice date as local date (not UTC)
    const parts = invoiceDate.split('-');
    const invoiceDay = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
    
    // Add payment term days
    const payoutDay = new Date(invoiceDay);
    payoutDay.setDate(payoutDay.getDate() + parseInt(paymentTermDays));
    
    // Return as YYYY-MM format
    const year = payoutDay.getFullYear();
    const month = String(payoutDay.getMonth() + 1).padStart(2, '0');
    
    return `${year}-${month}`;
}

/**
 * Get incentive rate for a person in a specific month
 */
function getIncentiveRate(role, person, payoutMonth) {
    // Check for custom rate first
    const customRate = appState.customRates.find(r => 
        r.role === role && 
        r.person === person && 
        r.payoutMonth === payoutMonth
    );
    
    if (customRate) {
        return parseFloat(customRate.rate);
    }
    
    // Return default rate
    return parseFloat(appState.settings.defaultIncentiveRate);
}

/**
 * Calculate all incentive values for a record
 */
function calculateIncentives(record, payoutMonth) {
    const invoiceValue = parseFloat(record.untaxedInvoicedValue) || 0;
    const salary = parseFloat(record.consultantMonthlySalary) || 0;
    const netProfit = invoiceValue - salary;
    
    const recruiterRate = getIncentiveRate('Recruiter', record.recruiter, payoutMonth);
    const amRate = getIncentiveRate('AM', record.accountManager, payoutMonth);
    
    const recruiterIncentive = netProfit * recruiterRate;
    const amIncentive = netProfit * amRate;
    
    return {
        netProfit,
        recruiterIncentive,
        amIncentive,
        recruiterRate,
        amRate
    };
}

// ==========================================
// DASHBOARD FUNCTIONS
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
        // For non-admin, only show their records
        if (!isAdmin && record.recruiter !== userName && record.accountManager !== userName) {
            return;
        }
        
        const payoutMonth = calculatePayoutDate(record.invoiceDate, record.paymentTerm);
        
        // Filter by selected month if specified
        if (selectedMonth && payoutMonth !== selectedMonth) {
            return;
        }
        
        const calc = calculateIncentives(record, payoutMonth);
        
        totalProfit += calc.netProfit;
        recruiterIncentives += calc.recruiterIncentive;
        amIncentives += calc.amIncentive;
        
        // Track performers
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
    
    // Update stats
    document.getElementById('totalIncentives').textContent = formatCurrency(totalIncentives);
    document.getElementById('recruiterIncentives').textContent = formatCurrency(recruiterIncentives);
    document.getElementById('amIncentives').textContent = formatCurrency(amIncentives);
    document.getElementById('totalProfit').textContent = formatCurrency(totalProfit);
    
    // Update top performers
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
// RECORDS TABLE FUNCTIONS
// ==========================================

function loadRecords() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const monthFilter = document.getElementById('monthFilter').value;
    const recruiterFilter = document.getElementById('recruiterFilter').value;
    const amFilter = document.getElementById('amFilter').value;
    const isAdmin = appState.currentUser.role === 'admin';
    const userName = appState.currentUser.name;
    
    const filtered = appState.incentivesData.filter(record => {
        // Access control for non-admin users
        if (!isAdmin && record.recruiter !== userName && record.accountManager !== userName) {
            return false;
        }
        
        // Search filter
        if (searchTerm && !(
            record.client.toLowerCase().includes(searchTerm) ||
            record.recruiter.toLowerCase().includes(searchTerm) ||
            record.accountManager.toLowerCase().includes(searchTerm)
        )) {
            return false;
        }
        
        // Month filter
        if (monthFilter) {
            const payoutMonth = calculatePayoutDate(record.invoiceDate, record.paymentTerm);
            if (payoutMonth !== monthFilter) {
                return false;
            }
        }
        
        // Recruiter filter
        if (recruiterFilter && record.recruiter !== recruiterFilter) {
            return false;
        }
        
        // AM filter
        if (amFilter && record.accountManager !== amFilter) {
            return false;
        }
        
        return true;
    });
    
    const tbody = document.getElementById('recordsTableBody');
    tbody.innerHTML = filtered.map((record, index) => {
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
    
    // Collect unique months, recruiters, and AMs from visible records
    const months = new Set();
    const recruiters = new Set();
    const ams = new Set();
    
    appState.incentivesData.forEach(record => {
        // For non-admin, only show data from their records
        if (!isAdmin && record.recruiter !== userName && record.accountManager !== userName) {
            return;
        }
        
        const payoutMonth = calculatePayoutDate(record.invoiceDate, record.paymentTerm);
        months.add(payoutMonth);
        recruiters.add(record.recruiter);
        ams.add(record.accountManager);
    });
    
    // Month filter
    const monthFilter = document.getElementById('monthFilter');
    monthFilter.innerHTML = '<option value="">All Months</option>' +
        Array.from(months).sort().reverse().map(m => 
            `<option value="${m}">${formatMonth(m)}</option>`
        ).join('');
    
    // Recruiter filter - for non-admin, only show recruiters from their records
    const recruiterFilter = document.getElementById('recruiterFilter');
    recruiterFilter.innerHTML = '<option value="">All Recruiters</option>' +
        Array.from(recruiters).sort().map(r => 
            `<option value="${r}">${r}</option>`
        ).join('');

    // AM filter - for non-admin, only show AMs from their records
    const amFilter = document.getElementById('amFilter');
    amFilter.innerHTML = '<option value="">All Account Managers</option>' +
        Array.from(ams).sort().map(a => 
            `<option value="${a}">${a}</option>`
        ).join('');
}

// Load monthly summary
function loadMonthlySummary() {
    const monthlyData = new Map();
    const isAdmin = appState.currentUser.role === 'admin';
    const userName = appState.currentUser.name;

    appState.incentivesData.forEach(record => {
        // For non-admin, only include records where they're involved
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
// MODAL & CRUD FUNCTIONS
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
            // Delete from Google Sheets
            await deleteRecordFromSheets(record.id);
        } else {
            // Fallback for records without ID (shouldn't happen with new system)
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
        // Update existing record
        const existingRecord = appState.incentivesData[appState.editingRecordIndex];
        if (existingRecord.id) {
            await updateRecordInSheets(existingRecord.id, record);
        }
    } else {
        // Add new record
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
// SETTINGS FUNCTIONS
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
            // Fallback
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
    const date = new Date(dateString + 'T00:00:00'); // Force local timezone
    return date.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
}

function formatMonth(monthString) {
    const [year, month] = monthString.split('-');
    const date = new Date(year, parseInt(month) - 1);
    return date.toLocaleDateString('en-IN', { year: 'numeric', month: 'long' });
}
