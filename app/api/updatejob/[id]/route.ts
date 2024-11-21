import { connectDB } from "@/utils/connectDB";
import Job from "@/models/jobModel";
import getDataFromToken from "@/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log("============update working====================");
  await connectDB();

  const getIdFromToken = getDataFromToken(req);

  if (!getIdFromToken) {
    return NextResponse.json(
      {
        message: "Unauthorized",
        success: false,
      },
      { status: 401 }
    );
  }

  const id = params.id;

  try {
    const { title, description, experience } = (await req.json()) as {
      title: string;
      description: string;
      experience: number;
    };

    const updatedJob = await Job.findByIdAndUpdate(
      id,
      { title, description, experience },
      { new: true }
    );

    if (!updatedJob) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        message: "Job updated successfully",
        success: true,
        job: updatedJob,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      {
        message: "Error updating job",
        success: false,
      },
      { status: 500 }
    );
  }
}
