import { connectDB } from "@/utils/connectDB";
import Job from "@/models/jobModel";
import getDataFromToken from "@/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import PortFolio from "@/models/PortfolioModel";
import TeamMember from "@/models/TeamMember";
export async function GET(req: NextRequest) {
  await connectDB();

  try {
    const teamMembers = await TeamMember.find();
    console.log("teamMembers is here", teamMembers);
    return NextResponse.json(
      {
        message: "success",
        success: true,
        teamMembers,
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        message: "Error fetching portfolio",
        success: false,
      },
      { status: 500 }
    );
  }
}
