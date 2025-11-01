// Update navbar styles when scrolling
const navbar = document.getElementById('mainNav');

window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
        navbar.classList.add('bg-white', 'shadow-sm');
        if (document.body.classList.contains('dark-mode')) {
            navbar.classList.remove('bg-white');
            navbar.classList.add('bg-dark');
        }
    } else {
        navbar.classList.remove('bg-white', 'shadow-sm', 'bg-dark');
    }
});

// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;
const icon = darkModeToggle.querySelector('i');

// Check for saved theme preference or use system preference
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const currentTheme = localStorage.getItem('theme');

function applyDarkMode() {
    // Apply dark mode to body
    body.classList.add('dark-mode');
    icon.classList.replace('fa-moon', 'fa-sun');

    // Apply dark mode to navbar if scrolled
    if (window.scrollY > 50) {
        navbar.classList.remove('bg-white');
        navbar.classList.add('bg-dark');
    }
}

function removeDarkMode() {
    // Remove dark mode from body
    body.classList.remove('dark-mode');
    icon.classList.replace('fa-sun', 'fa-moon');

    // Update navbar if scrolled
    if (window.scrollY > 50) {
        navbar.classList.add('bg-white');
        navbar.classList.remove('bg-dark');
    }
}

if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
    applyDarkMode();
}

// Toggle dark mode
darkModeToggle.addEventListener('click', () => {
    if (body.classList.contains('dark-mode')) {
        removeDarkMode();
        localStorage.setItem('theme', 'light');
    } else {
        applyDarkMode();
        localStorage.setItem('theme', 'dark');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Close Bootstrap navbar if open
            const navToggler = document.querySelector('.navbar-toggler');
            const navCollapse = document.querySelector('.navbar-collapse');
            if (navCollapse.classList.contains('show')) {
                navToggler.click();
            }
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe section titles and project cards
document.querySelectorAll('.section-title, .project-card, .about-content > div').forEach(el => {
    observer.observe(el);
});