import { connectDB } from "@/utils/connectDB";
import Job from "@/models/jobModel";
import { NextRequest, NextResponse } from "next/server";
import PortFolio from "@/models/PortfolioModel";
import TeamMember from "@/models/TeamMember";

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
    const deletedTeamMember = await TeamMember.findByIdAndDelete(id);
    if (!deletedTeamMember) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "TeamMember deleted successfully", success: true },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error deleting TeamMember:", err);
    return NextResponse.json(
      { message: "Error deleting TeamMember", success: false },
      { status: 500 }
    );
  }
}
