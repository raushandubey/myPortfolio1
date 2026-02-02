// ========================================
// 2026 SYSTEM-STYLE ANIMATION ENGINE
// ========================================

// Central Animation Controller
class AnimationEngine {
    constructor() {
        this.observers = new Map();
        this.rafId = null;
        this.scrollY = 0;
        this.init();
    }

    init() {
        this.setupScrollTracking();
        this.setupIntersectionObservers();
        this.startAnimationLoop();
    }

    setupScrollTracking() {
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    this.scrollY = window.pageYOffset;
                    this.updateScrollDependentElements();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    updateScrollDependentElements() {
        // Header scroll effect
        const header = document.querySelector('header');
        if (header) {
            header.classList.toggle('scrolled', this.scrollY > 50);
        }

        // Update active nav link
        this.updateActiveNavLink();
        
        // Parallax effects
        this.updateParallax();
    }

    updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (this.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    }

    updateParallax() {
        const hero = document.querySelector('.hero');
        if (hero && this.scrollY < window.innerHeight) {
            const gridBg = hero.querySelector('.system-grid-bg');
            if (gridBg) {
                gridBg.style.transform = `translateY(${this.scrollY * 0.3}px)`;
            }
        }
    }

    setupIntersectionObservers() {
        // Safe reveal animations - content always visible
        const revealObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                        const delay = entry.target.dataset.delay || 0;
                        entry.target.style.transitionDelay = `${delay}s`;
                    }
                });
            },
            { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
        );

        document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
            revealObserver.observe(el);
        });

        // Experience Cards - Staggered Entrance
        const expObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const index = parseInt(entry.target.dataset.expIndex) || 0;
                        setTimeout(() => {
                            entry.target.classList.add('exp-visible');
                        }, index * 150);
                        expObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );

        document.querySelectorAll('.exp-card').forEach(el => {
            expObserver.observe(el);
        });

        // Production Systems Cards - Staggered Entrance
        const prodObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const index = parseInt(entry.target.dataset.prodIndex) || 0;
                        setTimeout(() => {
                            entry.target.classList.add('prod-visible');
                        }, index * 150);
                        prodObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );

        document.querySelectorAll('.prod-card').forEach(el => {
            prodObserver.observe(el);
        });

        // Timeline animations with stagger
        const timelineObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const items = document.querySelectorAll('.timeline-item');
                        const index = Array.from(items).indexOf(entry.target);
                        setTimeout(() => {
                            entry.target.classList.add('animate-timeline');
                        }, index * 120);
                        timelineObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.2 }
        );

        document.querySelectorAll('.timeline-item').forEach(el => {
            timelineObserver.observe(el);
        });

        // Project card stagger with safe animation
        const cardObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const cards = document.querySelectorAll('.project-card, .startup-card, .project-skill, .project-experimental');
                        const index = Array.from(cards).indexOf(entry.target);
                        setTimeout(() => {
                            entry.target.classList.add('animate-card');
                        }, index * 80);
                        cardObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        document.querySelectorAll('.project-card, .startup-card, .project-skill, .project-experimental').forEach(el => {
            cardObserver.observe(el);
        });

        // Contact items animation
        const contactObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const items = document.querySelectorAll('.contact-item');
                        const index = Array.from(items).indexOf(entry.target);
                        setTimeout(() => {
                            entry.target.classList.add('animate-in');
                        }, index * 100);
                        contactObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.2 }
        );

        document.querySelectorAll('.contact-item').forEach(el => {
            contactObserver.observe(el);
        });
    }

    startAnimationLoop() {
        const animate = () => {
            this.updateMetrics();
            this.rafId = requestAnimationFrame(animate);
        };
        animate();
    }

    updateMetrics() {
        // Animate metric counters
        const metrics = document.querySelectorAll('.metric-value');
        metrics.forEach(metric => {
            if (!metric.dataset.animated && this.isInViewport(metric)) {
                this.animateCounter(metric);
                metric.dataset.animated = 'true';
            }
        });
    }

    animateCounter(element) {
        const text = element.textContent;
        const match = text.match(/(\d+\.?\d*)/);
        if (!match) return;

        const target = parseFloat(match[1]);
        const suffix = text.replace(match[1], '');
        const duration = 2000;
        const start = performance.now();

        const update = (currentTime) => {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = target * eased;
            
            element.textContent = current.toFixed(1) + suffix;

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        };

        requestAnimationFrame(update);
    }

    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
    }
}

