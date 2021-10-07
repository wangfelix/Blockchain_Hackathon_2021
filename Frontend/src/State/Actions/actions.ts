import { ActionType } from "State/Actions/actionTypes";
import { FalsyGenderValue } from "State/Reducers/contributeDataPageReducer";

// -- MODALS --

export interface RegistrationModalAction {
    type: ActionType.SET_IS_REGISTRATION_MODAL_OPEN;
    payload: boolean;
}

interface SettingsModalAction {
    type: ActionType.SET_IS_SETTINGS_MODAL_OPEN;
    payload: boolean;
}

export type ModalAction = RegistrationModalAction | SettingsModalAction;

// -- CONTRIBUTE DATA PAGE --

// AGE

export interface indexAgeAction {
    type: ActionType.SET_INDEX_AGE;
    payload: number;
}

export interface IsAgeExistsAction {
    type: ActionType.SET_IS_AGE_EXISTS;
    payload: boolean;
}

export interface MinAgeAction {
    type: ActionType.SET_MIN_AGE;
    payload: number;
}

export interface MaxAgeAction {
    type: ActionType.SET_MAX_AGE;
    payload: number;
}

export interface NumberFalsyAgeValuesAction {
    type: ActionType.SET_NUMBER_FALSY_AGE_VALUES;
    payload: number;
}

// GENDER

export interface IsMaleGenderExistsAction {
    type: ActionType.SET_IS_MALE_GENDER_EXISTS;
    payload: boolean;
}

export interface MaleGenderOccurrencesAction {
    type: ActionType.SET_MALE_GENDER_OCCURRENCES;
    payload: number;
}

export interface IsFemaleGenderExistsAction {
    type: ActionType.SET_IS_FEMALE_GENDER_EXISTS;
    payload: boolean;
}

export interface FemaleGenderOccurrencesAction {
    type: ActionType.SET_FEMALE_GENDER_OCCURRENCES;
    payload: number;
}

export interface IsTransgenderGenderExistsAction {
    type: ActionType.SET_IS_TRANSGENDER_GENDER_EXISTS;
    payload: boolean;
}

export interface TransgenderGenderOccurrencesAction {
    type: ActionType.SET_TRANSGENDER_GENDER_OCCURRENCES;
    payload: number;
}

export interface FalsyGenderValuesAction {
    type: ActionType.SET_FALSY_GENDER_VALUES;
    payload: FalsyGenderValue[];
}

export type ContributeDataPageAction =
    | IsAgeExistsAction
    | MinAgeAction
    | MaxAgeAction
    | NumberFalsyAgeValuesAction
    | indexAgeAction
    | IsMaleGenderExistsAction
    | MaleGenderOccurrencesAction
    | IsFemaleGenderExistsAction
    | FemaleGenderOccurrencesAction
    | IsTransgenderGenderExistsAction
    | TransgenderGenderOccurrencesAction
    | FalsyGenderValuesAction;
