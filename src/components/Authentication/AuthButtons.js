import React from "react";
import { Button } from "semantic-ui-react";
import { cursorPointer } from "../Utils/StyleConstants";

const styledAuthButtonsContainer = {
  width: "100%",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  marginBottom: 30,
};

const AuthButtons = ({ signIn, signUp }) => {
  return (
    <div style={styledAuthButtonsContainer}>
      <Button.Group>
        <Button
          onClick={signIn}
          primary
          style={{ width: 120, cursor: cursorPointer }}
        >
          Sign In
        </Button>
        <Button.Or />
        <Button
          onClick={signUp}
          positive
          style={{ width: 120, cursor: cursorPointer }}
        >
          Sign Up
        </Button>
      </Button.Group>
    </div>
  );
};

export default AuthButtons;
