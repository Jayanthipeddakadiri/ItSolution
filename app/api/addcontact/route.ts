import { connectDB } from "@/utils/connectDB";
import Contact from "@/models/Contact";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  console.log("<<<<<<<<<<<<<<<Add Contact route is working>>>>>>>>>>>>>");
  connectDB();

  try {
    const { name, email, contactnumber, message } = (await req.json()) as {
      name: string;
      email: string;
      contactnumber: number;
      message: string;
    };

    console.log("name", name);
    console.log("email", email);
    console.log("contactnumber", contactnumber);
    console.log("message", message);

    const newContact = new Contact({ name, email, contactnumber, message });
    const savedContact = await newContact.save();

    console.log("=================Saved Contact=========", savedContact);
    return NextResponse.json(
      {
        message: "Contact saved successfully",
        success: true,
        savedContact,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error saving contact:", err);
    return NextResponse.json(
      {
        message: "Failed to save contact",
        success: false,
        error: err,
      },
      { status: 500 }
    );
  }
}
