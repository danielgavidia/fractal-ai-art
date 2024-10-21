import axios from "axios";
import { Config } from "../types/types";

export async function postConfig(xVelocity: number, yVelocity: number): Promise<Config[]> {
	const res = await axios({
		method: "POST",
		url: `${import.meta.env.VITE_BACKEND_URL}/api/config`,
		data: {
			xVelocity: xVelocity,
			yVelocity: yVelocity,
		},
	});
	const data: Config[] = res.data.data;
	return data;
}
