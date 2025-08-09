import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import Admin from '@/lib/models/Admin';
import jwt from 'jsonwebtoken';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const { username, password } = await request.json();
    
    if (!username || !password) {
      return NextResponse.json(
        { error: 'Введите имя пользователя и пароль' },
        { status: 400 }
      );
    }
    
    // Find admin user
    const admin = await Admin.findOne({ username });
    
    if (!admin) {
      return NextResponse.json(
        { error: 'Неверные данные для входа' },
        { status: 401 }
      );
    }
    
    // Check password
    const isValidPassword = await admin.comparePassword(password);
    
    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Неверные данные для входа' },
        { status: 401 }
      );
    }
    
    // Update last login
    admin.lastLogin = new Date();
    await admin.save();
    
    // Generate JWT token
    const token = jwt.sign(
      { 
        adminId: admin._id, 
        username: admin.username,
        role: admin.role 
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );
    
    return NextResponse.json({
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role
      }
    });
    
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Ошибка сервера' },
      { status: 500 }
    );
  }
}
