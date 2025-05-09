import { NextResponse } from "next/server";
import { headers } from "next/headers";
import bcrypt from "bcrypt";
import db from "@/db/database";

export async function PUT(request) {
  const headersList = headers();
  const user = JSON.parse(headersList.get("user-cookie"));

  const { firstName, lastName, biography, password } = await request.json();

  try {
    let updateFields = {
      firstName: firstName || "",
      lastName: lastName || "",
      biography: biography || "",
    };

    // Only update password if provided
    if (password) {
      updateFields.password = await bcrypt.hash(password, 10);
    }

    const updateProfile = db.prepare(
      `UPDATE Users SET 
        firstName = ?,
        lastName = ?,
        biography = ?,
        ${password ? "password = ?" : ""}
       WHERE uid = ?`
    );

    const params = password
      ? [firstName, lastName, biography, updateFields.password, user.uid]
      : [firstName, lastName, biography, user.uid];

    updateProfile.run(...params);

    return NextResponse.json({
      message: "Profile updated successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Failed to update profile" },
      { status: 500 }
    );
  }
}