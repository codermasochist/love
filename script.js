const canvas = document.getElementById('hearts');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const hearts = [];
const colors = ['rgba(255, 77, 106, 0.8)', 'rgba(255, 130, 150, 0.8)', 'rgba(255, 180, 190, 0.8)'];

function createHeart() {
    const size = Math.random() * 20 + 10;
    const speed = Math.random() * 1 + 0.5;
    hearts.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed,
        angle: Math.random() * 360
    });
}

function drawHeart(x, y, size, color, angle) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate((angle * Math.PI) / 180);
    ctx.beginPath();
    ctx.moveTo(0, -size / 2);
    ctx.bezierCurveTo(size / 2, -size / 1.5, size, size / 3, 0, size);
    ctx.bezierCurveTo(-size, size / 3, -size / 2, -size / 1.5, 0, -size / 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
}

function drawHearts() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hearts.forEach((heart, index) => {
        drawHeart(heart.x, heart.y, heart.size, heart.color, heart.angle);
        heart.y -= heart.speed;
        heart.angle += 2;
        if (heart.y + heart.size < 0) hearts.splice(index, 1);
    });
    requestAnimationFrame(drawHearts);
}

setInterval(createHeart, 200);
drawHearts();

const button = document.getElementById('loveButton');
const message = document.getElementById('loveMessage');

button.addEventListener('click', () => {
    message.style.display = 'block';
    for (let i = 0; i < 200; i++) {
        createHeart();
    }
});

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
