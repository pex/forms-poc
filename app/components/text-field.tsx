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
  const { value, errors } = useFieldState(name);
  const errorId = `errors-${name}`;
  const hasErrors = errors && errors.length > 0;

  return (
    <div className="w-xs">
      <label className="label" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        defaultValue={value as string}
        aria-invalid={hasErrors || undefined}
        aria-describedby={hasErrors ? errorId : undefined}
        className={`input validator ${className ?? ""}`}
        {...props}
      />
      {hasErrors && (
        <p className="validator-hint" id={errorId}>
          {errors.join(", ")}
        </p>
      )}
    </div>
  );
}
