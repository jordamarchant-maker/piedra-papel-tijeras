// Elementos principales del DOM.
const botonesJugada = document.querySelectorAll(".boton-jugada");
const textoJugadaJugador = document.querySelector("#jugada-jugador");
const textoJugadaComputadora = document.querySelector("#jugada-computadora");
const textoResultado = document.querySelector("#resultado");

// Opciones disponibles para el juego.
const opciones = ["piedra", "papel", "tijeras"];

/*
  Responsabilidad:
  Obtener una jugada para la computadora.

  TODO:
  Generar una opcion aleatoria.
*/
function obtenerJugadaComputadora() {

}

/*
  Responsabilidad:
  Recibir la jugada del jugador y la jugada de la computadora.

  TODO:
  Comparar jugadas.
*/
function determinarGanador(jugadaJugador, jugadaComputadora) {

}

/*
  Responsabilidad:
  Actualizar los textos visibles en la pagina.

  TODO:
  Mostrar resultado.
*/
function actualizarPantalla(jugadaJugador, jugadaComputadora, resultado) {

}

/*
  Responsabilidad:
  Coordinar una partida completa.

  Sugerencia:
  Esta funcion puede llamar a obtenerJugadaComputadora(),
  determinarGanador() y actualizarPantalla().
*/
function jugar(jugadaJugador) {

}

// Punto de partida: escuchar clicks en los botones del juego.
botonesJugada.forEach((boton) => {
  boton.addEventListener("click", () => {
    const jugadaJugador = boton.dataset.jugada;

    jugar(jugadaJugador);
  });
});
