declare module '*.css' {
  const classes: { [key: string]: string };
  export default classes;
}
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
  _formatted?: {
    date?: string;
    currency?: string;
  };
};
