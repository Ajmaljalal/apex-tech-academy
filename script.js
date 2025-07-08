// Loading Screen Management
class LoadingAnimation {
  constructor() {
    this.canvas = document.getElementById('loadingCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.isAnimating = true;

    this.init();
  }

  init() {
    this.resize();
    this.createParticles();
    this.animate();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createParticles() {
    const particleCount = 50;
    this.particles = [];

    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        hue: Math.random() * 60 + 15 // Orange to yellow range
      });
    }
  }

  updateParticles() {
    this.particles.forEach(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Wrap around screen
      if (particle.x < 0) particle.x = this.canvas.width;
      if (particle.x > this.canvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = this.canvas.height;
      if (particle.y > this.canvas.height) particle.y = 0;

      // Pulse opacity
      particle.opacity += Math.sin(Date.now() * 0.01 + particle.x * 0.01) * 0.01;
      particle.opacity = Math.max(0.1, Math.min(0.8, particle.opacity));
    });
  }

  drawParticles() {
    this.particles.forEach(particle => {
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `hsla(${particle.hue}, 100%, 60%, ${particle.opacity})`;
      this.ctx.fill();

      // Add glow effect
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.radius * 3, 0, Math.PI * 2);
      this.ctx.fillStyle = `hsla(${particle.hue}, 100%, 60%, ${particle.opacity * 0.1})`;
      this.ctx.fill();
    });
  }

  connectParticles() {
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          const opacity = (1 - distance / 100) * 0.3;
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.strokeStyle = `rgba(255, 107, 53, ${opacity})`;
          this.ctx.lineWidth = 1;
          this.ctx.stroke();
        }
      }
    }
  }

  animate() {
    if (!this.isAnimating) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.updateParticles();
    this.connectParticles();
    this.drawParticles();

    requestAnimationFrame(() => this.animate());
  }

  stop() {
    this.isAnimating = false;
  }
}

// Initialize loading animation
let loadingAnim;
if (document.getElementById('loadingCanvas')) {
  loadingAnim = new LoadingAnimation();
}

window.addEventListener('load', () => {
  // Update loading status text
  const statusEl = document.querySelector('.loading-status');
  if (statusEl) {
    setTimeout(() => statusEl.textContent = 'LOADING MODULES...', 800);
    setTimeout(() => statusEl.textContent = 'OPTIMIZING EXPERIENCE...', 1800);
    setTimeout(() => statusEl.textContent = 'PREPARING INTERFACE...', 2800);
    setTimeout(() => statusEl.textContent = 'READY!', 3200);
  }

  setTimeout(() => {
    const loadingScreen = document.querySelector('.loading-screen');
    loadingScreen.classList.add('fade-out');

    // Stop loading animation
    if (loadingAnim) {
      loadingAnim.stop();
    }

    setTimeout(() => {
      loadingScreen.style.display = 'none';
    }, 800);
  }, 3500);
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

// Mobile Detection
function isMobile() {
  return window.innerWidth <= 768;
}

// Canvas Background Animations
function initCanvasAnimations() {
  // Reduce animation complexity on mobile
  const mobileOptions = isMobile() ? {
    particleCountMultiplier: 0.4,
    lineDistanceMultiplier: 0.8,
    particleSpeedMultiplier: 0.7
  } : {
    particleCountMultiplier: 1,
    lineDistanceMultiplier: 1,
    particleSpeedMultiplier: 1
  };

  // Hero Canvas - Particle Network
  const heroCanvas = document.getElementById('heroCanvas');
  if (heroCanvas) {
    const heroNetwork = new ParticleNetwork(heroCanvas, {
      particleCount: Math.floor(120 * mobileOptions.particleCountMultiplier),
      particleSize: 2.5,
      lineDistance: Math.floor(150 * mobileOptions.lineDistanceMultiplier),
      particleSpeed: 0.4 * mobileOptions.particleSpeedMultiplier
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
      particleCount: Math.floor(40 * mobileOptions.particleCountMultiplier),
      particleSize: 2.5,
      lineDistance: Math.floor(150 * mobileOptions.lineDistanceMultiplier),
      particleSpeed: 0.3 * mobileOptions.particleSpeedMultiplier
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
      particleCount: Math.floor(50 * mobileOptions.particleCountMultiplier),
      particleSize: 3,
      lineDistance: Math.floor(150 * mobileOptions.lineDistanceMultiplier),
      particleSpeed: 0.4 * mobileOptions.particleSpeedMultiplier
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

  // Re-initialize canvas animations on window resize to adjust for mobile/desktop
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      // Only re-initialize if mobile state changed
      const wasMobile = window.innerWidth <= 768;
      setTimeout(() => {
        const isMobileNow = window.innerWidth <= 768;
        if (wasMobile !== isMobileNow) {
          initCanvasAnimations();
        }
      }, 100);
    }, 250);
  });
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
document.querySelectorAll('.track-container').forEach(el => {
  observer.observe(el);
});

// Special observer for contact cards with staggered animation
const contactObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, index * 150);
    }
  });
}, observerOptions);

