import { Transaction } from "./transaction";

export interface User {
  id?: string,
  clerkUserId: string,
  email: string,
  name: string,
  imageUrl?: string,
  createdAt?: Date,
  updatedAt?: Date,
  transactions?: Transaction[],
}
