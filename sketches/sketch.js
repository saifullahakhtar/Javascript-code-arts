const canvasSketch = require("canvas-sketch");

const settings = {
  dimensions: [2048, 2048],
  // dimensions: "a4"
};

const sketch = () => {
  let y = 500;
  let velocity = 5;

  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    const rectWidth = width * 0.02;
    const rectHeight = height * 0.2;

    context.fillStyle = "#000";

    for (let i = 0; i < 12; i++) {
      context.beginPath();
      context.rect(100 * i, 100, rectWidth, rectHeight);
      context.fill();
    }

    context.save();

    y += velocity;

    if (y >= 2048 || y <= 0) {
      velocity *= -1; // Bounce
    }

    context.translate(100, 500);
    context.beginPath();
    context.arc(500, y, 20, 0, Math.PI * 2);
    context.fill();

    context.restore();

    context.translate(100, 750);
    context.beginPath();
    context.rotate((30 * Math.PI) / 180);
    context.rect(100, 100, 100, 100);
    context.fill();

    context.restore();
    context.save();

    context.translate(0, 300);
    context.lineWidth = Math.random() * 5;
    for (let i = 0; i < 1000; i++) {
      context.beginPath();
      context.rect(
        Math.random() * 2048,
        Math.random() * 2048,
        Math.random() * 50,
        Math.random() * 50
      );
      context.stroke();
    }

    context.restore();
  };
};

canvasSketch(sketch, settings);
