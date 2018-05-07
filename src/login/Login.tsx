import * as React from 'react';
import { UserProfile } from '../shared/model';
import { LoginUi } from './LoginUi';
import { LoginService } from './LoginService';

interface Props {
  userProfile: UserProfile;
  logoutHandler: () => void;
}

interface State {
}

export class Login extends React.Component<Props, State> {
  loginService = new LoginService();

  constructor(props: Props) {
    super(props);
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
