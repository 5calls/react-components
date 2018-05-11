import * as React from 'react';
import { UserProfile } from '../shared/model';
import { CustomLoginUi } from './CustomLoginUi';
import { LoginService } from './LoginService';

interface Props {
  userProfile: UserProfile;
  logoutHandler: () => void;
}

interface State {
}

export class CustomLogin extends React.Component<Props, State> {
  loginService = new LoginService();

  constructor(props: Props) {
    super(props);
  }

  login = (email?: string, password?: string): string | undefined => {
    const results = this.loginService.login(email, password);
    console.log('Login results', results);
    return results;
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
      <div>
        <CustomLoginUi
          profile={this.props.userProfile}
          login={this.login}
          twitterLogin={this.twitterLogin}
          facebookLogin={this.facebookLogin}
          logout={this.logout} />
      </div>
    )
  }
}


