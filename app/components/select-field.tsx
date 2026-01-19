"use client";

import { SelectHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { Field } from "./field";
import { FormFields } from "../types/form";

interface SelectFieldProps<TFields extends FormFields>
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "defaultValue" | "name"> {
  name: keyof TFields & string;
  label: string;
  options: Record<string, string>;
}

export function SelectField<TFields extends FormFields>({
  name,
  label,
  options,
  className,
  ...props
}: SelectFieldProps<TFields>) {
  return (
    <Field<TFields> name={name} label={label}>
      {({ id, name: fieldName, defaultValue, validationProps }) => (
        <select
          key={String(defaultValue ?? "")}
          id={id}
          name={fieldName}
          defaultValue={defaultValue ?? ""}
          className={twMerge("form-input", className)}
          {...props}
          {...validationProps}
        >
          {Object.entries(options).map(([optionValue, optionLabel]) => (
            <option key={optionValue} value={optionValue}>
              {optionLabel}
            </option>
          ))}
        </select>
      )}
    </Field>
  );
}
