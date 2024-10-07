import {Account} from './account.model';
import {PaymentMethod} from './payment-method.model';

export interface Transaction {
  id: string;
  amount: number;
  currency: string;
  status: string;
  transactionDate: Date;
  description: string;
  account: Account;
  paymentMethod: PaymentMethod;
}
