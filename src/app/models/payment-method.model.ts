import {Customer} from './customer.model';

export interface PaymentMethod {
  id: string;
  type: string;
  provider: string;
  accountNumber: string;
  expiryDate: Date;
  createdDate: Date;
  status: string;
  customer: Customer;
}
