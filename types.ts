export type Category = 'COFFEE' | 'JUICE' | 'DRINKS';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  category: Category;
  tags?: string[];
}

export interface TabProps {
  isActive: boolean;
  onClick: () => void;
  label: string;
  icon: React.ReactNode;
}