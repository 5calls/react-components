export interface UserState {
  idToken?: string;
  profile?: UserProfile;
}

export interface UserProfile {
  name: string;
  sub: string; // sub is the user id, either a unique userid or twitter|<twitterid>, etc
  exp: number;
  picture: string; // a url for the users' photo
}

export interface AuthProvider {
  login: () => void;
  isLoggedIn: () => boolean;
  logout: () => void;
  checkAndRenewSession: (profile?: UserProfile) => void;
}
