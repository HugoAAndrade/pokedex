"use client";
import { useEffect, useState } from "react";

const Pokemon = () => {
  const [pokemons, setPokemons] = useState([]);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    const fetchPokemon = async () => {
      const promisePokemon = Array.from({ length: 151 }, (_item, index) =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${index + 1}`).then(
          (response) => response.json()
        )
      );
      const allPokemonData = await Promise.all(promisePokemon);
      setPokemons(allPokemonData);
    };
    fetchPokemon();
  }, []);

  const typeColor = (type) => {
    const colorMap = {
      grass: "green",
      bug: "green",
      poison: "purple",
      psychic: "purple",
      fire: "red",
      flying: "blue",
      water: "blue",
      electric: "gold",
      ground: "brown",
      normal: "brown",
      rock: "gray",
      steel: "gray",
      fairy: "pink",
      ghost: "navy",
    };
    return colorMap[type] || "black";
  };

  return (
    <div className="flex flex-col justify-center gap-2">
      <img
        src="logo.webp"
        className="w-1/2 min-w-[200px] max-w-xs mx-auto mt-5"
        alt="Pokemon Logo"
      />
      <input
        type="text"
        placeholder="Buscar pokémon"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        className="shadow-md w-10/12 max-w-xl h-12 mx-auto rounded-md px-4 my-6 border-none outline-none"
      />
      <div className="mx-auto container flex justify-center flex-wrap gap-4">
        {pokemons.length > 0
          ? pokemons
              .filter((pokemon) =>
                pokemon.name.toLowerCase().includes(busca.toLowerCase())
              )
              .map(({ name, sprites, types }, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-tr from-fuchsia-700 via-emerald-600 to-orange-400 w-[225px] flex flex-col items-center gap-2 justify-between shadow-md rounded-md py-5 px-3 relative overflow-hidden hover:opacity-80 transition-opacity duration-300 ease-in-out"
                >
                  <img
                    className="absolute top-3.5 left-2 w-8"
                    src="pokeball.webp"
                    alt="Pokeball"
                  />
                  <h2 className="text-center capitalize font-semibold mb-2 text-md text-white">
                    {name}
                  </h2>

                  <img
                    className="w-fit h-48"
                    src={sprites.other.dream_world.front_default}
                    alt={name}
                  />
                  <div className="flex gap-1 justify-around">
                    {types.map(({ type }, index) => (
                      <div key={index} className="shadow-sm">
                        <p
                          className="text-sm mt-2 capitalize font-semibold text-white py-1 px-3 rounded-md"
                          style={{ background: typeColor(type.name) }}
                        >
                          {type.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))
          : Array.from({ length: 50 }, (_item, index) => (
              <div
                key={index}
                className="bg-gradient-to-tr from-fuchsia-700 via-emerald-600 to-orange-400 h-[316px] w-[225px] flex flex-col items-center gap-2 justify-between shadow-md rounded-md py-5 px-3 relative overflow-hidden"
              >
                <div className="w-full h-full animate-pulse bg-gray-300 rounded-md absolute top-2/4 -translate-y-2/4 left-0 z-10" />
              </div>
            ))}
      </div>
    </div>
  );
};

export default Pokemon;
