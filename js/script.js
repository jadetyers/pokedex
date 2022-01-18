const container = document.getElementById('container');
const pokemonCount = 150;
const colours = {
	fire: '#FDDFDF',
	grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
};

const mainTypes = Object.keys(colours);

// console.log(mainTypes);

const fetchPokemon = async () => {
    for (let i = 1; i <= pokemonCount; i++) {
        await getPokemon(i);
    }
}

const getPokemon = async id => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const result = await fetch(url);
    const pokemon = await result.json();
    // console.log(pokemon);
    createPokemonCard(pokemon);
}

fetchPokemon();

function createPokemonCard(pokemon) {
    const pokemonElement = document.createElement('div');
    pokemonElement.classList.add('pokemon');

    const pokemonTypes = pokemon.types.map(element => element.type.name);
    const type = mainTypes.find(type => pokemonTypes.indexOf(type) > - 1);
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const colour = colours[type];

    pokemonElement.style.backgroundColor = colour;

    const pokemonInnerHtml = `
        <div class="img-container">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg" />
        </div>
        <div class="info">
            <span class="number">#${pokemon.id.toString().padStart(3, '0')}</span>
            <h3 class="name">${name}</h3>
            <small class="type">Type: <span>${type}</span></small>
        </div>
    `;

    pokemonElement.innerHTML = pokemonInnerHtml;

    container.appendChild(pokemonElement);
}