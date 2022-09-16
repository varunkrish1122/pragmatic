import React from "react";

import Slot from "../Slot/Slot";
import "./DiceBets.css";

const DiceBets = ({
  walletInfo,
  onPlayerBetAdd,
  playerBets = [],
  onRemoveBet,
}) => {
  const slots = [1, 2, 3, 4, 5, 6];
  const { depositeCash, winningCash } = walletInfo || {};
  const playableAmount = depositeCash + winningCash;
  return (
    <div className="betsContainer">
      {slots.map((number) => {
        const bets = playerBets.filter(
          ({ slotNumber }) => slotNumber === number
        );
        return (
          <Slot
            onPlayerBetAdd={onPlayerBetAdd}
            slotNumber={number}
            bets={bets}
            onRemoveBet={onRemoveBet}
            playableAmount={playableAmount}
          />
        );
      })}
    </div>
  );
};

export default DiceBets;
