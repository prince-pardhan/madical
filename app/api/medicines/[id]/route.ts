import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/mongodb";
import Medicine from "../../../models/Medicine";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();

  const body = await req.json();

  const updated = await Medicine.findByIdAndUpdate(
    params.id,
    body,
    {
      new: true,
    }
  );

  return NextResponse.json(updated);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();

  await Medicine.findByIdAndDelete(params.id);

  return NextResponse.json({
    message: "Deleted",
  });
}