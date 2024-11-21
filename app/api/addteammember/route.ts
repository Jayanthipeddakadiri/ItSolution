import { connectDB } from "@/utils/connectDB";
import PortFolio from "@/models/PortfolioModel";
import getDataFromToken from "@/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import TeamMember from "@/models/TeamMember";
export async function POST(req: NextRequest) {
  console.log("<<<<<<<<<<<<<<<route is working>>>>>>>>>>>>>");
  const id = getDataFromToken(req);
  connectDB();
  console.log("================id from token================", id);
  try {
    const { name, position } = (await req.json()) as {
      name: string;
      position: string;
    };
    console.log("name", name);
    console.log("position", position);
    console.log("");
    const newTeamMember = new TeamMember({ name, position });
    const savedTeamMember = await newTeamMember.save();
    console.log("=================saved job=========", savedTeamMember);
    return NextResponse.json(
      {
        message: "success",
        success: true,
        savedTeamMember,
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
