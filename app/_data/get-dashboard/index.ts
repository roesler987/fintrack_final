import { db } from "@/app/_lib/prisma";
import { TransactionType } from "@prisma/client";
import { TransactionPerecentagePerType } from "./type";


export const getDashboard = async (month: string) => {
  const where = {
    date: {
      gte: new Date(`2024-${month}-1`),
      lt: new Date(`2024-${month}-31`),
    },
  };

  const depositTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "DEPOSIT" },
        _sum: { amount: true },
      })
    )?._sum.amount,
  );

  const investomentTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "INVESTMENT" },
        _sum: { amount: true },
      })
    )?._sum.amount,
  );

  const expensesTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "EXPENSE" },
        _sum: { amount: true },
      })
    )?._sum.amount,
  );

  const balance = depositTotal - investomentTotal - expensesTotal;

  const transactionsTotal = Number(
    (
      await db.transaction.aggregate({
        where,
        _sum: { amount: true },
      })
    )._sum.amount,
  );
  const typesPercentage: TransactionPerecentagePerType= {
    [TransactionType.DEPOSIT]: Math.round(
      (Number(depositTotal || 0) / Number(transactionsTotal)) * 100,
    ),
    [TransactionType.EXPENSE]: Math.round(
      (Number(expensesTotal || 0) / Number(transactionsTotal)) * 100,
    ),
    [TransactionType.INVESTMENT]: Math.round(
      (Number(investomentTotal || 0) / Number(transactionsTotal)) * 100,
    ),
  };

  return {
    balance,
    depositTotal,
    investomentTotal,
    expensesTotal,
    typesPercentage,
  };
};
