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
buttons.forEach((button) => button.addEventListener('click', (e) => {
    if (finished === true) {
        displaySecondRow.textContent = '';
        displayFirstRow.textContent = '';
        finished = false;
    }
    displaySecondRow.textContent = displaySecondRow.textContent + e.target.textContent;
    secondRow = displaySecondRow.textContent;
    }
))
 
const actions = document.querySelectorAll('.last-button');
actions.forEach((action) => action.addEventListener('click', (e) => {
    if (firstRow !== null) {
            displayFirstRow.textContent = operate(firstRow, operator, secondRow);
            operator = e.target.textContent;
        } else {
            firstRow = secondRow;
            operator = e.target.textContent;
        }
    displayFirstRow.textContent = firstRow + operator;
    displaySecondRow.textContent = '';
    }))

let finished = false;

const equals = document.querySelector('#equal-button');
equals.addEventListener('click', () => {
    displayFirstRow.textContent = firstRow + operator + secondRow;
    displaySecondRow.textContent = operate(firstRow, operator, secondRow);
    finished = true;
    }
);







// zobrazit cele cislo
// po stisknuti jineho tlacitka (krome desetinne carky) 
//      nez cislo zobrazit toto cislo a znamenko v radku nad
// 