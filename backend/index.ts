import type { Config } from "./types/types";
import express from "express";
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");

app.use(
	cors({
		origin: process.env.FRONTEND_URL,
		methods: ["GET", "POST"],
	})
);
app.use(express.json());

app.get("/", (req, res) => {
	res.send("Hello World!");
});
app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});

// Routes

// Data (config array)
let data: Config[] = [];

// Post to config array
app.post("/api/config", (req, res) => {
	// Consoles
	console.log("POST: api/config");
	console.log(req.body);

	// Logic
	const { xVelocity, yVelocity } = req.body;
	const newConfig: Config = {
		xVelocity: Number(xVelocity),
		yVelocity: Number(yVelocity),
	};
	data.push(newConfig);
	res.status(200).json({ data: data });
});

// Get config array
app.get("/api/config", (req, res) => {
	// Consoles
	console.log("GET: api/config");
	console.log(data);

	// Logic
	res.status(200).json({ data: data });
});
