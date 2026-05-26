// ===== Navigation & Theme Toggle =====
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const themeToggle = document.getElementById('theme-toggle');

// Sticky navbar on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
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
const currentTheme = localStorage.getItem('theme') || 'dark'; // Par défaut mode sombre
if (currentTheme === 'light') {
    document.body.classList.add('light-mode');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
} else {
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

themeToggle.addEventListener('click', () => {
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

let currentPhotoIndex = 1; // Commence avec la photo 2 (index 1)

function rotateProfilePhoto() {
    const profileImg = document.querySelector('.profile-photo');
    if (profileImg) {
        // Effet de fade
        profileImg.style.opacity = '0';
        
        setTimeout(() => {
            currentPhotoIndex = (currentPhotoIndex + 1) % profilePhotos.length;
            profileImg.src = profilePhotos[currentPhotoIndex];
            profileImg.style.opacity = '1';
        }, 500);
    }
}

// Changer la photo toutes les 4 secondes
setInterval(rotateProfilePhoto, 4000);

// ===== Typing Animation =====
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
let typingSpeed = 100;

function typeTitle() {
    const currentTitle = titles[titleIndex];
    
    if (isDeleting) {
        typingText.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentTitle.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        typingSpeed = 500; // Pause before next title
    }
    
    setTimeout(typeTitle, typingSpeed);
}

// Start typing animation
typeTitle();

// ===== Animated Counter - Solution Simple et Efficace =====
let countersAnimated = false;

window.addEventListener('scroll', function() {
    const aboutStats = document.querySelector('.about-stats');
    
    if (!aboutStats || countersAnimated) return;
    
    const rect = aboutStats.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
    
    if (isVisible) {
        countersAnimated = true;
        
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            let current = 0;
            const increment = target / 100; // 100 étapes
            
            const updateCounter = () => {
                current += increment;
                
                if (current < target) {
                    counter.textContent = Math.ceil(current) + '+';
                    setTimeout(updateCounter, 20); // 20ms entre chaque update
                } else {
                    counter.textContent = target + '+';
                }
            };
            
            updateCounter();
        });
    }
});

// ===== Skill Bars Animation =====
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progress = entry.target.getAttribute('data-progress');
            entry.target.style.width = progress + '%';
            skillObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5,
    rootMargin: '0px'
});

document.querySelectorAll('.skill-progress').forEach(skill => {
    skillObserver.observe(skill);
});

// ===== Project Filters =====
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.6s ease-out';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// ===== Smooth Scroll - Supprimé (doublon) =====
// Cette section a été supprimée car elle créait un conflit avec le smooth scroll ci-dessous

// ===== Intersection Observer for Fade In Animations =====
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            fadeObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px'
});

// Observe sections for fade in animation
document.querySelectorAll('.section').forEach(section => {
    fadeObserver.observe(section);
});

// ===== Contact Form Handling =====
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // Here you would typically send the data to a server
    console.log('Form submitted:', formData);
    
    // Show success message (you can customize this)
    alert('Merci pour votre message ! Je vous répondrai dans les plus brefs délais.');
    
    // Reset form
    contactForm.reset();
});

// ===== Active Navigation Link on Scroll =====
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// ===== Parallax Effect for Hero Background =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const orbs = document.querySelectorAll('.gradient-orb');
    
    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 0.1;
        orb.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ===== Timeline Animation =====
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
        }
    });
}, {
    threshold: 0.3
});

document.querySelectorAll('.timeline-item').forEach((item, index) => {
    item.style.opacity = '0';
    if (index % 2 === 0) {
        item.style.transform = 'translateX(50px)';
    } else {
        item.style.transform = 'translateX(-50px)';
    }
    item.style.transition = 'all 0.6s ease-out';
    timelineObserver.observe(item);
});

