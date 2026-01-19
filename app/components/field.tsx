"use client";

import { ReactNode } from "react";
import { useFieldState } from "./form-context";
import { FormFields } from "../types/form";

interface FieldProps<TFields extends FormFields> {
  name: keyof TFields & string;
  label?: string;
  children: (props: {
    id: string;
    name: string;
    defaultValue: string | string[] | undefined;
    validationProps: {
      "aria-invalid"?: boolean;
      "aria-describedby"?: string;
    };
  }) => ReactNode;
}

export function Field<TFields extends FormFields>({
  name,
  label,
  children,
}: FieldProps<TFields>) {
  const { value, validationProps, validationHint } = useFieldState<string | string[]>(name);

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium mb-1" htmlFor={name}>
          {label}
        </label>
      )}
      {children({
        id: name,
        name,
        defaultValue: value,
        validationProps,
      })}
      {validationHint}
    </div>
  );
}
