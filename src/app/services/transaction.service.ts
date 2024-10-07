import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Transaction} from '../models/transaction.model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private apiUrl = environment.baseUrl + '/transactions';

  constructor(private http: HttpClient) {
  }

  getTransactions(params: HttpParams): Observable<{ content: Transaction[], totalElements: number }> {
    return this.http.get<{ content: any[], totalElements: number }>(`${this.apiUrl}`, {params});
  }
  addTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(this.apiUrl, transaction);
  }

  processTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.put<Transaction>(`${this.apiUrl}/${transaction.id}/process`, transaction);
  }

  deleteTransaction(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
