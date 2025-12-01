# 🚀 Guía de Despliegue en Render

## Paso 1: Preparar el Código

### 1.1 Inicializar Git (si no lo has hecho)

```bash
git init
git add .
git commit -m "Preparar para despliegue en Render"
```

### 1.2 Crear Repositorio en GitHub

1. Ve a [GitHub](https://github.com)
2. Haz clic en "New repository"
3. Nombre: `gallery-online` (o el que prefieras)
4. NO inicialices con README (ya tienes uno)
5. Haz clic en "Create repository"

### 1.3 Subir Código a GitHub

```bash
git remote add origin https://github.com/TU-USUARIO/gallery-online.git
git branch -M main
git push -u origin main
```

---

## Paso 2: Crear Cuenta en Render

1. Ve a [https://render.com](https://render.com)
2. Haz clic en "Get Started"
3. Regístrate con GitHub (recomendado)
4. Autoriza a Render para acceder a tus repositorios

---

## Paso 3: Crear Web Service

1. En el Dashboard de Render, haz clic en **"New +"**
2. Selecciona **"Web Service"**
3. Conecta tu repositorio `gallery-online`
4. Haz clic en **"Connect"**

---

## Paso 4: Configurar el Servicio

### Configuración Básica:

- **Name:** `gallery-online` (o el nombre que prefieras)
- **Region:** Oregon (US West) - el más cercano
- **Branch:** `main`
- **Root Directory:** (dejar vacío)
- **Environment:** `Node`
- **Build Command:** `npm install`
- **Start Command:** `npm start`

### Plan:

- Selecciona **"Free"** (gratis)

---

## Paso 5: Variables de Entorno

Scroll down hasta la sección **"Environment Variables"** y agrega:

### Variable 1:
- **Key:** `JWT_SECRET`
- **Value:** `tu-super-secreto-jwt-key-cambia-esto-en-produccion-12345`

### Variable 2:
- **Key:** `GEMINI_API_KEY`
- **Value:** `AIzaSyCjZH_GLA-rYSBOMEzloyUb3Sthi6YnTiQ`

### Variable 3:
- **Key:** `PORT`
- **Value:** `3000`

---

## Paso 6: Desplegar

1. Haz clic en **"Create Web Service"**
2. Render comenzará a:
   - Clonar tu repositorio
   - Instalar dependencias (`npm install`)
   - Iniciar el servidor (`npm start`)

3. Espera 2-3 minutos...

4. Cuando veas **"Live"** en verde, ¡está listo!

---

## Paso 7: Acceder a tu Aplicación

Tu URL será algo como:
```
https://gallery-online-xxxx.onrender.com
```

### Credenciales de acceso:
- **Usuario:** LizMoises2025
- **Contraseña:** nuestrosrecuerdos

---

## ⚠️ IMPORTANTE: Almacenamiento de Imágenes

**Problema:** Render Free Tier tiene almacenamiento efímero. Las imágenes se borrarán cuando el servicio se reinicie (cada 15 minutos de inactividad).

### Solución Recomendada: Cloudinary (Gratis)

#### 1. Crear cuenta en Cloudinary

1. Ve a [https://cloudinary.com](https://cloudinary.com)
2. Regístrate gratis
3. Ve a Dashboard
4. Copia tus credenciales:
   - Cloud Name
   - API Key
   - API Secret

#### 2. Agregar Variables en Render

En tu Web Service en Render, ve a "Environment" y agrega:

- **Key:** `CLOUDINARY_CLOUD_NAME` → **Value:** tu-cloud-name
- **Key:** `CLOUDINARY_API_KEY` → **Value:** tu-api-key
- **Key:** `CLOUDINARY_API_SECRET` → **Value:** tu-api-secret

#### 3. Actualizar el Código

Necesitarás modificar `routes/gallery.js` para usar Cloudinary en lugar del sistema de archivos local. (Puedo ayudarte con esto si lo necesitas)

---

## 🔄 Actualizar la Aplicación

Cada vez que hagas cambios:

```bash
git add .
git commit -m "Descripción de los cambios"
git push
```

Render automáticamente detectará los cambios y redesplegará.

---

## 🐛 Solución de Problemas

### El servicio no inicia

1. Ve a "Logs" en Render
2. Busca errores en rojo
3. Verifica que las variables de entorno estén correctas

### "Application Error"

- Verifica que `PORT` esté en las variables de entorno
- Revisa los logs para ver el error específico

### Las imágenes desaparecen

- Esto es normal en Free Tier
- Implementa Cloudinary (ver arriba)

---

## 📊 Monitoreo

- **Logs:** Ve a tu servicio → "Logs" para ver la actividad
- **Metrics:** Ve a "Metrics" para ver uso de CPU/memoria
- **Events:** Ve a "Events" para ver despliegues

---

## 💰 Costos

- **Free Tier:** $0/mes
  - 750 horas/mes
  - Se duerme después de 15 min de inactividad
  - Almacenamiento efímero

- **Starter:** $7/mes
  - Siempre activo
  - Más recursos
  - Almacenamiento efímero

- **Persistent Disk:** +$1/mes por 1GB
  - Para almacenar imágenes permanentemente

---

## ✅ Checklist Final

- [ ] Código subido a GitHub
- [ ] Web Service creado en Render
- [ ] Variables de entorno configuradas
- [ ] Servicio desplegado (estado "Live")
- [ ] Aplicación accesible desde la URL
- [ ] Login funciona con las credenciales
- [ ] (Opcional) Cloudinary configurado para imágenes persistentes

---

¡Listo! Tu galería está en línea 🎉
