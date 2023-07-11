function add(a, b) {
    return Number(a) + Number(b)
}

function subtract(a, b) {
    return Number(a) - Number(b)
}

function multiply(a, b) {
    return Number(a) * Number(b)
}

function divide(a, b) {
    return Number(a) / Number(b)
}

let firstRow = null;
let operator = null;
let secondRow = null;

function operate(a, operator, b) {
    if (operator === "+") {
        return add(a, b)
    } else if (operator === "-") {
        return subtract(a, b)
    } else if (operator === "×") {
        return multiply(a, b)
    } else if (operator === "÷") {
        return divide(a, b)
    }
}

const displayFirstRow = document.querySelector('#display-first-row');
const displaySecondRow = document.querySelector('#display-second-row');
const buttons = document.querySelectorAll('.number');
let activeOperator = false;
let finished = false;

buttons.forEach((button) => button.addEventListener('click', (e) => {
    if (finished === true) clear();
    if (e.target.textContent === '.') {
        if (displaySecondRow.textContent.includes('.')) {
            displaySecondRow.textContent = displaySecondRow.textContent;
        } else {
            displaySecondRow.textContent = displaySecondRow.textContent + e.target.textContent;
            secondRow = displaySecondRow.textContent;
            activeOperator = false;
            finished = false; 
        }
    } else {
        displaySecondRow.textContent = displaySecondRow.textContent + e.target.textContent;
        secondRow = displaySecondRow.textContent;
        activeOperator = false;
        finished = false;  
    }
}))
 
const actions = document.querySelectorAll('.last-button');
actions.forEach((action) => action.addEventListener('click', (e) => {
    if (activeOperator === true) {
        operator = e.target.textContent;
        secondRow = firstRow;
    }
    if (firstRow !== null && activeOperator === false) {
        firstRow = operate(firstRow, operator, secondRow);
        displayFirstRow.textContent = firstRow;
        operator = e.target.textContent;
        activeOperator = true;
    } else {
        firstRow = secondRow;
        operator = e.target.textContent;
        activeOperator = true;
    }
    displayFirstRow.textContent = firstRow + operator;
    displaySecondRow.textContent = '';
    finished = false;
    if (operator === "÷" && secondRow === "0") {
        displaySecondRow.textContent = "Division by zero, MORON!";
    }
}))

const equals = document.querySelector('#equal-button');
equals.addEventListener('click', () => {
    if (firstRow !== null) {
        displayFirstRow.textContent = firstRow + operator + secondRow;
        displaySecondRow.textContent = operate(firstRow, operator, secondRow);
        activeOperator = false;
    }
    if (operator === "÷" && secondRow === "0") {
        displaySecondRow.textContent = "Division by zero, MORON!";
    }
    finished = true;
})

const clearButton = document.querySelector('#clear');

function clear() {
    firstRow = null;
    operator = null;
    secondRow = null;
    activeOperator = false;
    finished = false;
    displaySecondRow.textContent = '';
    displayFirstRow.textContent = '';
}

clearButton.addEventListener('click', clear);

const deleteButton = document.querySelector('#delete');
deleteButton.addEventListener('click', () => {
    if (finished === false) displaySecondRow.textContent = displaySecondRow.textContent.slice(0, -1);
    secondRow = displaySecondRow.textContent;
})
