import { connectDB } from "@/utils/connectDB";
import Job from "@/models/jobModel";
import getDataFromToken from "@/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  console.log("<<<<<<<<<<<<<<<route is working>>>>>>>>>>>>>");
  const id = getDataFromToken(req);
  connectDB();
  console.log("================id from token================", id);
  try {
    const { title, description, experience } = (await req.json()) as {
      title: string;
      description: string;
      experience: number;
    };
    console.log("title", title);
    console.log("description", description);
    console.log("experience", experience);
    const newJob = new Job({ title, description, experience });
    const savedJob = await newJob.save();
    console.log("=================saved job=========", savedJob);
    return NextResponse.json(
      {
        message: "success",
        success: true,
        savedJob,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error saving job:", err);
    return NextResponse.json(
      {
        message: "Failed to save job",
        success: false,
        error: err,
      },
      { status: 500 }
    );
  }
}
