export interface User {
    id?: string;
    email: string;
    password: string;
    name?: string | null;
    phone?: string | null;
    role?: "USER" | "VENUE_OWNER" | "ADMIN";
}
export interface JwtPayload {
    id: string;
    role: "USER" | "VENUE_OWNER" | "ADMIN";
}

export type UserUpdate = Partial<Omit<User, "id">>;
