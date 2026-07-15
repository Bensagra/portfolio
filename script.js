document.documentElement.classList.add('js');

const root = document.documentElement;
const header = document.getElementById('siteHeader');
const menuButton = document.getElementById('menuButton');
const mobileNav = document.getElementById('mobileNav');
const themeButton = document.getElementById('themeButton');
const toast = document.getElementById('toast');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function setTheme(theme, persist = true) {
    root.dataset.theme = theme;
    const isLight = theme === 'light';
    themeButton.setAttribute('aria-pressed', String(isLight));
    themeButton.setAttribute('aria-label', isLight ? 'Cambiar a tema oscuro' : 'Cambiar a tema claro');
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', isLight ? '#f1f1e8' : '#0b0c0a');
    if (persist) localStorage.setItem('portfolio-theme', theme);
}

const savedTheme = localStorage.getItem('portfolio-theme');
setTheme(savedTheme === 'light' ? 'light' : 'dark', false);

themeButton.addEventListener('click', () => {
    setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark');
});

function closeMenu() {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Abrir menú');
    mobileNav.hidden = true;
}

menuButton.addEventListener('click', () => {
    const willOpen = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(willOpen));
    menuButton.setAttribute('aria-label', willOpen ? 'Cerrar menú' : 'Abrir menú');
    mobileNav.hidden = !willOpen;
});

mobileNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

window.addEventListener('resize', () => {
    if (window.innerWidth > 820) closeMenu();
});

let previousScroll = window.scrollY;
let ticking = false;

function updateHeader() {
    const currentScroll = window.scrollY;
    const menuIsOpen = menuButton.getAttribute('aria-expanded') === 'true';
    header.classList.toggle('is-hidden', !menuIsOpen && currentScroll > previousScroll && currentScroll > 140);
    previousScroll = Math.max(currentScroll, 0);
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
    }
}, { passive: true });

const revealElements = document.querySelectorAll('.reveal');

if (reducedMotion || !('IntersectionObserver' in window)) {
    revealElements.forEach((element) => element.classList.add('is-visible'));
} else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -32px' });

    revealElements.forEach((element, index) => {
        element.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
        revealObserver.observe(element);
    });
}

const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.desktop-nav a');

if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            navLinks.forEach((link) => {
                link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
            });
        });
    }, { rootMargin: '-35% 0px -55%', threshold: 0 });

    sections.forEach((section) => sectionObserver.observe(section));
}

function showToast(message) {
    toast.textContent = message;
    toast.classList.add('is-visible');
    window.clearTimeout(showToast.timeout);
    showToast.timeout = window.setTimeout(() => toast.classList.remove('is-visible'), 2200);
}

document.getElementById('copyEmail').addEventListener('click', async (event) => {
    const email = event.currentTarget.dataset.email;
    try {
        await navigator.clipboard.writeText(email);
        showToast('Email copiado al portapapeles');
    } catch {
        window.location.href = `mailto:${email}`;
    }
});

document.getElementById('currentYear').textContent = new Date().getFullYear();
