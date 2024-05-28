import { Category } from "./category";

export interface Boekje {
    id: number;
    name: string;
    description: string;
    archived: boolean;
    categories: Category[];
}