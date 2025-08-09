import { connectDB } from '@/lib/db';
import Admin from '@/lib/models/Admin';

export async function setupAdmin() {
  try {
    await connectDB();
    
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username: 'admin' });
    
    if (existingAdmin) {
      console.log('Admin user already exists');
      return;
    }
    
    // Create default admin user
    const admin = await Admin.create({
      username: 'admin',
      password: 'admin123', // This will be hashed automatically
      email: 'admin@smkweb.com',
      role: 'admin'
    });
    
    console.log('Admin user created successfully:');
    console.log('Username: admin');
    console.log('Password: admin123');
    console.log('Please change the password after first login!');
    
  } catch (error) {
    console.error('Error setting up admin:', error);
  }
}

// Run setup if this file is executed directly
if (require.main === module) {
  setupAdmin();
}
