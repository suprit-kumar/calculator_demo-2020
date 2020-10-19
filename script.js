const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

// Calculate first and second values depending on operator
const calculate = {
    '/': (firstNumber, secondNumber) => firstNumber / secondNumber,

    '*': (firstNumber, secondNumber) => firstNumber * secondNumber,

    '+': (firstNumber, secondNumber) => firstNumber + secondNumber,

    '-': (firstNumber, secondNumber) => firstNumber - secondNumber,

    '=': (firstNumber, secondNumber) => secondNumber,
}



let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;


function sendNumberValue(number){
        //   Replace current display value if first value entered
    if(awaitingNextValue===true){
        calculatorDisplay.textContent = number;
        awaitingNextValue=false;
    }else{
        // if the current display value is 0, replace it , if not add number

        const displayValue = calculatorDisplay.textContent;
        calculatorDisplay.textContent = displayValue === '0' ? number : displayValue+number;
    }
}

function addDecimal(){
    // if operator pressed don't add decimal
    if(awaitingNextValue === true) return;
    // if no decimal,add one
    if (!calculatorDisplay.textContent.includes('.')){
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    }
}

function useOperator(operator){
    const currentValue = Number(calculatorDisplay.textContent);
    // Prevent multiple operators
    if(operatorValue && awaitingNextValue){
        operatorValue = operator;
        return;
    } 
    // assign first value if no value
    if(!firstValue){
        firstValue = currentValue;
    }else{
        // console.log(firstValue,operatorValue,currentValue);
        const calculation = calculate[operatorValue](firstValue,currentValue);
        calculatorDisplay.textContent = calculation;
        // console.log('calculation',calculation);
        firstValue = calculation;
    }
    // Ready for next value , store operator
    awaitingNextValue = true;
    operatorValue = operator;
}


// clear all values, display
function clearDisplay(){
     firstValue = 0;
     operatorValue = '';
     awaitingNextValue = false;
    calculatorDisplay.textContent = '0';
}


// Add Event Listners for number,operators,decimal buttons
inputBtns.forEach((inputBtn) =>{
    if(inputBtn.classList.length === 0){
        inputBtn.addEventListener('click',() => sendNumberValue(inputBtn.value))
    }else if(inputBtn.classList.contains('operator')){
        inputBtn.addEventListener('click',() => useOperator(inputBtn.value))
    }else if(inputBtn.classList.contains('decimal')){
        inputBtn.addEventListener('click',() => addDecimal())
    }
});



clearBtn.addEventListener('click',clearDisplay);

// document.onkeypress = function (e) {
//     keyPressed = String.fromCharCode(e.which);  
//     const checkInput = ['0','1','2','3','4','5','6','7','8','9','.'] ; 

//     if(checkInput.includes(keyPressed)){
//         sendNumberValue(keyPressed);
//     }
// };