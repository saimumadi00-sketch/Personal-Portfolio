/**
 * main.js — Lab 4 JavaScript Enhancement
 * Portfolio of Md Saimum Al Mahmud | North South University
 *
 * Features:
 *  1. Dark / Light mode toggle (persisted via localStorage)
 *  2. Dynamic typewriter text on the hero heading
 *  3. Navbar scroll shadow
 *  4. Show / Hide sections
 *  5. Toast / Alert system
 *  6. Form validation with real-time feedback
 *  7. Live character counter on textarea
 *  8. Animated skill progress bars (IntersectionObserver)
 *  9. Back-to-top button (add/remove element)
 * 10. Reading-time badge dynamically added to cards
 */

/* ══════════════════════════════════════════════
   1. DARK / LIGHT MODE
   ══════════════════════════════════════════════ */
(function initTheme() {
  const saved = localStorage.getItem('theme') || 'light';
  applyTheme(saved);
})();

function applyTheme(theme) {
  const html = document.documentElement;
  const body = document.body;

  if (theme === 'dark') {
    html.setAttribute('data-bs-theme', 'dark');
    body.classList.add('bg-dark-mode');
    localStorage.setItem('theme', 'dark');
  } else {
    html.setAttribute('data-bs-theme', 'light');
    body.classList.remove('bg-dark-mode');
    localStorage.setItem('theme', 'light');
  }

  // Update toggle button label/icon if it exists on this page
  const btn = document.getElementById('themeToggleBtn');
  if (btn) {
    btn.innerHTML = theme === 'dark'
      ? '<span>&#9728;</span> Light Mode'
      : '<span>&#9790;</span> Dark Mode';
    btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }
}

function toggleTheme() {
  const current = localStorage.getItem('theme') || 'light';
  applyTheme(current === 'dark' ? 'light' : 'dark');
}

/* ══════════════════════════════════════════════
   2. NAVBAR SCROLL SHADOW
   ══════════════════════════════════════════════ */
function initNavbarScroll() {
  const nav = document.getElementById('mainNav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('nav-scrolled', window.scrollY > 30);
  });
}

/* ══════════════════════════════════════════════
   3. TYPEWRITER EFFECT  (index.html hero)
   ══════════════════════════════════════════════ */
function initTypewriter() {
  const el = document.getElementById('typewriterText');
  if (!el) return;

  const phrases = [
    'Computer Science Student',
    'Aspiring Web Developer',
    'Frontend Enthusiast',
    'Problem Solver',
    'NSU — Final Year',
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const TYPING_SPEED  = 70;
  const DELETING_SPEED = 40;
  const PAUSE_END     = 1800;
  const PAUSE_START   = 300;

  function type() {
    const current = phrases[phraseIndex];
    if (isDeleting) {
      el.textContent = current.substring(0, charIndex - 1);
      charIndex--;
    } else {
      el.textContent = current.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? DELETING_SPEED : TYPING_SPEED;

    if (!isDeleting && charIndex === current.length) {
      delay = PAUSE_END;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = PAUSE_START;
    }

    setTimeout(type, delay);
  }

  type();
}

/* ══════════════════════════════════════════════
   4. TOAST / ALERT SYSTEM
   ══════════════════════════════════════════════ */
function showToast(message, type = 'info') {
  // Create container if absent
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.style.cssText = 'position:fixed;top:80px;right:1rem;z-index:9999;display:flex;flex-direction:column;gap:0.5rem;';
    document.body.appendChild(container);
  }

  const icons = { success: '✅', danger: '❌', warning: '⚠️', info: 'ℹ️' };
  const toast = document.createElement('div');
  toast.className = `alert alert-${type} alert-dismissible shadow d-flex align-items-center gap-2 mb-0`;
  toast.style.cssText = 'min-width:260px;max-width:360px;opacity:0;transform:translateX(30px);transition:opacity 0.3s ease,transform 0.3s ease;';
  toast.innerHTML = `<span>${icons[type] || 'ℹ️'}</span><span>${message}</span>
    <button type="button" class="btn-close ms-auto" aria-label="Close"></button>`;

  toast.querySelector('.btn-close').addEventListener('click', () => removeToast(toast));
  container.appendChild(toast);

  // Animate in
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(0)';
    });
  });

  // Auto-remove after 4s
  setTimeout(() => removeToast(toast), 4000);
}

function removeToast(toast) {
  toast.style.opacity = '0';
  toast.style.transform = 'translateX(30px)';
  setTimeout(() => toast.remove(), 320);
}

/* ══════════════════════════════════════════════
   5. SHOW / HIDE SECTIONS
   ══════════════════════════════════════════════ */
