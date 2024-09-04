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

export type Bill = {
  id: string;
  user_id: string;
  title: string;
  value: number;
  label: 'food' | 'dinner' | 'misc';
  date: string;
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

export type UserField = {
  id: string;
  name: string;
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
  favorite: boolean;
  created_at: Date;
};

export type GroceryCategory = {
  key: string;
  label: string;
};
