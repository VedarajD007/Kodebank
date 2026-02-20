import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { username, password, email, phone } = body;

        // Validate required fields
        if (!username || !password || !email || !phone) {
            return NextResponse.json(
                { error: "All fields are required: username, password, email, phone" },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: "Invalid email format" },
                { status: 400 }
            );
        }

        // Validate password length
        if (password.length < 6) {
            return NextResponse.json(
                { error: "Password must be at least 6 characters" },
                { status: 400 }
            );
        }

        // Check if username or email already exists
        const existingUser = await prisma.kodUser.findFirst({
            where: {
                OR: [{ username }, { email }],
            },
        });

        if (existingUser) {
            const field = existingUser.username === username ? "Username" : "Email";
            return NextResponse.json(
                { error: `${field} already exists` },
                { status: 409 }
            );
        }

        // Hash password
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create user
        await prisma.kodUser.create({
            data: {
                username,
                email,
                password: hashedPassword,
                phone,
                role: "CUSTOMER",
                balance: 100000,
            },
        });

        return NextResponse.json(
            { message: "Registration successful! Please login." },
            { status: 201 }
        );
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
