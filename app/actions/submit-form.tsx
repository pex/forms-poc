"use server";

import z from "zod";
import { ActionResponse } from "../types/form";

const formSchema = z.object({
  title: z.string().min(3, "Title must have at least 3 characters"),
  list: z.array(z.string()).min(1, "At least one item must be selected"),
  depender: z.string()
});

export type FormInputs = z.input<typeof formSchema>;

function getInputs(formData: FormData): FormInputs {
  return {
    title: formData.get("title") as string,
    list: formData.getAll("list") as string[],
    depender: formData.get("depender") as string
  };
}

export async function submitForm(
  _prevState: ActionResponse<FormInputs> | null,
  formData: FormData,
): Promise<ActionResponse<FormInputs>> {
  const inputs = getInputs(formData);
  const result = formSchema.safeParse(inputs);

  if (!result.success) {
    return {
      success: false,
      message: "Please fix the errors in the form",
      errors: result.error.flatten().fieldErrors,
      inputs,
    };
  }

  return {
    success: true,
    message: "Form saved successfully!",
    inputs,
  };
}

export async function autoSaveForm(
  _prevState: ActionResponse<FormInputs> | null,
  formData: FormData,
): Promise<ActionResponse<FormInputs>> {
  const inputs = getInputs(formData);

  return {
    success: true,
    message: "Saved successfully!",
    notify: true,
    inputs,
  };
}
