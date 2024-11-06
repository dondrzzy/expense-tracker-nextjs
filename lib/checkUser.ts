import { currentUser } from "@clerk/nextjs/server";
import { Prisma } from "@prisma/client";

import { db } from "@/lib/db";
import { User } from '@/interfaces/user';

export const checkUser = async () => {
  const user = await currentUser();

  // check for currently logged in clerk user
  if (!user) {
    console.log('no clerk user found, rerturning...');
    return null;
  }

  const loggedInUser = await db.user.findUnique({
    where: { clerkUserId: user.id } 
  });

  // return user if in database
  if (loggedInUser) {
    console.log('returning logged in user...');
    return loggedInUser;
  }
  
  // save user to db and return
  const data: Prisma.UserCreateInput = {
    clerkUserId: user.id,
    name: `${user.firstName} ${user.lastName}`,
    imageUrl: user.imageUrl,
    email: user.emailAddresses[0].emailAddress,
  }
  console.log('user created. returning...');
  const newUser = await db.user.create({data})
  return newUser;

}
