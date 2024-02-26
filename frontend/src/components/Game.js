import React from "react";
import { useSelector } from "react-redux";
import { useActions } from "../Actions/useActions";
import "./Game.css"

const Game = (props) => {
  const userName = useSelector((state) => state.gameState?.userName);
  const cards = useSelector((state) => state.gameState?.gameCards);
  const isPending = useSelector((state) => state.gameState?.isPending);
  const score = useSelector((state) => state.gameState?.score);
  const hasDefuseCard = useSelector((state) => state.gameState?.hasDefuseCard);
  const activeCard = useSelector((state)  => state.gameState?.activeCard);
  const { putGameState } = useActions();
  let left = 0;
  let top = 0;

  const checkCard = () => {
    const obj = {
      userName: userName,
      activeCard: activeCard,
      hasDefuseCard: hasDefuseCard,
      isPending: isPending,
      gameCards: cards,
      score: score,
    };

    let openedCard = cards.pop();
    let isCompleted = true;

    obj.activeCard = openedCard;

    if (openedCard === "Defuse card 🙅‍♂️") obj.hasDefuseCard = true;
    else if (openedCard === "Shuffle card 🔀") {
      obj.gameCards = null;
      obj.hasDefuseCard = false;
      isCompleted = false;
    } else if (openedCard === "Exploding kitten card 💣") {
      isCompleted = false;
      if (!obj.hasDefuseCard) {
        confirmation();

        function confirmation() {
          if (
            window.confirm(
              `game over!, you lost the game!, your score is ${obj.score} \n Do you want to play new game`
            )
          ) {
            obj.gameCards = null;
          }
        }
      } else {
        obj.hasDefuseCard = false;
      }
    }

    if (
      isCompleted &&
      (obj.gameCards?.length === 0 || obj.gameCards === null)
    ) {
      obj.score = parseInt(obj.score) + 1;
      confirmation();
      function confirmation() {
        if (
          window.confirm(
            `You won the game!!!, your score is ${obj.score} \n Do you want to play new game`
          )
        ) {
          obj.gameCards = null;
        }
      }
    }
    putGameState(obj);
  };


  return (
    <div className="container">
      <div className="game-wrapper">
        <h1 className="game-title">😸 Exploding Kitten</h1>
        {isPending ? (
          <p>Loading new game...</p>
        ) : (
          <>
            <div className="card-deck" onClick={checkCard}>
              {cards?.map((card, index) => (
                <div key={index} className="card">{card}</div>
              ))}
            </div>
            <h2 className="active-card">{activeCard ? `Active Card: ${activeCard}` : '---'}</h2>
            <h2 className="score">Score: {score ? score : '---'}</h2>
          </>
        )}
      </div>
    </div>
  );
};

export default Game;
