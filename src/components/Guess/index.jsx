import "./guess.css";
import { useState, useContext, useEffect } from "react";
import Axios from "axios";
import { AppContext } from "../../App";
import { useRef } from "react";

const Guess = () => {
  const { setTela } = useContext(AppContext);
  const [image, setImage] = useState("");
  const [randomPokemon, setRandomPokemon] = useState("");
  const [points, setPoints] = useState(0);
  const [guessedPokemon, setGuessedPokemon] = useState("");
  const imgRef = useRef();
  let id = Math.floor(Math.random() * (386 - 1 + 1) + 1);

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const fetchImage = () => {
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) => {
      setImage(res.data.sprites.front_default);
      setRandomPokemon(res.data.forms[0].name);
      console.log(res.data.forms[0].name);
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      fetchImage();
    }
  };

  const changeUI = () => {
    imgRef.current.style.filter = "brightness(1)";
  };

  const validateResponse = (e) => {
    e.preventDefault();
    if (randomPokemon == guessedPokemon) {
      console.log("acertou");
      setPoints(points + 1);
      // changeUI();
      return true;
    } else {
      console.log("errou");
      changeUI();
      return false;
    }
  };

  return (
    <div id="main-guess">
      <header>
        <button className="link" onClick={() => setTela(false)}>
          Pokemon Data Base
        </button>
        <button className="link">Guess the Pokemon</button>
      </header>
      <div id="content">
        {image != "" ? (
          <>
            <img src={image} alt="Pokemon Sillhuete" ref={imgRef} />
            <form onSubmit={validateResponse}>
              <input
                type="text"
                onKeyDown={handleKeyDown}
                onChange={(event) => setGuessedPokemon(event.target.value)}
                placeholder="Who's that Pokémon?"
              />
            </form>
          </>
        ) : (
          <button onClick={fetchImage}>Generate Random Pokemon</button>
        )}
      </div>
      <h1>Points: {points}</h1>
    </div>
  );
};

export default Guess;
