const canvas = document.getElementById("my-canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 1;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Triangle Top
const triangleTop = new Point(window.innerWidth / 2, 50);
triangleTop.draw();

// Triangle Bottom Left
const triangleBottomLeft = new Point(50, window.innerHeight - 50);
triangleBottomLeft.draw();

// Triangle Bottom Left
const triangleBottomRight = new Point(
  window.innerWidth - 50,
  window.innerHeight - 50
);
triangleBottomRight.draw();

const triangle = [triangleTop, triangleBottomLeft, triangleBottomRight];

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const drawRest = (prevPoint) => {
  let randomCorner, middlePoint;

  for (let i = 0; i < 100000; i++) {
    // Pick Random Corner
    randomCorner = triangle[getRandomInt(0, 3)];

    // Find Middle Point
    middlePoint = new Point(
      (prevPoint.x + randomCorner.x) / 2,
      (prevPoint.y + randomCorner.y) / 2
    );
    middlePoint.draw();
    prevPoint = middlePoint;
  }
};

canvas.addEventListener(
  "click",
  function (event) {
    const firstPoint = new Point(event.x, event.y);
    firstPoint.draw();
    drawRest(firstPoint);
  },
  { once: true }
);
