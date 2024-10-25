import axios from "axios";
import { getAuth, onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { Artwork, Like, User } from "../types/types";

// Auth instance
async function getIdToken(): Promise<string> {
  const authInstance = getAuth();
  return new Promise((resolve, reject) => {
    onAuthStateChanged(authInstance, async (user) => {
      if (user) {
        try {
          const idToken = await user.getIdToken();
          resolve(idToken);
        } catch (error) {
          reject(new Error("Unable to retrieve idToken"));
        }
      } else {
        reject(new Error("No user is signed in"));
      }
    });
  });
}

// test this
export async function getCurrentUser(user: FirebaseUser): Promise<User> {
  const idToken = await user.getIdToken();

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

// Get user info
export async function getUser(userId: string): Promise<User> {
  const idToken = await getIdToken();

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

// Get user info (all)
export async function getUsers(): Promise<User[]> {
  const idToken = await getIdToken();

  const res = await axios({
    method: "POST",
    url: `${import.meta.env.VITE_BACKEND_URL}/api/user/info/all`,
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });

  const data: User[] = res.data.data;
  return data;
}

// Get user info (current)
export async function getUserCurrent(): Promise<User> {
  const idToken = await getIdToken();

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
  const idToken = await getIdToken();

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
export async function postArtwork(
  xVelocity: number,
  yVelocity: number,
  ballSize: number,
  ballColor: number,
  backgroundColor: number,
  ballCount: number,
  randomnessFactor: number,
  randomColors: boolean,
  borderRadius: number,
  borderWidth: number,
  borderColor: number
): Promise<Artwork[]> {
  const idToken = await getIdToken();

  const res = await axios({
    method: "POST",
    url: `${import.meta.env.VITE_BACKEND_URL}/api/artwork`,
    data: {
      xVelocity: xVelocity,
      yVelocity: yVelocity,
      ballSize: ballSize,
      ballColor: ballColor,
      backgroundColor: backgroundColor,
      ballCount: ballCount,
      randomnessFactor: randomnessFactor,
      randomColors: randomColors,
      borderRadius: borderRadius,
      borderWidth: borderWidth,
      borderColor: borderColor,
    },
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });

  const data: Artwork[] = res.data.data;
  return data;
}

export async function deleteArtwork(artworkId: string): Promise<Artwork> {
  const idToken = await getIdToken();

  const res = await axios({
    method: "POST",
    url: `${import.meta.env.VITE_BACKEND_URL}/api/artwork/delete`,
    data: {
      artworkId: artworkId,
    },
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });

  const data: Artwork = res.data.data;
  return data;
}

// Post like
export async function postLike(artworkId: string): Promise<Like> {
  const idToken = await getIdToken();

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
