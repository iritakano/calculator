function add(num1, num2){
    return Number(num1) + Number(num2);
}

function subtract(num1, num2){
    return Number(num1) - Number(num2);
}

function multiply(num1, num2){
    return Number(num1) * Number(num2);
}

function divide(num1, num2){
    return Number(num1) / Number(num2);
}

let num1;
let operator = '';
let num2;

function operate(operator, num1, num2){
    if(operator == '+'){
        add(num1, num2);
    }
    else if(operator == '-'){
        subtract(num1, num2);
    }
    else if(operator == 'x'){
        multiply(num1, num2);
    }
    else if(operator == '÷'){
        divide(num1, num2);
    }
}

let button = document.querySelectorAll('button');
let display = document.querySelector('.display');

let operators = ['+', '-', 'x', '÷'];
let digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
let numbers = [];

button.forEach(button => {
    button.addEventListener('click', (e) => {
        let clicked = document.createElement('p');
        clicked.textContent = e.target.textContent;

        if(digits.includes(e.target.textContent)){
            numbers.push(e.target.textContent);
            display.appendChild(clicked);
        }

        if(operators.includes(e.target.textContent)){
            if(operator != ''){
                numbers.pop();
                display.removeChild(display.lastChild);
            }

            operator = e.target.textContent;
            numbers.push(e.target.textContent);
            display.appendChild(clicked);            
        }

        if(e.target.textContent == '='){
            numbers.forEach(button => {
                if(operators.includes(button)){
                let operator_index = numbers.indexOf(button);

                num1 = numbers.slice(0, operator_index).join('');
                num2 = numbers.slice(operator_index + 1).join('');
                if(num2 == ''){
                    num2 = 0;
                }

                console.log(operator);
                console.log("num11", num1);
                console.log("num2", num2);
                }
            })
        }
    })
});





