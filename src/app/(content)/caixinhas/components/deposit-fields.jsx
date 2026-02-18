import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const DepositFields = ({ depositValue, setDepositValue }) => {
  return (
    <FieldSet>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="depositValue">Valor do depósito (R$)</FieldLabel>
          <Input
            id="depositValue"
            autoComplete="off"
            placeholder="R$ 0,00"
            type="number"
            step="0.01"
            min="0.01"
            value={depositValue}
            onChange={(e) => setDepositValue(parseFloat(e.target.value) || 0)}
          />
        </Field>
      </FieldGroup>
    </FieldSet>
  );
};

export default DepositFields;
