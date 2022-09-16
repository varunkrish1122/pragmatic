import React from "react";

import "./DiceTableHeader.css";

const DiceTableHeader = ({ walletInfo, onDepositeCash }) => {
  const { depositeCash, winningCash } = walletInfo || {};
  return (
    <div className="headerContainer">
      <h3>User Name</h3>
      <div>
        <p>
          <strong>Deposite Cash: </strong>
          <span>{depositeCash}$</span>
        </p>
        <p>
          <strong>Winning Cash: </strong>
          <span>{winningCash}$</span>
        </p>
      </div>
      <button className="depositeButton" onClick={onDepositeCash}>Deposite</button>
    </div>
  );
};

export default DiceTableHeader;
