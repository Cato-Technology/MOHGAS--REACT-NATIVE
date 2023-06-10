import {
  BranchesResponse,
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
}
