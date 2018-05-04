import * as React from 'react';
import { UserProfile } from '../shared/model';
import { LoginUi } from './LoginUi';

interface Props {
  userProfile: UserProfile;
  logout: () => void;
  login: () => void;
}

interface State {
}

export class Login extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
  }

  login = () => {
    this.props.login();
  }

  logout = () => {
    this.props.logout();
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
