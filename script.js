const display = document.getElementById("display");

let currentInput = "";
let previousInput = "";
let operator = null;

//Query Selectors.
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");

// Handle number buttons
numbers.forEach( button => {
    button.addEventListener("click", () => {
        const value = button.dataset.value;
        if (value === "." && currentInput.includes(".")) return;
        currentInput += value;
        display.value = currentInput;

    });
});

// Handle operator buttons
operators.forEach( button =>{
    button.addEventListener("click", () => {
        const value = button.dataset.value;
        switch (value) {
            case "+/-":
                currentInput = (parseFloat(currentInput) * -1).toString();
                display.value = currentInput;
            break;
            case "%":
                currentInput = (parseFloat(currentInput) / 100).toString();
                display.value = currentInput;
            break;
            case "+":
            case "-":
            case "x":
            case "÷":
                if (currentInput === "") return;
                previousInput = currentInput;
                currentInput = "";
                operator = value;
                break;
        }
    });
});

// Handle equals button
document.querySelector(".equal").addEventListener("click", () => {
    if (!previousInput || !currentInput || !operator) return;

    let result;
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);

    switch (operator) {
        case "+":
            result = prev + curr;
            break;
        case "-":
            result = prev - curr;
            break;
        case "x":
            result = prev * curr;
            break;
        case "÷":
            result = curr === 0 ? "Error" : prev / curr;
            break;
        default:
            return;
    }

    display.value = result;
    currentInput = result.toString();
    previousInput = "";
    operator = null;
});

// Handle clear button
document.querySelector(".clear").addEventListener("click", () => {
    currentInput = "";
    previousInput = "";
    operator = null;
    display.value = "";
});
