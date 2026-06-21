import { getPokemonTypeByName } from "./pokeApi.js";

const typeNamesEs = {
    normal: "Normal",
    fire: "Fuego",
    water: "Agua",
    electric: "Eléctrico",
    grass: "Planta",
    ice: "Hielo",
    fighting: "Lucha",
    poison: "Veneno",
    ground: "Tierra",
    flying: "Volador",
    psychic: "Psíquico",
    bug: "Bicho",
    rock: "Roca",
    ghost: "Fantasma",
    dragon: "Dragón",
    dark: "Siniestro",
    steel: "Acero",
    fairy: "Hada"
};

const getTypeNameEs = (typeName) => {
    return typeNamesEs[typeName] || typeName;
};

const dictionaryRelations = {
    double_damage_to: "Súper eficaz contra (x2)",
    half_damage_to: "Poco eficaz contra (x0.5)",
    no_damage_to: "Sin efecto contra (x0)",
    double_damage_from: "Débil contra (x2)",
    half_damage_from: "Resistente contra (x0.5)",
    no_damage_from: "Inmune a (x0)"
};

const formatTypes = (list) => {
    if (!list || list.length === 0) {
        return `
            <span class="bg-gray-100 text-gray-400 italic px-4 py-2 rounded-full text-sm font-bold">
                Ninguno
            </span>
        `;
    }

    return list.map((type) => `
        <span class="bg-yellow-100 text-yellow-800 border border-yellow-200 px-4 py-2 rounded-full text-xs sm:text-sm font-black uppercase shadow-sm">
            ${getTypeNameEs(type.name)}
        </span>
    `).join("");
};

let myDataTable = null;

const processPokemonType = async (typeName) => {
    try {
        const typeData = await getPokemonTypeByName(typeName);

        const tableCard = document.getElementById("tabla-tipos");
        const table = document.querySelector("#default-table");

        if (!table || !tableCard) {
            return;
        }

        tableCard.classList.remove("hidden");

        const container = table.querySelector("tbody");

        if (!container) {
            return;
        }

        if (myDataTable) {
            myDataTable.destroy();
            myDataTable = null;
        }

        const damageRelations = typeData.damage_relations;

        const totalHTML = Object.entries(dictionaryRelations).map(
            ([apiKey, spanishLabel]) => `
                <tr class="bg-gray-50 hover:bg-red-50 transition-colors shadow-sm">
                    <td class="px-5 py-4 font-black text-gray-800 rounded-l-2xl border-l-4 border-red-400">
                        ${spanishLabel}
                    </td>

                    <td class="px-5 py-4 rounded-r-2xl">
                        <div class="flex flex-wrap gap-2">
                            ${formatTypes(damageRelations[apiKey])}
                        </div>
                    </td>
                </tr>
            `
        ).join("");

        container.innerHTML = totalHTML;

        if (window.simpleDatatables) {
            myDataTable = new simpleDatatables.DataTable("#default-table", {
                searchable: false,
                perPageSelect: false
            });
        }
    } catch (error) {
        console.error("Error al cargar relaciones de tipo:", error);
    }
};

const enableTypeButtons = () => {
    const typeButtons = document.querySelectorAll(".type-btn");

    if (typeButtons.length === 0) {
        return;
    }

    typeButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            const typeName = event.currentTarget.getAttribute("data-type");

            if (!typeName) {
                return;
            }

            typeButtons.forEach((btn) => {
                btn.classList.remove("ring-4", "ring-white", "scale-110", "opacity-100");
                btn.classList.add("opacity-50");
            });

            event.currentTarget.classList.remove("opacity-50");
            event.currentTarget.classList.add("ring-4", "ring-white", "scale-110", "opacity-100");

            processPokemonType(typeName);
        });
    });
};

export { enableTypeButtons };