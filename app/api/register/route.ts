// /api/register.js

import { serialize } from 'cookie'

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "@/mongodb/models/User";
import { NextRequest,NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  if (req.method === "POST") {
    // Extract user data from request body
    const body = await req.json();
    const { name, email, password, phoneNumber } = body;

    console.log("Request Body from register/route.ts:", body);

    // Check if required fields are provided
    if (!name || !email || !password) {
      // return res.status(400).json({ error: 'Name and email are required' });
      return new NextResponse("Name and email and password are required", { status: 400 });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    console.log("Hashed Password:", hashedPassword);

    // Create new user document in MongoDB
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
    });

    // Create JWT token
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT Secret is undefined");
    }
    const token = jwt.sign({ userId: user._id }, secret, { expiresIn: "1h" });

    console.log("TOKEN from register/route.ts =============> ",token);

    // res.cookies.set('token', token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV !== 'development',
    //   sameSite: 'strict',
    //   maxAge: 3600,
    //   path: '/'
    // })
    
    

    // Return user data and token
    return new NextResponse(JSON.stringify({ user, token }));
  } else {
    // Handle other HTTP methods

    return new NextResponse(`Method ${req.method} Not Allowed`, {
      status: 405,
    });
    // return new NextResponse("Messages are required", { status: 400 });
  }
}