import { dbConnect } from "@/lib/db";
import Blog from "@/lib/models/Blog";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { slug: string } }) {
  await dbConnect();
  const post = await Blog.findOne({ slug: params.slug });
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(post);
}