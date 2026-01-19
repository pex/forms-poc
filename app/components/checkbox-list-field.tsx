"use client";

import { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { Field } from "./field";
import { FormFields } from "../types/form";

interface CheckboxListFieldProps<TFields extends FormFields>
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "defaultValue" | "name" | "type"> {
  name: keyof TFields & string;
  options: Record<string, string>;
}

export function CheckboxListField<TFields extends FormFields>({
  name,
  options,
  className,
  ...props
}: CheckboxListFieldProps<TFields>) {
  return (
    <Field<TFields> name={name}>
      {({ name: fieldName, defaultValue, validationProps }) => {
        const checkedValues = Array.isArray(defaultValue) ? defaultValue : [defaultValue];
        return (
          <fieldset
            {...validationProps}
            className={twMerge("form-fieldset gap-4", className)}
          >
            {Object.entries(options).map(([optionValue, optionLabel]) => (
              <label
                key={optionValue}
                className="inline-flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  name={fieldName}
                  value={optionValue}
                  defaultChecked={checkedValues.includes(optionValue)}
                  {...props}
                />
                <span className="text-sm">{optionLabel}</span>
              </label>
            ))}
          </fieldset>
        );
      }}
    </Field>
  );
}
