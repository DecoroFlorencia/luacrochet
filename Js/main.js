const form = document.getElementById('voto-form');
const resultado = document.getElementById('resultado-voto');
const contadorVotosDiv = document.getElementById('contador-votos');
const compraForm = document.getElementById('compra-form');
const resultadoCompra = document.getElementById('resultado-compra');

const votosGuardados = localStorage.getItem("votos");
const votos = votosGuardados ? JSON.parse(votosGuardados) : {
  "Coneja de apego": 0,
  "Llavero pingüino": 0,
  "Perry el ornitorrinco": 0,
  "Señalador de libros": 0,
  "Oso polar": 0,
  "Pollito": 0,
};

function actualizarContador() {
  let texto = "<strong>Conteo de votos:</strong><br>";
  for (const tejido in votos) {
    texto += `${tejido}: ${votos[tejido]}<br>`;
  }
  contadorVotosDiv.innerHTML = texto;
}

form.addEventListener('submit', function (event) {
  event.preventDefault();
  const votoSeleccionado = form.tejido.value;
  if (!votoSeleccionado) {
    resultado.textContent = 'Por favor, seleccioná una opción antes de votar.';
    resultado.style.color = 'red';
    return;
  }

  votos[votoSeleccionado]++;
  localStorage.setItem("votos", JSON.stringify(votos));

  resultado.textContent = `¡Gracias por votar por "${votoSeleccionado}"! ♡`;
  resultado.style.color = 'green';
  actualizarContador();
  form.reset();
});

actualizarContador();

// Compra
const precios = {
  "Coneja de apego": 6200,
  "Llavero pingüino": 3200,
  "Perry el ornitorrinco": 4500,
  "Señalador de libros": 2800,
  "Oso polar": 4000,
  "Pollito": 3500,
};

compraForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const producto = document.getElementById('producto').value;
  const cantidad = parseInt(document.getElementById('cantidad').value);

  if (!producto || isNaN(cantidad) || cantidad <= 0) {
    resultadoCompra.textContent = "Por favor completá los datos correctamente.";
    resultadoCompra.style.color = "red";
    return;
  }

  const precioTotal = precios[producto] * cantidad;
  resultadoCompra.innerHTML = `Total a pagar por <strong>${cantidad}</strong> "${producto}" es <strong>$${precioTotal}</strong>. ¡Gracias por elegir Lua Crochet! ♡`;
  resultadoCompra.style.color = "green";

  compraForm.reset();
});
