"use server";

import z from "zod";
import { SubmitResponse, AutoSaveResponse } from "../types/form";
import { getInputs } from "../utils/form-data";

const formSchema = z.object({
  title: z.string().min(3, "Title must have at least 3 characters"),
  description: z.string().min(10, "Description must have at least 10 characters"),
  category: z.string().min(1, "Please select a category"),
  priority: z.preprocess((val) => val ?? "", z.string().min(1, "Please select a priority")),
  tags: z.preprocess(
    (val) => (val === undefined ? [] : Array.isArray(val) ? val : [val]),
    z.array(z.string()).min(1, "At least one tag must be selected")
  ),
  depender: z.string(),
});

export type FormInputs = z.input<typeof formSchema>;

export async function submitForm(
  _prevState: SubmitResponse<FormInputs>,
  formData: FormData,
): Promise<SubmitResponse<FormInputs>> {
  const inputs = getInputs<FormInputs>(formData);
  const result = formSchema.safeParse(inputs);

  if (!result.success) {
    return {
      success: false,
      inputs,
      validations: result.error.flatten().fieldErrors,
    };
  }

  return { success: true, inputs };
}

export async function autoSaveForm(
  _prevState: AutoSaveResponse,
  _formData: FormData,
): Promise<AutoSaveResponse> {
  return { success: true, message: "Autosaved" };
}
