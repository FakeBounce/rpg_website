import React from "react";

import { colors } from "../Utils/Constants";
import { Menu } from "semantic-ui-react";
import { cursorPointer, widthLeft } from "../Utils/StyleConstants";

const styledSpellGeneratorMenuContainer = {
  marginTop: 10,
  marginBottom: 10,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const styledSpellGeneratorMenuItem = {
  width: 150,
  marginLeft: widthLeft / 4 - 75,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: 0,
  backgroundColor: colors.background,
  color: "white",
  cursor: cursorPointer,
};
const SpellGeneratorPanelHeader = () => (
  <div style={styledSpellGeneratorMenuContainer}>
    <Menu attached="top" tabular>
      <Menu.Item
        name={"SpellGenerator"}
        active={true}
        style={styledSpellGeneratorMenuItem}
      />
    </Menu>
  </div>
);
export default SpellGeneratorPanelHeader;
