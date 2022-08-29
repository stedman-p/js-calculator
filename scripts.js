function add(addend1, addend2) {
    // console.log(`adding ${addend1} to ${addend2}`)
    return parseInt(addend1) + parseInt(addend2);
}

function subtract(minuend, subtrahend) {
    // console.log(`subtracting ${subtrahend} from ${minuend}`)
    return parseInt(minuend) - parseInt(subtrahend);
}

function multiply(multiplicand, multiplier) {
    // console.log(`multiplying ${multiplicand} by ${multiplier}`)
    return parseInt(multiplicand) * parseInt(multiplier);
}

function divide(dividend, divisor) {
    // console.log(`dividing ${dividend} by ${divisor}`)
    return parseInt(dividend) / parseInt(divisor);
}

function isOperator(value) {
    switch (value) {
        case '+':
        case '-':
        case '*':
        case '/':
            return true;
        default:
            return false;
    }
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

function updateDisplay(stringValue, isCharAnOperator = false) {
    // don't append an operator to another operator
    if (isCharAnOperator && isOperator(display.textContent[display.textContent.length - 2])) {
        return;
    }
    if (isCharAnOperator) {
        display.textContent += ' ' + stringValue + ' ';
    }
    else {
        if (display.textContent === '0')
            display.textContent = stringValue
        else
            display.textContent += stringValue;
    }
}

function clearDisplay() {
    display.textContent = '0'
}

function evaluateDisplay() {
    if (isOperator(display.textContent[display.textContent.length - 2])) {
        return;
    }
    theroot = buildExpressionTree(display.textContent.replace(/\s/g, ''))
    console.log(evaluateExpressionTree(theroot))
}

class expressionNode {
    constructor(data = null, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

function isLeaf(Node) {
    if (!Node.left | !Node.right)
        return true;
    else
        return false;
}

// returns root of tree

function buildExpressionTree(exprString) {
    // find last occurance of + or - first, else * or /
    let opIndex = exprString.lastIndexOf('+')
    if (opIndex === -1)
        opIndex = exprString.lastIndexOf('-')
    if (opIndex === -1)
        opIndex = exprString.lastIndexOf('/')
    if (opIndex === -1)
        opIndex = exprString.lastIndexOf('*')
    if (opIndex === -1) { // no operators indicates leaf
        const newNode = new expressionNode(exprString);
        // console.log('found leaf')
        return newNode;
    }

    const leftside = exprString.slice(0, opIndex);
    const rightside = exprString.slice(opIndex + 1);

    // console.log('exprstr:"' + exprString + '"')
    // console.log('index:' + opIndex)
    // console.log('operator:' + exprString[opIndex])
    // console.log('leftside:' + leftside)
    // console.log('rightside:' + rightside);

    if (leftside && rightside) {
        newNode = new expressionNode(exprString[opIndex], buildExpressionTree(leftside), buildExpressionTree(rightside))
        return newNode;
    }
    else if (leftside && !rightside) {
        newNode = new expressionNode(exprString[opIndex], buildExpressionTree(leftside), null)
        return newNode;
    }
    else if (!leftside && rightside) {
        newNode = new expressionNode(exprString[opIndex], null, buildExpressionTree(rightside))
        return newNode;
    }
}

function evaluateExpressionTree(exprNode) {
    // base condition - leaves are numbers
    if (!isNaN(exprNode.data)) {
        return exprNode.data;
    }

    else {
        return operate(exprNode.data, evaluateExpressionTree(exprNode.left), evaluateExpressionTree(exprNode.right));
    }

}

let displayString = "0"

const display = document.querySelector('#display')

display.textContent = displayString

const numberButtons = document.querySelectorAll('.calc-button');
const operatorButtons = document.querySelectorAll('.calc-operator');
const clearButton = document.querySelector("#clearbtn");
const evaluateButton = document.querySelector("#evaluatebtn");

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

clearButton.addEventListener("click", clearDisplay)

evaluateButton.addEventListener("click", evaluateDisplay)
