// Intro splash + show main page
window.addEventListener("load", () => {
  const intro = document.getElementById("intro");
  const page = document.querySelector(".page-wrapper");

  setTimeout(() => {
    if (intro) intro.classList.add("intro-hidden");
    if (page) page.classList.add("page-visible");
  }, 1800);
});

// Header scroll behavior
const header = document.getElementById("mainHeader");

window.addEventListener("scroll", () => {
  if (!header) return;
  if (window.scrollY > 80) {
    header.classList.add("header-scrolled");
  } else {
    header.classList.remove("header-scrolled");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // Footer year
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Hero particles
  createHeroParticles();

  // Slider
  initGameSlider();

  // Mouse-follow glow
  initCursorGlow();
});

// Create floating particles in hero
function createHeroParticles() {
  const container = document.getElementById("heroParticles");
  if (!container) return;

  const count = 18;
  for (let i = 0; i < count; i++) {
    const p = document.createElement("span");
    p.className = "particle";
    const size = 3 + Math.random() * 5;
    p.style.width = size + "px";
    p.style.height = size + "px";
    p.style.left = Math.random() * 100 + "%";
    p.style.top = 20 + Math.random() * 60 + "%";

    const duration = 12 + Math.random() * 10;
    const delay = Math.random() * -duration;
    p.style.animationDuration = duration + "s";
    p.style.animationDelay = delay + "s";

    container.appendChild(p);
  }
}

// Game screenshots slider
function initGameSlider() {
  const track = document.getElementById("gameSlider");
  if (!track) return;

  const slides = track.querySelectorAll(".slide");
  if (!slides.length) return;

  let index = 0;

  function setIndex(newIndex) {
    index = (newIndex + slides.length) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;
  }

  const prevBtn = document.querySelector("[data-slider='prev']");
  const nextBtn = document.querySelector("[data-slider='next']");

  if (prevBtn) {
    prevBtn.addEventListener("click", () => setIndex(index - 1));
  }
  if (nextBtn) {
    nextBtn.addEventListener("click", () => setIndex(index + 1));
  }

  // auto-rotate
  setInterval(() => setIndex(index + 1), 7000);
}

// Mouse-follow light glow within hero
function initCursorGlow() {
  const glow = document.getElementById("cursorGlow");
  const hero = document.querySelector(".hero");
  if (!glow || !hero) return;

  document.addEventListener("mousemove", (e) => {
    const rect = hero.getBoundingClientRect();
    const insideHero =
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom;

    if (!insideHero) {
      glow.style.opacity = "0";
      return;
    }

    glow.style.opacity = "1";
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
  });
}
