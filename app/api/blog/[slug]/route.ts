import { dbConnect } from "@/lib/db";
import Blog from "@/lib/models/Blog";
import { NextResponse } from "next/server";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export async function GET(req: Request, { params }: { params: { slug: string } }) {
  try {
    await dbConnect();
    const post = await Blog.findOne({ slug: params.slug });
    if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(post);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
}