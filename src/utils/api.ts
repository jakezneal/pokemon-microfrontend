import { fetchWithCache } from '../../../api/src/react-mf-api';

export const getPokemon = (pageNum = 1) => {
    return fetchWithCache(`pokemon?page=${pageNum}`);
};

export const getSinglePokemon = (id: number) => {
    return fetchWithCache(`pokemon/${id}/`);
};
