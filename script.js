let pokemonCount = 50;
let offset = 0;
let allPokemons = [];
let currentPokemons = [];
let currentIndex = 0;
let card2Visible = false;

 async function fetchPokemons() {
  showLoader();
  try {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${pokemonCount}&offset=${offset}`);
    const pokemonData = await response.json();
    const detailedPokemons = await Promise.all(pokemonData.results.map(async (pokemon) => {
        const response = await fetch(pokemon.url);
        return response.json();
      })
    );
    allPokemons = detailedPokemons;
    currentPokemons = allPokemons;
    displayPokemons();
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
  } finally {
    hideLoader();
  }
}
    
function showLoader() {
  document.getElementById("loader").classList.remove("hidden");
}


function hideLoader() {
  document.getElementById("loader").classList.add("hidden");
}

function generatePokemonCard(pokemon, index) {
  let types = pokemon.types.map((type) => type.type.name);
  let primaryType = types[0];
  let typeNames = types.join("<br>");

  return /*html*/ `<div class="mainPokemonDiv" onclick="showBigCard(${index})">
      <div class="pokemonCard ${primaryType}">
        <div class="pokemonNameId">
          <div>${pokemon.name}</div>
          <div>#${pokemon.id}</div>
        </div>
        <img class="pokemonImg" src="${pokemon.sprites.other.home.front_default}" alt="Image of ${pokemon.name}">
        <div class="typeClass center">${typeNames}</div>
      </div>
    </div>`;
}

function displayPokemons() {
  let pokemonContent = document.getElementById("content");
  pokemonContent.innerHTML = "";

  for (let i = 0; i < currentPokemons.length; i++) {
    let pokemonCardHtml = generatePokemonCard(currentPokemons[i], i);
    pokemonContent.innerHTML += pokemonCardHtml;
  }
}

function showBigCard(index) {
  currentIndex = index;
  const pokemon = currentPokemons[index];
  const bigPokemonCard = document.getElementById("bigPokemonCard");
  let types = pokemon.types.map((type) => type.type.name);
  let primaryType = types[0];
  let typeNames = types.join(", ");
  let abilities = pokemon.abilities.map((ability) => ability.ability.name);
  let abilityNames = abilities.join(", ");
  const typeClass = primaryType.toLowerCase();
  bigPokemonCard.innerHTML = bigPokemonCard.innerHTML = getBigCardHTML(pokemon,typeClass,typeNames,abilityNames);
  document.getElementById("overlay").style.display = "flex";
  document.body.classList.add("no-scroll");
}

function getBigCardHTML(pokemon, typeClass, typeNames, abilityNames) {
  return `
                             <div class="bigCard ${typeClass}">
                             <div class="pokemonNameIdBig">
                               <div>${pokemon.name}</div>
                               <div>#${pokemon.id}</div>
                               <img src="./img/exit.png" class="close overlayIcons" onclick="closeOverlay()" alt="close">
                             </div>
                             <div class="bigPokemonDiv center">
                              <img src="./img/left.png" class="left overlayIcons" onclick="prevPokemon()" alt="left">
                              <img class="pokemonImgBig" src="${
                                pokemon.sprites.other.home.front_default
                              }" alt="Image of ${pokemon.name}">
                              <img src="./img/right.png" class="right overlayIcons" onclick="nextPokemon()" alt="right">
                             </div>
                             <div class=card1>
                             <div class="typeClassBig1">Type: ${typeNames}</div>
                             <div class="typeClassBig">Base Exp: ${
                               pokemon.base_experience
                             }</div>
                             <div class="typeClassBig">Abilities: ${abilityNames}</div>
                             <div class="typeClassBig">Weight: ${
                               pokemon.weight
                             }</div>
                             <div class="typeClassBig">Height: ${
                               pokemon.height
                             }</div>
                              <button class="btn btn-danger toogleButton" onclick="toggleDetails()">Stats</button>
                             </div>
                             <div class="card2 ${card2Visible ? "" : "hidden"}">
        <div class="typeClassBig">Stats:</div>
        <div class="stat-bar-container">
          <div class="stat-bar-label">HP: ${pokemon.stats[0].base_stat}</div>
          <progress class="stat-bar" value="${
            pokemon.stats[0].base_stat
          }" max="100"></progress>
        </div>
        <div class="stat-bar-container">
          <div class="stat-bar-label">Attack: ${
            pokemon.stats[1].base_stat
          }</div>
          <progress class="stat-bar" value="${
            pokemon.stats[1].base_stat
          }" max="100"></progress>
        </div>
        <div class="stat-bar-container">
          <div class="stat-bar-label">Defense: ${
            pokemon.stats[2].base_stat
          }</div>
          <progress class="stat-bar" value="${
            pokemon.stats[2].base_stat
          }" max="100"></progress>
        </div>
        <div class="stat-bar-container">
          <div class="stat-bar-label">Special Attack: ${
            pokemon.stats[3].base_stat
          }</div>
          <progress class="stat-bar" value="${
            pokemon.stats[3].base_stat
          }" max="100"></progress>
        </div>
        <div class="stat-bar-container">
          <div class="stat-bar-label">Special Defense: ${
            pokemon.stats[4].base_stat
          }</div>
          <progress class="stat-bar" value="${
            pokemon.stats[4].base_stat
          }" max="100"></progress>
        </div>
        <div class="stat-bar-container">
          <div class="stat-bar-label">Speed: ${pokemon.stats[5].base_stat}</div>
          <progress class="stat-bar" value="${
            pokemon.stats[5].base_stat
          }" max="100"></progress>
        </div>
      </div>
   
    </div>`;
}

function toggleDetails() {
  const card2 = document.querySelector(".bigCard .card2");
  card2Visible = !card2Visible; //
  card2.classList.toggle("hidden");
  const card1 = document.querySelector(".bigCard .card1");
  card1.classList.toggle("no-bottom-radius", card2Visible);
  if (!card2Visible) {
    card1.classList.remove("no-bottom-radius");
  }
}

function closeOverlay() {
  document.getElementById("overlay").style.display = "none";
  document.body.classList.remove("no-scroll");
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
  pokemonCount = 20;
  let response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${pokemonCount}&offset=${offset}`);
  const pokemonData = await response.json();
  const detailedPokemons = await Promise.all(
    pokemonData.results.map(async (pokemon) => {
      const response = await fetch(pokemon.url);
      return response.json();
    })
  );
  allPokemons = allPokemons.concat(detailedPokemons);
  currentPokemons = allPokemons;
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
    pokemonSearch(searchInput);
    if (searchInput.trim() === "") {
      hideButtonDiv.classList.remove("hidden");
    } else {
      hideButtonDiv.classList.add("hidden");
    }
  });
  
  function stopPropagation(event) {
    event.stopPropagation();
  }

  


