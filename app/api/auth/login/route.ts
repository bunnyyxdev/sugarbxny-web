import { NextRequest, NextResponse } from 'next/server'
import { getUserByEmail, comparePassword } from '@/lib/auth'
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Get user
    let user
    try {
      user = await getUserByEmail(email)
    } catch (dbError: any) {
      console.error('Database error in login:', dbError)
      // If database is not initialized, provide helpful error
      if (dbError.message?.includes('not initialized') || dbError.code === 'ER_NO_SUCH_TABLE') {
        return NextResponse.json(
          { error: 'Database not initialized. Please contact administrator.' },
          { status: 503 }
        )
      }
      throw dbError
    }

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Check password
    if (!user.password) {
      console.error('User found but password is missing')
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    const isValidPassword = await comparePassword(password, user.password)
    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Create session (simple cookie-based for now)
    try {
      const cookieStore = await cookies()
      cookieStore.set('user_session', JSON.stringify({ userId: user.id, email: user.email }), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7 // 7 days
      })
    } catch (cookieError: any) {
      console.error('Cookie error:', cookieError)
      // Continue even if cookie setting fails (for development)
    }

    return NextResponse.json(
      { message: 'Login successful', user: { id: user.id, email: user.email } },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Login error:', error)
    
    // Handle specific error types
    if (error.message?.includes('JSON')) {
      return NextResponse.json(
        { error: 'Invalid request format' },
        { status: 400 }
      )
    }

    const errorMessage = process.env.NODE_ENV === 'development' 
      ? error.message || 'Internal server error'
      : 'Internal server error'
    
    return NextResponse.json(
      { 
        error: errorMessage, 
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined 
      },
      { status: 500 }
    )
  }
}

