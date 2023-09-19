import { create } from 'zustand';
import { type PokemonType } from './nativeStore';

const searchAndSort = (p: PokemonType[], s: string) =>
  p
    .filter((p) => p.name.toLowerCase().includes(s.toLocaleLowerCase()))
    .slice(0, 21)
    .sort((a, b) => a.name.localeCompare(b.name));

type StoreState = {
  search: string;
  pokemon: PokemonType[];
  allPokemon: PokemonType[];
  setSearch: (s: string) => void;
  setAllPokemon: (p: PokemonType[]) => void;
};

export const usePokemon = create<StoreState>((set, get) => ({
  search: '',
  pokemon: [],
  allPokemon: [],
  setSearch: (s) =>
    set({ search: s, pokemon: searchAndSort(get().allPokemon, s) }),
  setAllPokemon: (pokemon) =>
    set({
      allPokemon: pokemon,
      pokemon: searchAndSort(pokemon, get().search),
    }),
}));

fetch('./pokemon.json')
  .then((res) => res.json())
  .then((data) => usePokemon.getState().setAllPokemon(data));
