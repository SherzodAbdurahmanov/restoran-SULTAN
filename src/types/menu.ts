export interface MenuItem {
  name: string;
  description: string;
  price: string;
  image: string;
}

export interface CartItem extends MenuItem {
  id: string;
  quantity: number;
  numericPrice: number;
}

export interface OrderData {
  name: string;
  phone: string;
  address: string;
  comment?: string;
  items: CartItem[];
  total: number;
}
