"use client";

import { ReactNode } from "react";
import { useFormStatus } from "react-dom";

interface SubmitButtonProps {
  children?: ReactNode;
  pendingText?: string;
  className?: string;
}

export function SubmitButton({
  children = "Submit",
  pendingText = "Submitting...",
  className = "btn",
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} className={className}>
      {pending ? pendingText : children}
    </button>
  );
}
