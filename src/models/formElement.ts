import { FormElement } from "@/utils/interfaces";
import mongoose, { Document, Schema } from "mongoose";

const formElementSchema = new Schema<any>({
  name: { type: String },
  label: { type: String },
  validation: { type: String, enum: ["email", "phoneNumber"] },
  editable: { type: Boolean },
  inputType: {
    type: String,
    enum: [
      "text",
      "number",
      "email",
      "password",
      "checkbox",
      "radio",
      "select",
      "multi-select",
    ],
  },
  required: { type: Boolean },
  options: { type: Schema.Types.Mixed },
  defaultValue: { type: Schema.Types.Mixed },
  condition: { type: String },
  conditionFor: { type: [String] },
  section: { type: String, default: "default" },
});

const createdFormSchema = new Schema<any>(
  {
    form: [{ type: formElementSchema }],
  },
  { timestamps: true }
);

const CreateFormModel =
  mongoose.models.CreatedForm ||
  mongoose.model("CreatedForm", formElementSchema);

export { CreateFormModel };
