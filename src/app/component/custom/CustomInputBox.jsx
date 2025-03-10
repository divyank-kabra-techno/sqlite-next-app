import { getErrorText } from "@/utils/Validation";
import React, { useEffect } from "react";

export default function CustomInputBox({
  inputType = "text",
  label = "",
  fields,
  register,
  fieldName,
  errors,
  setError,
  clearErrors,
  setValue,
}) {
  useEffect(() => {
    if (fields.value) {
      setValue(fieldName, fields.value);
    }
  }, []);

  const _labelName = label.replace(" ", "_").toLowerCase();
  //const _labelName = "Customer Name".replace(' ','_').toLowerCase();
  const validateField = (name, value) => {
    const error = getErrorText(name, value); // Use your custom validation
    if (error) {
      setError(fieldName, { type: "custom", message: error });
    } else {
      clearErrors(fieldName);
    }
  };

  return (
    <div
      className={`field ${
        fields?.className ?? "grid-cols-1 md:grid-cols-2"
      } mb-2 relative `}
    >
      {label && (
        <label
          className={`font-medium md:text-md text-sm mt-2 mb-0 block text-500`}
          htmlFor={fieldName}
        >
          {label}
        </label>
      )}
      <input
        {...register}
        id={fieldName}
        type={inputType}
        placeholder={fields.placeholder}
        className={`${
            errors?.[fieldName] ? `border-red-500 mb-1 error-input` : `border p-1 px-2 w-full rounded-md shadow-sm`
          } mt-2 `}
        onInput={(e) => validateField(_labelName, e.target.value)}
      />
      {errors?.[fieldName] && (
        // <small className="text-red-500 px-1 absolute bottom-0 right-0 bg-white mx-5">{errors[fieldName].message}</small>
        <small className="text-red-500 px-1">{errors[fieldName].message}</small>
      )}
    </div>
  );
}
