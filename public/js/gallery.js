const API_URL = window.location.origin + '/api';
let currentImageId = null;
let currentImageData = null;

// DOM Elements
const logoutBtn = document.getElementById('logoutBtn');
const fileInput = document.getElementById('fileInput');
const selectFilesBtn = document.getElementById('selectFilesBtn');
const uploadProgressContainer = document.getElementById('uploadProgressContainer');
const galleryGrid = document.getElementById('galleryGrid');
const emptyState = document.getElementById('emptyState');
const imageCount = document.getElementById('imageCount');
const imageModal = document.getElementById('imageModal');
const modalBackdrop = document.getElementById('modalBackdrop');
const modalClose = document.getElementById('modalClose');
const modalImage = document.getElementById('modalImage');
const imageTitle = document.getElementById('imageTitle');
const imageDate = document.getElementById('imageDate');
const saveTitleBtn = document.getElementById('saveTitleBtn');
const deleteImageBtn = document.getElementById('deleteImageBtn');
const dropZoneOverlay = document.getElementById('dropZoneOverlay');
const phraseText = document.getElementById('phraseText');
const refreshPhraseBtn = document.getElementById('refreshPhraseBtn');

// Check authentication
const token = localStorage.getItem('token');
const user = JSON.parse(localStorage.getItem('user') || '{}');

if (!token) {
    window.location.href = '/';
}

// Logout
logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
});

// File Selection
selectFilesBtn.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', (e) => {
    handleFiles(e.target.files);
});

// Drag and Drop - Global
let dragCounter = 0;

document.addEventListener('dragenter', (e) => {
    e.preventDefault();
    dragCounter++;
    if (dragCounter === 1) {
        dropZoneOverlay.classList.add('active');
    }
});

document.addEventListener('dragleave', (e) => {
    e.preventDefault();
    dragCounter--;
    if (dragCounter === 0) {
        dropZoneOverlay.classList.remove('active');
    }
});

document.addEventListener('dragover', (e) => {
    e.preventDefault();
});

document.addEventListener('drop', (e) => {
    e.preventDefault();
    dragCounter = 0;
    dropZoneOverlay.classList.remove('active');
    handleFiles(e.dataTransfer.files);
});

// Handle File Upload
async function handleFiles(files) {
    const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'));

    if (imageFiles.length === 0) {
        alert('Por favor selecciona archivos de imagen válidos');
        return;
    }

    for (const file of imageFiles) {
        await uploadFile(file);
    }

    // Reload gallery after uploads
    setTimeout(() => {
        loadGallery();
    }, 500);

    fileInput.value = '';
}

async function uploadFile(file) {
    const progressId = 'progress-' + Date.now() + '-' + Math.random();

    // Create progress item
    const progressItem = document.createElement('div');
    progressItem.className = 'progress-item';
    progressItem.id = progressId;
    progressItem.innerHTML = `
    <div class="progress-item-header">
      <span class="progress-filename">${file.name}</span>
      <span class="progress-status">Subiendo...</span>
    </div>
    <div class="progress-bar">
      <div class="progress-fill" style="width: 0%"></div>
    </div>
  `;
    uploadProgressContainer.appendChild(progressItem);

    const progressFill = progressItem.querySelector('.progress-fill');
    const progressStatus = progressItem.querySelector('.progress-status');

    // Simulate progress
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress > 90) progress = 90;
        progressFill.style.width = progress + '%';
    }, 200);

    const formData = new FormData();
    formData.append('image', file);

    try {
        const response = await fetch(`${API_URL}/gallery/upload`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Error al subir imagen');
        }

        // Complete progress
        clearInterval(progressInterval);
        progressFill.style.width = '100%';
        progressStatus.textContent = '✓ Completado';
        progressStatus.classList.add('success');

        // Remove progress item after delay
        setTimeout(() => {
            progressItem.style.opacity = '0';
            setTimeout(() => progressItem.remove(), 300);
        }, 2000);

    } catch (error) {
        clearInterval(progressInterval);
        progressStatus.textContent = '✗ Error';
        progressStatus.classList.add('error');
        console.error('Upload error:', error);

        // Remove progress item after delay
        setTimeout(() => {
            progressItem.style.opacity = '0';
            setTimeout(() => progressItem.remove(), 300);
        }, 3000);
    }
}

