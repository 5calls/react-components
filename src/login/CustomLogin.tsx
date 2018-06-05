import * as React from 'react';

import { UserProfile, Auth0Config } from '../shared/model';
import { CustomLoginUi } from './CustomLoginUi';
import { LoginService } from './LoginService';

interface Props {
  readonly auth0Config: Auth0Config;
  readonly userProfile: UserProfile;
  logoutHandler: () => void;
}

interface State {
}

export class CustomLogin extends React.Component<Props, State> {
  loginService: LoginService;

  constructor(props: Props) {
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

  render() {
    return (
      <CustomLoginUi
        profile={this.props.userProfile}
        auth0Config={this.props.auth0Config}
        login={this.login}
        twitterLogin={this.twitterLogin}
        facebookLogin={this.facebookLogin}
        logout={this.logout}
        signup={this.signup}
      />
    )
  }
}


