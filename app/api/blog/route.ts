import { dbConnect } from "@/lib/db";
import Blog from "@/lib/models/Blog";
import { NextRequest, NextResponse } from "next/server";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const showAll = searchParams.get('all');
    
    // If 'all' parameter is present, show all posts (for admin)
    const query = showAll ? {} : { published: true };
    
    const posts = await Blog.find(query).sort({ createdAt: -1 });
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}