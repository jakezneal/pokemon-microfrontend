import { useEffect, useReducer } from 'react';
import { getPokemon } from '../utils/api';
import PokemonList from '../pokemon-list.component';
import { Pokemon } from '../utils/types';

const PokemonPage = () => {
    interface State {
        pokemon: Pokemon[];
        loading: boolean;
        page: number;
        nextPage: boolean;
    }

    type Action = { type: 'addPokemon'; payload: { nextPage: boolean; results: object[] } } | { type: 'fetchPokemon' };

    const initialState: State = {
        pokemon: [],
        loading: false,
        page: 0,
        nextPage: true,
    };

    const reducer = (state: State, action: Action) => {
        const newState = { ...state };
        switch (action.type) {
            case 'addPokemon':
                const { payload } = action;
                newState.loading = false;
                newState.nextPage = payload.nextPage;
                newState.pokemon = [...newState.pokemon, ...payload.results] as Pokemon[];
                return newState;
            case 'fetchPokemon':
                newState.loading = true;
                newState.page = newState.page + 1;
                return newState;
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, initialState);
    const { page, nextPage, loading } = state;

    useEffect(() => {
        dispatch({ type: 'fetchPokemon' });
    }, []);

    useEffect(() => {
        if (page > 0) {
            const req$ = getPokemon(page).subscribe((results: { next: boolean; results: Pokemon[] }) => {
                dispatch({
                    type: 'addPokemon',
                    payload: {
                        nextPage: !!results.next,
                        results: results.results,
                    },
                });
            });
        }
    }, [page]);

    return (
        <div>
            <div className="flex">
                <div className="p-6 w-1/3">
                    {nextPage ? (
                        <button
                            disabled={loading || !nextPage}
                            onClick={() => {
                                dispatch({ type: 'fetchPokemon' });
                            }}
                        >
                            Fetch More Pokemon
                        </button>
                    ) : null}
                    <h1>pokemon</h1>
                    <PokemonList {...state} />
                </div>
            </div>
        </div>
    );
};

export default PokemonPage;
