export interface IProduct {
  id: string;
  product: string;
  price: number;
  brand: string;
}

export type RequestData = {
  action: string;
  params: Record<string, any>;
};
