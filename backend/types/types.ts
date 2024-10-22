export type Artwork = {
	id?: string;
	createdAt?: Date;
	updatedAt?: Date;
	xVelocity: number;
	yVelocity: number;
};

export type User = {
	id: string;
	createdAt: Date;
	updatedAt: Date;
	firebaseId: string;
	email: string;
};
