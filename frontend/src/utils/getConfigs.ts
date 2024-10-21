import axios from "axios";
import { Config } from "../types/types";

export async function getConfigs(): Promise<Config[]> {
	const res = await axios({
		method: "GET",
		url: `${import.meta.env.VITE_BACKEND_URL}/api/config`,
	});
	const data: Config[] = res.data.data;
	return data;
}
