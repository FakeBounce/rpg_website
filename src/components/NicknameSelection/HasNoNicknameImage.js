import React from "react";

const styledHasNoNicknameLeftContainer = { width: "50%", height: "100%" };
const styledHasNoNicknameImage = { width: "100%", height: "100%" };

const HasNoNicknameImage = () => {
  return (
    <div style={styledHasNoNicknameLeftContainer}>
      <img
        src={"./common/pseudoPage.jpg"}
        alt={"homepage"}
        style={styledHasNoNicknameImage}
      />
    </div>
  );
};

export default HasNoNicknameImage;
