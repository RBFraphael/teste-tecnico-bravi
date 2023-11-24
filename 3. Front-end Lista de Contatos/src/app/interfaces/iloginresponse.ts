import { IUser } from "./iuser";

export interface ILoginResponse {
    access_token: string;
    expires_in: number;
    token_type: string;
    user: IUser;
}
