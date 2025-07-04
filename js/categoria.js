function mostrarCategoria(id) {
  document.querySelectorAll('.categoria').forEach(el => el.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  document.querySelectorAll('.filtros button').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
}