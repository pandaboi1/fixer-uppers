import { NextResponse } from "next/server";
import { headers } from "next/headers";

import db from "@/db/database";

// POST: /api/jobs/
// Create a new job
export async function POST(request) {
	const { jobTitle, jobDescription, location, offeredPrice, jobType } =
		await request.json();

	if (!jobTitle || !offeredPrice || !location) {
		return NextResponse.json(
			{
				error: "Fields jobTitle, location, and offeredPrice is required.",
			},
			{ status: 400 }
		);
	}

	const headersList = await headers();
	const user = JSON.parse(headersList.get("user-cookie"));

	const createJobRequest = db.prepare(
		"INSERT INTO JobRequests (uid, jobTitle, jobDescription, location, jobType, offeredPrice) VALUES (?, ?, ?, ?, ?, ?)"
	);
	const jobRequestResult = createJobRequest.run(
		user.uid,
		jobTitle,
		jobDescription,
		location,
		jobType,
		offeredPrice
	);

	const jobRequestId = jobRequestResult.lastInsertRowid;

	return Response.json({
		message: "Job Request created successfully.",
		jid: jobRequestId,
	});
}

// GET /api/jobs/
export async function GET(request) {
	const jobRequests = db
		.prepare(
			"SELECT JobRequests.*, Users.username FROM JobRequests JOIN Users ON JobRequests.uid = Users.uid"
		)
		.all();
	if (!jobRequests.length) {
		return NextResponse.json(
			{ error: "User does not exist." },
			{ status: 404 }
		);
	}

	// important to not send the password hash
	return NextResponse.json({
		message: "JobRequests retrieved successfully.",
		jobRequests,
	});
}
