import React from "react";

import "./Slot.css";

const Slot = ({
  playableAmount,
  slotNumber,
  onPlayerBetAdd,
  bets,
  onRemoveBet,
}) => {
  const addBetValues = [1, 5, 10, 50];
  return (
    <div className="slotContainer">
      <h3>Slot Number: {slotNumber}</h3>
      <p>
        <strong>Placed Bet: </strong>
        <span>amount</span>
      </p>
      {addBetValues.map((moneyValue) => {
        const noOfBets = bets.filter(
          ({ amount }) => amount === moneyValue
        ).length;
        return (
          <div>
            <button
              disabled={playableAmount < moneyValue}
              className="standardButton addButton"
              onClick={() => onPlayerBetAdd(moneyValue, slotNumber, "playerID")}
            >
              + {moneyValue}$
            </button>
            <input disabled value={noOfBets} className="displayBetInput" />
            <button
            disabled={noOfBets === 0}
              className="standardButton removeButton"
              onClick={() => onRemoveBet(moneyValue, slotNumber, "playerID")}
            >
              - {moneyValue}$
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Slot;
