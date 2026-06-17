export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  rating: number;
  reviews: number;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation and superior sound quality. Perfect for music lovers and professionals.',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBoZWFkcGhvbmVzJTIwcHJvZHVjdHxlbnwxfHx8fDE3ODE1NDI3NDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Audio',
    stock: 45,
    rating: 4.8,
    reviews: 127
  },
  {
    id: '2',
    name: 'Mechanical Wireless Keyboard',
    description: 'Premium mechanical keyboard with RGB backlighting and wireless connectivity. Perfect for gaming and productivity.',
    price: 159.99,
    image: 'https://images.unsplash.com/photo-1574012716378-0ca6f4c18c08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGtleWJvYXJkJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3ODE2MzQ5OTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Accessories',
    stock: 32,
    rating: 4.6,
    reviews: 89
  },
  {
    id: '3',
    name: 'Smart Watch Pro',
    description: 'Advanced smartwatch with fitness tracking, heart rate monitoring, and smartphone notifications. Water-resistant design.',
    price: 399.99,
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMHdhdGNoJTIwZ2FkZ2V0fGVufDF8fHx8MTc4MTYzNDk5N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Wearables',
    stock: 28,
    rating: 4.7,
    reviews: 203
  },
  {
    id: '4',
    name: 'Ultra-Thin Laptop',
    description: 'Powerful and portable laptop with stunning display, long battery life, and lightning-fast performance.',
    price: 1299.99,
    image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBjb21wdXRlciUyMHRlY2h8ZW58MXx8fHwxNzgxNjA1MzQxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Computers',
    stock: 15,
    rating: 4.9,
    reviews: 341
  },
  {
    id: '5',
    name: 'Ergonomic Wireless Mouse',
    description: 'Comfortable wireless mouse with precision tracking and ergonomic design. Perfect for extended use.',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMG1vdXNlJTIwZGV2aWNlfGVufDF8fHx8MTc4MTYzNDk5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Accessories',
    stock: 67,
    rating: 4.5,
    reviews: 156
  },
  {
    id: '6',
    name: 'Flagship Smartphone',
    description: 'Latest smartphone with advanced camera system, powerful processor, and all-day battery life.',
    price: 899.99,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwbW9iaWxlJTIwcGhvbmV8ZW58MXx8fHwxNzgxNTkyNzQ1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Mobile',
    stock: 52,
    rating: 4.8,
    reviews: 412
  }
];
