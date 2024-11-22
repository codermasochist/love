const canvas = document.getElementById('hearts');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const hearts = [];
const colors = ['rgba(255, 105, 135, 0.8)', 'rgba(255, 195, 160, 0.8)', 'rgba(255, 150, 220, 0.8)'];

function createHeart() {
    const size = Math.random() * 20 + 10;
    hearts.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 1 + 0.5
    });
}

function drawHearts() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hearts.forEach((heart, index) => {
        ctx.beginPath();
        ctx.arc(heart.x, heart.y, heart.size, 0, Math.PI * 2);
        ctx.fillStyle = heart.color;
        ctx.fill();
        heart.y -= heart.speed;
        if (heart.y < 0) hearts.splice(index, 1);
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
