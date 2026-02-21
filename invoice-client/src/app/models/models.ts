export interface LoginRequest {
  userName: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  userName: string;
  userId: number;
}

export interface InvoiceLine {
  invoiceLineId: number;
  invoiceId: number;
  itemName: string;
  quantity: number;
  price: number;
}

export interface Invoice {
  invoiceId: number;
  customerId: number;
  customerTitle?: string;
  invoiceNumber: string;
  invoiceDate: string;
  totalAmount: number;
  invoiceLines: InvoiceLine[];
}

export interface Customer {
  customerId: number;
  taxNumber: string;
  title: string;
  address: string;
  eMail: string;
}
