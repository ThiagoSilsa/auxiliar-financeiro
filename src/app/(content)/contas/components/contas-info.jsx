import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


import { FaPlus } from "react-icons/fa";
import { formatCurrency } from "@/lib/format";

const ContasInfo = ({ totalContas, openModal }) => {
  return (
    <Card className="flex-row w-full items-center justify-between">
      <CardHeader className="w-1/2">
        <CardTitle className="text-2xl font-bold">Contas</CardTitle>
        <CardDescription className="text-md text-black/60 dark:text-white/60">
          Total em todas as contas:{" "}
          <span className="font-bold text-ring/80">
            {formatCurrency(totalContas)}
          </span>
        </CardDescription>
      </CardHeader>
      <CardAction className="pr-6">
        <Button onClick={() => openModal(true)}>
          <FaPlus className="mr-2" /> Nova conta
        </Button>
      </CardAction>
    </Card>
  );
};

export default ContasInfo;
