import * as React from 'react';
import { UserProfile, Auth0Config } from '../shared/model';
import { LoginUi } from './LoginUi';
import { LoginService } from './LoginService';

export interface LoginProps {
  readonly auth0Config: Auth0Config;
  readonly userProfile: UserProfile;
  logoutHandler: () => void;
}

export interface LoginState {
}

export class Login extends React.Component<LoginProps, LoginState> {
  loginService: LoginService;

  constructor(props: LoginProps) {
    super(props);
    this.loginService = new LoginService(this.props.auth0Config);
  }

  login = () => {
    this.loginService.login();
  }

  logout = () => {
    this.props.logoutHandler();
  }

  render() {
    return (
      <div>
        <LoginUi
          profile={this.props.userProfile}
          login={this.login}
          logout={this.logout} />
      </div>
    )
  }
}
