import {Income} from "./income";

export interface Category {
    id: string;
    name: string;
    description: string;
    incomes: Income[];
}
