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

type DemoPageState = {
    diseases: Disease[];
    users: User[];
    indexOfContributingUser: number | undefined;
};

const InitialState = {
    diseases: [
        { name: "Morbus Chron", budget: 1000, numberContributions: 0 },
        { name: "Covid 19", budget: 5000, numberContributions: 0 },
        { name: "Chorea Huntington", budget: 2000, numberContributions: 0 },
        { name: "Influenza", budget: 500, numberContributions: 0 },
    ],
    users: [
        { index: 0, numberContributions: 0, balance: 10 },
        { index: 1, numberContributions: 0, balance: 0 },
        { index: 2, numberContributions: 0, balance: 20 },
        { index: 3, numberContributions: 0, balance: 80 },
    ],
    indexOfContributingUser: undefined,
};

export const demoPageReducer = (state: DemoPageState = InitialState, action: DemoPageAction) => {
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

        default:
            return state;
    }
};
