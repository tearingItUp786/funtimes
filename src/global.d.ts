type ApiPayload = {
  totalCount: number;
  page: number;
  transactions: Transaction[];
};

type Transaction = {
  Date: string;
  Ledger: string;
  Amount: string;
  Company: string;
};
