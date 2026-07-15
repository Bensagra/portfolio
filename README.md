# Portfolio — Benyamin Sagranichne

Portfolio personal orientado a desarrollo backend, automatización, productos digitales y robótica.

## Características

- Diseño editorial dark-first con tema claro opcional
- Proyectos técnicos con enlaces a código y producción
- Navegación responsive y accesible
- Animaciones progresivas con soporte para `prefers-reduced-motion`
- Metadatos SEO, Schema.org y Open Graph
- CV descargable y canales profesionales de contacto
- Sin frameworks ni dependencias de runtime

## Estructura

```text
portfolio/
├── index.html
├── styles.css
├── script.js
└── assets/
    ├── benyamin-portrait.png
    ├── benyamin-sagranichne-cv.pdf
    └── og-portfolio.png
```

## Desarrollo local

```bash
python3 -m http.server 8000
```

Abrir `http://localhost:8000`.

## Actualizar contenido

- Perfil, proyectos y enlaces: `index.html`
- Sistema visual y breakpoints: `styles.css`
- Tema, navegación y animaciones: `script.js`
- Foto, CV y portada social: `assets/`

Para regenerar el CV editable:

```bash
python3 -m pip install -r scripts/requirements.txt
python3 scripts/generate_cv.py
```

## Contacto

- [GitHub](https://github.com/Bensagra)
- [LinkedIn](https://www.linkedin.com/in/benyamin-sagranichne-b8030a208/)
- [Email](mailto:bensagra@gmail.com)