// ===== Cursor Effect (Optional - Advanced) =====
const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Add cursor styles
const style = document.createElement('style');
style.textContent = `
    .custom-cursor {
        width: 20px;
        height: 20px;
        border: 2px solid var(--primary-color);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.2s ease;
        display: none;
    }
    
    @media (min-width: 968px) {
        .custom-cursor {
            display: block;
        }
    }
    
    a:hover ~ .custom-cursor,
    button:hover ~ .custom-cursor {
        transform: scale(1.5);
        background-color: var(--primary-color);
        opacity: 0.3;
    }
`;
document.head.appendChild(style);

// ===== Loading Animation =====
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===== Console Message =====
console.log('%c👋 Bienvenue sur mon portfolio!', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%cSi vous êtes ici, c\'est que vous êtes curieux! N\'hésitez pas à me contacter.', 'color: #8b5cf6; font-size: 14px;');


// ===== Scroll Progress Bar =====
const scrollProgress = document.getElementById('scroll-progress');

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
});

// Visitor counter removed as requested

// ===== Reveal Animation on Scroll =====
const revealElements = document.querySelectorAll('.project-card, .skill-category, .timeline-item');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('reveal', 'active');
            }, index * 100);
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px'
});

revealElements.forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
});

// ===== Particle Effect on Card Hover =====
document.querySelectorAll('.project-card, .skill-category').forEach(card => {
    card.addEventListener('mouseenter', function(e) {
        createParticles(e.clientX, e.clientY);
    });
});

function createParticles(x, y) {
    const colors = ['var(--primary-color)', 'var(--secondary-color)', 'var(--accent-color)'];
    
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle-effect';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        const angle = (Math.PI * 2 * i) / 8;
        const velocity = 50 + Math.random() * 50;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;
        
        particle.style.setProperty('--tx', tx + 'px');
        particle.style.setProperty('--ty', ty + 'px');
        
        document.body.appendChild(particle);
        
        setTimeout(() => particle.remove(), 1000);
    }
}

// ===== 3D Tilt Effect on Project Cards =====
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', function() {
        card.style.transform = '';
    });
});

// ===== Glitch Effect on Name (occasional) =====
const glitchElement = document.querySelector('.glitch');
if (glitchElement) {
    setInterval(() => {
        if (Math.random() > 0.95) {
            glitchElement.style.animation = 'none';
            setTimeout(() => {
                glitchElement.style.animation = '';
            }, 100);
        }
    }, 3000);
}

// ===== Enhanced Typing Animation with Multiple Colors =====
const typingTextElement = document.querySelector('.typing-text');
if (typingTextElement) {
    let colorIndex = 0;
    const colors = ['var(--primary-color)', 'var(--accent-color)', 'var(--secondary-color)'];
    
    // Changer la couleur périodiquement
    setInterval(() => {
        colorIndex = (colorIndex + 1) % colors.length;
        typingTextElement.style.color = colors[colorIndex];
    }, 3000);
}

// ===== Smooth Scroll with Easing =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Offset augmenté pour compenser la navbar fixe
            const offsetTop = target.offsetTop - 100;
            
            // Smooth scroll with custom easing
            const startPosition = window.pageYOffset;
            const distance = offsetTop - startPosition;
            const duration = 1000;
            let start = null;
            
            function animation(currentTime) {
                if (start === null) start = currentTime;
                const timeElapsed = currentTime - start;
                const run = ease(timeElapsed, startPosition, distance, duration);
                window.scrollTo(0, run);
                if (timeElapsed < duration) requestAnimationFrame(animation);
            }
            
            function ease(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            }
            
            requestAnimationFrame(animation);
        }
    });
});

// ===== Dynamic Background Particles =====
function createBackgroundParticles() {
    const hero = document.querySelector('.hero-background');
    if (!hero) return;
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 3 + 1 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = `rgba(0, 212, 255, ${Math.random() * 0.5})`;
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `particle-float ${Math.random() * 10 + 10}s linear infinite`;
        particle.style.animationDelay = Math.random() * 5 + 's';
        hero.appendChild(particle);
    }
}

createBackgroundParticles();

