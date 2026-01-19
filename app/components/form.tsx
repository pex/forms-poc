"use client";

import {
  FormHTMLAttributes,
  useActionState,
  useRef,
  useState,
  useEffect,
  startTransition,
} from "react";
import { useDebounceCallback } from "usehooks-ts";
import {
  SubmitResponse,
  AutoSaveResponse,
  SubmitAction,
  AutoSaveAction,
  FormFields,
} from "../types/form";
import { FormProvider } from "./form-context";
import { getInputs } from "../utils/form-data";

interface FormProps<TFields extends FormFields>
  extends Omit<FormHTMLAttributes<HTMLFormElement>, "action"> {
  action: SubmitAction<TFields>;
  autoSaveAction?: AutoSaveAction;
  initialInputs: TFields;
}

export function Form<TFields extends FormFields>({
  action,
  autoSaveAction,
  initialInputs,
  children,
  ...props
}: FormProps<TFields>) {
  const formRef = useRef<HTMLFormElement>(null);
  const [liveInputs, setLiveInputs] = useState<TFields>(initialInputs);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [autoSaveState, autoSaveSubmitAction] = useActionState<AutoSaveResponse, FormData>(
    autoSaveAction ?? (async () => ({ success: true })),
    { success: true },
  );

  const [formSubmitState, formSubmitAction] = useActionState<SubmitResponse<TFields>, FormData>(
    action,
    { success: true, inputs: initialInputs },
  );

  const debouncedAutoSave = useDebounceCallback(() => {
    if (!autoSaveAction || !formRef.current) return;
    startTransition(() => {
      autoSaveSubmitAction(new FormData(formRef.current!));
    });
  }, 500);

  const handleChange = () => {
    if (!formRef.current) return;
    setLiveInputs(getInputs<TFields>(new FormData(formRef.current)));
    debouncedAutoSave();
  };

  useEffect(() => {
    if (formSubmitState.validations && formRef.current) {
      const firstErrorField = formRef.current.querySelector<HTMLElement>('[aria-invalid="true"]');
      firstErrorField?.focus();
    }
  }, [formSubmitState.validations]);

  useEffect(() => {
    if (autoSaveState.message) {
      setToastMessage(autoSaveState.message);
      const timeout = setTimeout(() => setToastMessage(null), 2000);
      return () => clearTimeout(timeout);
    }
  }, [autoSaveState]);

  return (
    <form
      ref={formRef}
      action={formSubmitAction}
      onChange={handleChange}
      {...props}
    >
      <FormProvider
        inputs={liveInputs}
        validations={formSubmitState.validations ?? {}}
      >
        {children}
      </FormProvider>
      {toastMessage && (
        <div className="fixed bottom-4 right-4 z-50 animate-fade-in">
          <div className="bg-success-bg border border-success-border text-success-text px-4 py-2 rounded-md shadow-lg">
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </form>
  );
}
