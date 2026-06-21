import { getPokemonFullData } from "./pokemonService.js";
import { renderPokemon } from "./renderPokemon.js";
import { enableTypeButtons } from "./typeRelations.js";
import { enablePokemonQuiz } from "./quizPokemon.js";

const enablePokemonSearch = () => {
    const search = document.getElementById("search");

    if (!search) {
        return;
    }

    search.addEventListener("keydown", async (event) => {
        if (event.key !== "Enter") {
            return;
        }

        const pokemonName = search.value.trim();

        if (pokemonName === "") {
            console.log("Escribe el nombre de un Pokémon");
            return;
        }

        const pokemon = await getPokemonFullData(pokemonName);

        if (pokemon === null) {
            console.log("Pokémon no encontrado");
            return;
        }

        renderPokemon(pokemon);
    });
};

document.addEventListener("DOMContentLoaded", () => {
    enablePokemonSearch();
    enableTypeButtons();
    enablePokemonQuiz();
});