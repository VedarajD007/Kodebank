import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export interface TokenPayload {
    sub: string;   // username
    role: string;  // user role
    iat?: number;
    exp?: number;
}

/**
 * Generate a JWT token for a user.
 * Subject = username, claim = role, expiry = 1 hour.
 */
export function generateToken(username: string, role: string): string {
    return jwt.sign({ role }, JWT_SECRET, {
        subject: username,
        expiresIn: "1h",
    });
}

/**
 * Verify and decode a JWT token.
 * Returns the decoded payload or throws on invalid/expired token.
 */
export function verifyToken(token: string): TokenPayload {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
}
