export interface Program {
  id: number;
  title: string;
  description: string;
  price: number;
  formatted_price: string;
  duration: string;
  category: string;
  image: string;
  features: string[];
  available_tickets?: number;
  sold_tickets?: number;
  remaining_tickets?: number;
  has_available_tickets?: boolean;
  is_sold_out?: boolean;
}