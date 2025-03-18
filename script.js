const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');

const figureSelect = document.getElementById('figure');
const circleControls = document.getElementById('circle-controls');
const squareControls = document.getElementById('square-controls');
const polygonControls = document.getElementById('polygon-controls');

const radiusInput = document.getElementById('radius');
const radiusValueSpan = document.getElementById('radius-value');
const sideInput = document.getElementById('side');
const sideValueSpan = document.getElementById('side-value');
const sidesInput = document.getElementById('sides');
const sidesValueSpan = document.getElementById('sides-value');
const polygonRadiusInput = document.getElementById('polygon-radius');
const polygonRadiusValueSpan = document.getElementById('polygon-radius-value');

let currentFigure = 'circle';
let circleRadius = 100;
let squareSide = 150;
let polygonSides = 6;
let polygonRadius = 80;

function drawCircle() {
 ctx.clearRect(0, 0, canvas.width, canvas.height);
 ctx.beginPath();
 ctx.arc(canvas.width / 2, canvas.height / 2, circleRadius, 0, 2 * Math.PI);
 ctx.fillStyle = 'lightblue';
 ctx.fill();
 ctx.stroke();
}

function drawSquare() {
 ctx.clearRect(0, 0, canvas.width, canvas.height);
 const x = canvas.width / 2 - squareSide / 2;
 const y = canvas.height / 2 - squareSide / 2;
 ctx.fillStyle = 'lightgreen';
 ctx.fillRect(x, y, squareSide, squareSide);
 ctx.strokeRect(x, y, squareSide, squareSide);
}

function drawPolygon() {
 ctx.clearRect(0, 0, canvas.width, canvas.height);
 const centerX = canvas.width / 2;
 const centerY = canvas.height / 2;
 const angle = 2 * Math.PI / polygonSides;

 ctx.beginPath();
 for (let i = 0; i < polygonSides; i++) {
  const x = centerX + polygonRadius * Math.cos(i * angle - Math.PI / 2);
  const y = centerY + polygonRadius * Math.sin(i * angle - Math.PI / 2);
  if (i === 0) {
   ctx.moveTo(x, y);
  } else {
   ctx.lineTo(x, y);
  }
 }
 ctx.closePath();
 ctx.fillStyle = 'lightcoral';
 ctx.fill();
 ctx.stroke();
}

function updateFigure() {
 if (currentFigure === 'circle') {
  drawCircle();
 } else if (currentFigure === 'square') {
  drawSquare();
 } else if (currentFigure === 'polygon') {
  drawPolygon();
 }
}

figureSelect.addEventListener('change', (event) => {
 currentFigure = event.target.value;
 circleControls.style.display = 'none';
 squareControls.style.display = 'none';
 polygonControls.style.display = 'none';

 if (currentFigure === 'circle') {
  circleControls.style.display = 'block';
  updateFigure();
 } else if (currentFigure === 'square') {
  squareControls.style.display = 'block';
  updateFigure();
 } else if (currentFigure === 'polygon') {
  polygonControls.style.display = 'block';
  updateFigure();
 }
});

radiusInput.addEventListener('input', (event) => {
 circleRadius = parseInt(event.target.value);
 radiusValueSpan.textContent = circleRadius;
 drawCircle();
});

sideInput.addEventListener('input', (event) => {
 squareSide = parseInt(event.target.value);
 sideValueSpan.textContent = squareSide;
 drawSquare();
});

sidesInput.addEventListener('input', (event) => {
 polygonSides = parseInt(event.target.value);
 sidesValueSpan.textContent = polygonSides;
 drawPolygon();
});

polygonRadiusInput.addEventListener('input', (event) => {
 polygonRadius = parseInt(event.target.value);
 polygonRadiusValueSpan.textContent = polygonRadius;
 drawPolygon();
});

// Начальная отрисовка
drawCircle();
