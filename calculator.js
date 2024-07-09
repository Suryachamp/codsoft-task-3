const display = document.getElementById('display');
const buttons = document.querySelectorAll('.button');

let currentInput = '0';
let operator = null;
let previousInput = null;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const action = button.dataset.action;
        const value = button.textContent;

        switch(action) {
            case 'number':
                handleNumber(value);
                break;
            case 'operator':
                handleOperator(value);
                break;
            case 'decimal':
                handleDecimal();
                break;
            case 'clear':
                clearDisplay();
                break;
            case 'delete':
                deleteLast();
                break;
            case 'equals':
                calculate();
                break;
            default:
                break;
        }
        updateDisplay();
    });
});

function handleNumber(number) {
    if (currentInput === '0') {
        currentInput = number;
    } else {
        currentInput += number;
    }
}

function handleOperator(op) {
    if (operator !== null) {
        calculate();
    }
    previousInput = currentInput;
    currentInput = '0';
    operator = op;
}

function handleDecimal() {
    if (!currentInput.includes('.')) {
        currentInput += '.';
    }
}

function clearDisplay() {
    currentInput = '0';
    operator = null;
    previousInput = null;
}

function deleteLast() {
    currentInput = currentInput.slice(0, -1) || '0';
}

function calculate() {
    if (operator && previousInput !== null) {
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);
        switch(operator) {
            case '+':
                currentInput = (prev + current).toString();
                break;
            case '-':
                currentInput = (prev - current).toString();
                break;
            case '*':
                currentInput = (prev * current).toString();
                break;
            case '/':
                currentInput = (prev / current).toString();
                break;
            default:
                break;
        }
        operator = null;
        previousInput = null;
    }
}

function updateDisplay() {
    display.textContent = currentInput;
}
