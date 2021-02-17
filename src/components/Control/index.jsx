import React from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const Control = () => {
  const playerList = useSelector((state) => state.player.playerList);
  const deckCard = useSelector((state) => state.card.deckCard);
  const dispatch = useDispatch();
  let disabled = false;
  const drawCards = async () => {
    if (playerList[0].cards.length === 3) return;
    try {
      const res = await axios({
        url: `https://deckofcardsapi.com/api/deck/${deckCard.deck_id}/draw/?count=12`,
        method: "GET",
      });
      dispatch({ type: "ADD_CARDS", payload: res.data.cards });
    } catch (error) {
      console.log(error);
    }
  };

  const revealCards = () => {
    dispatch({
      type: "REVEAL_CARDS",
    });
  };

  for (const player of playerList) {
    if (player.totalPoint === 0) {
      disabled = true;
      break;
    }
  }

  const shuffleCards = () => {
    axios({
      url: "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1",
      method: "GET",
    })
      .then((res) => {
        dispatch({ type: "SHUFFLE_CARDS", payload: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="d-flex  justify-content-end container">
      <div className="border d-flex justify-content-center align-items-center px-2">
        <button
          disabled={disabled}
          className="btn btn-success mr-2"
          onClick={shuffleCards}
        >
          Shuffle
        </button>
        <button
          disabled={disabled}
          className="btn btn-info mr-2"
          onClick={drawCards}
        >
          Draw
        </button>
        <button
          disabled={disabled}
          className="btn btn-primary mr-2"
          onClick={revealCards}
        >
          Reveal
        </button>
      </div>
      <div className="d-flex">
        {playerList.map((player) => (
          <div className="border px-3 text-center" key={player.email}>
            <p> {player.username} </p>
            <p> {player.totalPoint} </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Control;
