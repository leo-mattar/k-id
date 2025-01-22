// --- HUBSPOT MODAL
function hubSpotModal() {
  let btns = document.querySelectorAll("[data-modal]");
  let modals = document.querySelectorAll("[data-id]");
  let closeButtons = document.querySelectorAll(".c-modal-close");

  // Function to close all modals
  function closeAllModals() {
    modals.forEach(modal => {
      modal.classList.remove("is-open");
    });
  }

  // Open modal on button click
  btns.forEach(btn => {
    btn.addEventListener("click", function (e) {
      let modalName = e.currentTarget.getAttribute("data-modal");

      // Close all modals first
      closeAllModals();

      // Find and open the specific modal
      let targetModal = document.querySelector(`[data-id="${modalName}"]`);

      if (targetModal) {
        targetModal.classList.add("is-open");
        lenis.stop();
      } else {
        console.error(`Modal with data-id="${modalName}" not found`);
      }
    });
  });

  // Close modal on close button click
  closeButtons.forEach(btn => {
    btn.addEventListener("click", function (e) {
      // Find the closest modal to the clicked close button
      let modal = e.currentTarget.closest("[data-id]");

      if (modal) {
        modal.classList.remove("is-open");
        lenis.start();
      } else {
        console.error("No modal found for the close button");
      }
    });
  });
}

hubSpotModal();

// --- NEWSLETTER MODAL
function handleNewsletterModal() {
  const modalSelector = ".c-modal-newsletter";
  const closeButtonSelector = ".c-modal-close";
  const modalElement = document.querySelector(modalSelector);
  const closeButton = modalElement
    ? modalElement.querySelector(closeButtonSelector)
    : null;

  // Function to open the modal
  function openModal() {
    if (modalElement) {
      modalElement.classList.add("is-open");
      // Save the current timestamp in localStorage
      localStorage.setItem("newsletterLastShown", Date.now());
    }
  }

  // Function to close the modal
  function closeModal() {
    if (modalElement) {
      modalElement.classList.remove("is-open");
    }
  }

  // Check if enough time has passed to show the modal again
  function shouldShowModal() {
    const lastShown = localStorage.getItem("newsletterLastShown");
    if (lastShown) {
      const now = Date.now();
      const oneMinuteInMs = 1 * 60 * 1000; // 1 minute in milliseconds
      return now - parseInt(lastShown, 10) > oneMinuteInMs;
    }
    // Show the modal if it's the first visit
    return true;
  }

  // Check if the modal should be shown
  if (shouldShowModal()) {
    setTimeout(() => {
      openModal();
      lenis.stop();
    }, 10000);
  }

  // Add event listener to close button
  if (closeButton) {
    closeButton.addEventListener("click", () => {
      closeModal();
      lenis.start();
    });
  }
}

// Initialize the newsletter modal functionality
// handleNewsletterModal();
