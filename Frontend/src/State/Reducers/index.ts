import { combineReducers } from "redux";

import { modalReducer } from "State/Reducers/modalReducer";
import { contributeDataPageReducer } from "State/Reducers/contributeDataPageReducer";

export const rootReducer = combineReducers({ modals: modalReducer, contributeDataPage: contributeDataPageReducer });

export type RootState = ReturnType<typeof rootReducer>;
