import { connectDB } from "@/utils/connectDB";
import Job from "@/models/jobModel";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  console.log("PUT request received");
  await connectDB();

  // Extracting ID from the URL path
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop();

  if (!id) {
    return NextResponse.json({ error: "Job ID is missing" }, { status: 400 });
  }

  try {
    const { title, description, experience } = await req.json();
    const updatedJob = await Job.findByIdAndUpdate(
      id,
      { title, description, experience },
      { new: true }
    );
    if (!updatedJob) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "Job updated successfully", success: true, job: updatedJob },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error updating job:", err);
    return NextResponse.json(
      { message: "Error updating job", success: false },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  console.log("DELETE request received");
  await connectDB();

  // Extracting ID from the URL path
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop();

  if (!id) {
    return NextResponse.json({ error: "Job ID is missing" }, { status: 400 });
  }

  try {
    const deletedJob = await Job.findByIdAndDelete(id);
    if (!deletedJob) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "Job deleted successfully", success: true },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error deleting job:", err);
    return NextResponse.json(
      { message: "Error deleting job", success: false },
      { status: 500 }
    );
  }
}
