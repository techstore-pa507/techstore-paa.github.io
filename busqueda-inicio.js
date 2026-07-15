// Función de búsqueda y filtrado desde el header (tanto en index como en catálogo)
function filtrarProductosInicio() {
  const entradaBusqueda = document.getElementById('busqueda-input-inicio') || document.getElementById('busqueda-input-catalogo');
  const filtroCategoria = document.getElementById('categoria-filtro-inicio') || document.getElementById('categoria-filtro-catalogo');

  if (!entradaBusqueda || !filtroCategoria) return;

  const termino = entradaBusqueda.value.toLowerCase().trim();
  const categoriaSeleccionada = filtroCategoria.value;

  // Si estamos en el catálogo, solo aplicar filtro localmente
  const estamosenCatalogo = document.querySelector('.catalogo') !== null;
  
  if (estamosenCatalogo) {
    // Aplicar filtro directamente en la página actual
    const inputBusquedaCatalogo = document.getElementById('busqueda-catalogo');
    const selectCategoriaCatalogo = document.getElementById('categoria-catalogo');
    
    if (inputBusquedaCatalogo) inputBusquedaCatalogo.value = termino;
    if (selectCategoriaCatalogo) selectCategoriaCatalogo.value = categoriaSeleccionada;
    
    aplicarFiltro(termino, categoriaSeleccionada);
  } else {
    // Si no estamos en catálogo, redirigir a él con parámetros
    let url = 'catalogo/catalogo.html';

    if (termino.length === 0 && !categoriaSeleccionada) {
      window.location.href = url;
      return;
    }

    if (termino) {
      url += '?busqueda=' + encodeURIComponent(termino);
    }
    if (categoriaSeleccionada) {
      url += (termino ? '&' : '?') + 'categoria=' + encodeURIComponent(categoriaSeleccionada);
    }

    window.location.href = url;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const entradaBusquedaInicio = document.getElementById('busqueda-input-inicio');
  const filtroCategoriaInicio = document.getElementById('categoria-filtro-inicio');
  const entradaBusquedaCatalogo = document.getElementById('busqueda-input-catalogo');
  const filtroCategoriaCatalogo = document.getElementById('categoria-filtro-catalogo');

  // Eventos para el buscador del header en index.html
  if (entradaBusquedaInicio) {
    entradaBusquedaInicio.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') filtrarProductosInicio();
    });
  }

  if (filtroCategoriaInicio) {
    filtroCategoriaInicio.addEventListener('change', filtrarProductosInicio);
  }

  // Eventos para el buscador del header en catalogo.html
  if (entradaBusquedaCatalogo) {
    entradaBusquedaCatalogo.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') filtrarProductosInicio();
    });
  }

  if (filtroCategoriaCatalogo) {
    filtroCategoriaCatalogo.addEventListener('change', filtrarProductosInicio);
  }
});
