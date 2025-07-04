let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function toggleCarrito() {
  const resumen = document.getElementById("resumen-carrito");
  resumen.style.display = resumen.style.display === "block" ? "none" : "block";
}

function redirigirPago() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
  window.location.href = "checkout.html";
}

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function agregarAlCarrito(nombre, precio, imagen, talla = 'M', categoria = 'General') {
  const productoExistente = carrito.find(p => p.nombre === nombre && p.talla === talla);

  if (productoExistente) {
    productoExistente.cantidad += 1;
  } else {
    carrito.push({ nombre, precio, imagen, talla, cantidad: 1, categoria });
  }

  guardarCarrito();
  actualizarResumen();
}

function actualizarResumen() {
  const contenedor = document.getElementById("carrito-items");
  const totalSpan = document.getElementById("carrito-total");
  const contador = document.getElementById("contador-carrito");

  contenedor.innerHTML = "";

  if (carrito.length === 0) {
    contenedor.innerHTML = `
      <div style="text-align:center; color:#777; font-size:0.95rem;">
        🧺 Tu carrito está vacío por ahora...
      </div>
    `;
    totalSpan.textContent = 0;
    contador.textContent = 0;
    return;
  }

  let total = 0;
  let cantidadTotal = 0;

  // Agrupar por categoría
  const categorias = {};
  carrito.forEach(item => {
    if (!categorias[item.categoria]) categorias[item.categoria] = [];
    categorias[item.categoria].push(item);
  });

  // Renderizar por categoría
  for (const categoria in categorias) {
    contenedor.innerHTML += `<h4 style="margin: 10px 0 5px; color:#555">${categoria}</h4>`;

    categorias[categoria].forEach((item, index) => {
      total += item.precio * item.cantidad;
      cantidadTotal += item.cantidad;

      contenedor.innerHTML += `
        <div class="item-carrito">
          <img src="${item.imagen}" alt="${item.nombre}">
          <div class="info">
            <p><strong>${item.nombre}</strong></p>
            <label>Talla:
              <select class="select-moderno" onchange="cambiarTalla(${index}, this.value)">
                ${['XXS','XS','S','M','L','XL','XXL'].map(t => `
                  <option value="${t}" ${item.talla === t ? 'selected' : ''}>${t}</option>
                `).join('')}
              </select>
            </label>

            <label>Cantidad:
              <select class="select-moderno" onchange="cambiarCantidadDirecto(${index}, this.value)">
                ${[1,2,3,4,5,6,7,8,9,10].map(q => `
                  <option value="${q}" ${item.cantidad === q ? 'selected' : ''}>${q}</option>
                `).join('')}
              </select>
            </label>

            <p class="precio-item">$${item.precio}</p>
          </div>

          <button class="boton-eliminar" onclick="eliminarDelCarrito(${index})" title="Eliminar">
            🧹
          </button>
        </div>
      `;
    });
  }

  totalSpan.textContent = total;
  contador.textContent = cantidadTotal;
}

function cambiarTalla(index, nuevaTalla) {
  carrito[index].talla = nuevaTalla;
  guardarCarrito();
}

function cambiarCantidadDirecto(index, nuevaCantidad) {
  carrito[index].cantidad = parseInt(nuevaCantidad);
  guardarCarrito();
  actualizarResumen();
}

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  guardarCarrito();
  actualizarResumen();
}

window.onload = actualizarResumen;