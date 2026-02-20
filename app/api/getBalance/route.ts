import { NextRequest, NextResponse } from "next/server";
import { authenticateRequest } from "@/lib/middleware";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
    try {
        // Authenticate the request
        const authResult = await authenticateRequest(request);

        if (!authResult.success) {
            return NextResponse.json(
                { error: authResult.message },
                { status: authResult.status }
            );
        }

        const username = authResult.payload.sub;

        // Fetch user balance
        const user = await prisma.kodUser.findUnique({
            where: { username },
            select: { balance: true, username: true },
        });

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { balance: user.balance, username: user.username },
            { status: 200 }
        );
    } catch (error) {
        console.error("Get balance error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
