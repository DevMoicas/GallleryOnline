const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const authMiddleware = require('../middleware/auth');

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// JSON file to store image metadata
const metadataFile = path.join(__dirname, '../uploads/metadata.json');

// Initialize metadata file if it doesn't exist
if (!fs.existsSync(metadataFile)) {
    fs.writeFileSync(metadataFile, JSON.stringify([]));
}

// Helper functions for metadata
function readMetadata() {
    try {
        const data = fs.readFileSync(metadataFile, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

function writeMetadata(data) {
    fs.writeFileSync(metadataFile, JSON.stringify(data, null, 2));
}

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    // Accept images only
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Solo se permiten archivos de imagen'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Upload image
router.post('/upload', authMiddleware, upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No se proporcionó ninguna imagen' });
        }

        const imageData = {
            id: Date.now().toString(),
            filename: req.file.filename,
            originalName: req.file.originalname,
            path: `/uploads/${req.file.filename}`,
            size: req.file.size,
            mimetype: req.file.mimetype,
            title: '',
            uploadedAt: new Date().toISOString()
        };

        // Read current metadata
        const metadata = readMetadata();

        // Add new image
        metadata.push(imageData);

        // Save metadata
        writeMetadata(metadata);

        res.status(201).json({
            message: 'Imagen subida exitosamente',
            image: imageData
        });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ error: 'Error al subir la imagen' });
    }
});

// Get all images
router.get('/', authMiddleware, async (req, res) => {
    try {
        const metadata = readMetadata();

        // Sort by upload date (newest first)
        const sortedImages = metadata.sort((a, b) =>
            new Date(b.uploadedAt) - new Date(a.uploadedAt)
        );

        res.json({ images: sortedImages });
    } catch (error) {
        console.error('Get images error:', error);
        res.status(500).json({ error: 'Error al obtener las imágenes' });
    }
});

// Update image title
router.patch('/:id/title', authMiddleware, async (req, res) => {
    try {
        const { title } = req.body;
        const metadata = readMetadata();
        const imageIndex = metadata.findIndex(img => img.id === req.params.id);

        if (imageIndex === -1) {
            return res.status(404).json({ error: 'Imagen no encontrada' });
        }

        // Update title
        metadata[imageIndex].title = title || '';
        writeMetadata(metadata);

        res.json({
            message: 'Título actualizado exitosamente',
            image: metadata[imageIndex]
        });
    } catch (error) {
        console.error('Update title error:', error);
        res.status(500).json({ error: 'Error al actualizar el título' });
    }
});

// Delete image
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const metadata = readMetadata();
        const imageIndex = metadata.findIndex(img => img.id === req.params.id);

        if (imageIndex === -1) {
            return res.status(404).json({ error: 'Imagen no encontrada' });
        }

        const image = metadata[imageIndex];

        // Delete file from filesystem
        const filePath = path.join(__dirname, '..', image.path);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        // Remove from metadata
        metadata.splice(imageIndex, 1);
        writeMetadata(metadata);

        res.json({ message: 'Imagen eliminada exitosamente' });
    } catch (error) {
        console.error('Delete error:', error);
        res.status(500).json({ error: 'Error al eliminar la imagen' });
    }
});

module.exports = router;
