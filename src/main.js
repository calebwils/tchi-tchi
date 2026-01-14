// Main entry point
console.log('Tchi Tchi Africa - Website initialized');

// Simple scroll effect for navbar
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.style.padding = '0.5rem 0';
    navbar.style.background = 'rgba(255, 255, 255, 0.98)';
  } else {
    navbar.style.padding = '1rem 0';
    navbar.style.background = 'rgba(255, 255, 255, 0.95)';
  }
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close menu when clicking a link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
}

// E-commerce Filtering Logic
function initFilters() {
  const container = document.querySelector('.collection-layout');
  if (!container) return;

  const cards = document.querySelectorAll('.product-card');
  const categoryInputs = document.querySelectorAll('input[name="category"]');
  const genderInputs = document.querySelectorAll('input[name="gender"]');
  const priceSlider = document.getElementById('price-slider');
  const priceValueLabel = document.getElementById('price-value');
  const resetBtn = document.getElementById('reset-filters');

  function updateFilters() {
    const selectedCategories = Array.from(categoryInputs)
      .filter(i => i.checked)
      .map(i => i.value);

    const selectedGenders = Array.from(genderInputs)
      .filter(i => i.checked)
      .map(i => i.value);

    const maxPrice = parseInt(priceSlider.value);
    priceValueLabel.textContent = maxPrice.toLocaleString();

    cards.forEach(card => {
      const category = card.dataset.category;
      const gender = card.dataset.gender;
      const price = parseInt(card.dataset.price);

      const categoryMatch = selectedCategories.includes(category);
      const genderMatch = selectedGenders.includes(gender);
      const priceMatch = price <= maxPrice;

      if (categoryMatch && genderMatch && priceMatch) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  }

  categoryInputs.forEach(i => i.addEventListener('change', updateFilters));
  genderInputs.forEach(i => i.addEventListener('change', updateFilters));
  priceSlider.addEventListener('input', updateFilters);

  resetBtn.addEventListener('click', () => {
    categoryInputs.forEach(i => i.checked = true);
    genderInputs.forEach(i => i.checked = true);
    priceSlider.value = 300000;
    updateFilters();
  });
}

// Hero Slider Logic
function initHeroSlider() {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  if (slides.length === 0) return;

  let currentSlide = 0;
  let slideInterval;

  function showSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));

    slides[index].classList.add('active');
    dots[index].classList.add('active');
    currentSlide = index;
  }

  function nextSlide() {
    let next = (currentSlide + 1) % slides.length;
    showSlide(next);
  }

  function startInterval() {
    slideInterval = setInterval(nextSlide, 5000);
  }

  function resetInterval() {
    clearInterval(slideInterval);
    startInterval();
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const index = parseInt(dot.dataset.index);
      showSlide(index);
      resetInterval();
    });
  });

  startInterval();
}

// Authentication UI Logic
function initAuth() {
  const tabs = document.querySelectorAll('.auth-tab');
  const forms = document.querySelectorAll('.auth-form-container');
  if (tabs.length === 0) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      forms.forEach(f => f.classList.remove('active'));

      tab.classList.add('active');
      const target = tab.dataset.tab;
      document.getElementById(`${target}-form`).classList.add('active');
    });
  });

  // Mock Login
  const loginForm = document.getElementById('login-form-element');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email').value;
      // Simulate success
      localStorage.setItem('currentUser', JSON.stringify({ email: email, name: email.split('@')[0] }));
      alert('Connexion réussie !');
      window.location.href = '/index.html';
    });
  }

  // Mock Register
  const registerForm = document.getElementById('register-form-element');
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('reg-name').value;
      const email = document.getElementById('reg-email').value;
      localStorage.setItem('currentUser', JSON.stringify({ email: email, name: name }));
      alert('Compte créé avec succès !');
      window.location.href = '/index.html';
    });
  }
}

// Global Auth State UI
function updateAuthUI() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const navLinks = document.querySelector('.nav-links');
  if (!navLinks) return;

  // Cleanup existing auth links if any
  const existingAuthBtn = document.querySelector('.auth-btn-nav');
  if (existingAuthBtn) existingAuthBtn.remove();

  if (currentUser) {
    const userLi = document.createElement('li');
    userLi.className = 'auth-btn-nav';
    userLi.innerHTML = `
      <div class="user-nav">
        <span class="desktop-only" style="font-weight: 500;">Bonjour, ${currentUser.name}</span>
        <a href="#" id="logout-btn" class="cta-btn btn-outline" style="padding: 0.5rem 1rem;">Déconnexion</a>
      </div>
    `;
    navLinks.appendChild(userLi);

    document.getElementById('logout-btn').addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('currentUser');
      window.location.reload();
    });
  } else {
    const loginLi = document.createElement('li');
    loginLi.className = 'auth-btn-nav';
    loginLi.innerHTML = `<a href="/auth.html" class="cta-btn"><i class="fas fa-user-circle" style="color: white;"></i> <span style="color: white;">Connectez Vous</span></a>`;
    navLinks.appendChild(loginLi);
  }
}


// Initialize components
document.addEventListener('DOMContentLoaded', () => {
  initFilters();
  initHeroSlider();
  initAuth();
  updateAuthUI();
});
