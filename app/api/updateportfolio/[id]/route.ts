import { connectDB } from "@/utils/connectDB";
import Job from "@/models/jobModel";
import getDataFromToken from "@/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import PortFolio from "@/models/PortfolioModel";
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
    const { title, description, learnMore } = (await req.json()) as {
      title: string;
      description: string;
      learnMore: number;
    };

    const updatedPorfolio = await PortFolio.findByIdAndUpdate(
      id,
      { title, description, learnMore },
      { new: true }
    );

    if (!updatedPorfolio) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        message: "Portfolio updated successfully",
        success: true,
        portfolio: updatedPorfolio,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      {
        message: "Error updating portfolio",
        success: false,
      },
      { status: 500 }
    );
  }
}
