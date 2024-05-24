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

export interface IQueryArgs {
  search?: string;
  page?: number;
  limit?: number;
}
