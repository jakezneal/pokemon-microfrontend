import { Link } from 'react-router-dom';
import { Pokemon } from './utils/types';

const PokemonList = ({ loading, pokemon }) => (
    <div className="planetList">
        {pokemon.map((pokemon: Pokemon) => {
            return (
                <Link
                    key={pokemon.id}
                    className={'h-12 flex items-center border-white cursor-pointer no-underline'}
                    to={`${pokemon.id}`}
                >
                    <h1>{pokemon.name}</h1>
                </Link>
            );
        })}
        {loading && <div>Loading ...</div>}
    </div>
);

export default PokemonList;
