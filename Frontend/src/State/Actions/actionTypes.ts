export enum ActionType {
    // -- MODALS --

    SET_IS_REGISTRATION_MODAL_OPEN = "setIsRegistrationModalOpen",
    SET_IS_SETTINGS_MODAL_OPEN = "setIsSettingsModalOpen",

    // -- CONTRIBUTE DATA PAGE --

    // AGE

    SET_INDEX_AGE = "setIndexAge",
    SET_IS_AGE_EXISTS = "setIsAgeExists",
    SET_MIN_AGE = "setMinAge",
    SET_MAX_AGE = "setMaxAge",
    SET_NUMBER_FALSY_AGE_VALUES = "setNumberFalsyValues",

    // GENDER

    SET_IS_MALE_GENDER_EXISTS = "setMaleGenderExists",
    SET_MALE_GENDER_OCCURRENCES = "setMaleGenderOccurrences",
    SET_IS_FEMALE_GENDER_EXISTS = "setFemaleGenderExists",
    SET_FEMALE_GENDER_OCCURRENCES = "setFemaleGenderOccurrences",
    SET_IS_TRANSGENDER_GENDER_EXISTS = "setTransgenderGenderExists",
    SET_TRANSGENDER_GENDER_OCCURRENCES = "setTransgenderGenderOccurrences",
    SET_FALSY_GENDER_VALUES = "setFalsyGenderValues,",

    // LOINC

    SET_IS_LOINC_EXISTS = "setIsLoincExists",

    // RADLEX

    SET_IS_RADLEX_EXISTS = "setIsRadlexEcists",

    // NUMBER PATIENTS

    SET_NUMBER_OF_PATIENTS = "setNumberOfPatients",

    // NUMBER ATTRIBUTES

    SET_NUMBER_OF_ATTRIBUTES = "setNumberOfAttributes",

    // SNOMED

    SET_IS_SNOMED_EXISTS = "setIsSnomedExists",
    SET_NUMBER_OF_FALSY_SNOMED_VALUES = "setNumberOfFalsySnomedValues",
}
