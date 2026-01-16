# React Forms POC

A proof-of-concept for building forms in Next.js with React Server Actions, featuring auto-save and type-safe form state management.

## Features

- **Server Actions** - Form submission and auto-save via React Server Actions
- **Auto-save** - Debounced auto-save on field changes (500ms)
- **Type-safe** - Generic types flow from schema through context to fields
- **Zod validation** - Schema validation with field-level error messages
- **Context-based state** - Form fields automatically receive their values and errors via React Context

## Architecture

```
Form (useActionState + context provider)
  └── FormProvider (inputs + errors)
        ├── TextField (useFieldState)
        ├── CheckboxList (useFieldState)
        └── ...
```

## Key Files

- `app/types/form.ts` - Shared types (`FormFields`, `ActionResponse`, `FormAction`)
- `app/components/form.tsx` - Main form component with submit and auto-save actions
- `app/components/form-context.tsx` - Context provider and `useFieldState` hook
- `app/components/text-field.tsx` - Text input component
- `app/components/checkbox-list.tsx` - Checkbox group component
- `app/actions/submit-form.tsx` - Server actions with Zod validation

## Usage

```tsx
<Form
  action={submitForm}
  autoSaveAction={autoSaveForm}
  initialState={{
    success: false,
    message: "",
    inputs: { title: "", list: [] },
  }}
>
  <TextField name="title" label="Title" />
  <CheckboxList name="list" options={{ one: "One", two: "Two" }} />
  <button type="submit">Submit</button>
</Form>
```

Fields automatically receive their values and errors from context - no prop drilling required.

## Running

```bash
npm install
npm run dev
```
