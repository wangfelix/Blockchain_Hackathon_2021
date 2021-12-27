import { DemoPageAction } from "State/Actions/actions";
import { ActionType } from "State/Actions/actionTypes";

export type Disease = {
    name: string;
    budget: number;
    numberContributions: number;
};

type User = {
    index: number;
    balance: number;
    numberContributions: number;
};

export type NumberPatientData = "0-200" | "200-400" | "400-600" | "600-800" | "800-1000" | ">1000";
export type NumberOfAttributes = "0-6" | "7-12" | "13-18" | "19-24" | "25-30" | ">30";
export type AgeData = `0%` | "25%" | "50%" | "75%" | "100%" | undefined;
export type GenderData = `0%` | "25%" | "50%" | "75%" | "100%" | undefined;
export type SNOMEDData = `0%` | "25%" | "50%" | "75%" | "100%" | undefined;
export type DataCompleteness = `0%` | "25%" | "50%" | "75%" | "100%";

export type DatasetAttributes =
    | {
          numberPatientData: NumberPatientData;
          numberOfAttributes: NumberOfAttributes;
          ageData: AgeData; // percentage indicates the amount of falsy unusable values
          genderData: GenderData; // percentage indicates the amount of falsy unusable values
          snomedData: SNOMEDData; // percentage indicates the amount of falsy unusable values
          dataCompleteness: DataCompleteness; // percentage indicates the amount of falsy unusable values
      }
    | undefined;

export type Contribution =
    | {
          user: number;
          disease: string;
          datasetAttributes: DatasetAttributes;
      }
    | undefined;

export type DemoPageState = {
    diseases: Disease[];
    users: User[];
    indexOfContributingUser: number | undefined;
    contribution: Contribution;
    isContributionSuccessful: boolean;
};

const InitialState: DemoPageState = {
    diseases: [
        { name: "Morbus Chron", budget: 1000, numberContributions: 0 },
        { name: "Covid 19", budget: 5000, numberContributions: 0 },
        { name: "Chorea Huntington", budget: 2000, numberContributions: 0 },
        { name: "Influenza", budget: 500, numberContributions: 0 },
    ],
    users: [
        { index: 0, numberContributions: 0, balance: 0 },
        { index: 1, numberContributions: 0, balance: 0 },
        { index: 2, numberContributions: 0, balance: 0 },
        { index: 3, numberContributions: 0, balance: 0 },
    ],
    indexOfContributingUser: undefined,
    contribution: undefined,
    isContributionSuccessful: false,
};

