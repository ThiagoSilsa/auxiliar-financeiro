import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

import { FaPlus } from "react-icons/fa";

const CaixinhasInfo = ({
  totalCaixinhas,
  caixinhasAtivas,
  percentualGeral,
  openModal,
}) => {
  return (
    <Card className="flex-col w-full gap-4">
      <CardHeader className="flex-row items-center justify-between w-full">
        <div>
          <CardTitle className="text-2xl font-bold">Caixinhas</CardTitle>
          <CardDescription className="text-md text-black/60 dark:text-white/60">
            {caixinhasAtivas} de {totalCaixinhas} caixinhas ativas
          </CardDescription>
        </div>
        <CardAction>
          <Button onClick={openModal}>
            <FaPlus className="mr-2" /> Nova caixinha
          </Button>
        </CardAction>
      </CardHeader>
      <div className="px-6 pb-2 flex flex-col gap-2">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Progresso geral até os objetivos</span>
          <span className="font-semibold text-ring/80">
            {percentualGeral.toFixed(1)}%
          </span>
        </div>
        <Progress value={percentualGeral} className="h-3" />
      </div>
    </Card>
  );
};

export default CaixinhasInfo;