function initToggleSections() {
  document.querySelectorAll('[data-toggle-section]').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-toggle-section');
      const section  = document.getElementById(targetId);
      if (!section) return;

      const isHidden = section.style.display === 'none' || section.classList.contains('d-none');

      if (isHidden) {
        section.style.display = '';
        section.classList.remove('d-none');
        section.style.opacity = '0';
        section.style.transform = 'translateY(12px)';
        section.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
          });
        });
        btn.textContent = btn.getAttribute('data-hide-label') || 'Hide';
      } else {
        section.style.opacity = '0';
        section.style.transform = 'translateY(12px)';
        setTimeout(() => {
          section.classList.add('d-none');
          section.style.display = 'none';
        }, 340);
        btn.textContent = btn.getAttribute('data-show-label') || 'Show';
      }
    });
  });
}

/* ══════════════════════════════════════════════
   6. CONTACT FORM VALIDATION + CHAR COUNTER
   ══════════════════════════════════════════════ */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  // Real-time field validation
  form.querySelectorAll('input[required], textarea[required]').forEach(field => {
    field.addEventListener('input', () => validateField(field));
    field.addEventListener('blur',  () => validateField(field));
  });

  // Character counter on textarea
  const textarea = form.querySelector('textarea');
  if (textarea) {
    const counter = document.createElement('small');
    counter.className = 'text-muted d-block text-end mt-1';
    counter.id = 'charCounter';
    counter.textContent = '0 / 500 characters';
    textarea.parentNode.insertBefore(counter, textarea.nextSibling);

    textarea.addEventListener('input', () => {
      const len = textarea.value.length;
      counter.textContent = `${len} / 500 characters`;
      counter.classList.toggle('text-danger', len > 500);
    });
  }

  // Submit handler
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    let valid = true;
    form.querySelectorAll('input[required], textarea[required]').forEach(field => {
      if (!validateField(field)) valid = false;
    });

    const consent = form.querySelector('#consent');
    if (consent && !consent.checked) {
      consent.classList.add('is-invalid');
      valid = false;
    } else if (consent) {
      consent.classList.remove('is-invalid');
    }

    if (!valid) {
      shakeElement(form.querySelector('.card') || form);
      showToast('Please fix the errors before submitting.', 'danger');
      return;
    }

    // Success
    form.reset();
    form.classList.remove('was-validated');
    document.getElementById('charCounter') && (document.getElementById('charCounter').textContent = '0 / 500 characters');

    const successAlert = document.getElementById('successAlert');
    if (successAlert) {
      successAlert.classList.remove('d-none');
      successAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => successAlert.classList.add('d-none'), 5000);
    }
    showToast('Message sent successfully! I\'ll get back to you soon.', 'success');
  });
}

function validateField(field) {
  const value = field.value.trim();
  let valid = true;

  if (field.required && value === '') {
    valid = false;
  } else if (field.type === 'email' && value !== '') {
    valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  field.classList.toggle('is-valid',   valid && value !== '');
  field.classList.toggle('is-invalid', !valid);
  return valid;
}

/* ══════════════════════════════════════════════
   7. ANIMATED SKILL PROGRESS BARS
   ══════════════════════════════════════════════ */
function initProgressBars() {
  const bars = document.querySelectorAll('.progress-bar[data-width], .progress-bar[style*="--target-width"]');
  if (!bars.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        // Support both data-width and CSS var approaches
        const target = bar.dataset.width
          || getComputedStyle(bar).getPropertyValue('--target-width').trim();
        if (target) {
          bar.style.transition = 'width 1.1s cubic-bezier(0.4, 0, 0.2, 1)';
          bar.style.width = target;
        }
        bar.classList.add('animated');
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(bar => {
    bar.style.width = '0';
    observer.observe(bar);
  });
}

/* ══════════════════════════════════════════════
   8. BACK-TO-TOP BUTTON  (add / remove element)
   ══════════════════════════════════════════════ */
function initBackToTop() {
  // Create the button and inject it
  const btn = document.createElement('button');
  btn.id = 'backToTopBtn';
  btn.setAttribute('aria-label', 'Back to top');
  btn.innerHTML = '&#8679;';
  btn.style.cssText = [
    'position:fixed', 'bottom:1.5rem', 'right:1.5rem',
    'width:44px', 'height:44px', 'border-radius:50%',
    'border:none', 'background:#0d6efd', 'color:#fff',
    'font-size:1.4rem', 'line-height:1', 'cursor:pointer',
    'box-shadow:0 4px 14px rgba(0,0,0,0.2)',
    'opacity:0', 'transform:translateY(10px)',
    'transition:opacity 0.3s ease, transform 0.3s ease',
    'z-index:1050',
  ].join(';');

  document.body.appendChild(btn);

  // Show/hide based on scroll
  window.addEventListener('scroll', () => {
    const show = window.scrollY > 300;
    btn.style.opacity = show ? '1' : '0';
    btn.style.transform = show ? 'translateY(0)' : 'translateY(10px)';
    btn.style.pointerEvents = show ? 'auto' : 'none';
  });

  // Scroll to top on click
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('Back to top!', 'info');
  });
}

