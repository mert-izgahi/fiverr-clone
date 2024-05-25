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
  notifications?: INotification[];
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
  category: {
    _id: string;
    name: string;
    description: string;
    icon: string;
  };
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

export interface IOrder {
  _id: string;
  gig: IGig;
  gigTitle: string;
  gigCoverUrl: string;
  price: number;
  buyer: IUser;
  seller: IUser;
  paymentStatus:string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface INotification {
  _id?: string;
  userId: string;
  message: string;
  isRead: boolean;
  payload: any;
  type: "NEW_ORDER" | "NEW_REVIEW" | "NEW_MESSAGE";
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IReview {
  _id: string;
  gig: IGig;
  author: IUser;
  content: string;
  rating: number;
  createdAt?: Date;
  updatedAt?: Date;
}