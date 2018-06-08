import * as React from 'react';
import { Redirect } from 'react-router';

import { LoginService } from './LoginService';
import { AuthResponse, Auth0Config } from '../shared/model';

export interface Auth0CallbackProps {
  readonly auth0Config: Auth0Config;
  readonly redirectPath?: string;
  handleAuthentication: (authResponse: AuthResponse) => Promise<AuthResponse>;
}

export interface Auth0CallbackState {
  doneRedirect: boolean;
}

export class Auth0Callback extends React.Component<Auth0CallbackProps, Auth0CallbackState> {
  loginService: LoginService;

  constructor(props: Auth0CallbackProps) {
    super(props);
    this.state = {doneRedirect: false};
    this.loginService = new LoginService(this.props.auth0Config);
  }

  componentDidMount() {
    this.loginService.handleAuthentication().then((response) => {
      this.props.handleAuthentication(response).then((response) => {
        this.setState({ doneRedirect: true });
      });
    })
  }

  render() {
    if (this.state.doneRedirect) {
      const redirect = this.props.redirectPath ?
        this.props.redirectPath : '/';

      if (window.opener) {
        window.opener.postMessage('authenticationDone', '*');
      }
      return <Redirect to={redirect}/>;
    } else {
      return <h1>Logging you in...</h1>;
    }
  }
}
