// =============================================================================
// High-level API - Ready-to-use form components with built-in styling
// =============================================================================

// Form container with auto-save and validation support
export { Form } from "./form";

// Pre-styled field components
export { TextField } from "./text-field";
export { TextAreaField } from "./text-area-field";
export { SelectField } from "./select-field";
export { RadioGroupField } from "./radio-group-field";
export { CheckboxListField } from "./checkbox-list-field";

// Form submission button with loading state
export { SubmitButton } from "./submit-button";

// =============================================================================
// Low-level API - Building blocks for custom field implementations
// =============================================================================

// Generic field wrapper for creating custom fields
export { Field } from "./field";

// Form context and hooks for accessing form state
export { FormProvider, useFormContext, useFieldState } from "./form-context";

// =============================================================================
// Types
// =============================================================================

export type {
  FormFields,
  FieldValidations,
  SubmitResponse,
  AutoSaveResponse,
  SubmitAction,
  AutoSaveAction,
} from "../types/form";
