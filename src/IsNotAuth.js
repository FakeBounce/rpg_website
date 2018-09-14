import React, { Component } from 'react';
import PropTypes from "prop-types";

class IsNotAuth extends Component {
    render() {
        const { email, password, onChange, signIn, signUp } = this.props;

        return (
            <div>
                <input
                    type="text"
                    name="email"
                    placeholder="email"
                    value={email}
                    onChange={e => {
                        onChange(e.target.name, e.target.value);
                    }}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="password"
                    value={password}
                    onChange={e => {
                        onChange(e.target.name, e.target.value);
                    }}
                />
                <button onClick={signIn}>Sign In</button>
                <button onClick={signUp}>Sign Up</button>
            </div>
        );
    }
}

IsNotAuth.propTypes = {
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    signIn: PropTypes.func.isRequired,
    signUp: PropTypes.func.isRequired,
};

export default IsNotAuth;
