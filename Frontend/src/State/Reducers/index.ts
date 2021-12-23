import { combineReducers } from "redux";

import { modalReducer } from "State/Reducers/modalReducer";
import { contributeDataPageReducer } from "State/Reducers/contributeDataPageReducer";
import { demoPageReducer } from "State/Reducers/demoPageReducer";

export const rootReducer = combineReducers({
    modals: modalReducer,
    contributeDataPage: contributeDataPageReducer,
    demoPage: demoPageReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
