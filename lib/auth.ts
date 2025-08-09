import bcrypt from "bcryptjs";
import Admin from "./models/Admin";
import { dbConnect } from "./db";

export async function authenticate(username: string, password: string) {
  await dbConnect();
  const admin = await Admin.findOne({ username });
  if (!admin) return null;
  const isMatch = await bcrypt.compare(password, admin.password);
  return isMatch ? admin : null;
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}