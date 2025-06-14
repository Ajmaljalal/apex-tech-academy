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

// Canvas Background Animations
function initCanvasAnimations() {
  // AI Canvas - Flowing Wave Pattern
  const aiCanvas = document.getElementById('aiCanvas');
  const aiCtx = aiCanvas.getContext('2d');

  function resizeCanvas() {
    aiCanvas.width = aiCanvas.offsetWidth;
    aiCanvas.height = aiCanvas.offsetHeight;
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  let waveOffset = 0;

  function drawAIBackground() {
    aiCtx.clearRect(0, 0, aiCanvas.width, aiCanvas.height);

    // Draw flowing waves
    for (let i = 0; i < 5; i++) {
      aiCtx.beginPath();
      aiCtx.strokeStyle = `rgba(255, 255, 255, ${0.05 - i * 0.01})`;
      aiCtx.lineWidth = 2;

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

  // IT Canvas - Hexagonal Pattern
  const itCanvas = document.getElementById('itCanvas');
  const itCtx = itCanvas.getContext('2d');

  function resizeITCanvas() {
    itCanvas.width = itCanvas.offsetWidth;
    itCanvas.height = itCanvas.offsetHeight;
  }

  resizeITCanvas();
  window.addEventListener('resize', resizeITCanvas);

  const hexagons = [];
  const hexSize = 40;

  // Create hexagon grid
  for (let x = 0; x < itCanvas.width + hexSize * 2; x += hexSize * 3) {
    for (let y = 0; y < itCanvas.height + hexSize * 2; y += hexSize * 2) {
      hexagons.push({
        x: x + (Math.floor(y / (hexSize * 2)) % 2) * (hexSize * 1.5),
        y: y,
        alpha: Math.random() * 0.5,
        alphaDirection: Math.random() > 0.5 ? 1 : -1,
        size: hexSize
      });
    }
  }

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

  function drawITBackground() {
    itCtx.clearRect(0, 0, itCanvas.width, itCanvas.height);

    hexagons.forEach(hex => {
      drawHexagon(itCtx, hex.x, hex.y, hex.size, hex.alpha);

      // Animate alpha
      hex.alpha += hex.alphaDirection * 0.005;
      if (hex.alpha > 0.3 || hex.alpha < 0.02) {
        hex.alphaDirection *= -1;
      }
    });

    requestAnimationFrame(drawITBackground);
  }

  drawITBackground();
}

// Initialize canvas animations when DOM is ready
document.addEventListener('DOMContentLoaded', initCanvasAnimations);

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