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
  className = "px-4 py-2 bg-foreground text-background rounded-md hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity",
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} className={className}>
      {pending ? pendingText : children}
    </button>
  );
}
