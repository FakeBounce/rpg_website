import React from 'react';
import { Button } from 'semantic-ui-react';
import { cursorPointer } from '../Utils/StyleConstants';

const styledAuthButtonsContainer = {
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 30,
};

const AuthButtons = ({ signIn, signUp, signInGoogle }) => {
  return (
    <div style={styledAuthButtonsContainer}>
      <Button.Group style={{ alignItems: 'center', display: 'flex' }}>
        <Button
          onClick={signIn}
          primary
          style={{ width: 120, cursor: cursorPointer, height: 50 }}
        >
          Sign In
        </Button>
        <Button.Or />
        <Button
          onClick={signUp}
          positive
          style={{ width: 120, cursor: cursorPointer, height: 50 }}
        >
          Sign Up
        </Button>
        <Button.Or />
        <Button
          onClick={signInGoogle}
          secondary
          style={{ width: 120, cursor: cursorPointer, height: 50 }}
        >
          Sign with Google
        </Button>
      </Button.Group>
    </div>
  );
};

export default AuthButtons;
