function roundToFive(num) {
  const factor = 10 ** 5;
  return Math.round(num * factor) / factor;
}

function add(num1, num2){
    return roundToFive(Number(num1) + Number(num2));
}

function subtract(num1, num2){
    return roundToFive(Number(num1) - Number(num2));
}

function multiply(num1, num2){
    return roundToFive(Number(num1) * Number(num2));
}

function divide(num1, num2){
    return roundToFive(Number(num1) / Number(num2));
}

let num1;
let operator = '';
let num2;
let hasError = false;
let finished = false;

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
let digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];
let numbers = [];

button.forEach(button => {
    button.addEventListener('click', (e) => {
        if(e.target.textContent == 'AC'){
            hasError = false;
            finished = false;
            numbers = [];
            display.replaceChildren();
            operator = '';
        }

        else if(e.target.textContent == 'C'){
            if(display.lastChild.classList.contains('final')){
                finished = false;
                hasError = false;
                numbers = [];
                display.replaceChildren();
                operator = '';
            }

            else{
                numbers.pop();
                display.removeChild(display.lastChild);
                operator = '';
            }
        }

        let clicked = document.createElement('p');
        clicked.textContent = e.target.textContent;

        if(digits.includes(e.target.textContent)){
            if(finished || hasError){
                hasError = false;
                numbers = [e.target.textContent];
                display.replaceChildren();
                display.appendChild(clicked);
                operator = '';
            }

            else{
                numbers.push(e.target.textContent);
                display.appendChild(clicked);
            }
        }

        if(operators.includes(e.target.textContent)){
            finished = false;
            if(hasError) return;

            if(numbers.length == 0){
                let firstNumber = document.createElement('p');
                firstNumber.textContent = '0';
                numbers.push(firstNumber.textContent);
                display.appendChild(firstNumber);
                operator = e.target.textContent;
                numbers.push(e.target.textContent);
                display.appendChild(clicked);
            }

            else if(operator == ''){
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

            else if(display.lastChild.classList.contains('final')){
                numbers = [display.lastChild.textContent];
                operator = e.target.textContent;
                numbers.push(operator);

                let answerElement = document.createElement('p');
                answerElement.textContent = display.lastChild.textContent;
                display.replaceChildren();
                display.appendChild(answerElement);

                clicked.textContent = operator;
                display.appendChild(clicked);
            }

            else if(digits.includes(numbers[numbers.length - 1])){
                for(let i = 0; i < numbers.length - 1; i++){
                    if(operators.includes(numbers[i])){
                        num1 = numbers.slice(0, i).join('');
                        num2 = numbers.slice(i + 1).join('');
                    }
                }

                if(num2 == ''){
                        num2 = 0;
                }

                if(operator == '÷' && num2 == 0){
                    numbers = [];
                    display.replaceChildren();
                    let errorMessage = document.createElement('p');
                    errorMessage.textContent = "Undefined";
                    display.appendChild(errorMessage); 
                    hasError = true;
                }

                else{
                    let answer = (operate(operator, num1, num2)).toString();
                    numbers = [answer];
                    operator = e.target.textContent;
                    numbers.push(operator);

                    let answerElement = document.createElement('p');
                    answerElement.textContent = answer;
                    display.replaceChildren();
                    display.appendChild(answerElement);

                    clicked.textContent = operator;
                    display.appendChild(clicked);
                }
            }
        }

        if(e.target.textContent == '='){
            if(display.lastChild.classList.contains('final')){
                finished = true;
            }

            else{
                let finalAnswer = document.createElement('p');
                finalAnswer.classList.add("final");

                for(let i = 0; i < numbers.length - 1; i++){
                    if(operators.includes(numbers[i])){
                        num1 = numbers.slice(0, i).join('');
                        num2 = numbers.slice(i + 1).join('');
                    }
                }

                if(num2 == ''){
                    num2 = 0;
                }

                if(operator == '÷' && num2 == 0){
                    numbers = [];
                    display.replaceChildren();
                    let errorMessage = document.createElement('p');
                    errorMessage.textContent = "Undefined";
                    display.appendChild(errorMessage); 
                    hasError = true;
                }

                else{
                    finalAnswer.textContent = operate(operator, num1, num2).toString();
                    display.appendChild(finalAnswer);
                    finished = true;
                }
            }
        };
    })
});





