import React, { useState } from "react";
import { useDispatch } from "react-redux";
import ButtonLarge from "../Utils/ButtonLarge";
import { callSetUserPseudo } from "../../redux/actions/actionsUserInfos";

const styledHasNoNicknameRightContainer = {
  width: "50%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",
  alignItems: "center",
  paddingTop: 70,
  paddingBottom: 50,
  paddingLeft: 30,
};

const styledHasNoNicknameFormContainer = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

const HasNoNicknameForm = () => {
  const dispatch = useDispatch();
  const [pseudoInput, setPseudoInput] = useState("");

  const dispatchCallSetUserPseudo = payload => {
    dispatch(callSetUserPseudo(payload));
  };

  const choosePseudo = () => {
    dispatchCallSetUserPseudo(pseudoInput);
  };

  return (
    <div style={styledHasNoNicknameRightContainer}>
      <div style={styledHasNoNicknameFormContainer}>
        <input
          type="text"
          name="pseudoInput"
          placeholder="pseudo"
          value={pseudoInput}
          onChange={e => {
            setPseudoInput(e.target.value.replace(/\s/g, ""));
          }}
        />
        <ButtonLarge onClick={choosePseudo} style={{ marginTop: 20 }}>
          Validate
        </ButtonLarge>
      </div>
    </div>
  );
};

export default HasNoNicknameForm;
