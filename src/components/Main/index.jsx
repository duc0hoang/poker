import React from "react";
import Player from "../Player";
import { useSelector } from "react-redux";

const MainComponent = () => {
  const playerList = useSelector((state) => state.player.playerList);

  return (
    <div
      style={{ position: "relative", height: "600px" }}
      className="container"
    >
      {/* <button onClick={handleChangeState}>Change State</button> */}

      {playerList.map((player, index) => (
        <Player index={index+1} player={player} key={player.username}/>
      ))}

      <img
        alt="main"
        style={{
          position: "absolute",
          width: "100px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
        src="https://i.pinimg.com/originals/10/80/a4/1080a4bd1a33cec92019fab5efb3995d.png"
      />
    </div>
  );
};

export default MainComponent;
