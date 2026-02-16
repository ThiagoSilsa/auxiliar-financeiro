import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FormFields = ({ form, setForm, CATEGORIAS, CONTAS }) => {
  return (
    <FieldSet>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="tipo">Tipo</FieldLabel>
          <Select
            id="tipo"
            value={form?.tipo}
            onValueChange={(value) => setForm({ ...form, tipo: value })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione um tipo" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="entrada">Entrada</SelectItem>
              <SelectItem value="saida">Saída</SelectItem>
            </SelectContent>
          </Select>
        </Field>

        <Field>
          <FieldLabel htmlFor="descricao">Descrição</FieldLabel>
          <Input
            id="descricao"
            autoComplete="off"
            placeholder="Ex: Salário, Supermercado..."
            value={form?.descricao}
            onChange={(e) => setForm({ ...form, descricao: e.target.value })}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="categoria">Categoria</FieldLabel>
          <Select
            id="categoria"
            value={form?.categoria}
            onValueChange={(value) => setForm({ ...form, categoria: value })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione uma categoria" />
            </SelectTrigger>
            <SelectContent position="popper">
              {CATEGORIAS.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field>
          <FieldLabel htmlFor="valor">Valor</FieldLabel>
          <Input
            id="valor"
            autoComplete="off"
            placeholder="0,00"
            type="number"
            step="0.01"
            value={form?.valor}
            onChange={(e) =>
              setForm({ ...form, valor: parseFloat(e.target.value) })
            }
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="conta">Conta</FieldLabel>
          <Select
            id="conta"
            value={form?.conta}
            onValueChange={(value) => setForm({ ...form, conta: value })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione uma conta" />
            </SelectTrigger>
            <SelectContent position="popper">
              {CONTAS.map((conta) => (
                <SelectItem key={conta} value={conta}>
                  {conta}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field>
          <FieldLabel htmlFor="data">Data</FieldLabel>
          <Input
            id="data"
            type="date"
            value={form?.data}
            onChange={(e) => setForm({ ...form, data: e.target.value })}
          />
        </Field>
      </FieldGroup>
    </FieldSet>
  );
};

export default FormFields;
