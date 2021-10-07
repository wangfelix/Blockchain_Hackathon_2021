import { ContributeDataPageAction, ModalAction } from "State/Actions/actions";
import { ActionType } from "State/Actions/actionTypes";

export type ModalState = {
    age: AgeState;
    gender: GenderState;
};

type AgeState = {
    indexAge: number;
    isAgeExists: boolean;
    minAge: number;
    maxAge: number;
    numberFalsyAgeValues: number;
};

type GenderState = {
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
    state: ModalState = {
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

        default:
            return state;
    }
};
