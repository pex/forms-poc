export type FormFields = Record<string, unknown>;

export type FieldValidations<TFields extends FormFields> = {
  [K in keyof TFields]?: string[];
};

export interface SubmitResponse<TFields extends FormFields> {
  success: boolean;
  message?: string;
  inputs: TFields;
  validations?: FieldValidations<TFields>;
}

export interface AutoSaveResponse {
  success: boolean;
  message?: string;
}

export type SubmitAction<TFields extends FormFields> = (
  prevState: SubmitResponse<TFields>,
  formData: FormData,
) => Promise<SubmitResponse<TFields>>;

export type AutoSaveAction = (
  prevState: AutoSaveResponse,
  formData: FormData,
) => Promise<AutoSaveResponse>;
