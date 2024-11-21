import { connectDB } from "@/utils/connectDB";
import { NextRequest, NextResponse } from "next/server";
import Admin from "@/models/adminModel";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
export async function POST(req: NextRequest) {
  dotenv.config();
  try {
    await connectDB();
    const body = await req.json();
    console.log("----------------request body-------------------", body);
    const { email, password } = body;
    console.log({ email, password });
    if (!email || !password) {
      NextResponse.json({ error: "fill all the fields" }, { status: 500 });
    }

    // Check if the user already exists
    const existingAdmin = await Admin.findOne({ email });
    if (!existingAdmin) {
      return NextResponse.json({ error: "admin not exist" }, { status: 500 });
    }

    // Check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingAdmin.password
    );
    console.log("=======password check==========", isPasswordCorrect);
    if (!isPasswordCorrect) {
      return NextResponse.json(
        { error: "password is incorrect" },
        { status: 500 }
      );
    }
    //creating authetication token
    const tokenData = {
      id: existingAdmin._id,
      email: existingAdmin.email,
      username: existingAdmin.username,
    };

    const token = await jwt.sign(tokenData, process.env.JWT_SECRET as string, {
      expiresIn: "1d",
    });
    const response = NextResponse.json({
      message: "login successful",
      token: token,
      success: true,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;
  } catch (err: any) {
    console.error("Error while registering the user", err);
  }
}
