document.addEventListener("DOMContentLoaded", function () {
  const video = document.querySelector(".c-video.facial-age video");

  const handleVisibilityChange = entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        video.play();
      } else {
        video.pause();
      }
    });
  };

  const observer = new IntersectionObserver(handleVisibilityChange);
  observer.observe(video);

  video.addEventListener("ended", () => {
    video.pause();
    setTimeout(() => {
      video.currentTime = 0;
      video.play();
    }, 2000);
  });
});

console.log("localhost");
