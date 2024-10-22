import prisma from "./prisma";
import type { Artwork } from "../types/types";

export async function getArtworks(): Promise<Artwork[]> {
	const res: Artwork[] = await prisma.config.findMany({});
	return res;
}

export async function postArtwork(xVelocity: number, yVelocity: number): Promise<Artwork> {
	const res: Artwork = await prisma.config.create({
		data: {
			xVelocity: xVelocity,
			yVelocity: yVelocity,
		},
	});
	return res;
}
