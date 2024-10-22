import axios from "axios";
import { Artwork } from "../types/types";

// Get artworks
export async function getArtworks(): Promise<Artwork[]> {
	const res = await axios({
		method: "GET",
		url: `${import.meta.env.VITE_BACKEND_URL}/api/artwork`,
	});
	const data: Artwork[] = res.data.data;
	return data;
}

// Post artwork
export async function postArtwork(xVelocity: number, yVelocity: number): Promise<Artwork[]> {
	const res = await axios({
		method: "POST",
		url: `${import.meta.env.VITE_BACKEND_URL}/api/artwork`,
		data: {
			xVelocity: xVelocity,
			yVelocity: yVelocity,
		},
	});
	const data: Artwork[] = res.data.data;
	return data;
}
