"use client";
import { FormElement } from "@/utils/interfaces";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "./fillFrom.module.css";
import { FormField } from "@/components/formFieldComponents";

const FillForm = () => {
  const { slug } = useParams();
  const [formData, setFormData] = useState<FormElement[]>();
  const [formDataWithSections, setFormDataWithSections] = useState<any>();
  // const [sections,setSections] = useState({default:'incomplete'});
  const [next, setNext] = useState<boolean>(false);

  useEffect(() => {
    if (slug) {
      getFormData(slug as string);
    }
  }, [slug]);

  useEffect(() => {
    const formElementsWithSection = formData?.reduce(
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
    console.log({ formElementsWithSection });
    setFormDataWithSections(formElementsWithSection);
  }, [formData]);

  const getFormData = async (id: string) => {
    try {
      const res = await axios.get("/api/getForm?id=" + id);
      console.log({ res });
      if (res.status == 200) {
        setFormData(res.data.form);
      }
    } catch (err) {
      console.log({ err });
    }
  };
  return (
    <div className={styles.fillForm}>
      {formDataWithSections &&
        Object?.entries(formDataWithSections).map((item: any, idx: number) => {
          const section = item[0];
          const formElements = item[1];
          return (
            <div key={idx}>
              {formElements?.map((element: FormElement, idx: number) => {
                const {
                  name,
                  label,
                  required,
                  inputType,
                  validation,
                  options,
                } = element;
                return (
                  <FormField
                    name={name}
                    label={label}
                    inputType={inputType}
                    validation={validation}
                    options={options}
                  />
                );
              })}
            </div>
          );
        })}
    </div>
  );
};

export default FillForm;
