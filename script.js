// Palabra para adivinar (puedes cambiarla)
let palabraSecreta = "javascript";
let letrasAdivinadas = [];
let intentosRestantes = 6;
let juegoTerminado = false;

// Elementos del DOM
const wordContainer = document.getElementById("word-container");
const guessesContainer = document.getElementById("guesses-container");
const message = document.getElementById("message");
const letterInput = document.getElementById("letter-input");
const guessButton = document.getElementById("guess-button");
const restartButton = document.getElementById("restart-button");

// Inicializar la palabra oculta con guiones bajos
let palabraOculta = "_".repeat(palabraSecreta.length);

wordContainer.textContent = palabraOculta;

// Pista para saber cuál es la palabra (puedes cambiarla)
const pista = "Lenguaje de programación web";

// Mostrar la pista
hint.textContent = `Pista: ${pista}`;

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
    for (let i = 0; i < palabraSecreta.length; i++) {
        if (letrasAdivinadas.includes(palabraSecreta[i])) {
            palabraMostrada += palabraSecreta[i];
        } else {
            palabraMostrada += "_";
        }
    }
    palabraOculta = palabraMostrada;
    wordContainer.textContent = palabraOculta;
}

// Función para manejar los intentos del jugador y verificar la victoria
function manejarIntento() {
    if (juegoTerminado) {
        message.textContent = "El juego ha terminado. Pulsa Reiniciar Juego para jugar de nuevo.";
        return;
    }

    const letra = letterInput.value.toLowerCase();

    if (letra.length !== 1 || !/^[a-z]$/.test(letra)) {
        message.textContent = "Ingresa una letra válida.";
        return;
    }

    if (letrasAdivinadas.includes(letra)) {
        message.textContent = "Ya has adivinado esa letra.";
        return;
    }

    letrasAdivinadas.push(letra);

    if (palabraSecreta.includes(letra)) {
        actualizarPalabraOculta();

        if (palabraOculta === palabraSecreta) {
            juegoTerminado = true;
            const mensajeGanar = frasesGanar[Math.floor(Math.random() * frasesGanar.length)];
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
            const mensajePerder = frasesPerder[Math.floor(Math.random() * frasesPerder.length)];
            message.textContent = "¡Perdiste! La palabra era: " + palabraSecreta + " " + mensajePerder;
            guessButton.disabled = true;
            restartButton.style.display = "block";
        } else {
            message.textContent = `Intentos restantes: ${intentosRestantes}`;
        }
    }

    guessesContainer.textContent = `Letras adivinadas: ${letrasAdivinadas.join(", ")}`;

    letterInput.value = "";
    letterInput.focus();
}

guessButton.addEventListener("click", manejarIntento);

// Generar el abecedario
const abecedario = 'abcdefghijklmnopqrstuvwxyz';

const alphabetContainer = document.getElementById("alphabet-container");

for (let letra of abecedario) {
    const letterButton = document.createElement("button");
    letterButton.textContent = letra;
    letterButton.classList.add("alphabet-letter");
    letterButton.addEventListener("click", () => {
        letterInput.value = letra;
        manejarIntento();
    });
    alphabetContainer.appendChild(letterButton);
}

// Función para reiniciar el juego
function reiniciarJuego() {
    palabraSecreta = "javascript"; // Cambia la palabra secreta si es necesario
    letrasAdivinadas = [];
    intentosRestantes = 6;
    juegoTerminado = false;

    // Reinicia los elementos en el DOM
    palabraOculta = "_".repeat(palabraSecreta.length);
    wordContainer.textContent = palabraOculta;
    guessesContainer.textContent = "Letras adivinadas:";
    message.textContent = `Intentos restantes: ${intentosRestantes}`;
    guessButton.disabled = false;
    restartButton.style.display = "none";
}

restartButton.addEventListener("click", reiniciarJuego);

// Función para mostrar un mensaje final cuando el jugador gane
function mostrarMensajeFinal() {
    setTimeout(() => {
        const mensajeFinal = document.createElement("div");
        mensajeFinal.textContent = "¡Felicidades! Has adivinado la palabra secreta.";
        mensajeFinal.classList.add("mensaje-final");
        document.body.appendChild(mensajeFinal);
    }, 1000);
}

// Inicialización del juego
actualizarPalabraOculta();