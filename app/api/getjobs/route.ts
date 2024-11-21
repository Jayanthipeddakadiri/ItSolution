import { connectDB } from "@/utils/connectDB";
import Job from "@/models/jobModel";
import getDataFromToken from "@/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
  await connectDB();

  try {
    const jobs = await Job.find();
    return NextResponse.json(
      {
        message: "success",
        success: true,
        jobs,
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        message: "Error fetching jobs",
        success: false,
      },
      { status: 500 }
    );
  }
}
