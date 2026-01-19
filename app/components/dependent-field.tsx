'use client'

import { FormInputs } from "../actions/submit-form";
import { useFieldState, TextField } from ".";

export default function DependentField() {
  const { value: titleValue } = useFieldState("title");

  if (!titleValue) return null;

  return (
    <div>
      <div role="alert" className="flex items-center gap-3 bg-info-bg border border-info-border text-info-text px-4 py-3 rounded-md mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="h-5 w-5 shrink-0 stroke-current"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <span className="text-sm">As you entered a title, you might enter a dependent now!</span>
      </div>
      <TextField<FormInputs> name="depender" label="Depender" />
    </div>
  );
}
