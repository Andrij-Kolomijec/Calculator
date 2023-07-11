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
    if (operator === "÷" && secondRow === "0") displaySecondRow.textContent = "Division by zero, MORON!";
    if (displayFirstRow.textContent.includes(null)) displaySecondRow.textContent = "Nothing there!";
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
    let key = e.key;
    switch (key) {
        case 'Escape':
          clear();
          break;
        case 'Backspace':
          deleteLastInput();
          break;
      }
    if ((key >= 0 && key<= 9) || (key === '.')) {
        if (finished === true) clear();
        if (key === '.') {
            if (displaySecondRow.textContent.includes('.')) {
                displaySecondRow.textContent = displaySecondRow.textContent;
            } else {
                displaySecondRow.textContent = displaySecondRow.textContent + key;
                secondRow = displaySecondRow.textContent;
                activeOperator = false;
                finished = false; 
            }
        } else {
            displaySecondRow.textContent = displaySecondRow.textContent + key;
            secondRow = displaySecondRow.textContent;
            activeOperator = false;
            finished = false;  
        }
    } else if (key === '*' || key === '/' || key === '+' || key === '-') {
        if (key === '*') key = '×';
        if (key === '/') {
            key = '÷';
            e.preventDefault(); // prevents default behavior (toggle find) in firefox
        }
        if (activeOperator === true) {
            operator = key;
            secondRow = firstRow;
        }
        if (firstRow !== null && activeOperator === false) {
            firstRow = operate(firstRow, operator, secondRow);
            displayFirstRow.textContent = firstRow;
            operator = key;
            activeOperator = true;
        } else {
            firstRow = secondRow;
            operator = key;
            activeOperator = true;
        }
        displayFirstRow.textContent = firstRow + operator;
        displaySecondRow.textContent = '';
        finished = false;
        if (operator === "÷" && secondRow === "0") displaySecondRow.textContent = "Division by zero, MORON!";
        if (displayFirstRow.textContent.includes(null)) displaySecondRow.textContent = "Nothing there!";
    } else if (key === '=' || key === 'Enter') {
        e.preventDefault();
        finishOperation();
    }
}
