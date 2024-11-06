// import { User } from "./user";

export interface Transaction {
  id?: string,
  text: string,
  amount: number,
  userId: string,
  // user?: User,
  createdAt?: Date,
}
