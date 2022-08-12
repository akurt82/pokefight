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

dbac.connect(
    path,
    { useNewUrlParser: true, useUnifiedTopology: true },
    function (fehler)
    {
        if (fehler)
            throw fehler;
    }
);

//const dbco = dbac.connection;

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Route
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

router.get('/', (req, res) => {
    dbmo.find({},{},function (err, doc) {
        let swi = 1;
        // *** //
        let ret = '<style>';
        ret += '@import url("https://fonts.googleapis.com/css2?family=Mouse+Memoirs&display=swap");';
        ret += '* {';
        ret += '  font-family: "Mouse Memoirs", sans-serif; font-size: 30px;';
        ret += '}';
        // *** //
        ret += '.leaderboard { width: 100%; min-width: 380px; max-width: 600px; margin: 0 auto; }';
        ret += '.leaderboard th { background-color: rgba(255,255,255,0.25); text-align: left; border-bottom: 2px solid rgb(100,120,130); text-shadow: 4px 4px 4px rgba(0,0,0,0.2); }';
        ret += '.leaderboard .row1 { background-color: rgba(200,200,200,0.1); }';
        ret += '.leaderboard .row2 { background-color: rgba(190,230,230,0.15); }';
        ret += '.leaderboard .row1:hover { background-color: rgba(200,200,200,0.4); text-shadow: 4px 4px 4px rgba(0,0,0,0.2); }';
        ret += '.leaderboard .row2:hover { background-color: rgba(190,230,230,0.45); text-shadow: 4px 4px 4px rgba(0,0,0,0.2); }';
        ret += '.leaderboard .winner { color: rgb(50,130,30); }';
        ret += '.leaderboard .loser { color: rgb(160, 40, 30); }';
        ret += '</style>';
        // *** //
        ret += '<table class = "leaderboard">';
        // *** //
        ret += '<tr><th class = "winner" colspan = "2">Winner</th><th class = "loser" colspan = "2">Loser</th></tr>';
        // *** //
        for( let item of doc )
        {
            ret += `<tr class = "row${swi}">`;
            ret += `<td class = "winner">(${item.winid})</td>`;
            ret += `<td class = "winner">${item.winname}</td>`;
            ret += `<td class = "loser">(${item.losid})</td>`;
            ret += `<td class = "loser">${item.losname}</td>`;
            ret += '</tr>';
            // *** //
            switch ( swi )
            {
                case 1: swi = 2; break;
                case 2: swi = 1; break;
            }
        }
        // *** //
        ret += '</table>';
        // *** //
        res.send(ret);
    });
});

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Export
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

module.exports = router;
