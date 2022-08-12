/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * HTTP Interaction
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const express = require('express');
const router = express.Router();
const cors = require('cors');
router.use(express.json());

router.use(cors());

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * MongoDB-Verbindung
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const dbac = require("mongoose");
const dbmo = require("./dbac");

const path = 'mongodb+srv://akurt82:ortaca2008@cluster0.3ji3vjf.mongodb.net/?retryWrites=true&w=majority';

function dbac_init()
{
    dbac.connect(
        path,
        { useNewUrlParser: true, useUnifiedTopology: true },
        function (fehler)
        {
            if (fehler)
                throw fehler;
        }
    );
}

const dbco = dbac.connection;

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * MongoDB Schema
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/*
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
*/
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * MongoDB Model
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/*
const dbmo = dbac.model( 'PokeBoard', dbsh );
*/
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Route
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

router.get('/:winnerid/:winnername/:loserid/:losername', (req, res) => {
    const { winnerid, winnername, loserid, losername } = req.params;
    // *** //
    const score = new dbmo(	{
        winid : winnerid,
        winname : winnername,
        losid : loserid,
        losname : losername
	});
    // *** //
    score.save(function (fehler, spieler) {
        if (fehler) return console.error(fehler);
        console.log(spieler.name + " wurde gespeichert.");
    });
    // *** //
    res.send("succeeded!");
});

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Export
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

module.exports = router;
