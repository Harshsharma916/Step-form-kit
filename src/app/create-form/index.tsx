"use client";

import { MultiSelectInput, TextInput } from "@/components/formFieldComponents";
import { FormElementsContext } from "@/utils/context";
import { FormElement, FormElementKeys, keyTolabel } from "@/utils/interfaces";
import React, { useContext, useState } from "react";
import styles from "./createForm.module.css";
import MultiSelectDropdown from "@/components/multiSelectWithDropdown";

const CreateForm = () => {
  const { formElements, setFormElements, addFormElement, updateFormElement } =
    useContext(FormElementsContext);
  const [singleFormElement, setSingleFormElement] = useState<FormElement>({});
  const formElementsNames = formElements?.map((item) => item.name);

  const handleSelectOption = (optionValue: string) => {
    const selectedOptions = singleFormElement.conditionFor || [];
    if (selectedOptions?.includes(optionValue)) {
      setSingleFormElement((prev) => {
        prev.conditionFor = selectedOptions.filter(
          (value) => value != optionValue
        );
        return prev;
      });
    } else {
      selectedOptions?.push(optionValue);
      setSingleFormElement({
        ...singleFormElement,
        conditionFor: selectedOptions,
      });
    }
  };

  const handleOnClick = () => {
    addFormElement(singleFormElement);
    setSingleFormElement({});
  };
  const formKeys: FormElementKeys[] = [
    "name",
    "label",
    "inputType",
    "defaultValue",
    "required",
    "editable",
    "validation",
    "condition",
    "conditionFor",
  ];
  return (
    <div className={styles.createForm}>
      <div className={styles.formSuggestion}>
        <p>Start With</p>
      </div>
      <div className={styles.form}>
        {formKeys.map((formKey: FormElementKeys, idx: number) => {
          switch (formKey) {
            case "conditionFor":
              return (
                singleFormElement.condition && (
                  <MultiSelectInput
                    key={idx}
                    name={formKey}
                    label={keyTolabel(formKey)}
                    className={styles.inputField}
                    value={singleFormElement.conditionFor}
                    options={formElementsNames?.map((item) => {
                      return { label: item, value: item };
                    })}
                    onSelectChange={handleSelectOption}
                  />
                )
              );
            default:
              return (
                <TextInput
                  key={idx}
                  name={formKey}
                  label={keyTolabel(formKey)}
                  value={singleFormElement[formKey]}
                  onChange={(e) =>
                    setSingleFormElement({
                      ...singleFormElement,
                      [formKey]: e.target.value,
                    })
                  }
                  className={styles.inputField}
                />
              );
          }
        })}
        <button className={styles.addButton} onClick={handleOnClick}>
          Add Field
        </button>
      </div>
      <div className={styles.displayForm}>
        <p>Created Form</p>
        {formElements.map((item, idx) => (
          <div key={idx} className={styles.displayFormFields}>
            <p>Name:</p>
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateForm;
