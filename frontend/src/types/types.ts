export type Artwork = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  user?: User | null;
  likesCount?: number | null;

  // Artwork configuration
  xVelocity: number;
  yVelocity: number;
  ballSize: number;
  ballColor: string;
  backgroundColor: string;
  ballCount: number;
  randomnessFactor: number;
  randomColors: boolean;
  borderRadius: number;
  borderWidth: number;
  borderColor: string;
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

export type Ball = {
  id: number;
  position: { x: number; y: number };
  velocity: { x: number; y: number };
  ballSize: number;
  ballColor: string;
  borderRadius: number;
  borderWidth: number;
  borderColor: string;
};
