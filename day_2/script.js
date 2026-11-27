const display = document.querySelector("#display");
const previousDisplay = document.querySelector("#previous-display");
const keypad = document.querySelector(".keypad");

let currentInput = "0";
let storedValue = null;
let pendingOperator = null;
let shouldStartNewInput = false;
let hasError = false;

const operatorSymbols = {
  "+": "+",
  "-": "−",
  "*": "×",
  "/": "÷",
};

function formatValue(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return "Error";
  if (Math.abs(number) >= 1e12 || (number !== 0 && Math.abs(number) < 1e-8)) {
    return number.toExponential(6).replace(/\.?0+e/, "e");
  }
  return number.toLocaleString("en-US", { maximumFractionDigits: 8 });
}

function render() {
  display.textContent = hasError ? "Error" : formatValue(currentInput);
  previousDisplay.textContent =
    storedValue !== null && pendingOperator
      ? `${formatValue(storedValue)} ${operatorSymbols[pendingOperator]}`
      : "";

  keypad.querySelectorAll("[data-operator]").forEach((button) => {
    button.classList.toggle("is-selected", button.dataset.operator === pendingOperator);
    button.setAttribute("aria-pressed", String(button.dataset.operator === pendingOperator));
  });
}

function reset() {
  currentInput = "0";
  storedValue = null;
  pendingOperator = null;
  shouldStartNewInput = false;
  hasError = false;
  render();
}

function enterDigit(digit) {
  if (hasError) reset();
  if (shouldStartNewInput) {
    currentInput = digit;
    shouldStartNewInput = false;
  } else if (currentInput.replace("-", "").replace(".", "").length < 12) {
    currentInput = currentInput === "0" ? digit : currentInput + digit;
  }
  render();
}

function enterDecimal() {
  if (hasError) reset();
  if (shouldStartNewInput) {
    currentInput = "0.";
    shouldStartNewInput = false;
  } else if (!currentInput.includes(".")) {
    currentInput += ".";
  }
  render();
}

function calculate(left, right, operator) {
  switch (operator) {
    case "+":
      return left + right;
    case "-":
      return left - right;
    case "*":
      return left * right;
    case "/":
      return right === 0 ? null : left / right;
    default:
      return right;
  }
}

function normalizeResult(value) {
  return Number(value.toPrecision(12)).toString();
}

function chooseOperator(operator) {
  if (hasError) reset();
  const inputValue = Number(currentInput);

  if (pendingOperator && !shouldStartNewInput) {
    const result = calculate(storedValue, inputValue, pendingOperator);
    if (result === null) {
      hasError = true;
      currentInput = "0";
      storedValue = null;
      pendingOperator = null;
      shouldStartNewInput = true;
      render();
      return;
    }
    currentInput = normalizeResult(result);
    storedValue = result;
  } else {
    storedValue = inputValue;
  }

  pendingOperator = operator;
  shouldStartNewInput = true;
  render();
}

function showResult() {
  if (!pendingOperator || storedValue === null || shouldStartNewInput || hasError) return;

  const expression = `${formatValue(storedValue)} ${operatorSymbols[pendingOperator]} ${formatValue(currentInput)} =`;
  const result = calculate(storedValue, Number(currentInput), pendingOperator);

  if (result === null) {
    hasError = true;
    currentInput = "0";
  } else {
    currentInput = normalizeResult(result);
  }
  storedValue = null;
  pendingOperator = null;
  shouldStartNewInput = true;
  render();
  previousDisplay.textContent = hasError ? "Cannot divide by zero" : expression;
}

function performAction(action) {
  if (action === "clear") {
    reset();
  } else if (action === "decimal") {
    enterDecimal();
  } else if (action === "equals") {
    showResult();
  } else if (action === "sign" && !hasError) {
    currentInput = currentInput.startsWith("-") ? currentInput.slice(1) : `-${currentInput}`;
    render();
  } else if (action === "percent" && !hasError) {
    currentInput = normalizeResult(Number(currentInput) / 100);
    render();
  } else if (action === "backspace" && !hasError) {
    currentInput = currentInput.length > 1 ? currentInput.slice(0, -1) : "0";
    if (currentInput === "-") currentInput = "0";
    render();
  }
}

keypad.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;

  if (button.dataset.digit !== undefined) {
    enterDigit(button.dataset.digit);
  } else if (button.dataset.operator) {
    chooseOperator(button.dataset.operator);
  } else if (button.dataset.action) {
    performAction(button.dataset.action);
  }
});

document.addEventListener("keydown", (event) => {
  if (/^\d$/.test(event.key)) {
    enterDigit(event.key);
  } else if (event.key === ".") {
    enterDecimal();
  } else if (["+", "-", "*", "/"].includes(event.key)) {
    chooseOperator(event.key);
  } else if (event.key === "Enter" || event.key === "=") {
    event.preventDefault();
    showResult();
  } else if (event.key === "Escape") {
    reset();
  } else if (event.key === "Backspace") {
    event.preventDefault();
    performAction("backspace");
  } else if (event.key === "%") {
    performAction("percent");
  }
});

render();
