// Theme toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const htmlElement = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
body.classList.toggle('dark-mode', currentTheme === 'dark');
updateThemeIcon();

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const newTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    updateThemeIcon();
});

function updateThemeIcon() {
    const icon = themeToggle.querySelector('i');
    if (body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Particles animation
function createParticles() {
    const container = document.getElementById('particles');
    const particleCount = window.innerWidth > 768 ? 50 : 20;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.setProperty('--duration', (Math.random() * 3 + 2) + 's');
        container.appendChild(particle);
    }
}

if (window.innerWidth > 768) {
    createParticles();
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Modal functions
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

window.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
});

// Form submission
function handleFormSubmit(event, type) {
    event.preventDefault();
    
    // Get form data
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    // Store in localStorage (for demo purposes)
    let submissions = JSON.parse(localStorage.getItem('submissions') || '[]');
    submissions.push({
        type,
        data,
        timestamp: new Date().toISOString()
    });
    localStorage.setItem('submissions', JSON.stringify(submissions));
    
    // Show success message
    showToast('Obrigado! Sua mensagem foi enviada com sucesso.');
    
    // Close modal and reset form
    event.target.reset();
    closeModal(event.target.closest('.modal').id);
}

// Contact form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showToast('Mensagem de contato enviada com sucesso!');
        contactForm.reset();
    });
}

// Toast notification
function showToast(message) {
    const toast = document.getElementById('successToast');
    const toastMessage = document.getElementById('toastMessage');
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = entry.target.dataset.animation || 'fadeInUp 0.8s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('[data-aos]').forEach(el => {
    observer.observe(el);
});

// Initialize animations on page load
window.addEventListener('load', () => {
    document.querySelectorAll('[data-aos]').forEach(el => {
        const delay = el.dataset.aosDelay || 0;
        el.style.animation = `fadeInUp 0.8s ease ${delay}ms both`;
    });
});

console.log('Site Conexão GUBA carregado com sucesso!');