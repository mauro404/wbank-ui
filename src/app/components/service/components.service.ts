import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RegisterRequest } from '../models/register-request.model';
import { environment } from 'src/environments/environment';
import { Account } from '../models/account.model';
import { User } from '../models/user.model';
import { DepositRequest } from '../models/deposit-request.model';
import { TransferRequest } from '../models/transfer-request.model';
import { TransferHistory } from '../models/transfer-history-response.model';

@Injectable({
  providedIn: 'root'
})
export class ComponentsService {
  $user = new BehaviorSubject<User | undefined>(undefined);

  constructor(private http: HttpClient) { }

  login(model: LoginRequest): Observable<User> {
    return this.http.post<User>(`${environment.apiBaseUrl}/api/bank/login`, model);
  }

  register(model: RegisterRequest): Observable<User> {
    return this.http.post<User>(`${environment.apiBaseUrl}/api/bank/register`, model);
  }

  getAccountDetails(id: string): Observable<Account> {
    return this.http.get<Account>(`${environment.apiBaseUrl}/api/bank/user/${id}`);
  }

  setUser(user: User): void {
    this.$user.next(user);
    localStorage.setItem('user', user.id);
  }

  user(): Observable<User | undefined> {
    return this.$user.asObservable();
  }

  getUser(): User | undefined {
    const userId = localStorage.getItem('user');

    if (userId) {
      const user: User = {
        id: userId,
      };
      return user;
    }
    return undefined;
  }

  logout(): void {
    localStorage.clear();
    this.$user.next(undefined);
  }

  addFunds(model: DepositRequest): Observable<void> {
    return this.http.post<void>(`${environment.apiBaseUrl}/api/bank/deposit`, model);
  }

  transferFunds(model: TransferRequest): Observable<void> {
    return this.http.post<void>(`${environment.apiBaseUrl}/api/bank/transfer`, model);
  }

  getTransferHistory(id: string): Observable<TransferHistory> {
    return this.http.get<TransferHistory>(`${environment.apiBaseUrl}/api/bank/transfers/${id}`);
  }
}
