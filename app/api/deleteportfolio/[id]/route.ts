import { connectDB } from "@/utils/connectDB";
import Job from "@/models/jobModel";
import { NextRequest, NextResponse } from "next/server";
import PortFolio from "@/models/PortfolioModel";

export async function DELETE(req: NextRequest) {
  console.log("DELETE request received");
  await connectDB();

  // Extracting ID from the URL path
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop();

  if (!id) {
    return NextResponse.json(
      { error: "Pprtfolio ID is missing" },
      { status: 400 }
    );
  }

  try {
    const deletedPortfolio = await PortFolio.findByIdAndDelete(id);
    if (!deletedPortfolio) {
      return NextResponse.json(
        { error: "Portfolio not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Portfolio deleted successfully", success: true },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error deleting Portfolio:", err);
    return NextResponse.json(
      { message: "Error deleting Portfolio", success: false },
      { status: 500 }
    );
  }
}
