# 🎮 Piedra Papel o Tijeras

Desafío de programación — Curso Full Stack JavaScript

## Cómo probarlo

Abre `index.html` en el navegador, o usa un servidor local:

```bash
npx serve .
```

## Estructura del proyecto

```
piedra-papel-tijeras/
├── index.html
├── README.md
└── assets/
    ├── css/
    │   └── style.css
    └── js/
        └── script.js
```

## Implementación

La lógica del juego vive en `assets/js/script.js`:

| Función | Descripción |
|---|---|
| `obtenerJugadaComputadora()` | Elige al azar entre `piedra`, `papel` o `tijeras` usando `Math.random()` |
| `determinarGanador(jugador, computadora)` | Compara las jugadas y retorna `'ganaste'`, `'perdiste'` o `'empate'` |
| `actualizarPantalla({ jugador, computadora, resultado })` | Actualiza el DOM: elecciones, resultado, marcador e historial |
| `jugar(jugada)` | Coordina una partida completa: bloquea botones, anima, llama a las funciones anteriores |

## Reglas

- 🪨 Piedra vence ✂️ Tijeras
- 📄 Papel vence 🪨 Piedra  
- ✂️ Tijeras vence 📄 Papel

## Características

### Requisitos mínimos ✅
- [x] Jugar contra la computadora
- [x] Mostrar resultado (¡Ganaste! / ¡Perdiste! / ¡Empate!)
- [x] Mostrar elecciones del jugador y la PC

### Desafíos opcionales ✅
- [x] Historial de partidas (últimas 10 rondas)
- [x] Contador de victorias / derrotas / empates
- [x] Animaciones: pulso en resultado, botón activo, reveal de elecciones, score pop
- [x] Mejoras visuales: emojis, colores por resultado, marcador, tema arcade neon

### Extras
- [x] Soporte de teclado (1/R = Piedra, 2/P = Papel, 3/T = Tijeras)
- [x] Accesibilidad básica (aria-labels, aria-live)
- [x] Diseño responsive mobile-first
- [x] CSS puro (sin frameworks), JS puro (sin bibliotecas)

## Tecnologías

- HTML5 semántico
- CSS3 (variables, animaciones, grid, flexbox)
- JavaScript ES6+ (clases no usadas intencionalmente — lógica funcional simple)
- Google Fonts: Press Start 2P + Rajdhani
