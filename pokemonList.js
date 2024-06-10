const POKEMON_MAX = 50;
const listWrapper = document.querySelector(".listWrapper");

const searchInput = document.querySelector("#searchInput");
const nameFilter = document.querySelector("#name");
const notFoundAlert = document.querySelector("#notFound");

let allPokemons = [];

fetch(`https://pokeapi.co/api/v2/pokemon?limit=${POKEMON_MAX}&offset=0`)
  .then((response) => response.json())
  .then((data) => {
    allPokemons = data.results;
    displayPokemons(allPokemons);
    
  });
  

async function fetchPokemonData(id) {
  try {
    const [pokemon, pokemonSpecies] = await Promise.all([
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) => res.json()),
      fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then((res) =>
        res.json()
      ),
    ]);
    return true;
  } catch (error) {
    console.error("Failed to fetch Pokemon data");
  }
}

function displayPokemons(pokemonList) {
    listWrapper.innerHTML = "";
    
    for (let i = 0; i < pokemonList.length; i++) {
      const pokemon = pokemonList[i];
      const pokemonID = pokemon.url.split("/")[6]; // Extracting the Pokémon ID from the URL
      const listItem = document.createElement("div");
      listItem.className = "listItem";
      listItem.innerHTML = /*html*/ `
        <div class="numberCard">
          <p class="pokemonNameClass">${pokemonID}</p>
        </div>
        <div class="pokemonImg">
          <img src="https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/other/dream-world/${pokemonID}.svg" alt="${pokemon.name}" />
        </div>
        <div class="namePokemonCard">
          <p class="pokemonNameClass">${pokemon.name}</p>
        </div>
      `;
      listWrapper.appendChild(listItem);
    }
  }