// Smooth scrolling para navegación
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Animaciones al hacer scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

// Observar elementos con clase fade-in
document.querySelectorAll(".fade-in").forEach((el) => {
  observer.observe(el);
});

// Efecto parallax suave en hero
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const parallax = document.querySelector(".hero::before");
  const speed = scrolled * 0.5;
});

// Animación de typing para el código
function typeWriter(element, text, speed = 50) {
  let i = 0;
  element.innerHTML = "";

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

// Navbar transparencia al hacer scroll
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(15, 15, 35, 0.98)";
  } else {
    navbar.style.background = "rgba(15, 15, 35, 0.95)";
  }
});

// Formulario de contacto
document
  .querySelector(".contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    // Simular envío
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    submitBtn.textContent = "Enviando...";
    submitBtn.style.background = "var(--gradient-secondary)";

    setTimeout(() => {
      submitBtn.textContent = "¡Mensaje Enviado!";
      submitBtn.style.background = "#10b981";

      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.background = "var(--gradient-primary)";
        this.reset();
      }, 2000);
    }, 1500);
  });

// Animación de entrada para las tarjetas de proyecto
const projectCards = document.querySelectorAll(".project-card");
projectCards.forEach((card, index) => {
  card.style.animationDelay = `${index * 0.2}s`;
});

// Efecto de hover mejorado para botones
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-3px) scale(1.02)";
  });

  btn.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// Contador animado para estadísticas (si se desea agregar)
function animateCounter(element, target) {
  let current = 0;
  const increment = target / 100;
  const timer = setInterval(() => {
    current += increment;
    element.textContent = Math.floor(current);
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    }
  }, 20);
}

// Particles effect para el hero (opcional - versión ligera)
function createParticle() {
  const particle = document.createElement("div");
  particle.style.position = "absolute";
  particle.style.width = "2px";
  particle.style.height = "2px";
  particle.style.background = "rgba(99, 102, 241, 0.5)";
  particle.style.borderRadius = "50%";
  particle.style.pointerEvents = "none";
  particle.style.left = Math.random() * 100 + "%";
  particle.style.top = "100%";
  particle.style.animation = "float-up 8s linear forwards";

  document.querySelector(".hero").appendChild(particle);

  setTimeout(() => {
    particle.remove();
  }, 8000);
}

// Crear partículas ocasionalmente
setInterval(createParticle, 2000);

// Estilo adicional para las partículas
const style = document.createElement("style");
style.textContent = `
            @keyframes float-up {
                to {
                    transform: translateY(-100vh) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
document.head.appendChild(style);

// Lazy loading para imágenes (si se agregan)
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });
}

// Inicializar tooltips para iconos de tecnología
document.querySelectorAll(".tech-tag").forEach((tag) => {
  tag.addEventListener("mouseenter", function () {
    this.style.transform = "scale(1.1)";
    this.style.background = "rgba(99, 102, 241, 0.3)";
  });

  tag.addEventListener("mouseleave", function () {
    this.style.transform = "scale(1)";
    this.style.background = "rgba(99, 102, 241, 0.2)";
  });
});

// Efecto de escritura para el hero
window.addEventListener("load", () => {
  setTimeout(() => {
    const codeLines = document.querySelectorAll(".code-line");
    codeLines.forEach((line, index) => {
      setTimeout(() => {
        line.style.opacity = "1";
        line.style.animation = "fadeInUp 0.5s ease forwards";
      }, index * 200);
    });
  }, 1000);
});

// Performance optimization: Throttle scroll events
let ticking = false;
function updateOnScroll() {
  // Navbar background update
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(15, 15, 35, 0.98)";
  } else {
    navbar.style.background = "rgba(15, 15, 35, 0.95)";
  }
  ticking = false;
}

window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(updateOnScroll);
    ticking = true;
  }
});

console.log("🚀 Portafolio cargado exitosamente!");
