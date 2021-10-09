import { ContributeDataPageAction } from "State/Actions/actions";
import { ActionType } from "State/Actions/actionTypes";

export type ContributeDataState = {
    diseaseName: string;
    age: AgeState;
    gender: GenderState;

    loinc: boolean;
    radlex: boolean;
    numberOfPatients: number;
    numberOfAttributes: number;
    snomed: SnomedState;
    datasetValue: number;
};

export type SnomedState = {
    isSnomedExists: boolean;
    numberOfFalsySnomedValues: number;
};

export type AgeState = {
    indexAge: number;
    isAgeExists: boolean;
    minAge: number;
    maxAge: number;
    numberFalsyAgeValues: number;
};

export type GenderState = {
    isMaleExists: boolean;
    numberMaleOccurrences: number;
    isFemaleExists: boolean;
    numberFemaleOccurrences: number;
    isTransgenderExists: boolean;
    numberTransgenderOccurrences: number;
    falsyGenderValues: FalsyGenderValue[];
};

export type FalsyGenderValue = { value: string; numberOccurrences: number };

export const contributeDataPageReducer = (
    state: ContributeDataState = {
        diseaseName: "",
        age: { isAgeExists: false, indexAge: 0, minAge: 0, maxAge: 0, numberFalsyAgeValues: 0 },
        gender: {
            isMaleExists: false,
            numberMaleOccurrences: 0,
            isFemaleExists: false,
            numberFemaleOccurrences: 0,
            isTransgenderExists: false,
            numberTransgenderOccurrences: 0,
            falsyGenderValues: [],
        },
        loinc: false,
        radlex: false,
        numberOfPatients: 0,
        numberOfAttributes: 0,
        snomed: { isSnomedExists: false, numberOfFalsySnomedValues: 0 },
        datasetValue: 0,
    },
    action: ContributeDataPageAction
) => {
    switch (action.type) {
        // AGE

        case ActionType.SET_INDEX_AGE:
            return { ...state, age: { ...state.age, indexAge: action.payload } };

        case ActionType.SET_IS_AGE_EXISTS:
            return { ...state, age: { ...state.age, isAgeExists: action.payload } };

        case ActionType.SET_MIN_AGE:
            return { ...state, age: { ...state.age, minAge: action.payload } };

        case ActionType.SET_MAX_AGE:
            return { ...state, age: { ...state.age, maxAge: action.payload } };

        case ActionType.SET_NUMBER_FALSY_AGE_VALUES:
            return { ...state, age: { ...state.age, numberFalsyAgeValues: action.payload } };

        // GENDER

        case ActionType.SET_IS_MALE_GENDER_EXISTS:
            return { ...state, gender: { ...state.gender, isMaleExists: action.payload } };

        case ActionType.SET_MALE_GENDER_OCCURRENCES:
            return { ...state, gender: { ...state.gender, numberMaleOccurrences: action.payload } };

        case ActionType.SET_IS_FEMALE_GENDER_EXISTS:
            return { ...state, gender: { ...state.gender, isFemaleExists: action.payload } };

        case ActionType.SET_FEMALE_GENDER_OCCURRENCES:
            return { ...state, gender: { ...state.gender, numberFemaleOccurrences: action.payload } };

        case ActionType.SET_IS_TRANSGENDER_GENDER_EXISTS:
            return { ...state, gender: { ...state.gender, isTransgenderExists: action.payload } };

        case ActionType.SET_TRANSGENDER_GENDER_OCCURRENCES:
            return { ...state, gender: { ...state.gender, numberTransgenderOccurrences: action.payload } };

        case ActionType.SET_FALSY_GENDER_VALUES:
            return { ...state, gender: { ...state.gender, falsyGenderValues: action.payload } };

        // LOINC

        case ActionType.SET_IS_LOINC_EXISTS:
            return { ...state, loinc: action.payload };

        // RADLEX

        case ActionType.SET_IS_RADLEX_EXISTS:
            return { ...state, radlex: action.payload };

        // NUMBER PATIENTS

        case ActionType.SET_NUMBER_OF_PATIENTS:
            return { ...state, numberOfPatients: action.payload };

        // NUMBER ATTRIBUTES

        case ActionType.SET_NUMBER_OF_ATTRIBUTES:
            return { ...state, numberOfAttributes: action.payload };

        // SNOMED

        case ActionType.SET_IS_SNOMED_EXISTS:
            return { ...state, snomed: { ...state.snomed, isSnomedExists: action.payload } };

        case ActionType.SET_NUMBER_OF_FALSY_SNOMED_VALUES:
            return { ...state, snomed: { ...state.snomed, numberOfFalsySnomedValues: action.payload } };

        // DISEASE NAME

        case ActionType.SET_DISEASE_NAME:
            return { ...state, diseaseName: action.payload };

        // VALUE

        case ActionType.SET_DATASET_VALUE:
            return { ...state, datasetValue: action.payload };

        default:
            return state;
    }
};
