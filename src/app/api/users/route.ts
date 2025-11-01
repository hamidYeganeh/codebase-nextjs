import { NextResponse } from 'next/server';

// Mock data for demonstration
const users = [
  { id: '1', name: 'John Doe', email: 'john@example.com' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com' },
];

export async function GET() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const body = await request.json();
  
  // Validate request body
  if (!body.name || !body.email) {
    return NextResponse.json(
      { error: 'Name and email are required' },
      { status: 400 }
    );
  }
  
  // Create new user (in a real app, this would save to a database)
  const newUser = {
    id: (users.length + 1).toString(),
    name: body.name,
    email: body.email,
  };
  
  // In a real app, we would add to the database here
  // users.push(newUser);
  
  return NextResponse.json(newUser, { status: 201 });
}