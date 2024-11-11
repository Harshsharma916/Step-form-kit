"use client";

import {
  MultiSelectInput,
  RadioInput,
  TextInput,
} from "@/components/formFieldComponents";
import { FormElementsContext } from "@/utils/context";
import {
  FormElement,
  FormElementKeys,
  InputTypes,
  keyTolabel,
  ValidationTypes,
} from "@/utils/interfaces";
import React, { useContext, useState } from "react";
import styles from "./createForm.module.css";
import { MdOutlineCancel } from "react-icons/md";

const CreateForm = () => {
  const { formElements, setFormElements, addFormElement, updateFormElement } =
    useContext(FormElementsContext);
  const [singleFormElement, setSingleFormElement] = useState<FormElement>({});
  const [error, setError] = useState<any>();
  const [optionText, setOptionText] = useState<string>("");
  const formElementsNames = formElements?.map((item) => item.name);
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
  const requiredFormKeys: FormElementKeys[] = ["name", "label", "inputType"];
  const validationTypes: ValidationTypes[] = ["email", "phoneNumber"];
  const inputTypes: InputTypes[] = [
    "text",
    "number",
    "checkbox",
    "radio",
    "email",
    "password",
    "select",
    "multi-select",
  ];

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
    for (const key of requiredFormKeys) {
      if (!singleFormElement[key]) {
        setError({ [key]: "This is a required field" });
        return;
      }
    }
    addFormElement(singleFormElement);
    setSingleFormElement({});
    setError({});
  };

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
                    label={`${keyTolabel(formKey)}:`}
                    className={styles.inputField}
                    value={singleFormElement.conditionFor}
                    options={formElementsNames?.map((item) => {
                      return { label: item, value: item };
                    })}
                    onSelectChange={handleSelectOption}
                  />
                )
              );
            case "required":
            case "editable":
              return (
                <RadioInput
                  key={idx}
                  name={formKey}
                  options={["true", "false"]}
                  label={`${keyTolabel(formKey)}:`}
                  value={singleFormElement[formKey]}
                  onChange={(option: boolean) =>
                    setSingleFormElement({
                      ...singleFormElement,
                      [formKey]: option,
                    })
                  }
                  className={styles.inputField}
                />
              );
            case "validation":
              return (
                <RadioInput
                  key={idx}
                  name={formKey}
                  options={validationTypes}
                  label={`${keyTolabel(formKey)}:`}
                  value={singleFormElement[formKey]}
                  onChange={(option: ValidationTypes) =>
                    setSingleFormElement({
                      ...singleFormElement,
                      [formKey]: option,
                    })
                  }
                  className={styles.inputField}
                />
              );
            case "inputType":
              return (
                <div key={idx}>
                  <RadioInput
                    name={formKey}
                    options={inputTypes}
                    label={`${keyTolabel(formKey)}:`}
                    value={singleFormElement[formKey]}
                    onChange={(option: InputTypes) =>
                      setSingleFormElement({
                        ...singleFormElement,
                        [formKey]: option,
                      })
                    }
                    className={styles.inputField}
                    required={true}
                    error={error?.[formKey]}
                  />
                  {(singleFormElement.inputType == "checkbox" ||
                    singleFormElement.inputType == "radio" ||
                    singleFormElement.inputType == "select" ||
                    singleFormElement.inputType == "multi-select") && (
                    <div className={styles.optionCont}>
                      <div className={styles.optionList}>
                        {singleFormElement?.options?.map(
                          (option: any, idx: number) => (
                            <div key={idx}>
                              <p>{option} </p>
                              <MdOutlineCancel
                                size={12}
                                onClick={() => {
                                  setSingleFormElement({
                                    ...singleFormElement,
                                    options: singleFormElement.options.filter(
                                      (e: any) => e != option
                                    ),
                                  });
                                }}
                              />
                            </div>
                          )
                        )}
                      </div>
                      <div className={styles.createOption}>
                        <TextInput
                          name={"options"}
                          label={"Options"}
                          value={optionText}
                          onChange={(e: any) => setOptionText(e.target.value)}
                          className={styles.inputField}
                          error={error?.[formKey]}
                        />
                        <button
                          onClick={() => {
                            singleFormElement?.options?.length > 0
                              ? singleFormElement.options.push(optionText)
                              : (singleFormElement.options = [optionText]);
                            setSingleFormElement(singleFormElement);
                            setOptionText("");
                          }}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            default:
              return (
                <TextInput
                  key={idx}
                  name={formKey}
                  label={`${keyTolabel(formKey)}:`}
                  value={singleFormElement[formKey]}
                  onChange={(e: any) =>
                    setSingleFormElement({
                      ...singleFormElement,
                      [formKey]: e.target.value,
                    })
                  }
                  required={requiredFormKeys.includes(formKey)}
                  className={styles.inputField}
                  error={error?.[formKey]}
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
