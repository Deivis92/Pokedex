let pokemonCount = 50;
let offset = 0;
let allPokemons = [];
let currentPokemons = [];

async function fetchPokemons() {
  let response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${pokemonCount}&offset=${offset}`
  );
  const pokemonData = await response.json();

  // Fetch detailed information for each Pokémon -Dieser Code ruft detaillierte Informationen für jedes Pokémon ab, indem er die URLs in den Basisdaten verwendet.
  const detailedPokemons = await Promise.all(
    pokemonData.results.map(async (pokemon) => {
      const response = await fetch(pokemon.url);
      return response.json();
    })
  );

  allPokemons = detailedPokemons;
  currentPokemons = allPokemons; // Set currentPokemons to allPokemons initially 20.14
  console.log(allPokemons);
  displayPokemons();
}

function displayPokemons() {
  let pokemonContent = document.getElementById("content");
  pokemonContent.innerHTML = "";
  for (let i = 0; i < currentPokemons.length; i++) {
    let types = currentPokemons[i].types.map((type) => type.type.name);
    let primaryType = types[0];
    let typeNames = types.join("<br> ");

    pokemonContent.innerHTML += /*html*/ `<div class="mainPokemonDiv" onclick="showBigCard(${i})">
      <div class="pokemonCard ${primaryType}">
        <div class="pokemonNameId">
          <div>${currentPokemons[i].name}</div>
          <div>#${currentPokemons[i].id}</div>
        </div>
         
     <img class="pokemonImg" src="${currentPokemons[i].sprites.other.home.front_default}" alt="Image of ${currentPokemons[i].name}">
      
     <div class="typeClass center">${typeNames}</div>
     </div>`;
  }
}

function showBigCard(index) {
  currentIndex = index;
  const pokemon = currentPokemons[index];
  const bigPokemonCard = document.getElementById('bigPokemonCard');
  bigPokemonCard.innerHTML = `
    <div class="pokemonNameId">
      <div>${pokemon.name}</div>
      <div>#${pokemon.id}</div>
    </div>
    <img class="pokemonImg" src="${pokemon.sprites.other.home.front_default}" alt="Image of ${pokemon.name}">
    <div class="typeClass center">${pokemon.types.map(type => type.type.name).join(", ")}</div>
  `;
  document.getElementById('overlay').style.display = 'flex';
}

function closeOverlay() {
  document.getElementById('overlay').style.display = 'none';
}

function prevPokemon() {
  if (currentIndex > 0) {
    showBigCard(currentIndex - 1);
  }
}

function nextPokemon() {
  if (currentIndex < currentPokemons.length - 1) {
    showBigCard(currentIndex + 1);
  }
}

fetchPokemons();

async function init() {
  await fetchPokemons();
  currentPokemons = allPokemons;
  displayPokemons();
}

async function loadMorePokemons() {
  offset += pokemonCount;
  pokemonCount = 20; // Update the count to load additional 20 Pokémons each time
  let response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${pokemonCount}&offset=${offset}`
  );
  const pokemonData = await response.json();

  // Fetch detailed information for each Pokémon
  const detailedPokemons = await Promise.all(
    pokemonData.results.map(async (pokemon) => {
      const response = await fetch(pokemon.url);
      return response.json();
    })
  );

  allPokemons = allPokemons.concat(detailedPokemons); // Concatenate new Pokémon data to the existing list
  currentPokemons = allPokemons; // Update currentPokemons
  console.log(allPokemons);
  displayPokemons();
}

function pokemonSearch(filterWord) {
  currentPokemons = allPokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(filterWord.toLowerCase())
  );
  displayPokemons();
}

init();

document.getElementById("searchInput").addEventListener("input", (event) => {
  const searchInput = event.target.value;
  const hideButtonDiv = document.querySelector(".loadMore.center");

  // Call the pokemonSearch function
  pokemonSearch(searchInput);

  // Check if the search input is empty
  if (searchInput.trim() === "") {
    // If empty, remove the 'hidden' class to display the button
    hideButtonDiv.classList.remove("hidden");
  } else {
    // If not empty, add the 'hidden' class to hide the button
    hideButtonDiv.classList.add("hidden");
  }
});
