import * as React from 'react';
import { Link } from 'react-router-dom';
import { UserProfile, Auth0Config } from '../shared/model';
import { LoginService } from './LoginService';

interface Props{
  readonly profile?: UserProfile;
  readonly auth0Config: Auth0Config;
  login: (email?: string, password?: string) => Promise<string>;
  twitterLogin: () => void;
  facebookLogin: () => void;
  logout: () => void;
  signup: (email?: string, password?: string) => Promise<string>;
};

interface State{
  email: string;
  password: string;
  errorMessage: string;
  shouldDisplayLoginModal: boolean;
  userMenuHidden: boolean;
  
};

export class CustomLoginUi extends React.Component<Props, State> {

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

  toggleModal = (): void => {
    this.setState({ shouldDisplayLoginModal: !this.state.shouldDisplayLoginModal });
  }

  signup = () => {
    const email = this.state.email;
    const password = this.state.password;
    const invalid = this.validateEmailPassword(email, password);
    if (invalid) {
      this.setState({errorMessage: invalid});
    } else {
      this.props.signup(this.state.email, this.state.password)
        .then(results => this.setLoginState(results))
        .catch(error => this.setLoginState(error));
    }
  }

  login = () => {
    const email = this.state.email;
    const password = this.state.password;
    const invalid = this.validateEmailPassword(email, password);
    if (invalid) {
      this.setState({errorMessage: invalid});
    } else {
      this.props.login(this.state.email, this.state.password)
        .then(results => this.setLoginState(results))
        .catch(error => this.setLoginState(error));
    }
  }

  validateEmailPassword = (email: string, password: string): string => {
    if (!email || !password) {
      return 'Email and password is required';
    }
    // Check email format
    // Email regex taken from OWASP Regex Validation Repository:
    // https://www.owasp.org/index.php/OWASP_Validation_Regex_Repository
    const emailRegex = '^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$';
    if (!email.match(emailRegex)) {
      return 'Email is in the wrong format';
    } else {
      return '';
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

  showCampaignLogo = (): boolean => {
    // if we pass a campaign url, customize the design
    if (this.props.auth0Config.campaignName) {
      return true;
    }

    return false;
  }

  headerPhotoURL = (): string => {
    if (this.props.auth0Config.campaignPhotoURL) {
      return this.props.auth0Config.campaignPhotoURL;
    }

    return '/img/5calls-stars.png';
  }

  loginModalMarkup = () => {
    if (this.state.shouldDisplayLoginModal) {
      return (
        <span>
        <div className="login-modal-mask" onClick={this.toggleModal}>&nbsp;</div>
        <div className="login-modal">
          <div className="login-header">
            <p className="login-header-explainer">
              Track your calls, join call teams and see your impact on issues you care about!
            </p>
            {this.showCampaignLogo()
            ? <div className="login-header-logo">
                <a href={this.props.auth0Config.poweredURL} target="_blank"><img
                  className="stars"
                  src="/img/5calls-stars.png"
                  alt="Powered by 5 Calls"
                /></a>
                <p className="login-header-logo-powered">Powered by <strong>5 Calls</strong></p>
              </div>
            : <span></span>}
          </div>
          <div className="login-choices">
            <div className="login-header-logo">
              <img
                className="stars"
                src={this.headerPhotoURL()}
                alt={this.props.auth0Config.campaignName ? this.props.auth0Config.campaignName : '5 Calls'}
              />
              <p className="login-header-logo-campaign">
                {this.props.auth0Config.campaignName
                ? <span>Log in to call for<br />{this.props.auth0Config.campaignName}</span>
                : <span>Log in to<br />5 Calls</span>
                }
              </p>
            </div>

            <div className="btn-block">
              <button
                type="button"
                id="btn-twitter"
                className="app-login-button btn-twitter"
                onClick={this.twitterLogin}>
                <i className="fab fa-twitter"></i>Log In with Twitter
              </button>
            </div>
            <div className="btn-block">
              <button
                type="button"
                id="btn-facebook"
                className="app-login-button btn-facebook"
                onClick={this.facebookLogin}>
                <i className="fab fa-facebook-square"></i>Log In with Facebook
              </button>
            </div>
            <div className="btn-block">
              <a className="button-cancel" onClick={this.toggleModal}>Cancel</a>
            </div>
          </div>
          {/* </form> */}
        </div>
        </span>
      );
    } else {
      return <span />
    }
  }

  loginButtonMarkup = () => {
    return (
      <span>
        <div className="userHeader">
          <a onClick={this.showLoginModal}>
            <img
              className="stars"
              src={this.props.profile ? this.props.profile.picture : '/img/5calls-stars.png'}
              alt="Make your voice heard"
            />
          </a>
          <p><a onClick={this.showLoginModal}>{this.props.profile ? this.props.profile.name : 'Log in'}</a></p>
          { !this.state.userMenuHidden &&
          <div className="userHeader__menu">
            <ul>
              {this.props.auth0Config.popupAuth
              ? <span></span> /* <li><a href={`${this.props.auth0Config.poweredURL}/impact`} target="_blank">My Impact</a></li> */
              : <li><Link to="/impact">My Impact</Link></li>
              }
              <li className="line"/>
              <li><a href="#" onClick={this.logout}><strong>Log out</strong></a></li>
            </ul>
          </div>
          }
        </div>
        {this.loginModalMarkup()}
      </span>
    );
  }

  render() {
    return (
      this.loginButtonMarkup()
    )
  }
}