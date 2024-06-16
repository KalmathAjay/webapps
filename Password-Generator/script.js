// Select the DOM elements for interaction
const lengthSlider = document.querySelector(".pass-length input");
const options = document.querySelectorAll(".option input");
const copyIcon = document.querySelector(".input-box span");
const passwordInput = document.querySelector(".input-box input");
const passIndicator = document.querySelector(".pass-indicator");
const generateBtn = document.querySelector(".generate-btn");

// Object containing possible characters for each option
const characters = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "!$%&|[](){}:;.,*+-#@<>~",
};

// Function to generate the password
const generatePassword = () => {
  let staticPassword = "",
    randomPassword = "",
    excludeDuplicate = false;
  const passLength = parseInt(lengthSlider.value);

  // Iterate over the options and build the character set based on user selection
  options.forEach((option) => {
    if (option.checked) {
      if (option.id !== "exc-duplicate" && option.id !== "spaces") {
        staticPassword += characters[option.id];
      } else if (option.id === "spaces") {
        staticPassword += " ";
      } else {
        excludeDuplicate = true;
      }
    }
  });

  // Generate the password
  for (let i = 0; i < passLength; i++) {
    const randomChar =
      staticPassword[Math.floor(Math.random() * staticPassword.length)];
    if (excludeDuplicate) {
      if (!randomPassword.includes(randomChar) || randomChar === " ") {
        randomPassword += randomChar;
      } else {
        i--;
      }
    } else {
      randomPassword += randomChar;
    }
  }
  passwordInput.value = randomPassword;
  updatePassIndicator();
};

// Function to update the password strength indicator based on length
const updatePassIndicator = () => {
  const passLength = parseInt(lengthSlider.value);
  passIndicator.id =
    passLength <= 11 ? "weak" : passLength <= 17 ? "medium" : "strong";
};

// Function to update the slider value display and generate a new password
const updateSlider = () => {
  document.querySelector(".pass-length span").innerText = lengthSlider.value;
  generatePassword();
};

// Function to copy the generated password to the clipboard
const copyPassword = () => {
  if (passwordInput.value) {
    navigator.clipboard.writeText(passwordInput.value);
    copyIcon.innerText = "check";
    copyIcon.style.color = "#4285f4";
    setTimeout(() => {
      copyIcon.innerText = "copy_all";
      copyIcon.style.color = "#707070";
    }, 1500);
  }
};

updateSlider();

// Add event listeners to handle user interactions
copyIcon.addEventListener("click", copyPassword);
lengthSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);
