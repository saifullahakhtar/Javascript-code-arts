const canvas = document.getElementById("my-canvas");
const ctx = canvas.getContext("2d");

const img = new Image();
img.src = "curry.png";

let brightnessArray = [];
let particlesArray = [];
let rgbArray = [];

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = 0;
    this.brightness = 0;
    this.velocity = Math.random() * 3;
    this.radius = Math.random() * 1.5 + 1;
  }

  update() {
    this.y += this.velocity;
    if (this.y >= canvas.height) {
      this.y = 0;
      this.x = Math.random() * canvas.width;
    }
    this.brightness =
      brightnessArray[
        Math.floor(this.y - 1) * canvas.width + Math.floor(this.x)
      ];
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = rgbArray[Math.floor(this.y - 1) * canvas.width + Math.floor(this.x)];
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

img.onload = function () {
  canvas.height = img.height;
  canvas.width = img.width;
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < imageData.data.length; i++) {
    const red = imageData.data[i * 4];
    const green = imageData.data[i * 4 + 1];
    const blue = imageData.data[i * 4 + 2];
    const brightness = (red + green + blue) / 3;
    brightnessArray.push(brightness);
    rgbArray.push(`rgba(${red}, ${green}, ${blue})`);
  }

  // Generate 10,000 Particles
  for (let i = 0; i < 10000; i++) {
    particlesArray.push(new Particle());
  }

  const animate = () => {
    ctx.globalAlpha = 0.05;
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach((particle) => {
      particle.update();
      ctx.globalAlpha = particle.brightness * 0.002;
      particle.draw();
    });
    requestAnimationFrame(animate);
  };

  animate();
};
