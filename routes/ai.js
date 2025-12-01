const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini AI
let genAI = null;
if (process.env.GEMINI_API_KEY) {
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
}

// Generate romantic phrase
router.get('/phrase', async (req, res) => {
    try {
        if (!genAI) {
            throw new Error('Gemini API key not configured');
        }
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

        const prompt = `Genera una frase linda y romántica pero con un toque amistoso, que no parezca de pareja de novios. 
    Debe ser corta (máximo 15 palabras), inspiradora y sobre recuerdos, amistad profunda o momentos especiales compartidos. 
    Solo responde con la frase, sin comillas ni explicaciones adicionales.`;

        const result = await model.generateContent(prompt);
        const response = result.response;
        const phrase = response.text().trim();

        res.json({ phrase });
    } catch (error) {
        console.error('Gemini API error:', error);

        // Fallback phrases if API fails
        const fallbackPhrases = [
            'Los mejores recuerdos se crean con las personas que más queremos',
            'Cada momento juntos es un tesoro que guardamos en el corazón',
            'La amistad verdadera se mide en risas compartidas y recuerdos inolvidables',
            'Juntos creamos historias que el tiempo nunca podrá borrar',
            'Los momentos especiales brillan más cuando se comparten',
            'Nuestra historia está hecha de pequeños instantes mágicos',
            'Cada foto guarda un pedacito de nuestra felicidad',
            'Los recuerdos son el tesoro más valioso que podemos compartir'
        ];

        const randomPhrase = fallbackPhrases[Math.floor(Math.random() * fallbackPhrases.length)];
        res.json({ phrase: randomPhrase });
    }
});

module.exports = router;
