/* ===== TEMA CLARO/OSCURO ===== */
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

function getTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    return savedTheme;
  }
  return prefersDarkScheme.matches ? 'dark' : 'light';
}

function setTheme(theme) {
  if (theme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
  localStorage.setItem('theme', theme);
}

let currentTheme = getTheme();
setTheme(currentTheme);

const themeToggle = document.querySelector('.theme-toggle');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(currentTheme);
  });
}

prefersDarkScheme.addEventListener('change', (e) => {
  if (!localStorage.getItem('theme')) {
    currentTheme = e.matches ? 'dark' : 'light';
    setTheme(currentTheme);
  }
});

/* ===== BARRA DE PROGRESO AL HACER SCROLL ===== */
window.addEventListener('scroll', function() {
  const scrollProgress = document.querySelector('.scroll-progress');
  if (scrollProgress) {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / scrollHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
  }
});

/* ===== NAVBAR CON EFECTO AL HACER SCROLL ===== */
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
});

/* ===== ANIMACIONES AL APARECER EN PANTALLA ===== */
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
    }
  });
}, observerOptions);

document.querySelectorAll('.reveal-section').forEach(section => {
  observer.observe(section);
});

const workItems = document.querySelectorAll('.work-item');
workItems.forEach((item, index) => {
  item.style.transitionDelay = `${index * 0.1}s`;
  observer.observe(item);
});

/* ===== SMOOTH SCROLL PARA ENLACES ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    
    if (href === '#_') {
      e.preventDefault();
      closeLightbox();
      return;
    }
    
    if (href.startsWith('#img')) return;
    
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      // Para el hero (#home), ir al top absoluto
      if (href === '#home') {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      } else {
        // Para otras secciones, usar scrollIntoView
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

/* ===== CERRAR LIGHTBOX (VISOR DE IMÁGENES) ===== */
function closeLightbox() {
  window.location.hash = '#_';
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    if (window.location.hash.startsWith('#img')) {
      closeLightbox();
    }
  }
});

document.querySelectorAll('.close-btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    closeLightbox();
  });
});

document.querySelectorAll('.close-area').forEach(area => {
  area.addEventListener('click', function(e) {
    e.preventDefault();
    closeLightbox();
  });
});

/* ===== COPIAR EMAIL AL HACER CLICK ===== */
const emailText = document.querySelector('.email-text');
if (emailText) {
  emailText.addEventListener('click', function() {
    const email = this.textContent;
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).then(() => {
        const originalText = this.textContent;
        this.textContent = 'Email copied!';
        this.style.color = 'var(--accent-color)';
        
        setTimeout(() => {
          this.textContent = originalText;
          this.style.color = '';
        }, 2000);
      }).catch(err => {
        console.log('Error al copiar:', err);
      });
    }
  });
}

/* ===== OPTIMIZACIÓN DE VIDEOS ===== */
const videos = document.querySelectorAll('video');
if (videos.length > 0) {
  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.play().catch(err => {
          console.log('Autoplay prevented:', err);
        });
      } else {
        entry.target.pause();
      }
    });
  }, {
    threshold: 0.5
  });

  videos.forEach(video => {
    videoObserver.observe(video);
  });
}

/* ===== EFECTO TYPEWRITER (TEXTO QUE SE ESCRIBE SOLO) ===== */
/* Modifica aquí las frases que aparecen en el hero */
const textElement = document.getElementById('typewriter');
const phrases = ["Hi, my name is José Manuel", "But people call me Manu :)"];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function type() {
  const currentPhrase = phrases[phraseIndex];
  
  if (isDeleting) {
    textElement.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
    typeSpeed = 50; 
  } else {
    textElement.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
    typeSpeed = 100; 
  }

  if (!isDeleting && charIndex === currentPhrase.length) {
    isDeleting = true;
    typeSpeed = 2500;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typeSpeed = 500; 
  }

  setTimeout(type, typeSpeed);
}

document.addEventListener('DOMContentLoaded', type);

/* ===== EFECTO FADE OUT AL HACER SCROLL EN EL HERO ===== */
/* Modifica aquí la velocidad del fade (número 500) */
window.addEventListener('scroll', function() {
  const hero = document.querySelector('.hero');
  const scrollPosition = window.scrollY;
  
  if (hero) {
    let opacityValue = 1 - (scrollPosition / 500);
    hero.style.opacity = opacityValue;
    hero.style.transform = `translateY(${scrollPosition * 0.3}px)`;
  }
});

/* ===== MENSAJE EN CONSOLA ===== */
console.log('%c🎨 Portfolio by MANU', 'color: #4a86e8; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with passion ✨', 'color: #888; font-size: 14px;');
