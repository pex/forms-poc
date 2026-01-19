"use client";

import { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { Field } from "./field";
import { FormFields } from "../types/form";

interface RadioGroupFieldProps<TFields extends FormFields>
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "defaultValue" | "name" | "type"> {
  name: keyof TFields & string;
  options: Record<string, string>;
}

export function RadioGroupField<TFields extends FormFields>({
  name,
  options,
  className,
  ...props
}: RadioGroupFieldProps<TFields>) {
  return (
    <Field<TFields> name={name}>
      {({ name: fieldName, defaultValue, validationProps }) => (
        <fieldset
          {...validationProps}
          className={twMerge("form-fieldset flex-col gap-2", className)}
        >
          {Object.entries(options).map(([optionValue, optionLabel]) => (
            <label
              key={optionValue}
              className="inline-flex items-center gap-2 cursor-pointer"
            >
              <input
                type="radio"
                name={fieldName}
                value={optionValue}
                defaultChecked={defaultValue === optionValue}
                {...props}
              />
              <span className="text-sm">{optionLabel}</span>
            </label>
          ))}
        </fieldset>
      )}
    </Field>
  );
}
