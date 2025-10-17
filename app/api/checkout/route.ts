import { NextResponse } from "next/server";
export async function POST() { return NextResponse.json({ error: "Demo mode" }, { status: 200 }); }