// Checks if the given String array contains a string matching "Age", "Alter", "Lebensalter" (all case-insensitive)
// If so, return the index. If not, return false
export const containsAgeColumn = (arr: string[]) => {
    const ageRegEx = /age|(lebens)?alter/i;

    for (let index = 0; index < arr.length; index++) {
        if (ageRegEx.test(arr[index])) {
            return index;
        }
    }

    return -1;
};

export const containsGenderColumn = (arr: string[]) => {
    const genderRegEx = /sex|gender|geschlecht|m\/w/i;

    for (let index = 0; index < arr.length; index++) {
        if (genderRegEx.test(arr[index])) {
            return index;
        }
    }

    return -1;
};
