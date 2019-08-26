const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const grid_size = 25;
const frame_rate = 50;

document.addEventListener("keydown", e => {
  switch (e.keyCode) {
    case 37:
      snake.xv = -1;
      snake.yv = 0;
      break;
    case 38:
      snake.xv = 0;
      snake.yv = -1;
      break;
    case 39:
      snake.xv = 1;
      snake.yv = 0;
      break;
    case 40:
      snake.xv = 0;
      snake.yv = 1;
      break;
  }
});

var apple = {
  x: Math.floor(Math.random() * 20) * grid_size,
  y: Math.floor(Math.random() * 20) * grid_size,

  draw() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, grid_size, grid_size);
  },

  respawn() {
    this.x = Math.floor(Math.random() * 20) * grid_size;
    this.y = Math.floor(Math.random() * 20) * grid_size;
  }
};

var snake = {
  trail: [],
  tail: 5,
  x: canvas.width / 2,
  y: canvas.height / 2,
  xv: 0,
  yv: 1,

  draw() {
    ctx.fillStyle = "white";
    ctx.fillRect(this.x, this.y, grid_size, grid_size);
    for (
      var i = this.trail.length - 1;
      i > this.trail.length - this.tail;
      i--
    ) {
      ctx.fillRect(this.trail[i][0], this.trail[i][1], grid_size, grid_size);
    }
  },

  update() {
    this.x += this.xv * grid_size;
    this.y += this.yv * grid_size;
    if (this.x > canvas.width) {
      this.x = 0;
    }
    if (this.y > canvas.height) {
      this.y = 0;
    }
    if (this.y < 0) {
      this.y = canvas.height;
    }
    if (this.x < 0) {
      this.x = canvas.width;
    }
    if (this.x == apple.x && this.y == apple.y) {
      snake.tail++;
      apple.respawn();
    }
    this.trail.push([this.x, this.y]);
  }
};

setInterval(() => {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  snake.update();
  snake.draw();
  apple.draw();
}, frame_rate);
