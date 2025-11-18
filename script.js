// ==================== Configuración inicial ====================
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavigation();
    initScrollAnimations();
    initSmoothScroll();
});

// ==================== Tema (Dark Mode) ====================
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    // Aplicar tema guardado
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Animación del botón
        themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeToggle.style.transform = 'rotate(0deg)';
        }, 300);
    });
}

// ==================== Navegación móvil ====================
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle menú móvil
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Cerrar menú al hacer click en un link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Navbar sticky con efecto
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            navbar.style.boxShadow = 'none';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
        
        // Ocultar/mostrar navbar al hacer scroll
        if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
    
    // Resaltar link activo según sección visible
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavLink() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
}

// ==================== Scroll suave ====================
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Ignorar links vacíos o solo "#"
            if (href === '#' || href === '') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==================== Animaciones al hacer scroll ====================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Animar barras de habilidades
                if (entry.target.classList.contains('skill-item')) {
                    const progressBar = entry.target.querySelector('.skill-progress');
                    if (progressBar) {
                        const width = progressBar.style.width;
                        progressBar.style.width = '0';
                        setTimeout(() => {
                            progressBar.style.width = width;
                        }, 100);
                    }
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar elementos para animación
    const animatedElements = document.querySelectorAll(
        '.project-card, .skill-category, .contact-item, .about-text'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
    
    // Animar skill items individualmente
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = `opacity 0.5s ease-out ${index * 0.1}s, transform 0.5s ease-out ${index * 0.1}s`;
        observer.observe(item);
    });
}

// ==================== Typing effect para el nombre (opcional) ====================
function typingEffect() {
    const nameElement = document.querySelector('.name');
    if (!nameElement) return;
    
    const text = nameElement.textContent;
    nameElement.textContent = '';
    nameElement.style.opacity = '1';
    
    let i = 0;
    const speed = 100;
    
    function type() {
        if (i < text.length) {
            nameElement.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    // Descomentar la siguiente línea si querés activar el efecto typing
    // type();
}

// ==================== Animación de contadores (opcional) ====================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        element.textContent = Math.floor(start);
        
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 16);
}

// ==================== Copiar email al portapapeles ====================
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        // Mostrar mensaje de éxito
        showNotification('Email copiado al portapapeles!');
    }).catch(err => {
        console.error('Error al copiar:', err);
    });
}

// ==================== Notificación toast ====================
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 9999;
        animation: slideIn 0.3s ease-out;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Agregar estilos de animación para notificaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==================== Preloader (opcional) ====================
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => preloader.remove(), 300);
    }
});

// ==================== Efecto cursor personalizado (opcional) ====================
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    // Descomentar para activar
    // El CSS para .custom-cursor debe agregarse en styles.css
}

console.log('Portfolio cargado correctamente ✨');
