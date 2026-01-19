import { submitForm, autoSaveForm, FormInputs } from "./actions/submit-form";
import {
  Form,
  TextField,
  TextAreaField,
  SelectField,
  RadioGroupField,
  CheckboxListField,
  SubmitButton,
} from "./components";
import DependentField from "./components/dependent-field";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/20">
      <main className="flex min-h-screen w-full max-w-3xl flex-col py-32 px-16 bg-background">
        <h1 className="text-2xl font-bold mb-8">Form Components Demo</h1>
        <Form<FormInputs>
          action={submitForm}
          autoSaveAction={autoSaveForm}
          initialInputs={{
            title: "",
            description: "",
            category: "",
            priority: "",
            tags: [],
            depender: "",
          }}
        >
          {/* TextField */}
          <fieldset className="border border-border rounded-md p-4 mb-4">
            <legend className="px-2 text-sm font-medium text-muted">
              TextField
            </legend>
            <TextField<FormInputs>
              name="title"
              label="Title"
              placeholder="Enter a title (min 3 chars)"
            />
          </fieldset>

          {/* TextAreaField */}
          <fieldset className="border border-border rounded-md p-4 mb-4">
            <legend className="px-2 text-sm font-medium text-muted">
              TextAreaField
            </legend>
            <TextAreaField<FormInputs>
              name="description"
              label="Description"
              placeholder="Enter a description (min 10 chars)"
              rows={4}
            />
          </fieldset>

          {/* SelectField */}
          <fieldset className="border border-border rounded-md p-4 mb-4">
            <legend className="px-2 text-sm font-medium text-muted">
              SelectField
            </legend>
            <SelectField<FormInputs>
              name="category"
              label="Category"
              options={{
                "": "-- Select a category --",
                bug: "Bug Report",
                feature: "Feature Request",
                docs: "Documentation",
                question: "Question",
              }}
            />
          </fieldset>

          {/* RadioGroupField */}
          <fieldset className="border border-border rounded-md p-4 mb-4">
            <legend className="px-2 text-sm font-medium text-muted">
              RadioGroupField
            </legend>
            <RadioGroupField<FormInputs>
              name="priority"
              options={{
                low: "Low",
                medium: "Medium",
                high: "High",
              }}
            />
          </fieldset>

          {/* CheckboxListField */}
          <fieldset className="border border-border rounded-md p-4 mb-4">
            <legend className="px-2 text-sm font-medium text-muted">
              CheckboxListField
            </legend>
            <CheckboxListField<FormInputs>
              name="tags"
              options={{
                frontend: "Frontend",
                backend: "Backend",
                design: "Design",
                devops: "DevOps",
              }}
            />
          </fieldset>

          {/* Dependent Field - shows when title has value */}
          <fieldset className="border border-border rounded-md p-4 mb-4">
            <legend className="px-2 text-sm font-medium text-muted">
              Conditional Field (depends on Title)
            </legend>
            <DependentField />
          </fieldset>

          {/* Submit */}
          <fieldset className="flex gap-4">
            <SubmitButton>Submit form</SubmitButton>
          </fieldset>
        </Form>
      </main>
    </div>
  );
}
