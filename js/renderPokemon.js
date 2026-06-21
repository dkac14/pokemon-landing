"use strict";

const statNamesEs = {
    hp: "Vida",
    attack: "Ataque",
    defense: "Defensa",
    "special-attack": "Ataque especial",
    "special-defense": "Defensa especial",
    speed: "Velocidad"
};

const eggGroupsEs = {
    monster: "Monstruo",
    water1: "Agua 1",
    water2: "Agua 2",
    water3: "Agua 3",
    bug: "Bicho",
    flying: "Volador",
    ground: "Campo",
    fairy: "Hada",
    plant: "Planta",
    humanshape: "Humanoide",
    mineral: "Mineral",
    indeterminate: "Amorfo",
    ditto: "Ditto",
    dragon: "Dragón",
    "no-eggs": "Sin huevos",
    no_eggs: "Sin huevos"
};

const formatText = (text) => {
    return text
        .replaceAll("-", " ")
        .replaceAll("_", " ")
        .replace(/\b\w/g, (letter) => letter.toUpperCase());
};

const getStatNameEs = (statName) => {
    return statNamesEs[statName] || formatText(statName);
};

const getEggGroupEs = (eggGroup) => {
    return eggGroupsEs[eggGroup] || formatText(eggGroup);
};

const getStatPercent = (value) => {
    const maxStat = 180;
    return Math.min((value / maxStat) * 100, 100);
};

const renderPokemon = (pokemon) => {
    const contenedorPokemon = document.getElementById("contenedor-pokemon");
    const mensajeInicial = document.getElementById("mensaje-inicial");

    const nombrePokemon = document.getElementById("nombre-pokemon");
    const imgPokemon = document.getElementById("img-pokemon");
    const statsPokemon = document.getElementById("stats-pokemon");
    const tarjetaEvolucion = document.getElementById("tarjeta-evolucion");
    const tipoHuevo = document.getElementById("tipo-huevo");
    const duracionCrianza = document.getElementById("duracion-crianza");
    const habilidadTarjeta = document.getElementById("habilidad-tarjeta");

    if (!pokemon) {
        console.error("No hay datos del Pokémon para renderizar");
        return;
    }

    if (contenedorPokemon) {
        contenedorPokemon.classList.remove("hidden");
    }

    if (mensajeInicial) {
        mensajeInicial.classList.add("hidden");
    }

    nombrePokemon.textContent = formatText(pokemon.name);

    imgPokemon.src = pokemon.image;
    imgPokemon.alt = pokemon.name;
    imgPokemon.className = `
        w-40 sm:w-52 md:w-64 
        mx-auto 
        drop-shadow-2xl 
        hover:scale-105 
        transition-transform 
        duration-300
    `;

    statsPokemon.innerHTML = pokemon.stats.map((stat) => `
        <article class="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
            <div class="flex justify-between items-center gap-4 mb-3">
                <span class="font-black text-gray-700 text-sm sm:text-base">
                    ${getStatNameEs(stat.name)}
                </span>

                <span class="font-black text-red-500 text-sm sm:text-base">
                    ${stat.value}
                </span>
            </div>

            <div class="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                <div 
                    class="bg-red-500 h-3 rounded-full transition-all duration-500"
                    style="width: ${getStatPercent(stat.value)}%;"
                ></div>
            </div>
        </article>
    `).join("");

    habilidadTarjeta.innerHTML = pokemon.abilities.map((ability) => `
        <span class="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full font-bold text-sm shadow-sm">
            ${formatText(ability)}
        </span>
    `).join("");

    tarjetaEvolucion.innerHTML = pokemon.evolutions.map((evolution) => `
        <article class="bg-white border border-gray-100 rounded-3xl p-4 sm:p-5 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all text-center">
            <div class="bg-gradient-to-br from-yellow-50 via-white to-blue-50 rounded-2xl p-4 mb-4">
                <img 
                    src="${evolution.image}" 
                    alt="${evolution.name}"
                    class="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-contain mx-auto"
                >
            </div>

            <h3 class="text-base sm:text-lg font-black text-gray-800 capitalize">
                ${formatText(evolution.name)}
            </h3>

            <p class="text-xs font-bold text-gray-400 mt-1">
                #${evolution.id}
            </p>
        </article>
    `).join("");

    tipoHuevo.innerHTML = pokemon.eggGroups.map((egg) => `
        <span class="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-bold shadow-sm">
            ${getEggGroupEs(egg)}
        </span>
    `).join("");

    duracionCrianza.innerHTML = `
        <div class="bg-blue-100 text-blue-700 px-4 py-3 rounded-2xl font-bold text-sm sm:text-base text-center shadow-sm">
            ${pokemon.hatchCounter} ciclos de eclosión
        </div>
    `;
};

export { renderPokemon };