function add(addend1, addend2) {
    return addend1 + addend2;
}

function subtract(minuend, subtrahend) {
    return minuend - subtrahend;
}

function multiply(multiplicand, multiplier) {
    return multiplicand * multiplier;
}

function divide(dividend, divisor) {
    return dividend / divisor;
}

function operate(operator, num1, num2) {
    switch (operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '*':
            return multiply(num1, num2)
        case '/':
            return divide(num1, num2)
        default:
            break;
    }
}

function updateDisplay(stringValue, isOperator = false) {
    if (isOperator) {
        display.textContent += ' ' + stringValue + ' ';
    }
    else {
        display.textContent += stringValue;
    }
}

class Calculation {
    constructor(leftExpression = '') {
        this.leftExpression = leftExpression;
        this.operator = '';
        this.rightExpression = '';
    }
    evaluateExpressions() {
        if (!isNaN(this.leftExpression) && !isNaN(this.rightExpression)) {
            operate(this.operator, this.leftExpression, this.rightExpression)
        }
    }
}

let displayString = "5"

const display = document.querySelector('#display')

display.textContent = displayString

const numberButtons = document.querySelectorAll('.calc-button');
const operatorButtons = document.querySelectorAll('.calc-operator');

numberButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        updateDisplay(btn.textContent)
    });
})

operatorButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        updateDisplay(btn.textContent, true)
    })
})