// ===== Enhanced Stats Counter with Easing =====
function animateValue(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            element.textContent = end + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// ===== Keyboard Navigation Enhancement =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
        e.preventDefault();
        window.scrollBy({ top: 100, behavior: 'smooth' });
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        window.scrollBy({ top: -100, behavior: 'smooth' });
    }
});

// ===== Performance Monitoring =====
window.addEventListener('load', () => {
    const loadTime = performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart;
    console.log(`%c⚡ Page loaded in ${loadTime}ms`, 'color: #00d4ff; font-size: 14px; font-weight: bold;');
});

// ===== Easter Egg - Konami Code =====
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        document.body.style.animation = 'rainbow 2s linear infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
        console.log('%c🎉 Easter Egg Unlocked!', 'color: #00ff88; font-size: 20px; font-weight: bold;');
    }
});

// ===== Enhanced Console Messages =====
console.log('%c🚀 Portfolio v2.0', 'color: #00d4ff; font-size: 24px; font-weight: bold;');
console.log('%c💼 Développé avec passion pour impressionner les recruteurs', 'color: #00ff88; font-size: 14px;');
console.log('%c📧 Contactez-moi pour discuter de vos projets!', 'color: #ffd700; font-size: 14px;');
console.log('%c⚡ Performance optimisée | 🎨 Design moderne | 🔥 Animations fluides', 'color: #0099ff; font-size: 12px;');


// ===== Galerie de projets avec navigation =====
const projectGalleries = [
    // Projet 0: Gestion RH
    [
        { src: 'projets/pic1.png', caption: 'Application Gestion RH - Dashboard' },
        { src: 'projets/pic2.png', caption: 'Application Gestion RH - Module Disciplinaire' },
        { src: 'projets/pic3.png', caption: 'Application Gestion RH - Gestion des Avertissements' }
    ],
    // Projet 1: Bibliothèque
    [
        { src: 'projets/pic4.png', caption: 'Application Gestion Bibliothèque - Accueil' },
        { src: 'projets/pic5.png', caption: 'Application Gestion Bibliothèque - Gestion des Livres' },
        { src: 'projets/pic6.png', caption: 'Application Gestion Bibliothèque - Emprunts' }
    ],
    // Projet 2: Maalem
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
    
    // Afficher le compteur (ex: 1/3)
    lightboxCounter.textContent = `${imageIndex + 1} / ${currentGallery.length}`;
    
    // Empêcher le scroll du body
    document.body.style.overflow = 'hidden';
}

function navigateGallery(direction) {
    const currentGallery = projectGalleries[currentProjectIndex];
    currentImageIndex += direction;
    
    // Boucler : si on dépasse, revenir au début/fin
    if (currentImageIndex < 0) {
        currentImageIndex = currentGallery.length - 1;
    } else if (currentImageIndex >= currentGallery.length) {
        currentImageIndex = 0;
    }
    
    openProjectGallery(currentProjectIndex, currentImageIndex);
}

// Fonction pour ouvrir une image simple (certifications)
function openLightbox(imageSrc, caption) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxCounter = document.getElementById('lightbox-counter');
    
    lightbox.classList.add('active');
    lightboxImg.src = imageSrc;
    lightboxCaption.textContent = caption;
    lightboxCounter.textContent = ''; // Pas de compteur pour les certifications
    
    // Empêcher le scroll du body
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    
    // Réactiver le scroll du body
    document.body.style.overflow = '';
}

// Fermer avec la touche Escape et naviguer avec les flèches
document.addEventListener('keydown', function(e) {
    const lightbox = document.getElementById('lightbox');
    if (lightbox.classList.contains('active')) {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            navigateGallery(-1);
        } else if (e.key === 'ArrowRight') {
            navigateGallery(1);
        }
    }
});

// Empêcher la fermeture quand on clique sur l'image
document.querySelector('.lightbox-content')?.addEventListener('click', function(e) {
    e.stopPropagation();
});

