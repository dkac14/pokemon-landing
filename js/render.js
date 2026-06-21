
import { searchPokemon } from "./js/search.js";

const getPokemon = () => {
    const input =document.getElementById("search");
    input.addEventListener("keydown", async(event) => {
        if(event.key =="Enter"){
            const pokemonName = input.value;
            const pokemon = await searchPokemon(pokemonName);
        if(pokemon === null){
            console.log("nohay");
        }

        renderPokemon(pokemon);

        }
    });
}

const renderPokemon = (pokemon) => {


};


(() => {
getPokemon();
})();
