import React, { useEffect, useState } from "react";
import { useTimer } from "react-timer-hook";

import TimerStyled from "./StyledTimer";

const Timer = ({
  onTimerExpireHandler,
  expiryTimestamp,
  wonAmount,
  lostAmount,
  onGamePause,
  setRollDice,
  isplay,
  rolled,
  setRolled,
  onReset,
}) => {
  const [hold, setHold] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const onExpire = () => {
    onGamePause();
    setHold(true);
    setTimeout(() => {
      setRollDice(true);
    }, 2000);
  };
  const { seconds, minutes, hours, restart } = useTimer({
    expiryTimestamp,
    onExpire,
  });

  useEffect(() => {
    if (rolled) {
      setHold(false);
      setShowResult(true);
      setRolled(false);
      setTimeout(() => {
        const playSeconds = 10;
        const expiryTimestamp = new Date();
        expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + playSeconds);
        setShowResult(false);
        onReset();
        restart(expiryTimestamp);
      }, 5000);
    }
  }, [rolled]);
  return (
    <>
      <TimerStyled seconds={seconds} minutes={minutes} hours={hours} />
      <div>
        {isplay && <h2>Please Place Your Bets!!</h2>}
        {hold && <h2>Please Wait Until Dice To Be Rolled!!</h2>}
        {showResult && (
          <h2>
            User Has{" "}
            {`${wonAmount ? "Won " + wonAmount : "Lost " + lostAmount}`}$
          </h2>
        )}
      </div>
    </>
  );
};

export default Timer;
