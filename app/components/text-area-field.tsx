"use client";

import { TextareaHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { Field } from "./field";
import { FormFields } from "../types/form";

interface TextAreaFieldProps<TFields extends FormFields>
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "defaultValue" | "name"> {
  name: keyof TFields & string;
  label: string;
}

export function TextAreaField<TFields extends FormFields>({
  name,
  label,
  className,
  ...props
}: TextAreaFieldProps<TFields>) {
  return (
    <Field<TFields> name={name} label={label}>
      {({ id, name: fieldName, defaultValue, validationProps }) => (
        <textarea
          id={id}
          name={fieldName}
          defaultValue={defaultValue}
          className={twMerge("form-input", className)}
          {...props}
          {...validationProps}
        />
      )}
    </Field>
  );
}
