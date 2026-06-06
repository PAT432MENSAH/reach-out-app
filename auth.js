// Authentication & Account Management

// Check if user is logged in
function isLoggedIn() {
    return localStorage.getItem('currentUser') !== null;
}

// Redirect to login if not authenticated
function requireAuth() {
    if (!isLoggedIn()) {
        window.location.href = 'login.html';
    }
}

// Get current user
function getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}

// Logout
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

// Initialize auth UI in header
function initAuthUI() {
    const nav = document.querySelector('.main-nav');
    if (!nav) return;

    // Check if auth links already exist to prevent duplicates
    if (nav.querySelector('.logout-link') || nav.querySelector('a[href="login.html"]')) {
        return;
    }

    if (isLoggedIn()) {
        const user = getCurrentUser();
        const authLinks = `
            <a href="dashboard.html">Dashboard</a>
            <a href="#" onclick="logout(); return false;" class="logout-link">Logout</a>
        `;
        nav.insertAdjacentHTML('beforeend', authLinks);
    } else {
        const authLinks = `
            <a href="login.html">Login</a>
            <a href="signup.html" class="button primary" style="margin-left: 8px;">Sign Up</a>
        `;
        nav.insertAdjacentHTML('beforeend', authLinks);
    }
}

// Handle Signup
document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (password !== confirmPassword) {
                showMessage('Passwords do not match', 'error');
                return;
            }

            // Check if user already exists
            const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
            if (existingUsers.find(u => u.email === email)) {
                showMessage('Email already registered', 'error');
                return;
            }

            // Create new user
            const newUser = {
                id: Date.now(),
                name,
                email,
                password,
                createdAt: new Date().toISOString()
            };

            existingUsers.push(newUser);
            localStorage.setItem('users', JSON.stringify(existingUsers));

            // Auto-login
            localStorage.setItem('currentUser', JSON.stringify({
                id: newUser.id,
                name: newUser.name,
                email: newUser.email
            }));

            showMessage('Account created! Redirecting...', 'success');
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
        });
    }

    // Handle Login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                localStorage.setItem('currentUser', JSON.stringify({
                    id: user.id,
                    name: user.name,
                    email: user.email
                }));
                showMessage('Login successful! Redirecting...', 'success');
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1500);
            } else {
                showMessage('Invalid email or password', 'error');
            }
        });
    }

    // Handle Forgot Password
    const forgotForm = document.getElementById('forgotForm');
    if (forgotForm) {
        forgotForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const email = document.getElementById('email').value;
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const user = users.find(u => u.email === email);

            if (user) {
                showMessage('Reset link sent to your email', 'success');
                document.getElementById('forgotForm').style.display = 'none';
                document.getElementById('resetForm').style.display = 'block';
                localStorage.setItem('resetUser', JSON.stringify(user));
            } else {
                showMessage('Email not found', 'error');
            }
        });

        const resetSubmit = document.getElementById('resetSubmit');
        if (resetSubmit) {
            resetSubmit.addEventListener('click', function() {
                const newPassword = document.getElementById('newPassword').value;
                const confirmNewPassword = document.getElementById('confirmNewPassword').value;

                if (newPassword !== confirmNewPassword) {
                    showMessage('Passwords do not match', 'error');
                    return;
                }

                const resetUser = JSON.parse(localStorage.getItem('resetUser'));
                const users = JSON.parse(localStorage.getItem('users') || '[]');
                const userIndex = users.findIndex(u => u.id === resetUser.id);

                if (userIndex !== -1) {
                    users[userIndex].password = newPassword;
                    localStorage.setItem('users', JSON.stringify(users));
                    localStorage.removeItem('resetUser');
                    showMessage('Password updated! Redirecting to login...', 'success');
                    setTimeout(() => {
                        window.location.href = 'login.html';
                    }, 1500);
                }
            });
        }
    }

    // Initialize auth UI on home pages
    initAuthUI();
});

function showMessage(text, type) {
    const messageEl = document.getElementById('authMessage');
    if (messageEl) {
        messageEl.textContent = text;
        messageEl.className = 'auth-message ' + type;
        messageEl.style.display = 'block';
    }
}
