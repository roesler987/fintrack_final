"use client";

import { ArrowDownUpIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { z } from "zod";
import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { TRANSACTION_CATEGORY_OPTIONS, TRANSACTION_PAYMENT_METHOD_OPTIONS, TRANSACTION_TYPE_OPTIONS } from "../_constants/transaction";
import { DatePicker } from "./ui/date-picker";
import { addTransaction } from "../_actions/add-transactions";
import { MoneyInput } from "./money-input";
import { useState } from "react";



const formSchema = z.object({
  name: z.string().trim().min(1, {
    message: "O nome é obrigatorio.",
  }),
  amount: z.number({
    required_error: "O valor deve ser obrigatorio"
  }).positive({
    message: "O valor deve ser positivo"
  }),
  type: z.nativeEnum(TransactionType, {
    required_error: "O tipo é obrigatorio.",
  }),
  category: z.nativeEnum(TransactionCategory, {
    required_error: "A categoria é obrigatoria.",
  }),
  paymentMethod: z.nativeEnum(TransactionPaymentMethod, {
    required_error: "O metodo de pagamento é obrigatorio.",
  }),
  date: z.date({
    required_error: "A data é obrigatoria.",
  }),
});

type FormSchema = z.infer<typeof formSchema>;

const AddTransactionButton = () => {

  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 1,
      category: TransactionCategory.OTHER,
      date: new Date(),
      name: "",
      paymentMethod: TransactionPaymentMethod.CASH,
      type: TransactionType.EXPENSE,
    },
  });

  const onSubmit = async (data: FormSchema) => {
    try {
      await addTransaction(data)
      setDialogIsOpen(false)
      form.reset();
    }catch (error){
      console.error(error)
    }
  };
  
  return (
    <Dialog
    open={dialogIsOpen}
    onOpenChange={(open) =>{
      setDialogIsOpen(open)
        if (!open) {
            form.reset();
        }
    }

    }>
      <DialogTrigger asChild>
        <Button className="rounded-full font-bold">
          Adicionar Transação
          <ArrowDownUpIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Transação </DialogTitle>
          <DialogDescription>Insira as informações abaixo</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome da transação" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor</FormLabel>
                  <FormControl>
                    <MoneyInput placeholder="Digite o valor"
                    value={field.value}
                    onValueChange = {({floatValue})=>
                    field.onChange(floatValue)
                    }
                    onBlur={field.onBlur}
                    disabled={field.disabled} 
                    
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {TRANSACTION_TYPE_OPTIONS.map(option =>(
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
            <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoria</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {TRANSACTION_CATEGORY_OPTIONS.map(option =>(
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="paymentMthod"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Metodo de Pagamento</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um metodo de pagamento" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {TRANSACTION_PAYMENT_METHOD_OPTIONS.map(option =>(
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
          <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data</FormLabel>
              <DatePicker value={field.value} onChange={field.onChange}/>
              <FormMessage />
            </FormItem>
          )}
        />
            <DialogFooter>
              <DialogClose>
              <Button type="button" variant="outline">Cancelar</Button>
              </DialogClose>
              <Button type="submit">Adicionar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTransactionButton;
