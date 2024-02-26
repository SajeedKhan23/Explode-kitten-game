import "./App.css";
import { useSelector } from "react-redux";
import io from "socket.io-client";

import { useEffect } from "react";
import Leaderboard from "./components/Leaderboard.js";
import { useActions } from "./Actions/useActions.js";
import Game from "./components/Game.js";
import { baseURL } from "./api/Base.js";

function App() {
  const userName = useSelector((state) => state.gameState?.userName);
  const cards = useSelector((state) => state.gameState?.gameCards);
  const { requestGameState, updateLeaderboard, setUserName } = useActions();
  const socket = io(baseURL, { transports: ["websocket"] });

  useEffect(() => {
    const enterName = () => {
      if (!userName) {
        let name = prompt("enter your name!");
        setUserName(name);
        return name;
      }
    };
    requestGameState({ userName: enterName() });

    socket.on("leaderboardUpdate", (leaderboard) => {
      console.log("Leaderboard updated:", leaderboard);
      updateLeaderboard(leaderboard);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  console.log("cards", cards);

  return (
    <>
      <div className="container" style={{ display: "flex" }}>
        <Game />
        <Leaderboard />
      </div>
    </>
  );
}
export default App;
