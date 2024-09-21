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

export type Grocery = {
  title: string;
  category: string
};

export type GroceryCategory = {
  key: string;
  label: string;
};

export type RecipeDB = {
  id: number;
  title: string;
  coverImage: string | null;
  tags: string | null;
  link: string | null;
  images: string | null;
  description: string | null;
  created_at: Date;
};

export type Recipe = {
  id: number;
  title: string;
  coverImage: string;
  tags: string[];
  link: string;
  images: string[];
  description: string;
  created_at: Date;
}

export type Ingredient = {
  id: number;
  title: string;
  category: string;
}
