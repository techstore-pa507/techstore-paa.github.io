// Funcionalidad de zoom al pasar el cursor (hover effect)
document.addEventListener('DOMContentLoaded', () => {
  const imagenesProducto = document.querySelectorAll('.imagen-producto');

  imagenesProducto.forEach(contenedorImg => {
    const img = contenedorImg.querySelector('img');
    if (!img) return;

    contenedorImg.addEventListener('mouseenter', () => {
      img.style.transform = 'scale(1.2)';
    });

    contenedorImg.addEventListener('mouseleave', () => {
      img.style.transform = 'scale(1)';
    });
  });
});
