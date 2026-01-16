'use client'

import { FormInputs } from "../actions/submit-form";
import { useFieldState } from "./form-context";
import { TextField } from "./text-field";

export default function DependendField() {
  const { value: titleValue } = useFieldState("title");

  if (!titleValue) return null;

  return (
    <div>
      <div role="alert" className="alert alert-info mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="h-6 w-6 shrink-0 stroke-current"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <span>As you entered a title, you might enter a dependend now!</span>
      </div>
      <TextField<FormInputs> name="depender" label="Depender" />
    </div>
  );
}
