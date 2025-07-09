// header scroll animation
window.addEventListener("scroll", function () {
    const header = document.querySelector("header");
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

// facth data from head.html
fetch("head.html")
    .then(response => response.text())
    .then(data => {
        document.head.innerHTML += data;
    });