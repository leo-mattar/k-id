gsap.registerPlugin(ScrollTrigger, Flip, CustomEase);

gsap.config({
  nullTargetWarn: false,
  trialWarn: false,
});

// --- GLOBAL - CUSTOM EASE
let panelEase = CustomEase.create("moxieEase", "0.19, 1, 0.22, 1");
let buttonEase = CustomEase.create("buttonEase", "0.785, 0.135, 0.15, 0.86");

// --- GLOBAL - SPLIT TEXT
let splitText;

function runSplit() {
  splitText = new SplitType("[split-text]", {
    types: "words, chars",
  });
}

// --- GLOBAL - RELOAD AT THE TOP
$(window).on("beforeunload", function () {
  history.scrollRestoration = "manual";
});

// --- GLOBAL - FADE
function fade() {
  // gsap.set("[fade]", { autoAlpha: 0, yPercent: 25 });

  // ScrollTrigger.batch("[fade]", {
  //   once: true,
  //   onEnter: (batch) =>
  //     gsap.to(batch, {
  //       autoAlpha: 1,
  //       yPercent: 0,
  //       duration: 1.2,
  //       ease: "power3.out",
  //       stagger: 0.1,
  //     }),
  // });

  //

  gsap.set("[fade]", { opacity: 0, y: "4em" });

  let elements = $("[fade]");
  elements.each(function (index, element) {
    ScrollTrigger.create({
      trigger: element,
      start: "-50% bottom",
      onEnter: function () {
        staggerAnimation(element, index);
      },
      once: true
    });
  });

  function staggerAnimation(element, index) {
    gsap.fromTo(
      element, { autoAlpha: 0, y: "4em" },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        ease: "power4.out",
        delay: index * 0.05
      }
    );
  }
}

// --- GLOBAL - PARALLAX
function parallax() {
  gsap.utils.toArray('[parallax-container]').forEach(container => {
    const img = container.querySelector('.c-img');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        scrub: true,
      }
    });

    tl.fromTo(img, {
      yPercent: -5,
      ease: 'none'
    }, {
      yPercent: 5,
      ease: 'none'
    });
  });
}

// --- GLOBAL - BUTTONS HOVER EFFECT
function buttonHover() {
  $("[data-btn='wrap']").each(function () {
    const clipEl = $(this).find("[data-btn='clip']").attr("aria-hidden", "true");
    const durationSetting = 0.4;
    const easeSetting = "power2.inOut";

    function getPercentTop(el, e) {
      let elTop = el.offset().top - $(window).scrollTop();
      let mouseTop = e.pageY - $(window).scrollTop() - elTop;
      return (mouseTop / el.innerHeight()) * 100;
    }

    function getPercentLeft(el, e) {
      let elLeft = el.offset().left;
      let mouseLeft = e.pageX - elLeft;
      return (mouseLeft / el.innerWidth()) * 100;
    }

    let initialBorderColor = $(this).css("border");

    $(this).on("mouseenter", function (e) {
      let percentTop = getPercentTop($(this), e);
      let percentLeft = getPercentLeft($(this), e);
      gsap.set(clipEl, { display: "flex" });
      gsap.fromTo(
        clipEl, { clipPath: `circle(0% at ${percentLeft}% ${percentTop}%)` }, {
          clipPath: `circle(141.4% at ${percentLeft}% ${percentTop}%)`,
          duration: durationSetting,
          ease: easeSetting
        });
      gsap.to($(this), {
        border: "1px solid rgba(253, 109, 16, 0.90)",
        duration: durationSetting,
        ease: easeSetting
      });
    });
    $(this).on("mouseleave", function (e) {
      let percentTop = getPercentTop($(this), e);
      let percentLeft = getPercentLeft($(this), e);
      gsap.to(clipEl, {
        clipPath: `circle(0% at ${percentLeft}% ${percentTop}%)`,
        overwrite: true,
        duration: durationSetting,
        ease: easeSetting
      });
      gsap.to($(this), {
        border: initialBorderColor,
        duration: durationSetting,
        ease: easeSetting
      });
    });
  });
}

//
////
//

// --- MATCHMEDIA
let mm = gsap.matchMedia();

