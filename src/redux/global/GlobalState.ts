import {
  BranchesResponse,
  NotificationRes,
  OrderSummaryRes,
  SupportResponse,
  VendorAccountDetialsResponse,
  VendorBusinessProfileResponse,
  VendorOrderHistoryResponse,
  VendorProductResponse,
} from '../types';

export class GlobalState {
  supportData: SupportResponse[] = [];
  accountRealtedIssues: SupportResponse[] = [];
  branches: BranchesResponse[] = [];
  vendorProducts: VendorProductResponse[] = [];
  businessProfileData: VendorBusinessProfileResponse[] = [];
  vendorBankDetalis: VendorAccountDetialsResponse[] = [];
  vendorOrderHistory: VendorOrderHistoryResponse[] = [];
  orderSummary: OrderSummaryRes[] = [];
  notificationData: NotificationRes[] = [];
  locationData: [] = [];
}
