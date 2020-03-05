import React from "react";

const styledHasNoNicknameHeader = {
  position: "absolute",
  width: "100%",
  top: 30,
  display: "flex",
  justifyContent: "center",
  letterSpacing: 13,
};

const HasNoNicknameHeader = () => {
  return <h1 style={styledHasNoNicknameHeader}>Choose your pseudo</h1>;
};

export default HasNoNicknameHeader;
