import { useSnapshot } from 'valtio';
import { Input } from './components/ui/input';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from './components/ui/card';

import { pokemon, search } from './stores/valtioStore';

function SearchBox() {
  const snap = useSnapshot(search);
  return (
    <Input
      type="text"
      className="text-lg"
      placeholder="Search..."
      value={snap.query}
      onChange={(e) => (search.query = e.target.value)}
    />
  );
}

function PokemonList() {
  const snap = useSnapshot(pokemon);

  return (
    <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {snap.list.map((p) => (
        <Card key={p.id} className="p-4">
          <CardHeader>
            <h3 className="text-center text-lg font-semibold">{p.name}</h3>
          </CardHeader>

          <CardContent>
            <img
              className="mx-auto h-32 w-32 flex-shrink-0 rounded-full bg-transparent"
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${p.id}.png`}
              alt=""
            />
          </CardContent>

          <CardFooter>
            <p className="w-full text-center">- {p.type} -</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

function App() {
  return (
    <main className="w-m container mx-auto max-w-3xl py-12">
      <h1 className="my-6 text-center text-4xl font-extrabold capitalize">
        state management libraries
      </h1>

      <div className="w-full space-y-6">
        <SearchBox />
        <PokemonList />
      </div>
    </main>
  );
}

export default App;
