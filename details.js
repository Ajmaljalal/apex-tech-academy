// Mobile Detection for Detail Pages
function isMobileDetail() {
  return window.innerWidth <= 768;
}

// Canvas Background Animation for Detail Pages
function initDetailCanvas() {
  const canvas = document.getElementById('bgCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];

  // Mobile optimization settings
  const isMobile = isMobileDetail();
  const particleCount = isMobile ? 50 : 100; // Reduce particles on mobile
  const lineDistance = isMobile ? 80 : 100; // Reduce connection distance on mobile
  const speedMultiplier = isMobile ? 0.7 : 1; // Slower movement on mobile

  // Set canvas size
  function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Particle class
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.5 * speedMultiplier;
      this.vy = (Math.random() - 0.5) * 0.5 * speedMultiplier;
      this.radius = Math.random() * 2 + 1;
      this.opacity = Math.random() * 0.5 + 0.3;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      // Wrap around edges
      if (this.x < 0) this.x = canvas.width;
      if (this.x > canvas.width) this.x = 0;
      if (this.y < 0) this.y = canvas.height;
      if (this.y > canvas.height) this.y = 0;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
      ctx.fill();
    }
  }

  // Create particles with mobile optimization
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  // Connect particles with lines
  function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < lineDistance) {
          const opacity = (1 - distance / lineDistance) * (isMobile ? 0.2 : 0.3);
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.stroke();
        }
      }
    }
  }

  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw particles
    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });

    // Connect nearby particles
    connectParticles();

    requestAnimationFrame(animate);
  }

  animate();
}

// Initialize canvas when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initDetailCanvas();

  // Re-initialize canvas on window resize to adjust for mobile/desktop
  let detailResizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(detailResizeTimeout);
    detailResizeTimeout = setTimeout(() => {
      // Only re-initialize if mobile state changed
      const wasMobile = window.innerWidth <= 768;
      setTimeout(() => {
        const isMobileNow = window.innerWidth <= 768;
        if (wasMobile !== isMobileNow) {
          initDetailCanvas();
        }
      }, 100);
    }, 250);
  });

  // Add scroll animations for modules
  const modules = document.querySelectorAll('.module');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 100);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  modules.forEach(module => {
    module.style.opacity = '0';
    module.style.transform = 'translateY(30px)';
    module.style.transition = 'all 0.6s ease';
    observer.observe(module);
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));

      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });


});

// Add hover effect to highlight cards
document.querySelectorAll('.highlight-card').forEach(card => {
  card.addEventListener('mouseenter', function () {
    this.style.transform = 'translateY(-10px) scale(1.02)';
  });

  card.addEventListener('mouseleave', function () {
    this.style.transform = 'translateY(0) scale(1)';
  });
});

// Add click animation to enroll button and open modal
document.querySelectorAll('.enroll-btn').forEach(button => {
  button.addEventListener('click', function (e) {
    e.preventDefault();

    // Create ripple effect
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

    // Open registration modal
    const program = this.getAttribute('data-program');
    if (program) {
      openRegistrationModal(program);
    }
  });
});

// Registration Modal Functionality
const registrationModal = document.getElementById('registrationModal');
const modalClose = document.querySelector('.modal-close');
const registrationForm = document.getElementById('registrationForm');
const registrationMessage = document.getElementById('registrationMessage');

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
    } else if (program === 'it-specialist') {
      form.action = 'https://formspree.io/f/meokkldn';
    } else if (program === 'ai-automation') {
      form.action = 'https://formspree.io/f/meokkldn';
    }

    // Update modal title based on program
    const modalTitle = document.querySelector('.modal-title');
    if (program === 'ai-software-engineer') {
      modalTitle.textContent = 'Register for Software Engineer Bootcamp';
    } else if (program === 'it-specialist') {
      modalTitle.textContent = 'Register for IT Specialist Bootcamp';
    } else if (program === 'ai-automation') {
      modalTitle.textContent = 'Register for AI Automation Expert Program';
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
if (modalClose) {
  modalClose.addEventListener('click', closeRegistrationModal);
}

// Close modal when clicking outside
if (registrationModal) {
  registrationModal.addEventListener('click', function (e) {
    if (e.target === registrationModal) {
      closeRegistrationModal();
    }
  });
}

// Close modal with Escape key
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && registrationModal && registrationModal.classList.contains('show')) {
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

// Add ripple effect styles if not already present
if (!document.querySelector('#ripple-styles')) {
  const style = document.createElement('style');
  style.id = 'ripple-styles';
  style.textContent = `
    .enroll-btn, .contact-btn {
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
} 