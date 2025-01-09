import { POKEMON, POKEMON_IMAGE } from "../data/api_constants";

export function getPokemonImage(this: string): string {
    const idPokemon : string = this.replace(POKEMON, "");
    const newId : string = idPokemon.substring(0, idPokemon.length - 1);
    const pokemonUrl : string = POKEMON_IMAGE.replace("index", newId);
    return pokemonUrl;
}

declare global {
    interface String {
        getPokemonImage(): string;
    }
}

String.prototype.getPokemonImage = getPokemonImage;

export function uppercaseFirst(this: string): string {
    const result : string = this[0].toUpperCase() + this.substring(1);
    return result;
}

declare global {
    interface String {
        uppercaseFirst(): string;
    }
}

String.prototype.uppercaseFirst = uppercaseFirst;