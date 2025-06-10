class PokemonViewer {
    constructor() {
        this.API_BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';
        this.initializeElements();
        this.addEventListeners();
    }

    initializeElements() {
        this.searchInput = document.getElementById('searchInput');
        this.searchButton = document.getElementById('searchButton');
        this.pokemonCard = document.getElementById('pokemonCard');
        this.loadingIndicator = document.getElementById('loadingIndicator');
        this.errorMessage = document.getElementById('errorMessage');
        this.pokemonSprite = document.getElementById('pokemonSprite');
        this.pokemonName = document.getElementById('pokemonName');
        this.pokemonId = document.getElementById('pokemonId');
        this.pokemonTypes = document.getElementById('pokemonTypes');
        this.pokemonHeight = document.getElementById('pokemonHeight');
        this.pokemonWeight = document.getElementById('pokemonWeight');
    }

    addEventListeners() {
        this.searchButton.addEventListener('click', () => this.searchPokemon());
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.searchPokemon();
        });
    }

    showLoading() {
        this.loadingIndicator.classList.remove('hidden');
        this.pokemonCard.classList.add('hidden');
        this.errorMessage.classList.add('hidden');
    }

    hideLoading() {
        this.loadingIndicator.classList.add('hidden');
    }

    showError(message) {
        this.errorMessage.textContent = message;
        this.errorMessage.classList.remove('hidden');
        this.pokemonCard.classList.add('hidden');
    }

    async searchPokemon() {
        const searchTerm = this.searchInput.value.trim().toLowerCase();
        if (!searchTerm) {
            this.showError('ポケモンの名前か図鑑番号を入力してください');
            return;
        }

        this.showLoading();

        try {
            const response = await fetch(`${this.API_BASE_URL}${searchTerm}`);
            if (!response.ok) throw new Error('ポケモンが見つかりませんでした');
            
            const data = await response.json();
            this.displayPokemon(data);
        } catch (error) {
            this.showError(error.message);
        } finally {
            this.hideLoading();
        }
    }

    displayPokemon(pokemon) {
        this.pokemonSprite.src = pokemon.sprites.front_default;
        this.pokemonName.textContent = pokemon.name;
        this.pokemonId.textContent = pokemon.id;
        this.pokemonTypes.textContent = pokemon.types
            .map(type => type.type.name)
            .join(', ');
        this.pokemonHeight.textContent = (pokemon.height / 10).toFixed(1);
        this.pokemonWeight.textContent = (pokemon.weight / 10).toFixed(1);

        this.pokemonCard.classList.remove('hidden');
        this.errorMessage.classList.add('hidden');
    }
}

// アプリケーションの初期化
document.addEventListener('DOMContentLoaded', () => {
    new PokemonViewer();
});