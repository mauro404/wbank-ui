import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentsService } from '../service/components.service';
import { Observable } from 'rxjs';
import { Account } from '../models/account.model';
import { DepositRequest } from '../models/deposit-request.model';
import { TransferRequest } from '../models/transfer-request.model';
import { TransferHistory } from '../models/transfer-history-response.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  url: string | null = null;
  accountDetails$?: Observable<Account>;
  transferHistory$?: Observable<TransferHistory>;
  depositModel: DepositRequest;
  transferModel: TransferRequest;

  constructor(private route: ActivatedRoute,
    private componentsService: ComponentsService,
    private router: Router) {
    this.depositModel = {
      accountId: '',
      amount: 0
    }
    this.transferModel = {
      senderAccountId: '',
      receiverAccountNumber: 0,
      amount: 0
    }
  }

  ngOnInit(): void {
    this.route.paramMap
      .subscribe({
        next: (params) => {
          this.url = params.get('id');
        }
      });

    if (this.url) {
      this.accountDetails$ = this.componentsService.getAccountDetails(this.url);
      this.transferHistory$ = this.componentsService.getTransferHistory(this.url);
    }
  }

  onDepositFormSubmit() {
    if (this.url) {
      this.depositModel.accountId = this.url

      this.componentsService.addFunds(this.depositModel)
        .subscribe({
          next: (response) => {
            this.router.navigateByUrl("/success");
          }
        });
    }
  }

  onTransferFormSubmit() {
    if (this.url) {
      this.transferModel.senderAccountId = this.url

      this.componentsService.transferFunds(this.transferModel)
        .subscribe({
          next: (response) => {
            this.router.navigateByUrl("/success");
          }
        });
    }
  }
}
