"use server"

import { db } from "@/app/_lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { TransactionCategory, TransactionPaymentMethod, TransactionType } from "@prisma/client"
import { upsertTransactionSchema } from "./schema"
import { revalidatePath } from "next/cache"

interface UpsertTransactionParams {
    id?: string,
    name: string,
    amount: number,
    type: TransactionType,
    category: TransactionCategory,
    paymentMethod: TransactionPaymentMethod,
    date: Date
}

export const upsertTransaction = async (params: UpsertTransactionParams) => {
    upsertTransactionSchema.parse(params)

    const { userId } = await auth();
    if (!userId) {
        throw new Error("Unauthorized")
    }

    if (params.id) {
        // Se o 'id' está presente, faz o update
        await db.transaction.upsert({
            where: {
                id: params.id,
            },
            update: { ...params, userId },
            create: { ...params, userId },
        });
    } else {
        // Caso não haja 'id', cria uma nova transação
        await db.transaction.create({
            data: { ...params, userId },
        });
    }

    revalidatePath('/transactions')
}
