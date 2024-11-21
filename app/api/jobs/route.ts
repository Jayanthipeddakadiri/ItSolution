import { connectDB } from "@/utils/connectDB";
import Job from "@/models/jobModel";
import getDataFromToken from "@/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  console.log("2222222222222222222222api hitting22222222222222222222222222");
  await connectDB();

  const getIdFromToken = getDataFromToken(req);
  if (getIdFromToken) {
    try {
      const jobs = await Job.find();

      return NextResponse.json(
        {
          message: "success",
          success: true,
          savedUser: jobs,
        },
        { status: 200 }
      );
    } catch (err) {
      return NextResponse.json(
        {
          message: "something went wrong",
          success: false,
        },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json(
      {
        message: "Unauthorized",
        success: false,
      },
      { status: 401 }
    );
  }
}

export async function POST(req: NextRequest) {
  await connectDB();

  const getIdFromToken = getDataFromToken(req);
  if (getIdFromToken) {
    try {
      const { title, description, experience } = (await req.json()) as {
        title: string;
        description: string;
        experience: number;
      };
      const newJob = new Job({ title, description, experience });
      const savedJob = await newJob.save();

      return NextResponse.json(
        {
          message: "success",
          success: true,
          savedUser: savedJob,
        },
        { status: 201 }
      );
    } catch (err) {
      return NextResponse.json(
        {
          message: "something went wrong",
          success: false,
        },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json(
      {
        message: "Unauthorized",
        success: false,
      },
      { status: 401 }
    );
  }
}
