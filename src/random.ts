function random(max: number) {
  return Math.floor(Math.random() * max);
}

class CanvasPainting {
  viewport: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;

  constructor(viewport: HTMLCanvasElement) {
    this.viewport = viewport;
    this.width = viewport.width = window.innerWidth || document.body.clientWidth;
    this.height = viewport.height = window.innerHeight || document.body.clientHeight;
    const ctx = viewport.getContext('2d');
    if (!ctx) {
      throw new Error("Failed to getContext from canvas element");
    }
    this.ctx = ctx;
  }

  square(startX: number, startY: number) {
    this.ctx.fillRect(startX, startY, 50, 50);
  }

  triangle(startX: number, startY: number) {
    this.ctx.beginPath();
    this.ctx.moveTo(startX, startY);
    this.ctx.lineTo(startX + 50, startY);
    this.ctx.lineTo(startX + 25, startY - 50);
    this.ctx.fill();
  }

  circle(startX: number, startY: number) {
    this.ctx.beginPath();
    this.ctx.arc(startX, startY, 25, 0, Math.PI * 2, true);
    this.ctx.fill();
  }
}

class Lines extends CanvasPainting {
  render() {
    this.ctx.lineWidth = 3;

    // Between 5 and 10 lines
    const lineCount = 5 + random(5);

    const colors = ['deeppink', 'darkorange', 'lime'];

    for (let i = 0; i < lineCount; i++) {
      const color = colors[random(colors.length)];
      const startX = random(this.width);
      const startY = random(this.height / 2);
      const endX = random(this.width);
      const endY = random(this.height / 2) + (this.height / 2);
      this.ctx.strokeStyle = color;
      this.ctx.beginPath();
      this.ctx.moveTo(startX, startY);
      this.ctx.lineTo(endX, endY);
      this.ctx.stroke();
    }
  }
}

class Shapes extends CanvasPainting {
  [key: string]: any;

  render() {
    this.ctx.lineWidth = 3;

    const shapes = ['square', 'triangle', 'circle'];

    const colors = [
      'rgba(255, 0, 0, 0.8)', // Red
      'rgba(255, 255, 0, 0.8)', // Yellow
      'rgba(0, 0, 255, 0.8)' // Blue
    ];

    const shapeCount = 18;

    for (let i = 0; i < shapeCount; i++) {
      const color = colors[random(colors.length)];
      const shape = shapes[random(shapes.length)];
      const startX = random(this.width);
      const startY = random(this.height);
      this.ctx.fillStyle = color;
      this[shape](startX, startY);
    }
  }
}

class Combo extends CanvasPainting {
  render() {
    randomBackgroundColor();
    Lines.prototype.render.call(this);
    Shapes.prototype.render.call(this);
  }
}

function randomBackgroundColor() {
  const rgb = [
    random(255),
    random(255),
    random(255)
  ].join(",");
  document.body.style.cssText = `background-color: rgb(${rgb})`;
}

function changingRandomBackgroundColor() {
  return setInterval(randomBackgroundColor, 500);
}

function renderShapes() {
  const viewport = <HTMLCanvasElement | null>document.getElementById('viewport');
  if (!viewport) {
    return;
  }

  const shapes = new Shapes(viewport);
  shapes.render();
}

function renderLines() {
  const viewport = <HTMLCanvasElement | null>document.getElementById('viewport');
  if (!viewport) {
    throw new Error("Couldn't find element with id 'viewport'");
  }

  const lines = new Lines(viewport);
  lines.render();
}

function renderCombo() {
  const viewport = <HTMLCanvasElement | null>document.getElementById('viewport');
  if (!viewport) {
    throw new Error("Couldn't find element with id 'viewport'");
  }

  const combo = new Combo(viewport);
  combo.render();
}

class AsciiArt {
  container: HTMLElement;
  width: number;
  height: number;
  characters: string[];

  constructor(container: HTMLElement) {
    this.container = container;
    // Calculate how many characters can fit based on viewport
    this.width = Math.floor((window.innerWidth || document.body.clientWidth) / 12);
    this.height = Math.floor((window.innerHeight || document.body.clientHeight) / 20);
    // Different ASCII characters with varying visual density
    this.characters = [' ', '.', ':', '-', '=', '+', '*', '#', '%', '@'];
  }

  render() {
    let art = '';

    // Generate pattern based on position
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        // Create patterns using math functions
        const distance = Math.sqrt(
          Math.pow(x - this.width / 2, 2) +
          Math.pow(y - this.height / 2, 2)
        );

        // Use different patterns based on randomness
        const pattern = random(3);
        let charIndex;

        if (pattern === 0) {
          // Circular pattern
          charIndex = Math.floor(distance) % this.characters.length;
        } else if (pattern === 1) {
          // Wave pattern
          charIndex = Math.floor(Math.sin(x / 3) * Math.cos(y / 3) * this.characters.length / 2) + Math.floor(this.characters.length / 2);
        } else {
          // Random noise
          charIndex = random(this.characters.length);
        }

        art += this.characters[charIndex];
      }
      art += '\n';
    }

    this.container.textContent = art;
  }
}

function renderAsciiArt() {
  const container = document.getElementById('ascii-container');
  if (!container) {
    throw new Error("Couldn't find element with id 'ascii-container'");
  }

  const ascii = new AsciiArt(container);
  ascii.render();
}
