"use client";

import { createContext, useContext } from "react";
import { FormFields, FormErrors } from "../types/form";

interface FormContextValue<TFields extends FormFields> {
  inputs: TFields;
  errors: FormErrors<TFields>;
}

const FormContext = createContext<FormContextValue<FormFields> | null>(null);

interface FormProviderProps<TFields extends FormFields>
  extends FormContextValue<TFields> {
  children: React.ReactNode;
}

export function FormProvider<TFields extends FormFields>({
  inputs,
  errors,
  children,
}: FormProviderProps<TFields>) {
  return (
    <FormContext.Provider value={{ inputs, errors }}>
      {children}
    </FormContext.Provider>
  );
}

export function useFormContext<TFields extends FormFields>() {
  const context = useContext(FormContext) as FormContextValue<TFields> | null;
  if (!context) {
    throw new Error("useFormContext must be used within a Form");
  }
  return context;
}

export function useFieldState<T = unknown>(name: string) {
  const { inputs, errors } = useFormContext();

  return {
    value: inputs[name] as T | undefined,
    errors: errors[name],
  };
}
