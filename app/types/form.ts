export type FormFields = Record<string, unknown>;

export type FormErrors<TFields extends FormFields> = {
  [K in keyof TFields]?: string[];
};

export interface ActionResponse<TFields extends FormFields> {
  success: boolean;
  message: string;
  notify?: boolean;
  inputs?: TFields;
  errors?: FormErrors<TFields>;
}

export type FormAction<TFields extends FormFields> = (
  prevState: ActionResponse<TFields> | null,
  formData: FormData,
) => Promise<ActionResponse<TFields>>;