// Observe contact cards
document.querySelectorAll('.contact-card').forEach((card, index) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'all 0.6s ease';
  contactObserver.observe(card);
});

// Observe contact form section
const formSection = document.querySelector('.contact-form-section');
if (formSection) {
  formSection.style.opacity = '0';
  formSection.style.transform = 'translateY(30px)';
  formSection.style.transition = 'all 0.8s ease';

  const formObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';

          // Animate form fields
          entry.target.querySelectorAll('.form-group').forEach((group, index) => {
            setTimeout(() => {
              group.style.opacity = '1';
              group.style.transform = 'translateX(0)';
            }, index * 100);
          });
        }, 200);
      }
    });
  }, observerOptions);

  formObserver.observe(formSection);

  // Initially hide form groups
  formSection.querySelectorAll('.form-group').forEach(group => {
    group.style.opacity = '0';
    group.style.transform = 'translateX(-20px)';
    group.style.transition = 'all 0.5s ease';
  });
}

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

// Navbar Background on Scroll - REMOVED
// Background color change on scroll has been disabled

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
    // Hover effect is now handled by CSS
  });

  card.addEventListener('mouseleave', function () {
    // Hover effect is now handled by CSS
  });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  // Add form message container
  const formMessage = document.createElement('div');
  formMessage.className = 'form-message';
  contactForm.insertBefore(formMessage, contactForm.firstChild);

  contactForm.addEventListener('submit', function (e) {
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);

    // Basic validation
    let isValid = true;
    const requiredFields = ['firstName', 'lastName', 'email', 'program', 'format'];

    // Clear previous validation states
    document.querySelectorAll('.form-group').forEach(group => {
      group.classList.remove('error', 'success');
    });

    // Validate required fields
    requiredFields.forEach(field => {
      const input = this.querySelector(`[name="${field}"]`);
      const formGroup = input.closest('.form-group');

      if (!input.value.trim()) {
        formGroup.classList.add('error');
        isValid = false;
      } else {
        formGroup.classList.add('success');
      }
    });

    // Email validation
    const emailInput = this.querySelector('[name="email"]');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput.value && !emailRegex.test(emailInput.value)) {
      emailInput.closest('.form-group').classList.add('error');
      isValid = false;
    }

    // Phone validation (optional field)
    const phoneInput = this.querySelector('[name="phone"]');
    if (phoneInput.value) {
      const phoneRegex = /^[\d\s\-\(\)]+$/;
      if (!phoneRegex.test(phoneInput.value)) {
        phoneInput.closest('.form-group').classList.add('error');
        isValid = false;
      }
    }

    if (!isValid) {
      e.preventDefault(); // Only prevent submission if validation fails

      // Show error message
      formMessage.className = 'form-message error';
      formMessage.textContent = 'Please fill in all required fields correctly.';
      formMessage.style.display = 'block';

      // Hide message after 3 seconds
      setTimeout(() => {
        formMessage.style.display = 'none';
      }, 3000);
    } else {
      // Form is valid, let it submit naturally to Formspree
      // Show loading state
      const submitBtn = this.querySelector('.submit-btn');
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    }
  });

  // Real-time validation
  contactForm.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('blur', function () {
      const formGroup = this.closest('.form-group');

      if (this.hasAttribute('required') && !this.value.trim()) {
        formGroup.classList.add('error');
        formGroup.classList.remove('success');
      } else if (this.value.trim()) {
        formGroup.classList.remove('error');
        formGroup.classList.add('success');
      }
    });
  });

  // Phone number formatting
  const phoneInput = contactForm.querySelector('[name="phone"]');
  if (phoneInput) {
    phoneInput.addEventListener('input', function (e) {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length >= 6) {
        value = value.slice(0, 3) + '-' + value.slice(3, 6) + '-' + value.slice(6, 10);
      } else if (value.length >= 3) {
        value = value.slice(0, 3) + '-' + value.slice(3);
      }
      e.target.value = value;
    });
  }
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

