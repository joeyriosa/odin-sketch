const containerWidth = 400;
let boxesPerLine = 16;
let boxWidth = 25;

const container = document.querySelector('#container');
const btnClear = document.querySelector('#btnClear');

let isMousePressed = false;

function drawBox() {
    let smallBox = document.createElement('div');
    smallBox.classList.add('smallBox');
    boxWidth = containerWidth / boxesPerLine;
    console.log(boxWidth);
    smallBox.style.width = boxWidth + 'px';
    smallBox.style.height = boxWidth + 'px';

    smallBox.addEventListener('mousedown', (event) => {
        event.preventDefault();
        isMousePressed = true;
        smallBox.style.backgroundColor = 'black';
    });

    smallBox.addEventListener('mousemove', (event) => {
        if (isMousePressed && event.buttons === 1) {
            smallBox.style.backgroundColor = 'black';
        }
    });

    document.addEventListener('mouseup', () => {
        isMousePressed = false;
    });

    container.appendChild(smallBox);
}

function resetColors() {
    var boxes = document.querySelectorAll('.smallBox');
    boxes.forEach(function (box) {
        box.style.backgroundColor = 'white';
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