import { Wallet } from './Wallet';
export class User {
    Id!: number;
    Name!: string;
    Surname!: string;
    Username!: string;
    TC!: number;
    Email!: string;
    Password!: number;
    Phone!: number;
    Adress!: string;
    Wallet!: Wallet[];
}