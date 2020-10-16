const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

function sendNumberValue(number){
    // if the current display value is 0, replace it , if not add number

    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent = displayValue === '0' ? number : displayValue+number;
}

// Add Event Listners for number,operators,decimal buttons
inputBtns.forEach((inputBtn) =>{
    if(inputBtn.classList.length === 0){
        inputBtn.addEventListener('click',() => sendNumberValue(inputBtn.value))
    }else if(inputBtn.classList.contains('operator')){
        inputBtn.addEventListener('click',() => sendNumberValue(inputBtn.value))
    }else if(inputBtn.classList.contains('decimal')){
        inputBtn.addEventListener('click',() => sendNumberValue(inputBtn.value))
    }
});

// clear number display box
function clearBox(){
    calculatorDisplay.textContent = '0';
}

clearBtn.addEventListener('click',clearBox);