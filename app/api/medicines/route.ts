import { NextResponse } from "next/server";
import { connectDB } from "../../lib/mongodb";
import Medicine from "../../models/Medicine";

export async function POST(req: Request) {
  await connectDB();

  const body = await req.json();

  const medicine = await Medicine.create(body);

  return NextResponse.json(medicine);
}

export async function GET() {
  await connectDB();

  const data = await Medicine.find();

  return NextResponse.json(data);
}