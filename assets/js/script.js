/**
 * PIEDRA PAPEL O TIJERAS — script.js
 * Desafío Full Stack JavaScript
 * ----------------------------------------
 * Funciones principales según especificación:
 *  - obtenerJugadaComputadora()
 *  - determinarGanador()
 *  - actualizarPantalla()
 *  - jugar()
 */

'use strict';

// ==========================================
// ESTADO DEL JUEGO
// ==========================================
const estado = {
  victorias: 0,
  derrotas: 0,
  empates: 0,
  historial: [],         // últimas 10 rondas
  jugando: false,        // bloqueo durante animación
};

// ==========================================
// MAPAS DE DATOS
// ==========================================
const JUGADAS = ['piedra', 'papel', 'tijeras'];

const EMOJIS = {
  piedra:  '🪨',
  papel:   '📄',
  tijeras: '✂️',
};

const NOMBRES = {
  piedra:  'Piedra',
  papel:   'Papel',
  tijeras: 'Tijeras',
};

const RESULTADO_TEXTO = {
  ganaste: '¡GANASTE!',
  perdiste: '¡PERDISTE!',
  empate:  '¡EMPATE!',
};

const RESULTADO_EMOJI = {
  ganaste: '🎉',
  perdiste: '💀',
  empate:  '🤝',
};

// ==========================================
// REFERENCIAS DOM
// ==========================================
const dom = {
  scoreVictorias:    document.getElementById('score-victorias'),
  scoreEmpates:      document.getElementById('score-empates'),
  scoreDerrotas:     document.getElementById('score-derrotas'),
  playerDisplay:     document.getElementById('player-display'),
  computerDisplay:   document.getElementById('computer-display'),
  playerName:        document.getElementById('player-name'),
  computerName:      document.getElementById('computer-name'),
  thinkingDots:      document.getElementById('thinking-dots'),
  resultBadge:       document.getElementById('result-badge'),
  resultEmoji:       document.getElementById('result-emoji'),
  resultText:        document.getElementById('result-text'),
  historialList:     document.getElementById('historial-list'),
  historialEmpty:    document.getElementById('historial-empty'),
  historialCount:    document.getElementById('historial-count'),
  btnReset:          document.getElementById('btn-reset'),
  botones:           document.querySelectorAll('.btn-choice'),
};

// ==========================================
// FUNCIÓN: obtenerJugadaComputadora()
// Elige al azar entre piedra, papel o tijeras
// ==========================================
function obtenerJugadaComputadora() {
  const indice = Math.floor(Math.random() * JUGADAS.length);
  return JUGADAS[indice];
}

// ==========================================
// FUNCIÓN: determinarGanador(jugador, computadora)
// Compara jugadas y retorna 'ganaste', 'perdiste' o 'empate'
// ==========================================
function determinarGanador(jugador, computadora) {
  if (jugador === computadora) return 'empate';

  const vence = {
    piedra:  'tijeras',
    papel:   'piedra',
    tijeras: 'papel',
  };

  return vence[jugador] === computadora ? 'ganaste' : 'perdiste';
}

// ==========================================
// FUNCIÓN: actualizarPantalla(datos)
// Actualiza DOM, marcador e historial
// ==========================================
function actualizarPantalla({ jugador, computadora, resultado }) {
  // --- Elección jugador ---
  dom.playerDisplay.textContent = EMOJIS[jugador];
  dom.playerDisplay.className = 'choice-display filled revealed';
  dom.playerName.textContent   = NOMBRES[jugador];

  // --- Elección computadora ---
  dom.computerDisplay.textContent = EMOJIS[computadora];
  dom.computerDisplay.className   = 'choice-display filled revealed';
  dom.computerName.textContent    = NOMBRES[computadora];

  // --- Ocultar puntos de pensamiento ---
  dom.thinkingDots.classList.remove('active');

  // --- Resultado con animación ---
  dom.resultBadge.className        = `result-badge visible ${resultado}`;
  dom.resultEmoji.textContent      = RESULTADO_EMOJI[resultado];
  dom.resultText.textContent       = RESULTADO_TEXTO[resultado];

  // --- Marcador ---
  if (resultado === 'ganaste') {
    estado.victorias++;
    animarScore(dom.scoreVictorias, estado.victorias);
  } else if (resultado === 'perdiste') {
    estado.derrotas++;
    animarScore(dom.scoreDerrotas, estado.derrotas);
  } else {
    estado.empates++;
    animarScore(dom.scoreEmpates, estado.empates);
  }

  // --- Agregar al historial (máximo 10) ---
  const ronda = {
    numero:      estado.historial.length + 1,
    jugador,
    computadora,
    resultado,
  };

  estado.historial.push(ronda);
  if (estado.historial.length > 10) estado.historial.shift();

  renderizarHistorial();
}

