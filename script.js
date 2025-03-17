// Main initialization function
document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize particles.js
    initParticles();
    
    // Initialize custom cursor
    initCustomCursor();
    
    // Initialize form submission effects
    initForm();
    
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Init hero animations
    initHeroAnimations();
    
    // Trigger initial animations
    animateOnScroll();
    animateSectionTitles();
    
    // Init project card hover animations
    initProjectCardHovers();
    
    // Initialize professional animations
    initProfessionalAnimations();
    
    // Initialize text scramble effect
    initTextScramble();
    
    // Initialize skill progress bars
    initSkillProgressBars();
    
    // Initialize SVG drawing animations
    initSVGAnimations();
});

// Mobile Menu Initialization
function initMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a nav link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Scroll Animations Initialization
function initScrollAnimations() {
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
    const navLinks = document.querySelectorAll('.nav-link');
    const pageSections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        pageSections.forEach(section => {
            const sectionTop = section.offsetTop;
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
    
    // Scroll reveal animations
    window.addEventListener('scroll', reveal);
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('scroll', animateSectionTitles);
    
    // Add parallax effect to hero section
    window.addEventListener('scroll', () => {
        const hero = document.querySelector('.hero');
        if (hero) {
            const scrollY = window.scrollY;
            hero.style.backgroundPositionY = scrollY * 0.5 + 'px';
        }
    });
    
    // Professional section transitions
    const sectionTransitions = document.querySelectorAll('.section-transition');
    sectionTransitions.forEach(section => {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    section.style.opacity = '1';
                }
            });
        }, { threshold: 0.1 });
        
        sectionObserver.observe(section);
    });
    
    // Run once on page load
    reveal();
}

// Hero Animations Initialization
function initHeroAnimations() {
    // Add animation to profile image
    const profileImage = document.querySelector('.about-image');
    if (profileImage) {
        setTimeout(() => {
            profileImage.classList.add('animate', 'scale-in');
            profileImage.style.opacity = '1';
        }, 300);
    }
    
    // Only run JavaScript typewriter effect if the CSS typewriter class is NOT present
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle && !heroTitle.classList.contains('typewriter')) {
        // This code will only run if the h1 doesn't have the typewriter class
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
        
        setTimeout(typeWriter, 500);
    }
}

// Project Card Hover Effects
function initProjectCardHovers() {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
}

// Particles.js Initialization
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#4a6cf7"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.3,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#4a6cf7",
                    "opacity": 0.2,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 0.8
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    } else {
        console.warn('particles.js not loaded');
    }
}

// Custom Cursor Initialization
function initCustomCursor() {
    try {
        const cursor = document.createElement('div');
        cursor.classList.add('custom-cursor');
        
        const cursorDot = document.createElement('div');
        cursorDot.classList.add('custom-cursor-dot');
        
        document.body.appendChild(cursor);
        document.body.appendChild(cursorDot);
        
        document.addEventListener('mousemove', function(e) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            cursorDot.style.left = e.clientX + 'px';
            cursorDot.style.top = e.clientY + 'px';
        });
        
        // Hide cursor when mouse leaves window
        document.addEventListener('mouseout', function(e) {
            if (e.relatedTarget === null) {
                cursor.style.opacity = '0';
                cursorDot.style.opacity = '0';
            }
        });
        
        document.addEventListener('mouseover', function() {
            cursor.style.opacity = '0.6';
            cursorDot.style.opacity = '1';
        });
        
        // Make cursor larger when hovering over clickable elements
        const clickables = document.querySelectorAll('a, button, .project-card, .nav-link, input, textarea');
        clickables.forEach(element => {
            element.addEventListener('mouseenter', function() {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursor.style.borderColor = 'white';
                cursorDot.style.backgroundColor = 'white';
            });
            
            element.addEventListener('mouseleave', function() {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.borderColor = '#4a6cf7';
                cursorDot.style.backgroundColor = '#4a6cf7';
            });
        });
    } catch (error) {
        console.error('Error initializing custom cursor:', error);
    }
}

// Form Initialization
function initForm() {
    const form = document.querySelector('.contact-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const button = this.querySelector('button[type="submit"]');
            const originalText = button.textContent;
            
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            button.disabled = true;
            
            // Simulate form submission (replace with actual form submission)
            setTimeout(() => {
                button.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                button.classList.add('success');
                
                // Reset form
                form.reset();
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    button.innerHTML = originalText;
                    button.disabled = false;
                    button.classList.remove('success');
                }, 3000);
            }, 2000);
        });
    }
}

// Smooth Scrolling Initialization
function initSmoothScrolling() {
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
}

// Scroll reveal function
function reveal() {
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    
    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add('active');
            
            // Apply delay if data-delay attribute is present
            if (reveals[i].hasAttribute('data-delay')) {
                const delay = reveals[i].getAttribute('data-delay');
                reveals[i].style.transitionDelay = delay + 's';
            }
        }
    }
}

// Animate on scroll function
function animateOnScroll() {
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
}

// Section title animation
function animateSectionTitles() {
    const titles = document.querySelectorAll('.section-title');
    titles.forEach(title => {
        const titlePosition = title.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (titlePosition < screenPosition) {
            title.classList.add('animate', 'scale-in');
            title.style.opacity = '1';
        }
    });
}

