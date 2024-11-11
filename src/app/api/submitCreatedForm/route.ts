import connectToDatabase from "@/lib/mongodb";
import { CreateFormModel } from "@/models/formElement";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  console.log({ req });
  const data: any = await req.json();
  console.log({ data });

  if (!data.form) {
    return NextResponse.json(
      { error: "Please send the correct data" },
      { status: 400 }
    );
  }

  try {
    await connectToDatabase();
    const created = await CreateFormModel.create(data);
    return NextResponse.json(
      { data: created, message: "Form created successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to submit form" },
      { status: 500 }
    );
  }
}
