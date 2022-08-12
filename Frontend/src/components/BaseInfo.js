import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function BaseInfo({ pokemons, isLoading }, props) {
	const { id, info } = useParams();
	const [tinyImages, setTinyImages] = useState([]);

	function Pokemonimage(pokemonId) {
		fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				// console.log(data);
				setTinyImages(data);
			});
	}
	useEffect(() => {
		Pokemonimage(id);
	});

	const onePokemon = pokemons[id - 1];
	//console.log(id);
	let information = '';
	if (info === 'type') {
		information = 'type';
	} else if (info === 'name') {
		information = 'name';
	} else if (info === 'base') {
		information = 'base';
	} else {
		console.error('error');
	}

	function Info() {
		return <h2>Infos</h2>;
	}

	return (
		<div>
			{isLoading && <p>Loading ...</p>}
			{pokemons.length > 0 && (
				<ul className='pokemonDetails'>
					{info === 'type' ? (
						<>
							<li>Type of Pokemon Nr. {id}</li>
							<li>...</li>
							<li>
								{onePokemon.type[0]}{' '}
								{onePokemon.type[1] ? `, ${onePokemon.type[1]}` : ``}
							</li>
						</>
					) : info === 'base' ? (
						<p>
							<li>Base of Pokemon {onePokemon.name['english']}</li>
							<li>
								<img
									src={tinyImages.sprites.other.dream_world.front_default}
									alt={onePokemon.name['english']}
								/>
							</li>
							<li>HP: {onePokemon[information]['HP']}</li>
							<li>Attack: {onePokemon[information]['Attack']}</li>
							<li>Defense: {onePokemon[information]['Defense']}</li>
							<li>Sp. Attack: {onePokemon[information]['Sp. Attack']}</li>
							<li>Sp. Defence: {onePokemon[information]['Sp. Defense']}</li>
							<li>Speed: {onePokemon[information]['Speed']}</li>
						</p>
					) : info === 'name' ? (
						<>
							<li>Names of Pokemon Nr. {id}</li>
							<li>...</li>
							<li>{onePokemon[information]['english']}</li>
							<li>{onePokemon[information]['japanese']}</li>
							<li>{onePokemon[information]['chinese']}</li>
							<li>{onePokemon[information]['french']}</li>
						</>
					) : (
						<p>
							<a>desc</a>
						</p>
					)}
				</ul>
			)}
		</div>
	);
}

export default BaseInfo;
