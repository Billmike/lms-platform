import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const cookiesStore = await cookies();

    cookiesStore.delete('lms_auth_token');

    return NextResponse.json(
      {
        success: true,
        message: 'Logout successful',
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