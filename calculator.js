"strict";
const display = document.querySelector("#display");
const btns = document.querySelectorAll(".btn");

let hasError = false; // Track if "Error" is displayed

function displayInput(buttons) {
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      const value = button.textContent.trim();
      const lastChar = display.value.slice(-1);

      if (hasError) {
        display.value = ""; // Clear display if "Error" was shown
        hasError = false;
      }

      if (value === "=") {
        calculate();
      } else if (value === "C") {
        display.value = "";
        hasError = false;
      } else if (value === "⌫") {
        display.value = display.value.slice(0, -1); // Backspace
      } else if (
        ["+", "-", "*", "/"].includes(value) &&
        ["+", "-", "*", "/"].includes(lastChar)
      ) {
        return; // Prevent duplicate operators
      } else if (value === "." && display.value === "") {
        display.value = "0.";
        // If only a dot is on display, convert to "0."
      } else if (display.value === "0" && !isNaN(value) && value !== ".") {
        // Replace leading 0 with number
        display.value = value;
      } else {
        display.value += value;
      }
    });
  });
}

function safeCalculation(expression) {
  try {
    return math.evaluate(expression);
  } catch (Error) {
    return "Error";
  }
}

function calculate() {
  if (display.value.trim() === "") {
    display.value = "";
    return;
  } else {
    const result = safeCalculation(display.value);
    display.value = result;
    if (result === "Error") {
      hasError = true;
    }
  }
}

displayInput(btns);

themeButton.addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");
});
