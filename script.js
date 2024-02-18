// Global variables
let previousValue = "";
let operator = "";
let currentValue = "";

function refreshDisplay(val) {
    const display = document.querySelector(".display");
    display.textContent = val ? val : currentValue;
    // limit display to 9 characters
    if (currentValue.length > 9) {
        display.textContent = currentValue.slice(0, 9);
    }
}

// Default display value
refreshDisplay("0");

// Handle clicks
function handleClearBtn() {
    currentValue = "";
    operator = "";
    previousValue = "";
}

function handlePlusMinusBtn() {
    currentValue = (parseFloat(currentValue) * -1).toString();
}

function handlePercentBtn() {
    currentValue = (parseFloat(currentValue) / 100).toString();
}

function handleOperatorBtn(passedOperator) {
    if (currentValue === "") return;
    else if (previousValue !== "") {
        handleEqualsBtn();
    }
    operator = passedOperator;
    previousValue = currentValue;
    currentValue = "";
}

function handleNumberBtn(num) {
    currentValue += num;
}

function handleDecimalBtn() {
    if (currentValue === "") {
        currentValue = "0.";
    }
    else if (!(currentValue.includes("."))) {
        currentValue += ".";
    }
}

function handleEqualsBtn() {
    const prev = parseFloat(previousValue);
    const current = currentValue === "" ? prev : parseFloat(currentValue);
    if (isNaN(prev) || isNaN(current)) return;
    currentValue = operate(operator, prev, current).toString();
    operator = "";
    previousValue = "";
}

function operate(operator, a, b) {
    switch (operator) {
        case "+":
            return a + b;
        case "-":
            return a - b;
        case "*":
            return a * b;
        case "/":
            return a / b;
    }
}

/* Event Listeners */
const buttons = document.querySelectorAll("button");
// add event listeners to each button
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        switch (true) {
            case (button.classList.contains("clear")):
                handleClearBtn();
                refreshDisplay("0");
                break;
            case (button.classList.contains("plusMinus")):
                handlePlusMinusBtn();
                refreshDisplay();
                break;
            case (button.classList.contains("percent")):
                handlePercentBtn();
                refreshDisplay();
                break;
            case (button.classList.contains("operator")):
                handleOperatorBtn(button.value);
                break;
            case (button.classList.contains("number")):
                handleNumberBtn(button.value);
                refreshDisplay();
                break;
            case (button.classList.contains("decimal")):
                handleDecimalBtn();
                refreshDisplay();
                break;
            case (button.classList.contains("equals")):
                handleEqualsBtn();
                if (!(currentValue === "" && previousValue === "")) {
                    refreshDisplay();
                    break;
                }
                refreshDisplay("0");
        }
    })
})