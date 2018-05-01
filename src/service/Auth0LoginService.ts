import { AuthProvider, UserProfile } from '../shared/model';

export class Auth0LoginService implements AuthProvider {

  login = (): void => {
    window.alert('Logged in from Auth0LoginService');
  }

  logout = () => {

  }

  isLoggedIn = (): boolean => {
    return false;
  }

  checkAndRenewSession = (profile?: UserProfile) => {

  }

}
