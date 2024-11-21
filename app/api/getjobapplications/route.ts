// pages/api/jobApplications/getAllApplications.js
import { connectDB } from "@/utils/connectDB";
import JobApplication from "@/models/JobApplication";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await connectDB();

  try {
    const jobApplications = await JobApplication.find({});

    return NextResponse.json(
      {
        message: "Job applications retrieved successfully",
        success: true,
        jobApplications,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error retrieving job applications:", err);
    return NextResponse.json(
      {
        message: "Failed to retrieve job applications",
        success: false,
        error: err,
      },
      { status: 500 }
    );
  }
}