// --- HEADER SCROLL
function headerScroll() {
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".c-body",
      start: "400 top",
      end: "+=1",
      onEnter: () => {
        tl.play();
      },
      onLeaveBack: () => {
        tl.reverse();
      },
    },
    defaults: {
      ease: "power3.inOut",
      duration: 0.4,
    },
  });

  tl.to(".c-header", {
    backgroundColor: "rgba(23, 11, 47, 0.2)",
    backdropFilter: "blur(4px)",
    borderTop: "1px solid rgba(255, 255, 255, 0.2)",
    borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
    borderLeft: "1px solid rgba(255, 255, 255, 0.2)",
    borderRight: "1px solid rgba(255, 255, 255, 0.2)",
  });
}

// --- CLIENTS - MARQUEE
function clientMarquee() {
  let marquerDuration = $(".c-marquee-item").length * 6;
  let tl = gsap.timeline({ defaults: { ease: "none", repeat: -1, duration: marquerDuration } });

  $(".c-marquee-list").clone().appendTo(".c-marquee-wrap");

  tl.to(".c-marquee-list", { x: "-100%" })
}

// --- CLIENTS - MARQUE LIGHT
function marqueeLight() {
  let tl = gsap.timeline({ defaults: { duration: 0.2 }, repeat: -1 });

  const items = document.querySelectorAll(".c-img.contain.highlight");

  items.forEach((item, index) => {
    tl.to(item, { opacity: 1, ease: "power1.in" }, index * 0.2);
    tl.to(item, { opacity: 0, ease: "power1.out" }, "+=0.1");
  });
}

// --- CLIENTS - MARQUEE HOVER
function marqueeItemHover() {

  $(".c-marquee-item").each(function () {
    let tl = gsap.timeline({ paused: true, defaults: { ease: "power3.inOut", duration: 1 } });

    tl.to($(this), {
      "--marquee-item-odd-opacity": 0.3,
      "--marquee-item-even-opacity": 0.4,
      "--marquee-item-odd-light": "100%",
      "--marquee-item-even-light": "100%"
    });

    $(this).on("mouseenter", function () {
      tl.restart();
    });

    $(this).on("mouseleave", function () {
      tl.reverse();
    });
  });
}

// --- PRODUCT IMAGE TELEPORT
function productImageTeleport() {
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".c-img-contain.product-location",
      start: "bottom bottom",
      end: "top 10%",
      endTrigger: ".c-block-item.featured",
      scrub: true,
    }
  });

  tl.fromTo(".c-img-contain.product-location", { y: "-48.8em" }, { y: "13.5em", ease: "none" });
  tl.fromTo(".c-img-contain.product-control", { rotation: 7, y: "1.6em" }, {
    rotation: 15,
    y: "3em",
  }, 0);
  tl.fromTo(".c-img-contain.product-control", { opacity: 1 }, { opacity: 0 }, 0.2);

  tl.fromTo(".c-block-title_lt.featured", { opacity: 0 }, { opacity: 1 }, 0.4);
  tl.fromTo(".c-block-sub.featured", { opacity: 0 }, { opacity: 1 }, 0.4);

}

// --- TEAM SECTION - THEME SWITCH
function teamThemeSwitch() {
  gsap.to(".c-section.team", {
    scrollTrigger: {
      trigger: ".c-section.team",
      start: "30% bottom",
      end: "bottom center",
      onEnter: function () {
        document.querySelector(".c-section.team").setAttribute("data-theme", "light");
      },
    },
  });
}

/// --- TEAM SECTION - THEME SWITCH MOBILE
function teamThemeSwitchMobile() {
  // $(window).resize(function () {
  //   if ($(window).width() < 992) {
  //     $('.c-section.team').attr('data-theme', 'light');
  //   } else {
  //     $('.c-section.team').removeAttr('data-theme');
  //   }
  // });
  $('.c-section.team').attr('data-theme', 'light');
}

// --- HEADER - DYNAMIC ACTIVE LINK
// function headerDynamicActiveLink() {
//   let activeEl = $(".c-nav-active");

//   $(".c-section").each(function () {
//     let id = $(this).attr("id");

