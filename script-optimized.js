// ===== PORTFOLIO OPTIMISÉ POUR PERFORMANCE MAXIMALE =====

// ===== Throttle & Debounce Utilities =====
function throttle(func, delay) {
    let lastCall = 0;
    return function(...args) {
        const now = Date.now();
        if (now - lastCall >= delay) {
            lastCall = now;
            return func(...args);
        }
    };
}

function debounce(func, delay) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

// ===== Navigation & Theme Toggle =====
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const themeToggle = document.getElementById('theme-toggle');

// Sticky navbar on scroll (throttled)
const handleScroll = throttle(() => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
}, 100);

window.addEventListener('scroll', handleScroll, { passive: true });

// Mobile menu toggle
hamburger?.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Theme toggle
const currentTheme = localStorage.getItem('theme') || 'dark';
if (currentTheme === 'light') {
    document.body.classList.add('light-mode');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
} else {
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

themeToggle?.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    
    if (document.body.classList.contains('light-mode')) {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'light');
    } else {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'dark');
    }
});

// ===== Rotation automatique de la photo de profil =====
const profilePhotos = [
    'profile/1.jpeg',
    'profile/2.jpeg',
    'profile/3.jpeg',
    'profile/4.jpeg',
    'profile/5.jpeg',
    'profile/6.jpeg',
    'profile/7.jpeg'
];

let currentPhotoIndex = 1;

function rotateProfilePhoto() {
    const profileImg = document.querySelector('.profile-photo');
    if (profileImg) {
        profileImg.style.opacity = '0';
        
        setTimeout(() => {
            currentPhotoIndex = (currentPhotoIndex + 1) % profilePhotos.length;
            profileImg.src = profilePhotos[currentPhotoIndex];
            profileImg.style.opacity = '1';
        }, 500);
    }
}

setInterval(rotateProfilePhoto, 4000);

// ===== Typing Animation (Optimisé) =====
const typingText = document.querySelector('.typing-text');
const titles = [
    'Développeur Web Full Stack',
    'Développeur Laravel',
    'Développeur React.js',
    'Passionné par le Code'
];

let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeTitle() {
    const currentTitle = titles[titleIndex];
    
    if (isDeleting) {
        typingText.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let speed = isDeleting ? 50 : 100;
    
    if (!isDeleting && charIndex === currentTitle.length) {
        isDeleting = true;
        speed = 2000;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        speed = 500;
    }
    
    setTimeout(typeTitle, speed);
}

if (typingText) typeTitle();

// ===== Unified Intersection Observer (Optimisé) =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '50px'
};

const unifiedObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            
            // Animated counters
            if (target.classList.contains('stat-number')) {
                const targetValue = parseInt(target.getAttribute('data-target'));
                animateCounter(target, targetValue);
            }
            
            // Skill bars
            if (target.classList.contains('skill-progress')) {
                const progress = target.getAttribute('data-progress');
                target.style.width = progress + '%';
            }
            
            // Fade in animations
            if (target.classList.contains('project-card') || 
                target.classList.contains('skill-category') ||
                target.classList.contains('timeline-item')) {
                target.style.opacity = '1';
                target.style.transform = 'translateY(0)';
            }
            
            unifiedObserver.unobserve(target);
        }
    });
}, observerOptions);

// Observe all elements
document.querySelectorAll('.stat-number, .skill-progress, .project-card, .skill-category, .timeline-item').forEach(el => {
    if (el.classList.contains('project-card') || 
        el.classList.contains('skill-category') ||
        el.classList.contains('timeline-item')) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    }
    unifiedObserver.observe(el);
});

// ===== Optimized Counter Animation =====
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const duration = 1500;
    const stepTime = duration / 50;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.ceil(current) + '+';
        }
    }, stepTime);
}

// ===== Project Filters =====
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// ===== Smooth Scroll (Optimisé avec requestAnimationFrame) =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 100;
            const startPosition = window.pageYOffset;
            const distance = offsetTop - startPosition;
            const duration = 800;
            let start = null;
            
            function animation(currentTime) {
                if (start === null) start = currentTime;
                const timeElapsed = currentTime - start;
                const progress = Math.min(timeElapsed / duration, 1);
                
                // Easing function
                const easeProgress = progress < 0.5 
                    ? 2 * progress * progress 
                    : 1 - Math.pow(-2 * progress + 2, 2) / 2;
                
                window.scrollTo(0, startPosition + distance * easeProgress);
                
                if (timeElapsed < duration) {
                    requestAnimationFrame(animation);
                }
            }
            
            requestAnimationFrame(animation);
        }
    });
});

