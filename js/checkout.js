// === CARGAR CARRITO DESDE localStorage ===
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const contenedorResumen = document.getElementById("resumen-productos");
const totalElemento = document.getElementById("total-checkout");
const formulario = document.getElementById("formulario-pago");
const checkboxTyC = document.getElementById("acepta-tyc");

// === MOSTRAR RESUMEN ===
function actualizarResumenCheckout() {
  contenedorResumen.innerHTML = "";

  if (carrito.length === 0) {
    contenedorResumen.innerHTML = `<p style="color: #ccc;">🧺 No hay productos en el carrito</p>`;
    totalElemento.textContent = "$0";
    return;
  }

  let total = 0;

  carrito.forEach((item, index) => {
    const subtotal = item.precio * item.cantidad;
    total += subtotal;

    contenedorResumen.innerHTML += `
      <div class="item-carrito">
        <img src="${item.imagen}" alt="${item.nombre}">
        <div class="info">
          <p><strong>${item.nombre}</strong></p>
          <p class="descripcion-producto">${item.descripcion || "Producto sin descripción"}</p>

          <label>Talla:
            <select onchange="cambiarTalla(${index}, this.value)">
              ${['XXS','XS','S','M','L','XL','XXL'].map(t => `
                <option value="${t}" ${item.talla === t ? 'selected' : ''}>${t}</option>
              `).join('')}
            </select>
          </label>

          <label>Cantidad:
            <select onchange="cambiarCantidad(${index}, this.value)">
              ${[1,2,3,4,5,6,7,8,9,10].map(q => `
                <option value="${q}" ${item.cantidad === q ? 'selected' : ''}>${q}</option>
              `).join('')}
            </select>
          </label>

          <p class="precio-item">$${item.precio.toLocaleString()}</p>
        </div>

        <button class="boton-eliminar" onclick="eliminarProducto(${index})">🗑️</button>
      </div>
    `;
  });

  totalElemento.textContent = `$${total.toLocaleString()}`;
  localStorage.setItem("total_pedido", JSON.stringify(total));
}

// === MODIFICACIONES ===
function cambiarTalla(index, nuevaTalla) {
  carrito[index].talla = nuevaTalla;
  guardarCarrito();
}

function cambiarCantidad(index, nuevaCantidad) {
  carrito[index].cantidad = parseInt(nuevaCantidad);
  guardarCarrito();
  actualizarResumenCheckout();
}

function eliminarProducto(index) {
  carrito.splice(index, 1);
  guardarCarrito();
  actualizarResumenCheckout();
}

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// === ENVÍO Y VALIDACIÓN ===
formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!checkboxTyC.checked) {
    alert("Debes aceptar los términos y condiciones para continuar.");
    return;
  }

  if (carrito.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }

  const datosCliente = {
    nombre: document.getElementById("nombre").value,
    apellido: document.getElementById("apellido").value,
    correo: document.getElementById("correo").value,
    celular: document.getElementById("celular").value,
    tipoDoc: document.getElementById("tipo-doc").value,
    numeroDoc: document.getElementById("numero-doc").value,
    direccion: document.getElementById("direccion").value,
    barrio: document.getElementById("barrio").value,
    departamento: document.getElementById("departamento").value,
    municipio: document.getElementById("municipio").value
  };

  const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

  // Guardamos en localStorage
  localStorage.setItem("cliente", JSON.stringify(datosCliente));
  localStorage.setItem("carrito", JSON.stringify(carrito));
  localStorage.setItem("total_pedido", JSON.stringify(total));

  // Redirigimos a confirmación
  //window.location.href = "confirmacion.html";
});

// === DEPARTAMENTOS Y MUNICIPIOS DE COLOMBIA ===
const departamentosColombia = {
  "Amazonas": ["Leticia", "Puerto Nariño"],
  "Antioquia": ["Medellín", "Bello", "Itagüí", "Envigado", "Rionegro"],
  "Arauca": ["Arauca", "Arauquita"],
  "Atlántico": ["Barranquilla", "Soledad", "Malambo"],
  "Bolívar": ["Cartagena", "Magangué", "Turbaco"],
  "Boyacá": ["Tunja", "Duitama", "Sogamoso"],
  "Caldas": ["Manizales", "Villamaría"],
  "Caquetá": ["Florencia"],
  "Casanare": ["Yopal"],
  "Cauca": ["Popayán", "Santander de Quilichao"],
  "Cesar": ["Valledupar", "Aguachica"],
  "Chocó": ["Quibdó"],
  "Córdoba": ["Montería", "Lorica"],
  "Cundinamarca": ["Bogotá", "Soacha", "Facatativá"],
  "Guainía": ["Inírida"],
  "Guaviare": ["San José del Guaviare"],
  "Huila": ["Neiva", "Pitalito"],
  "La Guajira": ["Riohacha", "Maicao"],
  "Magdalena": ["Santa Marta", "Ciénaga"],
  "Meta": ["Villavicencio"],
  "Nariño": ["Pasto", "Ipiales", "Tumaco"],
  "Norte de Santander": ["Cúcuta", "Ocaña"],
  "Putumayo": ["Mocoa"],
  "Quindío": ["Armenia", "Calarcá"],
  "Risaralda": ["Pereira", "Dosquebradas"],
  "San Andrés": ["San Andrés Isla"],
  "Santander": ["Bucaramanga", "Floridablanca", "Girón"],
  "Sucre": ["Sincelejo", "Corozal"],
  "Tolima": ["Ibagué", "Espinal"],
  "Valle del Cauca": ["Cali", "Palmira", "Tuluá", "Jamundí"],
  "Vaupés": ["Mitú"],
  "Vichada": ["Puerto Carreño"]
};

const departamentoSelect = document.getElementById("departamento");
const municipioSelect = document.getElementById("municipio");

function cargarDepartamentos() {
  departamentoSelect.innerHTML = `<option value="">Seleccione un departamento</option>`;
  for (let dep in departamentosColombia) {
    departamentoSelect.innerHTML += `<option value="${dep}">${dep}</option>`;
  }
}

function cargarMunicipios() {
  const seleccionado = departamentoSelect.value;
  municipioSelect.innerHTML = `<option value="">Seleccione un municipio</option>`;

  if (departamentosColombia[seleccionado]) {
    departamentosColombia[seleccionado].forEach(mpio => {
      municipioSelect.innerHTML += `<option value="${mpio}">${mpio}</option>`;
    });
  }
}

departamentoSelect.addEventListener("change", cargarMunicipios);

window.addEventListener("DOMContentLoaded", () => {
  cargarDepartamentos();
  cargarMunicipios();
  actualizarResumenCheckout();
});
