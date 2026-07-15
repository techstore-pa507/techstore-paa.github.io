// Funcionalidad para navegar entre secciones en la página de información

document.addEventListener('DOMContentLoaded', () => {
  const enlaces = document.querySelectorAll('.enlace-info');
  const secciones = document.querySelectorAll('.seccion-info');

  // Evento de clic en los enlaces del menú
  enlaces.forEach(enlace => {
    enlace.addEventListener('click', (e) => {
      e.preventDefault();

      // Obtener el ID de la sección
      const idSeccion = enlace.getAttribute('href').substring(1);

      // Remover clase activa de todos los enlaces y secciones
      enlaces.forEach(e => e.classList.remove('activo'));
      secciones.forEach(s => s.classList.remove('activa'));

      // Agregar clase activa al enlace y sección seleccionados
      enlace.classList.add('activo');
      const seccionSeleccionada = document.getElementById(idSeccion);
      if (seccionSeleccionada) {
        seccionSeleccionada.classList.add('activa');
        // Scroll suave hacia la sección
        seccionSeleccionada.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Verificar si hay un hash en la URL al cargar la página
  if (window.location.hash) {
    const idSeccion = window.location.hash.substring(1);
    const enlaceCorrespondiente = document.querySelector(`a[href="#${idSeccion}"]`);
    if (enlaceCorrespondiente) {
      enlaceCorrespondiente.click();
    }
  }
});
