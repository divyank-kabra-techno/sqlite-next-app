import { ucwords } from "./Helper";
import {CheckStringExist, getFieldName, numberWithSevenLimit, validateEmail, validateMobile, validateName, validatePassword, validatePrice } from "./ValidationExpression";


export const formValidate = (formFields:any,setError:any, clearErrors:any) => {
    let fields = Object.entries(formFields)
    let isAnyError = false;
    fields.forEach(([field, value]) => {
        let isvalidate = validateField(field,value,setError,clearErrors);
        isAnyError = isvalidate?isvalidate:isAnyError;
    });
    return isAnyError;
}

export const validateField = (name:string, value:any, setError:any, clearErrors:any) => {
    let fieldName = getFieldName(name);
    const error = getErrorText(fieldName, value); // Use your custom validation logic
    if (error) {
        setError(name, { type: 'custom', message: error }); // Set custom error for the field
        return true;
    } else {
        clearErrors(name); // Clear errors for the field if validation passes
    }
};

export function getErrorText(errorType:string, fieldValue:string) {
    let error = "";
    let newFieldValue = fieldValue == undefined?'':fieldValue;
    console.log('fild value',newFieldValue,'errorType',errorType);
    //const trimmedValue = (fieldValue != undefined && typeof fieldValue != 'boolean')?fieldValue.trim():fieldValue;
    const trimmedValue = newFieldValue;

    switch (errorType) {
        
        case 'notEmpty':
        if(trimmedValue == ''){
            error = 'Please enter '+ucwords(errorType.replace('_',' '));
        }
        break;
        case "email":
            if (!trimmedValue) {
                error = "Please enter an email address.";
            } else if (!validateEmail(trimmedValue)) {
                error = "Please enter a valid email address.";
            }
        break;

        case "item_name":
        case "package_name":
        case "customer_name":
        case "name":
            if (!trimmedValue) {
                error = `${ucwords(errorType.replace('_',' '))} is required`;
            } else if (!CheckStringExist(trimmedValue)) {
                error =
                    `${ucwords(errorType.replace('_',' '))} should only contain alphabets.`;
            }
        break;
        case "mobile":
            if (!trimmedValue) {
                error = "Please enter a mobile number.";
            } else if (!validateMobile(trimmedValue)) {
                error = "Mobile number must be 7-10 digits.";
            }
        break;
        case 'price':
            if(trimmedValue == ''){
                error = ucwords(errorType.replace('_',' '))+" is mandatory";
            }else if(!validatePrice(trimmedValue)){
                error = ucwords(errorType.replace('_',' '))+" should be number eg: 1000.99 Or 999";
            }
        break;
        case 'category':
		if(trimmedValue == ''){
			error = 'Please select '+ucwords(errorType.replace('_',' '));
		}
		break;	
        case 'installment_amount':
        case 'monthly_amount':
            if(trimmedValue == ''){
                error = ucwords(errorType.replace('_',' '))+" is mandatory";
            }else if(!numberWithSevenLimit(trimmedValue)){
                error = ucwords(errorType.replace('_',' '))+" should be less than 7 digit";
            }
        break;

        case 'discount':
        case 'amount_empty':
		if(trimmedValue != ''){
			errorType = errorType.replace('empty','');
			if(!validatePrice(trimmedValue)){
				error = ucwords(errorType.replace('_',' '))+" should be number or empty";
			}
		}
		break;
        case "password":
            if (!trimmedValue) {
                error = "Please enter a password.";
            } else if (!validatePassword(trimmedValue)) {
                error =
                    "Password must be at least 6 characters with 1 uppercase, 1 lowercase, and 1 number.";
            }
            break;
        default:
            error = '';
        break;
    }
    return error;
}
