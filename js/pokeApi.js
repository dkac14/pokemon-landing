const BASE_URL = "https://pokeapi.co/api/v2";

const fetchJson = async (url) => {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Error al obtener datos de la API");
    }

    return await response.json();
};

const getPokemonByName = async (name) => {
    const pokemonName = name.toLowerCase().trim();

    return await fetchJson(`${BASE_URL}/pokemon/${pokemonName}`);
};

const getPokemonSpeciesByUrl = async (url) => {
    return await fetchJson(url);
};

const getEvolutionChainByUrl = async (url) => {
    return await fetchJson(url);
};

export {
    getPokemonByName,
    getPokemonSpeciesByUrl,
    getEvolutionChainByUrl
};