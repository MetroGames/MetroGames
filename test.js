// ========== SCRIPT.JS UNTUK WEBSITE PEMBELI ==========
// File ini diupload ke GitHub bersama file lainnya

const ACTIVE_CODES_KEY = 'gamePremiumActiveCodes';

function validateAccessCode(code) {
    const activeCodes = JSON.parse(localStorage.getItem(ACTIVE_CODES_KEY) || '[]');
    const foundCode = activeCodes.find(c => c.code === code && c.status === 'active');
    
    if (foundCode) {
        return { valid: true, codeData: foundCode };
    }
    return { valid: false, message: 'Kode tidak valid!' };
}

function handleLogin() {
    const form = document.getElementById('loginForm');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const code = document.getElementById('accessCode').value.trim();
        const validation = validateAccessCode(code);
        
        if (validation.valid) {
            localStorage.setItem('gameLibrarySession', 'true');
            localStorage.setItem('userAccessCode', code);
            window.location.href = 'dashboard.html';
        } else {
            alert(validation.message);
        }
    });
}

function checkAccess() {
    const isLoggedIn = localStorage.getItem('gameLibrarySession');
    const currentPage = window.location.pathname;
    
    if (!isLoggedIn && !currentPage.includes('index.html') && currentPage !== '/' && !currentPage.includes('login')) {
        window.location.href = 'index.html';
    }
}

function setupLogout() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('gameLibrarySession');
            localStorage.removeItem('userAccessCode');
            window.location.href = 'index.html';
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    checkAccess();
    handleLogin();
    setupLogout();
});