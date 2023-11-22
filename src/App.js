import React, { useState } from 'react';

const XPLevels = {
  '🔴120': 10427316700,
  '🔴110': 3873766100,
  '🔴100': 1439116000,
  '🟢90': 534633200,
  '🟢80': 198606800,
  '🟡70': 73762700,
  '🟡60': 27374200,
  '⚪50': 10133300,
  '⚪40': 3722400,
  '🟤30': 1336300,
  '🟤20': 447000,
  '⚫10': 115400,
};

const Calculator = () => {
  const [currentXP, setCurrentXP] = useState();

  const handleInputChange = (event) => {
    setCurrentXP(parseInt(event.target.value, 10));
  };

  const handleWagerNeeded = () => {
    const remainingWager = {};
    for (const level in XPLevels) {
      if (XPLevels[level] > currentXP) {
        const diff = XPLevels[level] - currentXP;
        remainingWager[level] = Math.floor(diff / 400);
      }
    }
    return remainingWager;
  };

  const handleDiceRollingWager = (levelXP) => {
    const diff = levelXP - currentXP;
    const wager = Math.floor(diff / 400) * 0.06;
    return Math.floor(wager);
  };

  const remainingWager = handleWagerNeeded();

  return (
    <div class="main">
      <div class="donation">
        <p>Donation ❤️</p>
        <a href="https://paypal.me/peter183?country.x=BG&locale.x=en_US">
          <img width="30px" src="pp.png" alt="click here"/>
        </a>
      </div>
      <h1 class="title">CSGORoll Wager Calculator</h1>
      <div className="user-xp-box">
        <label class="xp-label">
          Enter your current XP:
        </label>
        <input class="xp-input" type="number" value={currentXP} onChange={handleInputChange} />
      </div>
      <div>
        {Object.keys(remainingWager).length > 0 && (
          <div class="content">
            <div>
              <h3 class="subheading">Wager needed to reach higher levels:</h3>
              <ul class="wager-list">
                {Object.keys(remainingWager).map((level) => (
                  <li class="level-row" key={level}>
                    {level}: {remainingWager[level]}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 class="subheading">Dice Rolling Wager needed to reach higher levels:</h3>
              <ul class="wager-list">
                {Object.entries(XPLevels).map(([level, levelXP]) => {
                  if (levelXP > currentXP) {
                    return (
                      <li class="level-row" key={level}>
                        {level} - {handleDiceRollingWager(levelXP)}
                      </li>
                    );
                  }
                  return null;
                })}
              </ul>
            </div>
          </div>
        )}
        <div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;