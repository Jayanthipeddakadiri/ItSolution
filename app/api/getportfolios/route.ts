import { connectDB } from "@/utils/connectDB";
import { NextRequest, NextResponse } from "next/server";
import PortFolio from "@/models/PortfolioModel";
export async function GET(req: NextRequest) {
  await connectDB();

  try {
    const portfolio = await PortFolio.find();
    console.log("portfolio is here", portfolio);
    return NextResponse.json(
      {
        message: "success",
        success: true,
        portfolio,
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
