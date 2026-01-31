// ============================================
// PORTFOLIO FULL STACK SCRIPT
// ============================================

// Initialisation AOS (Animations On Scroll)
document.addEventListener('DOMContentLoaded', () => {
    // Initialiser AOS
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: false,
        mirror: true
    });

    // Initialiser Swiper pour les carrousels
    initSwipers();
    
    // Initialiser les fonctionnalités
    initNavigation();
    initThemeToggle();
    initScrollTop();
    initSkillCircles();
    initFormSubmit();
    initImageModal();
    
    console.log('✨ Portfolio chargé avec succès!');
});

// ============================================
// NAVIGATION
// ============================================

function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    const mainNav = document.getElementById('mainNav');

    // Marquer le lien actif
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section[id]');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });

        // Ajouter scrolled à la navbar
        if (window.scrollY > 50) {
            mainNav.classList.add('scrolled');
        } else {
            mainNav.classList.remove('scrolled');
        }
    });

    // Menu mobile
    mobileMenuToggle?.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });

    // Fermer le menu mobile au clic sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileMenuToggle?.classList.remove('active');
        });
    });
}

// ============================================
// THEME DARK/LIGHT MODE
// ============================================

function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    const body = document.body;

    // Charger le thème sauvegardé
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);

    themeToggle?.addEventListener('click', () => {
        const currentTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });

    function setTheme(theme) {
        if (theme === 'light') {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
        localStorage.setItem('theme', theme);
    }
}

// ============================================
// SWIPER CARROUSEL
// ============================================

function initSwipers() {
    const swipers = document.querySelectorAll('.project-swiper');

    swipers.forEach(swiperElement => {
        new Swiper(swiperElement, {
            slidesPerView: 1,
            spaceBetween: 0,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: swiperElement.querySelector('.swiper-pagination'),
                clickable: true,
                dynamicBullets: true,
            },
            navigation: {
                nextEl: swiperElement.querySelector('.swiper-button-next'),
                prevEl: swiperElement.querySelector('.swiper-button-prev'),
            },
        });
    });
}

// ============================================
// SKILL CIRCLES ANIMATION
// ============================================

function initSkillCircles() {
    const skillCircles = document.querySelectorAll('.skill-circle');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const circle = entry.target;
                const progress = parseInt(circle.getAttribute('data-progress'));
                animateSkillCircle(circle, progress);
                observer.unobserve(circle);
            }
        });
    }, {
        threshold: 0.5
    });

    skillCircles.forEach(circle => observer.observe(circle));
}

function animateSkillCircle(circle, progress) {
    const svg = circle.querySelector('svg');
    const progressCircle = circle.querySelector('.skill-circle-progress');
    
    // Créer un dégradé
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    gradient.setAttribute('id', 'gradient');
    gradient.setAttribute('x1', '0%');
    gradient.setAttribute('y1', '0%');
    gradient.setAttribute('x2', '100%');
    gradient.setAttribute('y2', '100%');
    
    const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop1.setAttribute('offset', '0%');
    stop1.setAttribute('stop-color', '#00d9a3');
    
    const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop2.setAttribute('offset', '100%');
    stop2.setAttribute('stop-color', '#1dd1a1');
    
    gradient.appendChild(stop1);
    gradient.appendChild(stop2);
    defs.appendChild(gradient);
    
    if (!svg.querySelector('defs')) {
        svg.insertBefore(defs, svg.firstChild);
    }

    // Animer le stroke-dashoffset
    const circumference = 282.6;
    const offset = circumference - (progress / 100) * circumference;

    progressCircle.style.strokeDashoffset = circumference;
    
    setTimeout(() => {
        progressCircle.style.strokeDashoffset = offset;
    }, 100);
}

// ============================================
// FORMULAIRE CONTACT
// ============================================

function initFormSubmit() {
    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Validation
        if (!name || !email || !message) {
            showMessage(formMessage, 'Veuillez remplir tous les champs', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showMessage(formMessage, 'Veuillez entrer une adresse email valide', 'error');
            return;
        }

        // Désactiver le bouton
        const submitBtn = form.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi...';

        // Simuler l'envoi (remplacer par un vrai backend)
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Succès
            showMessage(formMessage, '✓ Message envoyé avec succès! Merci de votre intérêt.', 'success');
            form.reset();

            // Log des données (développement)
            console.log('Données du formulaire:', { name, email, message });
        } catch (error) {
            showMessage(formMessage, 'Erreur lors de l\'envoi du message. Veuillez réessayer.', 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    });
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showMessage(element, message, type) {
    element.textContent = message;
    element.className = `form-message ${type}`;
    element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    setTimeout(() => {
        element.classList.remove('success', 'error');
    }, 5000);
}

// ============================================
// SCROLL TO TOP
// ============================================

function initScrollTop() {
    const scrollTopBtn = document.getElementById('scrollTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn?.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// SMOOTH SCROLL POUR LES ANCRES
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        e.preventDefault();

        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// PARALLAX EFFECT (OPTIONNEL)
// ============================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const glows = document.querySelectorAll('.glow');

    glows.forEach((glow, index) => {
        const speed = 0.3 + (index * 0.1);
        glow.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ============================================
// LAZY LOADING IMAGES
// ============================================

if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img[loading="lazy"]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.removeAttribute('loading');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// ============================================
// KEYBOARD SHORTCUTS
// ============================================

document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K pour chercher
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        // Ajouter une barre de recherche si nécessaire
    }

    // Escape pour fermer le menu mobile
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('navMenu');
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        if (navMenu?.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileMenuToggle?.classList.remove('active');
        }
    }
});

// ============================================
// PERFORMANCE MONITORING
// ============================================

if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`⚡ Page chargée en ${pageLoadTime}ms`);
    });
}

// ============================================
// GESTION D'ERREURS
// ============================================

window.addEventListener('error', (event) => {
    console.error('❌ Erreur:', event.message);
    // Optionnel: envoyer à un service de monitoring
});

// ============================================
// PRÉCHARGEMENT DES RESSOURCES
// ============================================

// Ajouter des ressources à précharger
function preloadResource(href, as = 'script') {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = as;
    link.href = href;
    document.head.appendChild(link);
}

// ============================================
// IMAGE MODAL FUNCTIONALITY
// ============================================

function initImageModal() {
    // Create modal overlay and content
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.id = 'imageModal';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    
    const closeBtn = document.createElement('button');
    closeBtn.className = 'modal-close';
    closeBtn.innerHTML = '&times;';
    closeBtn.type = 'button';
    closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    
    const img = document.createElement('img');
    
    modal.appendChild(closeBtn);
    modal.appendChild(modalContent);
    modalContent.appendChild(img);
    document.body.appendChild(modal);
    
    // Add click listeners to certification images
    const certImages = document.querySelectorAll('.cert-image');
    certImages.forEach(certImage => {
        certImage.addEventListener('click', () => {
            const imageSrc = certImage.getAttribute('data-modal');
            img.src = imageSrc;
            img.alt = 'Certificate';
            modal.classList.add('active');
        });
    });
    
    // Close modal on overlay click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
    
    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modal.classList.remove('active');
        }
    });
}

// Exemples (commentés par défaut)
// preloadResource('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js', 'script');
// preloadResource('https://unpkg.com/aos@2.3.1/dist/aos.js', 'script');

// ============================================
// EXPORT POUR TESTS
// ============================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        isValidEmail,
        showMessage,
        initNavigation,
        initThemeToggle,
        initFormSubmit,
        initSkillCircles
    };
}
