import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { CreateFormModel } from "@/models/formElement";
import connectToDatabase from "@/lib/mongodb";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id || typeof id !== "string") {
    return NextResponse.json(
      { error: "Invalid or missing ID" },
      { status: 400 }
    );
  }

  try {
    await connectToDatabase();
    const form = await CreateFormModel.findById(id);

    if (!form) {
      return NextResponse.json({ error: "Form not found" }, { status: 404 });
    }

    return NextResponse.json(form);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch form" },
      { status: 500 }
    );
  }
}
