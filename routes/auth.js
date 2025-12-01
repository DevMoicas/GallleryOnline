const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Fixed credentials
const FIXED_USER = {
    email: 'LizMoises2025',
    password: 'nuestrosrecuerdos',
    name: 'Liz & Moises',
    id: 'fixed-user-id'
};

// Login user with fixed credentials
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ error: 'Por favor ingresa usuario y contraseña' });
        }

        // Check credentials
        if (email !== FIXED_USER.email || password !== FIXED_USER.password) {
            return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
        }

        // Generate JWT token
        const secret = process.env.JWT_SECRET || 'fallback_secret_key_12345';
        if (!process.env.JWT_SECRET) {
            console.warn('⚠️ WARNING: Using fallback JWT secret. Please set JWT_SECRET environment variable.');
        }

        const token = jwt.sign(
            { userId: FIXED_USER.id },
            secret,
            { expiresIn: '30d' }
        );

        res.json({
            message: 'Login exitoso',
            token,
            user: {
                id: FIXED_USER.id,
                email: FIXED_USER.email,
                name: FIXED_USER.name
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
});

// Keep register endpoint for compatibility but return error
router.post('/register', async (req, res) => {
    res.status(403).json({ error: 'El registro de nuevos usuarios está deshabilitado' });
});

module.exports = router;
