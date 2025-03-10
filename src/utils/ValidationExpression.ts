export function validateName(name:string) {
    return /^(?=.{1,85}$)([a-zA-Z]{1})+([a-zA-Z\s]{0,1})+([ a-zA-Z]{1,100})$/.test(name);
}

export function validateMobile(str:string) {
    return /^\+?([0-9]{2,3})\)?[- ]?([0-9]{5,7})$/.test(str);
}

export function validateEmail(email:string) {
    return /^(?=.{1,80}$)([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9])+$/.test(email);
}

export const validateText = (text)=>{
	return /^[a-zA-Z\s]+$/.test(text);
}

export const CheckStringExist = (a:string) => {
	return a.match(/([a-zA-Z]{3,})+/i);
}

export const stringMatch = (string1:string,string2:string) => {
	return string1 == string2;
}

export const validatePrice = (price:string) => {
	return /^(?=.*[1-9])[0-9]*[.,]?[0-9]{1,2}$/.test(price)
}

export const validateOnlyNumber = (value:string) => {
	return /^[0-9]{3}$/gm.test(value);
}

export const numberWithFourLimit = (number:string) =>{
	return /^([1-9][0-9]{0,2}|1000)$/gm.test(number);
}
export const numberWithSevenLimit = (number:string) =>{
	return /^([1-9][0-9]{0,7}|1000000)$/gm.test(number);
}

export const validatePassword = (password:string) => {
    return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/.test(password);
}


export const getFieldName = (fieldName:string) => {
    switch (fieldName) {
        case 'category_id':
            return 'category';
        break;
        default:
            return fieldName;
        break;
    }
}