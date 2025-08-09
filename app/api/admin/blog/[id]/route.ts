import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import Blog from '@/lib/models/Blog';
import jwt from 'jsonwebtoken';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

// Middleware to verify admin token
const verifyToken = (request: NextRequest) => {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.substring(7);
  try {
    return jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
  } catch (error) {
    return null;
  }
};

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verify authentication
    const user = verifyToken(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await dbConnect();
    
    const data = await request.json();
    const { title, description, image, published } = data;
    
    if (!title || !description) {
      return NextResponse.json(
        { error: 'Title and description are required' },
        { status: 400 }
      );
    }
    
    // Create simple slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .trim();
    
    const post = await Blog.findByIdAndUpdate(
      params.id,
      {
        title,
        description,
        image,
        slug,
        published: published || false,
        updatedAt: new Date()
      },
      { new: true }
    );
    
    if (!post) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ post });
  } catch (error: any) {
    console.error('Error updating blog post:', error);
    
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'Blog post with this title already exists' },
        { status: 409 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to update blog post' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verify authentication
    const user = verifyToken(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await dbConnect();
    
        const post = await Blog.findByIdAndDelete(params.id);
    
    if (!post) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json(
      { error: 'Failed to delete blog post' },
      { status: 500 }
    );
  }
}
