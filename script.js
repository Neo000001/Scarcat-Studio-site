// Intro splash + show main page
window.addEventListener("load", () => {
  const intro = document.getElementById("intro");
  const page = document.querySelector(".page-wrapper");

  setTimeout(() => {
    intro.classList.add("intro-hidden");
    page.classList.add("page-visible");
  }, 1800);
});

// Header scroll behavior
const header = document.getElementById("mainHeader");

window.addEventListener("scroll", () => {
  if (window.scrollY > 80) {
    header.classList.add("header-scrolled");
  } else {
    header.classList.remove("header-scrolled");
  }
});

// Footer year
document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
