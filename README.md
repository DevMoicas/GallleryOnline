# Galería Online - Nuestros Recuerdos Juntos

Galería de fotos romántica para parejas con frases generadas por IA usando Gemini.

## 🚀 Despliegue en Render

### Paso 1: Preparar el Repositorio

1. Inicializa un repositorio Git (si no lo has hecho):
```bash
git init
git add .
git commit -m "Initial commit"
```

2. Sube tu código a GitHub:
```bash
git remote add origin <tu-repositorio-github>
git push -u origin main
```

### Paso 2: Crear Web Service en Render

1. Ve a [Render.com](https://render.com) y crea una cuenta
2. Haz clic en "New +" → "Web Service"
3. Conecta tu repositorio de GitHub
4. Configura el servicio:
   - **Name:** gallery-online (o el nombre que prefieras)
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free

### Paso 3: Variables de Entorno

En la sección "Environment" de Render, agrega estas variables:

```
JWT_SECRET=tu-super-secreto-jwt-key-cambia-esto-en-produccion
GEMINI_API_KEY=AIzaSyCjZH_GLA-rYSBOMEzloyUb3Sthi6YnTiQ
PORT=3000
```

**IMPORTANTE:** No necesitas MongoDB para este proyecto, funciona con almacenamiento en archivos.

### Paso 4: Desplegar

1. Haz clic en "Create Web Service"
2. Render automáticamente desplegará tu aplicación
3. Una vez desplegado, recibirás una URL como: `https://gallery-online-xxxx.onrender.com`

## 📝 Credenciales de Acceso

- **Usuario:** LizMoises2025
- **Contraseña:** nuestrosrecuerdos

## ⚠️ Notas Importantes para Render

### Almacenamiento de Imágenes

**ADVERTENCIA:** Render Free Tier tiene almacenamiento efímero. Las imágenes subidas se perderán cuando el servicio se reinicie.

**Soluciones:**
1. **Cloudinary (Recomendado):** Servicio gratuito para almacenar imágenes
2. **AWS S3:** Más robusto pero requiere configuración
3. **Render Persistent Disk:** Cuesta $1/mes por 1GB

### Configuración de Cloudinary (Opcional pero Recomendado)

Si quieres que las imágenes persistan:

1. Crea una cuenta en [Cloudinary](https://cloudinary.com)
2. Obtén tus credenciales (Cloud Name, API Key, API Secret)
3. Agrega estas variables de entorno en Render:
```
CLOUDINARY_CLOUD_NAME=tu-cloud-name
CLOUDINARY_API_KEY=tu-api-key
CLOUDINARY_API_SECRET=tu-api-secret
```

4. Instala el paquete:
```bash
npm install cloudinary
```

## 🔧 Desarrollo Local

```bash
# Instalar dependencias
npm install

# Crear archivo .env
cp .env.example .env

# Editar .env con tus valores
# JWT_SECRET=...
# GEMINI_API_KEY=...

# Iniciar servidor
npm start

# O en modo desarrollo
npm run dev
```

Accede a: http://localhost:3000

## 📦 Características

- ✨ Frases románticas generadas con IA (Gemini)
- 💕 Diseño romántico para parejas
- 📤 Subida de fotos con drag & drop
- 📊 Barra de progreso
- 📝 Títulos editables
- 📅 Ordenado por fecha
- 📱 Responsive design
- 🔐 Autenticación con credenciales fijas

## 🛠️ Stack Tecnológico

- **Backend:** Node.js, Express
- **IA:** Google Gemini API
- **Autenticación:** JWT
- **Almacenamiento:** Sistema de archivos (local) / Cloudinary (producción)
- **Frontend:** HTML, CSS, JavaScript vanilla

## 📄 Licencia

ISC
