export enum ActionType {
    // -- MODALS --

    SET_IS_REGISTRATION_MODAL_OPEN = "setIsRegistrationModalOpen",
    SET_IS_SETTINGS_MODAL_OPEN = "setIsSettingsModalOpen",
    SET_IS_USER_PANEL_CONTRIBUTION_MODAL_OPEN = "setIsUserPanelContributionModalOpen",

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

    // DISEASE NAME

    SET_DISEASE_NAME = "setDiseaseName",

    // VALUE

    SET_DATASET_VALUE = "setDatasetValue",

    // FILEHASH

    SET_FILE_HASH = "setFileHash",

    // -- DEMO PAGE --

    // USERS

    SET_DEMO_USER_BALANCE = "setUserBalance",

    SET_DEMO_USER_NUMBER_CONTRIBUTIONS = "setDemoUserNumberContributions",

    // DISEASES

    SET_DEMO_DISEASE_BUDGET = "setDiseaseBudget",

    SET_DEMO_DISEASE_NUMBER_CONTRIBUTIONS = "setDemoDiseaseNumberContributions",

    ADD_DEMO_NEW_DISEASE = "addDemoNewDisease",

    // ELSE

    SET_DEMO_INDEX_OF_CONTRIBUTING_USER = "setIndexOfContributingUser",

    SET_DEMO_IS_CONTRIBUTION_SUCCESSFUL = "setDemoIsContributionSuccessful",

    SET_DEMO_IS_CONTRIBUTOR_CONTRIBUTION_SUCCESS_ANIMATION_FINISHED = "setDemoIsContributorContributionSuccessAnimationFinished",

    // CONTRIBUTION

    SET_DEMO_CONTRIBUTION = "setDemoContribution",

    SET_DEMO_CONTRIBUTION_DISEASE_NAME = "setDemoContributionDiseaseName",

    SET_DEMO_NUMBER_OF_PATIENTS = "setDemoNumberOfPatients",

    SET_DEMO_NUMBER_OF_ATTRIBUTES = "setDemoNumberOfAttributes",

    SET_DEMO_CONTRIBUTION_AGE_DATA = "setDemoContributionAgeData",

    SET_DEMO_CONTRIBUTION_GENDER_DATA = "setDemoContributionGenderData",

    SET_DEMO_CONTRIBUTION_SNOMED_DATA = "setDemoContributionSnomedData",

    SET_DEMO_CONTRIBUTION_DATA_COMPLETENESS_VALUE = "setDemoContributionDataCompletenessValue",

    // -- EVENT LOG --

    ADD_DEMO_EVENT = "addDemoEvent",
}
