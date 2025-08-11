document.addEventListener("DOMContentLoaded", () => {
    const ball = document.querySelector(".ball");
    let position = 0;
    let direction = 1;
    let rolling = false;

    function rollBall() {
        if (!rolling) return;
        position += 5 * direction;
        
        if (position > window.innerWidth - 100 || position < 0) {
            direction *= -1; // reverse direction
        }
        
        ball.style.transform = `translateX(${position}px) rotate(${position * 2}deg)`;
        requestAnimationFrame(rollBall);
    }

    // Start rolling when ball is clicked
    ball.addEventListener("click", () => {
        rolling = !rolling;
        if (rolling) {
            rollBall();
        }
    });
});
