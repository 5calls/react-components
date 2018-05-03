import * as auth0base from 'auth0-js';
import jwt from 'jwt-decode';
import * as Constants from '../shared/constants';
import { AuthProvider, UserProfile, AuthResponse } from '../shared/model';

const callbackURI = () => {
  if (window.location.host.includes('localhost')) {
    return 'http://localhost:3000/auth0callback';
  } else if (window.location.host.includes('test.5calls.us')) {
    return 'https://test.5calls.us/auth0callback';
  }

  return 'https://5calls.us/auth0callback';
};


export class Auth0LoginService implements AuthProvider {
  auth0 = new auth0base.WebAuth({
    domain: Constants.AUTH0_DOMAIN,
    clientID: Constants.AUTH0_CLIENT_ID,
    redirectUri: callbackURI(),
    audience: 'https://5callsos.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid profile email',
  });

  constructor() {

  }

  login = (): void => {
    console.log('Logged in from Auth0LoginService');
    this.auth0.authorize();
  }

  logout = () => {
    // This needs to be done in the app:
    //   store.dispatch(clearProfileActionCreator());
  }

  handleAuthentication = (): Promise<AuthResponse> => {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((error, authResult) => {
        if (authResult) {
        // if (!authResult) {
        //   console.error('Error with Auth0.parseHash() call', error);
        //   reject(error);
        // } else {
          console.log('Auth0LoginService.handleAuthentication() authResult', authResult);
          const authResponse = this.decodeAndSetProfile(authResult);
          resolve(authResponse);
        }
      });
    });
  }

  decodeAndSetProfile = (auth0Hash: auth0base.Auth0DecodedHash): AuthResponse => {
    let userProfile: UserProfile | undefined;
    let authToken = '';
    if (auth0Hash.idToken) {
      authToken = auth0Hash.idToken;
      console.log('token is ', authToken);
      userProfile = jwt(authToken);
      console.log('jwt decodes auth token to', userProfile);
    }
    return {authToken, userProfile};
  }

  isLoggedIn = (): boolean => {
    // normally we'd just check the state and see if we're logged in
    // but this runs before stuff is rehydrated, and waiting to rehydrate is not cool
    // so we just look directly at the localstorage key
    let localStorageUser = JSON.parse(window.localStorage['reduxPersist:userState'])

    if (localStorageUser && localStorageUser['idToken']) {
      return true;
    }
    return false;
  }

  checkAndRenewSession = (profile?: UserProfile): AuthResponse | undefined => {
    let authResponse: AuthResponse | undefined = undefined;
    if (profile !== undefined) {
      // only act on people who are logged in
      let expires = new Date(profile.exp * 1000);
      let now = new Date();
      if (expires < now) {
        // try to renew automatically
        this.auth0.checkSession({}, (err, result) => {
          if (err !== null) {
            // not sure how this might happen, log out for now
            console.log('error check session', err);
            this.logout();
          } else {
            // otherwise we get the refreshed details back and update them
            authResponse = this.decodeAndSetProfile(result);
          }
        });
      } else {
        // we're good for now, don't do anything
      }
    }
    return authResponse;
  }

}
