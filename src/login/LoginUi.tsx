import * as React from 'react';
import { UserProfile } from '../shared/model';
// import { loginStyles } from '../shared/styles';

interface Props {
  readonly profile?: UserProfile;
  readonly login: () => void;
}

interface State {
  userMenuHidden: boolean;
  isLoggedIn: boolean;
}

export class LoginUi extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      userMenuHidden: true,
      isLoggedIn: false

    };
  }

  toggleMenu = (): void => {
    this.setState({ userMenuHidden: !this.state.userMenuHidden });
  }

  loginClick = (): void => {
    if (this.props.profile) {
      this.props.login();
      this.setState({isLoggedIn: true});
    } else {
      this.toggleMenu();
    }
  }

  render() {
    return (
      <div style={{position: 'absolute', right:'0', width: '100px', height: '40px'}}>
        <a onClick={this.loginClick}>
          <img
            style={{cursor: 'pointer', width: '35px', height: '35px'}}
            src={this.props.profile ? this.props.profile.picture : '/img/5calls-stars.png'}
            alt="Login"
          />
        </a>
      </div>
    );
  };
}