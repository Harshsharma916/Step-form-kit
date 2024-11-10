import { FormField } from "@/components/formFieldComponents";
import React, { useState } from "react";

const MyForm: React.FC = () => {
  const [formData, setFormData] = useState<any>({
    username: "",
    age: "",
    email: "",
    password: "",
    terms: false,
    gender: "male",
    country: "USA",
  });

  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <form>
      <FormField
        label="Username"
        name="username"
        value={formData.username}
        onChange={handleChange}
        inputType="text"
        required={true}
      />
      <FormField
        label="Age"
        name="age"
        value={formData.age}
        onChange={handleChange}
        inputType="number"
      />
      <FormField
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        inputType="email"
      />
      <FormField
        label="Password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        inputType="password"
      />
      <FormField
        label="Terms and Conditions"
        name="terms"
        value={formData.terms}
        onChange={handleChange}
        inputType="checkbox"
      />
      <FormField
        label="Gender"
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        inputType="radio"
        options={["male", "female", "other"]}
      />
      <FormField
        label="Country"
        name="country"
        value={formData.country}
        onChange={handleChange}
        inputType="select"
        options={["USA", "Canada", "UK", "India"]}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default MyForm;
