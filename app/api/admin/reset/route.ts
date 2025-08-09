import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import Admin from '@/lib/models/Admin';

export async function DELETE() {
  try {
    await dbConnect();
    
    // Delete all admin users
    await Admin.deleteMany({});
    
    return NextResponse.json({
      message: 'All admin users deleted successfully. You can now create a new admin.'
    });
    
  } catch (error) {
    console.error('Error deleting admin users:', error);
    return NextResponse.json(
      { error: 'Failed to delete admin users' },
      { status: 500 }
    );
  }
}

// GET method ham browser uchun
export async function GET() {
  return DELETE();
}
