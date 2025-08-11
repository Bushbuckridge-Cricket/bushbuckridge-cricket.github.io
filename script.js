// Select all navigation links
const navLinks = document.querySelectorAll("nav ul li a");

// Create the cricket ball element
const cricketBall = document.createElement("div");
cricketBall.classList.add("cricket-ball");
document.body.appendChild(cricketBall);

// Handle navigation click
navLinks.forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault(); // Stop instant navigation

        const targetUrl = this.getAttribute("href");

        // Start ball animation from left to right
        cricketBall.style.left = "-50px";
        cricketBall.style.display = "block";

        setTimeout(() => {
            cricketBall.style.transition = "left 1s ease-in-out";
            cricketBall.style.left = "100%";
        }, 50);

        // After animation ends, go to page
        setTimeout(() => {
            window.location.href = targetUrl;
        }, 1100);
    });
});
