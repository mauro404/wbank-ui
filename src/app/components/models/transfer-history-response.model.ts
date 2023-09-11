export interface TransferHistory {
  id: string;
  transferRecords: [
    {
      id: string;
      amount: number;
      receiverAccountNumber: number;
      transactionTime: Date;
    }
  ]
}