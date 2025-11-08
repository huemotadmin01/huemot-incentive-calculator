// ✅ Google Sheets API Endpoint
const SHEETS_API_URL = 'https://script.google.com/macros/s/AKfycbx_hFN0DxlsCww8EaTpRW8Cf21gkOLLpFkFxSTuwmjkqlNDAs2Vct28BGiqqTzeSCFq/exec';

let appState = {
    currentUser: null,
    incentivesData: [],
    editingRecord: null
};

const users = {
    'admin': { password: 'admin123', role: 'admin', name: 'Admin User' },
    'chitransh': { password: 'user123', role: 'user', name: 'Chitransh Nawani' },
    'dipika': { password: 'user123', role: 'user', name: 'Dipika Shrivastava' },
    'niharika': { password: 'user123', role: 'user', name: 'Niharika Sahu' },
    'priyanshu': { password: 'user123', role: 'user', name: 'Priyanshu Sahu' },
    'ritika': { password: 'user123', role: 'user', name: 'Ritika Asudani' },
    'sanjana': { password: 'user123', role: 'user', name: 'Sanjana Patel' },
    'soniya': { password: 'user123', role: 'user', name: 'Soniya Raghuwanshi' },
    'ashish': { password: 'user123', role: 'user', name: 'Ashish Rathore' },
};

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('logoutBtn').addEventListener('click', handleLogout);
    document.getElementById('recordForm').addEventListener('submit', handleRecordSubmit);
    loadRecords();
});

function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const user = users[username];
    if (user && user.password === password) {
        appState.currentUser = { username, role: user.role, name: user.name };
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('appScreen').style.display = 'block';
        loadRecords();
    } else {
        alert('Invalid credentials');
    }
}

function handleLogout() {
    appState.currentUser = null;
    document.getElementById('loginScreen').style.display = 'flex';
    document.getElementById('appScreen').style.display = 'none';
}

function loadRecords() {
    fetch(SHEETS_API_URL)
        .then(res => res.json())
        .then(data => {
            appState.incentivesData = data;
            renderTable();
        })
        .catch(err => console.error('Error loading data:', err));
}

function renderTable() {
    const tbody = document.getElementById('recordsTableBody');
    tbody.innerHTML = '';
    appState.incentivesData.forEach(record => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${record["Invoice Date"] || ''}</td>
            <td>${record["Client"] || ''}</td>
            <td>${record["Recruiter"] || ''}</td>
            <td>${record["Account Manager"] || ''}</td>
            <td>${record["Payment Term"] || ''}</td>
            <td>${record["Invoice Value"] || ''}</td>
            <td>${record["Consultant Salary"] || ''}</td>
            <td>${record["Net Profit"] || ''}</td>
            <td>${record["Recruiter Incentive"] || ''}</td>
            <td>${record["AM Incentive"] || ''}</td>
            <td>${record["Remarks"] || ''}</td>
            <td>
                <button onclick="editRecord(${record.id})">✏️ Edit</button>
                <button onclick="deleteRecord(${record.id})">🗑️ Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function handleRecordSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const record = Object.fromEntries(formData.entries());
    record.untaxedInvoicedValue = parseFloat(record.untaxedInvoicedValue);
    record.consultantMonthlySalary = parseFloat(record.consultantMonthlySalary);
    record.netProfit = record.untaxedInvoicedValue - record.consultantMonthlySalary;
    record.recruiterIncentive = record.netProfit * 0.05;
    record.amIncentive = record.netProfit * 0.05;

    const method = appState.editingRecord ? 'PUT' : 'POST';
    if (appState.editingRecord) record.id = appState.editingRecord.id;

    fetch(SHEETS_API_URL, {
        method,
        body: JSON.stringify(record),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(res => res.json())
        .then(response => {
            if (response.success) {
                alert(appState.editingRecord ? '✅ Record updated' : '✅ Record added');
                appState.editingRecord = null;
                e.target.reset();
                loadRecords();
            } else {
                alert('❌ Error: ' + response.error);
            }
        })
        .catch(err => alert('⚠️ Network error: ' + err));
}

function editRecord(id) {
    const record = appState.incentivesData.find(r => r.id === id);
    if (!record) return;
    appState.editingRecord = record;
    for (const key in record) {
        if (document.getElementById(key)) {
            document.getElementById(key).value = record[key];
        }
    }
    document.getElementById('recordModal').classList.add('show');
}

function deleteRecord(id) {
    if (!confirm('Are you sure you want to delete this record?')) return;
    fetch(SHEETS_API_URL, {
        method: 'DELETE',
        body: JSON.stringify({ id }),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(res => res.json())
        .then(response => {
            if (response.success) {
                alert('🗑️ Record deleted');
                loadRecords();
            } else {
                alert('❌ Error: ' + response.error);
            }
        })
        .catch(err => alert('⚠️ Network error: ' + err));
}
