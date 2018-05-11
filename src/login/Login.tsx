import * as React from 'react';
import { UserProfile, Auth0Config } from '../shared/model';
import { LoginUi } from './LoginUi';
import { LoginService } from './LoginService';

interface Props {
  readonly auth0Config: Auth0Config;
  readonly userProfile: UserProfile;
  logoutHandler: () => void;
}

interface State {
}

export class Login extends React.Component<Props, State> {
  loginService: LoginService;

  constructor(props: Props) {
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
