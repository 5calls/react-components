import * as React from 'react';
import { Redirect } from 'react-router';

import { LoginService } from './LoginService';
import { AuthResponse } from '../shared/model';

interface Props {
  readonly handleAuthentication: (authResponse: AuthResponse) => Promise<AuthResponse>;
}

interface State {
  doneRedirect: boolean;
}

export class Auth0Callback extends React.Component<Props, State> {
  loginService = new LoginService();
  constructor(props: Props) {
    super(props);
    this.state = {doneRedirect: false};
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
      return <Redirect to="/"/>;
    } else {
      return <h1>Logging you in...</h1>;
    }
  }
}
