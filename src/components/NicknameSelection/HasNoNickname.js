import React from "react";
import HasNoNicknameForm from "./HasNoNicknameForm";
import HasNoNicknameHeader from "./HasNoNicknameHeader";
import HasNoNicknameImage from "./HasNoNicknameImage";

const styledHasNoNicknameContainer = {
  height: "100%",
  display: "flex",
};

const HasNoNickname = () => {
  return (
    <div style={styledHasNoNicknameContainer}>
      <HasNoNicknameHeader />
      <HasNoNicknameForm />
      <HasNoNicknameImage />
    </div>
  );
};

export default HasNoNickname;
