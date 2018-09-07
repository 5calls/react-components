import * as React from 'react';

import { UserProfile, Auth0Config } from '../shared/model';
import { CustomLoginUi } from './CustomLoginUi';
import { LoginService } from './LoginService';

export interface CustomLoginProps {
  readonly auth0Config: Auth0Config;
  readonly userProfile?: UserProfile;
  logoutHandler: () => void;
  refreshHandler: (email: string) => void;
}

export interface CustomLoginState {
}

export class CustomLogin extends React.Component<CustomLoginProps, CustomLoginState> {
  loginService: LoginService;

  constructor(props: CustomLoginProps) {
    super(props);
    this.loginService = new LoginService(this.props.auth0Config);
  }

  signup = (email: string = '', password: string = ''): Promise<string> => {
    return this.loginService.signup(email, password);
  }

  login = (email: string = '', password: string = ''): Promise<string> => {
    return this.loginService.login(email, password);
  }

  twitterLogin = () => {
    this.loginService.twitterLogin();
  }

  facebookLogin = () => {
    this.loginService.facebookLogin();
  }

  logout = () => {
    this.props.logoutHandler();
  }

  showEmail = (): boolean => {
    let needsEmail = false;
    if (this.props.userProfile &&
      (this.props.userProfile['https://5calls.org/email'] === undefined ||
       this.props.userProfile['https://5calls.org/email'] === '')) {
        needsEmail = true;
    }

    return needsEmail;
  }

  render() {
    return (
      <CustomLoginUi
        profile={this.props.userProfile}
        auth0Config={this.props.auth0Config}
        showEmailModal={this.showEmail()}
        login={this.login}
        twitterLogin={this.twitterLogin}
        facebookLogin={this.facebookLogin}
        logout={this.logout}
        signup={this.signup}
        refreshHandler={this.props.refreshHandler}
      />
    );
  }
}