/* ============================================
   PRODUCTION ENGINEER PORTFOLIO - INTERACTIONS
   Purpose-driven animations only
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    initProductionCanvas();
    initMetricCounters();
    initUptimeCounter();
    initScrollReveal();
    initSmoothScroll();
    initMobileNav();
    initFormSubmission();
});

// PRODUCTION CANVAS - System Visualization
function initProductionCanvas() {
    const canvas = document.getElementById('productionCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;
    
    // Node class representing system components
    class SystemNode {
        constructor(x, y, type, label) {
            this.x = x;
            this.y = y;
            this.type = type;
            this.label = label;
            this.radius = 12;
            this.connections = [];
            this.pulsePhase = Math.random() * Math.PI * 2;
            this.active = false;
        }
        
        draw() {
            const pulse = Math.sin(this.pulsePhase) * 0.2 + 0.8;
            
            // Glow effect
            ctx.shadowBlur = this.active ? 25 : 15;
            ctx.shadowColor = this.getColor();
            
            // Outer ring
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius * pulse, 0, Math.PI * 2);
            ctx.strokeStyle = this.getColor();
            ctx.lineWidth = 2;
            ctx.stroke();
            
            // Inner circle
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius * 0.6, 0, Math.PI * 2);
            ctx.fillStyle = this.getColor();
            ctx.fill();
            
            ctx.shadowBlur = 0;
            
            // Label
            ctx.fillStyle = '#a0a0b0';
            ctx.font = '11px monospace';
            ctx.textAlign = 'center';
            ctx.fillText(this.label, this.x, this.y + this.radius + 20);
        }
        
        getColor() {
            const colors = {
                'gateway': '#00ff88',
                'api': '#00d9ff',
                'db': '#ffaa00',
                'cache': '#ff6b6b',
                'cdn': '#9d4edd'
            };
            return colors[this.type] || '#00ff88';
        }
        
        update() {
            this.pulsePhase += 0.02;
        }
    }
    
    // Data packet class
    class DataPacket {
        constructor(from, to) {
            this.from = from;
            this.to = to;
            this.progress = 0;
            this.speed = 0.008 + Math.random() * 0.012;
            this.size = 4;
        }
        
        draw() {
            const x = this.from.x + (this.to.x - this.from.x) * this.progress;
            const y = this.from.y + (this.to.y - this.from.y) * this.progress;
            
            ctx.shadowBlur = 15;
            ctx.shadowColor = this.from.getColor();
            
            // Packet
            ctx.beginPath();
            ctx.arc(x, y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.from.getColor();
            ctx.fill();
            
            // Trail
            ctx.beginPath();
            ctx.arc(x, y, this.size * 2.5, 0, Math.PI * 2);
            ctx.fillStyle = this.from.getColor() + '30';
            ctx.fill();
            
            ctx.shadowBlur = 0;
        }
        
        update() {
            this.progress += this.speed;
            return this.progress >= 1;
        }
    }
    
    // Create system architecture
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.3;
    
    const nodes = [
        new SystemNode(centerX, centerY - radius, 'gateway', 'Gateway'),
        new SystemNode(centerX + radius * 0.8, centerY - radius * 0.3, 'api', 'API'),
        new SystemNode(centerX + radius * 0.8, centerY + radius * 0.3, 'db', 'Database'),
        new SystemNode(centerX, centerY + radius, 'cache', 'Cache'),
        new SystemNode(centerX - radius * 0.8, centerY + radius * 0.3, 'cdn', 'CDN'),
        new SystemNode(centerX - radius * 0.8, centerY - radius * 0.3, 'api', 'API-2')
    ];
    
    // Define connections (data flow)
    nodes[0].connections = [nodes[1], nodes[5]]; // Gateway to APIs
    nodes[1].connections = [nodes[2], nodes[3]]; // API to DB and Cache
    nodes[5].connections = [nodes[2], nodes[3]]; // API-2 to DB and Cache
    nodes[3].connections = [nodes[4]]; // Cache to CDN
    
    let packets = [];
    let mouseX = centerX;
    let mouseY = centerY;
    
    // Mouse interaction
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    });
    
    // Spawn data packets
    function spawnPacket() {
        const sourceNode = nodes[Math.floor(Math.random() * nodes.length)];
        if (sourceNode.connections.length > 0) {
            const targetNode = sourceNode.connections[Math.floor(Math.random() * sourceNode.connections.length)];
            packets.push(new DataPacket(sourceNode, targetNode));
            sourceNode.active = true;
            setTimeout(() => sourceNode.active = false, 400);
        }
    }
    
    // Animation loop
    function animate() {
        // Fade effect instead of clear
        ctx.fillStyle = 'rgba(18, 18, 26, 0.1)';
        ctx.fillRect(0, 0, width, height);
        
        // Draw connections
        nodes.forEach(node => {
            node.connections.forEach(target => {
                const gradient = ctx.createLinearGradient(node.x, node.y, target.x, target.y);
                gradient.addColorStop(0, node.getColor() + '40');
                gradient.addColorStop(1, target.getColor() + '40');
                
                ctx.beginPath();
                ctx.moveTo(node.x, node.y);
                ctx.lineTo(target.x, target.y);
                ctx.strokeStyle = gradient;
                ctx.lineWidth = 1.5;
                ctx.stroke();
            });
        });
        
        // Update and draw nodes
        nodes.forEach(node => {
            node.update();
            node.draw();
        });
        
        // Update and draw packets
        packets = packets.filter(packet => {
            packet.draw();
            return !packet.update();
        });
        
        // Spawn packets periodically
        if (Math.random() < 0.05) {
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

// METRIC COUNTERS - Animate numbers
function initMetricCounters() {
    const metricValues = document.querySelectorAll('.metric-value');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseFloat(entry.target.getAttribute('data-target'));
                if (target) {
                    animateCounter(entry.target, 0, target, 2000);
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    metricValues.forEach(el => observer.observe(el));
}

function animateCounter(element, start, end, duration) {
    const startTime = performance.now();
    const isDecimal = end % 1 !== 0;
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = start + (end - start) * easeOutQuart;
        
        element.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = isDecimal ? end.toFixed(1) : end;
        }
    }
    
    requestAnimationFrame(update);
}

// UPTIME COUNTER - Real-time uptime display
function initUptimeCounter() {
    const uptimeElement = document.getElementById('uptime');
    if (!uptimeElement) return;
    
    // Simulated launch date (adjust to your actual launch date)
    const launchDate = new Date('2024-01-01T00:00:00');
    
    function updateUptime() {
        const now = new Date();
        const diff = now - launchDate;
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        uptimeElement.textContent = `${days}d ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    updateUptime();
    setInterval(updateUptime, 1000);
}

// SCROLL REVEAL - Intersection Observer
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.exp-card, .project-card, .tutorial-card, .stack-category, .arch-layer');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('fade-in');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    revealElements.forEach(el => observer.observe(el));
}

// SMOOTH SCROLL
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

// MOBILE NAVIGATION
function initMobileNav() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Close menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }
}

// FORM SUBMISSION
function initFormSubmission() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const button = this.querySelector('button[type="submit"]');
        const originalHTML = button.innerHTML;
        
        // Show loading state
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending...</span>';
        button.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            button.innerHTML = '<i class="fas fa-check"></i> <span>Message Sent!</span>';
            
            // Reset form
            form.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                button.innerHTML = originalHTML;
                button.disabled = false;
            }, 3000);
        }, 2000);
    });
}

// HEADER SCROLL EFFECT
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.nav-system');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(10, 10, 15, 0.95)';
        nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
    } else {
        nav.style.background = 'rgba(18, 18, 26, 0.8)';
        nav.style.boxShadow = 'none';
    }
});
