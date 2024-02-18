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