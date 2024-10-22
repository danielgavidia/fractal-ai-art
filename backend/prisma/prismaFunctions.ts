import prisma from "./prisma";
import type { Artwork, Like, User } from "../types/types";

// Get artworks (all)
export async function getArtworks(): Promise<Artwork[]> {
	const res = await prisma.artwork.findMany({
		include: { user: true, _count: { select: { likes: true } } },
	});
	const resMapped: Artwork[] = res.map((artwork) => ({
		...artwork,
		likesCount: artwork._count.likes,
	}));
	return resMapped;
}

// Get artworks for single user
export async function getArtworksUser(firebaseId: string): Promise<Artwork[]> {
	const user: User | null = await prisma.user.findUnique({
		where: { firebaseId: firebaseId },
	});
	if (!user) {
		throw new Error("User not found");
	}

	const res = await prisma.artwork.findMany({
		where: { userId: user.id },
		include: { _count: { select: { likes: true } } },
	});

	const resMapped: Artwork[] = res.map((artwork) => ({
		...artwork,
		likesCount: artwork._count.likes,
	}));
	return resMapped;
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

// Create like
export async function postLike(firebaseId: string, artworkId: string): Promise<Like> {
	const user: User | null = await prisma.user.findUnique({
		where: { firebaseId: firebaseId },
	});

	const artwork: Artwork | null = await prisma.artwork.findUnique({
		where: { id: artworkId },
	});

	if (!user || !artwork) {
		throw new Error("User not found");
	}

	const res: Like = await prisma.like.upsert({
		where: {
			// Assuming you have a unique constraint on userId and artworkId
			userId_artworkId: {
				userId: user.id,
				artworkId: artwork.id,
			},
		},
		create: {
			user: { connect: { id: user.id } },
			artwork: { connect: { id: artwork.id } },
		},
		update: {}, // No fields to update since we just want to prevent duplicate likes
	});

	return res;
}
