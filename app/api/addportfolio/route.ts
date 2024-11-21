import { connectDB } from "@/utils/connectDB";
import PortFolio from "@/models/PortfolioModel";
import getDataFromToken from "@/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  console.log("<<<<<<<<<<<<<<<route is working>>>>>>>>>>>>>");
  const id = getDataFromToken(req);
  connectDB();
  console.log("================id from token================", id);
  try {
    const { title, description, learnMore } = (await req.json()) as {
      title: string;
      description: string;
      learnMore: number;
    };
    console.log("title", title);
    console.log("description", description);
    console.log("learnMore", learnMore);
    const newPortfolio = new PortFolio({ title, description, learnMore });
    const savedPortfolio = await newPortfolio.save();
    console.log("=================saved job=========", savedPortfolio);
    return NextResponse.json(
      {
        message: "success",
        success: true,
        savedPortfolio,
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
