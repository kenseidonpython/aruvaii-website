// Language switching functionality
function changeLanguage(lang) {
  if (!translations[lang]) return;

  // Update all elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  // Update HTML lang attribute
  document.documentElement.lang = lang;

  // Update active button state
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });

  // Save preference
  localStorage.setItem('preferred-language', lang);
}

// Initialize language from saved preference or browser
function initLanguage() {
  const saved = localStorage.getItem('preferred-language');
  const browserLang = navigator.language.substring(0, 2);
  const lang = saved || (['ja', 'en', 'es'].includes(browserLang) ? browserLang : 'ja');
  changeLanguage(lang);
}

// Language button event listeners
document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    changeLanguage(btn.getAttribute('data-lang'));
  });
});

// Service toggle functionality
function toggleService(header) {
  const block = header.closest('.service-block');
  const wrapper = block.querySelector('.service-content-wrapper');
  const icon = header.querySelector('.toggle-icon');

  block.classList.toggle('active');
  wrapper.classList.toggle('open');
  icon.textContent = wrapper.classList.contains('open') ? '−' : '+';
}

// Scroll fade-in animation
function handleFadeIn() {
  const elements = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => observer.observe(el));
}

// Set current year in footer
function setYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initLanguage();
  handleFadeIn();
  setYear();
});