// ==========================================
// FUNCIÓN: jugar(jugada)
// Coordina una partida completa
// ==========================================
function jugar(jugada) {
  if (estado.jugando) return;
  estado.jugando = true;

  // Deshabilitar botones y marcar activo
  dom.botones.forEach(btn => {
    btn.disabled = true;
    if (btn.dataset.jugada === jugada) {
      btn.classList.add('active');
    }
  });

  // Mostrar jugada del jugador de inmediato
  dom.playerDisplay.textContent = EMOJIS[jugada];
  dom.playerDisplay.className   = 'choice-display filled revealed';
  dom.playerName.textContent    = NOMBRES[jugada];

  // Computadora "pensando"
  dom.computerDisplay.textContent = '🤔';
  dom.computerDisplay.className   = 'choice-display thinking';
  dom.computerName.textContent    = '';
  dom.thinkingDots.classList.add('active');

  // Ocultar resultado anterior
  dom.resultBadge.className = 'result-badge';

  // Simular "pensar" (800ms) y luego revelar resultado
  setTimeout(() => {
    const jugadaPC = obtenerJugadaComputadora();
    const resultado = determinarGanador(jugada, jugadaPC);

    actualizarPantalla({ jugador: jugada, computadora: jugadaPC, resultado });

    // Reactivar botones
    setTimeout(() => {
      dom.botones.forEach(btn => {
        btn.disabled = false;
        btn.classList.remove('active');
      });
      estado.jugando = false;
    }, 350);

  }, 850);
}

// ==========================================
// HELPERS INTERNOS
// ==========================================

/** Anima un contador de puntaje */
function animarScore(el, valor) {
  el.textContent = valor;
  el.classList.remove('pop');
  void el.offsetWidth; // reflow para resetear animación
  el.classList.add('pop');
}

/** Renderiza el historial completo en el DOM */
function renderizarHistorial() {
  if (estado.historial.length === 0) {
    dom.historialEmpty.style.display = 'block';
    dom.historialList.innerHTML = '';
    dom.historialCount.textContent = '';
    return;
  }

  dom.historialEmpty.style.display = 'none';
  dom.historialCount.textContent   = `Últimas ${estado.historial.length}/10`;

  // Renderizar del más reciente al más antiguo
  const filas = [...estado.historial]
    .reverse()
    .map(p => `
      <div class="history-row ${p.resultado}">
        <span class="history-round">#${p.numero}</span>
        <div class="history-plays">
          <span title="${NOMBRES[p.jugador]}">${EMOJIS[p.jugador]}</span>
          <span class="history-vs">vs</span>
          <span title="${NOMBRES[p.computadora]}">${EMOJIS[p.computadora]}</span>
        </div>
        <span class="history-badge ${p.resultado}">${RESULTADO_TEXTO[p.resultado]}</span>
      </div>
    `).join('');

  dom.historialList.innerHTML = filas;
}

/** Reinicia el juego completo */
function reiniciarJuego() {
  estado.victorias = 0;
  estado.derrotas  = 0;
  estado.empates   = 0;
  estado.historial = [];
  estado.jugando   = false;

  // Resetear marcador
  dom.scoreVictorias.textContent = '0';
  dom.scoreEmpates.textContent   = '0';
  dom.scoreDerrotas.textContent  = '0';

  // Resetear arena
  dom.playerDisplay.textContent  = '?';
  dom.playerDisplay.className    = 'choice-display';
  dom.playerName.textContent     = '';

  dom.computerDisplay.textContent = '?';
  dom.computerDisplay.className   = 'choice-display';
  dom.computerName.textContent    = '';

  dom.thinkingDots.classList.remove('active');
  dom.resultBadge.className = 'result-badge';

  // Resetear historial
  dom.historialEmpty.style.display = 'block';
  dom.historialList.innerHTML = '';
  dom.historialCount.textContent  = '';

  // Reactivar botones
  dom.botones.forEach(btn => {
    btn.disabled = false;
    btn.classList.remove('active');
  });
}

// ==========================================
// EVENT LISTENERS
// ==========================================

// Botones de jugada
dom.botones.forEach(btn => {
  btn.addEventListener('click', () => {
    jugar(btn.dataset.jugada);
  });
});

// Botón reiniciar
dom.btnReset.addEventListener('click', reiniciarJuego);

// Teclado (1/R = Piedra, 2/P = Papel, 3/T = Tijeras)
document.addEventListener('keydown', (e) => {
  if (estado.jugando) return;
  const key = e.key.toLowerCase();
  if (key === '1' || key === 'r') jugar('piedra');
  else if (key === '2' || key === 'p') jugar('papel');
  else if (key === '3' || key === 't') jugar('tijeras');
});
