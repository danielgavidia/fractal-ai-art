import admin from "firebase-admin";
import type { RequestHandler } from "express";

// const serviceAccount = require("../firebase/credentials.json");
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

const serviceAccount = {
	type: process.env.FIREBASE_TYPE,
	project_id: process.env.FIREBASE_PROJECT_ID,
	private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
	private_key: privateKey,
	client_email: process.env.FIREBASE_CLIENT_EMAIL,
	client_id: process.env.FIREBASE_CLIENT_ID,
	auth_uri: process.env.FIREBASE_AUTH_URI,
	token_uri: process.env.FIREBASE_TOKEN_URI,
	auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT,
	client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
};

if (!admin.apps.length) {
	admin.initializeApp({
		credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
	});
}

export const verifyFirebaseToken: RequestHandler = async (req, res, next) => {
	const idToken = req.headers.authorization?.split("Bearer ")[1];
	if (!idToken) {
		res.status(400).json({ message: "No token provided" });
		return;
	}
	const decodedToken = await admin.auth().verifyIdToken(idToken);
	const firebaseId = decodedToken.uid;
	const email = decodedToken.email;
	req.body = {
		firebaseId: firebaseId,
		email: email,
	};
	next();
};