/* ══════════════════════════════════════════════
   9. DYNAMIC "READING TIME" BADGES ON CARDS  (add elements)
   ══════════════════════════════════════════════ */
function injectReadingTimeBadges() {
  document.querySelectorAll('.card-body p').forEach(p => {
    const words = p.textContent.trim().split(/\s+/).length;
    const secs  = Math.max(5, Math.round((words / 200) * 60));
    const label = secs < 60 ? `${secs}s read` : `${Math.round(secs/60)}m read`;

    const badge = document.createElement('span');
    badge.className = 'badge text-bg-light border text-muted ms-1 align-middle';
    badge.style.fontSize = '0.65rem';
    badge.textContent = label;

    // Only add to the first <p> inside a card that doesn't already have one
    const card = p.closest('.card');
    if (card && !card.querySelector('.read-badge')) {
      badge.classList.add('read-badge');
      p.appendChild(badge);
    }
  });
}

/* ══════════════════════════════════════════════
   10. DYNAMIC GREETING  (dynamic text update)
   ══════════════════════════════════════════════ */
function injectGreeting() {
  const el = document.getElementById('dynamicGreeting');
  if (!el) return;

  const hour = new Date().getHours();
  let greeting, emoji;
  if      (hour < 5)  { greeting = 'Good night';    emoji = '🌙'; }
  else if (hour < 12) { greeting = 'Good morning';  emoji = '☀️'; }
  else if (hour < 17) { greeting = 'Good afternoon';emoji = '🌤️'; }
  else if (hour < 21) { greeting = 'Good evening';  emoji = '🌇'; }
  else                { greeting = 'Good night';    emoji = '🌙'; }

  el.textContent = `${emoji} ${greeting}, visitor!`;
}

/* ══════════════════════════════════════════════
   11. SHAKE HELPER
   ══════════════════════════════════════════════ */
function shakeElement(el) {
  if (!el) return;
  el.style.animation = 'none';
  el.offsetHeight; // reflow
  el.style.animation = 'shake 0.4s ease';
  setTimeout(() => { el.style.animation = ''; }, 450);
}

/* ══════════════════════════════════════════════
   12. INJECT THEME TOGGLE BUTTON INTO NAVBAR
   ══════════════════════════════════════════════ */
function injectThemeToggle() {
  const navList = document.querySelector('#mainNavbar .navbar-nav');
  if (!navList || document.getElementById('themeToggleBtn')) return;

  const li = document.createElement('li');
  li.className = 'nav-item ms-lg-2 mt-2 mt-lg-0';

  const btn = document.createElement('button');
  btn.id = 'themeToggleBtn';
  btn.className = 'btn btn-sm btn-outline-light';
  btn.style.cssText = 'font-size:0.8rem;padding:0.3rem 0.75rem;white-space:nowrap;';
  btn.addEventListener('click', () => {
    toggleTheme();
    showToast(
      localStorage.getItem('theme') === 'dark' ? 'Dark mode enabled 🌙' : 'Light mode enabled ☀️',
      'info'
    );
  });

  li.appendChild(btn);
  navList.appendChild(li);

  // Set correct label immediately
  applyTheme(localStorage.getItem('theme') || 'light');
}

/* ══════════════════════════════════════════════
   DARK MODE EXTRA STYLES  (injected once)
   ══════════════════════════════════════════════ */
(function injectDarkStyles() {
  if (document.getElementById('darkModeStyles')) return;
  const style = document.createElement('style');
  style.id = 'darkModeStyles';
  style.textContent = `
    /* Shake keyframe */
    @keyframes shake {
      0%,100% { transform: translateX(0); }
      20%,60%  { transform: translateX(-6px); }
      40%,80%  { transform: translateX(6px); }
    }

    /* Dark mode body override */
    [data-bs-theme="dark"] body {
      background: linear-gradient(180deg,#1a1d23 0%,#0f1117 100%) !important;
    }
    [data-bs-theme="dark"] .bg-dark-mode {
      background: linear-gradient(180deg,#1a1d23 0%,#0f1117 100%) !important;
    }
    [data-bs-theme="dark"] .nav-link::after { background: #6ea8fe; }

    /* Typewriter cursor */
    #typewriterText::after {
      content: '|';
      display: inline-block;
      margin-left: 2px;
      animation: blink 0.75s step-end infinite;
      color: #0d6efd;
    }
    @keyframes blink {
      0%,100% { opacity: 1; }
      50%      { opacity: 0; }
    }
  `;
  document.head.appendChild(style);
})();

/* ══════════════════════════════════════════════
   INIT — runs after DOM is ready
   ══════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  injectThemeToggle();
  initNavbarScroll();
  initTypewriter();
  initToggleSections();
  initContactForm();
  initProgressBars();
  initBackToTop();
  injectReadingTimeBadges();
  injectGreeting();
});
