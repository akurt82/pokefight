/*const express = require('express');
const server = express();
const port = process.env.PORT || 3000;
const jsonData = require('./file.json');
const cors = require('cors');

server.use(cors());
var corsOptions = {
	origin: '*',
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
	preflightContinue: false,
	optionsSuccessStatus: 204,
};

const pokemonRouter = require('./routes/pokemons');
server.use('/pokemons', cors(corsOptions), pokemonRouter);

server.get('/', cors(corsOptions), (req, res) => {
	res.send('Hello World!');
});

server.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
*/

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * HTTP Interaction
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const express = require('express');
const app = express();
const router = express.Router();
router.use(express.json());

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * MongoDB-Verbindung
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const dbac = require("mongoose");

const path = 'mongodb+srv://akurt82:ortaca2008@cluster0.3ji3vjf.mongodb.net/?retryWrites=true&w=majority';

dbac.connect(
	path,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	function (fehler)
	{
 		if (fehler)
			throw fehler;
	}
);

const dbco = dbac.connection;

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * MongoDB Schema
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const dbsh = new dbac.Schema(
	{
		id: Number,
		name: {
		  english: String,
		  japanese: String,
		  chinese: String,
		  french: String
		},
		type: [],
		base: {
		  HP: Number,
		  Attack: Number,
		  Defense: Number,
		  SpAttack: Number,
		  SpDefense: Number,
		  Speed: Number
		}	
	},
	{
		collection: "PokeFight"
	}
);

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * MongoDB Model
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const dbmo = dbac.model( 'PokeFight', dbsh );

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * MongoDB Collection Liste (Beispiel)
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

/*
dbco.on('open', function (ref) {
    console.log('Connected to mongo server.');
    //trying to get collection names
    dbco.db.listCollections().toArray(function (err, names) {
	console.log(names); // [{ name: 'dbname.myCollection' }]
//module.exports.Collection = names;
    });
})
*/

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Portnummer
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const port = process.env.PORT || 3000;

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * JSON
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

let jsonData = "";

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * CORS
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const cors = require('cors');

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * App Use
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

app.use(cors());
router.use(cors());

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Router
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const pokemonRouter = require('./routes/pokemons');
app.use('/pokemons', pokemonRouter);

const pokemonSave = require('./routes/pokesave');
app.use('/game/save', pokemonSave);

const pokemonLead = require('./routes/pokelead');
app.use('/game/leaderboard', pokemonLead);

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Root Content
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

app.get('/', async (req, res) => {
	dbmo.find()
	.then(
		function (doc)
		{
			// Ausgabe in die Variable jsonData
			jsonData += doc;
			// Ausgabe zum Client
			res.send(doc);
		}
	).catch(
		function (fehler)
		{
			console.log("Fehler: " + fehler);
		}
	);
});

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Server-Verbindung aufbauen
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
