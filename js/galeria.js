let index = 0;
const slides = document.querySelectorAll(".slide");
const total = slides.length;

function mostrarSlide(i) {
  slides.forEach(slide => slide.classList.remove("activo"));
  slides[i].classList.add("activo");
}

function siguienteSlide() {
  index = (index + 1) % total;
  mostrarSlide(index);
}

document.querySelector(".next").addEventListener("click", siguienteSlide);
document.querySelector(".prev").addEventListener("click", () => {
  index = (index - 1 + total) % total;
  mostrarSlide(index);
});

// Auto carrusel
setInterval(siguienteSlide, 6000);
