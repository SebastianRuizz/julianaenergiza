function filtrarCategorias(categoria) {
  const tarjetas = document.querySelectorAll('.tarjeta-categoria');
  const botones = document.querySelectorAll('.filtros button');

  botones.forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');

  tarjetas.forEach(tarjeta => {
    if (categoria === 'all') {
      tarjeta.classList.add('show');
    } else {
      tarjeta.classList.toggle('show', tarjeta.classList.contains(categoria));
    }
  });
}