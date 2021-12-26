import { ActionType } from "State/Actions/actionTypes";
import { FalsyGenderValue } from "State/Reducers/contributeDataPageReducer";
import { Contribution, Disease } from "State/Reducers/demoPageReducer";

// -- MODALS --

export interface RegistrationModalAction {
    type: ActionType.SET_IS_REGISTRATION_MODAL_OPEN;
    payload: boolean;
}

interface SettingsModalAction {
    type: ActionType.SET_IS_SETTINGS_MODAL_OPEN;
    payload: boolean;
}

interface UserPanelContributionModalAction {
    type: ActionType.SET_IS_USER_PANEL_CONTRIBUTION_MODAL_OPEN;
    payload: boolean;
}

export type ModalAction = RegistrationModalAction | SettingsModalAction | UserPanelContributionModalAction;

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

// LOINC

export interface LoincAction {
    type: ActionType.SET_IS_LOINC_EXISTS;
    payload: boolean;
}

// RADLEX

export interface RadlexAction {
    type: ActionType.SET_IS_RADLEX_EXISTS;
    payload: boolean;
}

// NUMBER PATIENTS

export interface NumberOfPatientsAction {
    type: ActionType.SET_NUMBER_OF_PATIENTS;
    payload: number;
}

// NUMBER ATTRIBUTES

export interface NumberOfAttributesAction {
    type: ActionType.SET_NUMBER_OF_ATTRIBUTES;
    payload: number;
}

// SNOMED

export interface SetIsSnomedExistsAction {
    type: ActionType.SET_IS_SNOMED_EXISTS;
    payload: boolean;
}

export interface SetFalsySnomedValues {
    type: ActionType.SET_NUMBER_OF_FALSY_SNOMED_VALUES;
    payload: number;
}

// DISEASE NAME

export interface SetDiseaseName {
    type: ActionType.SET_DISEASE_NAME;
    payload: string;
}

// VALUE

export interface SetDatasetValue {
    type: ActionType.SET_DATASET_VALUE;
    payload: string;
}

// FILEHASH

export interface SetFileHash {
    type: ActionType.SET_FILE_HASH;
    payload: string;
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
    | FalsyGenderValuesAction
    | LoincAction
    | RadlexAction
    | NumberOfPatientsAction
    | NumberOfAttributesAction
    | SetIsSnomedExistsAction
    | SetFalsySnomedValues
    | SetDiseaseName
    | SetDatasetValue
    | SetFileHash;

// -- CONTRIBUTE DATA PAGE --

//  USER

export interface SetUserBalance {
    type: ActionType.SET_DEMO_USER_BALANCE;
    payload: { index: number; balance: number };
}

export interface SetDemoUserNumberContributions {
    type: ActionType.SET_DEMO_USER_NUMBER_CONTRIBUTIONS;
    payload: { index: number; numberContributions: number };
}

// DISEASE

export interface SetDiseaseBudget {
    type: ActionType.SET_DEMO_DISEASE_BUDGET;
    payload: { name: string; budget: number };
}

export interface SetDemoDiseaseNumberContributions {
    type: ActionType.SET_DEMO_DISEASE_NUMBER_CONTRIBUTIONS;
    payload: { name: string; numberContributions: number };
}

export interface AddDemoNewDisease {
    type: ActionType.ADD_DEMO_NEW_DISEASE;
    payload: Disease;
}

// ELSE

export interface SetIndexOfContributingUser {
    type: ActionType.SET_DEMO_INDEX_OF_CONTRIBUTING_USER;
    payload: number | undefined;
}

// CONTRIBUTION

export interface SetDemoContribution {
    type: ActionType.SET_DEMO_CONTRIBUTION;
    payload: Contribution;
}

export interface SetDemoContributionAgeData {
    type: ActionType.SET_DEMO_CONTRIBUTION_AGE_DATA;
    payload: `0%` | "25%" | "50%" | "75%" | "100%" | undefined;
}

export interface SetDemoContributionGenderData {
    type: ActionType.SET_DEMO_CONTRIBUTION_GENDER_DATA;
    payload: `0%` | "25%" | "50%" | "75%" | "100%" | undefined;
}

export interface SetDemoContributionSnomedData {
    type: ActionType.SET_DEMO_CONTRIBUTION_SNOMED_DATA;
    payload: `0%` | "25%" | "50%" | "75%" | "100%" | undefined;
}

export interface SetDemoNumberOfPatients {
    type: ActionType.SET_DEMO_NUMBER_OF_PATIENTS;
    payload: "0-200" | "200-400" | "400-600" | "600-800" | "800-1000" | ">1000";
}

export interface SetDemoNumberOfAttributes {
    type: ActionType.SET_DEMO_NUMBER_OF_ATTRIBUTES;
    payload: "0-6" | "7-12" | "13-18" | "19-24" | "15-30" | ">30";
}

export interface SetDemoContributionDataCompletenessValue {
    type: ActionType.SET_DEMO_CONTRIBUTION_DATA_COMPLETENESS_VALUE;
    payload: `0%` | "25%" | "50%" | "75%" | "100%";
}

export type DemoPageAction =
    | SetUserBalance
    | SetDemoUserNumberContributions
    | SetDiseaseBudget
    | SetDemoDiseaseNumberContributions
    | AddDemoNewDisease
    | SetIndexOfContributingUser
    | SetDemoContribution
    | SetDemoContributionAgeData
    | SetDemoContributionGenderData
    | SetDemoContributionSnomedData
    | SetDemoNumberOfPatients
    | SetDemoNumberOfAttributes
    | SetDemoContributionDataCompletenessValue;
