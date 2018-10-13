import React, { Component } from "react";
import PropTypes from "prop-types";
import firebase from "firebase";

class HasNoPseudo extends Component {
    choosePseudo = () => {
        const { pseudoInput, doSetState, triggerError } = this.props;
        firebase
            .database()
            .ref("users/" + firebase.auth().currentUser.uid + "/pseudo")
            .set(pseudoInput)
            .catch(error => {
                triggerError(error);
            });
        doSetState({
            pseudo: pseudoInput,
        });
    };

    render() {
        const { pseudoInput, onChange } = this.props;

        return (
            <div>
                <input
                    type="text"
                    name="pseudoInput"
                    placeholder="pseudo"
                    value={pseudoInput}
                    onChange={e => {
                        onChange(e.target.name, e.target.value.replace(/\s/g, ''));
                    }}
                />
                <button onClick={this.choosePseudo}>Choisir un pseudo</button>
            </div>
        );
    }
}

HasNoPseudo.propTypes = {
    pseudoInput: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    doSetState: PropTypes.func.isRequired,
    triggerError: PropTypes.func.isRequired,
};

export default HasNoPseudo;
