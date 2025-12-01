# Galería Online - Guía de Uso

## 🚀 Servidor Iniciado

El servidor está corriendo en: **http://localhost:3000**

---

## 🔐 Credenciales de Acceso

**Usuario:** `LizMoises2025`  
**Contraseña:** `nuestrosrecuerdos`

---

## 📖 Cómo Usar

### 1. Iniciar el Servidor

Abre una terminal en la carpeta del proyecto y ejecuta:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass; npm start
```

O simplemente:

```bash
npm start
```

### 2. Acceder a la Aplicación

1. Abre tu navegador
2. Ve a: **http://localhost:3000**
3. Ingresa las credenciales:
   - Usuario: `LizMoises2025`
   - Contraseña: `nuestrosrecuerdos`
4. Haz clic en "Iniciar Sesión"

### 3. Subir Fotos

Una vez dentro de la galería:

- **Opción 1:** Arrastra y suelta imágenes en el área de subida
- **Opción 2:** Haz clic en "Seleccionar Fotos" y elige tus imágenes

### 4. Ver Fotos

- Tus fotos aparecerán en un grid responsivo
- Haz clic en cualquier foto para verla en tamaño completo
- Presiona ESC o haz clic en X para cerrar

### 5. Eliminar Fotos

- Haz clic en una foto para abrirla
- Haz clic en el botón "Eliminar"
- Confirma la eliminación

### 6. Cerrar Sesión

- Haz clic en "Cerrar Sesión" en el header

---

## 🛠️ Comandos Útiles

### Iniciar el servidor
```bash
npm start
```

### Detener el servidor
Presiona `Ctrl + C` en la terminal donde está corriendo

### Si el puerto 3000 está ocupado
```powershell
Get-Process -Name node | Stop-Process -Force
```

---

## 📁 Almacenamiento

- **Imágenes:** Se guardan en la carpeta `uploads/`
- **Metadata:** Se guarda en `uploads/metadata.json`
- **No requiere MongoDB** - Todo funciona con archivos locales

---

## ⚠️ Importante

- **Una sola cuenta:** El sistema solo permite acceso con las credenciales fijas
- **No hay registro:** No se pueden crear nuevas cuentas
- **Datos locales:** Las imágenes se guardan en tu computadora
- **Límite de tamaño:** Máximo 10MB por imagen

---

## 🎨 Características

✅ Diseño blanco y lila elegante  
✅ Drag & drop para subir imágenes  
✅ Grid responsivo  
✅ Modal para ver imágenes  
✅ Animaciones suaves  
✅ Sin necesidad de base de datos  

---

## 🐛 Solución de Problemas

### El CSS no se ve
1. Haz un hard refresh: `Ctrl + Shift + R` (Windows) o `Cmd + Shift + R` (Mac)
2. Limpia la caché del navegador
3. Verifica que el servidor esté corriendo

### No puedo iniciar sesión
- Verifica que estés usando exactamente: `LizMoises2025` y `nuestrosrecuerdos`
- Las credenciales son sensibles a mayúsculas/minúsculas

### El servidor no inicia
- Verifica que el puerto 3000 no esté en uso
- Ejecuta: `Get-Process -Name node | Stop-Process -Force`
- Intenta de nuevo

### Las imágenes no se suben
- Verifica que sean archivos de imagen (JPG, PNG, GIF)
- Verifica que no excedan 10MB
- Revisa la consola del navegador (F12) para errores

---

## 📞 Acceso Rápido

- **Login:** http://localhost:3000
- **Galería:** http://localhost:3000/gallery.html
- **Test:** http://localhost:3000/test.html

---

¡Disfruta tu galería! 📸✨
