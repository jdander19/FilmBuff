import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { app, googleProvider } from '../../firebase';

import './index.css';

class Login extends Component {

    constructor() {
      super()
      this.state = {
        redirect: false
      }
    }
  
    authWithSocialNetwork = (provider) => {
      app.auth().signInWithPopup(provider)
        .then((result, error) => {
          if (error) {
            console.log(error.code, error.message, error.email);
          } else {
            this.setState({ redirect: true })
          }
        })
    }
  
    authWithEmailPassword(e) {
      e.preventDefault()
  
      const email = this.emailInput.value
      const password = this.passwordInput.value
  
      app.auth().fetchProvidersForEmail(email)
      .then((providers) => {
      if (providers.length === 0) {
        // User doesn't have account, let's create it.
        return app.auth().createUserWithEmailAndPassword(email, password)
      } else if (providers.indexOf("password") === -1) {
        // User signed up with social network
        console.log('Please, try alternative login.');
      } else {
        // Sign in with email/password
        return app.auth().signInWithEmailAndPassword(email, password)
      }
    })
    .then((user) => {
      if (user && user.email) {
        this.loginForm.reset()
        this.setState({ redirect: true })
      }
    })
    .catch((error) => {
      console.log(error.message);
    })
    }

    render () {

        const { from } = this.props.location.state || { from: { pathname: '/' } }
        const { redirect } = this.state
    
        if (redirect) {
          return (
            <Redirect to={from} />
          )
        }

    return (
        <div className="Main-wrapper">
          
          <div className="Login-wrapper">
            <h1 className="App-main-title login-form-title">Join us!</h1>
            <div className="login-form-notice">If you don't have an account already, this form will create you one.</div>
  
            <form className="login-form filmbuff-form" onSubmit={(event) => this.authWithEmailPassword(event)} ref={(form) => { this.loginForm = form }}>
              <div className="login-form-content">
                <label className="" htmlFor="email">
                  Email
                </label>
                <input ref={(input) => {this.emailInput = input}} className="" id="email" name="email" type="email" placeholder="Email"></input>
                <label className="" htmlFor="password">
                  Password
                </label>
                <input ref={(input) => {this.passwordInput = input}} className="" id="password" name="password" type="password"  placeholder="Password"></input>
                <input type="submit" className="button login-form-submit" value="Log In"></input>
              </div>
            </form>


            <div className="alternate-login">Or</div>
          <div className="login-social-wrapper"></div>
          <button className="login-social" onClick={() => this.authWithSocialNetwork(googleProvider)}>
          <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><g fill="none"><rect fill="#FFF" width="40" height="40" rx="2"/><path d="M28.64 20.2c0-.63-.06-1.25-.16-1.84H20v3.48h4.84c-.2 1.13-.84 2.08-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.87 2.68-6.62z" fill="#4285F4" /><path d="M20 29c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.82.54-1.85.86-3.06.86-2.34 0-4.33-1.58-5.04-3.7h-3v2.32C13.44 26.98 16.48 29 20 29z" fill="#34A853" /><path d="M14.96 21.7c-.18-.53-.28-1.1-.28-1.7 0-.6.1-1.17.28-1.7v-2.34h-3c-.6 1.2-.96 2.6-.96 4.04 0 1.45.35 2.83.96 4.04l3-2.33z" fill="#FBBC05" /><path d="M20 14.58c1.32 0 2.5.45 3.44 1.35l2.58-2.6C24.46 11.9 22.42 11 20 11c-3.52 0-6.56 2.02-8.04 4.96l3 2.33c.7-2.15 2.7-3.73 5.04-3.73z" fill="#EA4335" /></g></svg>
        </button>

      </div>
    </div>
    );
    }
}

export default Login;
  