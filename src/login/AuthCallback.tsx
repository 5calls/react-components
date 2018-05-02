import * as React from 'react';
import { Redirect } from 'react-router';
import { AuthResponse, AuthProvider } from '../shared/model';
import { Auth0LoginService } from '../service/Auth0LoginService';

interface Props {
  handleAuthResponse: (authResponse: AuthResponse) => void;
  logout: () => void;
  authProvider?: AuthProvider;
}

interface State {
  doneRedirect: boolean;
}

export class AuthCallback extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {doneRedirect: false};
  }

  componentDidMount() {
    let authProvider: AuthProvider = new Auth0LoginService();
    let response: AuthResponse;
    if (this.props.authProvider) {
      authProvider = this.props.authProvider;
    }
    this.props.handleAuthResponse(authProvider.handleAuthentication());
    this.setState({ doneRedirect: true });
  }

  render() {
    if (this.state.doneRedirect) {
      return <Redirect to="/"/>;
    } else {
      return <h1>Logging you in...</h1>;
    }
  }
}