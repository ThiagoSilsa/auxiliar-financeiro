import {
  ContainerDiv,
  MainContainer,
} from "@/components/created/main-container/main-container";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FaPlus } from "react-icons/fa";

export default function ExtratoPage() {
  return (
    <main>
      <MainContainer>
        <ContainerDiv>
          <Card className="flex-row w-full items-center justify-between ">
            <CardHeader className="w-1/2 ">
              <CardTitle className="text-2xl font-bold">Extrato</CardTitle>
              <CardDescription className="text-md text-black/60 dark:text-white/60">
                Aqui está o seu extrato recente.
              </CardDescription>
            </CardHeader>
            <CardAction className="pr-6">
              <Button>
                <FaPlus /> Nova transação
              </Button>
            </CardAction>
          </Card>
        </ContainerDiv>
        <ContainerDiv>
          <div className="bg-card w-full">
            <Input placeholder="Buscar transações..." />
            bu
          </div>
        </ContainerDiv>
      </MainContainer>
    </main>
  );
}
