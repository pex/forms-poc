"use client";

import {
  FormHTMLAttributes,
  useActionState,
  useRef,
  startTransition,
} from "react";
import { useDebounceCallback } from "usehooks-ts";
import { ActionResponse, FormAction, FormFields } from "../types/form";
import { FormProvider } from "./form-context";

interface FormProps<TFields extends FormFields>
  extends Omit<FormHTMLAttributes<HTMLFormElement>, "action"> {
  action: FormAction<TFields>;
  autoSaveAction?: FormAction<TFields>;
  initialState: ActionResponse<TFields>;
}

export function Form<TFields extends FormFields>({
  action,
  autoSaveAction,
  initialState,
  children,
  ...props
}: FormProps<TFields>) {
  const formRef = useRef<HTMLFormElement>(null);
  const [formSubmitState, formSubmitAction] = useActionState(
    action,
    initialState,
  );

  const noopAction: FormAction<TFields> = async () => initialState;
  const [autoSaveState, autoSaveSubmitAction] = useActionState(
    autoSaveAction ?? noopAction,
    initialState,
  );

  const debouncedAutoSave = useDebounceCallback(() => {
    if (!autoSaveAction || !formRef.current) return;
    startTransition(() => {
      autoSaveSubmitAction(new FormData(formRef.current!));
    });
  }, 500);

  return (
    <form
      ref={formRef}
      action={formSubmitAction}
      onChange={debouncedAutoSave}
      {...props}
    >
      <FormProvider
        inputs={
          (autoSaveAction ? autoSaveState.inputs : formSubmitState.inputs) ?? {}
        }
        errors={formSubmitState.errors ?? {}}
      >
        {children}
      </FormProvider>
      {autoSaveState.notify && (
        <div className="toast toast-center toast-middle">
          <div className="alert alert-success">
            <span>{autoSaveState.message}</span>
          </div>
        </div>
      )}
    </form>
  );
}
