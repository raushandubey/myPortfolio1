/* ============================================
   2026 MODERN PORTFOLIO - INTERACTION LAYER
   Pure enhancement - no content changes
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modern interactions
    initScrollReveal();
    initMagneticButtons();
    initCursorGlow();
    initSmoothScroll();
    initParallax();
    initSystemCanvas();
    
    // Keep existing functionality
    if (typeof initMobileMenu === 'function') initMobileMenu();
    if (typeof initForm === 'function') initForm();
});

// SCROLL REVEAL - IntersectionObserver
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .skill-category, .timeline-item, .project-card, .startup-card');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    revealElements.forEach(el => revealObserver.observe(el));
}

// MAGNETIC BUTTON EFFECT
function initMagneticButtons() {
    const magneticButtons = document.querySelectorAll('.hero-cta, .btn, button[type="submit"]');
    
    magneticButtons.forEach(button => {
        button.addEventListener('mousemove', function(e) {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const moveX = x * 0.3;
            const moveY = y * 0.3;
            
            button.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
        
        button.addEventListener('mouseleave', function() {
            button.style.transform = 'translate(0, 0)';
        });
    });
}

// CURSOR GLOW EFFECT
function initCursorGlow() {
    const cursorGlow = document.createElement('div');
    cursorGlow.className = 'cursor-glow';
    cursorGlow.style.cssText = `
        position: fixed;
        width: 300px;
        height: 300px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(0, 217, 255, 0.15), transparent 70%);
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        transition: opacity 0.3s ease;
        opacity: 0;
    `;
    document.body.appendChild(cursorGlow);
    
    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorGlow.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', () => {
        cursorGlow.style.opacity = '0';
    });
    
    // Smooth follow animation
    function animateGlow() {
        glowX += (mouseX - glowX) * 0.1;
        glowY += (mouseY - glowY) * 0.1;
        
        cursorGlow.style.left = glowX + 'px';
        cursorGlow.style.top = glowY + 'px';
        
        requestAnimationFrame(animateGlow);
    }
    animateGlow();
}

// SMOOTH SCROLL WITH EASING
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = 80;
                const targetPosition = targetElement.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// PARALLAX EFFECT
function initParallax() {
    const parallaxElements = document.querySelectorAll('.about-image, .startup-image img, .project-image img');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const speed = 0.5;
                const yPos = -(scrolled - el.offsetTop) * speed;
                el.style.transform = `translateY(${yPos}px)`;
            }
        });
    });
}

// ENHANCED SYSTEM CANVAS
function initSystemCanvas() {
    const canvas = document.getElementById('systemCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;
    
    // Node system with enhanced visuals
    class Node {
        constructor(x, y, type) {
            this.x = x;
            this.y = y;
            this.type = type;
            this.radius = 10;
            this.connections = [];
            this.pulsePhase = Math.random() * Math.PI * 2;
            this.active = false;
            this.targetX = x;
            this.targetY = y;
        }
        
        draw() {
            const pulse = Math.sin(this.pulsePhase) * 0.3 + 0.7;
            
            // Outer glow
            ctx.shadowBlur = this.active ? 30 : 15;
            ctx.shadowColor = this.getColor();
            
            // Main node
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius * pulse, 0, Math.PI * 2);
            ctx.fillStyle = this.getColor();
            ctx.fill();
            
            // Inner core
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius * 0.4, 0, Math.PI * 2);
            ctx.fillStyle = '#0a0a0f';
            ctx.fill();
            
            ctx.shadowBlur = 0;
        }
        
        getColor() {
            const colors = {
                'api': '#00d9ff',
                'db': '#00ff88',
                'cache': '#ff6b6b',
                'client': '#ffd93d'
            };
            return colors[this.type] || '#00d9ff';
        }
        
        update(mouseX, mouseY) {
            this.pulsePhase += 0.02;
            
            // Mouse attraction
            const dx = mouseX - this.x;
            const dy = mouseY - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
                this.x += dx * 0.01;
                this.y += dy * 0.01;
            } else {
                this.x += (this.targetX - this.x) * 0.05;
                this.y += (this.targetY - this.y) * 0.05;
            }
        }
    }
    
    class DataPacket {
        constructor(from, to) {
            this.from = from;
            this.to = to;
            this.progress = 0;
            this.speed = 0.01 + Math.random() * 0.02;
            this.size = 4;
        }
        
        draw() {
            const x = this.from.x + (this.to.x - this.from.x) * this.progress;
            const y = this.from.y + (this.to.y - this.from.y) * this.progress;
            
            ctx.shadowBlur = 15;
            ctx.shadowColor = this.from.getColor();
            
            ctx.beginPath();
            ctx.arc(x, y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.from.getColor();
            ctx.fill();
            
            // Trail effect
            ctx.beginPath();
            ctx.arc(x, y, this.size * 2, 0, Math.PI * 2);
            ctx.fillStyle = this.from.getColor() + '20';
            ctx.fill();
            
            ctx.shadowBlur = 0;
        }
        
        update() {
            this.progress += this.speed;
            return this.progress >= 1;
        }
    }
    
    // Create nodes
    const nodes = [
        new Node(width * 0.2, height * 0.3, 'client'),
        new Node(width * 0.5, height * 0.2, 'api'),
        new Node(width * 0.8, height * 0.3, 'db'),
        new Node(width * 0.5, height * 0.5, 'cache'),
        new Node(width * 0.3, height * 0.7, 'api'),
        new Node(width * 0.7, height * 0.7, 'db')
    ];
    
    // Define connections
    nodes[0].connections = [nodes[1]];
    nodes[1].connections = [nodes[2], nodes[3]];
    nodes[3].connections = [nodes[4], nodes[5]];
    nodes[4].connections = [nodes[2]];
    
    let packets = [];
    let mouseX = width / 2;
    let mouseY = height / 2;
    let isHovering = false;
    
    // Mouse interaction
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
        isHovering = true;
    });
    
    canvas.addEventListener('mouseleave', () => {
        isHovering = false;
    });
    
    // Spawn packets
    function spawnPacket() {
        const sourceNode = nodes[Math.floor(Math.random() * nodes.length)];
        if (sourceNode.connections.length > 0) {
            const targetNode = sourceNode.connections[Math.floor(Math.random() * sourceNode.connections.length)];
            packets.push(new DataPacket(sourceNode, targetNode));
            sourceNode.active = true;
            setTimeout(() => sourceNode.active = false, 300);
        }
    }
    
    // Animation loop
    function animate() {
        ctx.fillStyle = 'rgba(10, 10, 15, 0.15)';
        ctx.fillRect(0, 0, width, height);
        
        // Draw connections with gradient
        nodes.forEach(node => {
            node.connections.forEach(target => {
                const gradient = ctx.createLinearGradient(node.x, node.y, target.x, target.y);
                gradient.addColorStop(0, node.getColor() + '40');
                gradient.addColorStop(1, target.getColor() + '40');
                
                ctx.beginPath();
                ctx.moveTo(node.x, node.y);
                ctx.lineTo(target.x, target.y);
                ctx.strokeStyle = gradient;
                ctx.lineWidth = 2;
                ctx.stroke();
            });
        });
        
        // Update and draw nodes
        nodes.forEach(node => {
            node.update(mouseX, mouseY);
            node.draw();
        });
        
        // Update and draw packets
        packets = packets.filter(packet => {
            packet.draw();
            return !packet.update();
        });
        
        // Spawn packets
        if (Math.random() < (isHovering ? 0.15 : 0.04)) {
            spawnPacket();
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Handle resize
    window.addEventListener('resize', () => {
        width = canvas.offsetWidth;
        height = canvas.offsetHeight;
        canvas.width = width;
        canvas.height = height;
    });
}

// HEADER SCROLL EFFECT
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});
