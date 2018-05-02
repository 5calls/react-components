import * as React from 'react';
import { UserProfile, AuthProvider } from '../shared/model';
import { LoginUi } from './LoginUi';
import { Auth0LoginService } from '../service/Auth0LoginService';

interface Props {
  authProvider?: AuthProvider;
  logout: () => void;
}

interface State {
}

export class Login extends React.Component<Props, State> {
  authProvider: AuthProvider = new Auth0LoginService();
  // userProfile: UserProfile | undefined = undefined;
  userProfile: UserProfile | undefined = {name: 'Craig', sub: '', exp: 0, picture: ''};

  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    if(this.props.authProvider) {
      this.authProvider = this.props.authProvider;
    }
  }

  login = () => {
    this.authProvider.login();
  }

  logout = () => {
    this.props.logout();
    // This needs to be done in the callback:
    //   store.dispatch(clearProfileActionCreator());
  }

  render() {
    return (
      <div>
        <LoginUi
          profile={this.userProfile}
          login={this.login}
          logout={this.logout} />
      </div>
    )
  }
}
