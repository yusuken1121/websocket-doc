import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";

import Document from "@/models/Document";
import User from "@/models/User";
import { getServerSession } from "next-auth";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
    }
    const user = await User.findOne({ email: session!.user?.email });
    const documents = await Document.find({
      activeUsers: { $in: [user?._id] },
    });

    return NextResponse.json(documents);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "サーバーエラーが発生しました" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { title, shared } = body;

  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    const user = await User.findOne({ email: session!.user?.email });

    const document = await Document.create({
      title,
      content: "Default Content",
      shared,
      activeUsers: [user?._id],
    });
    return NextResponse.json(document);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "サーバーエラーが発生しました" },
      { status: 500 }
    );
  }
}
