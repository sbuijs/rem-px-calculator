'use strict';

let inputNumber;
let px;
let rem;
let isCalcPxToRem = true;

let calcButton = document.getElementById("calculate-it");
let inputField = document.getElementById("calculate-input");
let isPxRemToggle = document.getElementById("calculate-px-or-rem");
let pixelsOrRem = document.getElementById("pixels-or-rem");
let result = document.getElementById("result");
let copiedToClipboard = document.getElementById("copied");
let restart = document.getElementById("restart");


function getInput() {
    //if the input field is not empty save the px else give an alert
    if (inputField.value.length != 0) {
        inputNumber = Number(document.getElementById("calculate-input").value);
        return true;

    } else {
        alert(`please add a number`);
        return false;
    };
};

function doCalc(inputNumber) {
    if (isCalcPxToRem === true) {
        rem = inputNumber / 16;
        result.textContent = `${rem}rem`;
        return rem;
    } else if (isCalcPxToRem === false) {
        px = inputNumber * 16;
        result.textContent = `${px}px`;
        return px;
    };
};

isPxRemToggle.addEventListener('click', function () {
    // console.log(isCalcPxToRem);
    if (isCalcPxToRem === true) {
        isPxRemToggle.textContent = `Switch to calc Rem`;
        pixelsOrRem.textContent = `Amount of Rem:`;
        isCalcPxToRem = false;
    } else {
        isPxRemToggle.textContent = `Switch to calc PX`;
        pixelsOrRem.textContent = `Amount of Pixels: `;
        isCalcPxToRem = true;
    };
    reset();
});


function CopyToClipboard() {
    var r = document.createRange();
    r.selectNode(document.getElementById("result"));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(r);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    copiedToClipboard.classList.remove("hidden");
};

//form fields
// function copyToClipboard(str: String) {
//     var el = document.createTextAreaElement();
//     el.value = str;
//     el.setAttribute('readonly', '');
//     el.style.position = 'absolute';
//     el.style.left = '-9999px';
//     document.body.appendChild(el);
//     el.select();
//     document.execCommand('copy');
//     document.body.removeChild(el);
// };



function showResult() {
    result.classList.remove("hidden");
    restart.classList.remove("hidden");
};


function doEverything() {
    //save px input as a number
    getInput();
    if (getInput() === true) {
        //calc px to rem and pass the amount of px of the input
        doCalc(inputNumber);
        //copy the result to the clipboard
        showResult();
        CopyToClipboard();
    }
    else {
        //remove the result
        reset();
        //reset the focus into the inputfield
        inputField.focus();
    }
};


function reset() {
    copiedToClipboard.classList.add("hidden");
    result.classList.add("hidden");
    restart.classList.add("hidden");
    inputField.focus();
}

document.addEventListener('keyup', function (event) {
    let key = event.key || event.keyCode;
    if (key === 'r' || key === 82) {
        inputField.value = '';
        inputField.focus();
        reset();
        restart.classList.add("hidden");
    };
});


//https://devstephen.medium.com/keyboardevent-key-for-cross-browser-key-press-check-61dbad0a067a
document.addEventListener('keyup', function (event) {
    let key = event.key || event.keyCode;
    if (key === 'Enter' || key === 13) {
        //remove the focus on the input otherwise it will run the function, but not copy the result
        document.activeElement.blur();
        //click the calculate-it button
        doEverything();
        // document.getElementById('calculate-it').click();
    };
});


//wanneer de gebruiker op enter klikt moet hij het ook doen.
// document.getElementById('calculate-it').addEventListener('click', function () {
//     doEverything();
// });

