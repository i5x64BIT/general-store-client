interface IPayload {
  _id: string;
  role: string;
}
interface IProduct {
  _id?: string;
  images?: File[] | string[];
  name: string;
  isEnabled: boolean;
  description: string;
  supplier: ISupplier | null;
  tags: string[];
  basePrice: number;
  activeDiscounts?: IDiscount[];
}
interface ISupplier {
  _id?: string;
  contact: number;
  companyName: string;
  description?: string;
  contractStart?: number;
  contractEnd?: number;
}
interface IUser {
  _id: string;
  role: string;
}
interface IDiscount {
  _id?: string;
  name: string;
  description?: string;
  products: IProduct[];
  createdAt: number;
  updatedAt: number;
  disocuntType: "percentege" | "fixed_price";
  discountValue: number;
}

export type { IProduct, ISupplier, IUser, IDiscount, IPayload };
