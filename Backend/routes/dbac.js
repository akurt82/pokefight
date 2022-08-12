/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * MongoDB-Verbindung
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const dbac = require("mongoose");

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * MongoDB Schema
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const dbsh = new dbac.Schema(
	{
        winid: Number,
        winname: String,
        losid: Number,
        losname: String
	},
	{
		collection: "PokeBoard"
	}
);

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * MongoDB Model
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

module.exports = dbac.model( 'PokeBoard', dbsh );