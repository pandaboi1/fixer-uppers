import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET;
const secretKey = new TextEncoder().encode(JWT_SECRET);

import db from "@/db/database";

export async function POST(request) {
	const { email, password } = await request.json();

	if (!email || !password) {
		return NextResponse.json(
			{ error: "Missing email or password." },
			{ status: 400 }
		);
	}

	const user = db.prepare("SELECT * FROM Users WHERE uemail = ?").get(email);

	if (!user) {
		return NextResponse.json(
			{ error: "Could not find a user with that email." },
			{ status: 401 }
		);
	}

	const passwordHash = await bcrypt.compare(password, user.upassword);

	if (!passwordHash) {
		return NextResponse.json(
			{ error: "The password associated with this user is incorrect." },
			{ status: 401 }
		);
	}

	const token = await new SignJWT({
		uid: user.uid,
		username: user.username,
		uemail: user.uemail,
		ufirstname: user.ufirstname,
	})
		.setProtectedHeader({ alg: "HS256" })
		.setExpirationTime("7 days")
		.sign(secretKey);

		const cookieStore = await cookies(); 
		cookieStore.set("token", token, {
			httpOnly: true,
			maxAge: 60 * 60 * 24 * 7, // 7 days
			path: '/', 
			sameSite: 'lax', 
		});
		

	return NextResponse.json({
		message: "User has been logged in successfully.",
	});
}
