import React, { Component } from 'react'
import { signIn, signUp } from '../todos-api.js'

export default class AuthPage extends Component {

    state = {
        email: '',
        password: '',
        badCreds: false,
        error: false
    }

    handleAuthResult(result) {
        if(!result.error && !result.badCreds) {
            this.props.handleTokenChange(result.token)
            this.props.history.push('/todos');
        } else {
            this.setState({ ...result });
        }

    }
    handleSignin = async (e) => {
        const { email, password } = this.state;
        const result = await signIn(email, password);
        this.handleAuthResult(result);
    }

    handleSignup = async (e) => {
        const { email, password } = this.state;
        const result = await signUp(email, password);
        this.handleAuthResult(result);
    }

    clearErrorState = () => {
        this.setState({ error: false, badCreds: false })
    }

    handleEmailChange = (e) => {
        this.setState({ email: e.target.value });
        this.clearErrorState();
    }

    handlePasswordChange = (e) => {
        this.setState({ password: e.target.value });
        this.clearErrorState();
    }

    render() {
        const {
            email,
            password,
            error,
            badCreds
        } = this.state;
        return (
            <div>
                {error ? "Error" : ""}
                {badCreds ? "Bad Credentials" : ""}
                <form onSubmit={ this.handleSubmit }>
                    <label>
                        Email:
                        <input name="email" value={ email } onChange={ this.handleEmailChange } />
                    </label>
                    <label>
                        Password:
                        <input type="password" name="password" value={ password } onChange={ this.handlePasswordChange } />
                    </label>
                    <input type="button" value="Sign In" onClick={ this.handleSignin }/>
                    <input type="button" value="Sign Up" onClick={ this.handleSignup }/>
                </form>
            </div>
        )
    }
}
