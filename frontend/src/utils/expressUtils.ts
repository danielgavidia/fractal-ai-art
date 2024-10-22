import axios from "axios";
import { getAuth } from "firebase/auth";
import { Artwork, Like, User } from "../types/types";

// Aut instance
const authInstance = getAuth();

// Get user info
export async function getUser(userId: string): Promise<User> {
	const idToken = await authInstance.currentUser?.getIdToken();

	const res = await axios({
		method: "POST",
		url: `${import.meta.env.VITE_BACKEND_URL}/api/user/info`,
		data: {
			userId: userId,
		},
		headers: {
			Authorization: `Bearer ${idToken}`,
		},
	});

	const data: User = res.data.data;
	return data;
}

// Get user info (current)
export async function getUserCurrent(): Promise<User> {
	const idToken = await authInstance.currentUser?.getIdToken();

	const res = await axios({
		method: "POST",
		url: `${import.meta.env.VITE_BACKEND_URL}/api/user/info/current`,
		headers: {
			Authorization: `Bearer ${idToken}`,
		},
	});

	const data: User = res.data.data;
	return data;
}

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
export async function getArtworksUser(userId: string): Promise<Artwork[]> {
	const idToken = await authInstance.currentUser?.getIdToken();

	const res = await axios({
		method: "POST",
		url: `${import.meta.env.VITE_BACKEND_URL}/api/artwork/user`,
		data: {
			userId: userId,
		},
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

// Post like
export async function postLike(artworkId: string): Promise<Like> {
	const idToken = await authInstance.currentUser?.getIdToken();

	const res = await axios({
		method: "POST",
		url: `${import.meta.env.VITE_BACKEND_URL}/api/artwork/like/add`,
		data: {
			artworkId: artworkId,
		},
		headers: {
			Authorization: `Bearer ${idToken}`,
		},
	});

	const data: Like = res.data.data;
	return data;
}
