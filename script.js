// Palabras para adivinar y sus pistas
const palabrasSecretas = [
  { palabra: "javascript", pista: "Lenguaje de programación web" },
  { palabra: "python", pista: "Lenguaje de programación versátil" },
  { palabra: "html", pista: "Lenguaje de marcado para páginas web" },
  { palabra: "css", pista: "Lenguaje de estilos para páginas web" },
  { palabra: "java", pista: "Lenguaje de programación orientado a objetos" },
  // Agrega más palabras y pistas aquí
];
// Palabra y pista actual
let palabraActual = palabrasSecretas[0];
let letrasAdivinadas = [];
let intentosRestantes = 6;
let juegoTerminado = false;
// Elementos del DOM
const wordContainer = document.getElementById("word-container");
const guessesContainer = document.getElementById("guesses-container");
const message = document.getElementById("message");
const hint = document.getElementById("hint");
const guessButton = document.getElementById("guess-button");
const restartButton = document.getElementById("restart-button");
// Inicializar la palabra oculta con guiones bajos
let palabraOculta = "_".repeat(palabraActual.palabra.length);
wordContainer.textContent = palabraOculta;
// Mostrar la pista
hint.textContent = `Pista: ${palabraActual.pista}`;
// Frases de felicitación cuando el jugador gana
const frasesGanar = [
  "¡Felicitaciones! Eres un genio, ¡ganaste!",
  "¡Eres increíble! Ganaste el juego del ahorcado.",
  "¡Ganaste! Eres un maestro en esto.",
  "Excelente trabajo, ¡ganaste!",
  "¡Eres un adivino experto! Ganaste el juego.",
  "¡Ganador absoluto! Felicidades.",
  // Agrega más frases de felicitación aquí
];
// Frases de ánimo cuando el jugador pierde
const frasesPerder = [
  "No te preocupes, ¡la próxima vez lo harás mejor!",
  "Cada error es una oportunidad para aprender. ¡Sigue intentando!",
  "No hay derrotas, solo lecciones. ¡Sigue adelante!",
  "La perseverancia es la clave del éxito. ¡No te rindas!",
  "Recuerda, los campeones se levantan después de caer. ¡Sigue adelante!",
  // Agrega más frases de ánimo aquí
];
// Función para actualizar la palabra oculta con las letras adivinadas
function actualizarPalabraOculta() {
  let palabraMostrada = "";
  for (let i = 0; i < palabraActual.palabra.length; i++) {
    if (letrasAdivinadas.includes(palabraActual.palabra[i])) {
      palabraMostrada += palabraActual.palabra[i];
    } else {
      palabraMostrada += "_";
    }
  }
  palabraOculta = palabraMostrada;
  wordContainer.textContent = palabraOculta;
}
// Función para manejar los intentos del jugador y verificar la victoria
function manejarIntento(letra) {
  if (juegoTerminado) {
    message.textContent =
      "El juego ha terminado. Pulsa Reiniciar Juego para jugar de nuevo.";
    return;
  }
  letra = letra.toLowerCase();
  if (letrasAdivinadas.includes(letra)) {
    message.textContent = "Ya has adivinado esa letra.";
    return;
  }
  letrasAdivinadas.push(letra);
  if (palabraActual.palabra.includes(letra)) {
    actualizarPalabraOculta();
    if (palabraOculta === palabraActual.palabra) {
      juegoTerminado = true;
      const mensajeGanar =
        frasesGanar[Math.floor(Math.random() * frasesGanar.length)];
      message.textContent = "¡Ganaste! " + mensajeGanar;
      guessButton.disabled = true;
      restartButton.style.display = "block";
      mostrarMensajeFinal();
    } else {
      message.textContent = "¡Correcto! Has adivinado una letra.";
    }
  } else {
    intentosRestantes--;
    if (intentosRestantes === 0) {
      juegoTerminado = true;
      const mensajePerder =
        frasesPerder[Math.floor(Math.random() * frasesPerder.length)];
      message.textContent =
        "¡Perdiste! La palabra era: " +
        palabraActual.palabra +
        " " +
        mensajePerder;
      guessButton.disabled = true;
      restartButton.style.display = "block";
    } else {
      message.textContent = `Intentos restantes: ${intentosRestantes}`;
    }
  }
  guessesContainer.textContent = `Letras adivinadas: ${letrasAdivinadas.join(
    ", "
  )}`;
}
// Generar el abecedario
const abecedario = "abcdefghijklmnopqrstuvwxyz";
const alphabetContainer = document.getElementById("alphabet-container");
for (let letra of abecedario) {
  const letterButton = document.createElement("button");
  letterButton.textContent = letra;
  letterButton.classList.add("alphabet-letter");
  letterButton.addEventListener("click", () => {
    manejarIntento(letra); // Llama a manejarIntento con la letra correspondiente
  });
  alphabetContainer.appendChild(letterButton);
}
// Función para reiniciar el juego
function reiniciarJuego() {
  palabraActual = palabrasSecretas[Math.floor(Math.random() * palabrasSecretas.length)];
  letrasAdivinadas = [];
  intentosRestantes = 6;
  juegoTerminado = false;
  // Reinicia los elementos en el DOM
  palabraOculta = "_".repeat(palabraActual.palabra.length);
  wordContainer.textContent = palabraOculta;
  guessesContainer.textContent = "Letras adivinadas:";
  message.textContent = `Intentos restantes: ${intentosRestantes}`;
  hint.textContent = `Pista: ${palabraActual.pista}`;
  guessButton.disabled = false;
  restartButton.style.display = "none";
}
restartButton.addEventListener("click", reiniciarJuego);
// Función para mostrar un mensaje final cuando el jugador gane
function mostrarMensajeFinal() {
  if (!juegoTerminado || palabraOculta === palabraActual.palabra) {
    return; // No muestra el mensaje si el juego no ha terminado o si el jugador ha ganado
  }
  setTimeout(() => {
    const mensajeFinal = document.createElement("div");
    mensajeFinal.textContent = "¡Felicidades! Has adivinado la palabra secreta.";
    mensajeFinal.classList.add("mensaje-final");
    document.body.appendChild(mensajeFinal);
  }, 1000);
}
// Obtén una referencia al elemento de audio
const audioPlayer = document.getElementById("audio-player");
// Obtén una referencia al botón "SE FELIZ!!!"
const happyButton = document.getElementById("guess-button");
// Agrega un evento de clic al botón
happyButton.addEventListener("click", () => {
  // Reproduce el audio
  audioPlayer.play();
});
// Inicialización del juego
actualizarPalabraOculta();