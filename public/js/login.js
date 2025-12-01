const API_URL = window.location.origin + '/api';

// DOM Elements
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');

// Login Form Submit
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearErrors();

    const submitBtn = loginForm.querySelector('.btn');
    submitBtn.classList.add('loading');

    const formData = {
        email: document.getElementById('loginEmail').value,
        password: document.getElementById('loginPassword').value
    };

    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Error al iniciar sesión');
        }

        // Save token and user data
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        // Redirect to gallery
        window.location.href = '/gallery.html';

    } catch (error) {
        showError(loginError, error.message);
    } finally {
        submitBtn.classList.remove('loading');
    }
});

// Helper Functions
function showError(element, message) {
    element.textContent = message;
    element.classList.add('show');
}

function clearErrors() {
    loginError.classList.remove('show');
}

// Check if already logged in
if (localStorage.getItem('token')) {
    window.location.href = '/gallery.html';
}
