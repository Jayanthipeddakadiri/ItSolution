import { connectDB } from "@/utils/connectDB";
import Job from "@/models/jobModel";
import getDataFromToken from "@/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
export async function GET() {
  try {
    const response = NextResponse.json({
      message: "Logout successfull",
      suceess: true,
    });
    response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });
    return response;
  } catch (err) {
    console.error("Error while registering the user", err);
  }
}
