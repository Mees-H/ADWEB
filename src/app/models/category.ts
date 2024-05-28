import {Income} from "./income";

export interface Category {
    id: string;
    name: string;
    description: string;
    max_budget: number;
    end_date: Date | null;
    incomes: Income[];
}
