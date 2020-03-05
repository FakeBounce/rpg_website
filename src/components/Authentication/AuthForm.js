import React  from "react";
import { Input } from "semantic-ui-react";

const styledAuthFormContainer = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  paddingBottom: 30,
};

const AuthForm = ({
  email,
  setEmail,
  password,
  setPassword,
  handleKeyPress,
}) => {
  return (
    <div style={styledAuthFormContainer}>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Input
          type="text"
          name="email"
          placeholder="email"
          autoComplete="on"
          value={email}
          onChange={e => {
            setEmail(e.target.value);
          }}
          onKeyPress={handleKeyPress}
          style={{ minWidth: 200, marginBottom: 20 }}
        />
      </div>
      <Input
        type="password"
        name="password"
        placeholder="password"
        autoComplete="on"
        value={password}
        onChange={e => {
          setPassword(e.target.value);
        }}
        onKeyPress={handleKeyPress}
        style={{ minWidth: 200, marginBottom: 20 }}
      />
    </div>
  );
};

export default AuthForm;
