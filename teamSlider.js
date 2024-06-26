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
        speed: 0.2,
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
        speed: -0.2,
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
