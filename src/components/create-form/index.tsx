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
import { Button, Input, Tag } from "@/components/common";
import { CiCircleCheck } from "react-icons/ci";
import axios from "axios";

const CreateForm = () => {
  const { formElements, setFormElements, addFormElement, updateFormElement } =
    useContext(FormElementsContext);
  const [singleFormElement, setSingleFormElement] = useState<FormElement>({});
  const [error, setError] = useState<any>();
  const [optionText, setOptionText] = useState<string>("");
  const [sections, setSections] = useState<string[]>([]);
  const [searchSection, setSearchSection] = useState<string>("");
  const [selectedSection, setSelectedSection] = useState<string>("");
  const formElementsNames = formElements?.map((item) => item.name);
  const formElementsWithSection = formElements?.reduce(
    (acc: { [key: string]: FormElement[] }, current: FormElement) => {
      if (current.section) {
        if (acc[current.section]) {
          acc[current.section].push(current);
        } else {
          acc[current.section] = [current];
        }
      } else {
        if (!acc["default"]) {
          acc["default"] = [];
        }
        acc["default"].push(current);
      }
      return acc;
    },
    { default: [] }
  );

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
    addFormElement({ ...singleFormElement, section: selectedSection });
    setSingleFormElement({});
    setError({});
  };

  const handleSubmitCreatedForm = () => {
    try {
      const res = axios.post("/api/submitCreatedForm", { form: formElements });
      console.log({ res });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.createForm}>
      <div className={styles.editCont}>
        <div>
          <p>Sections</p>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Input
              value={searchSection}
              onChange={(e: any) => setSearchSection(e.target.value)}
              width={"100%"}
            />
            <Button
              width={120}
              onChange={() => {
                setSections([...sections, searchSection]);
                setSearchSection("");
              }}
              styles={{ padding: "8px", border: "1px solid white" }}
            >
              Create
            </Button>
          </div>
          <div className={styles.sectionList}>
            {sections?.map((section: string, idx: number) => (
              <Tag
                width={"max-content"}
                key={idx}
                styles={{ cursor: "pointer" }}
                onChange={() => setSelectedSection(section)}
              >
                {section}
                {selectedSection == section && <CiCircleCheck />}
              </Tag>
            ))}
          </div>
        </div>
        <div>
          <p>Start With</p>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Input value={""} onChange={(e: any) => {}} width={"100%"} />
            <Button
              width={120}
              onChange={() => {}}
              styles={{ padding: "8px", border: "1px solid white" }}
            >
              Search
            </Button>
          </div>
        </div>
      </div>
      <div className={styles.form}>
        <Tag
          width={"max-content"}
          styles={{ backgroundColor: "rgb(255, 229, 156)" }}
        >
          {selectedSection ? selectedSection : "Default"}
        </Tag>
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
        <Button
          onChange={handleOnClick}
          width={"30%"}
          styles={{ marginLeft: "auto", marginTop: "10px" }}
        >
          Add Field
        </Button>
      </div>
      <div className={styles.displayForm}>
        <p>Created Form</p>
        {Object.entries(formElementsWithSection)?.map(
          (item: any, idx: number) => {
            const key = item[0];
            const value = item[1];
            return (
              <div key={idx}>
                <Tag width={"max-content"} styles={{ marginBottom: "10px" }}>
                  {key}
                </Tag>
                {value.map((item: any, idx: number) => (
                  <div key={idx} className={styles.displayFormFields}>
                    <p>Form Field:</p>
                    <p>{item.name}</p>
                  </div>
                ))}
              </div>
            );
          }
        )}
        <Button
          onChange={handleSubmitCreatedForm}
          width={"40%"}
          styles={{
            marginLeft: "auto",
            marginTop: "auto",
            border: "1px solid white",
          }}
        >
          Submit Form
        </Button>
      </div>
    </div>
  );
};

export default CreateForm;
