import {NextResponse} from "next/server";
import {findUserByEmail} from "@/lib/db";

export async function POST(req: Request) {
  try {
    const {email, password} = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        {error: "Email and password are required"},
        {status: 400}
      );
    }

    const user = findUserByEmail(email);

    if (!user || user.password !== password) {
      return NextResponse.json(
        {error: "Invalid email or password"},
        {status: 401}
      );
    }

    // Return safe user payload (omit password)
    const {password: _, ...safeUser} = user;

    return NextResponse.json({
      success: true,
      user: safeUser,
    });
  } catch (err) {
    return NextResponse.json(
      {error: "Failed to authenticate"},
      {status: 500}
    );
  }
}
