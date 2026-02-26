document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li');

    hamburger.addEventListener('click', () => {
        // Toggle Nav
        navLinks.classList.toggle('nav-active');

        // Hamburger Animation (Optional: switch icon)
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('nav-active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when a link is clicked
    navLinksItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('nav-active')) {
                navLinks.classList.remove('nav-active');
                const icon = hamburger.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // --- Form Submission Handler ---
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            let isValid = true;

            // Helper to set error
            const setError = (input, isError) => {
                const formGroup = input.parentElement;
                if (isError) {
                    formGroup.classList.add('error');
                    isValid = false;
                } else {
                    formGroup.classList.remove('error');
                }
            };

            // Validate Name
            setError(nameInput, nameInput.value.trim() === '');

            // Validate Email
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            setError(emailInput, !emailPattern.test(emailInput.value.trim()));

            // Validate Message
            setError(messageInput, messageInput.value.trim() === '');

            if (isValid) {
                const btn = contactForm.querySelector('button');
                const originalText = btn.innerText;
                btn.innerText = 'Sending...';
                
                // Simulate API call
                setTimeout(() => {
                    // Show Popup
                    const popup = document.getElementById('successPopup');
                    popup.classList.add('show');
                    
                    contactForm.reset();
                    btn.innerText = originalText;

                    // Auto close popup
                    setTimeout(() => {
                        popup.classList.remove('show');
                    }, 3000); // Close after 3 seconds
                }, 1000);
            }
        });
    }

    // --- Navbar Scroll Effect ---
    const navbar = document.querySelector('.navbar');
    
    // Initial check in case page is reloaded halfway down
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    }

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Scroll Animations (Fade In Up) ---
    const observerOptions = {
        threshold: 0.15 // Trigger when 15% of element is visible
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                scrollObserver.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        scrollObserver.observe(el);
    });

    // --- Number Counter Animation ---
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        const counterObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                const counters = document.querySelectorAll('.counter');
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    const suffix = counter.getAttribute('data-suffix') || '';
                    const duration = 2000; // 2 seconds
                    const increment = target / (duration / 16);
                    
                    let current = 0;
                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            counter.innerText = Math.ceil(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.innerText = target + suffix;
                        }
                    };
                    updateCounter();
                });
                counterObserver.unobserve(statsSection);
            }
        });
        counterObserver.observe(statsSection);
    }

    // --- FAQ Accordion ---
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        question.addEventListener('click', () => {
            item.classList.toggle('active');
            
            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 40 + "px"; // Expand to content height + padding
            } else {
                answer.style.maxHeight = null; // Collapse
            }
        });
    });

    // --- Hero Carousel ---
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;

    if (slides.length > 0) {
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 5000); // Change image every 5 seconds
    }

    // --- Scroll Spy (Active Nav Link) ---
    const sections = document.querySelectorAll('section, header');
    const navLinksSpy = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // Adjust offset for navbar height (approx 100px buffer)
            if (window.scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });

        navLinksSpy.forEach(a => {
            a.classList.remove('active');
            if (current && a.getAttribute('href').includes('#' + current)) {
                a.classList.add('active');
            }
        });
    });
});
