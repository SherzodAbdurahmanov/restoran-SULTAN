export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
}

export interface CartItem extends MenuItem {
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
