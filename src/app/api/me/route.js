import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET;
const secretKey = new TextEncoder().encode(JWT_SECRET);

export async function GET(request) {
	const token = request.cookies.get("token");

	if (!token || !token.value) {
		return NextResponse.redirect(new URL("/login", request.nextUrl));
	}

	try {
		const { payload, protectedHeader } = await jwtVerify(
			token.value,
			secretKey
		);

		console.log(payload);
		return NextResponse.json({
			id: payload.uid,
			username: payload.username,
			email: payload.uemail,
		});
	} catch {
		return NextResponse.json({ error: "Invalid token" }, { status: 401 });
	}
}
