export interface FormElement {
  name?: string;
  label?: string;
  validation?: ValidationTypes;
  editable?: boolean;
  inputType?: InputTypes;
  required?: boolean;
  options?: any;
  defaultValue?: any;
  condition?: string;
  conditionFor?: string[];
}

export type ValidationTypes = "email" | "phoneNumber";
export type FormElementKeys =
  | "name"
  | "label"
  | "validation"
  | "editable"
  | "inputType"
  | "required"
  | "defaultValue"
  | "condition"
  | "conditionFor";

export type InputTypes =
  | "text"
  | "number"
  | "email"
  | "password"
  | "checkbox"
  | "radio"
  | "select"
  | "multi-select";

export const keyTolabel = (key: string) => {
  const t: Record<string, string> = {
    inputType: "Input Type",
    defaultValue: "Default Value",
    conditionFor: "Condition For",
  };
  if (t[key]) return t[key];
  return key;
};
