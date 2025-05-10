import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET;
const secretKey = new TextEncoder().encode(JWT_SECRET);

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    return NextResponse.json(
      { message: 'No token found', user: null },
      { status: 401 }
    );
  }

  try {
    const { payload } = await jwtVerify(token, secretKey);



    return NextResponse.json({ user: payload }, { status: 200 });
  } catch (err) {
    console.error('JWT verification error:', err);
    return NextResponse.json(
      { message: 'Invalid token', user: null },
      { status: 401 }
    );
  }
}