export const demoPageReducer = (state: DemoPageState = InitialState, action: DemoPageAction): DemoPageState => {
    switch (action.type) {
        // -- USER --

        case ActionType.SET_DEMO_USER_BALANCE:
            return {
                ...state,
                users: state.users.map((user) => ({
                    ...user,
                    balance: user.index === action.payload.index ? action.payload.balance : user.balance,
                })),
            };

        case ActionType.SET_DEMO_USER_NUMBER_CONTRIBUTIONS:
            return {
                ...state,
                users: state.users.map((user) => ({
                    ...user,
                    numberContributions:
                        user.index === action.payload.index
                            ? action.payload.numberContributions
                            : user.numberContributions,
                })),
            };

        // -- DISEASE --

        case ActionType.SET_DEMO_DISEASE_BUDGET:
            return {
                ...state,
                diseases: state.diseases.map((disease) => ({
                    ...disease,
                    budget: disease.name === action.payload.name ? action.payload.budget : disease.budget,
                })),
            };

        case ActionType.SET_DEMO_DISEASE_NUMBER_CONTRIBUTIONS:
            return {
                ...state,
                diseases: state.diseases.map((disease) => ({
                    ...disease,
                    numberContributions:
                        disease.name === action.payload.name
                            ? action.payload.numberContributions
                            : disease.numberContributions,
                })),
            };

        case ActionType.ADD_DEMO_NEW_DISEASE:
            return { ...state, diseases: [...state.diseases, action.payload] };

        // -- ELSE --

        case ActionType.SET_DEMO_INDEX_OF_CONTRIBUTING_USER:
            return { ...state, indexOfContributingUser: action.payload };

        case ActionType.SET_DEMO_IS_CONTRIBUTION_SUCCESSFUL:
            return { ...state, isContributionSuccessful: action.payload };

        // -- CONTRIBUTION --

        case ActionType.SET_DEMO_CONTRIBUTION:
            return { ...state, contribution: action.payload };

        case ActionType.SET_DEMO_CONTRIBUTION_DISEASE_NAME:
            return {
                ...state,
                ...(state.contribution
                    ? {
                          contribution: {
                              ...state.contribution,
                              disease: action.payload,
                          },
                      }
                    : { contribution: undefined }),
            };

        case ActionType.SET_DEMO_CONTRIBUTION_AGE_DATA:
            return {
                ...state,
                ...(state.contribution?.datasetAttributes
                    ? {
                          contribution: {
                              ...state.contribution,
                              datasetAttributes: {
                                  genderData: state.contribution.datasetAttributes.genderData,
                                  numberOfAttributes: state.contribution.datasetAttributes.numberOfAttributes,
                                  ageData: action.payload,
                                  numberPatientData: state.contribution.datasetAttributes?.numberPatientData!,
                                  snomedData: state.contribution.datasetAttributes?.snomedData,
                                  dataCompleteness: state.contribution.datasetAttributes?.dataCompleteness!,
                              },
                          },
                      }
                    : { contribution: undefined }),
            };

        case ActionType.SET_DEMO_CONTRIBUTION_GENDER_DATA:
            return {
                ...state,
                ...(state.contribution?.datasetAttributes
                    ? {
                          contribution: {
                              ...state.contribution,
                              datasetAttributes: {
                                  genderData: action.payload,
                                  numberOfAttributes: state.contribution.datasetAttributes.numberOfAttributes,
                                  ageData: state.contribution.datasetAttributes.ageData,
                                  numberPatientData: state.contribution.datasetAttributes?.numberPatientData!,
                                  snomedData: state.contribution.datasetAttributes?.snomedData,
                                  dataCompleteness: state.contribution.datasetAttributes?.dataCompleteness!,
                              },
                          },
                      }
                    : { contribution: undefined }),
            };

        case ActionType.SET_DEMO_CONTRIBUTION_SNOMED_DATA:
            return {
                ...state,
                ...(state.contribution?.datasetAttributes
                    ? {
                          contribution: {
                              ...state.contribution,
                              datasetAttributes: {
                                  genderData: state.contribution.datasetAttributes.genderData,
                                  numberOfAttributes: state.contribution.datasetAttributes.numberOfAttributes,
                                  ageData: state.contribution.datasetAttributes.ageData,
                                  numberPatientData: state.contribution.datasetAttributes?.numberPatientData!,
                                  snomedData: action.payload,
                                  dataCompleteness: state.contribution.datasetAttributes?.dataCompleteness!,
                              },
                          },
                      }
                    : { contribution: undefined }),
            };

        case ActionType.SET_DEMO_NUMBER_OF_PATIENTS:
            return {
                ...state,
                ...(state.contribution?.datasetAttributes
                    ? {
                          contribution: {
                              ...state.contribution,
                              datasetAttributes: {
                                  genderData: state.contribution.datasetAttributes.genderData,
                                  numberOfAttributes: state.contribution.datasetAttributes.numberOfAttributes,
                                  ageData: state.contribution.datasetAttributes.ageData,
                                  numberPatientData: action.payload,
                                  snomedData: state.contribution.datasetAttributes.snomedData,
                                  dataCompleteness: state.contribution.datasetAttributes?.dataCompleteness!,
                              },
                          },
                      }
                    : { contribution: undefined }),
            };

        case ActionType.SET_DEMO_NUMBER_OF_ATTRIBUTES:
            return {
                ...state,
                ...(state.contribution?.datasetAttributes
                    ? {
                          contribution: {
                              ...state.contribution,
                              datasetAttributes: {
                                  genderData: state.contribution.datasetAttributes.genderData,
                                  numberOfAttributes: action.payload,
                                  ageData: state.contribution.datasetAttributes.ageData,
                                  numberPatientData: state.contribution.datasetAttributes.numberPatientData,
                                  snomedData: state.contribution.datasetAttributes.snomedData,
                                  dataCompleteness: state.contribution.datasetAttributes?.dataCompleteness!,
                              },
                          },
                      }
                    : { contribution: undefined }),
            };

        case ActionType.SET_DEMO_CONTRIBUTION_DATA_COMPLETENESS_VALUE:
            return {
                ...state,
                ...(state.contribution?.datasetAttributes
                    ? {
                          contribution: {
                              ...state.contribution,
                              datasetAttributes: {
                                  genderData: state.contribution.datasetAttributes.genderData,
                                  numberOfAttributes: state.contribution.datasetAttributes.numberOfAttributes,
                                  ageData: state.contribution.datasetAttributes.ageData,
                                  numberPatientData: state.contribution.datasetAttributes?.numberPatientData!,
                                  snomedData: state.contribution.datasetAttributes.snomedData,
                                  dataCompleteness: action.payload,
                              },
                          },
                      }
                    : { contribution: undefined }),
            };

        default:
            return state;
    }
};
