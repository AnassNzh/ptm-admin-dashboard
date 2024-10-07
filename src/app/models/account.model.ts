import {Customer} from './customer.model';

export interface Account {
  id: string;
  accountNumber: string;
  balance: number;
  accountType: string;
  currency: string;
  createdDate: Date;
  status: string;
  customer: Customer;
}
