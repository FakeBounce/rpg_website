import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import { spellModeList, spellTypeList, colors } from "./Utils/Constants";

const styledSpellContainer = {
  position: "relative",
  float: "left",
  display: "inline-block",
  overflowY: "auto",
};

const noSpell = {
  name: "No spell",
  mode: "None",
  rarity: "0",
  type: "None",
};

class SpellGenerator extends PureComponent {
  state = {
    generatedSpell: null,
    generatedSpellType: "Feu",
    generatedSpellMode: "Offensif",
    rollValue: 50,
  };

  onChange = (name, value) => {
    const obj = {};
    obj[name] = value;
    this.setState(state => ({
      ...state,
      ...obj,
    }));
  };

  generateSpell = () => {
    const { generatedSpellType, generatedSpellMode, rollValue } = this.state;
    const { items } = this.props;
    if (items && items.spells) {
      const filteredSpells = [];
      Object.keys(items.spells).map(key => {
        if (items.spells[key]["random"] === "TRUE") {
          filteredSpells.push(items.spells[key]);
        }
        return null;
      });

      if (generatedSpellMode === "Failed") {
        let targetedSpells = [];

        //Reducing spell ranges to intensify fail roll, the higher the fail the higher the rarity of the failed spell
        filteredSpells.map(fs => {
          if (parseInt(fs.rarity, 10) > Math.ceil((rollValue - 75) / 5) + 1) {
            targetedSpells.push(fs);
          }
          return null;
        });
        const choosedSpell = parseInt(
          Math.random() * targetedSpells.length,
          10,
        );
        if (targetedSpells.length > 0) {
          this.setState(state => ({
            ...state,
            generatedSpell: targetedSpells[choosedSpell],
          }));
        } else {
          this.setState(state => ({
            ...state,
            generatedSpell: noSpell,
          }));
        }
      } else {
        const targetedSpells = [];
        const rangeCount = 11 - Math.floor(rollValue / 10);
        const spellRange = rangeCount === 11 ? 10 : rangeCount;
        const minimumRange =
          rollValue < 6 ? 5 : spellRange - 7 > 1 ? spellRange - 7 : 1;

        filteredSpells.map(fs => {
          if (
            fs.mode === generatedSpellMode &&
            parseInt(fs.rarity, 10) <= spellRange &&
            parseInt(fs.rarity, 10) > minimumRange &&
            fs.type === generatedSpellType
          ) {
            targetedSpells.push(fs);
          }
          return null;
        });

        let totalPound = 0;
        const chances = [];

        for (let i = minimumRange; i <= spellRange; i++) {
          totalPound += 1.75 + 0.25 * i;
        }

        for (let i = minimumRange; i <= spellRange; i++) {
          chances.push((1.75 + 0.25 * i) / totalPound);
        }

        const randomNumber = Math.random();
        let chancesCount = 0;
        let raritySelected = 1;

        for (let i = 0; i < chances.length; i++) {
          if (
            randomNumber > chancesCount &&
            randomNumber < chancesCount + chances[i]
          ) {
            raritySelected = i + minimumRange;
            break;
          } else {
            chancesCount += chances[i];
          }
        }
        const randomRaritySpell = [];
        let tempRarity = raritySelected;
        while (randomRaritySpell.length === 0 && tempRarity > minimumRange) {
          targetedSpells.map(fs => {
            if (parseInt(fs.rarity, 10) === tempRarity) {
              randomRaritySpell.push(fs);
            }
            return null;
          });
          tempRarity -= 1;
        }

        if (randomRaritySpell.length === 0) {
          let tempRarity = raritySelected;
          while (randomRaritySpell.length === 0 && tempRarity <= spellRange) {
            targetedSpells.map(fs => {
              if (parseInt(fs.rarity, 10) === tempRarity) {
                randomRaritySpell.push(fs);
              }
              return null;
            });
            tempRarity += 1;
          }
        }

        if (randomRaritySpell.length > 0) {
          const choosedSpell = parseInt(
            Math.random() * randomRaritySpell.length,
            10,
          );
          this.setState(state => ({
            ...state,
            generatedSpell: randomRaritySpell[choosedSpell],
          }));
        } else {
          this.setState(state => ({
            ...state,
            generatedSpell: noSpell,
          }));
        }
      }
    }
  };

  render() {
    const {
      generatedSpell,
      generatedSpellType,
      generatedSpellMode,
      rollValue,
    } = this.state;

    return (
      <div style={styledSpellContainer} className="scrollbar">
        <input
          type="number"
          placeholder="Valeur du dé"
          name="rollValue"
          value={rollValue}
          onChange={e => {
            this.onChange(e.target.name, parseInt(e.target.value, 10));
          }}
        />
        <select
          value={generatedSpellType}
          onChange={e => {
            this.onChange("generatedSpellType", e.target.value);
          }}
        >
          {spellTypeList.map(stl => {
            return (
              <option key={stl} value={stl}>
                {stl}
              </option>
            );
          })}
        </select>
        <select
          value={generatedSpellMode}
          onChange={e => {
            this.onChange("generatedSpellMode", e.target.value);
          }}
        >
          {spellModeList.map(stl => {
            return (
              <option key={stl} value={stl}>
                {stl}
              </option>
            );
          })}
        </select>
        <button
          onClick={this.generateSpell}
          style={{
            background: `url('/common/button2.png') no-repeat`,
            backgroundSize: "cover",
            height: 25,
            color: colors.text,
            padding: "5px 15px",
          }}
        >
          Generate spell
        </button>
        {generatedSpell !== null && (
          <div>
            <div>Name : {generatedSpell.name}</div>
            <div>Mode : {generatedSpell.mode}</div>
            <div>Type : {generatedSpell.type}</div>
            <div>Power : {generatedSpell.rarity}</div>
          </div>
        )}
      </div>
    );
  }
}

SpellGenerator.defaultProps = {
  items: null,
};

SpellGenerator.propTypes = {
  items: PropTypes.object,
};

export default SpellGenerator;