// Text Scramble Effect
class TextScrambler {
    constructor(element) {
        this.element = element;
        this.chars = '!<>-_\\/[]{}—=+*^?#_';
        this.originalText = element.textContent;
    }

    scramble() {
        return new Promise((resolve) => {
            const length = this.originalText.length;
            let frame = 0;
            const maxFrames = 60;

            const update = () => {
                let output = '';
                let complete = 0;

                for (let i = 0; i < length; i++) {
                    if (frame > i * 2) {
                        output += this.originalText[i];
                        complete++;
                    } else {
                        output += this.chars[Math.floor(Math.random() * this.chars.length)];
                    }
                }

                this.element.textContent = output;

                if (complete === length || frame >= maxFrames) {
                    resolve();
                } else {
                    frame++;
                    requestAnimationFrame(update);
                }
            };

            update();
        });
    }
}

// Magnetic Button Effect
class MagneticButton {
    constructor(element) {
        this.element = element;
        this.strength = 20;
        this.init();
    }

    init() {
        this.element.addEventListener('mousemove', (e) => {
            const rect = this.element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            this.element.style.transform = `translate(${x / this.strength}px, ${y / this.strength}px)`;
        });

        this.element.addEventListener('mouseleave', () => {
            this.element.style.transform = 'translate(0, 0)';
        });
    }
}

// Skill Progress Animation
class SkillProgressAnimator {
    constructor() {
        this.init();
    }

    init() {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateProgress(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.5 }
        );

        document.querySelectorAll('.skill-progress-bar').forEach(bar => {
            observer.observe(bar);
        });
    }

    animateProgress(bar) {
        const progress = bar.style.getPropertyValue('--progress');
        const target = parseInt(progress);
        let current = 0;
        const duration = 1500;
        const start = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            
            // Spring easing
            const eased = 1 - Math.pow(1 - progress, 4);
            current = target * eased;

            bar.style.width = `${current}%`;

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }
}

// Mobile Menu Handler
class MobileMenu {
    constructor() {
        this.toggle = document.getElementById('mobile-menu');
        this.menu = document.querySelector('.nav-menu');
        this.init();
    }

    init() {
        if (!this.toggle || !this.menu) return;

        this.toggle.addEventListener('click', () => {
            this.toggle.classList.toggle('active');
            this.menu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                this.toggle.classList.remove('active');
                this.menu.classList.remove('active');
            });
        });
    }
}

// Smooth Scroll Handler
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                const target = document.querySelector(targetId);

                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Form Handler
class FormHandler {
    constructor() {
        this.form = document.querySelector('.contact-form');
        this.init();
    }

    init() {
        if (!this.form) return;

        this.form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const button = this.form.querySelector('button[type="submit"]');
            const originalText = button.textContent;

            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> SENDING...';
            button.disabled = true;

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            button.innerHTML = '<i class="fas fa-check"></i> MESSAGE SENT';
            this.form.reset();

            setTimeout(() => {
                button.innerHTML = originalText;
                button.disabled = false;
            }, 3000);
        });
    }
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    // Start animation engine
    const engine = new AnimationEngine();

    // Initialize mobile menu
    new MobileMenu();

    // Initialize smooth scroll
    new SmoothScroll();

    // Initialize form handler
    new FormHandler();

    // Initialize skill progress
    new SkillProgressAnimator();

    // Initialize magnetic buttons
    document.querySelectorAll('.btn').forEach(btn => {
        new MagneticButton(btn);
    });

    // Initialize text scramblers
    const scrambleObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const scrambler = new TextScrambler(entry.target);
                    setTimeout(() => scrambler.scramble(), 300);
                    scrambleObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.5 }
    );

    document.querySelectorAll('[data-scramble]').forEach(el => {
        scrambleObserver.observe(el);
    });

    // Set viewport height for mobile
    const setVH = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    setVH();
    window.addEventListener('resize', setVH);
});
