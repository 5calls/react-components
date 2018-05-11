import * as React from 'react';
import { Link } from 'react-router-dom';
import { UserProfile } from '../shared/model';
import { LoginService } from './LoginService';

interface Props{
  readonly profile?: UserProfile;
  login: (email?: string, password?: string) => string | undefined;
  twitterLogin: () => void;
  facebookLogin: () => void;
  logout: () => void;
};

interface State{
  email: string;
  password: string;
  errorMessage: string;
  shouldDisplayLoginModal: boolean;
  userMenuHidden: boolean;
};

export class CustomLoginUi extends React.Component<Props, State> {
  loginService = new LoginService();

  constructor(props: Props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMessage: '',
      shouldDisplayLoginModal: false,
      userMenuHidden: true,
    }
  }

  toggleMenu = (): void => {
    this.setState({ userMenuHidden: !this.state.userMenuHidden });
  }

  login = () => {
    const email = this.state.email;
    const password = this.state.password;
    if (!email || !password) {
      this.setState({errorMessage: 'Email and password is required'})
    } else {
      const results = this.props.login(this.state.email, this.state.password);
      this.setLoginState(results);
    }
  }

  twitterLogin = () => {
    this.props.twitterLogin();
    this.setLoginState();
  }

  facebookLogin = () => {
    this.props.facebookLogin();
    this.setLoginState();
  }

  setLoginState = (loginResults?: string) => {
    if (loginResults) {
      this.setState({errorMessage: loginResults});
    } else {
      this.setState({
        shouldDisplayLoginModal: false,
      });
      this.setState({errorMessage: ''});
    }
  }

  logout = (): void => {
    this.props.logout();
    this.toggleMenu();
  }

  showLoginModal = () => {
    if (this.props.profile) {
      this.toggleMenu();
    } else {
      this.setState({shouldDisplayLoginModal: true});
    }
  }

  loginModalMarkup = () => {
    return (
      <div className="login-modal">
        <div className="login-title">5 Calls Login</div>
        <div className="login-error-message">
          {this.state.errorMessage}
        </div>
        <form>
          <div className="login-fieldset">
            <label htmlFor="email">Email</label>
            <div className="input-text">
              <input
                type="email"
                className="login-input"
                id="email"
                placeholder="Enter your email"
                value={this.state.email}
                onChange={(event) => this.setState({email: event.target.value})}
                />
            </div>
          </div>
          <div className="login-fieldset">
            <label htmlFor="password">Password</label>
            <div className="input-text">
              <input
                type="password"
                className="login-input"
                id="password"
                placeholder="Enter your password"
                value={this.state.password}
                onChange={(event) => this.setState({password: event.target.value})}
                />
            </div>
          </div>
          <div className="btn-block">
            <button
              type="button"
              id="btn-login"
              className="login-button"
              onClick={this.login}>
                Log In
            </button>
          </div>
          {/* <div className="btn-block">
            <button
              type="button"
              id="btn-signup"
              className="">
                Sign Up
            </button>
          </div> */}
          <div className="btn-block">
            <button
              type="button"
              id="btn-twitter"
              className="login-button"
              onClick={this.twitterLogin}>
                Log In with Twitter
            </button>
          </div>
          <div className="btn-block">
            <button
              type="button"
              id="btn-facebook"
              className="login-button"
              onClick={this.facebookLogin}>
                Log In with Facebook
            </button>
          </div>
        </form>
      </div>
    );
  }

  loginButtonMarkup = () => {
    return (
      <div className="userHeader">
        <a onClick={this.showLoginModal}>
          <img
            className="stars"
            src={this.props.profile ? this.props.profile.picture : '/img/5calls-stars.png'}
            alt="Make your voice heard"
          />
        </a>
        <p><a onClick={this.showLoginModal}>{this.props.profile ? this.props.profile.name : 'Login'}</a></p>
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
  }

  render() {
    if (!this.state.shouldDisplayLoginModal) {
      return this.loginButtonMarkup();
    } else {
      return this.loginModalMarkup();
    }
  }
}