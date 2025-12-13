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
        return add(num1, num2);
    }
    else if(operator == '-'){
        return subtract(num1, num2);
    }
    else if(operator == 'x'){
        return multiply(num1, num2);
    }
    else if(operator == '÷'){
        return divide(num1, num2);
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
            if(operator == ''){
                operator = e.target.textContent;
                numbers.push(e.target.textContent);
                display.appendChild(clicked);
            }

            else if(operators.includes(numbers[numbers.length - 1])){
               numbers.pop();
               display.removeChild(display.lastChild);
               operator = e.target.textContent;
               numbers.push(e.target.textContent);
               display.appendChild(clicked);
            }

            else if(digits.includes(numbers[numbers.length - 1])){
                for(let i = 0; i < numbers.length - 1; i++){
                    if(operators.includes(numbers[i])){
                        num1 = numbers.slice(0, i).join('');
                        num2 = numbers.slice(i + 1).join('');
                    }

                    if(num2 == ''){
                        num2 = 0;
                    }
                }

                let answer = (operate(operator, num1, num2)).toString();
                numbers = [];
                display.replaceChildren();
                numbers.push(answer);
                clicked.textContent = answer;
                display.appendChild(clicked);
                let clickedOperator = document.createElement('p');
                clickedOperator.textContent = e.target.textContent;
                numbers.push(clickedOperator.textContent);
                display.appendChild(clickedOperator);
            }
        }

        if(e.target.textContent == '='){
            let finalAnswer = document.createElement('p');
            numbers.forEach(button => {
                if(operators.includes(button)){
                    let operator_index = numbers.indexOf(button);

                    num1 = numbers.slice(0, operator_index).join('');
                    num2 = numbers.slice(operator_index + 1).join('');
                    if(num2 == ''){
                        num2 = 0;
                    }

                    finalAnswer.textContent = operate(operator, num1, num2).toString();
                    display.appendChild(finalAnswer);
                }
            }) 
            
            numbers = undefined;
        };
    })
});





