let display = document.getElementById('display');
let resetDisplay = false;

function appendNumber(number) {
    if (resetDisplay) {
        display.value = '';
        resetDisplay = false;
    }
    display.value += number;
}

function appendOperator(operator) {
    if (resetDisplay) {
        resetDisplay = false;
    }
    display.value += operator;
}

function clearDisplay() {
    display.value = '';
}

function backspace() {
    display.value = display.value.slice(0, -1);
}

function calculateResult() {
    try {
        display.value = eval(display.value);
        resetDisplay = true;
    } catch {
        display.value = 'Error';
    }
}
