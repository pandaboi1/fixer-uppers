import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET;
const secretKey = new TextEncoder().encode(JWT_SECRET);

const protectedPaths = ["/api/users", "/api/jobs", "/myjobs", "/createjob"];

export async function middleware(request) {
	const pathname = request.nextUrl.pathname;

	const isProtected = protectedPaths.some((path) =>
		pathname.startsWith(path)
	);
	if (!isProtected) return NextResponse.next();

	const token = request.cookies.get("token");

	if (!token || !token.value) {
		return NextResponse.redirect(new URL("/login", request.nextUrl));
	}

	try {
		const { payload, protectedHeader } = await jwtVerify(
			token.value,
			secretKey
		);

		const newHeaders = new Headers(request.headers);
		newHeaders.set("user-cookie", JSON.stringify(payload));
		return NextResponse.next({
			headers: newHeaders,
		});
	} catch (error) {
		console.error("Verification failed: ", error);
		return NextResponse.redirect(new URL("/login", request.nextUrl));
	}
}

export const config = {
	matcher: ["/api/users/:id", "/api/jobs/:id?", "/myjobs", "/createjob"],
};
