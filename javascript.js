let displayVal = "";
let display = document.querySelector(".current");
let secondary = document.querySelector(".secondary");
let operator = "";
let previousCalc = "";

function updateDisplay(){
    display.innerHTML=displayVal;
    secondary.innerHTML = previousCalc + " " + operator;
}

function add(a,b){
    return a+b;
}

function subtract(a,b){
    return a-b;
}

function multiply(a,b){
    return a*b;
}

function divide(a,b){
    return a/b;
}

function operate(x, ope, y){
    let a = Number(x);
    let b = Number(y);
    switch(ope){
        case "+":
            return add(a,b)
            break;
        case "-":
            return subtract(a,b)
            break;
        case "∗":
            return multiply(a,b)
            break;
        case "÷":
            return divide(a,b)
            break;
        default:
            return 0;
    }
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

let numberButtons = Array.from(document.querySelectorAll(".numberButton"));
let operatorButtons = Array.from(document.querySelectorAll(".operatorButton"));
let clearButton = document.querySelector(".clearButton");
let deleteButton = document.querySelector(".deleteButton");
let percentButton = document.querySelector(".percentButton");
let equalsButton = document.querySelector(".equalsButton");
let invertButton = document.querySelector(".invertButton");

clearButton.addEventListener('click', ()=> {
    displayVal = "";
    previousCalc = "";
    operator = "";
    updateDisplay();
});

percentButton.addEventListener('click', ()=> {
    displayVal = String(Number(displayVal)/100);
    updateDisplay();
});

deleteButton.addEventListener('click', ()=> {
    displayVal = displayVal.slice(0,-1);
    updateDisplay();
})

equalsButton.addEventListener('click', ()=> {
    if(operator!==""){
        displayVal = operate(previousCalc,operator,displayVal);
        operator = ""   ;
        previousCalc = "";
        updateDisplay();
    }
    displayVal = String(displayVal);
})

invertButton.addEventListener('click', ()=> {
    displayVal = String(Number(displayVal) * -1)
    updateDisplay();
})

numberButtons.forEach(button => button.addEventListener('click', ()=> {
    if(!(displayVal.indexOf(".")!== -1 && button.innerHTML === "." || displayVal === "" && button.innerHTML === 0)){
        displayVal+=button.innerHTML;
        console.log(button.innerHTML);
    } else if (displayVal===0){
        displayVal===""+button.innerHTML;
    }
    updateDisplay();
}));

operatorButtons.forEach(button => button.addEventListener('click', ()=> {

    if(operator!=="" && previousCalc !=="" & displayVal!==""){
        previousCalc = operate(previousCalc,operator,displayVal);
        displayVal = "";
    }

    if (displayVal!==""){
        //if display is not empty, change operator
        //and move the display value to the secondary display
        operator = button.innerHTML;
        previousCalc = displayVal;
        displayVal = "";
    } else if (operator!==""){
        //if display is empty but secondary display is not empty
        //set operator to new operator
        operator = button.innerHTML;
    }

    updateDisplay();


}));

