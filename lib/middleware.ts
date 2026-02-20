import { NextRequest } from "next/server";
import { verifyToken, TokenPayload } from "./auth";
import { prisma } from "./prisma";

export interface AuthResult {
    success: true;
    payload: TokenPayload;
}

export interface AuthError {
    success: false;
    message: string;
    status: number;
}

/**
 * Authenticate an incoming request by extracting and verifying the JWT
 * from the HTTP-only cookie, then cross-checking against the database.
 */
export async function authenticateRequest(
    request: NextRequest
): Promise<AuthResult | AuthError> {
    try {
        const token = request.cookies.get("token")?.value;

        if (!token) {
            return { success: false, message: "Authentication required", status: 401 };
        }

        // Verify JWT signature and expiration
        let payload: TokenPayload;
        try {
            payload = verifyToken(token);
        } catch {
            return { success: false, message: "Invalid or expired token", status: 401 };
        }

        // Check token exists in database and hasn't expired
        const dbToken = await prisma.userToken.findFirst({
            where: {
                token,
                user: { username: payload.sub },
                expiry: { gt: new Date() },
            },
        });

        if (!dbToken) {
            return {
                success: false,
                message: "Token not found or expired. Please login again.",
                status: 401,
            };
        }

        return { success: true, payload };
    } catch {
        return { success: false, message: "Authentication failed", status: 500 };
    }
}
