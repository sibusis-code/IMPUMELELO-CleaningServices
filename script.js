/**
 * IMPUMELELO CLEANING SERVICES - JavaScript
 * Pure Vanilla JS - No Frameworks
 */

(function() {
    'use strict';

    // ========================================
    // DOM Elements
    // ========================================
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const contactForm = document.getElementById('contactForm');
    const toast = document.getElementById('toast');

    // ========================================
    // Navbar Scroll Effect
    // ========================================
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavbarScroll, { passive: true });

    // ========================================
    // Mobile Menu Toggle
    // ========================================
    function toggleMobileMenu() {
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        
        // Animate hamburger
        const spans = mobileMenuBtn.querySelectorAll('span');
        if (mobileMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = '';
            spans[1].style.opacity = '1';
            spans[2].style.transform = '';
        }
    }

    mobileMenuBtn.addEventListener('click', toggleMobileMenu);

    // Close mobile menu when clicking a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggleMobileMenu();
        });
    });

    // ========================================
    // Smooth Scroll for Anchor Links
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // Contact Form Handling
    // ========================================
    function showToast() {
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    }

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Create WhatsApp message
            const message = `Hello! I'd like to request a cleaning service.\n\n` +
                `Name: ${data.name}\n` +
                `Phone: ${data.phone}\n` +
                `Email: ${data.email}\n` +
                `Service Type: ${data.service}\n` +
                `Message: ${data.message || 'N/A'}`;
            
            // WhatsApp number (format: country code + number without spaces)
            const whatsappNumber = '27820747923';
            const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
            
            // Open WhatsApp
            window.open(whatsappURL, '_blank');
            
            // Show success toast
            showToast();
            
            // Reset form
            contactForm.reset();
        });
    }

    // ========================================
    // Pricing Get Quote Buttons
    // ========================================
    const getQuoteBtns = document.querySelectorAll('.get-quote-btn');
    
    getQuoteBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get service and price from parent pricing card
            const card = this.closest('.pricing-card');
            const service = card.getAttribute('data-service');
            const price = card.getAttribute('data-price');
            
            // Create WhatsApp message
            const message = `Hello! I'm interested in getting a quote for:\n\n` +
                `Service: ${service}\n` +
                `Pricing: ${price}`;
            
            // WhatsApp number
            const whatsappNumber = '27820747923';
            const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
            
            // Open WhatsApp
            window.open(whatsappURL, '_blank');
        });
    });

    // ========================================
    // Scroll Animations (Intersection Observer)
    // ========================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with data-aos attribute
    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });

    // ========================================
    // Parallax Effect for Hero
    // ========================================
    const heroImage = document.querySelector('.hero-image img');
    
    function handleParallax() {
        if (heroImage && window.innerWidth > 768) {
            const scrolled = window.scrollY;
            const rate = scrolled * 0.05;
            heroImage.style.transform = `translateY(${rate}px)`;
        }
    }

    window.addEventListener('scroll', handleParallax, { passive: true });

    // ========================================
    // Service Cards Hover Effect
    // ========================================
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });

    // ========================================
    // Pricing Card Featured Animation
    // ========================================
    const featuredCard = document.querySelector('.pricing-card.featured');
    
    if (featuredCard) {
        // Add subtle pulse animation
        setInterval(() => {
            featuredCard.style.boxShadow = '0 8px 50px rgba(255, 78, 200, 0.4)';
            setTimeout(() => {
                featuredCard.style.boxShadow = '';
            }, 1000);
        }, 3000);
    }

    // ========================================
    // Testimonial Cards Stagger Animation
    // ========================================
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    const testimonialObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                testimonialObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    testimonialCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        testimonialObserver.observe(card);
    });

    // ========================================
    // Button Click Feedback
    // ========================================
    const allButtons = document.querySelectorAll('.btn');
    
    allButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add ripple animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // ========================================
    // Lazy Loading Images
    // ========================================
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // ========================================
    // Counter Animation for Experience Badge
    // ========================================
    const expBadge = document.querySelector('.experience-badge');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const numberEl = entry.target.querySelector('.exp-number');
                if (numberEl) {
                    animateCounter(numberEl, 0, 10, 1500);
                }
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    if (expBadge) {
        counterObserver.observe(expBadge);
    }

    function animateCounter(element, start, end, duration) {
        const range = end - start;
        const increment = end > start ? 1 : -1;
        const stepTime = Math.abs(Math.floor(duration / range));
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            element.textContent = current + '+';
            if (current === end) {
                clearInterval(timer);
            }
        }, stepTime);
    }

    // ========================================
    // Active Navigation Link
    // ========================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    function setActiveNavLink() {
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', setActiveNavLink, { passive: true });

    // ========================================
    // Prefers Reduced Motion
    // ========================================
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
        // Disable animations
        document.querySelectorAll('[data-aos]').forEach(el => {
            el.classList.add('aos-animate');
        });
        
        testimonialCards.forEach(card => {
            card.style.opacity = '1';
            card.style.transform = 'none';
        });
    }

    // ========================================
    // Console Welcome Message
    // ========================================
    console.log('%cIMPUMELELO CLEANING SERVICES', 'color: #FF4EC8; font-size: 20px; font-weight: bold;');
    console.log('%cProfessional cleaning in Pretoria', 'color: #B9B9B9; font-size: 12px;');
    console.log('%cContact: 082 074 7923', 'color: #FF4EC8; font-size: 12px;');

})();
