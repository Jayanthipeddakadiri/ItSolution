import { connectDB } from "@/utils/connectDB";
import Contact from "@/models/Contact";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  console.log("<<<<<<<<<<<<<<<Get All Contacts route is working>>>>>>>>>>>>>");
  connectDB();
  try {
    const contacts = await Contact.find();
    return NextResponse.json(
      {
        message: "Contacts fetched successfully",
        success: true,
        contacts,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error fetching contacts:", err);
    return NextResponse.json(
      {
        message: "Failed to fetch contacts",
        success: false,
        error: err,
      },
      { status: 500 }
    );
  }
}
