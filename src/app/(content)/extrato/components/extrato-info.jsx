import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaPlus } from "react-icons/fa";

const ExtratoInfo = ({ openModal }) => {
  return (
    <Card className="flex-row w-full items-center justify-between">
      <CardHeader className="w-1/2">
        <CardTitle className="text-2xl font-bold">Extrato</CardTitle>
        <CardDescription className="text-md text-black/60 dark:text-white/60">
          Aqui está o seu extrato recente.
        </CardDescription>
      </CardHeader>
      <CardAction className="pr-6">
        <Button onClick={openModal}>
          <FaPlus /> Nova transação
        </Button>
      </CardAction>
    </Card>
  );
};

export default ExtratoInfo;

