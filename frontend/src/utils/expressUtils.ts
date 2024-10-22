import axios from "axios";
import { getAuth } from "firebase/auth";
import { Artwork } from "../types/types";

// Aut instance
const authInstance = getAuth();

// Get artworks (all)
export async function getArtworks(): Promise<Artwork[]> {
	const res = await axios({
		method: "GET",
		url: `${import.meta.env.VITE_BACKEND_URL}/api/artwork/all`,
	});

	const data: Artwork[] = res.data.data;
	return data;
}

// Get artworks for a single user
export async function getArtworksUser(): Promise<Artwork[]> {
	const idToken = await authInstance.currentUser?.getIdToken();

	const res = await axios({
		method: "GET",
		url: `${import.meta.env.VITE_BACKEND_URL}/api/artwork/user`,
		headers: {
			Authorization: `Bearer ${idToken}`,
		},
	});

	const data: Artwork[] = res.data.data;
	return data;
}

// Post artwork
export async function postArtwork(xVelocity: number, yVelocity: number): Promise<Artwork[]> {
	const idToken = await authInstance.currentUser?.getIdToken();

	const res = await axios({
		method: "POST",
		url: `${import.meta.env.VITE_BACKEND_URL}/api/artwork`,
		data: {
			xVelocity: xVelocity,
			yVelocity: yVelocity,
		},
		headers: {
			Authorization: `Bearer ${idToken}`,
		},
	});

	const data: Artwork[] = res.data.data;
	return data;
}
