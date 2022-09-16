import React, { useCallback, useRef, useState } from "react";

import DiceTableHeader from "../../Components/DiceTableHeader/DiceTableHeader";
import Dice from "../../Components/Dice/Dice";
import DiceBets from "../../Components/DiceBets/DiceBets";
import DisableWrapper from "../../Components/DisableWrapper/DisableWrapper";
import Timer from "../../Components/Timer/Timer";
import "./DiceTable.css";

const initialWallet = {
  depositeCash: 100,
  winningCash: 0,
};
const DiceTable = () => {
  const [rollDice, setRollDice] = useState(false);
  const [walletInfo, setWalletInfo] = useState(initialWallet);
  const [lobbyEarnings, setLobbyEarnings] = useState(0);
  const [playerBets, setPlayerBets] = useState([]);
  const [gamePaused, setGamePaused] = useState(true);
  const [startPlay, setStartPlay] = useState(false);
  const [rolled, setRolled] = useState(false);
  const [winLoss, setWinLoss] = useState({
    wonAmount: 0,
    lostAmount: 0,
  });
  const playerBetsRef = useRef();
  playerBetsRef.current = playerBets;
  const playSeconds = 10;
  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + playSeconds);

  const onStartPlay = () => {
    setStartPlay(true);
    setGamePaused(true);
  };

  const onGameResume = () => {
    setGamePaused(true);
  };

  const onGamePause = () => {
    setGamePaused(false);
  };

  const onPlayerBetAdd = (amount, slotNumber, playerID) => {
    setPlayerBets((playerBets) => [
      ...playerBets,
      { amount, slotNumber, playerID },
    ]);
    setWalletInfo(({ depositeCash, winningCash }) => {
      if (amount <= depositeCash) {
        return {
          depositeCash: depositeCash - amount,
          winningCash,
        };
      } else {
        const remainder = amount - depositeCash;
        return {
          depositeCash: 0,
          winningCash: winningCash - depositeCash - remainder,
        };
      }
    });
  };

  const onRemoveBet = (removeAmount, removeSlotNumber, playerID) => {
    setPlayerBets((playerBets) => {
      const index = playerBets.findIndex(
        ({ amount, slotNumber }) =>
          amount === removeAmount && slotNumber === removeSlotNumber
      );
      if (index === -1) return playerBets;
      const newBets = [...playerBets];
      newBets.splice(index, 1);
      return newBets;
    });

    setWalletInfo(({ depositeCash, winningCash }) => {
      return {
        depositeCash: depositeCash + removeAmount,
        winningCash,
      };
    });
  };

  const onWinningCash = (amount) => {
    setWalletInfo((walletInfo) => {
      return {
        ...walletInfo,
        winningCash: walletInfo.winningCash + amount,
      };
    });
  };

  const onDepositeCash = () => {
    setWalletInfo((walletInfo) => {
      return {
        ...walletInfo,
        depositeCash: walletInfo.depositeCash + 100,
      };
    });
  };

  const onDiceRollHandler = (randomNumber) => {
    const { lobbyEarnings, betEarnings } = playerBetsRef.current.reduce(
      (accumulator, { slotNumber, amount }) => {
        const { lobbyEarnings, betEarnings } = accumulator;
        if (slotNumber === randomNumber)
          return { lobbyEarnings, betEarnings: betEarnings + amount };
        return { lobbyEarnings: lobbyEarnings + amount, betEarnings };
      },
      { lobbyEarnings: 0, betEarnings: 0 }
    );
    const totalBetAmount = lobbyEarnings + betEarnings;
    const finalBetEarnings = 2 * betEarnings;
    const finalLobbyEarnings = lobbyEarnings - betEarnings;
    onWinningCash(finalBetEarnings);
    setLobbyEarnings((lobbyEarnings) => lobbyEarnings + finalLobbyEarnings);
    setRollDice(false);
    setRolled(true);
    if (finalBetEarnings >= totalBetAmount) {
      setWinLoss({
        wonAmount: finalBetEarnings,
        lostAmount: 0,
      });
    } else {
      setWinLoss({
        wonAmount: 0,
        lostAmount: totalBetAmount - finalBetEarnings,
      });
    }
  };

  const onReset = () => {
    onGameResume();
    setPlayerBets([]);
    setRollDice(false);
    setRolled(false);
    setWinLoss({
      wonAmount: 0,
      lostAmount: 0,
    });
  };
  return (
    <>
      <div className="">
        <DiceTableHeader
          walletInfo={walletInfo}
          onDepositeCash={onDepositeCash}
        />
        <div className="playWrapper">
          {!startPlay ? (
            <button className="playButton" onClick={onStartPlay}>
              Start Play
            </button>
          ) : (
            <Timer
              onGamePause={onGamePause}
              onGameResume={onGameResume}
              expiryTimestamp={expiryTimestamp}
              isplay={gamePaused && startPlay}
              setRollDice={setRollDice}
              rolled={rolled}
              setRolled={setRolled}
              {...winLoss}
              onReset={onReset}
            />
          )}
        </div>
        <div className="tableSplitter">
          <Dice onDiceRollHandler={onDiceRollHandler} rollDice={rollDice} />
          <DisableWrapper disabled={!(gamePaused && startPlay)}>
            <DiceBets
              onPlayerBetAdd={onPlayerBetAdd}
              walletInfo={walletInfo}
              playerBets={playerBets}
              onRemoveBet={onRemoveBet}
            />
          </DisableWrapper>
        </div>
      </div>
    </>
  );
};

export default DiceTable;
