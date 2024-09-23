// --- SLIDER
function teamRow1() {
  let splides = $(".splide.team-row-1");
  for (let i = 0, splideLength = splides.length; i < splideLength; i++) {
    new Splide(splides[i], {
      perPage: 6.5,
      arrows: false,
      pagination: false,
      focus: "center",
      direction: "ltr",
      gap: "2.5rem",
      type: "loop",
      autoScroll: {
        autoStart: true,
        speed: 0.4,
        pauseOnHover: false,
      },
      intersection: {
        inView: {
          autoScroll: true,
        },
        outView: {
          autoScroll: false,
        },
      },
      breakpoints: {
        991: {
          perPage: 4,
          gap: "1.5rem",
        },
        767: {
          perPage: 3,
          gap: "1.5rem",
        },
        479: {
          perPage: 2,
          gap: "1.5rem",
        },
      },
    }).mount(window.splide.Extensions);
  }
}
teamRow1();

function teamRow2() {
  let splides = $(".splide.team-row-2");
  for (let i = 0, splideLength = splides.length; i < splideLength; i++) {
    new Splide(splides[i], {
      perPage: 6.5,
      arrows: false,
      pagination: false,
      focus: "center",
      direction: "ltr",
      gap: "2.5rem",
      type: "loop",
      autoScroll: {
        autoStart: true,
        speed: -0.4,
        pauseOnHover: false,
      },
      intersection: {
        inView: {
          autoScroll: true,
        },
        outView: {
          autoScroll: false,
        },
      },
      breakpoints: {
        991: {
          perPage: 4,
          gap: "1.5rem",
        },
        767: {
          perPage: 3,
          gap: "1.5rem",
        },
        479: {
          perPage: 2,
          gap: "1.5rem",
        },
      },
    }).mount(window.splide.Extensions);
  }
}
teamRow2();

// --- CARDS CLICK EVENT
$(".splide__slide").each(function () {
  let panelEl = $(this).find(".c-team-panel");
  let panelCloseEl = $(this).find(".c-team-panel-close");
  let panelOverlay = $(".c-team-panel-overlay");
  let panelPhoto = $(this).find(".c-img-contain.team");
  let panelBio = $(this).find(".t-rich-text.w-dyn-bind-empty");
  let panelTrigger = $(this).find(".c-team-panel-link");

  if (panelBio.length == 0) {
  }

  let tl = gsap.timeline({
    defaults: {
      duration: 0.8,
      ease: panelEase,
    },
    paused: true,
  });

  gsap.set(panelEl, {
    autoAlpha: 1,
    transformOrigin: "center center",
  });
  gsap.set(panelOverlay, { autoAlpha: 0 });
  gsap.set(".c-team-panel-wrap", { autoAlpha: 1 });
  gsap.set(panelOverlay, { pointerEvents: "auto" });

  tl.to(panelOverlay, { autoAlpha: 1 });
  tl.fromTo(
    panelEl,
    { clipPath: "inset(50% 50% 50% 50% round 1.5em)" },
    { clipPath: "inset(0% 0% 0% 0% round 1.5em)" },
    0
  );

  if (panelBio.length == 0) {
    panelTrigger.on("click", function () {
      tl.timeScale(1);
      tl.restart();
      lenis.stop();
    });
  }

  panelCloseEl.on("click", function () {
    tl.timeScale(1.2);
    tl.reverse();
    lenis.start();
  });

  panelOverlay.on("click", function () {
    panelCloseEl.click();
  });

  $(document).on("keydown", function (e) {
    if (e.key === "Escape") {
      panelCloseEl.click();
    }
  });
});

// PAGE LOAD
document.addEventListener("DOMContentLoaded", function () {
  const teamModals = document.querySelectorAll(".c-team-panel-wrap");
  teamModals.forEach(modal => {
    document.body.appendChild(modal);
  });
});
