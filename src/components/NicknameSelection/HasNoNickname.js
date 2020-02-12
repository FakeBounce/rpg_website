import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ButtonLarge from "../Utils/ButtonLarge";
import { callSetUserPseudo } from "../../redux/actions/actionsUserInfos";

class HasNoNickname extends Component {
  state = {
    pseudoInput: "",
  };

  onChange = value => {
    this.setState(state => ({
      ...state,
      pseudoInput: value,
    }));
  };

  choosePseudo = () => {
    const { pseudoInput } = this.state;
    const { dispatchCallSetUserPseudo } = this.props;
    dispatchCallSetUserPseudo(pseudoInput);
  };

  render() {
    const { pseudoInput, signOut } = this.props;

    return (
      <div>
        <input
          type="text"
          name="pseudoInput"
          placeholder="pseudo"
          value={pseudoInput}
          onChange={e => {
            this.onChange(e.target.value.replace(/\s/g, ""));
          }}
        />
        <button onClick={this.choosePseudo}>Choisir un pseudo</button>
        <ButtonLarge
          onClick={signOut}
          style={{ position: "absolute", top: 0, right: 0 }}
        >
          Log out
        </ButtonLarge>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchCallSetUserPseudo: payload => {
      dispatch(callSetUserPseudo(payload));
    },
  };
};

HasNoNickname.propTypes = {
  dispatchCallSetUserPseudo: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(HasNoNickname);
