// REFERENCIA AL DOM
const contenedor = document.getElementById("pokedex");
const agregarBtn = document.getElementById("agregarBtn");
const quitarBtn = document.getElementById("quitarBtn");
const buscarBtn = document.getElementById("buscarBtn");
const buscador = document.getElementById("buscador");
const filtroTipoSelect = document.getElementById("filtroTipo");
const favoritosBtn = document.getElementById("favoritosBtn");
const favoritosContainer = document.getElementById("favoritosContainer");
const pokedexContainer = document.getElementById("pokedex");
const limpiarPokedexBtn = document.getElementById("limpiarPokedexBtn"); // Nuevo botón

let contadorPokemon = 1; // Empezamos desde la ID 1
let pokemonMostrados = []; // Array para almacenar los Pokémon mostrados y poder filtrarlos

// Funcion para consumir una API
async function obtenerPokemon(id) {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!res.ok) {
            throw new Error("Pokémon no encontrado");
        }
        const data = await res.json();

        return {
            id: data.id, // Añadido para el buscador por ID y favoritos
            nombre: data.name,
            imagen: data.sprites.other["official-artwork"].front_default,
            tipo: data.types.map(t => t.type.name).join(", "),
            tipos: data.types.map(t => t.type.name),
            experiencia: data.base_experience,
            peso: data.weight / 10, // Convertir de decagramos a kg
            altura: data.height / 10, // Convertir de decímetros a metros
            habilidades: data.abilities.map(a => a.ability.name).join(", "),
        };
    } catch (error) {
        alert("Pokémon no encontrado. Intenta con otro nombre o ID.");
        return null;
    }
}

/// Funcion para crear cartas con BOOTSTRAP
function crearCarta(pokemon, esFavorito = false) {
    const div = document.createElement("div");
    div.classList.add("col", "pokemon-card-animate"); // Clase para la animación
    div.setAttribute("data-pokemon-id", pokemon.id); // Añadir ID al elemento

    const tipoPrincipal = pokemon.tipos[0];
    const tipoClase = tipoPrincipal ? `bg-${tipoPrincipal}` : "";

    // Botón de favoritos
    const iconoFavorito = esFavorito ? '❤️' : '🤍'; // Corazón lleno o vacío
    const botonFavorito = `
        <button class="btn btn-sm btn-light favorito-btn" data-pokemon-id="${pokemon.id}">
            ${iconoFavorito}
        </button>
    `;

    div.innerHTML = `
        <div class="card h-100 shadow-sm ${tipoClase}">
            <img src="${pokemon.imagen}" class="card-img-top bg-white" style="object-fit: contain; height: 200px;" alt="${pokemon.nombre}">
            <div class="card-body">
                <h5 class="card-title text-capitalize">${pokemon.nombre} <small class="text-muted">#${pokemon.id}</small></h5>
                <p class="card-text"><strong>Tipo:</strong> ${pokemon.tipo}</p>
                <p class="card-text"><strong>Exp:</strong> ${pokemon.experiencia}</p>
                <p class="card-text"><strong>Peso:</strong> ${pokemon.peso} kg | <strong>Altura:</strong> ${pokemon.altura} m</p>
                <p class="card-text"><strong>Habilidades:</strong> ${pokemon.habilidades}</p>
                ${botonFavorito}
            </div>
        </div>
    `;
}