// Registration Modal Functionality
const registrationModal = document.getElementById('registrationModal');
const modalClose = document.querySelector('.modal-close');
const registrationForm = document.getElementById('registrationForm');
const registrationMessage = document.getElementById('registrationMessage');

// Open modal when register buttons are clicked
document.querySelectorAll('.track-cta').forEach(button => {
  button.addEventListener('click', function (e) {
    e.preventDefault();
    const program = this.getAttribute('data-program');
    openRegistrationModal(program);
  });
});

function openRegistrationModal(program = '') {
  registrationModal.classList.add('show');
  document.body.style.overflow = 'hidden'; // Prevent background scrolling

  // Pre-select the program if specified
  if (program) {
    const programSelect = document.getElementById('regProgram');
    programSelect.value = program;

    // Lock the program dropdown when opened from specific program track
    programSelect.disabled = true;
    programSelect.style.opacity = '0.7';
    programSelect.style.cursor = 'not-allowed';

    // Add hidden input to ensure program value is sent even when dropdown is disabled
    const form = document.getElementById('registrationForm');
    let hiddenProgramInput = document.getElementById('programHidden');
    if (!hiddenProgramInput) {
      hiddenProgramInput = document.createElement('input');
      hiddenProgramInput.type = 'hidden';
      hiddenProgramInput.name = 'program';
      hiddenProgramInput.id = 'programHidden';
      form.appendChild(hiddenProgramInput);
    }
    hiddenProgramInput.value = program;

    // Set the form action based on the program
    if (program === 'ai-software-engineer') {
      form.action = 'https://formspree.io/f/myzjjdvb';
      // Update modal title
      const modalTitle = document.querySelector('.modal-title');
      modalTitle.textContent = 'Register for Software Engineer Bootcamp';
    } else if (program === 'it-specialist') {
      form.action = 'https://formspree.io/f/meokkldn';
      // Update modal title
      const modalTitle = document.querySelector('.modal-title');
      modalTitle.textContent = 'Register for IT Specialist Bootcamp';
    }
  }

  // Focus on first input field
  setTimeout(() => {
    document.getElementById('regFirstName').focus();
  }, 300);
}

function closeRegistrationModal() {
  registrationModal.classList.remove('show');
  document.body.style.overflow = 'auto'; // Restore scrolling

  // Reset form and messages
  registrationForm.reset();
  registrationMessage.style.display = 'none';
  registrationMessage.className = 'form-message';

  // Remove validation states
  document.querySelectorAll('.registration-form .form-group').forEach(group => {
    group.classList.remove('error', 'success');
  });

  // Reset modal title and unlock program dropdown
  document.querySelector('.modal-title').textContent = 'Register for Program';
  const programSelect = document.getElementById('regProgram');
  programSelect.disabled = false;
  programSelect.style.opacity = '';
  programSelect.style.cursor = '';

  // Remove hidden program input if it exists
  const hiddenProgramInput = document.getElementById('programHidden');
  if (hiddenProgramInput) {
    hiddenProgramInput.remove();
  }
}

// Close modal when X is clicked
modalClose.addEventListener('click', closeRegistrationModal);

// Close modal when clicking outside
registrationModal.addEventListener('click', function (e) {
  if (e.target === registrationModal) {
    closeRegistrationModal();
  }
});

// Close modal with Escape key
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && registrationModal.classList.contains('show')) {
    closeRegistrationModal();
  }
});

