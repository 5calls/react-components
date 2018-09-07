export interface UserState {
  idToken?: string;
  profile?: UserProfile;
}

export interface UserProfile {
  name: string;
  sub: string; // sub is the user id, either a unique userid or twitter|<twitterid>, etc
  exp: number;
  picture: string; // a url for the users' photo
  'https://5calls.org/email'?: string;
  'https://5calls.org/phone'?: string;
}

export interface AuthProvider {
  login: () => void;
  isLoggedIn: () => boolean;
  logout: () => void;
  handleAuthentication: () => AuthResponse | Promise<AuthResponse>;
  checkAndRenewSession: (profile?: UserProfile) => void;
}

export interface AuthResponse {
  authToken: string;
  userProfile: UserProfile | undefined;
}

export interface Auth0Config {
  readonly poweredURL: string;
  readonly domain: string;
  readonly clientId: string;
  readonly callbackUri: string;
  readonly audience: string;
  readonly popupAuth: boolean;
  readonly campaignPhotoURL?: string;
  readonly campaignName?: string;
}
