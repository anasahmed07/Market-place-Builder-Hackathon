import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { client } from '@/sanity/lib/client';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'yourSecretKey';  // Replace with your secret key

export async function POST(request: Request) {
if (request.body){
  try {
    const { email, password } = await request.json();

    // Check if email and password are provided
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
    }

    // Fetch the user from Sanity based on the email
    const query = `*[_type == "customer" && email == $email][0]`;
    const user = await client.fetch(query, { email });

    // If the user doesn't exist, return an error
    if (!user) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If the password doesn't match, return an error
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid password.' }, { status: 401 });
    }

    // Generate a JWT token with user details
    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      JWT_SECRET,  // Secret key for signing the token
      { expiresIn: '1h' }  // Set the token expiration time (1 hour)
    );

    // Return the JWT token
    return NextResponse.json(
      { message: 'Login successful!', token }, 
      { status: 200 }
    );
  } catch (error) {
    console.error('Error logging in:', error);
    return NextResponse.json({ error: 'Something went wrong during login.' }, { status: 500 });
  }}
  else{
   return NextResponse.json({ error: 'invalid request' }, { status: 500 });
  }
}
