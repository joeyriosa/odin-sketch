const containerWidth = 400;
let boxesPerLine = 16;
let boxWidth = 25;

const container = document.querySelector('#container');
const btnClear = document.querySelector('#btnClear');
const chkColor = document.querySelector('#chkColor');
const chkProgressive = document.querySelector('#chkProgressive');

let isMousePressed = false;

function drawBox() {
    let smallBox = document.createElement('div');
    smallBox.classList.add('smallBox');
    boxWidth = containerWidth / boxesPerLine;
    smallBox.style.width = boxWidth + 'px';
    smallBox.style.height = boxWidth + 'px';
    smallBox.style.backgroundColor = 'white';

    smallBox.addEventListener('mousedown', (event) => {
        event.preventDefault();
        isMousePressed = true;
        getOpacity(smallBox);
        let colorToUse = getColorToUse(smallBox);
        smallBox.style.backgroundColor = colorToUse;
    });

    smallBox.addEventListener('mouseenter', (event) => {
        if (isMousePressed && event.buttons === 1) {
            getOpacity(smallBox);
            let colorToUse = getColorToUse(smallBox);
            smallBox.style.backgroundColor = colorToUse;
        }
    });

    document.addEventListener('mouseup', () => {
        isMousePressed = false;
    });

    container.appendChild(smallBox);
}

function getColorToUse(smallBox) {
    if (chkColor.checked) {
        // If Progressive, use the current color of the box.
        if (chkProgressive.checked) {
            let computedStyle = window.getComputedStyle(smallBox);
            if (computedStyle.backgroundColor.toLowerCase() != 'rgb(255, 255, 255)') {
                return computedStyle.backgroundColor;
            }
        }

        let red = Math.floor(Math.random() * 256);
        let green = Math.floor(Math.random() * 256);
        let blue = Math.floor(Math.random() * 256);
        var returnValue = "rgb(" + red + "," + green + "," + blue + ")";
        return returnValue;
    }
    else {
        return 'black';
    }
}

function getOpacity(smallBox) {
    if (chkProgressive.checked) {
        let computedStyle = window.getComputedStyle(smallBox);
        let currentOpacity = parseFloat(computedStyle.opacity);
        let currentBackgroundColor = computedStyle.backgroundColor;
        if (currentBackgroundColor.toLowerCase() == 'rgb(255, 255, 255)') {
            currentOpacity = 0;
        }
        smallBox.style.opacity = currentOpacity + 0.1;
    }
    else {
        smallBox.style.opacity = 1;
    }
}

function resetColors() {
    var boxes = document.querySelectorAll('.smallBox');
    boxes.forEach(function (box) {
        box.style.backgroundColor = 'white';
        box.style.opacity = 1;
    })
}

function drawBoxes() {
    for (let i = 0; i < boxesPerLine; i++) {
        for (let j = 0; j < boxesPerLine; j++) {
            drawBox();
        }
    }
}

function enterDimension() {
    let result = prompt('Enter a dimension from 1 to 100');
    if (result < 1 || result > 100) {
        alert("You can only enter values from 1 to 100");
        return;
    }

    console.log(result);
    container.innerHTML = '';
    boxesPerLine = result;
    drawBoxes();
}

btnClear.addEventListener('click', () => {
    resetColors();
});

drawBoxes();