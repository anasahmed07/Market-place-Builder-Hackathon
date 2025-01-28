import { type NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { client } from "@/sanity/lib/client";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, phone, address, city, state, zipCode } = await req.json();
    // Check if the required fields are provided
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required." },
        { status: 400 }
      );
    }
    // Check if the user already exists
    const existingUser = await client.fetch(
      `*[_type == "customer" && email == $email][0]`,
      { email }
    );
    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists." },
        { status: 400 }
      );
    }
    // Hash the password using bcryptjs
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the customer document for Sanity
    try{
     let newCustomer = await client.create ({
      _type: "customer",
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      city,
      state,
      zipCode,
      isActive: true,
      createdAt: new Date().toISOString(),
    })
    return NextResponse.json(
      { user:{ id:newCustomer._id ,name:newCustomer.name ,email:newCustomer.email}, message: "User created successfully!"},
      { status: 201 }
    );
  }
  catch (error) {
    console.error("Error creating customer in Sanity:", error);
    throw new Error("Failed to create customer in Sanity");
  }

  } 
  catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Something while creating the user." },
      { status: 500 }
    );
  }
}

