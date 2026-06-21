const searchPokemon = async (name) => {
  try {
    const pokemonName = name.toLowerCase().trim();

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

    if (!response.ok) {
      throw new Error("Pokémon no encontrado");
    }

    const data = await response.json();

    return data;

  } catch (error) {
    console.error("Error:", error.message);
    return null;
  }
};

const searchPokemonSpecies = async (pokemon) => {
  try {

    const response = await fetch(pokemon.species.url);
    const data = response.json();
    



  }catch (error) {

  }
};

export { searchPokemon };