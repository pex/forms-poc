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
  const { value, validationProps, validationHint } = useFieldState<string[]>(name);
  const defaultValue = value ?? [];

  return (
    <div>
      <fieldset {...validationProps} className="flex gap-3 validator">
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
      {validationHint}
    </div>
  );
}
