import { POKEMON } from "../../api_constants";

export class ListPokemonRepository {
    private URL = POKEMON;

    async fetchListPokemon(offset: number): Promise<Array<Pokemon>> {
        const NEW_URL = this.URL + `?offset=${offset}&limit=20`;
        console.log('urlnya',NEW_URL)
        const response = await fetch(NEW_URL);
        if (!response.ok) {
            throw new Error("Failed to fetch pokemon");
        }
        const data: CommonResponse = await response.json();
        return data.results;
    }
}