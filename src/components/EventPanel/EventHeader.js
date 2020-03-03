import React from "react";
import { cursorPointer, widthLeft } from "../Utils/StyleConstants";
import { colors } from "../Utils/Constants";
import { Menu } from "semantic-ui-react";

const styledEventMenuContainer = {
  marginTop: 10,
  marginBottom: 10,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const styledEventMenuItem = {
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

const EventHeader = () => (
  <div style={styledEventMenuContainer}>
    <Menu attached="top" tabular>
      <Menu.Item name={"Events"} active={true} style={styledEventMenuItem} />
    </Menu>
  </div>
);

export default EventHeader;
