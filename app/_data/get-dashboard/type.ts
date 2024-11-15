import { TransactionType } from "@prisma/client";

export type TransactionPerecentagePerType = {
    [key in TransactionType]: number;
}