import React from "react";
import { useSelector } from "react-redux";
import "./card.css";

const Card = ({ card }) => {
  const isReveal = useSelector((state) => state.status.isReveal);

  return (
    <>
      <img
        alt="card"
        className="card"
        src={
          isReveal ?
            card.image :
            "https://i.pinimg.com/originals/10/80/a4/1080a4bd1a33cec92019fab5efb3995d.png"
        }
      />
    </>
  );
};

export default Card;
