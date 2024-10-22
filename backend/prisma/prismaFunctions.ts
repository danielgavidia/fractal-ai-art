import prisma from "./prisma";
import type { Artwork, User } from "../types/types";

// Get artworks (all)
export async function getArtworks(): Promise<Artwork[]> {
	const res: Artwork[] = await prisma.artwork.findMany({
		include: { user: true },
	});
	return res;
}

// Get artworks for single user
export async function getArtworksUser(firebaseId: string): Promise<Artwork[]> {
	const user: User | null = await prisma.user.findUnique({
		where: { firebaseId: firebaseId },
	});
	if (!user) {
		throw new Error("User not found");
	}

	const res: Artwork[] = await prisma.artwork.findMany({
		where: { userid: user.id },
	});
	return res;
}

// Post artwork
export async function postArtwork(
	firebaseId: string,
	xVelocity: number,
	yVelocity: number
): Promise<Artwork> {
	const user: User | null = await prisma.user.findUnique({
		where: { firebaseId: firebaseId },
	});

	if (!user) {
		throw new Error("User not found");
	}

	const res: Artwork = await prisma.artwork.create({
		data: {
			user: { connect: { id: user.id } },
			xVelocity: xVelocity,
			yVelocity: yVelocity,
		},
	});
	return res;
}