// Load Gallery
async function loadGallery() {
    try {
        const response = await fetch(`${API_URL}/gallery`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Error al cargar galería');
        }

        displayGallery(data.images);

    } catch (error) {
        console.error('Load gallery error:', error);
    }
}

function displayGallery(images) {
    galleryGrid.innerHTML = '';

    if (images.length === 0) {
        emptyState.classList.add('show');
        imageCount.textContent = '0 momentos';
        return;
    }

    emptyState.classList.remove('show');
    imageCount.textContent = `${images.length} ${images.length === 1 ? 'momento' : 'momentos'}`;

    // Sort by date (newest first)
    const sortedImages = images.sort((a, b) =>
        new Date(b.uploadedAt) - new Date(a.uploadedAt)
    );

    sortedImages.forEach(image => {
        const item = document.createElement('div');
        item.className = 'gallery-item';

        const date = new Date(image.uploadedAt);
        const formattedDate = date.toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });

        item.innerHTML = `
      <img src="${image.path}" alt="${image.title || 'Recuerdo'}" loading="lazy">
      <div class="gallery-item-overlay">
        ${image.title ? `<div class="gallery-item-title">${image.title}</div>` : ''}
        <div class="gallery-item-date">${formattedDate}</div>
      </div>
    `;

        item.addEventListener('click', () => {
            openModal(image);
        });

        galleryGrid.appendChild(item);
    });
}

// Modal Functions
function openModal(image) {
    currentImageId = image.id;
    currentImageData = image;

    modalImage.src = image.path;
    modalImage.alt = image.title || 'Recuerdo';
    imageTitle.value = image.title || '';

    const date = new Date(image.uploadedAt);
    const formattedDate = date.toLocaleDateString('es-ES', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    imageDate.textContent = formattedDate;

    imageModal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    imageModal.classList.remove('show');
    document.body.style.overflow = '';
    currentImageId = null;
    currentImageData = null;
}

modalClose.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', closeModal);

// Save Title
saveTitleBtn.addEventListener('click', async () => {
    if (!currentImageId) return;

    const newTitle = imageTitle.value.trim();

    try {
        const response = await fetch(`${API_URL}/gallery/${currentImageId}/title`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: newTitle })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Error al guardar título');
        }

        // Update current image data
        if (currentImageData) {
            currentImageData.title = newTitle;
        }

        // Show success feedback
        saveTitleBtn.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      ¡Guardado!
    `;

        setTimeout(() => {
            saveTitleBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Guardar
      `;
        }, 2000);

        // Reload gallery to show updated title
        loadGallery();

    } catch (error) {
        alert(error.message);
        console.error('Save title error:', error);
    }
});

// Delete Image
deleteImageBtn.addEventListener('click', async () => {
    if (!currentImageId) return;

    if (!confirm('¿Estás seguro de que quieres eliminar este recuerdo?')) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/gallery/${currentImageId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Error al eliminar imagen');
        }

        closeModal();
        loadGallery();

    } catch (error) {
        alert(error.message);
        console.error('Delete error:', error);
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && imageModal.classList.contains('show')) {
        closeModal();
    }
});

// AI Romantic Phrase Functions
async function loadRomanticPhrase() {
    try {
        const response = await fetch(`${API_URL}/ai/phrase`);
        const data = await response.json();

        if (response.ok && data.phrase) {
            phraseText.textContent = data.phrase;
        } else {
            phraseText.textContent = 'Te quiero mucho';
        }
    } catch (error) {
        console.error('Error loading phrase:', error);
        phraseText.textContent = 'Te quiero mucho';
    }
}

// Refresh phrase button
refreshPhraseBtn.addEventListener('click', async () => {
    refreshPhraseBtn.classList.add('loading');
    refreshPhraseBtn.disabled = true;

    await loadRomanticPhrase();

    setTimeout(() => {
        refreshPhraseBtn.classList.remove('loading');
        refreshPhraseBtn.disabled = false;
    }, 500);
});

// Initial loads
loadRomanticPhrase();
loadGallery();
