import { Button, TextField } from '@mui/material';
import { email } from '@sideway/address';
import React, { Component } from 'react'
import { signIn, signUp } from '../todos-api.js'

export default class AuthPage extends Component {

  state = {
    email: '',
    password: '',
    badCreds: false,
    error: false,
    validEmail: true
  }

  handleAuthResult(result) {
    if (!result.error && !result.badCreds) {
      this.props.handleTokenChange(result.token)
      this.props.history.push('/todos');
    } else {
      this.setState({ ...result });
    }

  }
  handleSignin = async (e) => {
    const { email, password, validEmail } = this.state;
    if (!validEmail) return;
    const result = await signIn(email, password);
    this.handleAuthResult(result);
    const validEmail = email.isValid(input);
    this.setState({ email: input, validEmail });
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
      badCreds,
      validEmail
    } = this.state;
    return (
      <div className="auth-div">
        <div className="auth-error-div">
          <span className="not-error">Please Sign In to Continue</span>
          <span>{badCreds ? "Invalid Credentials" : " "}</span>
          <span>{error ? "Error" : " "}</span>
        </div>
        <form onSubmit={this.handleSubmit} className="auth-form">
          <TextField label="Email"
            variant="outlined"
            value={email}
            error={!validEmail}
            onChange={this.handleEmailChange}
            helperText={validEmail ? " " : "Invalid Email"}
            size="small"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={this.handlePasswordChange}
            herlperText=" "
            size="small"
          />
          <div>
            <Button onClick={this.handleSignin} >Sign In</Button>
            <Button onClick={this.handleSignup} >Sign Up</Button>
          </div>
        </form>
      </div>
    )
  }
}
