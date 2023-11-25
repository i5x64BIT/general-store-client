interface IProduct {
  _id?: string;
  name: string;
  enabled: boolean,
  description: string;
  supplier: string;
  tags: string[];
  basePrice: number;
  activeDiscounts?: string[];
}

export type { IProduct };
