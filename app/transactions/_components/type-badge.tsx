import { Badge } from "@/app/_components/ui/badge";
import { Transaction, TransactionType } from "@prisma/client";
import { CircleIcon } from "lucide-react";

interface TransactionTypeBadgeProps{
    transaction: Transaction
}

const TransactionTypeBadge = ({transaction}: TransactionTypeBadgeProps) => {
    if (transaction.type === TransactionType.DEPOSIT) {
        return(
            <Badge className="font-bold bg-muted text-primary hover:bg-muted">
                <CircleIcon className="mr-2 fill-primary" size={9} />
                Deposito
            </Badge>
        )
    }
    if (transaction.type === TransactionType.EXPENSE) {
    return(
        <Badge className="font-bold text-danger bg-danger bg-opacity-10">
                <CircleIcon className="fill-danger mr-2" size={9} />
                Despesa
        </Badge>   
    )
    }  
    return(
        <Badge className="font-bold text-white bg-white bg-opacity-10">
            <CircleIcon className="fill-white mr-2" size={9} />
            Investimento
        </Badge> 
    );     
}
 
export default TransactionTypeBadge;