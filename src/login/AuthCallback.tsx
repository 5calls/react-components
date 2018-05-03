import * as React from 'react';
import { Redirect } from 'react-router';
import { AuthResponse, AuthProvider } from '../shared/model';
import { Auth0LoginService } from '../service/Auth0LoginService';

interface Props {
  handleAuthResponse: (authResponse: Promise<AuthResponse>) => void;
  logout: () => void;
  authProvider?: AuthProvider;
  render?: () => void;
}

interface State {
  doneRedirect: boolean;
}

export class AuthCallback extends React.Component<Props, State> {
  authProvider: AuthProvider = new Auth0LoginService();
  constructor(props: Props) {
    super(props);
    this.state = {doneRedirect: false};
  }

  componentDidMount() {
    this.handleAuthResponseCallback();
    this.setState({ doneRedirect: true });
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    this.handleAuthResponseCallback();
  }

  handleAuthResponseCallback = () => {
    if (this.props.authProvider) {
      this.authProvider = this.props.authProvider;
    }
    const response: Promise<AuthResponse> = this.authProvider.handleAuthentication();
    this.props.handleAuthResponse(response);
  }

  render() {
    if (this.props.render) {
      this.props.render();
    } else {
      if (this.state.doneRedirect) {
        return <Redirect to="/"/>;
      } else {
        return <h1>Logging you in...</h1>;
      }
  }
  }
}