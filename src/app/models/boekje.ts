import { Category } from "./category";

export interface Boekje {
    id: string;
    name: string;
    description: string;
    archived: boolean;
    userIds: string[];
}
