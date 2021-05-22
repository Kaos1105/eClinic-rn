export interface FireBaseAuthResponse {
  createdAt?: string;
  lastLoginAt?: string;
  displayName: string;
  email: string;
  phoneNumber: string;
  token: string;
  refreshToken: string;
  expirationTime: string;
  uid: string;
}

export interface AuthData {
  createdAt: string;
  lastLoginAt: string;
  lastRefreshAt: string;
  localId: string;
  phoneNumber: string;
}

export interface RefreshTokenResp {
  expires_in: string;
  refresh_token: string;
  id_token: string;
  user_id: string;
  project_id: string;
}
