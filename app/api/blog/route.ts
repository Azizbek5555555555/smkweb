import { dbConnect } from "@/lib/db";
import Blog from "@/lib/models/Blog";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  await dbConnect();
  
  const { searchParams } = new URL(request.url);
  const showAll = searchParams.get('all');
  
  // If 'all' parameter is present, show all posts (for admin)
  const query = showAll ? {} : { published: true };
  
  const posts = await Blog.find(query).sort({ createdAt: -1 });
  return NextResponse.json(posts);
}