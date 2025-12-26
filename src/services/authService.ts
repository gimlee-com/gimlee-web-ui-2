import { apiClient } from './apiClient';
import type { 
  LoginRequestDto, 
  RegisterRequestDto, 
  IdentityVerificationResponse, 
  AvailabilityStatusResponseDto, 
  VerifyUserRequestDto 
} from '../types/api';

export const authService = {
  login: (data: LoginRequestDto) => 
    apiClient.post<IdentityVerificationResponse>('/auth/login', data),

  register: (data: RegisterRequestDto) => 
    apiClient.post<void>('/auth/register', data),

  verifyUser: (data: VerifyUserRequestDto) =>
    apiClient.post<void>('/auth/verifyUser', data),

  checkUsername: (username: string) =>
    apiClient.post<AvailabilityStatusResponseDto>('/auth/register/usernameAvailable', { username }),

  checkEmail: (email: string) =>
    apiClient.post<AvailabilityStatusResponseDto>('/auth/register/emailAvailable', { email }),

  logout: () =>
    apiClient.post<void>('/auth/logout'),
};
