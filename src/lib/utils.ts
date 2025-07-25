import {differenceInYears} from "date-fns"
import { FieldValues, Path, UseFormSetError } from "react-hook-form"
import { ZodIssue } from "zod"


export function calculateAge(birthday: Date){
    const today = new Date();
    const age = differenceInYears(today, birthday);
    return age;
}

export function getFormServerErrors <TFieldValues extends FieldValues> (
    errorResponse: {error: string | ZodIssue[]},
    setError: UseFormSetError<TFieldValues>
){
    if (Array.isArray(errorResponse.error)){
        errorResponse.error.forEach((e) => {
            const fieldName = e.path.join(".") as Path<TFieldValues>;
            setError(fieldName, {message: e.message})
        })
    }else {
        setError("root.serverError", {message: errorResponse.error})
    }
}