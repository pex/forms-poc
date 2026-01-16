import { submitForm, autoSaveForm, FormInputs } from "./actions/submit-form";
import { TextField } from "./components/text-field";
import { CheckboxList } from "./components/checkbox-list";
import { SubmitButton } from "./components/submit-button";
import { Form } from "./components/form";
import DependendField from "./components/dependend-field";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-base-200">
      <main className="flex min-h-screen w-full max-w-3xl flex-col py-32 px-16 bg-base-100">
        <Form
          action={submitForm}
          autoSaveAction={autoSaveForm}
          initialState={{
            success: false,
            message: "",
            inputs: { title: "", list: [], depender: "" },
          }}
        >
          <fieldset className="fieldset bg-base-200 p-4">
            <legend className="fieldset-legend">Basic</legend>
            <TextField<FormInputs>
              name="title"
              label="Title"
              placeholder="Awesome title"
            />
          </fieldset>
          <fieldset className="fieldset bg-base-200 p-4 mb-4">
            <legend className="fieldset-legend">List</legend>
            <CheckboxList<FormInputs>
              name="list"
              options={{
                one: "One",
                two: "Two",
              }}
            />
          </fieldset>
          <fieldset className="fieldset bg-base-200 p-4 mb-4">
            <legend className="fieldset-legend">Depender</legend>
            <DependendField />
          </fieldset>
          <fieldset>
            <SubmitButton>Submit form</SubmitButton>
          </fieldset>
        </Form>
      </main>
    </div>
  );
}
