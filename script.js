/* ======================================================
   Intro splash + show main page
   ====================================================== */
window.addEventListener("load", () => {
  const intro = document.getElementById("intro");
  const page = document.querySelector(".page-wrapper");

  setTimeout(() => {
    if (intro) intro.classList.add("intro-hidden");
    if (page) page.classList.add("page-visible");
  }, 1800);
});

/* ======================================================
   Header scroll behavior
   ====================================================== */
const header = document.getElementById("mainHeader");

window.addEventListener("scroll", () => {
  if (!header) return;
  if (window.scrollY > 80) {
    header.classList.add("header-scrolled");
  } else {
    header.classList.remove("header-scrolled");
  }
});

/* ======================================================
   DOM Ready
   ====================================================== */
document.addEventListener("DOMContentLoaded", () => {
  // Footer year
  const yearSpan = document.getElementById("year");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // Init features
  createHeroParticles();
  initGameSlider();
  initCursorGlow();
  initContactForm();
});

/* ======================================================
   Hero floating particles
   ====================================================== */
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

/* ======================================================
   Game screenshots slider (infinite loop)
   ====================================================== */
function initGameSlider() {
  const track = document.getElementById("gameSlider");
  if (!track) return;

  const originalSlides = Array.from(track.querySelectorAll(".slide"));
  if (!originalSlides.length) return;

  // Clone first & last slide
  const firstClone = originalSlides[0].cloneNode(true);
  const lastClone = originalSlides[originalSlides.length - 1].cloneNode(true);
  firstClone.dataset.clone = "first";
  lastClone.dataset.clone = "last";

  track.appendChild(firstClone);
  track.insertBefore(lastClone, originalSlides[0]);

  const slides = Array.from(track.querySelectorAll(".slide"));

  let index = 1;
  let allowMove = true;
  let autoTimer = null;

  function setTransition(enabled) {
    track.style.transition = enabled ? "transform 0.6s ease-in-out" : "none";
  }

  function goToIndex(newIndex) {
    index = newIndex;
    setTransition(true);
    track.style.transform = `translateX(-${index * 100}%)`;
  }

  // Initial position
  setTransition(false);
  track.style.transform = `translateX(-${index * 100}%)`;

  track.addEventListener("transitionend", () => {
    const current = slides[index];
    if (!current) {
      allowMove = true;
      return;
    }

    if (current.dataset.clone === "first") {
      setTransition(false);
      index = 1;
      track.style.transform = `translateX(-${index * 100}%)`;
    } else if (current.dataset.clone === "last") {
      setTransition(false);
      index = originalSlides.length;
      track.style.transform = `translateX(-${index * 100}%)`;
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(() => setTransition(true));
    });

    allowMove = true;
  });

  function nextSlide() {
    if (!allowMove) return;
    allowMove = false;
    goToIndex(index + 1);
  }

  function prevSlide() {
    if (!allowMove) return;
    allowMove = false;
    goToIndex(index - 1);
  }

  const prevBtn = document.querySelector("[data-slider='prev']");
  const nextBtn = document.querySelector("[data-slider='next']");

  if (prevBtn) prevBtn.addEventListener("click", prevSlide);
  if (nextBtn) nextBtn.addEventListener("click", nextSlide);

  function startAuto() {
    if (autoTimer) clearInterval(autoTimer);
    autoTimer = setInterval(nextSlide, 7000);
  }

  startAuto();
}

/* ======================================================
   Mouse-follow glow in hero
   ====================================================== */
function initCursorGlow() {
  const glow = document.getElementById("cursorGlow");
  const hero = document.querySelector(".hero");
  if (!glow || !hero) return;

  document.addEventListener("mousemove", (e) => {
    const rect = hero.getBoundingClientRect();
    const inside =
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom;

    if (!inside) {
      glow.style.opacity = "0";
      return;
    }

    glow.style.opacity = "1";
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
  });
}

/* ======================================================
   Contact form + popup (FINAL FIXED VERSION)
   ====================================================== */
function initContactForm() {
  const form = document.getElementById("scarcatForm");
  const modal = document.getElementById("formModal");
  const modalTitle = document.getElementById("formModalTitle");
  const modalMessage = document.getElementById("formModalMessage");
  const modalClose = document.getElementById("formModalClose");

  if (!form || !modal) return;

  let scrollY = 0;

  function openModal(title, message, success = true) {
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    modalTitle.style.color = success ? "#ffc727" : "#ff6868";

    // 🔒 lock scroll position
    scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    modal.classList.add("visible");
  }

  function closeModal() {
    modal.classList.remove("visible");

    // 🔓 restore scroll
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";
    window.scrollTo(0, scrollY);
  }

  if (modalClose) modalClose.addEventListener("click", closeModal);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        openModal(
          "Message sent",
          "Thank you for reaching out. The Scarcat Studio team will get back to you soon.",
          true
        );
        form.reset();
      } else {
        openModal(
          "Something went wrong",
          "We couldn’t send your message right now. Please try again in a moment.",
          false
        );
      }
    } catch (err) {
      openModal(
        "Network error",
        "Your connection seems unstable. Please check and try again.",
        false
      );
    }
  });
}
