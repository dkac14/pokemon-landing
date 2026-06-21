import { getPokemonByName } from "./pokeApi.js";

const quizPokemonNames = [
    "pikachu",
    "charmander",
    "bulbasaur",
    "squirtle",
    "jigglypuff",
    "meowth",
    "psyduck",
    "eevee",
    "snorlax",
    "mewtwo"
];

const pokemonNamesEs = {
    pikachu: "Pikachu",
    charmander: "Charmander",
    bulbasaur: "Bulbasaur",
    squirtle: "Squirtle",
    jigglypuff: "Jigglypuff",
    meowth: "Meowth",
    psyduck: "Psyduck",
    eevee: "Eevee",
    snorlax: "Snorlax",
    mewtwo: "Mewtwo"
};

let currentQuestion = 0;
let score = 0;
let currentAnswer = "";

const getRandomOptions = (correctName) => {
    const incorrectOptions = quizPokemonNames
        .filter((name) => name !== correctName)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

    return [...incorrectOptions, correctName].sort(() => Math.random() - 0.5);
};

const renderQuestion = async () => {
    const quizImage = document.getElementById("quiz-image");
    const quizOptions = document.getElementById("quiz-options");
    const quizProgress = document.getElementById("quiz-progress");
    const quizScore = document.getElementById("quiz-score");
    const quizFeedback = document.getElementById("quiz-feedback");
    const quizNext = document.getElementById("quiz-next");
    const quizRestart = document.getElementById("quiz-restart");
    const quizQuestion = document.getElementById("quiz-question");

    if (
        !quizImage ||
        !quizOptions ||
        !quizProgress ||
        !quizScore ||
        !quizFeedback ||
        !quizNext ||
        !quizRestart ||
        !quizQuestion
    ) {
        return;
    }

    quizImage.classList.remove("hidden");
    quizFeedback.textContent = "";
    quizFeedback.className = "mt-6 font-black text-lg";
    quizNext.classList.add("hidden");
    quizRestart.classList.add("hidden");

    quizQuestion.textContent = "¿Cuál es el nombre de este Pokémon?";

    currentAnswer = quizPokemonNames[currentQuestion];

    const pokemon = await getPokemonByName(currentAnswer);

    quizImage.src =
        pokemon.sprites.other["official-artwork"].front_default ||
        pokemon.sprites.front_default;

    quizImage.alt = pokemonNamesEs[currentAnswer];

    quizProgress.textContent = `Pregunta ${currentQuestion + 1}/10`;
    quizScore.textContent = `Puntaje: ${score}`;

    const options = getRandomOptions(currentAnswer);

    quizOptions.innerHTML = options.map((option) => `
        <button
            class="quiz-option bg-white border-4 border-gray-200 text-gray-800 px-5 py-4 rounded-2xl font-black hover:border-red-400 hover:bg-red-50 transition-all shadow-sm"
            data-name="${option}"
        >
            ${pokemonNamesEs[option]}
        </button>
    `).join("");

    document.querySelectorAll(".quiz-option").forEach((button) => {
        button.addEventListener("click", handleAnswer);
    });
};

const handleAnswer = (event) => {
    const selectedName = event.currentTarget.getAttribute("data-name");
    const quizFeedback = document.getElementById("quiz-feedback");
    const quizNext = document.getElementById("quiz-next");
    const optionButtons = document.querySelectorAll(".quiz-option");

    optionButtons.forEach((button) => {
        button.disabled = true;

        const buttonName = button.getAttribute("data-name");

        if (buttonName === currentAnswer) {
            button.classList.add("border-green-400", "bg-green-50", "text-green-700");
        }

        if (buttonName === selectedName && selectedName !== currentAnswer) {
            button.classList.add("border-red-400", "bg-red-50", "text-red-700");
        }
    });

    if (selectedName === currentAnswer) {
        score++;
        quizFeedback.textContent = "¡Correcto! Ganaste un punto.";
        quizFeedback.classList.add("text-green-600");
    } else {
        quizFeedback.textContent = `Casi. Era ${pokemonNamesEs[currentAnswer]}.`;
        quizFeedback.classList.add("text-red-600");
    }

    quizNext.classList.remove("hidden");
};

const showFinalResult = async () => {
    const quizImage = document.getElementById("quiz-image");
    const quizOptions = document.getElementById("quiz-options");
    const quizProgress = document.getElementById("quiz-progress");
    const quizScore = document.getElementById("quiz-score");
    const quizFeedback = document.getElementById("quiz-feedback");
    const quizNext = document.getElementById("quiz-next");
    const quizRestart = document.getElementById("quiz-restart");
    const quizQuestion = document.getElementById("quiz-question");

    if (
        !quizImage ||
        !quizOptions ||
        !quizProgress ||
        !quizScore ||
        !quizFeedback ||
        !quizNext ||
        !quizRestart ||
        !quizQuestion
    ) {
        return;
    }

    const ditto = await getPokemonByName("ditto");

    quizImage.classList.remove("hidden");
    quizImage.src =
        ditto.sprites.other["official-artwork"].front_default ||
        ditto.sprites.front_default;
    quizImage.alt = "Ditto";

    quizOptions.innerHTML = "";
    quizProgress.textContent = "Reto terminado";
    quizScore.textContent = `Puntaje final: ${score}/10`;

    if (score >= 7) {
        quizQuestion.textContent = "¡Ditto te felicita!";
        quizFeedback.textContent =
            "¡Excelente! Estás listo para ganar una medalla.";
        quizFeedback.className = "mt-6 font-black text-lg text-green-600";
    } else {
        quizQuestion.textContent = "¡Ditto cree en ti!";
        quizFeedback.textContent =
            "Buen intento. Puedes jugar otra vez para mejorar tu puntaje.";
        quizFeedback.className = "mt-6 font-black text-lg text-red-600";
    }

    quizNext.classList.add("hidden");
    quizRestart.classList.remove("hidden");
};

const nextQuestion = () => {
    currentQuestion++;

    if (currentQuestion >= quizPokemonNames.length) {
        showFinalResult();
        return;
    }

    renderQuestion();
};

const restartQuiz = () => {
    currentQuestion = 0;
    score = 0;
    renderQuestion();
};

const enablePokemonQuiz = () => {
    const quizNext = document.getElementById("quiz-next");
    const quizRestart = document.getElementById("quiz-restart");

    if (!quizNext || !quizRestart) {
        return;
    }

    quizNext.addEventListener("click", nextQuestion);
    quizRestart.addEventListener("click", restartQuiz);

    renderQuestion();
};

export { enablePokemonQuiz };