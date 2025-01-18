import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { client } from "@/sanity/lib/client";

export async function POST(request: Request) {
  if (request.body) {
    try {
      const { name, email, password, phone } = await request.json();

      // Check if the required fields are provided
      if (!name || !email || !password) {
        return NextResponse.json(
          { error: "Name, email, and password are required." },
          { status: 400 }
        );
      }

      // Hash the password using bcryptjs
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create the customer document for Sanity
      const newCustomer = {
        _type: "customer",
        name,
        email,
        password: hashedPassword,
        phone,
        isActive: true,
        createdAt: new Date().toISOString(),
      };

      // Create the document in Sanity
      const result = await client.create(newCustomer);

      return NextResponse.json(
        { message: "User created successfully!", name: result.name, email: result.email },
        { status: 201 }
      );
    } catch (error) {
      console.error("Error creating user:", error);
      return NextResponse.json(
        { error: "Something went wrong while creating the user." },
        { status: 500 }
      );
    }
  }
  else{
    return NextResponse.json({ error: "Invalid request body." },{ status: 400 });
  }
}

