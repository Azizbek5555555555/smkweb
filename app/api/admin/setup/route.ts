import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import Admin from '@/lib/models/Admin';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({});
    
    if (existingAdmin) {
      return NextResponse.json(
        { error: 'Admin user already exists' },
        { status: 409 }
      );
    }
    
    // Create default admin user
    const admin = await Admin.create({
      username: 'admin',
      password: 'admin123',
      email: 'admin@smkweb.com',
      role: 'admin'
    });
    
    return NextResponse.json({
      message: 'Admin user created successfully',
      username: 'admin',
      note: 'Please change the password after first login!'
    });
    
  } catch (error) {
    console.error('Error setting up admin:', error);
    return NextResponse.json(
      { error: 'Failed to create admin user' },
      { status: 500 }
    );
  }
}

// GET method ham qo'shamiz - browser uchun
export async function GET() {
  return POST({} as NextRequest);
}
