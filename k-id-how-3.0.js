// Radio
const cards = document.querySelectorAll(".c-radio-card");
const radios = document.querySelectorAll("input[type='radio']");

radios.forEach(radio => {
  radio.addEventListener("change", () => {
    cards.forEach(card => {
      card.classList.remove("is-selected");
    });

    if (radio.checked) {
      const closestCard = radio.closest(".c-radio-card");
      closestCard.classList.add("is-selected");
    }
  });
});

// Checkbox
const checkboxCards = document.querySelectorAll(".c-checkbox-card");
const checkboxes = document.querySelectorAll("input[type='checkbox']");

checkboxes.forEach(checkbox => {
  checkbox.addEventListener("change", () => {
    let closestCard = checkbox.closest(".c-checkbox-card");

    if (!closestCard) {
      closestCard = checkbox.parentElement.closest(".c-checkbox-card");
    }

    if (closestCard) {
      if (checkbox.checked) {
        closestCard.classList.add("is-selected");
      } else {
        closestCard.classList.remove("is-selected");
      }
    }
  });
});

// Form logic
const formSteps = document.querySelectorAll(".c-how-form-item");
const prevBtn = document.querySelector(".c-how-steps-prev-btn");
const nextBtn = document.querySelector(".c-how-steps-next-btn");
const stepTextItems = document.querySelectorAll(".c-steps-item");
const progressBars = document.querySelectorAll(".c-how-progress-bar");
const formSuccessMessage = document.querySelector(".c-how-form-success");
const stepsWrap = document.querySelector(".c-how-steps");

let currentStep = 0;

// Function to update button states
const updateButtons = () => {
  prevBtn.disabled = currentStep === 0;
  nextBtn.disabled = currentStep === formSteps.length - 1;

  // Update next button text
  const nextBtnText = nextBtn.querySelector(".t-micro-1");
  const nextBtnIcon = nextBtn.querySelector(".c-icon");
  // if (currentStep === formSteps.length - 1) {
  //   nextBtnText.textContent = "Submit";
  //   nextBtnIcon.style.display = "none";
  // } else {
  //   nextBtnText.textContent = "Next";
  //   nextBtnIcon.style.display = "flex";
  // }
  if (currentStep === 0) {
    nextBtn.style.pointerEvents = "none";
    nextBtn.style.opacity = 0.4;
  } else {
    nextBtn.style.pointerEvents = "";
    nextBtn.style.opacity = 1;
  }

  // Update previous button style
  if (currentStep === 0) {
    prevBtn.style.pointerEvents = "none";
    prevBtn.style.opacity = 0.4;
  } else {
    prevBtn.style.pointerEvents = "";
    prevBtn.style.opacity = 1;
  }
};

// Function to update progress bar
const updateProgressBar = () => {
  const progress = ((currentStep + 1) / formSteps.length) * 100;
  progressBars.forEach(bar => {
    bar.style.width = `${progress}%`;
  });
};

// Function to show the current step
const showStep = stepIndex => {
  formSteps.forEach((step, index) => {
    step.classList.toggle("is-active", index === stepIndex);
  });
  stepTextItems.forEach((item, index) => {
    item.classList.toggle("is-active", index === stepIndex);
  });
  updateButtons();
  updateProgressBar();
};

// Function to validate the current step
const validateStep = () => {
  const currentStepElement = formSteps[currentStep];
  const checkboxes = currentStepElement.querySelectorAll(
    'input[type="checkbox"]:checked'
  );
  const radios = currentStepElement.querySelectorAll(
    'input[type="radio"]:checked'
  );

  if (checkboxes.length === 0 && radios.length === 0) {
    alert("Please select at least one option before proceeding.");
    return false;
  }
  return true;
};

// Function to handle form submission
const handleSubmit = () => {
  // Remove .is-active class from all form steps
  formSteps.forEach(step => step.classList.remove("is-active"));

  // Display the success message
  formSuccessMessage.style.display = "flex";
  stepsWrap.style.display = "none";
};

// Event listener for the next button
nextBtn.addEventListener("click", () => {
  if (validateStep()) {
    if (currentStep === formSteps.length - 1) {
      // If it's the last step, handle form submission
      handleSubmit();
    } else {
      currentStep++;
      showStep(currentStep);
    }
  }
});

// Event listener for the previous button
prevBtn.addEventListener("click", () => {
  if (currentStep > 0) {
    currentStep--;
    showStep(currentStep);
  }
});

// Initialize the form
showStep(currentStep);
