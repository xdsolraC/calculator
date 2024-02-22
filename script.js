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
    if (currentValue === "") {
        currentValue = "0";
    }
    currentValue = (parseFloat(currentValue) * -1).toString();
}

function handlePercentBtn() {
    if (currentValue === "") {
        currentValue = "0";
    }
    currentValue = (parseFloat(currentValue) / 100).toString();
}

function handleOperatorBtn(passedOperator) {
    if (currentValue === "") {
        currentValue = "0";
    }
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
    if ((currentValue === "" && previousValue === "") || (currentValue !== "" && previousValue === "")) {
        return;
    } else {
        const prev = parseFloat(previousValue);
        const current = currentValue === "" ? prev : parseFloat(currentValue);
        let results = operate(operator, prev, current);
        currentValue = isNaN(results) ? "Bruh!" : results.toString();
    }
    operator = "";
    previousValue = "";
    if (currentValue === "0") {
        currentValue = "";
    }
}

function operate(operator, a, b) {
    switch (operator) {
        case "+":
            return parseFloat((a + b).toFixed(9));
        case "-":
            return parseFloat((a - b).toFixed(9));
        case "*":
            return parseFloat((a * b).toFixed(9));
        case "/":
            return parseFloat((a / b).toFixed(9));
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
                if (currentValue === "0") {
                    handleClearBtn();
                }
                break;
            case (button.classList.contains("percent")):
                handlePercentBtn();
                refreshDisplay();
                handleClearBtn();
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