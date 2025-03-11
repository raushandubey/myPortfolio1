// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenu) {
    mobileMenu.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a nav link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Header scroll effect
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Active navigation link based on scroll position
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Here you would typically send the form data to a server
        // For now, we'll just log it to the console
        console.log('Form submitted:', { name, email, message });
        
        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
        
        // Reset form
        contactForm.reset();
    });
}

// Entrance Animations
// Add animation classes to hero content
document.addEventListener('DOMContentLoaded', () => {
    // Animate hero section elements
    const heroTitle = document.querySelector('.hero-content h1');
    const heroSubtitle = document.querySelector('.hero-content h2');
    const heroText = document.querySelector('.hero-content p');
    const heroCta = document.querySelector('.cta-buttons');
    
    if (heroTitle) heroTitle.classList.add('animate', 'fade-in-down', 'delay-1');
    if (heroSubtitle) heroSubtitle.classList.add('animate', 'fade-in-up', 'delay-2');
    if (heroText) heroText.classList.add('animate', 'fade-in-up', 'delay-3');
    if (heroCta) heroCta.classList.add('animate', 'fade-in-up', 'delay-4');
    
    // Start animations
    setTimeout(() => {
        document.querySelectorAll('.animate').forEach(el => {
            el.style.opacity = '1';
        });
    }, 100);
});

// Scroll animations
const animateOnScroll = () => {
    // Timeline items animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        const itemPosition = item.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (itemPosition < screenPosition) {
            item.classList.add('animate-timeline');
        }
    });
    
    // Project cards animation
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        const cardPosition = card.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.1;
        
        if (cardPosition < screenPosition) {
            setTimeout(() => {
                card.classList.add('animate-card');
            }, index * 100); // Staggered animation
        }
    });
    
    // Contact items animation
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach((item, index) => {
        const itemPosition = item.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.1;
        
        if (itemPosition < screenPosition) {
            setTimeout(() => {
                item.classList.add('animate-contact');
            }, index * 100); // Staggered animation
        }
    });
    
    // Skills animation
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach((category, index) => {
        const categoryPosition = category.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.1;
        
        if (categoryPosition < screenPosition) {
            setTimeout(() => {
                category.classList.add('animate', 'fade-in-right');
                category.style.opacity = '1';
            }, index * 200); // Staggered animation
        }
    });
};

// Run animation on scroll
window.addEventListener('scroll', animateOnScroll);
// Run once on page load
window.addEventListener('load', animateOnScroll);

// Section title animation
const animateSectionTitles = () => {
    const titles = document.querySelectorAll('.section-title');
    titles.forEach(title => {
        const titlePosition = title.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (titlePosition < screenPosition) {
            title.classList.add('animate', 'scale-in');
            title.style.opacity = '1';
        }
    });
};

window.addEventListener('scroll', animateSectionTitles);
window.addEventListener('load', animateSectionTitles);

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrollY = window.scrollY;
        hero.style.backgroundPositionY = scrollY * 0.5 + 'px';
    }
});

// Add animation to profile image
window.addEventListener('load', () => {
    const profileImage = document.querySelector('.about-image');
    if (profileImage) {
        setTimeout(() => {
            profileImage.classList.add('animate', 'scale-in');
            profileImage.style.opacity = '1';
        }, 300);
    }
});

// Project card animations
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for header height
                behavior: 'smooth'
            });
        }
    });
});

// Typing effect for hero section
const heroTitle = document.querySelector('.hero-content h1');
if (heroTitle) {
    const text = heroTitle.innerHTML;
    heroTitle.innerHTML = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    };
    
    // Start typing effect when page loads
    window.addEventListener('load', () => {
        setTimeout(typeWriter, 500);
    });
} 