// Registration Form Handling
if (registrationForm) {
  registrationForm.addEventListener('submit', function (e) {
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);

    // Basic validation
    let isValid = true;
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'program', 'age', 'education', 'experience', 'format'];

    // Clear previous validation states
    document.querySelectorAll('.registration-form .form-group').forEach(group => {
      group.classList.remove('error', 'success');
    });

    // Validate required fields
    requiredFields.forEach(field => {
      const input = this.querySelector(`[name="${field}"]`);
      const formGroup = input.closest('.form-group');

      if (!input.value.trim()) {
        formGroup.classList.add('error');
        isValid = false;
      } else {
        formGroup.classList.add('success');
      }
    });

    // Email validation
    const emailInput = this.querySelector('[name="email"]');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput.value && !emailRegex.test(emailInput.value)) {
      emailInput.closest('.form-group').classList.add('error');
      isValid = false;
    }

    // Phone validation
    const phoneInput = this.querySelector('[name="phone"]');
    const phoneRegex = /^[\d\s\-\(\)]+$/;
    if (phoneInput.value && !phoneRegex.test(phoneInput.value)) {
      phoneInput.closest('.form-group').classList.add('error');
      isValid = false;
    }

    // Age validation
    const ageInput = this.querySelector('[name="age"]');
    const age = parseInt(ageInput.value);
    if (age < 16 || age > 100) {
      ageInput.closest('.form-group').classList.add('error');
      isValid = false;
    }

    if (!isValid) {
      e.preventDefault(); // Only prevent submission if validation fails

      // Show error message
      registrationMessage.className = 'form-message error';
      registrationMessage.textContent = 'Please fill in all required fields correctly.';
      registrationMessage.style.display = 'block';

      // Hide message after 3 seconds
      setTimeout(() => {
        registrationMessage.style.display = 'none';
      }, 3000);
    } else {
      // Form is valid, let it submit naturally to Formspree
      // Show loading state
      const submitBtn = this.querySelector('.submit-btn');
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing Registration...';
    }
  });

  // Real-time validation for registration form
  registrationForm.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('blur', function () {
      const formGroup = this.closest('.form-group');

      if (this.hasAttribute('required') && !this.value.trim()) {
        formGroup.classList.add('error');
        formGroup.classList.remove('success');
      } else if (this.value.trim()) {
        formGroup.classList.remove('error');
        formGroup.classList.add('success');
      }
    });
  });

  // Phone number formatting for registration form
  const regPhoneInput = registrationForm.querySelector('[name="phone"]');
  if (regPhoneInput) {
    regPhoneInput.addEventListener('input', function (e) {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length >= 6) {
        value = value.slice(0, 3) + '-' + value.slice(3, 6) + '-' + value.slice(6, 10);
      } else if (value.length >= 3) {
        value = value.slice(0, 3) + '-' + value.slice(3);
      }
      e.target.value = value;
    });
  }
}

// Track Navigation Enhancement
document.addEventListener('DOMContentLoaded', function () {
  const trackOptions = document.querySelectorAll('.hero-tracks .track-option');

  trackOptions.forEach(trackOption => {
    trackOption.addEventListener('click', function (e) {
      e.preventDefault();

      const trackType = this.getAttribute('data-track');
      const programsSection = document.getElementById('programs');

      if (programsSection) {
        // Smooth scroll to programs section
        programsSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

        // Highlight the specific track after scrolling
        setTimeout(() => {
          const trackContainer = trackType === 'ai-track'
            ? document.querySelector('.ai-track')
            : document.querySelector('.it-track');

          if (trackContainer) {
            // Remove any existing highlights
            document.querySelectorAll('.track-container').forEach(container => {
              container.classList.remove('track-highlight');
            });

            // Add highlight to the selected track
            trackContainer.classList.add('track-highlight');

            // Remove highlight after 3 seconds
            setTimeout(() => {
              trackContainer.classList.remove('track-highlight');
            }, 3000);
          }
        }, 800); // Wait for scroll to complete
      }
    });
  });
});

// Add highlight CSS styles dynamically
const trackHighlightStyle = document.createElement('style');
trackHighlightStyle.textContent = `
  .track-highlight {
    animation: track-highlight-pulse 3s ease-in-out;
    border: 2px solid var(--accent-orange) !important;
    box-shadow: 0 0 30px rgba(255, 107, 53, 0.4) !important;
  }
  
  @keyframes track-highlight-pulse {
    0%, 100% {
      transform: translateY(-5px) scale(1);
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5), 0 0 30px rgba(255, 107, 53, 0.4);
    }
    50% {
      transform: translateY(-8px) scale(1.02);
      box-shadow: 0 15px 50px rgba(0, 0, 0, 0.6), 0 0 40px rgba(255, 107, 53, 0.6);
    }
  }
`;
document.head.appendChild(trackHighlightStyle);