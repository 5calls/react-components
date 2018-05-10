import * as auth0base from 'auth0-js';
import jwt from 'jwt-decode';

import * as Constants from '../shared/constants';
import { UserState, UserProfile, AuthResponse } from '../shared/model';

const callbackURI = () => {
  if (window.location.host.includes('localhost')) {
    return 'http://localhost:3000/auth0callback';
  } else if (window.location.host.includes('test.5calls.org')) {
    return 'https://test.5calls.org/auth0callback';
  }

  return 'https://5calls.org/auth0callback';
};

export class LoginService {
  auth0 = new auth0base.WebAuth({
    domain: Constants.AUTH0_DOMAIN,
    clientID: Constants.AUTH0_CLIENT_ID,
    redirectUri: callbackURI(),
    audience: 'https://5callsos.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid profile email',
  });

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
  }

  checkAndRenewSession(profile?: UserProfile) {
    if (profile !== undefined) {
      // only act on people who are logged in
      let expires = new Date(profile.exp * 1000);
      let now = new Date();
      if (expires < now) {
        // try to renew automatically
        this.auth0.checkSession({}, (error, result) => {
          if (error !== null) {
            // not sure how this might happen, log out for now
            // tslint:disable-next-line:no-console
            console.error('LoginService.checkAndRenewSession() error: ', error);
            // this.logout(); //FIXME: this.logout() is a noop
          } else {
            // otherwise we get the refreshed details back and update them
            this.decodeAndSetProfile(result);
          }
        });
      } else {
        // we're good for now, don't do anything
      }
    }
  }

  isLoggedIn(user?: UserState): boolean {
    if (user && user.idToken) {
      return true;
    }
    return false;
  }

  login(username?: string, password?: string) {
    // this.auth0.authorize();
    username = username || '';
    password = password || '';
    let results: string | undefined = undefined;
    this.auth0.login(
      { realm: 'Username-Password-Authentication', username, password },
      (error:  auth0base.Auth0Error | null) => {
        // const err: auth0base.Auth0Error = null;
        console.error('Auth0 LoginService.login() error', error)
        if (error) {
          results = error.errorDescription;
        }
      }
    );
    return results;
  }

  twitterLogin = () => {
    this.auth0.authorize({
      connection: 'twitter', // use connection identifier

    });
  }

  facebookLogin = () => {
    this.auth0.authorize({
      connection: 'facebook' // use connection identifier
    });
  }

  logout() {
    // The component using this service should handle
    // clearing the user profile from the Redux state
  }

  handleAuthentication(): Promise<AuthResponse> {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((error, authResult) => {
        if (!authResult) {
          // tslint:disable-next-line:no-console
          console.error('Auth0.parseHash() error', error);
          reject(error);
        } else {
          const authResponse: AuthResponse = this.decodeAndSetProfile(authResult);
          console.log('LoginService.handleAuthentication called. Auth response', authResponse);
          resolve(authResponse);
        }
      });
    });
  }


  decodeAndSetProfile(auth0Hash: auth0base.Auth0DecodedHash): AuthResponse {
    let userProfile: UserProfile | undefined;
    let authToken = '';
    if (auth0Hash.idToken) {
      authToken = auth0Hash.idToken;
      // console.log('token is ', auth0Hash.idToken);
      userProfile = jwt(auth0Hash.idToken);
      // console.log('jwt decodes to', profile);
    }
    return {authToken, userProfile };
  }
}

// $('.signin-db').on('click', function() {
//   webAuth.login({
//     realm: 'tests',
//     username: 'testuser',
//     password: 'testpass',
//   });
// });
// // Parse the authentication result
// webAuth.parseHash((err, authResult) => {
//   if (authResult) {
//     // Save the tokens from the authResult in local storage or a cookie
//     localStorage.setItem('access_token', authResult.accessToken);
//     localStorage.setItem('id_token', authResult.idToken);
//   } else if (err) {
//     // Handle errors
//     console.log(err);
//   }
// });
