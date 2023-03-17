const canvasSketch = require("canvas-sketch");

const settings = {
  dimensions: [2048, 2048],
  animate: true,
};

class Circle {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.velocityX = Math.random() * 4 - 2; // -2 2
    this.velocityY = Math.random() * 4 - 2;
  }

  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.stroke();
    context.fillStyle = "#fff";
    context.fill();
  }

  move() {
    this.x += this.velocityX;
    this.y += this.velocityY;
  }

  bounce(width, height) {
    if (this.x <= 0 || this.x >= width) {
      this.velocityX *= -1;
    }
    if (this.y <= 0 || this.y >= height) {
      this.velocityY *= -1;
    }
  }
}

const getDistance = (x1, x2, y1, y2) => {
  const a = x1 - x2;
  const b = y1 - y2;
  return Math.sqrt(a * a + b * b);
};

const sketch = () => {
  let circles = [];

  for (let i = 0; i < 100; i++) {
    circles.push(
      new Circle(Math.random() * 2048, Math.random() * 2048, Math.random() * 20)
    );
  }

  return ({ context, width, height }) => {
    context.fillStyle = "#fff";
    context.fillRect(0, 0, width, height);

    context.fillStyle = "#000";
    context.lineWidth = 1;

    for (let i = 0; i < circles.length; i++) {
      const circle1 = circles[i];

      for (let j = 0; j < circles.length; j++) {
        const circle2 = circles[j];

        const dist = getDistance(circle1.x, circle2.x, circle1.y, circle2.y);

        if (dist < 250) {
          context.lineWidth = 10 - dist / 25;
          context.beginPath();
          context.moveTo(circle1.x, circle1.y);
          context.lineTo(circle2.x, circle2.y);
          context.stroke();
        }
      }
    }

    context.lineWidth = 12;
    circles.forEach((circle) => {
      circle.draw(context);
      circle.move();
      circle.bounce(width, height);
    });
  };
};

canvasSketch(sketch, settings);
