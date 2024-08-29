document.addEventListener("DOMContentLoaded", function () {
  // --- FUNDING CARDS - HOVER
  document.querySelectorAll(".c-value-card").forEach(function (card) {
    if (card.dataset.flip) {
      let tl = gsap.timeline({ paused: true });

      tl.to(card.querySelector(".c-value-card-item"), {
        rotationY: 180,
        duration: 1,
        ease: "power2.inOut",
      });

      card.addEventListener("mouseenter", function () {
        tl.restart();
      });

      card.addEventListener("mouseleave", function () {
        tl.reverse();
      });
    }
  });

  // --- CARD TABS
  const cards = document.querySelectorAll(".c-value-card");

  cards.forEach(card => {
    const links = card.querySelectorAll(".c-value-card-tab-link");
    const tabs = card.querySelectorAll(".c-value-card-tab");

    links.forEach((link, index) => {
      link.addEventListener("click", e => {
        e.preventDefault();

        // Remove active class from all links and tabs
        links.forEach(l => l.classList.remove("is-active"));
        tabs.forEach(t => t.classList.remove("is-active"));

        // Add active class to clicked link and corresponding tab
        link.classList.add("is-active");
        tabs[index].classList.add("is-active");
      });
    });
  });
});
