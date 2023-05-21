import bcrypt from "bcrypt";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, password } = body;
    if (!email || !name || !password) {
      return new NextResponse("Missing data", { status: 400 });
    }

    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword: bcrypt.hashSync(password, 12),
      },
    });

    return NextResponse.json(user);
  } catch (error: any) {
    console.log(error, "Registration Error");
    return new NextResponse(error.message, { status: 500 });
  }
}
