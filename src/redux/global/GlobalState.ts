import {
  BranchesResponse,
  SupportResponse,
  VendorProductResponse,
} from '../types';

export class GlobalState {
  supportData: SupportResponse[] = [];
  accountRealtedIssues: SupportResponse[] = [];
  branches: BranchesResponse[] = [];
  vendorProducts: VendorProductResponse[] = [];
}
