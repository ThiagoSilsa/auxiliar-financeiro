import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const contasDisponiveis = [
  "Conta Corrente Principal",
  "Poupança Pessoal",
  "Conta Investimentos",
  "Conta Salário",
  "Poupança Férias",
];

const FormFields = ({ form, setForm }) => {
  return (
    <FieldSet>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="nome">Nome da caixinha</FieldLabel>
          <Input
            id="nome"
            autoComplete="off"
            placeholder="Ex: Viagem Europa"
            value={form?.nome}
            onChange={(e) => setForm({ ...form, nome: e.target.value })}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="contaVinculada">Conta vinculada</FieldLabel>
          <Select
            id="contaVinculada"
            value={form?.contaVinculada}
            onValueChange={(value) =>
              setForm({ ...form, contaVinculada: value })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione a conta" />
            </SelectTrigger>
            <SelectContent>
              {contasDisponiveis.map((conta) => (
                <SelectItem key={conta} value={conta}>
                  {conta}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field>
          <FieldLabel htmlFor="valorObjetivo">Valor objetivo (R$)</FieldLabel>
          <Input
            id="valorObjetivo"
            autoComplete="off"
            placeholder="R$ 0,00"
            type="number"
            step="0.01"
            value={form?.valorObjetivo}
            onChange={(e) =>
              setForm({
                ...form,
                valorObjetivo: parseFloat(e.target.value) || 0,
              })
            }
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="valorAtual">Valor inicial (R$)</FieldLabel>
          <Input
            id="valorAtual"
            autoComplete="off"
            placeholder="R$ 0,00"
            type="number"
            step="0.01"
            value={form?.valorAtual}
            onChange={(e) =>
              setForm({
                ...form,
                valorAtual: parseFloat(e.target.value) || 0,
              })
            }
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="prazo">Prazo</FieldLabel>
          <Input
            id="prazo"
            type="date"
            value={form?.prazo}
            onChange={(e) => setForm({ ...form, prazo: e.target.value })}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="depositoMensal">Depósito mensal (R$)</FieldLabel>
          <Input
            id="depositoMensal"
            autoComplete="off"
            placeholder="R$ 0,00"
            type="number"
            step="0.01"
            value={form?.depositoMensal}
            onChange={(e) =>
              setForm({
                ...form,
                depositoMensal: parseFloat(e.target.value) || 0,
              })
            }
          />
        </Field>
        <Field orientation="horizontal" className="gap-2 items-center">
          <Label
            htmlFor="ativa"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Inativa
          </Label>
          <Switch
            id="ativa"
            checked={form?.ativa}
            onCheckedChange={(checked) => setForm({ ...form, ativa: checked })}
          />
          <Label
            htmlFor="ativa"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Ativa
          </Label>
        </Field>
      </FieldGroup>
    </FieldSet>
  );
};

export default FormFields;
