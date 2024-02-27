/** @format */

export interface Params {
  offset?: number;
  limit?: number;
  ids?: string[];
  product?: string;
  price?: number;
  brand?: string;
}

export interface RequestProps {
  action: string;
  params: Params;
  retry: boolean;
}

export interface FilterProps {
  page: number;
  price: number;
  name: string;
  brand: string;
  product: string;
}

export interface Product {
  brand: string | null;
  id: string;
  price: number;
  product: string;
}

export interface FormProps {
  price: number;
  product: string;
  brand: string;
}
