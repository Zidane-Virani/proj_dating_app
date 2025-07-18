import {differenceInYears} from "date-fns"

export function calculateAge(birthday: Date){
    const today = new Date();
    const age = differenceInYears(today, birthday);
    return age;
}