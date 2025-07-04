let imagenesModal = []; // Guarda las 2 imágenes por producto
let indiceActual = 0;

// Abrir el modal con 2 imágenes
function abrirModal(imagen1, imagen2) {
  imagenesModal = [imagen1, imagen2];
  indiceActual = 0;
  document.getElementById("modal-img").src = imagenesModal[indiceActual];
  document.getElementById("modal-galeria").style.display = "flex";
}

// Cambiar imagen con flechas o swipe
function cambiarImagen(direccion) {
  indiceActual = (indiceActual + direccion + imagenesModal.length) % imagenesModal.length;
  document.getElementById("modal-img").src = imagenesModal[indiceActual];
}

// Cerrar modal
function cerrarModal() {
  document.getElementById("modal-galeria").style.display = "none";
}

// Cierre al hacer clic fuera
document.getElementById("modal-galeria").addEventListener("click", cerrarModal);

// Swipe en móvil
let startX = 0;
document.getElementById("modal-img").addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});

document.getElementById("modal-img").addEventListener("touchend", e => {
  let endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) cambiarImagen(1);      // izquierda ➡
  if (startX - endX < -50) cambiarImagen(-1);     // derecha ⬅
});
