// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger menu
    const spans = menuToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.expertise-card, .service-card, .benefit-item, .contact-item');
    
    animatedElements.forEach((el, index) => {
        // Skip cards in the vulcan-section
        if (el.closest('.vulcan-section')) {
            return;
        }
        
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
});

// Add active state to navigation links based on scroll position
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});

// Rotating text animation
document.addEventListener('DOMContentLoaded', () => {
    const rotatingText = document.querySelector('.rotating-text');
    if (!rotatingText) return;
    
    const textOptions = [
        'Made Easier',
        'Smarter',
        'More Efficient',
        'Simplified',
        'Optimized'
    ];
    
    let currentIndex = 0;
    
    function rotateText() {
        rotatingText.style.opacity = '0';
        rotatingText.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            currentIndex = (currentIndex + 1) % textOptions.length;
            rotatingText.textContent = textOptions[currentIndex];
            rotatingText.style.opacity = '1';
            rotatingText.style.transform = 'translateY(0)';
        }, 300);
    }
    
    // Start rotating immediately, then continue every 3 seconds
    // Start first rotation immediately
    rotateText();
    
    // Continue rotating every 3 seconds
    setInterval(rotateText, 3000);
});

// Contact form submission with EmailJS
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // EmailJS configuration
            const publicKey = 'QNkDS-HY-50ytuZBr';
            const serviceId = 'service_lzpp5ob';
            const templateId = 'template_bm07kcv';
            
            // Initialize EmailJS
            emailjs.init(publicKey);
            
            // Prepare email parameters
            // These variable names (from_name, message, etc.) must match what you use in your EmailJS template
            const emailParams = {
                to_email: 'chukpozohnt@gmail.com',
                from_name: `${data.firstName} ${data.lastName}`,  // Maps from form field: name="firstName" + name="lastName"
                from_email: data.email,                            // Maps from form field: name="email"
                company: data.companyName,                        // Maps from form field: name="companyName"
                message: data.projectDetails,                      // Maps from form field: name="projectDetails"
                reply_to: data.email,                             // Uses the email field
                subject: `New Contact Form Submission from ${data.firstName} ${data.lastName}`
            };
            
            // Send email using EmailJS
            emailjs.send(serviceId, templateId, emailParams)
                .then(() => {
                    // Show success message
                    alert('Thank you for your message! We will get back to you soon.');
                    // Reset form
                    contactForm.reset();
                })
                .catch((error) => {
                    console.error('Error sending email:', error);
                    alert('Sorry, there was an error sending your message. Please try again later.');
                });
        });
    }
});