// ===== Active Navigation Link (Throttled) =====
const sections = document.querySelectorAll('section[id]');

const highlightNavigation = throttle(() => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            navLink?.classList.add('active');
        }
    });
}, 100);

window.addEventListener('scroll', highlightNavigation, { passive: true });

// ===== Scroll Progress Bar (Throttled) =====
const scrollProgress = document.getElementById('scroll-progress');

const updateScrollProgress = throttle(() => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    if (scrollProgress) scrollProgress.style.width = scrolled + '%';
}, 50);

window.addEventListener('scroll', updateScrollProgress, { passive: true });

// ===== Contact Form =====
const contactForm = document.getElementById('contact-form');

contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    console.log('Form submitted:', formData);
    alert('Merci pour votre message ! Je vous répondrai dans les plus brefs délais.');
    contactForm.reset();
});

// ===== Galerie de projets avec navigation =====
const projectGalleries = [
    [
        { src: 'projets/pic1.png', caption: 'Application Gestion RH - Dashboard' },
        { src: 'projets/pic2.png', caption: 'Application Gestion RH - Module Disciplinaire' },
        { src: 'projets/pic3.png', caption: 'Application Gestion RH - Gestion des Avertissements' }
    ],
    [
        { src: 'projets/pic4.png', caption: 'Application Gestion Bibliothèque - Accueil' },
        { src: 'projets/pic5.png', caption: 'Application Gestion Bibliothèque - Gestion des Livres' },
        { src: 'projets/pic6.png', caption: 'Application Gestion Bibliothèque - Emprunts' }
    ],
    [
        { src: 'projets/pic7.png', caption: 'Marketplace Maalem - Page d\'accueil' },
        { src: 'projets/pic8.png', caption: 'Marketplace Maalem - Recherche d\'artisans' },
        { src: 'projets/pic9.png', caption: 'Marketplace Maalem - Profil artisan' },
        { src: 'projets/pic10.png', caption: 'Marketplace Maalem - Services' }
    ]
];

let currentProjectIndex = 0;
let currentImageIndex = 0;

function openProjectGallery(projectIndex, imageIndex) {
    currentProjectIndex = projectIndex;
    currentImageIndex = imageIndex;
    
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxCounter = document.getElementById('lightbox-counter');
    
    const currentGallery = projectGalleries[projectIndex];
    const currentImage = currentGallery[imageIndex];
    
    lightbox.classList.add('active');
    lightboxImg.src = currentImage.src;
    lightboxCaption.textContent = currentImage.caption;
    lightboxCounter.textContent = `${imageIndex + 1} / ${currentGallery.length}`;
    
    document.body.style.overflow = 'hidden';
}

function navigateGallery(direction) {
    const currentGallery = projectGalleries[currentProjectIndex];
    currentImageIndex += direction;
    
    if (currentImageIndex < 0) {
        currentImageIndex = currentGallery.length - 1;
    } else if (currentImageIndex >= currentGallery.length) {
        currentImageIndex = 0;
    }
    
    openProjectGallery(currentProjectIndex, currentImageIndex);
}

function openLightbox(imageSrc, caption) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxCounter = document.getElementById('lightbox-counter');
    
    lightbox.classList.add('active');
    lightboxImg.src = imageSrc;
    lightboxCaption.textContent = caption;
    lightboxCounter.textContent = '';
    
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    const lightbox = document.getElementById('lightbox');
    if (lightbox?.classList.contains('active')) {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            navigateGallery(-1);
        } else if (e.key === 'ArrowRight') {
            navigateGallery(1);
        }
    }
});

document.querySelector('.lightbox-content')?.addEventListener('click', function(e) {
    e.stopPropagation();
});

// ===== Performance Monitoring =====
window.addEventListener('load', () => {
    const loadTime = performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart;
    console.log(`%c⚡ Page chargée en ${loadTime}ms`, 'color: #00d4ff; font-size: 14px; font-weight: bold;');
});

console.log('%c🚀 Portfolio Optimisé v3.0', 'color: #00d4ff; font-size: 20px; font-weight: bold;');
console.log('%c⚡ Performance maximale | 🎨 Animations fluides', 'color: #00ff88; font-size: 14px;');
