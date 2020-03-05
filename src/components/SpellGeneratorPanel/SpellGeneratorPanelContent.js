import React, { useState } from "react";

import {
  spellModeList,
  spellTypeList,
  toSemanticUIOptions,
} from "../Utils/Constants";
import { useSelector } from "react-redux";
import { Button, Select, Input } from "semantic-ui-react";
import { cursorPointer } from "../Utils/StyleConstants";
import SpellGeneratorPanelResult from "./SpellGeneratorPanelResult";

const styledSpellContainer = {
  position: "relative",
  display: "flex",
  overflow: "auto",
  flexDirection: "column",
  padding: 10,
};

const styledFormContainer = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: 5,
  marginBottom: 5,
};

const styledFormButtonContainer = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: 20,
  marginBottom: 20,
};

const styledFormButton = {
  height: 25,
  padding: "5px 15px",
  cursor: cursorPointer,
};

const noSpell = {
  name: "No spell",
  mode: "None",
  rarity: "0",
  type: "None",
};

const SpellGeneratorPanelContent = () => {
  const [generatedSpell, setGeneratedSpell] = useState(null);
  const [generatedSpellType, setGeneratedSpellType] = useState("Feu");
  const [generatedSpellMode, setGeneratedSpellMode] = useState("Offensif");
  const [rollValue, setRollValue] = useState(50);

  const { items } = useSelector(store => ({
    items: store.items.items,
  }));

  const generateSpell = () => {
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
          setGeneratedSpell(targetedSpells[choosedSpell]);
        } else {
          setGeneratedSpell(noSpell);
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
          // eslint-disable-next-line
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
            // eslint-disable-next-line
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
          setGeneratedSpell(randomRaritySpell[choosedSpell]);
        } else {
          setGeneratedSpell(noSpell);
        }
      }
    }
  };

  return (
    <div style={styledSpellContainer} className="scrollbar">
      <div style={styledFormContainer}>
        Score made :
        <Input
          focus
          type="number"
          placeholder="Valeur du dé"
          name="rollValue"
          value={rollValue}
          onChange={e => {
            setRollValue(parseInt(e.target.value, 10));
          }}
        />
      </div>
      <div style={styledFormContainer}>
        Element desired :
        <Select
          value={generatedSpellType}
          onChange={(e, { value }) => {
            setGeneratedSpellType(value);
          }}
          options={toSemanticUIOptions(spellTypeList)}
        />
      </div>
      <div style={styledFormContainer}>
        Kind of spell :
        <Select
          value={generatedSpellMode}
          onChange={(e, { value }) => {
            setGeneratedSpellMode(value);
          }}
          options={toSemanticUIOptions(spellModeList)}
        />
      </div>
      <div style={styledFormButtonContainer}>
        <Button primary onClick={generateSpell} style={styledFormButton}>
          Generate spell
        </Button>
      </div>
      {generatedSpell !== null && (
        <SpellGeneratorPanelResult generatedSpell={generatedSpell} />
      )}
    </div>
  );
};

export default SpellGeneratorPanelContent;
