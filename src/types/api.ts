export type Currency = 'USD' | 'ARRR';

export interface CurrencyAmountDto {
  amount: number;
  currency: Currency;
}

export interface Point {
  latitude: number;
  longitude: number;
}

export interface LocationDto {
  cityId?: string;
  point?: Point;
}

export interface CityDetailsDto {
  id: string;
  name: string;
  country: string;
}

export interface LocationWithCityDetailsDto {
  city?: CityDetailsDto;
  point?: Point;
}

export interface AdPreviewDto {
  id: string;
  title: string;
  price?: CurrencyAmountDto;
  mainPhotoPath?: string;
  location?: LocationWithCityDetailsDto;
  status?: 'ACTIVE' | 'INACTIVE' | 'SOLD';
}

export interface AdDetailsDto {
  id: string;
  title: string;
  description?: string;
  location?: LocationWithCityDetailsDto;
  price?: CurrencyAmountDto;
  mediaPaths?: string[];
  mainPhotoPath?: string;
  status?: 'ACTIVE' | 'INACTIVE' | 'SOLD';
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateAdRequestDto {
  title: string;
}

export interface UpdateAdRequestDto {
  title?: string;
  description?: string;
  price?: number;
  currency?: Currency;
  location?: LocationDto;
  mediaPaths?: string[];
  mainPhotoPath?: string;
}

export interface RegisterRequestDto {
  username: string;
  password?: string;
  email: string;
}

export interface LoginRequestDto {
  username: string;
  password?: string;
}

export interface VerifyUserRequestDto {
  code: string;
}

export interface AvailabilityStatusResponseDto {
  available: boolean;
}

export interface MediaUploadResponseDto {
  paths: string[];
}

export interface CitySuggestion {
  id: string;
  name: string;
  country: string;
}

export interface PirateChainTransaction {
  txid: string;
  memo?: string;
  amount: number;
  confirmations: number;
  zAddress: string;
}

export interface PageAdPreviewDto {
  content: AdPreviewDto[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

export interface IdentityVerificationResponse {
  success: boolean;
  accessToken?: string;
}

export interface FetchAdsRequestDto {
  t?: string;
  cty?: string;
  minp?: number;
  maxp?: number;
  by?: 'CREATED_DATE' | 'PRICE';
  dir?: 'ASC' | 'DESC';
  p?: number;
}
