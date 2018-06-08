declare module '@5calls/react-components/shared/constants' {
	export const APP_NAME = "5 Calls";
	export const APP_URL = "https://5calls.org";
	export const API_URL = "https://api.5calls.org/v1";
	export const ISSUES_API_URL: string;
	export const REPORT_API_URL: string;
	export const COUNTS_API_URL: string;
	export const DONATIONS_API_URL: string;
	export const GROUP_API_URL: string;
	export const CONTACTS_API_URL: string;
	export const IP_INFO_URL = "https://ipinfo.io/json";
	export const DONATE_URL = "https://secure.actblue.com/donate/5calls-donate";
	export const cacheTimeout: {
	    default: number;
	    groups: number;
	};
	export const contact: {
	    email: string;
	    github: string;
	    twitter: string;
	    facebook: string;
	    apps: string;
	};

}
declare module '@5calls/react-components/faq/Faq' {
	/// <reference types="react" />
	import * as React from 'react';
	export interface FaqProps {
	}
	export const Faq: React.StatelessComponent<FaqProps>;

}
declare module '@5calls/react-components/shared/model' {
	export interface UserState {
	    idToken?: string;
	    profile?: UserProfile;
	}
	export interface UserProfile {
	    name: string;
	    sub: string;
	    exp: number;
	    picture: string;
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

}
declare module '@5calls/react-components/login/LoginUi' {
	/// <reference types="react" />
	import * as React from 'react';
	import { UserProfile } from '@5calls/react-components/shared/model';
	export interface LoginUiProps {
	    readonly profile?: UserProfile;
	    readonly login: () => void;
	    readonly logout: () => void;
	}
	export interface LoginUiState {
	    userMenuHidden: boolean;
	}
	export class LoginUi extends React.Component<LoginUiProps, LoginUiState> {
	    constructor(props: LoginUiProps);
	    toggleMenu: () => void;
	    loginClick: () => void;
	    logout: () => void;
	    render(): JSX.Element;
	}

}
declare module '@5calls/react-components/login/LoginService' {
	import * as auth0base from 'auth0-js';
	import { UserState, UserProfile, AuthResponse, Auth0Config } from '@5calls/react-components/shared/model';
	export class LoginService {
	    auth0: auth0base.WebAuth;
	    popup: boolean;
	    constructor(auth0Config: Auth0Config);
	    checkAndRenewSession(profile: UserProfile, authToken: string): Promise<AuthResponse>;
	    isLoggedIn(user?: UserState): boolean;
	    signup: (username?: string, password?: string) => Promise<string>;
	    login(username?: string, password?: string): Promise<string>;
	    twitterLogin: () => void;
	    facebookLogin: () => void;
	    logout(): void;
	    handleAuthentication(): Promise<AuthResponse>;
	    decodeAndSetProfile(auth0Hash: auth0base.Auth0DecodedHash): AuthResponse;
	}

}
declare module '@5calls/react-components/login/Login' {
	/// <reference types="react" />
	import * as React from 'react';
	import { UserProfile, Auth0Config } from '@5calls/react-components/shared/model';
	import { LoginService } from '@5calls/react-components/login/LoginService';
	export interface LoginProps {
	    readonly auth0Config: Auth0Config;
	    readonly userProfile: UserProfile;
	    logoutHandler: () => void;
	}
	export interface LoginState {
	}
	export class Login extends React.Component<LoginProps, LoginState> {
	    loginService: LoginService;
	    constructor(props: LoginProps);
	    login: () => void;
	    logout: () => void;
	    render(): JSX.Element;
	}

}
declare module '@5calls/react-components/login/CustomLoginUi' {
	/// <reference types="react" />
	import * as React from 'react';
	import { UserProfile, Auth0Config } from '@5calls/react-components/shared/model';
	export interface CustomLoginUiProps {
	    readonly profile?: UserProfile;
	    readonly auth0Config: Auth0Config;
	    login: (email?: string, password?: string) => Promise<string>;
	    twitterLogin: () => void;
	    facebookLogin: () => void;
	    logout: () => void;
	    signup: (email?: string, password?: string) => Promise<string>;
	}
	export interface CustomLoginUiState {
	    email: string;
	    password: string;
	    errorMessage: string;
	    shouldDisplayLoginModal: boolean;
	    userMenuHidden: boolean;
	}
	export class CustomLoginUi extends React.Component<CustomLoginUiProps, CustomLoginUiState> {
	    constructor(props: CustomLoginUiProps);
	    toggleMenu: () => void;
	    toggleModal: () => void;
	    signup: () => void;
	    login: () => void;
	    validateEmailPassword: (email: string, password: string) => string;
	    twitterLogin: () => void;
	    facebookLogin: () => void;
	    setLoginState: (loginResults?: string | undefined) => void;
	    logout: () => void;
	    showLoginModal: () => void;
	    showCampaignLogo: () => boolean;
	    headerPhotoURL: () => string;
	    loginModalMarkup: () => JSX.Element;
	    loginButtonMarkup: () => JSX.Element;
	    render(): JSX.Element;
	}

}
declare module '@5calls/react-components/login/CustomLogin' {
	/// <reference types="react" />
	import * as React from 'react';
	import { UserProfile, Auth0Config } from '@5calls/react-components/shared/model';
	import { LoginService } from '@5calls/react-components/login/LoginService';
	export interface CustomLoginProps {
	    readonly auth0Config: Auth0Config;
	    readonly userProfile: UserProfile;
	    logoutHandler: () => void;
	}
	export interface CustomLoginState {
	}
	export class CustomLogin extends React.Component<CustomLoginProps, CustomLoginState> {
	    loginService: LoginService;
	    constructor(props: CustomLoginProps);
	    signup: (email?: string, password?: string) => Promise<string>;
	    login: (email?: string, password?: string) => Promise<string>;
	    twitterLogin: () => void;
	    facebookLogin: () => void;
	    logout: () => void;
	    render(): JSX.Element;
	}

}
declare module '@5calls/react-components/login/Auth0Callback' {
	/// <reference types="react" />
	import * as React from 'react';
	import { LoginService } from '@5calls/react-components/login/LoginService';
	import { AuthResponse, Auth0Config } from '@5calls/react-components/shared/model';
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
	    constructor(props: Auth0CallbackProps);
	    componentDidMount(): void;
	    render(): JSX.Element;
	}

}
declare module '@5calls/react-components/index' {
	import { Faq } from '@5calls/react-components/faq/Faq';
	import { LoginUi } from '@5calls/react-components/login/LoginUi';
	import { Login } from '@5calls/react-components/login/Login';
	import { LoginService } from '@5calls/react-components/login/LoginService';
	import { CustomLoginUi } from '@5calls/react-components/login/CustomLoginUi';
	import { CustomLogin } from '@5calls/react-components/login/CustomLogin';
	import { UserProfile, AuthResponse } from '@5calls/react-components/shared/model';
	import { Auth0Callback } from '@5calls/react-components/login/Auth0Callback';
	export { LoginUi, CustomLoginUi, CustomLogin, Login, LoginService, UserProfile, AuthResponse, Auth0Callback, Faq };

}
