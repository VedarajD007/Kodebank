import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { generateToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { username, password } = body;

        // Validate required fields
        if (!username || !password) {
            return NextResponse.json(
                { error: "Username and password are required" },
                { status: 400 }
            );
        }

        // Find user by username
        const user = await prisma.kodUser.findUnique({
            where: { username },
        });

        if (!user) {
            return NextResponse.json(
                { error: "Invalid username or password" },
                { status: 401 }
            );
        }

        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return NextResponse.json(
                { error: "Invalid username or password" },
                { status: 401 }
            );
        }

        // Generate JWT token
        const token = generateToken(user.username, user.role);

        // Calculate expiry (1 hour from now)
        const expiry = new Date(Date.now() + 60 * 60 * 1000);

        // Store token in database (replace any existing tokens for this user)
        await prisma.userToken.deleteMany({ where: { uid: user.uid } });
        await prisma.userToken.create({
            data: { token, uid: user.uid, expiry },
        });


        // Set HTTP-only cookie
        const response = NextResponse.json(
            { message: "Login successful", username: user.username },
            { status: 200 }
        );

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60, // 1 hour in seconds
            path: "/",
        });

        return response;
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
