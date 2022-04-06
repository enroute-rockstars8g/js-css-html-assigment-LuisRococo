const elmBlackOut = document.getElementById('black-out');
const elmPopUpTitle = document.getElementById('pop-up-title');
const elmPopUpImgcont = document.getElementById('pop-up-img-cont');
const elmPopUpResult = document.getElementById('pop-up-result');

const elmInputFibo = document.getElementById('input-fibo');
const elmInputFactorial = document.getElementById('input-factorial');

// Animation Result Variables
let remainingDigits = '';
const resultAnimationSpeed = 200;
const starImageElement = createStarImgNode();
let resultAnimInterval = null;
let actualNumber = 0;
let starsPut = 0;

function calculateFibo() {
    const maxParamValue = 100;
    if (isCaritaEmpapada(elmInputFibo.value)) {
        window.open("https://www.youtube.com/watch?v=enup62u1LEk", "_blank");
        return;
    }
    if (elmInputFibo.value.length === 0 || isNaN(elmInputFibo.value)) {
        alert('Write a quantity');
        return;
    }
    let positionToSearch = parseInt(elmInputFibo.value);

    if (positionToSearch <= 0 || positionToSearch > maxParamValue) {
        alert(`High or negative values are not accepted lol\nMax value is ${maxParamValue}`);
        return;
    }

    const result = getResultFibonacci(positionToSearch);
    startResultAnimation(result, 'Fibonacci');
    showPopUp();
}


function isCaritaEmpapada (value) {
    value = value.toLowerCase();
    return (value === 'carita empapada');
}

function calculateFactorial() {
    const maxParamValue = 20;
    if (isCaritaEmpapada(elmInputFibo.value)) {
        window.open("https://www.youtube.com/watch?v=enup62u1LEk", "_blank");
        return;
    }
    if (elmInputFactorial.value.length === 0 || isNaN(elmInputFibo.value)) {
        alert('Write a quantity');
        return;
    }
    let valueToCalculate = parseInt(elmInputFactorial.value);

    if (valueToCalculate < 0 || valueToCalculate > maxParamValue) {
        alert(`High or negative values are not accepted lol\nMax value is ${maxParamValue}`);
        return;
    }

    const result = getResultFactorial(valueToCalculate);
    startResultAnimation(result, 'Factorial');
    showPopUp();
}

function cancelResultAnimation() {
    if (resultAnimInterval) {
        clearInterval(resultAnimInterval);
    }
}

function getResultFibonacci(position) {
    let aValue = 0;
    let bValue = 1;
    let aux;
    let index = 2;
    let result = 0;

    if (position === 1) {
        return 0;
    } else if (position === 2) {
        return 1;
    }

    while (index < position) {
        aux = aValue + bValue;
        aValue = bValue;
        bValue = aux;
        index++;
    }

    result = aux;
    return result;
}

function getResultFactorial(number) {
    let result = number;
    while (number > 1) {
        number--;
        result *= number;
    }
    return result;
}

function startResultAnimation(result, title) {
    elmPopUpTitle.innerHTML = title;
    elmPopUpImgcont.innerHTML = '';
    remainingDigits = result.toString();
    elmPopUpResult.innerHTML = '';
    starsPut = 0;

    newDigit = remainingDigits.charAt(0);
    actualNumber = parseInt(newDigit);
    remainingDigits = remainingDigits.slice(1, remainingDigits.length);

    resultAnimInterval = window.setInterval(() => {

        if (starsPut < actualNumber) {
            const imgElemClone = starImageElement.cloneNode(true);
            elmPopUpImgcont.appendChild(imgElemClone);
            starsPut++;
        } else {
            if (remainingDigits.length === 0) {
                cancelResultAnimation();
            }
                elmPopUpResult.innerText += newDigit;
                newDigit = remainingDigits.charAt(0);
                starsPut = 0;
                actualNumber = parseInt(newDigit);
                remainingDigits = remainingDigits.slice(1, remainingDigits.length);
                elmPopUpImgcont.innerHTML = '';
        }

    }, resultAnimationSpeed);
}

function showPopUp() {
    elmBlackOut.classList.remove('hidden');
}

function hidePopUp() {
    elmBlackOut.classList.add('hidden');
}

function closePopUp() {
    cancelResultAnimation();
    hidePopUp();
}

function createStarImgNode() {
    const img = document.createElement('img');
    img.src = '/img/626px-Black_star.png';
    img.classList.add('pop-up__star-img');
    return img;
}

function redirect () {
    window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");
}