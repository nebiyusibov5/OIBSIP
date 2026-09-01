const screen = document.querySelector(".screen");
const btnNum = document.querySelectorAll(".btn_num");
const operation = document.querySelectorAll(".operation, .btn_operation");
const clear = document.getElementById("clear");
const Delete = document.getElementById("delete");
const equal = document.getElementById("equal");

let currentInput = "0";
let previousInput = "";
let operator = null;
let resetScreen = false;

function updateScreen() {
  screen.textContent = currentInput;
}

btnNum.forEach((btn) => {
  btn.addEventListener("click", () => {
    const value = btn.textContent.trim();

    if (resetScreen) {
      currentInput = "";
      resetScreen = false;
    }

    if (value === ",") {
      if (currentInput.includes(",")) return;

      if (currentInput === "0" || currentInput === "") {
        currentInput = "0,";
        updateScreen();
        return;
      }
    }

    if (currentInput === "0" && value !== ",") {
      currentInput = value;
    } else {
      currentInput += value;
    }
    
    updateScreen();
  });
});

operation.forEach((btn) => {
  if (btn.id === "equal") return;
  
  btn.addEventListener("click", () => {
    if (operator !== null && !resetScreen) {
      calculate();
    }
    previousInput = currentInput;
    operator = btn.textContent.trim();
    resetScreen = true;
  });
});

function calculate() {
  if (operator === null || resetScreen) return;

  let prev = parseFloat(previousInput.replace(",", "."));
  let current = parseFloat(currentInput.replace(",", "."));
  let result = 0;

  switch (operator) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "×":
      result = prev * current;
      break;
    case "÷":
      if (current === 0) {
        alert("you cannot devide by zero!");
        clearAll();
        return;
      }
      result = prev / current;
      break;
    default:
      return;
  }

  currentInput = String(result).replace(".", ",");
  operator = null;
  previousInput = "";
  updateScreen();
}

if (equal) {
  equal.addEventListener("click", () => {
    calculate();
    resetScreen = true;
  });
}

function clearAll() {
  currentInput = "0";
  previousInput = "";
  operator = null;
  resetScreen = false;
  updateScreen();
}

clear.addEventListener("click", clearAll);

Delete.addEventListener("click", () => {
  if (resetScreen) return;

  if (
    currentInput.length === 1 ||
    (currentInput.length === 2 && currentInput.startsWith("-"))
  ) {
    currentInput = "0";
  } else {
    currentInput = currentInput.slice(0, -1);
  }
  updateScreen();
});