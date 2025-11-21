import { MenuItem } from './types';

export const MENU_ITEMS: MenuItem[] = [
  // Coffees
  {
    id: 'c1',
    name: 'Royal Mocha',
    description: 'Rich chocolate espresso blend with velvety steamed milk and premium cocoa dust.',
    price: 'PKR 1,250',
    category: 'COFFEE',
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=800&auto=format&fit=crop',
    tags: ['Bestseller', 'Hot']
  },
  {
    id: 'c2',
    name: 'Turkish Delight',
    description: 'Traditional strong brew, finely ground and richly aromatic with a hint of cardamom.',
    price: 'PKR 950',
    category: 'COFFEE',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop',
    tags: ['Strong', 'Traditional']
  },
  {
    id: 'c3',
    name: 'Gold Latte',
    description: 'Smooth espresso with silky milk foam, topped with edible gold leaf.',
    price: 'PKR 1,500',
    category: 'COFFEE',
    image: 'https://images.unsplash.com/photo-1534040385115-33dcb3acba5b?q=80&w=800&auto=format&fit=crop',
    tags: ['Premium']
  },
  {
    id: 'c4',
    name: 'Espresso Romano',
    description: 'A shot of bold espresso served with a slice of fresh lemon peel.',
    price: 'PKR 800',
    category: 'COFFEE',
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'c5',
    name: 'Caramel Macchiato',
    description: 'Freshly steamed milk with vanilla-flavored syrup marked with espresso and caramel drizzle.',
    price: 'PKR 1,100',
    category: 'COFFEE',
    image: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?q=80&w=800&auto=format&fit=crop'
  },

  // Juices
  {
    id: 'j1',
    name: 'Golden Mango',
    description: 'Pure, thick mango nectar made from the finest seasonal Chaunsa mangoes.',
    price: 'PKR 850',
    category: 'JUICE',
    image: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?q=80&w=800&auto=format&fit=crop',
    tags: ['Seasonal', 'Fresh']
  },
  {
    id: 'j2',
    name: 'Sunrise Orange',
    description: 'Freshly squeezed oranges, high in Vitamin C, served chilled without added sugar.',
    price: 'PKR 900',
    category: 'JUICE',
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?q=80&w=800&auto=format&fit=crop',
    tags: ['Fresh']
  },
  {
    id: 'j3',
    name: 'Ruby Pomegranate',
    description: 'Antioxidant-rich ruby red elixir, freshly pressed for maximum vitality.',
    price: 'PKR 1,200',
    category: 'JUICE',
    image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?q=80&w=800&auto=format&fit=crop'
  },

  // Cold Drinks
  {
    id: 'd1',
    name: 'Classic Cola',
    description: 'Ice cold Coca-Cola served with a slice of lemon and crystal clear ice.',
    price: 'PKR 350',
    category: 'DRINKS',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'd2',
    name: 'Chilled Pepsi',
    description: 'Refreshing Pepsi served perfectly chilled in a frosted signature glass.',
    price: 'PKR 350',
    category: 'DRINKS',
    image: 'https://images.unsplash.com/photo-1531384370597-8590413be50a?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'd3',
    name: 'Mint Lemonade',
    description: 'House-made sparkling lemon-lime soda blended with fresh mint leaves.',
    price: 'PKR 650',
    category: 'DRINKS',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=800&auto=format&fit=crop',
    tags: ['House Special']
  }
];