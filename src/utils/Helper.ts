import { useEffect, useState } from "react";

export const ucwords = (str:string) => {
	return (str + '').replace(/^([a-z])|\s+([a-z])/g, function ($1) {
		return $1.toUpperCase();
	});
}

export const isObjectEmpty = (objectName:object) => {
    return Object.keys(objectName).length > 0
}

export const convertDateToTimeStamp = (date:string) => {
	return new Date(date).getTime();
}
export const convertGmtToDate = (GmtDate:string) => {
	const date = new Date(GmtDate);
	date.setHours(5, 30, 0, 0);
	const formatedDate = date.toISOString().split('T')[0];
	console.log('formatedDate',formatedDate);
	return formatedDate;
}

export const responseErrorHandling = (errorsResponse:object,setError:any) => {
	let errors = Object.entries(errorsResponse);
	errors.forEach(([field, value]) => {
		setError(field, { type: 'custom', message: value });
	});
    return Object.keys(errors).length > 0
}

export const convertDataToFormData = (data) => {
	const formData = new FormData();

	// Append all fields from `data` to FormData
	Object.entries(data).forEach(([key, value]) => {
		if (value instanceof File || value instanceof Blob) {
			// Handle files
			formData.append(key, value);
		} else if (Array.isArray(value)) {
			// Handle arrays
			value.forEach((item, index) => {
				formData.append(`${key}[${index}]`, item);
			});
		} else if (typeof value === 'object' && value !== null) {
			// Serialize nested objects
			formData.append(key, JSON.stringify(value));
		} else {
			// Append primitive types
			formData.append(key, value);
		}
	});

	return formData;
}

// export function useDebounce<T>(value: T, delay: number): T {
//     const [debouncedValue, setDebouncedValue] = useState<T>(value);

//     useEffect(() => {
//         const handler = setTimeout(() => {
//             setDebouncedValue(value);
//         }, delay);

//         return () => {
//             clearTimeout(handler);
//         };
//     }, [value, delay]);

//     return debouncedValue;
// }

export const useDebounce = (callback:any, delay:number) => {
    const [timeoutId, setTimeoutId] = useState(null);

    const debouncedFunction = (...args) => {
        if (timeoutId) clearTimeout(timeoutId);
        const id = setTimeout(() => callback(...args), delay);
        setTimeoutId(id);
    };

    return debouncedFunction;
};
