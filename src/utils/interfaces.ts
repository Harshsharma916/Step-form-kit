import React from "react";

export interface FormElement {
  name?: string;
  label?: string;
  validation?: (value: any) => boolean | string | Promise<boolean | string>;
  editable?: boolean;
  inputType?:
    | "text"
    | "number"
    | "email"
    | "password"
    | "checkbox"
    | "radio"
    | "select"
    | "multi-select";
  required?: boolean;
  options?: any;
  defaultValue?: any;
  condition?: string;
  conditionFor?: string[];
}

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

export const keyTolabel = (key: string) => {
  const t: Record<string, string> = {
    inputType: "Input Type",
    defaultValue: "Default Value",
    conditionFor: "Condition For",
  };
  if (t[key]) return t[key];
  return key;
};
