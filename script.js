const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let hearts = [];
const colors = ['#ff6f91', '#ff4d6a', '#ff85a2'];

// Создаем сердечки
function createHeart(x, y, size) {
    hearts.push({
        x,
        y,
        size,
        speedX: (Math.random() - 0.5) * 2,
        speedY: Math.random() * -3 - 1,
        alpha: 1,
        color: colors[Math.floor(Math.random() * colors.length)],
    });
}

// Рисуем сердечки
function drawHeart(x, y, size, color) {
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(0, -size / 2);
    ctx.bezierCurveTo(size / 2, -size / 1.5, size, size / 3, 0, size);
    ctx.bezierCurveTo(-size, size / 3, -size / 2, -size / 1.5, 0, -size / 2);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
}

// Анимация сердечек
function updateHearts() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hearts.forEach((heart, index) => {
        heart.x += heart.speedX;
        heart.y += heart.speedY;
        heart.alpha -= 0.02;
        if (heart.alpha <= 0) hearts.splice(index, 1);
        else {
            ctx.globalAlpha = heart.alpha;
            drawHeart(heart.x, heart.y, heart.size, heart.color);
        }
    });
    requestAnimationFrame(updateHearts);
}

// Взрыв сердечек
const heartButton = document.getElementById('heartButton');
const mainContainer = document.getElementById('mainContainer');
const messageContainer = document.getElementById('messageContainer');

heartButton.addEventListener('click', () => {
    mainContainer.style.display = 'none';
    messageContainer.style.display = 'block';
    for (let i = 0; i < 100; i++) {
        createHeart(
            canvas.width / 2 + (Math.random() - 0.5) * 100,
            canvas.height / 2 + (Math.random() - 0.5) * 100,
            Math.random() * 20 + 10
        );
    }
});

// Изменение размеров
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

updateHearts();
