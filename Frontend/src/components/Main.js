import React from "react";
import "./components.css";
import { Routes, Route } from "react-router-dom";
import About from "../components/About";
import PokeFight from "./PokeFight";
import LeaderBoard from "./LeaderBoard";
import Home from "../components/Home";
import NotFound from "./NotFound";
import PokeDetails from "../components/PokeDetails";
import { useEffect, useState } from "react";
import BaseInfo from "./BaseInfo";

function Main() {
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = () => {
    fetch("https://pokemon-fight-newproject.herokuapp.com/pokemons")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setIsLoading(false);
        setPokemons(data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="main">
        <Routes>
          <Route
            exact
            path="/"
            element={<Home pokemons={pokemons} isLoading={isLoading} />}
          />
          <Route path="/about" element={<About />} />
          <Route
            path="/pokeFight"
            element={<PokeFight pokemons={pokemons} isLoading={isLoading} />}
          />
          <Route
            path="/:id"
            element={<PokeDetails pokemons={pokemons} isLoading={isLoading} />}
          />
          <Route
            path="/:id/:info"
            element={<BaseInfo pokemons={pokemons} isLoading={isLoading} />}
          />
          <Route
            path="/game/leaderboard"
            element={<LeaderBoard />}
          />
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default Main;
