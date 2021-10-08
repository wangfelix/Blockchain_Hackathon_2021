export const MALE_REGEX: RegExp = /^(\s*(male|m|mann|männlich|xy)\s*)$/i;

export const FEMALE_REGEX: RegExp = /^(\s*(female|frau|weiblich|woman|w|xx)\s*)$/i;

export const TRANSGENDER_REGEX: RegExp = /^(\s*(transgender|trans|)\s*)$/i;

// Checks if the given String array contains a string matching "Age", "Alter", "Lebensalter" (all case-insensitive)
// If so, return the index. If not, return false
export const containsAgeColumn = (arr: string[]) => {
    const ageRegEx = /^(\s*(age|(lebens)?alter)\s*)$/i;

    for (let index = 0; index < arr.length; index++) {
        if (ageRegEx.test(arr[index])) {
            return index;
        }
    }

    return -1;
};

export const containsGenderColumn = (arr: string[]) => {
    const genderRegEx = /^(\s*(sex|gender|geschlecht|m\/w|geschl)\s*)$/i;

    for (let index = 0; index < arr.length; index++) {
        if (genderRegEx.test(arr[index])) {
            return index;
        }
    }

    return -1;
};

export const containsLoincColumn = (arr: string[]) => {
    const loincRegEx = /^(\s*(loinc)\s*)$/i;

    for (let index = 0; index < arr.length; index++) {
        if (loincRegEx.test(arr[index])) {
            return index;
        }
    }

    return -1;
};

export const containsRadlexColumn = (arr: string[]) => {
    const radlexRegEx = /^(\s*(radlex)\s*)$/i;

    for (let index = 0; index < arr.length; index++) {
        if (radlexRegEx.test(arr[index])) {
            return index;
        }
    }

    return -1;
};

export const containsSnomedColumn = (arr: string[]) => {
    const snomedRegEx = /^(\s*(snomed)\s*)$/i;

    for (let index = 0; index < arr.length; index++) {
        if (snomedRegEx.test(arr[index])) {
            return index;
        }
    }

    return -1;
};

export const containsPatientIdColumn = (arr: string[6]) => {
    const patientIdRegEx = /^(\s*(?:(?:patient(?:en)?|pat)(\s|_|-)?(?:number|num|nummer|id|no|nr|nbr))\s*)$/i;

    for (let index = 0; index < arr.length; index++) {
        if (patientIdRegEx.test(arr[index])) {
            return index;
        }
    }

    return -1;
};
