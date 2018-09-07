import * as auth0base from 'auth0-js';
import jwt from 'jwt-decode';
import { UserState, UserProfile, AuthResponse, Auth0Config } from '../shared/model';

const databaseConnection = 'Username-Password-Authentication';

export class LoginService {

  auth0: auth0base.WebAuth;
  popup: boolean;

  constructor(auth0Config: Auth0Config) {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.popup = auth0Config.popupAuth;

    this.auth0 = new auth0base.WebAuth({
      domain: auth0Config.domain,
      clientID: auth0Config.clientId,
      redirectUri: auth0Config.callbackUri,
      audience: auth0Config.audience,
      responseType: 'token id_token',
      scope: 'openid profile email',
    });
  }

  checkAndRenewSession(profile: UserProfile, authToken: string, force: boolean = false): Promise<AuthResponse> {
    return new Promise((resolve, reject) => {
      if (profile !== undefined) {
        // only act on people who are logged in
        let expires = new Date(profile.exp * 1000);
        let now = new Date();
        if (expires < now || force) {
          // try to renew automatically
          this.auth0.checkSession({}, (error, result) => {
            if (error !== null) {
              // not sure how this might happen, reject and log out in the app
              reject(error);
            } else {
              // otherwise we get the refreshed details back and update them
              const authResponse = this.decodeAndSetProfile(result);
              resolve(authResponse);
            }
          });
        } else {
          // we're good for now, don't do anything
          const authResponse: AuthResponse = {userProfile: profile, authToken: authToken}
          resolve(authResponse);
        }
      } else {
        reject("no profile for check");
      }
    });
  }

  isLoggedIn(user?: UserState): boolean {
    if (user && user.idToken) {
      return true;
    }
    return false;
  }

  signup = (username: string = '', password: string = ''): Promise<string> => {
    username = username || '';
    password = password || '';
    return new Promise((resolve, reject) => {
      try {
        this.auth0.redirect.signupAndLogin({
          connection: databaseConnection,
          email: username,
          password: password
          }, (error:  auth0base.Auth0Error | null) => {
            if (error) {
              console.error('Auth0 LoginService.signup() error', error);
              const results = error.description;
              reject(results);
            } else {
              resolve('');
            }
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  login(username: string = '', password: string = ''): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        this.auth0.login(
        { realm: databaseConnection, username, password },
        (error:  auth0base.Auth0Error | null) => {
          console.error('Auth0 LoginService.login() error', error);
          if (error) {
            const results = error.description;
            reject(results);
          } else {
            return resolve('');
          }
        });
      } catch(err) {
        reject(err);
      }
    });
  }

  twitterLogin = () => {
    if (this.popup) {
      // @ts-ignore: additional required parameters defined in Auth0 d.ts file is not used here
      this.auth0.popup.authorize({
        connection: 'twitter',
      }, (err: auth0.Auth0Error, authResult: any) => {
        // handled in handleAuthentication
      });
    } else {
      this.auth0.authorize({
        connection: 'twitter'
      });
    }
  }

  facebookLogin = () => {
    if (this.popup) {
      // @ts-ignore
      this.auth0.popup.authorize({
        connection: 'facebook',
        // @ts-ignore
      }, (err, authResult) => {
        // handled in handleAuthentication
      });
    } else {
      this.auth0.authorize({
        connection: 'facebook'
      });
    }
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
          // console.log('LoginService.handleAuthentication called. Auth response', authResponse);
          resolve(authResponse);
        }
      });
    });
  }


  decodeAndSetProfile(auth0Hash: auth0base.Auth0DecodedHash): AuthResponse {
    console.log("decoding");
    let userProfile: UserProfile | undefined;
    let authToken = '';
    if (auth0Hash.idToken) {
      authToken = auth0Hash.idToken;
      userProfile = jwt(auth0Hash.idToken);
    }
    return {authToken, userProfile};
  }
}
