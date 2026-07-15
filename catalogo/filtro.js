// Lee los parámetros de la URL (que llegan desde el buscador de index.html)
// y también permite buscar/filtrar directamente dentro del catálogo.

document.addEventListener('DOMContentLoaded', () => {
  const parametros = new URLSearchParams(window.location.search);
  const terminoInicial = parametros.get('busqueda') || '';
  const categoriaInicial = parametros.get('categoria') || '';

  const inputBusqueda = document.getElementById('busqueda-catalogo');
  const selectCategoria = document.getElementById('categoria-catalogo');

  if (inputBusqueda) inputBusqueda.value = terminoInicial;
  if (selectCategoria) selectCategoria.value = categoriaInicial;

  aplicarFiltro(terminoInicial, categoriaInicial);

  if (inputBusqueda) {
    inputBusqueda.addEventListener('input', () => {
      aplicarFiltro(inputBusqueda.value, selectCategoria ? selectCategoria.value : '');
    });
  }

  if (selectCategoria) {
    selectCategoria.addEventListener('change', () => {
      aplicarFiltro(inputBusqueda ? inputBusqueda.value : '', selectCategoria.value);
    });
  }
});

function aplicarFiltro(termino, categoria) {
  const texto = termino.toLowerCase().trim();
  const tarjetas = document.querySelectorAll('.tarjeta-producto');
  let visibles = 0;

  tarjetas.forEach(tarjeta => {
    const nombre = tarjeta.querySelector('.nombre-producto').textContent.toLowerCase();
    const categoriaTarjeta = tarjeta.dataset.categoria || '';

    const coincideTexto = texto === '' || nombre.includes(texto);
    const coincideCategoria = categoria === '' || categoriaTarjeta === categoria;
    const visible = coincideTexto && coincideCategoria;

    tarjeta.style.display = visible ? '' : 'none';
    if (visible) visibles++;
  });

  mostrarMensajeSinResultados(visibles === 0);
}

function mostrarMensajeSinResultados(mostrar) {
  const grid = document.querySelector('.cuadricula-productos');
  let mensaje = document.querySelector('.sin-resultados');

  if (mostrar && !mensaje) {
    mensaje = document.createElement('p');
    mensaje.className = 'sin-resultados';
    mensaje.textContent = 'No encontramos productos que coincidan con tu búsqueda.';
    grid.after(mensaje);
  }
  if (mensaje) mensaje.style.display = mostrar ? 'block' : 'none';
}
