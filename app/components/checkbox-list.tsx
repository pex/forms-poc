"use client";

import { useFieldState } from "./form-context";
import { FormFields } from "../types/form";

interface CheckboxListProps<TFields extends FormFields> {
  name: keyof TFields & string;
  options: Record<string, string>;
}

export function CheckboxList<TFields extends FormFields>({
  name,
  options,
}: CheckboxListProps<TFields>) {
  const { value, errors } = useFieldState(name);
  const defaultValue = (value as string[]) ?? [];
  const errorId = `errors-${name}`;
  const hasErrors = errors && errors.length > 0;

  return (
    <div>
      <fieldset
        aria-invalid={hasErrors || undefined}
        aria-describedby={hasErrors ? errorId : undefined}
        className="flex gap-3 validator"
      >
        {Object.entries(options).map(([optionValue, label]) => (
          <label className="label" key={optionValue}>
            <input
              type="checkbox"
              name={name}
              value={optionValue}
              defaultChecked={defaultValue.includes(optionValue)}
              className="checkbox"
            />
            {label}
          </label>
        ))}
      </fieldset>
      {hasErrors && (
        <p className="validator-hint" id={errorId}>
          {errors.join(", ")}
        </p>
      )}
    </div>
  );
}
