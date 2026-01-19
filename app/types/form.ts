export type FormFields = Record<string, unknown>;

export type FieldValidations<TFields extends FormFields> = {
  [K in keyof TFields]?: string[];
};

export interface ActionResponse<TFields extends FormFields> {
  success: boolean;
  message: string;
  notify?: boolean;
  inputs?: TFields;
  validations?: FieldValidations<TFields>;
}

export type FormAction<TFields extends FormFields> = (
  prevState: ActionResponse<TFields> | null,
  formData: FormData,
) => Promise<ActionResponse<TFields>>;
