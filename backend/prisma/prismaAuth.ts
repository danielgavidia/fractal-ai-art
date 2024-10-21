import prisma from "./prisma";
import type { User } from "@prisma/client";

// Login
export const getUserLogin = async (firebaseId: string, email: string): Promise<User> => {
	const user = await prisma.user.findUnique({
		where: {
			firebaseId: firebaseId,
		},
	});
	if (!user) {
		const userNew = await prisma.user.create({
			data: {
				firebaseId: firebaseId,
				email: email,
			},
		});
		return userNew;
	}
	return user;
};

// Signup
export const getUserSignup = async (firebaseId: string, email: string): Promise<User> => {
	const userNew = await prisma.user.create({
		data: {
			firebaseId: firebaseId,
			email: email,
		},
	});
	return userNew;
};
