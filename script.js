const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

menuToggle?.addEventListener('click', () => {
  mainNav.classList.toggle('active');
});

// Image Slider
let currentSlide = 0;
const totalSlides = 4;

function initSlider() {
  const dotsContainer = document.getElementById('sliderDots');
  if (dotsContainer) {
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('button');
      dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
      dot.onclick = () => goToSlide(i);
      dotsContainer.appendChild(dot);
    }
  }
  autoSlide();
}

function slideImage(direction) {
  currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
  updateSlider();
}

function goToSlide(index) {
  currentSlide = index;
  updateSlider();
}

function updateSlider() {
  const track = document.getElementById('sliderTrack');
  if (track) {
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
  }

  const dots = document.querySelectorAll('.slider-dot');
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentSlide);
  });
}

function autoSlide() {
  setInterval(() => {
    slideImage(1);
  }, 5000);
}

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    alert('Thank you! Your message has been sent. We will reach out soon.');
    contactForm.reset();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initSlider();
  initAuthUI();
  initFeatureCards();
});

function initFeatureCards() {
  const cards = document.querySelectorAll('.feature-card');

  cards.forEach(card => {
    // Mouse-tracking for the ::before glow pseudo-element
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mouse-x', `${x}%`);
      card.style.setProperty('--mouse-y', `${y}%`);
    });

    // Click to toggle active state
    card.addEventListener('click', () => {
      const wasActive = card.classList.contains('active');

      // Remove active from all cards
      cards.forEach(c => c.classList.remove('active'));

      // Toggle this card (re-activate if it wasn't active)
      if (!wasActive) {
        card.classList.add('active');
      }
    });
  });
}
