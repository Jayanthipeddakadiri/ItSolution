import { connectDB } from "@/utils/connectDB";
import { NextRequest, NextResponse } from "next/server";
import Admin from "@/models/adminModel";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    console.log("----------------request body-------------------", body);
    const { username, email, password } = body;
    console.log({ username, email, password });

    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "Fill all the fields" },
        { status: 400 }
      );
    }

    // Check if the user already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    console.log("existing admin", existingAdmin);

    // Create a new user
    const newAdmin = new Admin({ username, email, password });
    const savedAdmin = await newAdmin.save();
    console.log("new admin", savedAdmin);

    return NextResponse.json(
      {
        message: "User registered successfully",
        success: true,
        savedUser: savedAdmin,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error while registering the user", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
