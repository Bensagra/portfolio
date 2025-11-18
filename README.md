# Portfolio - Benyamin Sagranichne

Portfolio personal de Benyamin Sagranichne - Backend Developer

## 🚀 Tecnologías

- HTML5
- CSS3 (Variables CSS, Grid, Flexbox)
- JavaScript (Vanilla)
- Diseño Responsive
- Dark Mode

## 📋 Características

- ✨ Diseño moderno y profesional
- 🌓 Dark mode con persistencia en localStorage
- 📱 Totalmente responsive (mobile-first)
- 🎨 Animaciones sutiles y transiciones suaves
- ⚡ Performance optimizado
- 🎯 Navegación smooth scroll
- 🔍 SEO optimizado

## 🎯 Secciones

1. **Hero** - Presentación con foto de perfil
2. **Sobre mí** - Información personal y educación
3. **Proyectos** - Proyectos destacados con enlaces
4. **Habilidades** - Tech stack con barras de progreso animadas
5. **Contacto** - Información de contacto y CTAs

## 📦 Estructura del Proyecto

```
portfolio/
├── index.html          # Estructura HTML principal
├── styles.css          # Estilos CSS con variables y tema dark
├── script.js           # JavaScript para interactividad
├── assets/             # Carpeta para recursos
│   └── profile.jpg     # Foto de perfil
└── README.md           # Este archivo
```

## 🔧 Instalación y Uso

### Opción 1: Abrir directamente

1. Clona o descarga este repositorio
2. Guarda tu foto de perfil como `assets/profile.jpg`
3. Abre `index.html` en tu navegador

### Opción 2: Con servidor local (recomendado)

Si tenés Python instalado:

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Si tenés Node.js:

```bash
# Instalar http-server globalmente
npm install -g http-server

# Ejecutar
http-server -p 8000
```

Si usas VS Code:

- Instala la extensión "Live Server"
- Click derecho en `index.html` → "Open with Live Server"

Luego abre tu navegador en `http://localhost:8000`

## 🎨 Personalización

### Colores

Los colores se definen en variables CSS al inicio de `styles.css`:

```css
:root {
    --accent-primary: #3b82f6;      /* Color primario */
    --accent-secondary: #10b981;     /* Color secundario */
    --accent-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### Foto de Perfil

Reemplaza `assets/profile.jpg` con tu foto (recomendado: 400x400px o mayor, formato JPG/PNG)

### Contenido

Edita `index.html` para actualizar:
- Textos de secciones
- Proyectos
- Habilidades
- Información de contacto

## 🌐 Deployment

### GitHub Pages

1. Crea un repositorio en GitHub
2. Sube todos los archivos
3. Ve a Settings → Pages
4. Selecciona la rama `main` y carpeta `root`
5. Tu sitio estará en `https://tuusuario.github.io/nombre-repo`

### Netlify

1. Arrastra la carpeta del proyecto a [Netlify Drop](https://app.netlify.com/drop)
2. O conecta tu repositorio de GitHub para deploy automático

### Vercel

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## 📱 Responsive Breakpoints

- Desktop: > 968px
- Tablet: 768px - 968px
- Mobile: < 768px
- Small mobile: < 480px

## 🎯 Funcionalidades JavaScript

- Dark mode toggle con persistencia
- Menú móvil hamburguesa
- Smooth scroll a secciones
- Animaciones on scroll (Intersection Observer)
- Navbar sticky con hide/show al scroll
- Highlight de link activo según sección
- Efecto parallax en imagen de perfil

## 📄 Licencia

Este proyecto es de uso libre. Podés modificarlo y usarlo para tu propio portfolio.

## 📧 Contacto

- **Email**: bensagra@gmail.com
- **GitHub**: [@Bensagra](https://github.com/Bensagra)
- **WhatsApp**: +54 9 11 5574-3908

---

Desarrollado con ❤️ por Benyamin Sagranichne
