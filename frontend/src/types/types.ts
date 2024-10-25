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
  ballColor: number;
  backgroundColor: number;
  ballCount: number;
  randomnessFactor: number;
  randomColors: boolean;
  borderRadius: number;
  borderWidth: number;
  borderColor: number;
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

export type Control = {
  title: string;
  handler: (value: number) => void;
  min: number;
  max: number;
  defaultValue: number;
  colorEditor?: boolean;
};

export type ControlGroup = {
  id: number;
  title: string;
  controls: Control[];
  isOpen: boolean;
};
