let firstRow = null;
let operator = null;
let secondRow = null;
let activeOperator = false;
let finished = false;

const displayFirstRow = document.querySelector('#display-first-row');
const displaySecondRow = document.querySelector('#display-second-row');
const buttons = document.querySelectorAll('.number');
const actions = document.querySelectorAll('.last-button');
const equals = document.querySelector('#equal-button');
const clearButton = document.querySelector('#clear');
const deleteButton = document.querySelector('#delete');

buttons.forEach((button) => button.addEventListener('click', typeNumber));
actions.forEach((action) => action.addEventListener('click', doOperation));
equals.addEventListener('click', finishOperation);
clearButton.addEventListener('click', clear);
deleteButton.addEventListener('click', deleteLastInput);
document.addEventListener('keydown', handleKeyboardInput);

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

function typeNumber(e) {
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
}

function doOperation(e) {
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
}

function finishOperation() {
    if (firstRow !== null) {
        displayFirstRow.textContent = firstRow + operator + secondRow;
        displaySecondRow.textContent = operate(firstRow, operator, secondRow);
        activeOperator = false;
    }
    if (operator === "÷" && secondRow === "0") {
        displaySecondRow.textContent = "Division by zero, MORON!";
    }
    finished = true;
}

function clear() {
    firstRow = null;
    operator = null;
    secondRow = null;
    activeOperator = false;
    finished = false;
    displaySecondRow.textContent = '';
    displayFirstRow.textContent = '';
}

function deleteLastInput() {
    if (finished === false) displaySecondRow.textContent = displaySecondRow.textContent.slice(0, -1);
    secondRow = displaySecondRow.textContent;
}

function handleKeyboardInput(e) {
    const key = e.key;
    switch (key) {
        case '1':
          // Handle pressing the number 1 key
          // Perform the corresponding action
          break;
        case 'Escape':
          // Handle pressing the Escape key
          // Perform the corresponding action
          break;
        // Add more cases for other keys
      }
}
