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
const buttons = document.querySelectorAll('.numeric');
let activeOperator = false;

buttons.forEach((button) => button.addEventListener('click', (e) => {
    displaySecondRow.textContent = displaySecondRow.textContent + e.target.textContent;
    secondRow = displaySecondRow.textContent;
    activeOperator = false;
    }
))
 
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
    }))

const equals = document.querySelector('#equal-button');
equals.addEventListener('click', () => {
    displayFirstRow.textContent = firstRow + operator + secondRow;
    displaySecondRow.textContent = operate(firstRow, operator, secondRow);
    activeOperator = false;
    }
);

const clear = document.querySelector('#clear');
clear.addEventListener('click', () => {
    firstRow = null;
    operator = null;
    secondRow = null;
    activeOperator = false;
    displaySecondRow.textContent = '';
    displayFirstRow.textContent = '';
});