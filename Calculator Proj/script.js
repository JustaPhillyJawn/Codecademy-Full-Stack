function calculator(num1, num2, operator) {
    if (operator === '+' || operator === 'add') return num1 + num2;
    if (operator === '-' || operator === 'subtract') return num1 - num2;
    if (operator === '*' || operator === 'multiply') return num1 * num2;
    if (operator === '/' || operator === 'divide') {
        if (num2 === 0) {
            throw new Error('Error: Division by zero');
        }
        return num1 / num2;
    }
    throw new Error('Error: Invalid operator');
}

const problems = [
  [10, 5, "add"],
  [10, 5, "subtract"],
  [10, 5, "multiply"],
  [10, 5, "divide"]
];

const [num1, num2, operator] = problems[0];

let result = calculator(num1, num2, operator);

console.log(result);

const display = document.getElementById('display');
const numButtons = document.getElementsByClassName('numberInputs');
const operatorButtons = document.getElementsByClassName('operatorInputs');
const equalsButton = document.getElementByClassName('output');

display.innerText = result;

