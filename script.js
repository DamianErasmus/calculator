const calculator = document.querySelector('.calculator');
const buttons = calculator.querySelector('.buttons');
const screen = document.querySelector('.screen');

const calculate = (n1, operator, n2) => {
    let result = '';

    if (operator === 'add') {
        result = parseFloat(n1) + parseFloat(n2);
    } else if (operator === 'subtract') {
        result = parseFloat(n1) - parseFloat(n2);
    } else if (operator === 'multiply') {
        result = parseFloat(n1) * parseFloat(n2);
    } else if (operator === 'divide') {
        result = parseFloat(n1) / parseFloat(n2);
    }

    return result;
}

buttons.addEventListener('click', e => {
    if (e.target.matches('button')) {
        const key = e.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayedNum = screen.textContent;
        const previousKeyType = calculator.dataset.previousKeyType;

        if (!action) {
            if (
                displayedNum === '0' || 
                previousKeyType === 'operator' ||
                previousKeyType === 'calculate'
            ) {
                screen.textContent = keyContent;
            } else {
                screen.textContent = displayedNum + keyContent;
            }
            calculator.dataset.previousKeyType = 'number';
        }

        if (action === 'reset') {
            calculator.dataset.firstValue = '';
            calculator.dataset.modValue = '';
            calculator.dataset.operator = '';
            calculator.dataset.previousKeyType = '';
            screen.textContent = 0;
            calculator.dataset.previousKeyType = 'reset';
        }

        if (action === 'delete') {
            if (
                displayedNum === '0' ||
                displayedNum.length === 1
            ) {
                screen.textContent = 0;
            } else {
            const editedText = displayedNum.slice(0, -1);
            screen.textContent = editedText;
            }
        }

        if (action === 'decimal') {
            if (!displayedNum.includes('.')) {
            screen.textContent = displayedNum + '.';
            } else if (
                previousKeyType === 'operator' ||
                previousKeyType === 'calculate'
                ) {
                screen.textContent = '0';
            }

            calculator.dataset.previousKeyType = 'decimal';
        }

        if (
            action === 'add' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide'
        ) {
            const firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            const secondValue = displayedNum;

            if (
                firstValue && 
                operator &&
                previousKeyType !== 'operator' &&
                previousKeyType !== 'calculate'
            ) {
                const calcValue = calculate(firstValue, operator, secondValue);
                screen.textContent = calcValue;

                calculator.dataset.firstValue = calcValue;
            } else {
                calculator.dataset.firstValue = displayedNum;
            }

            key.classList.add('is-depressed');
            calculator.dataset.previousKeyType = 'operator';
            calculator.dataset.operator = action;
        }

        Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'));




        if (action === 'calculate') {
            const firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            const secondValue = displayedNum;

            if (firstValue) {
                if (previousKeyType === 'calculate') {
                    firstValue = displayedNum;
                    secondValue = calculator.dataset.modValue;
                }

                screen.textContent = calculate(firstValue, operator, secondValue);
            }

            calculator.dataset.modValue = secondValue;
            calculator.dataset.previousKeyType = 'calculate';
        }

       

    }
});



// change theme from radio buttons
const color1 = document.getElementById("one");
const color2 = document.getElementById("two");
const color3 = document.getElementById("three");

color1.onclick = function () {
    document.getElementById('theme').setAttribute('href', 'css/default.css');
}

color2.onclick = function () {
    document.getElementById('theme').setAttribute('href', 'css/light.css');
}

color3.onclick = function () {
    document.getElementById('theme').setAttribute('href', 'css/dark.css');
}