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
function newsletterModal() {
  const modal = document.querySelector(".c-modal-newsletter");
  const trigger = document.querySelector("[data-modal='legal-newsletter']");
  const closeBtn = modal.querySelector(".c-modal-close");

  if (!modal) return;

  function openModal() {
    modal.classList.add("is-open");
    lenis.stop();
  }

  function closeModal() {
    modal.classList.remove("is-open");
    lenis.start();
  }

  trigger.addEventListener("click", openModal);
  closeBtn.addEventListener("click", closeModal);
}

newsletterModal();
