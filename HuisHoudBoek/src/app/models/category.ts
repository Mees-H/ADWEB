import {Income} from "./income";

export interface Category {
    id: number;
    name: string;
    description: string;
    incomes: Income[];
}