//     ScrollTrigger.create({
//       trigger: this,
//       start: "-10% top",
//       end: "bottom center",
//       onToggle: ({ isActive }) => {
//         if (isActive) {
//           updateActiveNavLink(id);
//         }
//       }
//     });
//   });

//   function updateActiveNavLink(id) {
//     let navLink = $(`.c-nav-link[href="#${id}"]`);
//     if (navLink.length > 0) {
//       let state = Flip.getState(activeEl);
//       activeEl.appendTo(navLink);
//       Flip.from(state, {
//         duration: 0.4,
//         ease: "power2.inOut"
//       });
//     }
//   }
// }

//
// function headerDynamicActiveLink() {
//   let activeEl = $(".c-nav-active");
//   let navLinks = $(".c-nav-link");
//   let sections = $(".c-section");

//   navLinks.on("click", function () {
//     let state = Flip.getState(activeEl);
//     activeEl.appendTo($(this));
//     Flip.from(state, {
//       duration: 0.4,
//       ease: "power2.inOut"
//     });
//   });

//   sections.each(function () {
//     let sectionID = $(this).attr("id");
//     ScrollTrigger.create({
//       trigger: this,
//       start: "top 50%",
//       end: "bottom 50%",
//       onEnter: function () {
//         let targetLink = $('.c-nav-link[href="/#' + sectionID + '"]');
//         if (targetLink.length > 0) {
//           let state = Flip.getState(activeEl);
//           activeEl.appendTo(targetLink);
//           Flip.from(state, {
//             duration: 0.4,
//             ease: "power2.inOut"
//           });
//         }
//       },
//       onEnterBack: function () {
//         let targetLink = $('.c-nav-link[href="/#' + sectionID + '"]');
//         if (targetLink.length > 0) {
//           let state = Flip.getState(activeEl);
//           activeEl.appendTo(targetLink);
//           Flip.from(state, {
//             duration: 0.4,
//             ease: "power2.inOut"
//           });
//         }
//       }
//     });
//   });
// }

function headerDynamicActiveLink() {
  let activeEl = $(".c-nav-active");
  let navLinks = $(".c-nav-link");
  let sections = $(".c-section");
  let isClickScrolling = false;

  navLinks.on("click", function () {
    isClickScrolling = true;
    let state = Flip.getState(activeEl);
    activeEl.appendTo($(this));
    Flip.from(state, {
      duration: 0.4,
      ease: "power2.inOut",
      onComplete: function () {
        setTimeout(function () {
          isClickScrolling = false;
        }, 700); // Adjust this timeout based on your scroll duration
      }
    });
  });

  sections.each(function () {
    let sectionID = $(this).attr("id");
    ScrollTrigger.create({
      trigger: this,
      start: "top 50%",
      end: "bottom 50%",
      onEnter: function () {
        let targetLink = $('.c-nav-link[href="/#' + sectionID + '"]');
        if (targetLink.length > 0 && !isClickScrolling) {
          let state = Flip.getState(activeEl);
          activeEl.appendTo(targetLink);
          Flip.from(state, {
            duration: 0.4,
            ease: "power2.inOut"
          });
        }
      },
      onEnterBack: function () {
        let targetLink = $('.c-nav-link[href="/#' + sectionID + '"]');
        if (targetLink.length > 0 && !isClickScrolling) {
          let state = Flip.getState(activeEl);
          activeEl.appendTo(targetLink);
          Flip.from(state, {
            duration: 0.4,
            ease: "power2.inOut"
          });
        }
      }
    });
  });
}

// --- HEADER DROPDOWN
function headerDropdown() {
  $(".c-dropdown-wrap").each(function () {

    let buttonEl = $(this).find(".c-btn");
    let dropdownEl = $(this).find(".c-dropdown");
    let buttonArrow = $(this).find(".c-icon.nav-arrow");

    let tl = gsap.timeline(
    {
      paused: true,
      defaults: {
        ease: "power3.inOut",
        duration: 0.8
      }
    })

    gsap.set(dropdownEl, {
      autoAlpha: 1,
      clipPath: "inset(0% 0% 100% 0%)"
    });

    tl.to(dropdownEl, {
      // clipPath: "inset(0% 0% 0% 0%)",
      clipPath: "inset(0% 0% 0% 0%)"
    });

    tl.to(buttonArrow, { rotate: 180 }, 0);

    buttonEl.on("click", function () {
      $(this).toggleClass("is-open");
      if ($(this).hasClass("is-open")) {
        tl.restart();
      } else {
        tl.reverse();
      }
    });

    $(document).mouseup(function (e) {
      if ($(e.target).closest(".c-btn").length === 0) {
        $(".c-btn.is-open").click();
      }
    });

  });
}

