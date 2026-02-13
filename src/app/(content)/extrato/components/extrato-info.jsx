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

const ExtratoInfo = ({
  CATEGORIAS,
  CONTAS,
  sheetOpen,
  setSheetOpen,
  novaTransacao,
  setNovaTransacao,
  handleAdicionarTransacao,
}) => {
  return (
    <Card className="flex-row w-full items-center justify-between">
      <CardHeader className="w-1/2">
        <CardTitle className="text-2xl font-bold">Extrato</CardTitle>
        <CardDescription className="text-md text-black/60 dark:text-white/60">
          Aqui está o seu extrato recente.
        </CardDescription>
      </CardHeader>
      <CardAction className="pr-6">
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button>
              <FaPlus /> Nova transação
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Adicionar Transação</SheetTitle>
              <SheetDescription>
                Preenchaos dados da nova transação.
              </SheetDescription>
            </SheetHeader>
            <div className="space-y-4 py-4 px-3">
              <div>
                <label className="text-sm font-medium">Tipo</label>
                <Select
                  value={novaTransacao.tipo}
                  onValueChange={(value) =>
                    setNovaTransacao({
                      ...novaTransacao,
                      tipo: value,
                    })
                  }
                >
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder="Selecione um tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="entrada">Entrada</SelectItem>
                      <SelectItem value="saida">Saída</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Descrição</label>
                <Input
                  placeholder="Ex: Salário, Supermercado..."
                  value={novaTransacao.descricao}
                  onChange={(e) =>
                    setNovaTransacao({
                      ...novaTransacao,
                      descricao: e.target.value,
                    })
                  }
                  className="mt-1"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Categoria</label>
                <Select
                  value={novaTransacao.categoria}
                  onValueChange={(value) =>
                    setNovaTransacao({
                      ...novaTransacao,
                      categoria: value,
                    })
                  }
                >
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIAS.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Valor</label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0,00"
                  value={novaTransacao.valor}
                  onChange={(e) =>
                    setNovaTransacao({
                      ...novaTransacao,
                      valor: e.target.value,
                    })
                  }
                  className="mt-1"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Conta</label>
                <Select
                  value={novaTransacao.conta}
                  onValueChange={(value) =>
                    setNovaTransacao({
                      ...novaTransacao,
                      conta: value,
                    })
                  }
                >
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder="Selecione uma conta" />
                  </SelectTrigger>
                  <SelectContent>
                    {CONTAS.map((conta) => (
                      <SelectItem key={conta} value={conta}>
                        {conta}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Data</label>
                <Input
                  type="date"
                  value={novaTransacao.data}
                  onChange={(e) =>
                    setNovaTransacao({
                      ...novaTransacao,
                      data: e.target.value,
                    })
                  }
                  className="mt-1"
                />
              </div>

              <Button
                onClick={handleAdicionarTransacao}
                className="w-full mt-6"
              >
                Adicionar Transação
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </CardAction>
    </Card>
  );
};

export default ExtratoInfo;
