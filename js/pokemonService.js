import {
    getPokemonByName,
    getPokemonSpeciesByUrl,
    getEvolutionChainByUrl
} from "./pokeApi.js";

const getSpanishName = (species) => {
    const spanishName = species.names.find(
        (item) => item.language.name === "es"
    );

    return spanishName ? spanishName.name : species.name;
};

const getEvolutionSpecies = (chain) => {
    const evolutions = [];

    const travelChain = (node) => {
        evolutions.push({
            name: node.species.name,
            url: node.species.url
        });

        node.evolves_to.forEach((evolution) => {
            travelChain(evolution);
        });
    };

    travelChain(chain);

    return evolutions;
};

const getEvolutionDetails = async (chain) => {
    const evolutionSpecies = getEvolutionSpecies(chain);

    const evolutions = await Promise.all(
        evolutionSpecies.map(async (evolution) => {
            const pokemon = await getPokemonByName(evolution.name);
            const species = await getPokemonSpeciesByUrl(evolution.url);

            return {
                id: pokemon.id,
                name: getSpanishName(species),
                image:
                    pokemon.sprites.other["official-artwork"].front_default ||
                    pokemon.sprites.front_default
            };
        })
    );

    return evolutions;
};

const getPokemonFullData = async (name) => {
    try {
        const pokemon = await getPokemonByName(name);
        const species = await getPokemonSpeciesByUrl(pokemon.species.url);

        const evolutionData = await getEvolutionChainByUrl(
            species.evolution_chain.url
        );

        return {
            id: pokemon.id,
            name: getSpanishName(species),
            image:
                pokemon.sprites.other["official-artwork"].front_default ||
                pokemon.sprites.front_default,

            stats: pokemon.stats.map((item) => ({
                name: item.stat.name,
                value: item.base_stat
            })),

            abilities: pokemon.abilities.map((item) => item.ability.name),

            eggGroups: species.egg_groups.map((item) => item.name),

            hatchCounter: species.hatch_counter,

            evolutions: await getEvolutionDetails(evolutionData.chain)
        };
    } catch (error) {
        console.error("Error en getPokemonFullData:", error.message);
        return null;
    }
};

export { getPokemonFullData };