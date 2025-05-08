import { NextResponse } from "next/server";

import db from "@/db/database";
import bcrypt from "bcrypt";

// POST: /api/users/
// Create a new user to the database given a username, uemail and upassword
export async function POST(request) {
	const { username, email, password } = await request.json();

	if (!username || !email || !password) {
		return NextResponse.json(
			{ error: "Missing user creation fields." },
			{ status: 400 }
		);
	}

	const userExists = db
		.prepare("SELECT * FROM Users WHERE username = ? AND uemail = ?")
		.get(username, email);
	if (userExists) {
		return NextResponse.json(
			{ error: "Username or Email already registered." },
			{ status: 400 }
		);
	}

	// hardcoded salt rounds
	const passwordHash = await bcrypt.hash(password, 12);

	const createUser = db.prepare(
		"INSERT INTO Users (username, uemail, upassword) VALUES (?, ?, ?)"
	);
	const result = createUser.run(username, email, passwordHash);

	return NextResponse.json({
		message: "User created successfully.",
		uid: result.lastInsertRowid,
	});
}

export async function PUT(request) {
	// todo: clean this up if its messy
	const { uid, ufirstname, ulastname, ucity, urating } = await request.json();

	if (!uid) {
		return NextResponse.json(
			{ error: "Missing uid field to update a user." },
			{ status: 400 }
		);
	}

	const user = db.prepare("SELECT * FROM Users WHERE uid = ?").get(uid);
	if (!user) {
		return NextResponse.json(
			{ error: "User does not exist." },
			{ status: 404 }
		);
	}

	const updateUser = db.prepare(
		"UPDATE Users SET ufirstname = ?, ulastname = ?, ucity = ?, urating = ? WHERE uid = ?"
	);

	// Will stick to the old value in the database if missing in the request json
	const result = updateUser.run(
		ufirstname != null ? ufirstname : user.ufirstname,
		ulastname != null ? ulastname : user.ulastname,
		ucity != null ? ucity : user.ucity,
		urating != null ? urating : user.urating,
		uid
	);

	return NextResponse.json({
		message: "User has been updated.",
	});
}

export async function DELETE(request) {
	const { uid } = await request.json();

	if (!uid) {
		return NextResponse.json(
			{ error: "Missing uid field to delete a user." },
			{ status: 400 }
		);
	}

	const deleteUser = db.prepare("DELETE FROM Users WHERE uid = ?");
	const result = deleteUser.run(uid);

	return NextResponse.json({
		message: "User has been deleted",
	});
}
