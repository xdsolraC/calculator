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

function handleNumberBtn(num) {
    currentValue += num;
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