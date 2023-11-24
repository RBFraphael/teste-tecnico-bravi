import { IAddress } from "./iaddress";
import { IContact } from "./icontact";

export interface IPerson {
    id?: number;
    first_name: string;
    last_name: string;
    document: string;
    birthdate: string;
    gender: string;
    addresses?: IAddress[];
    contacts?: IContact[];
}
