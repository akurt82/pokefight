/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Import
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

import React from "react";
import Fetcher from "./fetch";

export default function LeaderBoard ()
{

	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	* Render
	* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

	return (
		<div>
			<iframe src = "http://localhost:3000/game/leaderboard"></iframe>
		</div>
	);

}