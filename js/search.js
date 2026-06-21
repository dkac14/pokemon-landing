const searchPokemon = async (name) => {
  try {

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

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

export { searchPokemon };
