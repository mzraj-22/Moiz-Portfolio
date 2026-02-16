// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const pageSections = document.querySelectorAll('.page-section');
const skillProgressBars = document.querySelectorAll('.skill-progress');
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card-full');
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeMobileMenu();
    initializeSkillBars();
    initializeProjectFilter();
    initializeContactForm();
    initializeScrollAnimations();
    
    // Show home section by default
    showSection('home');
});

// Navigation functionality
function initializeNavigation() {
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('href').substring(1);
            showSection(targetSection);
            
            // Close mobile menu if open
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // Handle hero buttons and other internal links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('href').substring(1);
            if (targetSection) {
                showSection(targetSection);
            }
        });
    });
}

function showSection(sectionId) {
    // Hide all sections
    pageSections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        
        // Update active nav link
        updateActiveNavLink(sectionId);
        
        // Trigger skill animations if skills section
        if (sectionId === 'home') {
            setTimeout(() => {
                animateSkillBars();
            }, 500);
        }
        
        // Scroll to top of page
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function updateActiveNavLink(activeSection) {
    navLinks.forEach(link => {
        const href = link.getAttribute('href').substring(1);
        if (href === activeSection) {
            link.style.color = 'var(--primary-color)';
        } else {
            link.style.color = 'var(--dark-color)';
        }
    });
}

// Mobile menu functionality
function initializeMobileMenu() {
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

// Skill bars animation
function initializeSkillBars() {
    // Create intersection observer for skill bars
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
            }
        });
    }, { threshold: 0.5 });
    
    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        skillObserver.observe(skillsSection);
    }
}

function animateSkillBars() {
    skillProgressBars.forEach(bar => {
        const level = bar.getAttribute('data-level');
        bar.style.width = level + '%';
    });
}

// Project filtering
function initializeProjectFilter() {
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active filter button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects
            filterProjects(filter);
        });
    });
}

function filterProjects(filter) {
    projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filter === 'all' || category === filter) {
            card.style.display = 'block';
            card.classList.add('fade-in');
        } else {
            card.style.display = 'none';
            card.classList.remove('fade-in');
        }
    });
}

// Contact form handling
function initializeContactForm() {
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission();
        });
    }
}

function handleFormSubmission() {
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Basic validation
    if (!name || !email || !message) {
        showFormMessage('Please fill in all required fields.', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showFormMessage('Please enter a valid email address.', 'error');
        return;
    }
    
    // Show loading message
    showFormMessage('Sending message...', 'info');
    
    // Simulate form submission (in real app, this would be an API call)
    setTimeout(() => {
        showFormMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
        contactForm.reset();
    }, 1500);
}

function showFormMessage(message, type) {
    if (formMessage) {
        formMessage.textContent = message;
        formMessage.className = ''; // Clear all classes
        formMessage.classList.add(type); // Add type class (success, error, info)
        formMessage.style.display = 'block'; // Ensure it's visible
        
        // Auto-hide success/error messages after 5 seconds
        if (type !== 'info') {
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.project-card, .timeline-item, .skill-item, .contact-item'
    );
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Smooth scrolling for anchor links within sections
function smoothScrollTo(targetId) {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Handle window resize
window.addEventListener('resize', function() {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Handle browser back/forward buttons
window.addEventListener('popstate', function(e) {
    const hash = window.location.hash.substring(1);
    if (hash) {
        showSection(hash);
    } else {
        showSection('home');
    }
});

// Update URL hash when navigating
function updateURLHash(section) {
    if (history.pushState) {
        history.pushState(null, null, '#' + section);
    } else {
        window.location.hash = '#' + section;
    }
}

// Enhanced navigation with URL updates
function showSectionWithURL(sectionId) {
    showSection(sectionId);
    updateURLHash(sectionId);
}

// Project card hover effects
document.querySelectorAll('.project-card, .project-card-full').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Add loading animation to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // Add ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation styles
const rippleStyles = document.createElement('style');
rippleStyles.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyles);

// Initialize tooltips for social icons
document.querySelectorAll('.social-icon, .social-link').forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        let tooltip = this.querySelector('.tooltip');
        if (!tooltip) {
            tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.style.cssText = `
                position: absolute;
                bottom: 150%;
                left: 50%;
                transform: translateX(-50%);
                background: rgba(0, 0, 0, 0.8);
                color: white;
                padding: 5px 10px;
                border-radius: 4px;
                font-size: 12px;
                white-space: nowrap;
                opacity: 0;
                transition: opacity 0.3s;
                pointer-events: none;
                z-index: 1000;
            `;
            
            // Set tooltip text based on icon
            const iconClass = this.querySelector('i').className;
            if (iconClass.includes('whatsapp')) tooltip.textContent = 'WhatsApp';
            else if (iconClass.includes('phone')) tooltip.textContent = 'Call';
            else if (iconClass.includes('envelope')) tooltip.textContent = 'Email';
            else if (iconClass.includes('github')) tooltip.textContent = 'GitHub';
            else if (iconClass.includes('linkedin')) tooltip.textContent = 'LinkedIn';
            
            this.style.position = 'relative';
            this.appendChild(tooltip);
        }
        
        setTimeout(() => {
            tooltip.style.opacity = '1';
        }, 100);
    });
    
    icon.addEventListener('mouseleave', function() {
        const tooltip = this.querySelector('.tooltip');
        if (tooltip) {
            tooltip.style.opacity = '0';
        }
    });
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handling
const handleScroll = debounce(() => {
    const scrolled = window.pageYOffset;
    const navbar = document.querySelector('.navbar');
    
    if (scrolled > 100) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    }
}, 10);

window.addEventListener('scroll', handleScroll);

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
    
    // Arrow keys for navigation (when not in form)
    if (!e.target.matches('input, textarea')) {
        const currentSection = document.querySelector('.page-section.active').id;
        const sections = ['home', 'projects', 'contact'];
        const currentIndex = sections.indexOf(currentSection);
        
        if (e.key === 'ArrowRight' && currentIndex < sections.length - 1) {
            showSection(sections[currentIndex + 1]);
        } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
            showSection(sections[currentIndex - 1]);
        }
    }
});

// Add focus styles for accessibility
const focusableElements = document.querySelectorAll(
    'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
);

focusableElements.forEach(element => {
    element.addEventListener('focus', function() {
        this.style.outline = '2px solid var(--primary-color)';
        this.style.outlineOffset = '2px';
    });
    
    element.addEventListener('blur', function() {
        this.style.outline = 'none';
    });
});

console.log('Moiz Raja Portfolio - Interactive features loaded successfully!');