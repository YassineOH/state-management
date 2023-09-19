import { useQuery } from '@tanstack/react-query';
import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useMemo,
  ReactNode,
} from 'react';

export type PokemonType = {
  id: number;
  name: string;
  type: string[];
  hp: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
  speed: number;
};

type State = {
  search: string;
};
type PokemonAction = {
  type: 'SET_SEARCH';
  payload: string;
};

// eslint-disable-next-line react-refresh/only-export-components
export const usePokemonSource = () => {
  const [{ search }, dispatch] = useReducer(
    (state: State, action: PokemonAction) => {
      if (action.type === 'SET_SEARCH') {
        return { ...state, search: action.payload };
      }
      return state;
    },
    {
      search: '',
    },
  );

  const { data: pokemon } = useQuery<PokemonType[]>([], {
    queryFn: () => fetch('./pokemon.json').then((res) => res.json()),
  });

  const setSearch = useCallback((s: string) => {
    dispatch({ type: 'SET_SEARCH', payload: s });
  }, []);

  const filteredPokemon = useMemo(
    () =>
      (pokemon || [])
        .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
        .slice(0, 21),
    [search, pokemon],
  );

  const sortedPokemon = useMemo(
    () => filteredPokemon.sort((a, b) => a.name.localeCompare(b.name)),
    [filteredPokemon],
  );

  return { pokemon: sortedPokemon, search, setSearch };
};

// eslint-disable-next-line react-refresh/only-export-components
export const PokemonContext = createContext<
  ReturnType<typeof usePokemonSource> | undefined
>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const usePokemon = () => useContext(PokemonContext);

function PokemonProvider({ children }: { children: ReactNode }) {
  return (
    <PokemonContext.Provider value={usePokemonSource()}>
      {children}
    </PokemonContext.Provider>
  );
}
export default PokemonProvider;
