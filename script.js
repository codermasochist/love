document.getElementById("button").addEventListener("click", function() {
    const animation = document.getElementById("animation");
    const button = document.getElementById("button");

    // Скрыть кнопку
    button.style.display = "none";

    // Показать анимацию
    animation.classList.remove("hidden");
    const letters = animation.querySelectorAll(".name");

    // Запустить анимацию поочередно для каждой буквы
    letters.forEach((letter, index) => {
        setTimeout(() => {
            letter.style.opacity = "1";
            letter.style.animationDelay = `${index * 0.3}s`;
        }, index * 300);
    });
});
