document.addEventListener("DOMContentLoaded", function () {
  let youtubePlayer;
  let retryCount = 0;
  const maxRetries = 5;
  const retryDelay = 1000;

  function initializeYouTubePlayer() {
    let videoId = "r_M_aJFwDPM";

    if (window.location.pathname.startsWith("/ja")) {
      videoId = "kcmd8NfaKak";
    }

    if (window.location.pathname.startsWith("/zh")) {
      videoId = "Yku4-5tHbzo";
    }

    youtubePlayer = new YT.Player("youtube-player", {
      width: "100%",
      height: "100%",
      videoId: videoId,
      playerVars: { autoplay: 0, controls: 1, cc_load_policy: 1 },
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
      },
    });
  }

  window.onYouTubeIframeAPIReady = function () {
    initializeYouTubePlayer();
  };

  function onPlayerReady(event) {
    // console.log("YouTube player is ready");
    // Optionally, you can also start playing the video here
    // youtubePlayer.playVideo();
  }

  function onPlayerStateChange(event) {
    // console.log("Player State Changed: ", event.data);
    // You can handle different player states here if needed
  }

  function playVideo() {
    if (youtubePlayer) {
      youtubePlayer.playVideo();
    }
  }

  function stopVideo() {
    if (youtubePlayer) {
      youtubePlayer.stopVideo();
    }
  }

  function checkYouTubePlayer() {
    if (!youtubePlayer && retryCount < maxRetries) {
      retryCount++;
      console.log(
        `Retrying to initialize YouTube player (${retryCount}/${maxRetries})`
      );
      setTimeout(initializeYouTubePlayer, retryDelay);
    }
  }

  document.querySelectorAll("[video-component]").forEach(function (videoCard) {
    videoCard.addEventListener("click", function () {
      document.querySelector(".c-modal").classList.add("is-open");
      playVideo();
      lenis.stop();
    });

    document
      .querySelector(".c-modal-close")
      .addEventListener("click", function () {
        document.querySelector(".c-modal").classList.remove("is-open");
        stopVideo();
        lenis.start();
      });
  });

  setTimeout(checkYouTubePlayer, retryDelay);
});
