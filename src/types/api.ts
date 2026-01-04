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
  status?: 'ACTIVE' | 'INACTIVE' | 'SOLD' | 'DELETED';
  createdAt?: string;
  stock?: number;
  availableStock?: number;
}

export interface AdDetailsDto {
  id: string;
  title: string;
  description?: string;
  location?: LocationWithCityDetailsDto;
  price?: CurrencyAmountDto;
  mediaPaths?: string[];
  mainPhotoPath?: string;
  status?: 'ACTIVE' | 'INACTIVE' | 'SOLD' | 'DELETED';
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
  stock?: number;
  availableStock?: number;
  lockedStock?: number;
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
  stock?: number;
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
  id: string;
  filename: string;
  extension: string;
  dateTime: string;
  path: string;
  xsThumbPath: string;
  smThumbPath: string;
  mdThumbPath: string;
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

export interface UserPreferencesDto {
  language: string;
}

export interface UpdateUserPreferencesRequestDto {
  language: string;
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

export type PurchaseStatus = 'AWAITING_PAYMENT' | 'COMPLETE' | 'FAILED_PAYMENT_TIMEOUT' | 'FAILED_PAYMENT_UNDERPAID' | 'CANCELLED';

export interface PurchaseItemRequestDto {
  adId: string;
  quantity: number;
  unitPrice: number;
}

export interface PurchaseRequestDto {
  items: PurchaseItemRequestDto[];
  currency: Currency;
}

export interface PaymentDetailsDto {
  address: string;
  amount: number;
  paidAmount: number;
  memo: string;
  deadline: string;
  qrCodeUri: string;
}

export interface PurchaseResponseDto {
  purchaseId: string;
  status: PurchaseStatus;
  payment: PaymentDetailsDto;
}

export interface PurchaseStatusResponseDto {
  purchaseId: string;
  status: PurchaseStatus;
  paymentStatus: string;
  paymentDeadline?: string;
  totalAmount?: number;
  paidAmount?: number;
}

export interface SellerInfoDto {
  id: string;
  username: string;
}

export interface SalesOrderItemDto {
  adId: string;
  title: string;
  quantity: number;
  unitPrice: number;
}

export interface BuyerInfoDto {
  id: string;
  username: string;
}

export interface SalesOrderDto {
  id: string;
  status: PurchaseStatus;
  paymentStatus: string;
  createdAt: string;
  totalAmount: number;
  currency: string;
  items: SalesOrderItemDto[];
  buyer: BuyerInfoDto;
}

export interface PageSalesOrderDto {
  content: SalesOrderDto[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

export interface PurchaseHistoryDto {
  id: string;
  status: PurchaseStatus;
  paymentStatus: string;
  createdAt: string;
  totalAmount: number;
  currency: string;
  items: SalesOrderItemDto[];
  seller: SellerInfoDto;
}

export interface PagePurchaseHistoryDto {
  content: PurchaseHistoryDto[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}
