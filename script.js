document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Toggle hamburger icon animation
            const hamburger = navToggle.querySelector('.hamburger');
            if (navMenu.classList.contains('active')) {
                hamburger.style.backgroundColor = 'transparent';
                hamburger.style.setProperty('--before-transform', 'rotate(45deg) translate(5px, 5px)');
                // We can use classes for toggling clean transition
                navToggle.style.transform = 'rotate(90deg)';
            } else {
                hamburger.style.backgroundColor = 'var(--text-primary)';
                navToggle.style.transform = 'none';
            }
        });
    }

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                const hamburger = navToggle.querySelector('.hamburger');
                hamburger.style.backgroundColor = 'var(--text-primary)';
                navToggle.style.transform = 'none';
            }
        });
    });

    // 2. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Scroll Reveal Animation using Intersection Observer
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Stop observing once it has revealed
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Offset trigger point slightly
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // 4. Interactive Tabs for Credentials Section
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');

            // Remove active class from all buttons and active tab contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to current button and matching content panel
            button.classList.add('active');
            const matchingContent = document.getElementById(targetTab);
            if (matchingContent) {
                matchingContent.classList.add('active');
            }
        });
    });

    // 5. Interactive Mouse Move Glow Effect on Profile & Tech Cards
    const glowCards = document.querySelectorAll('.profile-card, .tech-dashboard, .exp-card, .project-item');
    
    glowCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top;  // y position within the element
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
});
