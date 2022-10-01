const pokemonTotal = 899;

const catchPokemon = async () => {
    for (let i = 1; i < pokemonTotal; i++) {
        await(getPokemon(i));
    }
};

const getPokemon = async id => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const pokemon = await res.json();
    createEntry(pokemon)
}

catchPokemon()

function createEntry(data){
    let AllPokemonHolder = document.getElementById('pokedexContainer');
    
    let pokeContainer = document.createElement("div")
    pokeContainer.classList.add("pokemonHolder");
    
    let infoContainer = document.createElement("div")
    infoContainer.classList.add("heightWeight");
    infoContainer.innerText = `Height :${data.height / 10}` +' M ' + '\n' +
    `Weight :${data.weight / 10}` +' Kg'

    pokeImage(data.id, pokeContainer);

    let pokemonNumber = document.createElement('div')
    pokemonNumber.classList.add("pokemonNumber")
    pokemonNumber.innerText = ` #${data.id}`

    let pokemonName = document.createElement('h4')
    pokemonName.innerText = data.name
    
    let pokemonTypes = document.createElement('ul')
    pokemonTypes.classList.add("typeList")

    typeList(data.types, pokemonTypes)

    pokeContainer.append(pokemonName, pokemonNumber, pokemonTypes, infoContainer);
    AllPokemonHolder.appendChild(pokeContainer);
}



function typeList(types, ul) {
    types.forEach((type) => {
        let listType = document.createElement('li');
        listType.innerText = type.type.name;
        ul.append(listType)
    })
}

function pokeImage (id, containerDiv) {
    let imageHolder = document.createElement('div')
    imageHolder.classList.add('image')
    imageHolder.setAttribute('id', 'spriteBox')//need to add id for css styling

    let pokemonImage = document.createElement('img')
    pokemonImage.srcset = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
    
    imageHolder.append(pokemonImage); 
    containerDiv.append(imageHolder);
}

