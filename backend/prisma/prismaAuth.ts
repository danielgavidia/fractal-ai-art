import prisma from "./prisma";
import type { User } from "@prisma/client";

// Login
export const getUserLogin = async (firebaseId: string): Promise<User> => {
  const user = await prisma.user.findUnique({
    where: {
      firebaseId: firebaseId,
    },
  });
  if (!user) {
    throw new Error("User does not exist");
  }
  return user;
};

// Signup
export const getUserSignup = async (
  firebaseId: string,
  email: string,
  username: string
): Promise<User> => {
  const userNew = await prisma.user.create({
    data: {
      firebaseId: firebaseId,
      email: email,
      username: username,
    },
  });
  return userNew;
};
