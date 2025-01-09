import { useEffect, useState } from "react";
import { ListPokemonRepository } from "../data/repository/list_pokemon/list_pokemon_repository";

export const useListPokemon = () => {
    const [listPokemon, setListPokemon] = useState<Array<Pokemon> | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currOffset, setOffset] = useState(0);
    const [loadingMore, setLoadingMore] = useState(false);

    useEffect(() => {
        // setOffset(0)
        // setListPokemon(null)
        loadListPokemon();
    }, []);

    const loadListPokemon = async () => {
        const listPokemonRepository = new ListPokemonRepository();

        try {
            setLoading(currOffset === 0 ? true : false);
            setLoadingMore(currOffset === 0 ? false : true);
            const fetchedListPokemon = await listPokemonRepository.fetchListPokemon(currOffset);
            setListPokemon(currOffset === 0 ? fetchedListPokemon : [...(listPokemon as []), ...fetchedListPokemon]);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    const loadMore = () => {
        setOffset(currOffset + 20);
        if (!loadingMore && currOffset != 0) {
            setLoadingMore(true);
            loadListPokemon();
        }
    }

    return {listPokemon, loading, error, loadMore, loadingMore};
}