declare namespace Express {
    interface Request {
        id?: string;
        role?: "USER" | "VENUE_OWNER" | "ADMIN";
    }
}
