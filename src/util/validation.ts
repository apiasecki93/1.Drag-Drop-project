
    //validation object for the form, if you see question mark by the name of the property, it means that it is optional e.g <required?: boolean> alternativly you can use | undefined like: <required: boolean | undefined>
    export interface Validatable {
        value: string | number;
        required?: boolean;
        minLength?: number;
        maxLength?: number;
        min?: number;
        max?: number;
    }



   export function validate(validatebleInput: Validatable) {
        let isValid = true;
        if (validatebleInput.required) {
            isValid = isValid && validatebleInput.value.toString().trim().length !== 0;
        }
        if (validatebleInput.minLength != null && typeof validatebleInput.value === 'string') {
            isValid = isValid && validatebleInput.value.length >= validatebleInput.minLength;
        }
        if (validatebleInput.maxLength != null && typeof validatebleInput.value === 'string') {
            isValid = isValid && validatebleInput.value.length <= validatebleInput.maxLength;
        }
        if (validatebleInput.min != null && typeof validatebleInput.value === 'number') {
            isValid = isValid && validatebleInput.value >= validatebleInput.min;
        }
        if (validatebleInput.max != null && typeof validatebleInput.value === 'number') {
            isValid = isValid && validatebleInput.value <= validatebleInput.max;
        }
        return isValid;
    }

