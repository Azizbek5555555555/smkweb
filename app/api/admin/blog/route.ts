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

export async function POST(request: NextRequest) {
  try {
    console.log('=== Blog creation started ===');
    
    // Verify authentication
    const user = verifyToken(request);
    if (!user) {
      console.log('Authentication failed');
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    console.log('Authentication passed');

    await dbConnect();
    console.log('Database connected');
    
    const data = await request.json();
    console.log('Request data:', data);
    
    const { title, description, image, published } = data;
    
    if (!title || !description) {
      console.log('Missing required fields:', { title: !!title, description: !!description });
      return NextResponse.json(
        { error: 'Title and description are required' },
        { status: 400 }
      );
    }
    
    console.log('Creating blog post with data:', { title, description, image, published });
    
    // Create simple slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .trim();
    
    console.log('Generated slug:', slug);
    
    const post = await Blog.create({
      title,
      description,
      image,
      slug,
      published: published || false
    });
    
    console.log('Blog post created successfully:', post);
    
    return NextResponse.json({ post }, { status: 201 });
  } catch (error: any) {
    console.error('=== Error creating blog post ===');
    console.error('Error details:', error);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    
    if (error.code === 11000) {
      console.log('Duplicate key error');
      return NextResponse.json(
        { error: 'Blog post with this title already exists' },
        { status: 409 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create blog post', details: error.message },
      { status: 500 }
    );
  }
}