// Professional animations initialization
function initProfessionalAnimations() {
    // Text reveal animations
    const textRevealElements = document.querySelectorAll('.text-reveal');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const textRevealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    textRevealElements.forEach(element => {
        textRevealObserver.observe(element);
    });
    
    // Staggered list animations
    const staggerLists = document.querySelectorAll('.stagger-list');
    
    const staggerObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    staggerLists.forEach(list => {
        staggerObserver.observe(list);
    });
    
    // Add magnetic effect to buttons
    initMagneticButtons();
}

// Magnetic button effect
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.primary-btn, .secondary-btn');
    
    buttons.forEach(button => {
        button.addEventListener('mousemove', function(e) {
            const position = button.getBoundingClientRect();
            const x = e.clientX - position.left - position.width / 2;
            const y = e.clientY - position.top - position.height / 2;
            
            // The magnetic effect strength (lower = stronger)
            const damper = 15;
            
            button.style.transform = `translate(${x / damper}px, ${y / damper}px)`;
        });
        
        button.addEventListener('mouseleave', function() {
            button.style.transform = 'translate(0, 0)';
        });
    });
}

// Text scramble effect for headings
function initTextScramble() {
    class TextScramble {
        constructor(el) {
            this.el = el;
            this.chars = '!<>-_\\/[]{}—=+*^?#_';
            this.update = this.update.bind(this);
        }
        
        setText(newText) {
            const oldText = this.el.innerText;
            const length = Math.max(oldText.length, newText.length);
            const promise = new Promise(resolve => this.resolve = resolve);
            this.queue = [];
            
            for (let i = 0; i < length; i++) {
                const from = oldText[i] || '';
                const to = newText[i] || '';
                const start = Math.floor(Math.random() * 40);
                const end = start + Math.floor(Math.random() * 40);
                this.queue.push({ from, to, start, end });
            }
            
            cancelAnimationFrame(this.frameRequest);
            this.frame = 0;
            this.update();
            return promise;
        }
        
        update() {
            let output = '';
            let complete = 0;
            
            for (let i = 0, n = this.queue.length; i < n; i++) {
                let { from, to, start, end, char } = this.queue[i];
                
                if (this.frame >= end) {
                    complete++;
                    output += to;
                } else if (this.frame >= start) {
                    if (!char || Math.random() < 0.28) {
                        char = this.randomChar();
                        this.queue[i].char = char;
                    }
                    output += `<span class="scramble-char">${char}</span>`;
                } else {
                    output += from;
                }
            }
            
            this.el.innerHTML = output;
            
            if (complete === this.queue.length) {
                this.resolve();
            } else {
                this.frameRequest = requestAnimationFrame(this.update);
                this.frame++;
            }
        }
        
        randomChar() {
            return this.chars[Math.floor(Math.random() * this.chars.length)];
        }
    }
    
    // Find all elements with data-scramble attribute
    const scrambleElements = document.querySelectorAll('[data-scramble]');
    
    scrambleElements.forEach(el => {
        // Store the original text for reference
        const originalText = el.textContent;
        el.setAttribute('data-text', originalText);
        
        const scrambler = new TextScramble(el);
        
        // Improved intersection observer with better options
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Slight delay before starting the effect
                    setTimeout(() => {
                        scrambler.setText(originalText);
                    }, 300);
                    observer.unobserve(el);
                }
            });
        }, { 
            threshold: 0.5,
            rootMargin: "0px 0px -100px 0px"
        });
        
        observer.observe(el);
        
        // Also handle hover effect if needed
        if (el.classList.contains('scramble-on-hover')) {
            el.addEventListener('mouseenter', () => {
                scrambler.setText(originalText);
            });
        }
    });
}

// Initialize skill progress bars
function initSkillProgressBars() {
    const progressBars = document.querySelectorAll('.skill-progress-bar');
    const skillCategories = document.querySelectorAll('.skill-category');
    
    // Create a more robust intersection observer for progress bars
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Use a slight delay to ensure the animation is visible
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, 300);
                progressObserver.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px"
    });
    
    // Start observing all progress bars
    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
    
    // Observer for skill categories
    const categoryObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger the animation of categories
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, 200 * index);
                categoryObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    // Start observing all skill categories
    skillCategories.forEach(category => {
        categoryObserver.observe(category);
    });
    
    // Also trigger animation when the section becomes visible
    const skillsContainer = document.querySelector('.skills-container');
    if (skillsContainer) {
        const skillsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                // When the skills container is visible, animate all progress bars with staggered delay
                progressBars.forEach((bar, index) => {
                    setTimeout(() => {
                        bar.classList.add('animate');
                    }, 200 * (index + 1)); // Staggered animation
                });
                
                // Also animate skill categories with staggered delay
                skillCategories.forEach((category, index) => {
                    setTimeout(() => {
                        category.classList.add('animate');
                    }, 300 * (index + 1));
                });
                
                skillsObserver.unobserve(skillsContainer);
            }
        }, { threshold: 0.3 });
        
        skillsObserver.observe(skillsContainer);
    }
}

// Initialize SVG drawing animations
function initSVGAnimations() {
    const svgElements = document.querySelectorAll('.svg-drawing-animation');
    
    const svgObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                svgObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    svgElements.forEach(svg => {
        svgObserver.observe(svg);
    });
} 