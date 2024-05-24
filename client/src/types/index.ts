export interface IUser {
  _id: string;
  role: "admin" | "user";
  email: string | undefined;
  password: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
  bio?: string;
  gender?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICategory {
  _id: string;
  name: string;
  description: string;
  icon: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IGig {
  _id?: string;
  title: string;
  description: string;
  deliveryDays: number;
  price: number;
  category: string;
  tags: string[];
  features: string[];
  images: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
  coverUrl: string;
  seller: Partial<IUser>;
  views?: number;
  rating?: number;
  totalReviews?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
