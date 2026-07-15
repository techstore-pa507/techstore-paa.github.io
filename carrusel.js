document.addEventListener('DOMContentLoaded', function () {
  const carrusel = document.querySelector('.carrusel-hero');
  if (!carrusel) return;

  const pista = carrusel.querySelector('.carrusel-pista');
  const diapositivas = carrusel.querySelectorAll('.carrusel-diapositiva');
  const puntosCont = carrusel.querySelector('.carrusel-puntos');
  const flechaIzq = carrusel.querySelector('.carrusel-flecha-izq');
  const flechaDer = carrusel.querySelector('.carrusel-flecha-der');

  let indiceActual = 0;
  const total = diapositivas.length;
  const intervaloMs = 5000;
  let temporizador = null;

  // Crear los puntos dinámicamente (uno por cada diapositiva)
  const puntos = [];
  diapositivas.forEach((_, i) => {
    const punto = document.createElement('button');
    punto.classList.add('carrusel-punto');
    punto.setAttribute('aria-label', 'Ir a la imagen ' + (i + 1));
    if (i === 0) punto.classList.add('activo');
    punto.addEventListener('click', () => irADiapositiva(i));
    puntosCont.appendChild(punto);
    puntos.push(punto);
  });

  function actualizarCarrusel() {
    pista.style.transform = `translateX(-${indiceActual * 100}%)`;
    puntos.forEach((p, i) => p.classList.toggle('activo', i === indiceActual));
  }

  function irADiapositiva(i) {
    indiceActual = (i + total) % total;
    actualizarCarrusel();
    reiniciarAutoplay();
  }

  function siguiente() { irADiapositiva(indiceActual + 1); }
  function anterior() { irADiapositiva(indiceActual - 1); }

  function iniciarAutoplay() {
    temporizador = setInterval(() => {
      indiceActual = (indiceActual + 1) % total;
      actualizarCarrusel();
    }, intervaloMs);
  }

  function reiniciarAutoplay() {
    clearInterval(temporizador);
    iniciarAutoplay();
  }

  flechaDer.addEventListener('click', siguiente);
  flechaIzq.addEventListener('click', anterior);

  // Pausar mientras el mouse está encima
  carrusel.addEventListener('mouseenter', () => clearInterval(temporizador));
  carrusel.addEventListener('mouseleave', iniciarAutoplay);

  actualizarCarrusel();
  iniciarAutoplay();
});
