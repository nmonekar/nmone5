const car = document.querySelector(".car-border");
const section = car.parentElement;

window.addEventListener("scroll", () => {
    const sectionTop = section.getBoundingClientRect().top;
    const sectionHeight = section.offsetHeight;
    const screenHeight = window.innerHeight;

    const progress =
        (screenHeight - sectionTop) /
        (screenHeight + sectionHeight);

    const percent = Math.max(0, Math.min(1, progress));

    const maxMove = section.clientWidth - car.offsetWidth;

    const move = percent * maxMove;

    car.style.transform = `translateX(-${move}px)`;
});