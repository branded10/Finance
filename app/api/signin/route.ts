// /api/signin.js

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from "@/mongodb/models/User";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  if (req.method === "POST") {
    // Extract user data from request body
    const body = await req.json();
    const { email, password } = body;

    console.log("Request Body:", body);

    // Check if required fields are provided
    if (!email || !password) {
      return new NextResponse("Email and password are required", { status: 400 });
    }

    // Find the user in the database
    const user = await User.findOne({ email });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    // Compare the provided password with the hashed password in the database
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return new NextResponse("Invalid password", { status: 401 });
    }

    // Create JWT token
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT Secret is undefined");
    }
    const token = jwt.sign({ userId: user._id }, secret, { expiresIn: "1h" });

    // Return user data and token
    return new NextResponse(JSON.stringify({ user, token }));
  } else {
    // Handle other HTTP methods
    return new NextResponse(`Method ${req.method} Not Allowed`, { status: 405 });
  }
}
