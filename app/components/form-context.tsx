"use client";

import { createContext, useContext } from "react";
import { FormFields, FieldValidations } from "../types/form";

interface FormContextValue<TFields extends FormFields> {
  inputs: TFields;
  validations: FieldValidations<TFields>;
}

const FormContext = createContext<FormContextValue<FormFields> | null>(null);

interface FormProviderProps<TFields extends FormFields>
  extends FormContextValue<TFields> {
  children: React.ReactNode;
}

export function FormProvider<TFields extends FormFields>({
  inputs,
  validations,
  children,
}: FormProviderProps<TFields>) {
  return (
    <FormContext.Provider value={{ inputs, validations }}>
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
  const { inputs, validations: allValidations } = useFormContext();
  const value = inputs[name] as T | undefined;
  const validations = allValidations[name];

  const validationId = `validations-${name}`;
  const hasValidations = validations && validations.length > 0;

  const validationProps = {
    "aria-invalid": hasValidations || undefined,
    "aria-describedby": hasValidations ? validationId : undefined,
  };

  const validationHint = hasValidations && (
    <p className="validator-hint" id={validationId}>
      {validations.join(", ")}
    </p>
  );

  return {
    value,
    validations,
    validationProps,
    validationHint,
  };
}
