import { db } from "../_lib/prisma";
import { DataTable } from "../_components/ui/data-table";
import { transactionColumns } from "./_columns";
import AddTransactionButton from "../_components/add-transaction-button";
import NavBar from "../_components/navbar";

const TransactionsPage = async () => {

  const transactions = await db.transaction.findMany({})

    return (
     <>
      <NavBar /> 
      <div className="p-6 space-y-6">
        {/* titulo e botao */}
        <div className=" flex w-full items-center justify-between ">
          <h1 className="text-2xl font-bold">Transação</h1>
          <AddTransactionButton />
        </div>

          <DataTable columns={transactionColumns} data={transactions}/>
     
      </div>

      </>
    )
     
  };
  
  export default TransactionsPage;