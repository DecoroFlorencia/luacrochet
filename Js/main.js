document.addEventListener("DOMContentLoaded", () => {
  // Mostrar nombre, precio y color en cada tarjeta de producto
  const polaroids = document.querySelectorAll('.polaroid');
  polaroids.forEach(polaroid => {
    const nombre = polaroid.getAttribute('data-nombre');
    const precio = polaroid.getAttribute('data-precio');
    const color = polaroid.getAttribute('data-color');

    const descripcionDiv = polaroid.querySelector('.descripcion-producto');
    descripcionDiv.innerHTML = `
      <strong>${nombre}</strong><br>
      Precio: $${precio}<br>
      Color: ${color}
    `;
  });

  // Votación
  const formVoto = document.getElementById('voto-form');
  const resultado = document.getElementById('resultado-voto');
  const contadorVotosDiv = document.getElementById('contador-votos');

  // Recuperar votos guardados o iniciar
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

  formVoto.addEventListener('submit', function (event) {
    event.preventDefault();
    const votoSeleccionado = formVoto.tejido.value;
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
    formVoto.reset();
  });

  actualizarContador();

  // Simulador carrito de compras
  const carrito = [];
  const precios = {
    "Coneja de apego": 6200,
    "Llavero pingüino": 3200,
    "Perry el ornitorrinco": 4500,
    "Señalador de libros": 2800,
    "Oso polar": 4000,
    "Pollito": 3500,
  };

  const compraForm = document.getElementById('compra-form');
  const listaCarrito = document.getElementById('lista-carrito');
  const totalCarritoP = document.getElementById('total-carrito');
  const btnFinalizar = document.getElementById('finalizar-compra');
  const resultadoCompra = document.getElementById('resultado-compra');

  function actualizarCarrito() {
    listaCarrito.innerHTML = "";
    let total = 0;

    carrito.forEach((item, index) => {
      const itemTotal = precios[item.producto] * item.cantidad;
      total += itemTotal;

      const li = document.createElement('li');
      li.textContent = `${item.cantidad} x ${item.producto} = $${itemTotal}`;

      // Botón para eliminar producto del carrito
      const btnEliminar = document.createElement('button');
      btnEliminar.textContent = "Eliminar";
      btnEliminar.style.marginLeft = "10px";
      btnEliminar.onclick = () => {
        carrito.splice(index, 1);
        actualizarCarrito();
      };
      li.appendChild(btnEliminar);

      listaCarrito.appendChild(li);
    });

    totalCarritoP.innerHTML = `<strong>Total:</strong> $${total}`;
  }

  compraForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const producto = document.getElementById('producto').value;
    const cantidad = parseInt(document.getElementById('cantidad').value);

    if (!producto || isNaN(cantidad) || cantidad <= 0) {
      resultadoCompra.textContent = "Por favor completá los datos correctamente.";
      resultadoCompra.style.color = "red";
      return;
    }

    // Agregar al carrito
    carrito.push({ producto, cantidad });
    actualizarCarrito();

    resultadoCompra.textContent = `Agregaste ${cantidad} x "${producto}" al carrito.`;
    resultadoCompra.style.color = "green";

    compraForm.reset();
  });

  btnFinalizar.addEventListener('click', () => {
    if (carrito.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }

    let mensaje = "Hola! Quisiera hacer un pedido:\n";
    carrito.forEach(item => {
      mensaje += `- ${item.cantidad} x ${item.producto}\n`;
    });

    const telefono = '5491123889783'; 
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  });

});