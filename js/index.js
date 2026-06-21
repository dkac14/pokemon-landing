import { getPokemonFullData } from "./pokemonService.js";
import { renderPokemon } from "./renderPokemon.js";

const enablePokemonSearch = () => {
  const search = document.getElementById("search");

  search.addEventListener("keydown", async (event) => {
    if (event.key !== "Enter") return;

    const pokemonName = search.value;

    if (pokemonName.trim() === "") {
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

(() => {
  enablePokemonSearch();
})();