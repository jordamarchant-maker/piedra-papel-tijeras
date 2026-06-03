# Challenge — Piedra Papel o Tijeras

## Objetivo

Construir un juego funcional utilizando HTML, CSS y Javascript.

## Requisitos mínimos

- [x] Jugar contra computadora
- [x] Mostrar resultado
- [x] Mostrar elecciones

## Desafíos opcionales

- [x] Historial de partidas (últimas 10 rondas)
- [x] Contador de victorias
- [x] Animaciones (pulso en resultado, botón activo)
- [x] Mejoras visuales (emojis, colores por resultado, marcador)

## Cómo probarlo

Abre `index.html` en el navegador o usa un servidor local:

```bash
npx serve .
```

## Implementación

La lógica vive en `assets/js/script.js`:

- `obtenerJugadaComputadora()` — elige al azar entre piedra, papel o tijeras
- `determinarGanador()` — compara jugadas y devuelve `ganaste`, `perdiste` o `empate`
- `actualizarPantalla()` — actualiza DOM, marcador e historial
- `jugar()` — coordina una partida completa

## Entrega

1. Hacer fork
2. Clonar repositorio
3. Trabajar en equipo
4. Actualizar README
5. Subir cambios

## Preguntas guía

- ¿Qué datos necesita el sistema? — jugadas, resultado, contadores, historial
- ¿Qué funciones existen? — generar jugada PC, comparar, actualizar UI, jugar
- ¿Qué reglas deben cumplirse? — piedra vence tijeras, papel vence piedra, tijeras vence papel
- ¿Cómo dividirían el problema? — lógica del juego, estado/contadores, interfaz
