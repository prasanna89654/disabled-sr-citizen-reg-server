import Roles from "./role.enum";

export type JwtPayload = {
    user_id: number;
    role: Roles;
}