// --- DROPDOWN LINK - HOVER EFFECT
function dropdownHover() {
  $(".c-dropdown-link").each(function () {
    let iconCircle = $(this).find(".c-icon.dropdown-circle");
    let iconArrow = $(this).find(".c-icon.dropdown-arrow");

    let tl = gsap.timeline({
      paused: true,
      defaults: {
        ease: "power4.inOut",
        duration: 0.8
      }
    });

    gsap.set(iconArrow, { x: -6 })

    tl.to(iconCircle, { width: 16, height: 16 });
    tl.to(iconArrow, { autoAlpha: 1, x: 0 }, 0);
    tl.to($(this), { backgroundColor: "rgba(217, 217, 217, 0.10)" }, 0)

    $(this).on("mouseenter", function () {
      tl.restart();
    });

    $(this).on("mouseleave", function () {
      tl.reverse();
    });
  });
}

// --- TEAM PANEL
function teamPanel() {
  $(".c-team-item").each(function () {
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
      transformOrigin: "center center"
    });
    gsap.set(panelOverlay, { autoAlpha: 0 });
    gsap.set(".c-team-panel-wrap", { autoAlpha: 1 })
    gsap.set(panelOverlay, { pointerEvents: "auto" })

    tl.to(panelOverlay, { autoAlpha: 1 });
    tl.fromTo(
      panelEl, { clipPath: "inset(50% 50% 50% 50% round 1.5em)" }, { clipPath: "inset(0% 0% 0% 0% round 1.5em)" },
      0);

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
}

// --- REMOVE EMPTY PARAGRAPHS
function emptyParagraphs() {
  $(".t-rich-text p").each(function () {
    if ($(this).text().length < 2) {
      $(this).text(function () {
        return $(this).text().replace(/(^[\s\u200d]*$)/g, 'removeEmptyParagraph');
      });
    }
  });
  $("p:contains('removeEmptyParagraph')").remove();
}

// --- FOOTER STRUCTURE
function footerStructure() {
  $("[terms-desktop-location]").css("display", "none");
  $("[year-tablet-location]").css("display", "none");
  $("[terms-link]").prependTo("[privacy-tablet-location]");
  $("[year-txt]").prependTo("[rights-tablet-location]");
  $("[site-by-txt]").text("By PaperTiger");
}

// --- HEADER MOBILE
function headerMobile() {

  let headerEl = $(".c-header_center");
  let headerNav = $(".c-header-nav");
  let contactButton = $(".c-header-contact");
  let headerTrigger = $(".c-nav-btn");
  let headerTriggerText = headerTrigger.find(".t-micro-1");
  let pageOverlay = $(".c-team-panel-overlay");

  contactButton.appendTo(headerNav);

  let tl = gsap.timeline({ paused: true, defaults: { ease: "power3.inOut", duration: 0.6 } });

  // gsap.set(headerEl, { autoAlpha: 1 });
  gsap.set(headerEl, { height: 0 });

  // tl.from(
  // headerEl, { clipPath: "inset(0% 0% 100% 100% round 1em)" }, { clipPath: "inset(0% 0% 0% 0% round 1em)" }
  // );

  tl.to(headerEl, { autoAlpha: 1, height: "auto" });

  tl.to(".o-page-wrapper", { autoAlpha: 0.2 }, 0);

  headerTrigger.on("click", function () {
    $(this).toggleClass("is-open");
    if ($(this).hasClass("is-open")) {
      headerTriggerText.text("close");
      lenis.stop();
      tl.restart();
    } else {
      headerTriggerText.text("menu");
      lenis.start();
      tl.reverse();
    }
  });

  $(".c-nav-link").on("click", function () {
    headerTrigger.click();
  });
}

