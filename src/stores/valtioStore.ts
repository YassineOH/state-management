import { proxy } from 'valtio';
import { derive } from 'valtio/utils';

import { type PokemonType } from './reactQueryStore';

const searchAndSort = (p: PokemonType[], s: string) =>
  p
    .filter((p) => p.name.toLowerCase().includes(s.toLocaleLowerCase()))
    .slice(0, 21)
    .sort((a, b) => a.name.localeCompare(b.name));

export const search = proxy({
  query: '',
});

const allPokemon = proxy({
  list: [] as PokemonType[],
});

export const pokemon = derive({
  list: (get) => searchAndSort(get(allPokemon).list, get(search).query),
});
fetch('./pokemon.json')
  .then((res) => res.json())
  .then((data) => (allPokemon.list = data));
