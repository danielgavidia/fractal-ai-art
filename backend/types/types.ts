export type Artwork = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  xVelocity: number;
  yVelocity: number;
  user?: User | null;
  likesCount?: number | null;
};

export type User = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  firebaseId: string;
  email: string;
  likesCount?: number | null;
};

export type Like = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  user?: User;
  artwork?: Artwork;
};