// --- LOADER
function loader() {

  let tl = gsap.timeline({ defaults: { ease: panelEase, duration: 1.6 } });

  gsap.set(".c-img-contain.hero-bg", { clipPath: "inset(100% 0% 0% 0%)", autoAlpha: 1 });
  gsap.set(".c-img-contain.hero-bg .c-img", { scale: 1.3 });
  gsap.set(".c-hm-hero_lt", { autoAlpha: 1 });
  gsap.set(".c-hm-hero_lt .char", { autoAlpha: 0, yPercent: 60 });
  gsap.set(".c-hm-hero_rt", { yPercent: 20 });
  gsap.set(".c-header", { autoAlpha: 0 });
  gsap.set(".c-hm-hero_lt .char", { perspective: 2000 });

  tl.to(".c-img-contain.hero-bg", { clipPath: "inset(0% 0% 0% 0%)" });

  tl.to(".c-img-contain.hero-bg .c-img", { scale: 1, duration: 2 }, "<");

  tl.to(".c-shape-wrap", { autoAlpha: 1 }, "<")

  // tl.to(".c-hm-hero_lt .char", {
  //     autoAlpha: 1,
  //     duration: 1,
  //     yPercent: 0,
  //     stagger: {
  //       from: "start",
  //       each: 0.02
  //     }
  //   },
  //   0);

  tl.fromTo(
    ".c-hm-hero_lt .char",
    {
      "will-change": "opacity, transform",
      autoAlpha: 0,
      rotationX: -90,
      yPercent: 50,
    },
    {
      duration: 0.8,
      autoAlpha: 1,
      rotationX: 0,
      yPercent: 0,
      stagger: {
        each: 0.02,
        from: 0,
      },
    },
    0
  );

  tl.to(".c-hm-hero_rt", { yPercent: 0, autoAlpha: 1 }, "<0.2")
  tl.to(".c-header", { autoAlpha: 1 }, "<0.4");
}

// --- MODAL
function modal() {
  let modalTriggers = $("[modal-trigger]");

  modalTriggers.on("click", function () {
    let modalId = $(this).attr("trigger-el");
    let modal = $(modalId);

    $(".c-modal").removeClass("is-open");
    modal.addClass("is-open");

    lenis.stop();

    modal.find(".c-modal-close").on("click", function () {
      modal.removeClass("is-open");
      lenis.start();
    });

    $(document).on("keydown", function (e) {
      if (e.key === "Escape") {
        modal.find(".c-modal-close").click();
      }
    });
  });
}

// --- TEAM SECTION - LOCAL STORAGE ATTR CHECKER
if (!sessionStorage.getItem('visitedHomepage')) {
  // If not visited before, remove the attribute
  $('.c-section.team').removeAttr('data-theme');

  // Mark that the user has visited the homepage
  sessionStorage.setItem('visitedHomepage', true);
}

// --- PAGES
let homePage = document.querySelector("[home-page]");

// --- INIT
function init() {
  clientMarquee();
  headerDropdown();
  marqueeLight();
  teamPanel();
  headerScroll();
  emptyParagraphs();
  headerDynamicActiveLink();
  runSplit();
  loader();
  marqueeItemHover();
  parallax();
  modal();
}
init();

// --- MATCHMEDIA - DESKTOP
mm.add("(min-width: 992px)", () => {
  productImageTeleport();
  dropdownHover();
  fade();
  buttonHover();
  teamThemeSwitch();
  return () => {
    //
  };
});

// --- MATCHMEDIA - TABLET AND MOBILE
mm.add("(max-width: 991px)", () => {
  footerStructure();
  headerMobile();
  teamThemeSwitchMobile();
  return () => {
    $("[terms-desktop-location]").css("display", "flex");
    $("[year-tablet-location]").css("display", "flex");
    $("[terms-link]").appendTo("[terms-desktop-location]");
    $("[year-txt]").prependTo("[year-desktop-location]");
    $("[site-by-txt]").text("Site By PaperTiger");
    $("[year-txt]").appendTo("[year-tablet-location]")
    $(".c-header-contact").appendTo(".c-header_rt");
    $(".c-nav-btn").unbind();
    $(".c-nav-btn").removeClass("is-open");
    $(".c-nav-btn .t-micro-1").text("menu");
    $('.c-section.team').removeAttr('data-theme');
  };
});
