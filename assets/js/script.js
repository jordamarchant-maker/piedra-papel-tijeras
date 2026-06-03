// Elementos principales del DOM.
const botonesJugada = document.querySelectorAll(".boton-jugada");
const textoJugadaJugador = document.querySelector("#jugada-jugador");
const textoJugadaComputadora = document.querySelector("#jugada-computadora");
const textoResultado = document.querySelector("#resultado");
const panelResultadoFinal = document.querySelector(".resultado-final");
const contadorVictoriasJugador = document.querySelector("#victorias-jugador");
const contadorVictoriasComputadora = document.querySelector("#victorias-computadora");
const contadorEmpates = document.querySelector("#empates");
const listaHistorial = document.querySelector("#historial-partidas");

// Opciones disponibles para el juego.
const opciones = ["piedra", "papel", "tijeras"];

const etiquetasJugada = {
  piedra: "Piedra ✊",
  papel: "Papel ✋",
  tijeras: "Tijeras ✌️",
};

const reglas = {
  piedra: "tijeras",
  papel: "piedra",
  tijeras: "papel",
};

const contadores = {
  jugador: 0,
  computadora: 0,
  empates: 0,
};

const historial = [];
const maxHistorial = 10;

function obtenerJugadaComputadora() {
  const indice = Math.floor(Math.random() * opciones.length);
  return opciones[indice];
}

function determinarGanador(jugadaJugador, jugadaComputadora) {
  if (jugadaJugador === jugadaComputadora) {
    return "empate";
  }

  if (reglas[jugadaJugador] === jugadaComputadora) {
    return "ganaste";
  }

  return "perdiste";
}

function mensajeResultado(resultado) {
  if (resultado === "empate") {
    return "Empate. Nadie gana esta ronda.";
  }

  if (resultado === "ganaste") {
    return "¡Ganaste! 🎉";
  }

  return "Perdiste. La computadora gana esta ronda.";
}

function actualizarContadores(resultado) {
  if (resultado === "empate") {
    contadores.empates += 1;
  } else if (resultado === "ganaste") {
    contadores.jugador += 1;
  } else {
    contadores.computadora += 1;
  }

  contadorVictoriasJugador.textContent = String(contadores.jugador);
  contadorVictoriasComputadora.textContent = String(contadores.computadora);
  contadorEmpates.textContent = String(contadores.empates);
}

function agregarAlHistorial(jugadaJugador, jugadaComputadora, resultado) {
  const entrada = {
    jugadaJugador,
    jugadaComputadora,
    resultado,
    hora: new Date().toLocaleTimeString("es-CL", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };

  historial.unshift(entrada);

  if (historial.length > maxHistorial) {
    historial.pop();
  }

  renderizarHistorial();
}

function renderizarHistorial() {
  listaHistorial.innerHTML = "";

  if (historial.length === 0) {
    const vacio = document.createElement("li");
    vacio.className = "historial-vacio";
    vacio.textContent = "Aún no hay partidas registradas.";
    listaHistorial.appendChild(vacio);
    return;
  }

  historial.forEach((partida) => {
    const item = document.createElement("li");
    item.className = `historial-item historial-${partida.resultado}`;
    item.textContent = `${partida.hora} — Tú: ${etiquetasJugada[partida.jugadaJugador]} vs PC: ${etiquetasJugada[partida.jugadaComputadora]} → ${mensajeResultado(partida.resultado)}`;
    listaHistorial.appendChild(item);
  });
}

function resaltarBotonActivo(jugadaJugador) {
  botonesJugada.forEach((boton) => {
    boton.classList.toggle("activo", boton.dataset.jugada === jugadaJugador);
  });
}

function animarResultado(resultado) {
  panelResultadoFinal.classList.remove("resultado-ganaste", "resultado-perdiste", "resultado-empate", "animar");

  void panelResultadoFinal.offsetWidth;

  panelResultadoFinal.classList.add(`resultado-${resultado}`, "animar");
}

function actualizarPantalla(jugadaJugador, jugadaComputadora, resultado) {
  textoJugadaJugador.textContent = etiquetasJugada[jugadaJugador];
  textoJugadaComputadora.textContent = etiquetasJugada[jugadaComputadora];
  textoResultado.textContent = mensajeResultado(resultado);

  resaltarBotonActivo(jugadaJugador);
  animarResultado(resultado);
  actualizarContadores(resultado);
  agregarAlHistorial(jugadaJugador, jugadaComputadora, resultado);
}

function jugar(jugadaJugador) {
  if (!opciones.includes(jugadaJugador)) {
    return;
  }

  const jugadaComputadora = obtenerJugadaComputadora();
  const resultado = determinarGanador(jugadaJugador, jugadaComputadora);

  actualizarPantalla(jugadaJugador, jugadaComputadora, resultado);
}

botonesJugada.forEach((boton) => {
  boton.addEventListener("click", () => {
    jugar(boton.dataset.jugada);
  });
});

renderizarHistorial();
