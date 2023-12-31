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
  const [multiplier, setMultiplier] = useState(1); // Initial value of the multiplier set to 1

  const handleInputChange = (event) => {
    setCurrentXP(parseInt(event.target.value, 10));
  };

  const handleMultiplierChange = (event) => {
    let value = parseFloat(event.target.value);
    if(value <=0){
      value = 0.01
    }
    else if (value>10){
      value = 10
    } 
    setMultiplier(value);
  };

  const handleFilteredXPLevels = () => {
    return Object.entries(XPLevels)
      .filter(([_, levelXP]) => levelXP >= currentXP)
      .reduce((obj, [level, levelXP]) => {
        obj[level] = Math.floor((levelXP - currentXP) / (400 * multiplier));
        return obj;
      }, {});
  };

  const handleDiceRollingWager = (levelXP) => {
    const diff = levelXP - currentXP;
    const wager = Math.floor((diff / (400 * multiplier)) * 0.06);
    return Math.floor(wager);
  };

  const handleFilteredDiceXPLevels = () => {
    return Object.entries(XPLevels)
      .filter(([_, levelXP]) => levelXP >= currentXP)
      .reduce((obj, [level, levelXP]) => {
        obj[level] = handleDiceRollingWager(levelXP);
        return obj;
      }, {});
  };

  const remainingWager = handleFilteredXPLevels();
  const remainingDiceWager = handleFilteredDiceXPLevels();

  const handleFormattedNumber = (number) => {
    return number.toLocaleString(); // Format the number with thousands separators
  };

  return (
    <div class="main">
      <div class="donation">
        <p>Donation❤️</p>
        <a href="https://paypal.me/peter183?country.x=BG&locale.x=en_US">
          <img width="30px" src="https://github.com/PetarWho/CSGORollCalculator/blob/main/src/pp.png?raw=true" alt="click here" />
        </a>
      </div>
      <div class="code">
        <p>❤️Use code RoyVoyTheBoy in CSGOROLL</p>
      </div>
      <h1 class="title">CSGORoll Wager Calculator</h1>
      <div class="input-group">
        <div className="user-xp-box">
          <label class="xp-label">
            Enter your current XP:
          </label>
          <input class="xp-input" type="number" value={currentXP} onChange={handleInputChange} />
        </div>
        <div className="user-multiplier-box">
          <label className="multiplier-label">
            Current multiplier:
          </label>
          <input
            className="multiplier-input"
            type="number"
            step="0.01" // Allow the multiplier to have two decimal places
            min="0.01"
            max="10"
            value={multiplier}
            onChange={handleMultiplierChange}
          />
        </div>
      </div>
      {currentXP > XPLevels['🔴120'] && (
        <div className="middle-text">
          <p>Your XP is more than level 120????</p>
        </div>
      )}
      <div>
        {Object.keys(remainingWager).length > 0 && (
          <div class="content">
            <div>
              <h3 class="subheading">Wager needed to reach higher levels:</h3>
              <ul class="wager-list">
                {Object.keys(remainingWager).filter((level) => remainingWager[level] > 0).map((level) => (
                  <li class="level-row" key={level}>
                    {level}: {handleFormattedNumber(remainingWager[level])}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 class="subheading">Dice Rolling Wager needed to reach higher levels:</h3>
              <ul class="wager-list">
                {Object.keys(remainingDiceWager).filter((level) => remainingDiceWager[level] > 0).map((level) => (
                  <li class="level-row" key={level}>
                    {level}: {handleFormattedNumber(remainingDiceWager[level])}
                  </li>
                ))}
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