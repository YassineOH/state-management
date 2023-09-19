import { atom } from 'jotai';
import { atomsWithQuery } from 'jotai-tanstack-query';
import { PokemonType } from './nativeStore';

const searchAndSort = (p: PokemonType[], s: string) =>
  p
    .filter((p) => p.name.toLowerCase().includes(s.toLocaleLowerCase()))
    .slice(0, 21)
    .sort((a, b) => a.name.localeCompare(b.name));

export const searchAtom = atom('');

const [allPokemon] = atomsWithQuery<PokemonType[]>(() => ({
  queryKey: ['pokemon'],
  queryFn: async () => {
    const res = await fetch('/pokemon.json');
    const data = await res.json();
    return data;
  },
}));

export const pokemonAtom = atom(async (get) => {
  const all = await get(allPokemon);
  const search = get(searchAtom);
  return searchAndSort(all, search);
});
