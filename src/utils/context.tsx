"use client";

import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import { FormElement } from "./interfaces";

interface FormElementsContextType {
  formElements: FormElement[];
  setFormElements: Dispatch<SetStateAction<FormElement[]>>;
  addFormElement: (element: FormElement) => void;
  updateFormElement: (
    name: string,
    updatedElement: Partial<FormElement>
  ) => void;
}

const initialVal: FormElementsContextType = {
  formElements: [],
  setFormElements: () => {},
  addFormElement: () => {},
  updateFormElement: () => {},
};

const FormElementsContext = createContext<FormElementsContextType>(initialVal);

// Provider component
export const FormElementsProvider: React.FC<any> = ({ children }) => {
  const [formElements, setFormElements] = useState<FormElement[]>([]);

  const addFormElement = (element: FormElement) => {
    setFormElements((prev) => [...prev, element]);
  };

  const updateFormElement = (
    name: string,
    updatedElement: Partial<FormElement>
  ) => {
    setFormElements((prev) =>
      prev.map((el) => (el.name === name ? { ...el, ...updatedElement } : el))
    );
  };

  return (
    <FormElementsContext.Provider
      value={{
        formElements,
        setFormElements,
        addFormElement,
        updateFormElement,
      }}
    >
      {children}
    </FormElementsContext.Provider>
  );
};

export { FormElementsContext };
