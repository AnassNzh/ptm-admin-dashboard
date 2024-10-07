import {Component, OnInit} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {NzTableQueryParams} from 'ng-zorro-antd/table';
import {Transaction} from '../../models/transaction.model';
import {TransactionService} from '../../services/transaction.service';
import {NzNotificationService} from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-transaction-table',
  templateUrl: './transaction-table.component.html',
  styleUrl: './transaction-table.component.css'
})
export class TransactionTableComponent implements OnInit {
  transactions: Transaction[] = [];
  total = 1;
  loading = true;
  pageSize = 10;
  pageIndex = 1;
  sortField = 'id';
  sortOrder = 'ascend';

  transactionId: string = '';
  status: string = '';

  selectedTransaction?: Transaction;
  selectedTransactionForDelete?: Transaction;
  deleteModalVisible = false;
  addModalVisible = false;

  constructor(private transactionService: TransactionService,
              private notification: NzNotificationService) {
  }

  ngOnInit(): void {
    this.loadDataFromServer();
  }

  loadDataFromServer(): void {
    this.loading = true;

    const params = new HttpParams()
      .set('page', `${this.pageIndex - 1}`)
      .set('size', `${this.pageSize}`)
      .set('sort', this.sortField)
      .set('direction', this.sortOrder === 'ascend' ? 'asc' : 'desc')
      .set('transactionId', this.transactionId) // Add search parameter
      .set('status', this.status); // Add search parameter

    this.transactionService.getTransactions(params).subscribe(
      (data) => {
        this.transactions = data.content;
        this.total = data.totalElements;
        this.loading = false;
      },
      (error) => {
        this.notification.error('Error', 'Failed to fetch transactions');
      }
    );
  }

  searchTransactions(): void {
    this.pageIndex = 1; // Reset to first page when searching
    this.loadDataFromServer();
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    console.log(params)
    const {pageIndex, pageSize, sort} = params;

    this.pageIndex = pageIndex;
    this.pageSize = pageSize;

    console.log('called');
    const currentSort = sort.find(item => item.value !== null);
    console.log('called2:', currentSort)
    this.sortField = currentSort?.key || 'transactionDate';
    this.sortOrder = currentSort?.value || 'descend';


    this.loadDataFromServer();
  }

  onDelete(transactionId: string): void {
    this.selectedTransactionForDelete = this.transactions.find(t => t.id === transactionId);
    console.log('delete transaction :', transactionId, this.selectedTransactionForDelete)
    this.showDeleteConfirm();
  }

  showDeleteConfirm(): void {
    this.deleteModalVisible = true;
  }

  confirmDelete(): void {
    if (this.selectedTransactionForDelete) {
      this.transactionService.deleteTransaction(this.selectedTransactionForDelete.id).subscribe(
        () => {
          this.notification.success('Success', 'Transaction deleted');
          this.loadDataFromServer();
          this.deleteModalVisible = false;
        },
        (error) => {
          this.notification.error('Error', error.error);
          this.deleteModalVisible = false;

        }
      );
    }
  }

  cancelDelete(): void {
    this.deleteModalVisible = false;
  }

  openAddModal(): void {
    this.selectedTransaction = undefined;
    this.addModalVisible = true
  }

  openProcessModal(transaction: any): void {
    this.selectedTransaction = JSON.parse(JSON.stringify(transaction));
    this.addModalVisible = true
  }

  handleSubmit(formData: any): void {
    console.log('Form submitted:', formData);
    formData.account = {id: formData.account};
    formData.paymentMethod = {id: formData.paymentMethod};

    if (this.selectedTransaction) {
      const processTransaction = {...this.selectedTransaction, ...formData,};

      this.transactionService.processTransaction(processTransaction).subscribe(
        () => {
          this.notification.success('Success', 'Transaction processed');
          this.loadDataFromServer();
          this.selectedTransaction = undefined;
        },
        (error) => {
          this.notification.error('Error', error.error);
        }
      );
    } else {
      this.transactionService.addTransaction(formData).subscribe(
        () => {
          this.notification.success('Success', 'Transaction added');
          this.loadDataFromServer();
        },
        (error) => {
          this.notification.error('Error', error.error);
        }
      );
    }
    this.onCancel()
  }

  onCancel(): void {
    this.selectedTransaction = undefined;
    this.addModalVisible = false
  }

}
