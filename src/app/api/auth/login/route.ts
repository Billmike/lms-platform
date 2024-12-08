import { jwt } from "@/lib/auth";
import { User } from "@/types/auth";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// Mock user database
const users: User[] = [
  {
    id: '1',
    email: 'admin@example.com',
    password: 'admin123', // In a real app, this would be hashed
    name: 'Admin User',
    role: 'admin',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    email: 'instructor@example.com',
    password: 'instructor123',
    name: 'Instructor User',
    role: 'instructor',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    email: 'student@example.com',
    password: 'student123',
    name: 'Student User',
    role: 'student',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export function findUserByCredentials(email: string, password: string) {
  return users.find(u => u.email === email && u.password === password);
}

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();

    const { email, password } = requestBody;

    const user = findUserByCredentials(email, password);

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const token = jwt.sign({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    const cookiesStore = await cookies();

    cookiesStore.set('lms_auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60, // 24 hours
      path: '/',
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json(
      {
        success: true,
        message: 'Login successful',
        user: userWithoutPassword
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}