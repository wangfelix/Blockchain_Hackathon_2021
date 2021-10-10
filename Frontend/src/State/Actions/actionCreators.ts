import { ActionType } from "State/Actions/actionTypes";
import { FalsyGenderValue } from "State/Reducers/contributeDataPageReducer";

// -- MODALS --

export const setRegistrationModalOpen = (isOpen: boolean) => {
    return { type: ActionType.SET_IS_REGISTRATION_MODAL_OPEN, payload: isOpen };
};

export const setSettingsModalOpen = (isOpen: boolean) => {
    return { type: ActionType.SET_IS_SETTINGS_MODAL_OPEN, payload: isOpen };
};

// -- CONTRIBUTE DATA PAGE --

// AGE

export const setIsAgeExists = (isAgeExists: boolean) => {
    return { type: ActionType.SET_IS_AGE_EXISTS, payload: isAgeExists };
};

export const setIndexAge = (index: number) => {
    return { type: ActionType.SET_INDEX_AGE, payload: index };
};

export const setMinAge = (minAge: number) => {
    return { type: ActionType.SET_MIN_AGE, payload: minAge };
};

export const setMaxAge = (maxAge: number) => {
    return { type: ActionType.SET_MAX_AGE, payload: maxAge };
};

export const setNumberFalsyAgeValues = (numberFalsyAgeValues: number) => {
    return { type: ActionType.SET_NUMBER_FALSY_AGE_VALUES, payload: numberFalsyAgeValues };
};

// GENDER

export const setIsMaleExists = (isMaleExists: boolean) => {
    return { type: ActionType.SET_IS_MALE_GENDER_EXISTS, payload: isMaleExists };
};

export const setMaleOccurrences = (maleOccurrences: number) => {
    return { type: ActionType.SET_MALE_GENDER_OCCURRENCES, payload: maleOccurrences };
};

export const setIsFemaleExists = (isFemaleExists: boolean) => {
    return { type: ActionType.SET_IS_FEMALE_GENDER_EXISTS, payload: isFemaleExists };
};

export const setFemaleOccurrences = (femaleOccurrences: number) => {
    return { type: ActionType.SET_FEMALE_GENDER_OCCURRENCES, payload: femaleOccurrences };
};

export const setIsTransgenderExists = (isTransgenderExists: boolean) => {
    return { type: ActionType.SET_IS_TRANSGENDER_GENDER_EXISTS, payload: isTransgenderExists };
};

export const setTransgenderOccurrences = (transgenderOccurrences: number) => {
    return { type: ActionType.SET_TRANSGENDER_GENDER_OCCURRENCES, payload: transgenderOccurrences };
};

export const setFalsyGenderValues = (falsyGenderValues: FalsyGenderValue[]) => {
    return { type: ActionType.SET_FALSY_GENDER_VALUES, payload: falsyGenderValues };
};

// LOINC

export const setIsLoincExists = (isLoincExists: boolean) => {
    return { type: ActionType.SET_IS_LOINC_EXISTS, payload: isLoincExists };
};

// RADLEX

export const setIsRadlexExists = (isRadlexExists: boolean) => {
    return { type: ActionType.SET_IS_RADLEX_EXISTS, payload: isRadlexExists };
};

// NUMBER PATIENTS

export const setNumberOfPatients = (numberOfPatients: number) => {
    return { type: ActionType.SET_NUMBER_OF_PATIENTS, payload: numberOfPatients };
};

// NUMBER ATTRIBUTES

export const setNumberOfAttributes = (numberOfAttributes: number) => {
    return { type: ActionType.SET_NUMBER_OF_ATTRIBUTES, payload: numberOfAttributes };
};

// SNOMED

export const setIsSnomedExists = (isSnomedExists: boolean) => {
    return { type: ActionType.SET_IS_SNOMED_EXISTS, payload: isSnomedExists };
};

export const setNumberOfFalsySnomedValues = (numberOfFalsySnomedValues: number) => {
    return { type: ActionType.SET_NUMBER_OF_FALSY_SNOMED_VALUES, payload: numberOfFalsySnomedValues };
};

// DISEASE NAME

export const setDiseaseName = (diseaseName: string) => {
    return { type: ActionType.SET_DISEASE_NAME, payload: diseaseName };
};

// VALUE

export const setDatasetValue = (datasetValue: number) => {
    return { type: ActionType.SET_DATASET_VALUE, payload: datasetValue };
};
