const jsonData = require('../file.json');
const express = require('express');
const router = express.Router();
const cors = require('cors');
router.use(express.json());

router.use(cors());

//complete list of pokemon
router.get('/', (req, res) => {
	res.send(jsonData);
});

//gives only one pokemon by id
router.get('/:id', (req, res) => {
	const { id } = req.params;

	const foundPokemon = jsonData.find((pokemon) => pokemon.id == id);
	res.send(foundPokemon);
});

//gives only one pokemon from the JSON thanks to its id and retrieve only one information (name or type or base)
router.get('/:id/:info', (req, res) => {
	const { id } = req.params;
	const { info } = req.params;
	if (info === 'name') {
		const foundPokemon = jsonData.find((pokemon) => pokemon.id == id);
		res.send(foundPokemon.name);
	}
	if (info === 'type') {
		const foundPokemon = jsonData.find((pokemon) => pokemon.id == id);
		res.send(foundPokemon.type);
	}
	if (info === 'base') {
		const foundPokemon = jsonData.find((pokemon) => pokemon.id == id);
		res.send(foundPokemon.base);
	}
});

module.exports = router;
