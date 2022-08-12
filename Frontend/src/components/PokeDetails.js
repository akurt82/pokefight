import React from "react";
import { useParams } from "react-router-dom";

function PokeDetails({ pokemons, isLoading }, props) {
  const { id } = useParams();
  //console.log(pokemons);
  //console.log("id " + id);

  const onePokemon = pokemons[id];
  //console.log(onePokemon);

  return (
    <div>
      {isLoading && <p>Loading ...</p>}
      {pokemons.length > 0 && (
        <ul className="pokemonDetails">
          <li>Pokedex Nr. {id}</li>
          <li>Name: {onePokemon.name["english"]} </li>
          <li>...</li>

          <li>
            Type: {onePokemon.type[0]}{" "}
            {onePokemon.type[1] ? `, ${onePokemon.type[1]}` : ``}
          </li>
          <li>HP: {onePokemon.base["HP"]} </li>
          <li>Attack: {onePokemon.base["Attack"]}</li>
          <li>Defense: {onePokemon.base["Defense"]}</li>
          <li>Speed: {onePokemon.base["Speed"]}</li>
        </ul>
      )}
    </div>
  );
}

export default PokeDetails;
