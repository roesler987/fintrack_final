import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";
import SummuryCard from "./summary-card";

interface SummaryCards {
  month: string;
  balance: number;
  depositTotal: number;
  investomentTotal: number;
  expensesTotal: number;
}

const SummaryCards = async ({
  balance,
  depositTotal,
  expensesTotal,
  investomentTotal,
}: SummaryCards) => {
  return (
    <div className="space-y-6">
      {/* primeiro card */}

      <SummuryCard
        icon={<WalletIcon size={16} />}
        title="Saldo"
        amount={balance}
        size="large"
      />

      {/* outros cards */}

      <div className="grid grid-cols-3 gap-6">
        <SummuryCard
          icon={<PiggyBankIcon size={16} />}
          title={"Investido"}
          amount={investomentTotal}
        />
        <SummuryCard
          icon={<TrendingUpIcon size={16} className="text-primary" />}
          title={"Receita"}
          amount={depositTotal}
        />
        <SummuryCard
          icon={<TrendingDownIcon size={16} className="text-red-500" />}
          title={"Despesas"}
          amount={expensesTotal}
        />
      </div>
    </div>
  );
};

export default SummaryCards;
