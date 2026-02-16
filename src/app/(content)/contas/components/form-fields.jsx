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

const FormFields = ({ form, setForm }) => {
  return (
    <FieldSet>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="name">Nome da conta</FieldLabel>
          <Input
            id="name"
            autoComplete="off"
            placeholder="Nubank"
            value={form?.nome}
            onChange={(e) => setForm({ ...form, nome: e.target.value })}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="tipo">Tipo da conta</FieldLabel>
          <Select
            id="tipo"
            value={form?.tipo}
            onValueChange={(value) => setForm({ ...form, tipo: value })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione o tipo da conta" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="corrente">Corrente</SelectItem>
              <SelectItem value="poupanca">Poupança</SelectItem>
              <SelectItem value="investimento">Investimento</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field>
          <FieldLabel htmlFor="saldo">Saldo inicial</FieldLabel>
          <Input
            id="saldo"
            autoComplete="off"
            placeholder="R$ 0,00"
            type="number"
            step="0.01"
            value={form?.saldo}
            onChange={(e) =>
              setForm({ ...form, saldo: parseFloat(e.target.value) })
            }
          />
        </Field>
        <Field orientation="horizontal gap-2">
          <FieldLabel htmlFor="newsletter">Inativa</FieldLabel>
          <Switch
            id="newsletter"
            checked={form?.ativa}
            onCheckedChange={(checked) => setForm({ ...form, ativa: checked })}
          />
          <FieldLabel htmlFor="newsletter" className="mr-4">
            Ativa
          </FieldLabel>
        </Field>
      </FieldGroup>
    </FieldSet>
  );
};

export default FormFields;
