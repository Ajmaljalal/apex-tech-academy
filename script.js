// Loading Screen Management
window.addEventListener('load', () => {
  setTimeout(() => {
    const loadingScreen = document.querySelector('.loading-screen');
    loadingScreen.classList.add('fade-out');

    setTimeout(() => {
      loadingScreen.style.display = 'none';
    }, 500);
  }, 2000);
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('active');

  // Animate hamburger bars
  const bars = hamburger.querySelectorAll('.bar');
  bars[0].style.transform = navMenu.classList.contains('active') ? 'rotate(-45deg) translate(-5px, 6px)' : '';
  bars[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
  bars[2].style.transform = navMenu.classList.contains('active') ? 'rotate(45deg) translate(-5px, -6px)' : '';
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));

    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

      // Close mobile menu if open
      navMenu.classList.remove('active');
    }
  });
});

// Particle Network Animation Class
class ParticleNetwork {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.options = {
      particleCount: options.particleCount || 80,
      particleSize: options.particleSize || 2,
      lineDistance: options.lineDistance || 100,
      particleSpeed: options.particleSpeed || 0.5,
      ...options
    };

    this.init();
  }

  init() {
    this.resize();
    this.createParticles();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
  }

  createParticles() {
    this.particles = [];
    for (let i = 0; i < this.options.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * this.options.particleSpeed,
        vy: (Math.random() - 0.5) * this.options.particleSpeed,
        radius: Math.random() * this.options.particleSize + this.options.particleSize * 0.5,
        opacity: 1.0  // Full opacity for visibility
      });
    }
  }

  updateParticles() {
    this.particles.forEach(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < 0) particle.x = this.canvas.width;
      if (particle.x > this.canvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = this.canvas.height;
      if (particle.y > this.canvas.height) particle.y = 0;
    });
  }

  drawParticles() {
    // Ensure crisp rendering
    this.ctx.imageSmoothingEnabled = false;

    this.particles.forEach(particle => {
      // Draw a small glow
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.radius * 2, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(255, 255, 255, 0.1)`;
      this.ctx.fill();

      // Draw the particle
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
      this.ctx.fill();
    });
  }

  connectParticles() {
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.options.lineDistance) {
          const opacity = (1 - distance / this.options.lineDistance) * 0.8;
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
          this.ctx.lineWidth = 1.5;
          this.ctx.stroke();
        }
      }
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.updateParticles();
    this.drawParticles();
    this.connectParticles();
    requestAnimationFrame(() => this.animate());
  }
}

// Canvas Background Animations
function initCanvasAnimations() {
  // Hero Canvas - Particle Network
  const heroCanvas = document.getElementById('heroCanvas');
  if (heroCanvas) {
    const heroNetwork = new ParticleNetwork(heroCanvas, {
      particleCount: 120,
      particleSize: 2.5,
      lineDistance: 150,
      particleSpeed: 0.4
    });
    heroNetwork.animate();
  }

  // AI Canvas - Flowing Wave Pattern with Particles
  const aiCanvas = document.getElementById('aiCanvas');
  if (aiCanvas) {
    const aiCtx = aiCanvas.getContext('2d');
    // Ensure canvas has proper rendering settings
    aiCtx.imageSmoothingEnabled = false;
    const aiNetwork = new ParticleNetwork(aiCanvas, {
      particleCount: 100,
      particleSize: 2.5,
      lineDistance: 150,
      particleSpeed: 0.3
    });

    function resizeCanvas() {
      aiCanvas.width = aiCanvas.offsetWidth;
      aiCanvas.height = aiCanvas.offsetHeight;
      aiNetwork.resize();
      aiNetwork.createParticles();
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let waveOffset = 0;

    function drawAIBackground() {
      aiCtx.clearRect(0, 0, aiCanvas.width, aiCanvas.height);

      // Draw particle network
      aiNetwork.updateParticles();
      aiNetwork.drawParticles();
      aiNetwork.connectParticles();

      // Draw flowing waves on top
      for (let i = 0; i < 5; i++) {
        aiCtx.beginPath();
        aiCtx.strokeStyle = `rgba(255, 255, 255, ${0.03 - i * 0.005})`;
        aiCtx.lineWidth = 1.5;

        for (let x = 0; x < aiCanvas.width; x += 10) {
          const y = aiCanvas.height / 2 +
            Math.sin((x + waveOffset) * 0.01 + i * 0.5) * 50 +
            Math.sin((x + waveOffset) * 0.005 + i * 0.3) * 30;

          if (x === 0) {
            aiCtx.moveTo(x, y);
          } else {
            aiCtx.lineTo(x, y);
          }
        }

        aiCtx.stroke();
      }

      waveOffset += 2;
      requestAnimationFrame(drawAIBackground);
    }

    drawAIBackground();
  }

  // IT Canvas - Hexagonal Pattern with Particles
  const itCanvas = document.getElementById('itCanvas');
  if (itCanvas) {

    const itCtx = itCanvas.getContext('2d');
    // Ensure canvas has proper rendering settings
    itCtx.imageSmoothingEnabled = false;
    const itNetwork = new ParticleNetwork(itCanvas, {
      particleCount: 120,
      particleSize: 3,
      lineDistance: 150,
      particleSpeed: 0.4
    });

    function resizeITCanvas() {
      itCanvas.width = itCanvas.offsetWidth;
      itCanvas.height = itCanvas.offsetHeight;

      itNetwork.resize();
      itNetwork.createParticles();
      createHexagons();
    }

    // Initial resize
    setTimeout(() => {
      resizeITCanvas();
    }, 100);

    window.addEventListener('resize', resizeITCanvas);

    const hexagons = [];
    const hexSize = 40;

    // Create hexagon grid
    function createHexagons() {
      hexagons.length = 0; // Clear existing hexagons
      for (let x = 0; x < itCanvas.width + hexSize * 2; x += hexSize * 3) {
        for (let y = 0; y < itCanvas.height + hexSize * 2; y += hexSize * 2) {
          hexagons.push({
            x: x + (Math.floor(y / (hexSize * 2)) % 2) * (hexSize * 1.5),
            y: y,
            alpha: Math.random() * 0.2 + 0.05,
            alphaDirection: Math.random() > 0.5 ? 1 : -1,
            size: hexSize
          });
        }
      }
    }

    createHexagons();

    function drawHexagon(ctx, x, y, size, alpha) {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        const hx = x + size * Math.cos(angle);
        const hy = y + size * Math.sin(angle);

        if (i === 0) {
          ctx.moveTo(hx, hy);
        } else {
          ctx.lineTo(hx, hy);
        }
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.stroke();
    }

    // Start the particle network animation separately
    function animateIT() {
      // Clear the canvas
      itCtx.clearRect(0, 0, itCanvas.width, itCanvas.height);

      // Optional: Add a very subtle background to see if canvas is working
      // itCtx.fillStyle = 'rgba(255, 255, 255, 0.01)';
      // itCtx.fillRect(0, 0, itCanvas.width, itCanvas.height);

      // Save context state
      itCtx.save();

      // Draw particle network first
      itNetwork.updateParticles();
      itNetwork.drawParticles();
      itNetwork.connectParticles();

      // Restore context
      itCtx.restore();

      // Draw hexagons on top with lower opacity
      hexagons.forEach(hex => {
        itCtx.save();
        itCtx.globalAlpha = 0.5; // Make hexagons more transparent
        drawHexagon(itCtx, hex.x, hex.y, hex.size, hex.alpha);
        itCtx.restore();

        // Animate alpha
        hex.alpha += hex.alphaDirection * 0.003;
        if (hex.alpha > 0.25 || hex.alpha < 0.05) {
          hex.alphaDirection *= -1;
        }
      });

      requestAnimationFrame(animateIT);
    }

    // Start the animation
    animateIT();
  }
}

// Initialize canvas animations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initCanvasAnimations();
});

// Intersection Observer for Scroll Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');

      // Trigger curriculum item animations
      if (entry.target.classList.contains('track-container')) {
        const items = entry.target.querySelectorAll('.curriculum-item');
        items.forEach((item, index) => {
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
          }, index * 100);
        });
      }
    }
  });
}, observerOptions);

// Observe elements
document.querySelectorAll('.track-container, .contact-card').forEach(el => {
  observer.observe(el);
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallax = document.querySelector('.hero-bg');

  if (parallax) {
    const speed = 0.5;
    parallax.style.transform = `translateY(${scrolled * speed}px)`;
  }
});

// Button Hover Effects with Ripple
document.querySelectorAll('.track-cta, .cta-button').forEach(button => {
  button.addEventListener('click', function (e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');

    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Add ripple styles dynamically
const style = document.createElement('style');
style.textContent = `
    .track-cta, .cta-button {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 100) {
    navbar.style.background = 'rgba(10, 26, 62, 0.98)';
    navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
  } else {
    navbar.style.background = 'rgba(10, 26, 62, 0.95)';
    navbar.style.boxShadow = 'none';
  }
});

// Typing Effect for Hero Title (optional enhancement)
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.textContent = '';

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Initialize typing effect after loading
window.addEventListener('load', () => {
  setTimeout(() => {
    const heroTitle = document.querySelector('.hero-title .title-line');
    if (heroTitle) {
      const originalText = heroTitle.textContent;
      typeWriter(heroTitle, originalText, 50);
    }
  }, 2500);

  // Start glowing effect after typing animation completes
  setTimeout(() => {
    const featureNumbers = document.querySelectorAll('.feature-number');
    const featureItems = document.querySelectorAll('.feature-item');

    // Animate feature items with stagger
    featureItems.forEach((item, index) => {
      setTimeout(() => {
        const number = item.querySelector('.feature-number');
        if (number) {
          // Add entrance animation
          number.style.opacity = '0';
          number.style.transform = 'scale(0.8)';

          setTimeout(() => {
            number.style.transition = 'all 0.5s ease';
            number.style.opacity = '1';
            number.style.transform = 'scale(1)';

            // Add glowing effect after entrance
            setTimeout(() => {
              number.classList.add('glow-active');
            }, 300);
          }, 50);
        }
      }, index * 300); // Stagger the animation between month and price
    });
  }, 3200); // Start after typing animation (~3.2 seconds)
});

// Add hover effect to contact cards
document.querySelectorAll('.contact-card').forEach(card => {
  card.addEventListener('mouseenter', function () {
    this.style.transform = 'translateY(-10px) scale(1.02)';
  });

  card.addEventListener('mouseleave', function () {
    this.style.transform = 'translateY(0) scale(1)';
  });
});

// Form submission handling (if you add a contact form later)
function handleFormSubmit(e) {
  e.preventDefault();
  // Add form submission logic here
  console.log('Form submitted');
}

// Performance optimization - Debounce scroll events
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

// Apply debouncing to scroll events
const debouncedScroll = debounce(() => {
  // Handle scroll-based animations
}, 16); 