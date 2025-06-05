const slides = document.querySelectorAll('.slide');
  let actual = 0;

  // Asegura que el primer slide esté activo
  slides[actual].classList.add('active');

  function mostrarSlide(index) {
    const siguiente = (index + slides.length) % slides.length;

    if (siguiente === actual) return;

    // Activar primero el nuevo
    slides[siguiente].classList.add('active');

    // Luego desactivar el anterior con un pequeño delay
    setTimeout(() => {
      slides[actual].classList.remove('active');
      actual = siguiente;
    }, 50);
  }

  function moverSlider(direccion) {
    mostrarSlide(actual + direccion);
  }

  // Cambio automático de slide cada 5 segundos
  setInterval(() => moverSlider(1), 5000);