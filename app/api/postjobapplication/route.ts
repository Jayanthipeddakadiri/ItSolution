// pages/api/jobApplications/submitApplication.js
import { connectDB } from "@/utils/connectDB";
import JobApplication from "@/models/JobApplication";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const { firstname, lastname, role, availableDate, experience, place } =
      await req.json();

    const newJobApplication = new JobApplication({
      firstname,
      lastname,
      role,
      availableDate,
      experience,
      place,
    });
    const savedJobApplication = await newJobApplication.save();

    return NextResponse.json(
      {
        message: "Job application submitted successfully",
        success: true,
        savedJobApplication,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error saving job application:", err);
    return NextResponse.json(
      {
        message: "Failed to save job application",
        success: false,
        error: err,
      },
      { status: 500 }
    );
  }
}
