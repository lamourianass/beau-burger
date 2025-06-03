document.addEventListener("DOMContentLoaded", function () {
  const burger = document.querySelector(".burger-menu");
  const navList = document.querySelector("nav ul");

  if (burger && navList) {
    burger.addEventListener("click", function () {
      const expanded = burger.getAttribute("aria-expanded") === "true";
      burger.setAttribute("aria-expanded", !expanded);
      navList.classList.toggle("menu-expanded");
      burger.classList.toggle("rotated");
    });

    // Ensure ARIA attributes are initialized
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-controls", "main-navigation");
    navList.setAttribute("id", "main-navigation");
  }

  const revealElements = document.querySelectorAll(".reveal");

  // Collapse menu when a nav link is clicked with fade-out animation
  const navLinks = document.querySelectorAll("nav a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navList.classList.add("menu-closing");
      setTimeout(() => {
        navList.classList.remove("menu-expanded", "menu-closing");
        burger.setAttribute("aria-expanded", "false");
        burger.classList.remove("rotated");
      }, 200);
    });
  });

  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    revealElements.forEach((el) => {
      const revealTop = el.getBoundingClientRect().top;
      if (revealTop < windowHeight - 100) {
        el.classList.add("visible");
      }
    });
  };

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // Run on load

  const scrollTopBtn = document.getElementById("scrollTop");

  window.addEventListener("scroll", () => {
    if (scrollTopBtn) {
      scrollTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
    }
  });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
