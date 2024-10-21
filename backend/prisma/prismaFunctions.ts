import prisma from "./prisma";
import type { Config } from "../types/types";

export async function getConfigs(): Promise<Config[]> {
	const res: Config[] = await prisma.config.findMany({});
	return res;
}

export async function postConfig(xVelocity: number, yVelocity: number): Promise<Config> {
	const res: Config = await prisma.config.create({
		data: {
			xVelocity: xVelocity,
			yVelocity: yVelocity,
		},
	});
	return res;
}
