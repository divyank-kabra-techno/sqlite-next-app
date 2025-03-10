import React from "react";
import CustomInputBox from "./CustomInputBox";
// import CommanButtonCheckBox from "../../Components/CommanButtonCheckBox";
// import CustomTextArea from "../../Components/CustomTextArea";
// import CustomSwitchButton from "../../Components/CustomSwitchButton";
// import CommanSelectBox from "../../Components/CommanSelectBox";
// import CommanImageUpload from "../../Components/CommanImageUpload";
// import CustomMultiSelect from "../../Components/CustomMultiSelect";

export default function GenerateForm ({ 
	formFields,
	register,
	errors,
	setError,
	clearErrors,
	setValue,
	watch
}) {
	return (
		<React.Fragment key="fragment-add-form">
		{formFields.map((field, index) => {
			switch (field.type) {
				case 'text': 
      				return <CustomInputBox
						label={field.label}
						fields={field}
						fieldName={field.fieldName}
						placeholder={field.placeholder}
						register={register}
						errors={errors}
						setError={setError}
						clearErrors={clearErrors}
						setValue={setValue}
						key={`custom-input-${index}`}
					/>;
				break;
				// case 'buttonCheckBox': 
      			// 	return (
				// 		<CommanButtonCheckBox 
				// 			label={field.label}
				// 			fieldName={field.fieldName}
				// 			fields={field}
				// 			options={field.options}
				// 			defaultValue={field.value}
				// 			register={register}
				// 			errors={errors}
				// 			setError={setError}
				// 			clearErrors={clearErrors}
				// 			setValue={setValue}
				// 			key={`custom-select-button-${index}`}
				// 		/>
				// 	);
				// break;
				// case 'textarea': 
      			// 	return (
				// 		<CustomTextArea 
				// 			label={field.label}
				// 			fields={field}
				// 			fieldName={field.fieldName}
				// 			options={field.options}
				// 			defaultValue={field.value}
				// 			register={register}
				// 			errors={errors}
				// 			setError={setError}
				// 			setValue={setValue}
				// 			clearErrors={clearErrors}
				// 			key={`custom-text-area-${index}`}
				// 		/>
				// 	);
				// break;
				// case 'switch-button': 
      			// 	return (
				// 		<CustomSwitchButton 
				// 			label={field.label}
				// 			fields={field}
				// 			fieldName={field.fieldName}
				// 			register={register}
				// 			errors={errors}
				// 			setError={setError}
				// 			clearErrors={clearErrors}
				// 			setValue={setValue}
				// 			watch={watch}
				// 			key={`custom-switch-button-${index}`}
				// 		/>
				// 	);
				// break;
				// case 'selectBox': 
      			// 	return (
				// 		<CommanSelectBox 
				// 			label={field.label}
				// 			fieldName={field.fieldName}
				// 			options={field.options}
				// 			defaultValue={field.value}
				// 			register={register}
				// 			errors={errors}
				// 			setError={setError}
				// 			clearErrors={clearErrors}
				// 			fields={field}
				// 			setValue={setValue}
				// 			watch={watch}
				// 			key={`custom-select-box-${index}`}
				// 		/>
				// 	);
				// break;
				// case 'multiSelectBox': 
      			// 	return (
				// 		<CustomMultiSelect
				// 			label={field.label}
				// 			fieldName={field.fieldName}
				// 			options={field.options}
				// 			defaultValue={field.value}
				// 			register={register}
				// 			errors={errors}
				// 			setError={setError}
				// 			clearErrors={clearErrors}
				// 			fields={field}
				// 			setValue={setValue}
				// 			watch={watch}
				// 			key={`custom-select-box-${index}`}
				// 		/>
				// 	);
				// break;
				// case 'imageUpload': 
      			// 	return (
				// 		<CommanImageUpload
				// 			label={field.label}
				// 			fieldName={field.fieldName}
				// 			options={field.options}
				// 			defaultValue={field.value}
				// 			register={register}
				// 			errors={errors}
				// 			setError={setError}
				// 			clearErrors={clearErrors}
				// 			fields={field}
				// 			setValue={setValue}
				// 			key={`custom-select-box-${index}`}
				// 		/>
				// 	);
				// break;
				default:
				break
			}
		})}
		</React.Fragment>
	)
}
