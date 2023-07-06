function add(a, b) {
    return a + b
}

function subtract(a, b) {
    return a - b
}

function multiply(a, b) {
    return a * b
}

function divide(a, b) {
    return a / b
}

let firstRow = null;
let operator = null;
let secondRow = null;

function operate(a, operator, b) {
    if (operator === "+") {
        return add(a, b)
    } else if (operator === "-") {
        return subtract(a, b)
    } else if (operator === "*") {
        return multiply(a, b)
    } else if (operator === "/") {
        return divide(a, b)
    }
}

const displayFirstRow = document.querySelector('#display-first-row');
const displaySecondRow = document.querySelector('#display-second-row');
const buttons = document.querySelectorAll('button');
buttons.forEach((button) => button.addEventListener('click', (e) => displaySecondRow.textContent = displaySecondRow.textContent + e.target.textContent))
 
const actions = document.querySelectorAll('.last-button');
actions.forEach((action) => action.addEventListener('click', (e) => {
    
    displayFirstRow.textContent = displayFirstRow.textContent + displaySecondRow.textContent;
    displaySecondRow.textContent = '';
    }))

const equals = document.querySelector('#equal-button');
equals.addEventListener('click', )







// zobrazit cele cislo
// po stisknuti jineho tlacitka (krome desetinne carky) 
//      nez cislo zobrazit toto cislo a znamenko v radku nad
// 