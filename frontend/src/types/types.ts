export type Config = {
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
