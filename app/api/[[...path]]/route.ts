import { MongoClient, Db } from 'mongodb'
import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

const MONGO_URL = process.env.MONGO_URL as string

interface CachedConnection {
  client: MongoClient | null
  db: Db | null
}

const cached: CachedConnection = {
  client: null,
  db: null
}

interface ContactSubmission {
  id: string
  name: string
  email: string
  message: string
  status: string
  createdAt: string
  updatedAt: string
}

interface ContactFormData {
  name: string
  email: string
  message: string
}

interface ApiResponse<T = any> {
  success?: boolean
  message?: string
  data?: T
  total?: number
  error?: string
  details?: string
}

async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
  if (cached.client && cached.db) {
    return { client: cached.client, db: cached.db }
  }

  const client = await MongoClient.connect(MONGO_URL, {
    maxPoolSize: 10,
    minPoolSize: 2
  })

  const db = client.db('copywriting_portfolio')

  cached.client = client
  cached.db = db

  return { client, db }
}

// POST /api/contact - Submit contact form
export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse>> {
  try {
    const path = request.nextUrl.pathname.replace('/api/', '')

    if (path === 'contact') {
      const body: ContactFormData = await request.json()
      const { name, email, message } = body

      // Validation
      if (!name || !email || !message) {
        return NextResponse.json(
          { error: 'All fields are required' },
          { status: 400 }
        )
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        return NextResponse.json(
          { error: 'Invalid email address' },
          { status: 400 }
        )
      }

      const { db } = await connectToDatabase()

      const contactSubmission: ContactSubmission = {
        id: uuidv4(),
        name,
        email,
        message,
        status: 'new',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      await db.collection<ContactSubmission>('contacts').insertOne(contactSubmission)

      return NextResponse.json(
        {
          success: true,
          message: 'Your message has been sent successfully!',
          data: {
            id: contactSubmission.id,
            name: contactSubmission.name,
            email: contactSubmission.email
          }
        },
        { status: 201 }
      )
    }

    return NextResponse.json(
      { error: 'Route not found' },
      { status: 404 }
    )
  } catch (error) {
    console.error('API Error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { error: 'Internal server error', details: errorMessage },
      { status: 500 }
    )
  }
}

// GET /api/contacts - Get all contact submissions (optional admin endpoint)
export async function GET(request: NextRequest): Promise<NextResponse<ApiResponse<ContactSubmission[]>>> {
  try {
    const path = request.nextUrl.pathname.replace('/api/', '')

    if (path === 'contacts') {
      const { db } = await connectToDatabase()
      
      const contacts = await db
        .collection<ContactSubmission>('contacts')
        .find({})
        .sort({ createdAt: -1 })
        .toArray()

      return NextResponse.json(
        {
          success: true,
          data: contacts,
          total: contacts.length
        },
        { status: 200 }
      )
    }

    return NextResponse.json(
      { error: 'Route not found' },
      { status: 404 }
    )
  } catch (error) {
    console.error('API Error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { error: 'Internal server error', details: errorMessage },
      { status: 500 }
    )
  }
}
