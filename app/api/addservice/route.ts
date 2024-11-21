import { connectDB } from "@/utils/connectDB";
import Job from "@/models/jobModel";
import getDataFromToken from "@/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import PortFolio from "@/models/PortfolioModel";
import Service from "@/models/ServicesModel";
export async function POST(req: NextRequest) {
  console.log("<<<<<<<<<<<<<<<route is working>>>>>>>>>>>>>");
  const id = getDataFromToken(req);
  connectDB();
  console.log("================id from token================", id);
  try {
    const { title, description, learnMore } = (await req.json()) as {
      title: string;
      description: string;
      learnMore: string;
    };
    console.log("title", title);
    console.log("description", description);
    console.log("experience", learnMore);
    const newService = new Service({ title, description, learnMore });
    const savedService = await newService.save();
    console.log("=================saved job=========", savedService);
    return NextResponse.json(
      {
        message: "success",
        success: true,
        savedService,
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
