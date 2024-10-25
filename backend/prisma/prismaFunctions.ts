import prisma from "./prisma";
import type { Artwork, Like, User } from "../types/types";
import { userInfo } from "os";

// Get user data (single)
interface GetUserProps {
  firebaseId?: string;
  userId?: string;
}
export async function getUser({ firebaseId, userId }: GetUserProps): Promise<User> {
  if (firebaseId) {
    const res: User | null = await prisma.user.findUnique({
      where: { firebaseId: firebaseId },
    });

    if (!res) {
      throw new Error("User not found");
    }

    return res;
  } else {
    const res: User | null = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!res) {
      throw new Error("User not found");
    }

    return res;
  }
}

// Get user data (all users)
export async function getUsers(): Promise<User[]> {
  const res = await prisma.user.findMany({
    include: {
      _count: {
        select: { likes: true },
      },
    },
  });
  const resMapped: User[] = res.map((user) => ({
    ...user,
    likesCount: user._count.likes,
  }));
  return resMapped;
}

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
export async function getArtworksUser(userId: string): Promise<Artwork[]> {
  const user: User | null = await prisma.user.findUnique({
    where: { id: userId },
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

// Get single artwork for a single user
export async function getArtworkUser(artworkId: string): Promise<Artwork> {
  const res: Artwork | null = await prisma.artwork.findUnique({
    where: { id: artworkId },
  });

  if (!res) {
    throw new Error("Artwork id not found");
  }

  return res;
}

// Post artwork
export async function postArtwork(
  firebaseId: string,
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
  borderColor: number,
  artworkId?: string
): Promise<Artwork> {
  const user: User | null = await prisma.user.findUnique({
    where: { firebaseId: firebaseId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const data = {
    user: { connect: { id: user.id } },
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
  };

  let res: Artwork;

  if (artworkId) {
    // Use upsert if artworkId is provided
    res = await prisma.artwork.upsert({
      where: { id: artworkId },
      update: data,
      create: data,
    });
  } else {
    // Create a new artwork if artworkId is not provided
    res = await prisma.artwork.create({
      data,
    });
  }

  return res;
}

// Delete post
export async function deleteArtwork(artworkId: string): Promise<Artwork> {
  const deleteArtwork: Artwork = await prisma.artwork.delete({
    where: {
      id: artworkId,
    },
  });
  return deleteArtwork;
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
    throw new Error("User/artwork not found");
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
