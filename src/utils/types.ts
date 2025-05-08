export interface IUser {
    id?: string;
    email: string;
    password: string;
    name?: string | null;
    phone?: string | null;
    role?: "USER" | "VENUE_OWNER" | "ADMIN";
}

export type UserUpdate = Partial<Omit<IUser, "id">>;
