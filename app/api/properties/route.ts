import { NextRequest, NextResponse } from 'next/server'
import { getAllProperties, createProperty } from '@/lib/db'

export async function GET() {
  const properties = getAllProperties()
  return NextResponse.json(properties)
}

export async function POST(req: NextRequest) {
  const data = await req.json()
  const property = createProperty(data)
  return NextResponse.json(property, { status: 201 })
}
