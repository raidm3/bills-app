// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: 'pending' | 'paid';
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type Bill = {
  id: string;
  user_id: string;
  title: string;
  value: number;
  label: 'food' | 'dinner' | 'misc';
  date: string;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type BillsTable = {
  id: string;
  user_id: string;
  user_name: string;
  title: string;
  value: number;
  label: string;
  date: string;
};

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type UserField = {
  id: string;
  name: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type BillForm = {
  id: string;
  user_id: string,
  title: string;
  value: number;
  label: 'food' | 'dinner' | 'misc';
};

export type MonthlyBills = {
  month: string;
  dinner?: number;
  food?: number;
  misc?: number;
};

export type BillPerMonthAndLabel = {
  month: string;
  year: number;
  label: 'food' | 'dinner' | 'misc';
  total_value: number;
};

export type MonthlyBillsPerUser = {
  month: string,
  year: number;
  user_id: string;
  total_value: number;
};

export type BillPerUserAndMonth = {
  month: string;
  user_id: string;
  total_value: number;
};

export type GroceryItem = {
  id: number;
  title: string;
  category: string | null;
  done: boolean;
  created_at: Date;
};

export type GroceryCategory = {
  key: string;
  label: string;
};
