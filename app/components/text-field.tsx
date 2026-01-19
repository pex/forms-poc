"use client";

import { InputHTMLAttributes } from "react";
import { useFieldState } from "./form-context";
import { FormFields } from "../types/form";

interface TextFieldProps<TFields extends FormFields>
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "defaultValue" | "name"> {
  name: keyof TFields & string;
  label: string;
}

export function TextField<TFields extends FormFields>({
  name,
  label,
  className,
  ...props
}: TextFieldProps<TFields>) {
  const { value, validationProps, validationHint } = useFieldState<string>(name);

  return (
    <div className="w-xs">
      <label className="label" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        defaultValue={value}
        className={`input validator ${className ?? ""}`}
        {...props}
        {...validationProps}
      />
      {validationHint}
    </div>
  );
}
