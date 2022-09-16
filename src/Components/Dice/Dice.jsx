import React, { useCallback, useEffect, useRef } from "react";

import "./Dice.css";

const Dice = ({ onDiceRollHandler, rollDice }) => {
  const cubeRef = useRef();
  const getRandom = () => {
    return Math.floor(Math.random() * 6) + 1;
  };
  const transform = (xRand, yRand) => {
    cubeRef.current.style.webkitTransform =
      "rotateX(" + xRand + "deg) rotateY(" + yRand + "deg)";
    cubeRef.current.style.transform =
      "rotateX(" + xRand + "deg) rotateY(" + yRand + "deg)";
  };

  const rollDiceHandler = useCallback(() => {
    // Set Initial Rotation
    let xRand = 10 * 90 * 10;
    let yRand = 10 * 90 * 10;
    transform(xRand, yRand);
    xRand = 0;
    yRand = 0;
    setTimeout(() => {
      const randomNumber = getRandom();
      if (randomNumber === 1) {
        xRand = 0;
      } else if (randomNumber === 2) {
        xRand = -2 * 90;
      } else if (randomNumber === 3) {
        yRand = -90;
      } else if (randomNumber === 4) {
        yRand = 90;
      } else if (randomNumber === 5) {
        xRand = -90;
      } else if (randomNumber === 6) {
        xRand = 90;
      }
      transform(xRand, yRand);
      if (onDiceRollHandler) onDiceRollHandler(randomNumber);
    }, 900);
  }, []);

  useEffect(() => {
    if (rollDice) {
      rollDiceHandler();
    }
  }, [rollDice, rollDiceHandler]);

  return (
    <section class="container">
      <div id="cube" ref={cubeRef}>
        <div class="front">
          <span class="dot dot1"></span>
        </div>
        <div class="back">
          <span class="dot dot1"></span>
          <span class="dot dot2"></span>
        </div>
        <div class="right">
          <span class="dot dot1"></span>
          <span class="dot dot2"></span>
          <span class="dot dot3"></span>
        </div>
        <div class="left">
          <span class="dot dot1"></span>
          <span class="dot dot2"></span>
          <span class="dot dot3"></span>
          <span class="dot dot4"></span>
        </div>
        <div class="top">
          <span class="dot dot1"></span>
          <span class="dot dot2"></span>
          <span class="dot dot3"></span>
          <span class="dot dot4"></span>
          <span class="dot dot5"></span>
        </div>
        <div class="bottom">
          <span class="dot dot1"></span>
          <span class="dot dot2"></span>
          <span class="dot dot3"></span>
          <span class="dot dot4"></span>
          <span class="dot dot5"></span>
          <span class="dot dot6"></span>
        </div>
      </div>
    </section>
  );
};

export default Dice;
