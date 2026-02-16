import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { FaPlus } from "react-icons/fa";
import { formatCurrency } from "@/lib/format";

const ContasInfo = ({
  totalContas,
  sheetOpen,
  setSheetOpen,
  novaConta,
  setNovaConta,
  handleAdicionarConta,
  editando,
}) => {
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
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button>
              <FaPlus /> Nova conta
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>
                {editando ? "Editar Conta" : "Adicionar Conta"}
              </SheetTitle>
              <SheetDescription>
                {editando
                  ? "Altere os dados da conta."
                  : "Preencha os dados da nova conta."}
              </SheetDescription>
            </SheetHeader>
            <div className="space-y-4 py-4 px-3">
              <div>
                <label className="text-sm font-medium">Nome da Conta</label>
                <Input
                  placeholder="Ex: Nubank, Itaú..."
                  value={novaConta.nome}
                  onChange={(e) =>
                    setNovaConta({
                      ...novaConta,
                      nome: e.target.value,
                    })
                  }
                  className="mt-1"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Tipo de Conta</label>
                <Select
                  value={novaConta.tipo}
                  onValueChange={(value) =>
                    setNovaConta({
                      ...novaConta,
                      tipo: value,
                    })
                  }
                >
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="digital">Digital</SelectItem>
                      <SelectItem value="poupanca">Poupança</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Saldo Atual</label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0,00"
                  value={novaConta.valor}
                  onChange={(e) =>
                    setNovaConta({
                      ...novaConta,
                      valor: e.target.value,
                    })
                  }
                  className="mt-1"
                />
              </div>

              <Button onClick={handleAdicionarConta} className="w-full mt-6">
                {editando ? "Salvar Alterações" : "Adicionar Conta"}
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </CardAction>
    </Card>
  );
};

export default ContasInfo;
