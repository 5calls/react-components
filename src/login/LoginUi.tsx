import * as React from 'react';
import { Link } from 'react-router-dom';
import { UserProfile } from '../shared/model';

interface Props {
  readonly profile?: UserProfile;
  readonly login: () => void;
  readonly logout: () => void;
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
      this.toggleMenu();
    } else {
      this.props.login();
      this.setState({isLoggedIn: true});
    }
  }

  logout = (): void => {
    this.props.logout();
    this.toggleMenu();
  }

  render() {
    return (
        <div className="userHeader">
        <a onClick={this.loginClick}>
          <img
            className="stars"
            src={this.props.profile ? this.props.profile.picture : '/img/5calls-stars.png'}
            alt="Make your voice heard"
          />
        </a>
        <p><a onClick={this.loginClick}>{this.props.profile ? this.props.profile.name : 'Login'}</a></p>
        { !this.state.userMenuHidden &&
        <div className="userHeader__menu">
          <ul>
            <li><Link to="/impact">My Impact</Link></li>
            <li className="line"/>
            <li><a href="#" onClick={this.logout}><strong>Log out</strong></a></li>
          </ul>
        </div>
        }
    </div>
  );
  };
}