import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Medicine from '@/models/Medicine';

export async function GET(req: NextRequest) {
  await connectDB();
  const email = req.nextUrl.searchParams.get('email');
  if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 });

  const medicines = await Medicine.find({ clientEmail: email });
  return NextResponse.json(medicines);
}

export async function POST(req: NextRequest) {
  await connectDB();
  const { clientEmail, name, price } = await req.json();
  const medicine = await Medicine.create({ clientEmail, name, price });
  return NextResponse.json(medicine, { status: 201 });
}

export async function PUT(req: NextRequest) {
  await connectDB();
  const { id, name, price } = await req.json();
  const medicine = await Medicine.findByIdAndUpdate(id, { name, price }, { new: true });
  return NextResponse.json(medicine);
}

export async function DELETE(req: NextRequest) {
  await connectDB();
  const { id } = await req.json();
  await Medicine.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}