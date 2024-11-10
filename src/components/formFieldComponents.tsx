import { FormElement } from "@/utils/interfaces";
import React from "react";
import MultiSelectDropdown from "./multiSelectWithDropdown";

export interface FormElementProps extends FormElement {
  value?: any;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onSelectChange?: any;
  className?: string;
}
export const TextInput: React.FC<FormElementProps> = ({
  label,
  name,
  value = "",
  onChange,
  required,
  className,
}) => {
  return (
    <div className={className}>
      <label htmlFor={name}>{label}</label>
      <input
        type="text"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

export const NumberInput: React.FC<FormElementProps> = ({
  label,
  name,
  value,
  onChange,
  required,
}) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        type="number"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};
export const EmailInput: React.FC<FormElementProps> = ({
  label,
  name,
  value,
  onChange,
  required,
}) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        type="email"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};
export const PasswordInput: React.FC<FormElementProps> = ({
  label,
  name,
  value,
  onChange,
  required,
}) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        type="password"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

export const CheckboxInput: React.FC<FormElementProps> = ({
  label,
  name,
  value,
  onChange,
  required,
}) => {
  return (
    <div>
      <label htmlFor={name}>
        <input
          type="checkbox"
          id={name}
          name={name}
          checked={value}
          onChange={onChange}
          required={required}
        />
        {label}
      </label>
    </div>
  );
};

export const RadioInput: React.FC<FormElementProps> = ({
  label,
  name,
  value,
  onChange,
  options,
  required,
}) => {
  return (
    <div>
      <label>{label}</label>
      {options.map((option: any, index: number) => (
        <div key={index}>
          <input
            type="radio"
            id={`${name}-${option}`}
            name={name}
            value={option}
            checked={value === option}
            onChange={onChange}
            required={required}
          />
          <label htmlFor={`${name}-${option}`}>{option}</label>
        </div>
      ))}
    </div>
  );
};

export const MultiSelectInput: React.FC<FormElementProps> = ({
  label,
  name,
  value,
  onSelectChange,
  options,
  required,
  className,
}) => {
  return (
    <div className={className}>
      <label htmlFor={name}>{label}</label>
      <MultiSelectDropdown
        value={value}
        options={options}
        onSelectChange={onSelectChange}
      />
    </div>
  );
};

export const FormField: React.FC<FormElementProps> = ({
  label,
  name,
  value,
  onChange,
  inputType,
  options,
  required,
}) => {
  switch (inputType) {
    case "text":
      return (
        <TextInput
          label={label}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
        />
      );
    case "number":
      return (
        <NumberInput
          label={label}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
        />
      );
    case "email":
      return (
        <EmailInput
          label={label}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
        />
      );
    case "password":
      return (
        <PasswordInput
          label={label}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
        />
      );
    case "checkbox":
      return (
        <CheckboxInput
          label={label}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
        />
      );
    case "radio":
      return (
        <RadioInput
          label={label}
          name={name}
          value={value}
          onChange={onChange}
          options={options!}
          required={required}
        />
      );
    case "multi-select":
      return (
        <MultiSelectInput
          label={label}
          name={name}
          value={value}
          onChange={onChange}
          options={options!}
          required={required}
        />
      );
    default:
      return null;
  }
};
