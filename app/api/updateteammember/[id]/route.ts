import { connectDB } from "@/utils/connectDB";
import Job from "@/models/jobModel";
import getDataFromToken from "@/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import PortFolio from "@/models/PortfolioModel";
import TeamMember from "@/models/TeamMember";
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
    const { name, position } = (await req.json()) as {
      name: string;
      position: string;
    };

    const updatedTeamMember = await TeamMember.findByIdAndUpdate(
      id,
      { name, position },
      { new: true }
    );

    if (!updatedTeamMember) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        message: "Team member updated successfully",
        success: true,
        portfolio: updatedTeamMember,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      {
        message: "Error updating TeamMember",
        success: false,
      },
      { status: 500 }
    );
  }
}
